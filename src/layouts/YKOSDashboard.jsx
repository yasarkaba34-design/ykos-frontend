import React, { useState } from "react";
import SearchBar from "../components/SearchBar";

export default function YKOSDashboard({ onVisualize, onNavigateRead }) {
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("TR");
  const [searchQuery, setSearchQuery] = useState("");

  const languages = [
    { code: "TR", label: "Türkçe" },
    { code: "EN", label: "English" },
    { code: "FR", label: "Français" },
    { code: "RU", label: "Русский" },
    { code: "ZH", label: "中文" },
    { code: "ES", label: "Español" },
    { code: "IT", label: "Italiano" },
    { code: "AR", label: "العربية" },
    { code: "JA", label: "日本語" },
    { code: "DE", label: "Deutsch" }
  ];

  const initialStats = [
    { icon: "🌐", count: "214", label: "Ülkeler" },
    { icon: "🏛️", count: "248", label: "Araştırmalar" },
    { icon: "🔷", count: "9.870", label: "Damgalar" },
    { icon: "🗿", count: "18.420", label: "Petroglifler" },
    { icon: "📜", count: "4.132", label: "Yazıtlar" },
    { icon: "📚", count: "12.580", label: "Kaynaklar" },
    { icon: "📷", count: "46.900", label: "Görseller" },
    { icon: "🗺️", count: "58", label: "Atlaslar" }
  ];

  const cardStyle = {
    backgroundColor: "#050811",
    border: "1px solid #ffd700",
    borderRadius: "12px",
    padding: "18px",
    marginBottom: "15px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.7)",
    position: "relative"
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div style={{ width: "100%", maxWidth: "1240px", margin: "0 auto", padding: "10px", boxSizing: "border-box", color: "#ffffff", fontFamily: "Segoe UI, sans-serif" }}>
      
      {/* 1. ÜST HEADER KUTUSU */}
      <div style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <button 
            onClick={() => { setMenuOpen(!menuOpen); setLangOpen(false); }}
            style={{ background: "rgba(255, 215, 0, 0.1)", border: "1px solid #ffd700", color: "#ffd700", padding: "6px 14px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}
          >
            ☰ MENÜ
          </button>

          <div style={{ position: "relative" }}>
            <button 
              onClick={() => { setLangOpen(!langOpen); setMenuOpen(false); }}
              style={{ background: "transparent", border: "1px solid #ffd700", color: "#ffd700", padding: "6px 12px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}
            >
              🌐 {currentLang} ▾
            </button>

            {langOpen && (
              <div style={{ position: "absolute", right: 0, top: "110%", backgroundColor: "#050811", border: "1px solid #ffd700", borderRadius: "8px", display: "flex", flexDirection: "column", minWidth: "150px", maxHeight: "250px", overflowY: "auto", zIndex: 1000, boxShadow: "0 6px 20px rgba(0,0,0,0.9)", padding: "4px" }}>
                {languages.map((l) => (
                  <button 
                    key={l.code}
                    onClick={() => { setCurrentLang(l.code); setLangOpen(false); }}
                    style={{ background: currentLang === l.code ? "rgba(255,215,0,0.2)" : "transparent", border: "none", color: currentLang === l.code ? "#ffd700" : "#fff", padding: "8px 10px", textAlign: "left", fontSize: "0.8rem", cursor: "pointer", fontWeight: currentLang === l.code ? "bold" : "normal" }}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div style={{ textAlign: "center", margin: "10px 0" }}>
          <span style={{ border: "1px solid #ffd700", borderRadius: "10px", padding: "2px 12px", color: "#ffd700", fontSize: "0.75rem", fontWeight: "bold" }}>YKOS</span>
          <h1 style={{ color: "#ffd700", fontSize: "1.7rem", fontWeight: "900", margin: "6px 0 2px 0", letterSpacing: "1.5px" }}>YKOS BİLGİ SİSTEMİ</h1>
          <p style={{ color: "#aaaaaa", fontSize: "0.8rem", margin: 0 }}>Disiplinler Arası Algoritmik Kültür ve Dil Veri Tabanı</p>
        </div>

        {menuOpen && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "8px", marginTop: "15px", borderTop: "1px solid rgba(255, 215, 0, 0.25)", paddingTop: "15px" }}>
            {["KURUMSAL", "YKOS METODOLOJİSİ", "KÖK HECE MATRİSİ", "DAMGA ATLASI", "OKUMA & ANALİZ MOTORU", "GÖÇ & AKIŞ HARİTASI", "🎥 VİDEO & SUNUMLAR", "KÜLLİYAT & YAYINLAR", "DİJİTAL ARŞİV"].map((item, i) => (
              <button key={i} style={{ background: i === 2 ? "rgba(255, 215, 0, 0.2)" : "rgba(255, 255, 255, 0.02)", border: i === 2 ? "1px solid #ffd700" : "1px solid rgba(255, 215, 0, 0.3)", color: i === 2 ? "#ffd700" : "#ccc", padding: "6px 10px", borderRadius: "4px", fontSize: "0.72rem", fontWeight: "bold", cursor: "pointer" }}>
                {item}
              </button>
            ))}
          </div>
        )}

      </div>

      {/* 2. ARAMA BARI */}
      <div style={{ marginBottom: "15px", width: "100%" }}>
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* 3. İSTATİSTİK SAYAÇ KUTUSU */}
      <div style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
          <div style={{ border: "1px solid #ffd700", borderRadius: "6px", padding: "3px 10px", textAlign: "center", fontSize: "0.65rem", background: "rgba(255, 215, 0, 0.05)" }}>
            <span style={{ color: "#888", display: "block" }}>SİSTEM DURUMU</span>
            <strong style={{ color: "#ffd700", fontSize: "0.85rem", display: "block" }}>AKTİF</strong>
            <small style={{ color: "#666" }}>YKOS v1.0 Beta</small>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: "10px" }}>
          {initialStats.map((item, idx) => (
            <div key={idx} style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 215, 0, 0.25)", borderRadius: "6px", padding: "10px 4px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
              <span style={{ color: "#fff", fontWeight: "900", fontSize: "1rem", margin: "2px 0" }}>{item.count}</span>
              <span style={{ color: "#888", fontSize: "0.68rem" }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. ALT 2 SÜTUNLU KARTLAR */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "15px" }}>
        
        {/* SOL PANEL */}
        <div style={cardStyle}>
          <h3 style={{ color: "#ffd700", fontSize: "0.95rem", fontWeight: "bold", marginTop: 0, marginBottom: "12px" }}>MATRİSLER VE KATMANLAR</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ color: "#ffd700", fontWeight: "bold", fontSize: "0.85rem", cursor: "pointer" }} onClick={onVisualize}>► <span style={{ color: "#fff" }}>🔤 KÖK HECE MATRİSİ</span></div>
            <div style={{ color: "#ffd700", fontWeight: "bold", fontSize: "0.85rem", cursor: "pointer" }} onClick={onVisualize}>► <span style={{ color: "#fff" }}>🗺️ DAMGA ATLASI</span></div>
            <div style={{ color: "#ffd700", fontWeight: "bold", fontSize: "0.85rem", cursor: "pointer" }} onClick={onVisualize}>► <span style={{ color: "#fff" }}>🔬 OKUMA & ANALİZ MOTORU</span></div>
            <div style={{ color: "#ffd700", fontWeight: "bold", fontSize: "0.85rem", cursor: "pointer" }} onClick={onVisualize}>► <span style={{ color: "#fff" }}>🌏 GÖÇ & AKIŞ HARİTASI</span></div>
          </div>
        </div>

        {/* SAĞ PANEL */}
        <div style={{ ...cardStyle, display: "flex", flexDirection: "column" }}>
          <h3 style={{ color: "#ffd700", fontSize: "0.95rem", fontWeight: "bold", marginTop: 0, marginBottom: "12px" }}>⚡ YKOS ÇÖZÜMLERİ VE İNDEKLSER</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "15px" }}>
            
            {/* Tıklanınca Okuma Ekranına Giden Kartlar */}
            <div 
              onClick={() => onNavigateRead && onNavigateRead(1)}
              style={{ background: "rgba(255, 215, 0, 0.05)", border: "1px solid rgba(255, 215, 0, 0.4)", borderRadius: "6px", padding: "10px", fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold", cursor: "pointer", transition: "all 0.2s" }}
            >
              📜 Göbeklitepe T-Sütunu YKOS Okuması →
            </div>
            
            <div 
              onClick={() => onNavigateRead && onNavigateRead(2)}
              style={{ background: "rgba(255, 215, 0, 0.05)", border: "1px solid rgba(255, 215, 0, 0.4)", borderRadius: "6px", padding: "10px", fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold", cursor: "pointer", transition: "all 0.2s" }}
            >
              📜 Etrüsk Lemnos Kitabesi & Ön Türkçe Eşleşmesi →
            </div>

          </div>

          <button 
            onClick={onVisualize}
            style={{ background: "linear-gradient(135deg, #ffd700, #b8860b)", color: "#000000", border: "none", padding: "12px", borderRadius: "6px", fontWeight: "900", fontSize: "0.85rem", cursor: "pointer", marginTop: "auto", boxShadow: "0 0 12px rgba(255, 215, 0, 0.35)" }}
          >
            🗣️ BALONCUK MATRİSİNİ GÖRSELLEŞTİR ➔
          </button>
        </div>

      </div>

    </div>
  );
}