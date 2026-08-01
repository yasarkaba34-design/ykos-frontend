import React from "react";
import MatrixToggle from "../components/MatrixToggle";
import archiveData from "../api/archive.json";

export default function YKOSDashboard() {
  return (
    <div className="dashboard-wrapper" style={{ marginTop: "15px", display: "flex", flexDirection: "column", gap: "15px" }}>
      
      {/* Arama Barı */}
      <div className="search-bar-container" style={{ width: "100%" }}>
        <input 
          type="text" 
          placeholder="🔍 Damga, kök hece, ülke, il veya kadim merkez ara..." 
          style={{
            width: "100%",
            padding: "12px 20px",
            borderRadius: "25px",
            border: "1px solid rgba(255,215,0,0.4)",
            backgroundColor: "#050811",
            color: "#fff",
            boxSizing: "border-box",
            outline: "none"
          }}
        />
      </div>

      {/* Menü Çizgilerinin Altına Yerleşen Matris ve Görselleştirme Alanı */}
      <div className="matrix-canvas-container" style={{ position: "relative", minHeight: "550px", border: "1px solid rgba(255,215,0,0.25)", borderRadius: "12px", overflow: "hidden", background: "#03050a" }}>
        
        {/* Sol Üst Köşe: Matris Başlık Kartı */}
        <div style={{ position: "absolute", top: "15px", left: "15px", zIndex: 10, background: "rgba(5, 8, 17, 0.85)", backdropFilter: "blur(5px)", border: "1px solid rgba(255,215,0,0.3)", borderRadius: "8px", padding: "12px 18px", maxWidth: "320px" }}>
          <h2 style={{ color: "#ffd700", margin: 0, fontSize: "1.1rem" }}>YKOS MATRİSLERİ</h2>
          <small style={{ color: "#00ffcc", display: "block", marginTop: "4px" }}>100 • 200 • 300 GLOBAL ATLAS ENTEGRASYONU</small>
        </div>

        {/* Canlı Matris Ağı Tuvali */}
        <MatrixToggle data={archiveData} />
      </div>

    </div>
  );
}