import React, { useState } from "react";
import MatrixToggle from "../components/MatrixToggle";
import SearchBar from "../components/SearchBar";
import archiveData from "../api/archive.json";

export default function YKOSDashboard() {
  const [filteredData, setFilteredData] = useState(archiveData);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredData(archiveData);
      return;
    }
    const lower = query.toLowerCase();
    const filtered = archiveData.filter(item => 
      (item.title && item.title.toLowerCase().includes(lower)) ||
      (item.label && item.label.toLowerCase().includes(lower)) ||
      (item.tags && item.tags.some(t => t.toLowerCase().includes(lower)))
    );
    setFilteredData(filtered);
  };

  return (
    <div className="dashboard-main-container" style={{ width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "10px", boxSizing: "border-box" }}>
      
      {/* 1. ŞIK VE TAM GENİŞLİKTE ARAMA BARI */}
      <div style={{ marginBottom: "15px" }}>
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* 2. ANA MATRİS TUVALİ (ALTIN ÇERÇEVELİ KUTU) */}
      <div className="matrix-canvas-box" style={{ 
        backgroundColor: "#050811", 
        border: "1px solid rgba(255, 215, 0, 0.35)", 
        borderRadius: "14px", 
        padding: "20px", 
        boxShadow: "0 6px 25px rgba(0,0,0,0.7)",
        minHeight: "500px",
        position: "relative"
      }}>
        
        {/* Tuval Üst Başlık Çubuğu */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px", borderBottom: "1px solid rgba(255, 215, 0, 0.15)", paddingBottom: "10px" }}>
          <div>
            <h2 style={{ color: "#ffd700", margin: 0, fontSize: "1.1rem", letterSpacing: "1px" }}>DİNAMİK OKUMA MATRİSİ</h2>
            <small style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem" }}>Disiplinler Arası Algoritmik Kültür ve Dil Veri Tabanı</small>
          </div>
          <span style={{ color: "#00ffcc", border: "1px solid #00ffcc", padding: "3px 10px", borderRadius: "6px", fontSize: "0.75rem", fontWeight: "bold" }}>GLOBAL ATLAS CANLI</span>
        </div>

        {/* Canlı Baloncuk Ağı Görselleştirmesi */}
        <div style={{ width: "100%", minHeight: "420px", position: "relative" }}>
          <MatrixToggle data={filteredData} />
        </div>

      </div>
    </div>
  );
}
