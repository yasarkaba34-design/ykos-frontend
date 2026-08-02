import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (onSearch) {
      onSearch(val);
    }
  };

  return (
    <div style={{
      backgroundColor: "#050811",
      border: "1px solid #ffd700",
      borderRadius: "12px",
      padding: "10px 16px",
      display: "flex",
      alignItems: "center",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.7)"
    }}>
      <span style={{ color: "#ffd700", fontSize: "1.1rem", marginRight: "10px" }}>🔍</span>
      <input 
        type="text" 
        value={query}
        onChange={handleSearch}
        placeholder="ykos.com.tr Arşivinde Ara: (Örn: Çatalhöyük, Göbeklitepe, YOL, Etrüsk...)" 
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          color: "#fff",
          fontSize: "0.88rem",
          outline: "none"
        }}
      />
    </div>
  );
}
