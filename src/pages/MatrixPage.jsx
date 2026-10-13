// src/pages/MatrixPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { BubbleMatrixView } from "../mega/BubbleMatrixView";

export default function MatrixPage() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "#050811", minHeight: "100vh", color: "#fff", padding: "16px", fontFamily: "Segoe UI, sans-serif" }}>
      
      {/* ÜST NAVİGASYON */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid rgba(6,182,212,0.3)", paddingBottom: "15px", flexWrap: "wrap", maxWidth: "1920px", marginLeft: "auto", marginRight: "auto" }}>
        
        {/* EN BELİRGİN ANA SAYFAYA DÖNÜŞ BUTONU */}
        <button 
          onClick={() => navigate("/")} 
          style={{ background: "linear-gradient(135deg, #ffd700, #b8860b)", color: "#000", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontWeight: "900", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "6px", boxShadow: "0 0 12px rgba(255, 215, 0, 0.3)" }}
        >
          ← Ana Sayfaya Dön
        </button>

        <button 
          onClick={() => navigate("/matrix")} 
          style={{ background: "rgba(6,182,212,0.2)", border: "1.5px solid #06b6d4", color: "#38bdf8", padding: "8px 14px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "0.85rem" }}
        >
          🌌 Kök-Hece Matrisi
        </button>
        <button 
          onClick={() => navigate("/open-data")} 
          style={{ background: "#0c101d", border: "1.5px solid #00ff7f", color: "#00ff7f", padding: "8px 14px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "0.85rem" }}
        >
          🌐 Açık Veri
        </button>
        <button 
          onClick={() => navigate("/arsiv")} 
          style={{ background: "#0c101d", border: "1.5px solid #38bdf8", color: "#38bdf8", padding: "8px 14px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "0.85rem" }}
        >
          📁 Arşiv
        </button>
      </div>

      {/* MATRİS BİLEŞENİ GÖRSELLEŞTİRME ALANI */}
      <div style={{ maxWidth: "1920px", margin: "0 auto" }}>
        <BubbleMatrixView />
      </div>

    </div>
  );
}
