import React from 'react'

function ResponsePanel({ response, loading }) {
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Enviando petición...</p>
        </div>
      </div>
    )
  }

  if (!response) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-800">
        <div className="text-center text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-lg">Esperando respuesta...</p>
        </div>
      </div>
    )
  }

  const getStatusColor = (status) => {
    if (status >= 200 && status < 300) return 'text-green-400 bg-green-900/50'
    if (status >= 400 && status < 500) return 'text-yellow-400 bg-yellow-900/50'
    if (status >= 500) return 'text-red-400 bg-red-900/50'
    return 'text-gray-400 bg-gray-900/50'
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-800 overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-4">
          <span className={`px-3 py-1 rounded font-semibold ${getStatusColor(response.status)}`}>
            {response.status} {response.statusText}
          </span>
          {response.time && (
            <span className="text-sm text-gray-400">
              Tiempo: <span className="font-semibold">{response.time}ms</span>
            </span>
          )}
          {response.size && (
            <span className="text-sm text-gray-400">
              Tamaño: <span className="font-semibold">{(response.size / 1024).toFixed(2)} KB</span>
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {response.requestBody && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-violet-400 mb-2">
              ✅ Body Enviado ({response.requestMethod}):
            </h3>
            <pre className="bg-gray-900 p-4 rounded border border-violet-700 overflow-auto text-sm">
              <code className="text-violet-300">{response.requestBody}</code>
            </pre>
          </div>
        )}

        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">Respuesta:</h3>
          <pre className="bg-gray-900 p-4 rounded border border-gray-700 overflow-auto text-sm">
            <code className="text-gray-300">{JSON.stringify(response.data, null, 2)}</code>
          </pre>
        </div>

        {response.headers && (
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-2">Headers:</h3>
            <div className="bg-gray-900 p-4 rounded border border-gray-700">
              {Object.entries(response.headers).map(([key, value]) => (
                <div key={key} className="text-sm mb-1">
                  <span className="font-semibold text-violet-400">{key}:</span>{' '}
                  <span className="text-gray-400">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {response.error && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-red-400 mb-2">Error:</h3>
            <div className="bg-red-900/30 p-4 rounded border border-red-700 text-sm text-red-400">
              {response.error}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ResponsePanel
