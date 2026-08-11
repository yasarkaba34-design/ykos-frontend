import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import { translations } from "../data/i18n";
import { getArchiveSynthesis } from "../data/ykosArchiveSynthesis";
import { searchYkosApi } from "../data/ykosApiService";

export default function YKOSDashboard({ 
  archiveArticles, currentLang, setCurrentLang,
  onVisualize, onNavigateRead, onGoHome, onNavigateLogin, 
  onNavigateAtlas, onNavigateEngine, onNavigateFlow, onNavigateMethod 
}) {
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [apiSynthesis, setApiSynthesis] = useState(null);

  const t = translations[currentLang] || translations.TR;
  const activeArticles = t.articles || archiveArticles;

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
    { icon: "🌐", count: "214", label: t.countries },
    { icon: "🏛️", count: "248", label: t.researches },
    { icon: "🔷", count: "9.870", label: t.stamps },
    { icon: "🗿", count: "18.420", label: t.petroglyphs },
    { icon: "📜", count: "4.132", label: t.inscriptions },
    { icon: "📚", count: "12.580", label: t.sources },
    { icon: "📷", count: "46.900", label: t.images },
    { icon: "🗺️", count: "58", label: t.atlases }
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

  useEffect(() => {
    async function handleSearchApi() {
      if (!searchQuery || searchQuery.trim().length < 2) {
        setApiSynthesis(null);
        return;
      }
      
      const apiResult = await searchYkosApi(searchQuery);
      if (apiResult && apiResult.synthesis) {
        setApiSynthesis(apiResult);
      } else {
        const localResult = getArchiveSynthesis(searchQuery);
        setApiSynthesis(localResult);
      }
    }

    handleSearchApi();
  }, [searchQuery]);

  const filteredArticles = activeArticles.filter(item => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title?.toLowerCase().includes(q) || 
      item.summary?.toLowerCase().includes(q) ||
      item.content?.toLowerCase().includes(q)
    );
  });

  return (
    <div style={{ width: "100%", maxWidth: "1280px", margin: "0 auto", padding: "10px", color: "#ffffff", fontFamily: "Segoe UI, sans-serif" }}>
      
      {/* HEADER */}
      <div style={{ ...cardStyle, padding: "12px 16px 14px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          
          <button 
            onClick={() => { setMenuOpen(!menuOpen); setLangOpen(false); }}
            style={{ background: menuOpen ? "rgba(255, 215, 0, 0.25)" : "rgba(255, 215, 0, 0.1)", border: "1px solid #ffd700", color: "#ffd700", padding: "5px 12px", borderRadius: "5px", fontWeight: "bold", cursor: "pointer", fontSize: "0.78rem" }}
          >
            {t.menu}
          </button>

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

        {/* LOGO VE ANASAYFA LİNKİ */}
        <div 
          onClick={onGoHome} 
          title={t.home || "Ana Sayfa"}
          style={{ textAlign: "center", cursor: "pointer", marginTop: "-18px", userSelect: "none" }}
        >
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "4px" }}>
            <img 
              src="/ykos-logo.png" 
              alt="YKOS Kartal Amblemi" 
              style={{ maxHeight: "56px", maxWidth: "100%", objectFit: "contain", filter: "drop-shadow(0px 0px 8px rgba(255, 215, 0, 0.5))" }} 
              onError={(e) => {
                e.target.onerror = null; 
                e.target.style.display = 'none';
              }}
            />
          </div>
          <h1 style={{ color: "#ffd700", fontSize: "1.35rem", fontWeight: "900", margin: "0", letterSpacing: "1.5px" }}>{t.systemTitle}</h1>
          <p style={{ color: "#aaaaaa", fontSize: "0.72rem", margin: "2px 0 0 0" }}>{t.subTitle}</p>
        </div>

        {/* AÇILIR MENÜ */}
        {menuOpen && (
          <div style={{ marginTop: "12px", borderTop: "1px solid rgba(255, 215, 0, 0.3)", paddingTop: "12px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "6px", marginBottom: "12px" }}>
              <button onClick={() => { setMenuOpen(false); onGoHome(); }} style={{ background: "rgba(255, 215, 0, 0.3)", border: "1px solid #ffd700", color: "#ffd700", padding: "6px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: "bold", cursor: "pointer" }}>{t.home}</button>
              <button onClick={() => { setMenuOpen(false); onNavigateMethod(); }} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,215,0,0.3)", color: "#ccc", padding: "6px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: "bold", cursor: "pointer" }}>{t.corporate}</button>
              <button onClick={() => { setMenuOpen(false); onNavigateMethod(); }} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,215,0,0.3)", color: "#ccc", padding: "6px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: "bold", cursor: "pointer" }}>{t.methodology}</button>
              <button onClick={() => { setMenuOpen(false); onVisualize(); }} style={{ background: "rgba(255, 215, 0, 0.15)", border: "1px solid #ffd700", color: "#ffd700", padding: "6px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: "bold", cursor: "pointer" }}>{t.matrix}</button>
              <button onClick={() => { setMenuOpen(false); onNavigateAtlas(); }} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,215,0,0.3)", color: "#ccc", padding: "6px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: "bold", cursor: "pointer" }}>{t.atlas}</button>
              <button onClick={() => { setMenuOpen(false); onNavigateEngine(); }} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,215,0,0.3)", color: "#ccc", padding: "6px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: "bold", cursor: "pointer" }}>{t.engine}</button>
              <button onClick={() => { setMenuOpen(false); onNavigateFlow(); }} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,215,0,0.3)", color: "#ccc", padding: "6px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: "bold", cursor: "pointer" }}>{t.flow}</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "8px", paddingTop: "10px", borderTop: "1px dashed rgba(255, 215, 0, 0.25)" }}>
              <button onClick={() => { setMenuOpen(false); onNavigateLogin("guest"); }} style={portalButtonStyle}>{t.guestLogin}</button>
              <button onClick={() => { setMenuOpen(false); onNavigateLogin("researcher"); }} style={portalButtonStyle}>{t.researcherLogin}</button>
              <button onClick={() => { setMenuOpen(false); onNavigateLogin("admin"); }} style={portalButtonStyle}>{t.adminLogin}</button>
            </div>
          </div>
        )}
      </div>

      {/* DİNAMİK ARAMA BARI */}
      <div style={{ marginBottom: "15px" }}>
        <SearchBar onSearch={(q) => setSearchQuery(q)} />
      </div>

      {/* ARAMA RAPORU & YÖNLENDİRME BAĞLANTILARI */}
      {apiSynthesis && (
        <div style={{ ...cardStyle, background: "rgba(255, 215, 0, 0.08)", border: "1.5px solid #ffd700" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <span style={{ fontSize: "1.2rem" }}>🌐</span>
            <h4 style={{ color: "#ffd700", margin: 0, fontSize: "0.95rem" }}>YKOS AKADEMİK ARŞİV & API DERLEME RAPORU</h4>
          </div>
          <h5 style={{ color: "#fff", margin: "4px 0 8px 0", fontSize: "0.88rem" }}>{apiSynthesis.title}</h5>
          <p style={{ color: "#ddd", fontSize: "0.82rem", lineHeight: "1.6", margin: "0 0 10px 0" }}>
            {apiSynthesis.synthesis}
          </p>
          <div style={{ fontSize: "0.72rem", color: "#aaa", fontStyle: "italic", marginBottom: "12px" }}>
            📚 Kaynak: {apiSynthesis.sourceVolume || "YKOS Genel Veri Tabanı & Külliyat İndeksi"} — {" "}
            <a 
              href="https://ykos.com.tr" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: "#ffd700", textDecoration: "underline", fontWeight: "bold" }}
            >
              ykos.com.tr
            </a>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", borderTop: "1px dashed rgba(255,215,0,0.3)", paddingTop: "10px" }}>
            <a 
              href="https://ykos.com.tr" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ background: "#ffd700", color: "#000", border: "none", padding: "6px 12px", borderRadius: "4px", fontWeight: "bold", fontSize: "0.75rem", textDecoration: "none", display: "inline-block" }}
            >
              📖 ykos.com.tr 'de İncele →
            </a>
            <button 
              onClick={onVisualize}
              style={{ background: "rgba(255,215,0,0.15)", color: "#ffd700", border: "1px solid #ffd700", padding: "6px 12px", borderRadius: "4px", fontWeight: "bold", fontSize: "0.75rem", cursor: "pointer" }}
            >
              💻 Kök Hece Matrisinde Göster
            </button>
            <button 
              onClick={onNavigateAtlas}
              style={{ background: "transparent", color: "#ccc", border: "1px solid rgba(255,255,255,0.3)", padding: "6px 12px", borderRadius: "4px", fontSize: "0.75rem", cursor: "pointer" }}
            >
              🗺️ Damga Atlasında İncele
            </button>
          </div>
        </div>
      )}

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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "15px" }}>
        
        {/* SOL PANEL */}
        <div style={cardStyle}>
          <h3 style={{ color: "#ffd700", fontSize: "0.95rem", marginTop: 0 }}>{t.matricesTitle}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ color: "#ffd700", fontWeight: "bold", fontSize: "0.85rem", cursor: "pointer" }} onClick={onVisualize}>► <span style={{ color: "#fff" }}>💻 {t.matrix}</span></div>
            <div style={{ color: "#ffd700", fontWeight: "bold", fontSize: "0.85rem", cursor: "pointer" }} onClick={onNavigateAtlas}>► <span style={{ color: "#fff" }}>🗺️ {t.atlas}</span></div>
            <div style={{ color: "#ffd700", fontWeight: "bold", fontSize: "0.85rem", cursor: "pointer" }} onClick={onNavigateEngine}>► <span style={{ color: "#fff" }}>🔬 {t.engine}</span></div>
            <div style={{ color: "#ffd700", fontWeight: "bold", fontSize: "0.85rem", cursor: "pointer" }} onClick={onNavigateFlow}>► <span style={{ color: "#fff" }}>🟢 {t.flow}</span></div>
          </div>
        </div>

        {/* SAĞ PANEL */}
        <div style={{ ...cardStyle, display: "flex", flexDirection: "column" }}>
          <h3 style={{ color: "#ffd700", fontSize: "0.95rem", marginTop: 0 }}>
            {t.solutionsTitle} {searchQuery && <span style={{ fontSize: "0.75rem", color: "#fff", fontWeight: "normal" }}>({filteredArticles.length} Kayıt)</span>}
          </h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "15px", maxHeight: "400px", overflowY: "auto" }}>
            {filteredArticles.map((item) => (
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
            {t.visualizeBtn}
          </button>
        </div>

      </div>

    </div>
  );
}
