import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");

  const handleChange = (e) => {
    const val = e.target.value;
    setTerm(val);
    if (onSearch) onSearch(val);
  };

  const handleClear = () => {
    setTerm("");
    if (onSearch) onSearch("");
  };

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#050811",
          border: "1px solid #ffd700",
          borderRadius: "8px",
          padding: "6px 14px",
          boxShadow: "0 0 15px rgba(255, 215, 0, 0.15)"
        }}
      >
        <span style={{ fontSize: "1.1rem", marginRight: "10px", color: "#ffd700" }}>🔍</span>
        <input
          type="text"
          value={term}
          onChange={handleChange}
          placeholder="ykos.com.tr Arşivinde Ara: (Örn: Çatalhöyük, Göbeklitepe, YOL, Etrüsk...)"
          style={{
            width: "100%",
            backgroundColor: "transparent",
            border: "none",
            outline: "none",
            color: "#ffffff",
            fontSize: "0.88rem",
            fontFamily: "Segoe UI, sans-serif"
          }}
        />
        {term && (
          <button
            onClick={handleClear}
            style={{
              background: "transparent",
              border: "none",
              color: "#ffd700",
              fontSize: "1rem",
              cursor: "pointer",
              padding: "0 4px"
            }}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim() === "") return;
    onSearch(query);
  };

  return (
    <div className="ykos-search">
      <input
        type="text"
        placeholder="Arama..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Ara</button>
    </div>
  );
}
