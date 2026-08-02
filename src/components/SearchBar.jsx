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
    <div className="ykos-search-wrapper" style={{ width: "100%" }}>
      <div className="search-input-box" style={{ display: "flex", alignItems: "center", backgroundColor: "#050811", border: "1px solid rgba(255, 215, 0, 0.4)", borderRadius: "25px", padding: "8px 20px" }}>
        <span className="search-icon" style={{ color: "#ffd700", marginRight: "12px" }}>🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Damga, kök hece, ülke, il veya kadim merkez ara..."
          value={searchTerm}
          onChange={handleChange}
          style={{ width: "100%", background: "transparent", border: "none", outline: "none", color: "#ffffff", fontSize: "0.95rem" }}
        />
        {searchTerm && (
          <button 
            className="search-clear-btn" 
            onClick={() => { setSearchTerm(""); if(onSearch) onSearch(""); }}
            style={{ background: "transparent", border: "none", color: "#ffd700", fontSize: "1rem", cursor: "pointer" }}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}