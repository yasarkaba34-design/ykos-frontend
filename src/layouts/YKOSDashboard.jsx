import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import { translations } from "../data/i18n";
import { getArchiveSynthesis } from "../data/ykosArchiveSynthesis";
import { searchYkosApi } from "../data/ykosApiService";

export default function YKOSDashboard({ 
  archiveArticles, rssArticles = [], currentLang, setCurrentLang, 
  onVisualize, onNavigateRead, onGoHome, onNavigateLogin, 
  onNavigateAtlas, onNavigateEngine, onNavigateFlow, onNavigateMethod,
  onNavigateAcikVeri
}) {
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [apiSynthesis, setApiSynthesis] = useState(null);
  
  const [selectedItemForModal, setSelectedItemForModal] = useState(null);

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
    padding: "14px 18px",
    marginBottom: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.7)"
  };

  const portalButtonStyle = {
    background: "linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(184, 134, 11, 0.1))",
    border: "1px solid rgba(255, 215, 0, 0.5)",
    color: "#ffd700",
    padding: "10px 14px",
    borderRadius: "6px",
    fontSize: "0.8rem",
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

  const [localAdminRecords, setLocalAdminRecords] = useState([]);
  
  useEffect(() => {
    const savedRecords = localStorage.getItem("ykos_admin_records");
    if (savedRecords) {
      try {
        const parsed = JSON.parse(savedRecords);
        const publishedRecords = parsed.filter(rec => rec.status === "published");
        setLocalAdminRecords(publishedRecords);
      } catch (e) {
        console.error("Admin kayıtları okunamadı:", e);
      }
    }
  }, []);

  const allArticles = [...rssArticles, ...localAdminRecords, ...activeArticles];
  const uniqueArticles = Array.from(new Map(allArticles.map(item => [item.title, item])).values());

  const filteredArticles = uniqueArticles.filter(item => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title?.toLowerCase().includes(q) || 
      item.summary?.toLowerCase().includes(q) ||
      item.content?.toLowerCase().includes(q) ||
      item.tags?.toLowerCase().includes(q) ||
      item.rootSyllable?.toLowerCase().includes(q)
    );
  });

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setSelectedItemForModal(null);
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: "1280px", margin: "0 auto", padding: "10px", color: "#ffffff", fontFamily: "Segoe UI, sans-serif" }}>
      
      {/* HEADER - Tertemiz Üst Alan */}
      <div style={{ ...cardStyle, padding: "6px 24px 8px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2px" }}>
          
          <button 
            onClick={() => { setMenuOpen(!menuOpen); setLangOpen(false); }}
            style={{ 
              background: menuOpen ? "rgba(255, 215, 0, 0.25)" : "rgba(255, 215, 0, 0.1)", 
              border: "2px solid #ffd700", 
              color: "#ffd700", 
              padding: "8px 22px", 
              borderRadius: "8px", 
              fontWeight: "900", 
              cursor: "pointer", 
              fontSize: "1rem",
              textTransform: "uppercase",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
            }}
          >
            {t.menu}
          </button>

          <div style={{ position: "relative" }}>
            <button 
              onClick={() => { setLangOpen(!langOpen); setMenuOpen(false); }}
              style={{ 
                background: "rgba(255,215,0,0.05)", 
                border: "2px solid #ffd700", 
                color: "#ffd700", 
                padding: "8px 18px", 
                borderRadius: "8px", 
                fontWeight: "900", 
                cursor: "pointer", 
                fontSize: "1rem",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
              }}
            >
              🌐 {currentLang} ▾
            </button>
            {langOpen && (
              <div style={{ position: "absolute", right: 0, top: "120%", backgroundColor: "#050811", border: "2px solid #ffd700", borderRadius: "10px", display: "flex", flexDirection: "column", minWidth: "180px", zIndex: 1000, boxShadow: "0 10px 30px rgba(0,0,0,0.9)", padding: "8px" }}>
                {languages.map((l) => (
                  <button key={l.code} onClick={() => { setCurrentLang(l.code); setLangOpen(false); }} style={{ background: currentLang === l.code ? "rgba(255,215,0,0.2)" : "transparent", border: "none", color: currentLang === l.code ? "#ffd700" : "#fff", padding: "10px 14px", textAlign: "left", fontSize: "0.9rem", cursor: "pointer" }}>
                    {l.label} ({l.code})
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Logo ve Başlık Grubu */}
        <div 
          onClick={() => window.location.reload()} 
          title="Sayfayı Yenile"
          style={{ textAlign: "center", cursor: "pointer", userSelect: "none", marginTop: "-6px" }}
        >
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "2px" }}>
            <img 
              src="/ykos-logo.png" 
              alt="YKOS Kartal Amblemi" 
              style={{ maxHeight: "110px", maxWidth: "100%", objectFit: "contain", filter: "drop-shadow(0px 0px 12px rgba(255, 215, 0, 0.6))" }} 
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
          <h1 style={{ color: "#ffd700", fontSize: "1.65rem", fontWeight: "900", margin: "0", letterSpacing: "1.2px" }}>{t.systemTitle}</h1>
          <p style={{ color: "#aaaaaa", fontSize: "0.8rem", margin: "1px 0 0 0", letterSpacing: "0.5px" }}>{t.subTitle}</p>
        </div>
        
        {menuOpen && (
          <div style={{ marginTop: "10px", borderTop: "1px solid rgba(255, 215, 0, 0.3)", paddingTop: "10px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "6px", marginBottom: "8px" }}>
              <button onClick={() => window.location.reload()} style={{ background: "rgba(255, 215, 0, 0.3)", border: "1.5px solid #ffd700", color: "#ffd700", padding: "6px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: "bold", cursor: "pointer" }}>{t.home}</button>
              <button onClick={() => { setMenuOpen(false); onNavigateMethod(); }} style={{ background: "rgba(255,255,255,0.02)", border: "1.5px solid rgba(255,215,0,0.3)", color: "#ccc", padding: "6px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: "bold", cursor: "pointer" }}>{t.corporate}</button>
              <button onClick={() => { setMenuOpen(false); onNavigateMethod(); }} style={{ background: "rgba(255,255,255,0.02)", border: "1.5px solid rgba(255,215,0,0.3)", color: "#ccc", padding: "6px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: "bold", cursor: "pointer" }}>{t.methodology}</button>
              <button onClick={() => { setMenuOpen(false); onVisualize(); }} style={{ background: "rgba(255, 215, 0, 0.15)", border: "1.5px solid #ffd700", color: "#ffd700", padding: "6px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: "bold", cursor: "pointer" }}>{t.matrix}</button>
              <button onClick={() => { setMenuOpen(false); onNavigateAtlas(); }} style={{ background: "rgba(255,255,255,0.02)", border: "1.5px solid rgba(255,215,0,0.3)", color: "#ccc", padding: "6px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: "bold", cursor: "pointer" }}>{t.atlas}</button>
              <button onClick={() => { setMenuOpen(false); onNavigateEngine(); }} style={{ background: "rgba(255,255,255,0.02)", border: "1.5px solid rgba(255,215,0,0.3)", color: "#ccc", padding: "6px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: "bold", cursor: "pointer" }}>{t.engine}</button>
              <button onClick={() => { setMenuOpen(false); onNavigateFlow(); }} style={{ background: "rgba(255,255,255,0.02)", border: "1.5px solid rgba(255,215,0,0.3)", color: "#ccc", padding: "6px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: "bold", cursor: "pointer" }}>{t.flow}</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "8px", paddingTop: "8px", borderTop: "1px dashed rgba(255, 215, 0, 0.25)" }}>
              <button onClick={() => { setMenuOpen(false); onNavigateLogin("guest"); }} style={portalButtonStyle}>{t.guestLogin}</button>
              <button onClick={() => { setMenuOpen(false); onNavigateLogin("admin"); }} style={portalButtonStyle}>{t.adminLogin}</button>
            </div>
          </div>
        )}
      </div>

      {/* DİNAMİK ARAMA BARI */}
      <div style={{ marginBottom: "12px" }}>
        <SearchBar onSearch={(q) => setSearchQuery(q)} />
      </div>

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
            <a href="https://ykos.com.tr" target="_blank" rel="noopener noreferrer" style={{ color: "#ffd700", textDecoration: "underline", fontWeight: "bold" }}>
              ykos.com.tr
            </a>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", borderTop: "1px dashed rgba(255,215,0,0.3)", paddingTop: "10px" }}>
            <a href="https://ykos.com.tr" target="_blank" rel="noopener noreferrer" style={{ background: "#ffd700", color: "#000", border: "none", padding: "6px 12px", borderRadius: "4px", fontWeight: "bold", fontSize: "0.75rem", textDecoration: "none", display: "inline-block" }}>
              📖 ykos.com.tr 'de İncele →
            </a>
            <button onClick={onVisualize} style={{ background: "rgba(255,215,0,0.15)", color: "#ffd700", border: "1px solid #ffd700", padding: "6px 12px", borderRadius: "4px", fontWeight: "bold", fontSize: "0.75rem", cursor: "pointer" }}>
              💻 Kök Hece Matrisinde Göster
            </button>
            <button onClick={onNavigateAtlas} style={{ background: "transparent", color: "#ccc", border: "1px solid rgba(255,255,255,0.3)", padding: "6px 12px", borderRadius: "4px", fontSize: "0.75rem", cursor: "pointer" }}>
              🗺️ Damga Atlasında İncele
            </button>
          </div>
        </div>
      )}

      {/* İSTATİSTİK SAYAÇLARI */}
      <div style={cardStyle}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: "10px" }}>
          {initialStats.map((item, idx) => (
            <div key={idx} style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 215, 0, 0.25)", borderRadius: "8px", padding: "8px 4px", textAlign: "center" }}>
              <span style={{ fontSize: "1rem" }}>{item.icon}</span>
              <div style={{ color: "#fff", fontWeight: "900", fontSize: "0.95rem" }}>{item.count}</div>
              <div style={{ color: "#888", fontSize: "0.65rem", fontWeight: "bold" }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ALT PANEL - CANLI LİSTE */}
      <div style={{ ...cardStyle, display: "flex", flexDirection: "column" }}>
        <h3 style={{ color: "#ffd700", fontSize: "1.05rem", marginTop: 0, borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "8px", marginBottom: "12px" }}>
          {t.solutionsTitle} {searchQuery && <span style={{ fontSize: "0.85rem", color: "#fff", fontWeight: "normal" }}>({filteredArticles.length} Kayıt)</span>}
        </h3>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "12px", marginBottom: "20px", maxHeight: "600px", overflowY: "auto", paddingRight: "5px" }}>
          {filteredArticles.map((item, idx) => (
            <div 
              key={item.id || `rss-${idx}`}
              style={{ 
                background: item.url ? "rgba(0, 255, 127, 0.04)" : "rgba(255, 215, 0, 0.05)", 
                border: item.url ? "1px solid rgba(0, 255, 127, 0.3)" : "1px solid rgba(255, 215, 0, 0.4)", 
                borderRadius: "8px", 
                padding: "14px", 
                color: item.url ? "#00ff7f" : "#ffd700", 
                display: "flex",
                gap: "12px",
                alignItems: "flex-start",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 6px 15px rgba(255, 215, 0, 0.15)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              {item.imagePreview && (
                <div 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    setSelectedItemForModal(item); 
                  }}
                  style={{ flexShrink: 0, width: "75px", height: "75px", borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(255, 215, 0, 0.5)", cursor: "zoom-in" }}
                  title="Görseli Büyüt"
                >
                  <img 
                    src={item.imagePreview} 
                    alt="Damga" 
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }} 
                    onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
                    onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                  />
                </div>
              )}

              <div 
                style={{ flex: 1, cursor: "pointer" }}
                onClick={() => {
                  if (item.url) {
                    if (currentLang === "TR") {
                      window.open(item.url, "_blank");
                    } else {
                      const targetLang = currentLang.toLowerCase();
                      const translateUrl = `https://translate.google.com/translate?sl=tr&tl=${targetLang}&u=${encodeURIComponent(item.url)}`;
                      window.open(translateUrl, "_blank");
                    }
                  } else {
                    onNavigateRead(item.id); 
                  }
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", fontWeight: "bold", fontSize: "0.92rem", marginBottom: "4px" }}>
                  <span>{item.url ? "📡" : "📜"} {item.title}</span>
                  {item.url && <span style={{ fontSize: "0.62rem", background: "rgba(0, 255, 127, 0.15)", padding: "2px 6px", borderRadius: "4px", color: "#00ff7f", marginLeft: "8px" }}>YENİ</span>}
                </div>
                
                {item.rootSyllable && (
                  <div style={{ fontSize: "0.72rem", color: "#00ff7f", marginBottom: "6px", fontWeight: "bold" }}>
                     🔤 Kök: {item.rootSyllable} | 🏷️ {item.category}
                  </div>
                )}

                <div style={{ fontSize: "0.78rem", color: "#ccc", fontWeight: "normal", lineHeight: "1.4" }}>
                  {item.summary}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Alt Butonlar */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", width: "100%", maxWidth: "800px", margin: "0 auto" }}>
          <button 
            onClick={onVisualize}
            style={{ flex: 1, background: "linear-gradient(135deg, #ffd700, #b8860b)", color: "#000000", border: "none", padding: "12px", borderRadius: "8px", fontWeight: "900", fontSize: "0.9rem", cursor: "pointer", display: "block" }}
          >
            {t.visualizeBtn}
          </button>
          
          <button 
            onClick={onNavigateAcikVeri}
            style={{ flex: 1, background: "linear-gradient(135deg, #00ff7f, #008000)", color: "#000000", border: "none", padding: "12px", borderRadius: "8px", fontWeight: "900", fontSize: "0.9rem", cursor: "pointer", display: "block" }}
          >
            🌐 AÇIK VERİ PORTALINA GİT
          </button>
        </div>
      </div>

      {/* MODAL KATMANI */}
      {selectedItemForModal && (
        <div 
          onClick={handleOverlayClick}
          style={{
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.85)", backdropFilter: "blur(5px)",
            zIndex: 9999, display: "flex", justifyContent: "center", alignItems: "center", cursor: "zoom-out"
          }}
        >
          <div style={{ position: "relative", maxWidth: "90%", maxHeight: "90%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <button 
              onClick={() => setSelectedItemForModal(null)}
              style={{ position: "absolute", top: "-40px", right: "0px", background: "transparent", border: "none", color: "#ffd700", fontSize: "2rem", cursor: "pointer", fontWeight: "bold" }}
            >
              ×
            </button>
            <img 
              src={selectedItemForModal.imagePreview} 
              alt={selectedItemForModal.title} 
              style={{ maxWidth: "100%", maxHeight: "75vh", borderRadius: "8px", border: "2px solid #ffd700", boxShadow: "0 10px 40px rgba(0,0,0,0.8)" }} 
            />
            <div style={{ marginTop: "15px", background: "rgba(5, 8, 17, 0.9)", border: "1px solid rgba(255, 215, 0, 0.4)", borderRadius: "8px", padding: "15px 20px", textAlign: "center", width: "100%", maxWidth: "600px" }}>
              <h3 style={{ color: "#ffd700", margin: "0 0 5px 0", fontSize: "1.1rem" }}>{selectedItemForModal.title}</h3>
              <div style={{ color: "#00ff7f", fontSize: "0.85rem", fontWeight: "bold", marginBottom: "8px" }}>
                {selectedItemForModal.rootSyllable ? `🔤 Kök: ${selectedItemForModal.rootSyllable}` : ""} 
                {selectedItemForModal.category ? ` | 🏷️ Kategori: ${selectedItemForModal.category}` : ""}
              </div>
              {selectedItemForModal.country && selectedItemForModal.period && (
                <div style={{ color: "#aaa", fontSize: "0.75rem" }}>
                  📍 {selectedItemForModal.country}, {selectedItemForModal.region} — ⏳ {selectedItemForModal.period}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
