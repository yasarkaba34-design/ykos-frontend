// src/pages/Arsiv.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import YKOSHeader from "../components/YKOSHeader";

const archiveData = [
  { id: 1, title: "Kök Hece Analizi", date: "2026-09-26", desc: "Anadolu damgaları ve morfolojik kök-hece çözümleri." },
  { id: 2, title: "Atlas Koordinat Haritası", date: "2026-09-25", desc: "Avrasya petroglif ve damga yayılım koordinatları." },
  { id: 3, title: "BubbleMatrix Görsel Çıktı", date: "2026-09-24", desc: "Disiplinler arası interaktif matris veri tabanı kaydı." },
  { id: 4, title: "Semiyotik Zincir Kaydı", date: "2026-09-23", desc: "12.000 yıllık dil ve kültür katmanları değerlendirmesi." }
];

export default function Arsiv() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "#050811", minHeight: "100vh", color: "#fff", padding: "16px", fontFamily: "Segoe UI, sans-serif", boxSizing: "border-box" }}>
      
      {/* 1. ÜST KURUMSAL HEADER */}
      <YKOSHeader />

      {/* 2. SAYFALAR ARASI HIZLI NAVİGASYON ÇUBUĞU */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center", margin: "20px 0", borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "15px", flexWrap: "wrap", maxWidth: "1200px", marginLeft: "auto", marginRight: "auto" }}>
        <button onClick={() => navigate("/")} style={{ background: "#0c101d", border: "1px solid #ffd700", color: "#ffd700", padding: "8px 14px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "0.85rem" }}>
          🏠 Ana Sayfa
        </button>

        <button onClick={() => navigate("/matrix")} style={{ background: "#0c101d", border: "1px solid #38bdf8", color: "#38bdf8", padding: "8px 14px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "0.85rem" }}>
          🌌 Matris
        </button>

        <button onClick={() => navigate("/open-data")} style={{ background: "#0c101d", border: "1px solid #00ff7f", color: "#00ff7f", padding: "8px 14px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "0.85rem" }}>
          🌐 Açık Veri
        </button>

        <button onClick={() => navigate("/arsiv")} style={{ background: "rgba(255,215,0,0.2)", border: "1.5px solid #ffd700", color: "#ffd700", padding: "8px 14px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "0.85rem" }}>
          📁 Arşiv
        </button>
      </div>

      {/* 3. ANA ARŞİV PANELİ */}
      <div className="ykos-panel" style={{ maxWidth: "1200px", margin: "0 auto", background: "#0c101d", border: "1.5px solid rgba(255, 215, 0, 0.4)", borderRadius: "14px", padding: "24px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.7)" }}>
        
        <div className="ykos-title" style={{ marginBottom: "20px", borderBottom: "1px solid rgba(255, 215, 0, 0.2)", paddingBottom: "12px" }}>
          <h1 style={{ color: "#ffd700", fontSize: "1.6rem", fontWeight: "900", margin: "0 0 4px 0" }}>YKOS Arşiv Portalı</h1>
          <h2 style={{ color: "#94a3b8", fontSize: "0.85rem", fontWeight: "normal", margin: 0 }}>Kayıtlı çalışmaların ve analitik verilerin listesi</h2>
        </div>

        <div className="archive-list" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "14px" }}>
          {archiveData.map(item => (
            <div 
              key={item.id} 
              className="archive-item"
              style={{
                background: "rgba(255, 215, 0, 0.02)",
                border: "1px solid rgba(255, 215, 0, 0.3)",
                borderRadius: "10px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "all 0.2s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#ffd700";
                e.currentTarget.style.background = "rgba(255, 215, 0, 0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 215, 0, 0.3)";
                e.currentTarget.style.background = "rgba(255, 215, 0, 0.02)";
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <h3 style={{ color: "#ffd700", fontSize: "1rem", fontWeight: "bold", margin: 0 }}>{item.title}</h3>
                  <span className="archive-date" style={{ color: "#38bdf8", fontSize: "0.72rem", background: "rgba(56, 189, 248, 0.1)", padding: "2px 6px", borderRadius: "4px", fontWeight: "bold" }}>
                    {item.date}
                  </span>
                </div>
                <p style={{ color: "#aaa", fontSize: "0.78rem", margin: 0, lineHeight: "1.4" }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}