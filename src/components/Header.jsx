import React from "react";

function Header({ baseUrl, onBaseUrlChange }) {
    return (
        <header className="bg-violet-600 text-white p-4 shadow-lg">
            <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold whitespace-nowrap">
                    Critical Dice API
                </h1>
                <div className="flex-1 flex items-center gap-2">
                    <label
                        htmlFor="baseUrl"
                        className="font-medium whitespace-nowrap"
                    >
                        Base URL:
                    </label>
                    <input
                        id="baseUrl"
                        type="text"
                        value={baseUrl}
                        onChange={(e) => onBaseUrlChange(e.target.value)}
                        className="flex-1 px-3 py-2 rounded border border-violet-400 bg-violet-700 text-white placeholder-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-300"
                        placeholder="http://localhost:8000/api/v1"
                    />
                </div>
            </div>
        </header>
    );
}

export default Header;
