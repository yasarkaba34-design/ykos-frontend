import React, { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="ykos-search-wrapper">
      <div className="search-input-box">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Damga, kök hece, ülke, il veya kadim merkez ara..."
          value={searchTerm}
          onChange={handleChange}
        />
        {searchTerm && (
          <button 
            className="search-clear-btn" 
            onClick={() => { setSearchTerm(""); if(onSearch) onSearch(""); }}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
