import React, { useState } from 'react'

function Sidebar({ collection, onRequestSelect, selectedRequest }) {
  const [expandedFolders, setExpandedFolders] = useState({})

  const toggleFolder = (folderName) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderName]: !prev[folderName]
    }))
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
    <aside className="w-80 bg-gray-800 border-r border-gray-700 overflow-y-auto">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-gray-100">{collection.info.name}</h2>
        <p className="text-sm text-gray-400 mt-1">{collection.info.description}</p>
      </div>

      <div className="p-2">
        {collection.item.map((folder, idx) => (
          <div key={idx} className="mb-2">
            <button
              onClick={() => toggleFolder(folder.name)}
              className="w-full flex items-center gap-2 p-2 hover:bg-gray-700 rounded text-left font-medium text-gray-200"
            >
              <span className="text-gray-400">
                {expandedFolders[folder.name] ? '▼' : '▶'}
              </span>
              <span>{folder.name}</span>
            </button>

            {expandedFolders[folder.name] && (
              <div className="ml-4 mt-1 space-y-1">
                {folder.item.map((request, reqIdx) => (
                  <button
                    key={reqIdx}
                    onClick={() => onRequestSelect(request.request)}
                    className={`w-full flex items-center gap-2 p-2 rounded text-left text-sm hover:bg-violet-900/30 ${
                      selectedRequest === request.request ? 'bg-violet-900/50' : ''
                    }`}
                  >
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${getMethodColor(request.request.method)}`}>
                      {request.request.method}
                    </span>
                    <span className="text-gray-300 truncate">{request.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar
