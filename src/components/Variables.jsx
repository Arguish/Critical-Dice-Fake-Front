import React from 'react'

function Variables({ variables }) {
  const variableDescriptions = {
    base_url: 'URL base de la API',
    api_token: 'Token de autenticación (obtenido en Login)',
    last_character_id: 'ID del último personaje creado',
    last_user_id: 'ID del último usuario creado'
  }

  return (
    <div className="bg-gray-900 border-t border-gray-700 p-4">
      <h3 className="text-sm font-semibold text-gray-300 mb-2">Variables (Solo lectura - se actualizan automáticamente):</h3>
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(variables).map(([key, value]) => (
          <div key={key} className="bg-gray-800 p-3 rounded border border-gray-700">
            <div className="flex items-center justify-between mb-1">
              <div className="text-xs font-semibold text-violet-400 uppercase">{key}</div>
              {value && <span className="text-xs text-green-400">✓</span>}
            </div>
            <div className="text-xs text-gray-500 mb-1">{variableDescriptions[key]}</div>
            <div className="text-sm text-gray-300 font-mono break-all">
              {value || <span className="text-gray-500 italic">vacío</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Variables
