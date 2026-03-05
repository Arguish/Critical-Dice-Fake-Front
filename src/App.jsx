import { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ResponsePanel from './components/ResponsePanel'
import Variables from './components/Variables'
import RequestPanel from './components/RequestPanel'
import collectionData from './data/collection'

function App() {
  const [baseUrl, setBaseUrl] = useState('http://localhost:8000/api/v1')
  const [variables, setVariables] = useState({
    base_url: 'http://localhost:8000/api/v1',
    api_token: '',
    last_character_id: '',
    last_user_id: ''
  })
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [requestBody, setRequestBody] = useState('')

  const handleBaseUrlChange = (newUrl) => {
    setBaseUrl(newUrl)
    setVariables(prev => ({ ...prev, base_url: newUrl }))
  }

  const handleRequestSelect = (request) => {
    setSelectedRequest(request)
    setRequestBody(request.body?.raw || '')
    setResponse(null)
    
    // Debug: verificar estructura de la petición
    console.log('🔍 Petición seleccionada:', request)
    console.log('🔍 Headers de la petición:', request.header) // Es 'header', no 'headers'
  }

  const handleRequestSend = async () => {
    if (!selectedRequest) return
    
    setLoading(true)
    setResponse(null)

    try {
      // Reemplazar variables en la URL
      let url = selectedRequest.url.raw
      url = url.replace('{{base_url}}', baseUrl)
      url = url.replace('{{last_character_id}}', variables.last_character_id || '1')
      url = url.replace('{{last_user_id}}', variables.last_user_id || '1')
      
      // Preparar headers
      const headers = {}
      if (selectedRequest.header && Array.isArray(selectedRequest.header)) {
        selectedRequest.header.forEach(header => {
          if (header.key) {
            let value = header.value || ''
            // Reemplazar variables en el valor del header
            value = value.replace('{{api_token}}', variables.api_token)
            value = value.replace('{{base_url}}', baseUrl)
            headers[header.key] = value
          }
        })
      }

      // Preparar opciones de fetch
      const options = {
        method: selectedRequest.method,
        headers
      }

      // Agregar body si existe y el método lo requiere
      const methodsWithBody = ['POST', 'PUT', 'PATCH']
      if (requestBody && methodsWithBody.includes(selectedRequest.method)) {
        options.body = requestBody
        
        // Asegurar que Content-Type esté presente para JSON
        if (!headers['Content-Type'] && requestBody.trim().startsWith('{')) {
          headers['Content-Type'] = 'application/json'
        }
        
        console.log('📤 Enviando body:', requestBody)
      }

      console.log('🚀 Petición:', selectedRequest.method, url)
      console.log('📋 Headers:', headers)
      console.log('🔍 Options completas:', options)
      
      const startTime = Date.now()
      const res = await fetch(url, options)
      const endTime = Date.now()
      
      const contentType = res.headers.get('content-type')
      let data
      
      if (contentType?.includes('application/json')) {
        data = await res.json()
      } else {
        data = await res.text()
      }

      // Guardar token automáticamente si existe en la respuesta (Login)
      if (res.ok && data && typeof data === 'object' && data.token) {
        console.log('🔑 Token recibido:', data.token)
        setVariables(prev => ({ ...prev, api_token: data.token }))
        console.log('✅ Token guardado en variables')
      }

      // Guardar ID del último personaje creado
      if (res.ok && selectedRequest.method === 'POST' && url.includes('/characters') && !url.includes('/characters/')) {
        const characterId = data?.data?.id || data?.id
        if (characterId) {
          console.log('🎲 Personaje creado con ID:', characterId)
          setVariables(prev => ({ ...prev, last_character_id: characterId }))
          console.log('✅ last_character_id actualizado')
        }
      }

      // Guardar ID del último usuario creado
      if (res.ok && selectedRequest.method === 'POST' && url.includes('/users') && !url.includes('/users/')) {
        const userId = data?.data?.id || data?.id
        if (userId) {
          console.log('👤 Usuario creado con ID:', userId)
          setVariables(prev => ({ ...prev, last_user_id: userId }))
          console.log('✅ last_user_id actualizado')
        }
      }

      console.log('📥 Respuesta completa:', data)

      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
        data,
        time: endTime - startTime,
        size: JSON.stringify(data).length,
        requestBody: requestBody || null,
        requestMethod: selectedRequest.method
      })
    } catch (error) {
      setResponse({
        status: 0,
        statusText: 'Error',
        error: error.message,
        data: { error: error.message }
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      <Header baseUrl={baseUrl} onBaseUrlChange={handleBaseUrlChange} />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar 
          collection={collectionData} 
          onRequestSelect={handleRequestSelect}
          selectedRequest={selectedRequest}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <RequestPanel 
            selectedRequest={selectedRequest}
            requestBody={requestBody}
            onBodyChange={setRequestBody}
            onSend={handleRequestSend}
            loading={loading}
          />
          <ResponsePanel response={response} loading={loading} />
          <Variables variables={variables} />
        </div>
      </div>
    </div>
  )
}

export default App
