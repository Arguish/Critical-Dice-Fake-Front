import React from 'react'

function RequestPanel({ selectedRequest, requestBody, onBodyChange, onSend, loading }) {
  if (!selectedRequest) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-800 border-b border-gray-700">
        <div className="text-center text-gray-400">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-lg">Selecciona una petición para empezar</p>
        </div>
      </div>
    )
  }

  const getMethodColor = (method) => {
    const colors = {
      GET: 'text-green-400 bg-green-900/50',
      POST: 'text-yellow-400 bg-yellow-900/50',
      PATCH: 'text-blue-400 bg-blue-900/50',
      DELETE: 'text-red-400 bg-red-900/50',
      PUT: 'text-purple-400 bg-purple-900/50'
    }
    return colors[method] || 'text-gray-400 bg-gray-900/50'
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-800 border-b border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-3 mb-3">
          <span className={`px-3 py-1 rounded font-semibold ${getMethodColor(selectedRequest.method)}`}>
            {selectedRequest.method}
          </span>
          <span className="text-gray-300 font-mono text-sm flex-1">{selectedRequest.url.raw}</span>
          <button
            onClick={onSend}
            disabled={loading}
            className="px-6 py-2 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-800 disabled:cursor-not-allowed text-white rounded font-semibold transition-colors"
          >
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {selectedRequest.header && selectedRequest.header.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">Headers:</h3>
            <div className="bg-gray-900 p-3 rounded border border-gray-700">
              {selectedRequest.header.map((header, idx) => (
                <div key={idx} className="text-sm mb-1">
                  <span className="font-semibold text-violet-400">{header.key}:</span>{' '}
                  <span className="text-gray-300">{header.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {(selectedRequest.body?.raw || requestBody) && (
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-2">
              Body (Editable) - Se enviará en la petición:
            </h3>
            <textarea
              value={requestBody}
              onChange={(e) => onBodyChange(e.target.value)}
              className="w-full h-64 bg-gray-900 text-gray-300 p-3 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 font-mono text-sm"
              placeholder="Request body..."
            />
            <p className="text-xs text-gray-500 mt-1">
              💡 Este contenido se enviará como body de la petición {selectedRequest.method}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default RequestPanel
