import React, { useState } from "react";
import SearchBar from "../components/SearchBar";

const archiveData = [
  { id: 1, title: "Çatalhöyük Kök Hece ve Damga Sembolizmi", summary: "Çatalhöyük duvar resimlerindeki YKOS 100 eşleşmeleri." },
  { id: 2, title: "Göbeklitepe T-Sütunu YKOS Okuması", summary: "Şanlıurfa Göbeklitepe T-Sütunları üzerindeki semboller." },
  { id: 3, title: "Etrüsk Lemnos Kitabesi & Ön Türkçe Eşleşmesi", summary: "Lemnos mezar taşındaki alfabetik dizilimin okuması." },
  { id: 4, title: "YOL Kök Hecesi ve Akış Teorisi", summary: "'Rulo değil yol' mantığının dilbilimsel matrisi." }
];

export default function YKOSDashboard({ 
  onVisualize, onNavigateRead, onGoHome, onNavigateLogin, 
  onNavigateAtlas, onNavigateEngine, onNavigateFlow, onNavigateMethod 
}) {
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("TR");
  const [searchQuery, setSearchQuery] = useState("");

  // 10 Dünya Dili Listesi
  const languages = [
    { code: "TR", label: "Türkçe" },
    { code: "EN", label: "English" },
    { code: "FR", label: "Français" },
    { code: "RU", label: "Русский" },
    { code: "ZH", label: "中文" },
    { code: "JA", label: "日本語" },
    { code: "PT", label: "Português" },
    { code: "ES", label: "Español" },
    { code: "AR", label: "العربية" },
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
    padding: "16px 20px",
    marginBottom: "15px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.7)"
  };

  const portalButtonStyle = {
    background: "linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(184, 134, 11, 0.1))",
    border: "1px solid rgba(255, 215, 0, 0.5)",
    color: "#ffd700",
    padding: "8px 12px",
    borderRadius: "6px",
    fontSize: "0.72rem",
    fontWeight: "800",
    cursor: "pointer",
    textAlign: "center"
  };

  return (
    <div style={{ width: "100%", maxWidth: "1240px", margin: "0 auto", padding: "10px", color: "#ffffff", fontFamily: "Segoe UI, sans-serif" }}>
      
      {/* HEADER */}
      <div style={{ ...cardStyle, padding: "12px 16px 14px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          
          {/* MENÜ BUTONU */}
          <button 
            onClick={() => { setMenuOpen(!menuOpen); setLangOpen(false); }}
            style={{ background: menuOpen ? "rgba(255, 215, 0, 0.25)" : "rgba(255, 215, 0, 0.1)", border: "1px solid #ffd700", color: "#ffd700", padding: "5px 12px", borderRadius: "5px", fontWeight: "bold", cursor: "pointer", fontSize: "0.78rem" }}
          >
            ☰ MENÜ
          </button>

          {/* 10 DİLLİ SEÇİM BUTONU & MENÜSÜ */}
          <div style={{ position: "relative" }}>
            <button 
              onClick={() => { setLangOpen(!langOpen); setMenuOpen(false); }}
              style={{ background: "transparent", border: "1px solid #ffd700", color: "#ffd700", padding: "4px 10px", borderRadius: "5px", fontWeight: "bold", cursor: "pointer", fontSize: "0.75rem" }}
            >
              🌐 {currentLang} ▾
            </button>

            {langOpen && (
              <div style={{ position: "absolute", right: 0, top: "110%", backgroundColor: "#050811", border: "1px solid #ffd700", borderRadius: "8px", display: "flex", flexDirection: "column", minWidth: "140px", maxHeight: "220px", overflowY: "auto", zIndex: 1000, boxShadow: "0 6px 20px rgba(0,0,0,0.9)", padding: "4px" }}>
                {languages.map((l) => (
                  <button 
                    key={l.code}
                    onClick={() => { setCurrentLang(l.code); setLangOpen(false); }}
                    style={{ background: currentLang === l.code ? "rgba(255,215,0,0.2)" : "transparent", border: "none", color: currentLang === l.code ? "#ffd700" : "#fff", padding: "6px 10px", textAlign: "left", fontSize: "0.75rem", cursor: "pointer", fontWeight: currentLang === l.code ? "bold" : "normal" }}
                  >
                    {l.label} ({l.code})
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* LOGO */}
        <div onClick={onGoHome} style={{ textAlign: "center", cursor: "pointer", marginTop: "-18px" }}>
          <h1 style={{ color: "#ffd700", fontSize: "1.35rem", fontWeight: "900", margin: "0", letterSpacing: "1.5px" }}>YKOS BİLGİ SİSTEMİ</h1>
          <p style={{ color: "#aaaaaa", fontSize: "0.72rem", margin: "2px 0 0 0" }}>Disiplinler Arası Algoritmik Kültür ve Dil Veri Tabanı</p>
        </div>

        {/* AÇILIR MENÜ */}
        {menuOpen && (
          <div style={{ marginTop: "12px", borderTop: "1px solid rgba(255, 215, 0, 0.3)", paddingTop: "12px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "6px", marginBottom: "12px" }}>
              <button onClick={() => { setMenuOpen(false); onNavigateMethod(); }} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,215,0,0.3)", color: "#ccc", padding: "6px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: "bold", cursor: "pointer" }}>KURUMSAL</button>
              <button onClick={() => { setMenuOpen(false); onNavigateMethod(); }} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,215,0,0.3)", color: "#ccc", padding: "6px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: "bold", cursor: "pointer" }}>YKOS METODOLOJİSİ</button>
              <button onClick={() => { setMenuOpen(false); onVisualize(); }} style={{ background: "rgba(255, 215, 0, 0.2)", border: "1px solid #ffd700", color: "#ffd700", padding: "6px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: "bold", cursor: "pointer" }}>KÖK HECE MATRİSİ</button>
              <button onClick={() => { setMenuOpen(false); onNavigateAtlas(); }} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,215,0,0.3)", color: "#ccc", padding: "6px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: "bold", cursor: "pointer" }}>DAMGA ATLASI</button>
              <button onClick={() => { setMenuOpen(false); onNavigateEngine(); }} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,215,0,0.3)", color: "#ccc", padding: "6px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: "bold", cursor: "pointer" }}>OKUMA & ANALİZ MOTORU</button>
              <button onClick={() => { setMenuOpen(false); onNavigateFlow(); }} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,215,0,0.3)", color: "#ccc", padding: "6px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: "bold", cursor: "pointer" }}>GÖÇ & AKIŞ HARİTASI</button>
            </div>

            {/* EN ALTTTAKİ GİRİŞ PORTALLARI */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "8px", paddingTop: "10px", borderTop: "1px dashed rgba(255, 215, 0, 0.25)" }}>
              <button onClick={() => { setMenuOpen(false); onNavigateLogin("guest"); }} style={portalButtonStyle}>👤 KONUK PANELİ GİRİŞİ</button>
              <button onClick={() => { setMenuOpen(false); onNavigateLogin("researcher"); }} style={portalButtonStyle}>📝 ARAŞTIRMACI VERİ GİRİŞİ</button>
              <button onClick={() => { setMenuOpen(false); onNavigateLogin("admin"); }} style={portalButtonStyle}>⚙️ YÖNETİCİ VERİ GİRİŞİ</button>
            </div>
          </div>
        )}
      </div>

      {/* ARAMA BARI */}
      <div style={{ marginBottom: "15px" }}>
        <SearchBar onSearch={(q) => setSearchQuery(q)} />
      </div>

      {/* İSTATİSTİK SAYAÇLARI */}
      <div style={cardStyle}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: "10px" }}>
          {initialStats.map((item, idx) => (
            <div key={idx} style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 215, 0, 0.25)", borderRadius: "8px", padding: "10px 4px", textAlign: "center" }}>
              <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
              <div style={{ color: "#fff", fontWeight: "900", fontSize: "1rem" }}>{item.count}</div>
              <div style={{ color: "#888", fontSize: "0.68rem", fontWeight: "bold" }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SOL / SAĞ PANELİ */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "15px" }}>
        
        {/* SOL PANEL */}
        <div style={cardStyle}>
          <h3 style={{ color: "#ffd700", fontSize: "0.95rem", marginTop: 0 }}>MATRİSLER VE KATMANLAR</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ color: "#ffd700", fontWeight: "bold", fontSize: "0.85rem", cursor: "pointer" }} onClick={onVisualize}>► <span style={{ color: "#fff" }}>💻 KÖK HECE MATRİSİ</span></div>
            <div style={{ color: "#ffd700", fontWeight: "bold", fontSize: "0.85rem", cursor: "pointer" }} onClick={onNavigateAtlas}>► <span style={{ color: "#fff" }}>🗺️ DAMGA ATLASI</span></div>
            <div style={{ color: "#ffd700", fontWeight: "bold", fontSize: "0.85rem", cursor: "pointer" }} onClick={onNavigateEngine}>► <span style={{ color: "#fff" }}>🔬 OKUMA & ANALİZ MOTORU</span></div>
            <div style={{ color: "#ffd700", fontWeight: "bold", fontSize: "0.85rem", cursor: "pointer" }} onClick={onNavigateFlow}>► <span style={{ color: "#fff" }}>🟢 GÖÇ & AKIŞ HARİTASI</span></div>
          </div>
        </div>

        {/* SAĞ PANEL */}
        <div style={{ ...cardStyle, display: "flex", flexDirection: "column" }}>
          <h3 style={{ color: "#ffd700", fontSize: "0.95rem", marginTop: 0 }}>⚡ YKOS ÇÖZÜMLERİ VE İNDEKLSER</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "15px" }}>
            {archiveData.map((item) => (
              <div 
                key={item.id}
                onClick={() => onNavigateRead(item.id)}
                style={{ background: "rgba(255, 215, 0, 0.05)", border: "1px solid rgba(255, 215, 0, 0.4)", borderRadius: "6px", padding: "10px", fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold", cursor: "pointer" }}
              >
                📜 {item.title} →
                <div style={{ fontSize: "0.72rem", color: "#ccc", fontWeight: "normal", marginTop: "4px" }}>{item.summary}</div>
              </div>
            ))}
          </div>

          <button 
            onClick={onVisualize}
            style={{ background: "linear-gradient(135deg, #ffd700, #b8860b)", color: "#000000", border: "none", padding: "12px", borderRadius: "6px", fontWeight: "900", fontSize: "0.85rem", cursor: "pointer", marginTop: "auto" }}
          >
            🗣️ BALONCUK MATRİSİNİ GÖRSELLEŞTİR ➔
          </button>
        </div>

      </div>

    </div>
  );
}
