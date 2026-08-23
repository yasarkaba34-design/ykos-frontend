import React, { useState, useEffect } from "react";
import YKOSDashboard from "./layouts/YKOSDashboard";
import { defaultArchiveArticles } from "./data/ykosDataService";
import AdminPanel from "./layouts/AdminPanel";
import YalinVeriGirisi from './pages/YalinVeriGirisi';
import OpsCenter from "./layouts/OpsCenter";
import BubbleMatrix from "./mega/BubbleMatrix.jsx";
import AtlasMap from "./mega/AtlasMap";

export function App() {
  const [currentView, setCurrentView] = useState("dashboard"); 
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [userRole, setUserRole] = useState("guest");
  
  const [selectedArticleData, setSelectedArticleData] = useState(null);
  const [archiveArticles, setArchiveArticles] = useState(defaultArchiveArticles);
  const [rssArticles, setRssArticles] = useState([]);
  const [currentLang, setCurrentLang] = useState("TR");
  const [lightboxImage, setLightboxImage] = useState(null);

  const loadMergedArticles = () => {
    try {
      const savedAdmin = JSON.parse(localStorage.getItem('ykos_admin_records') || '[]');
      const approvedItems = savedAdmin
        .filter(r => r.status === 'approved' || r.durum === 'onaylandi' || r.status === 'published')
        .map(r => ({
          id: r.id,
          title: r.title || r.baslik,
          summary: r.summary || r.ozet || "",
          content: r.content || r.icerik || "",
          category: r.category || r.kategori || "Damga",
          image: r.image || r.mansetGorsel || r.imagePreview || "",
          gallery: r.gallery || r.galeri || [],
          isNew: true,
          date: r.tarih || new Date().toLocaleDateString('tr-TR')
        }));

      setArchiveArticles([...approvedItems, ...defaultArchiveArticles]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadMergedArticles();
  }, [currentView]);

  const handleNavigateLogin = () => { 
    setLoginId(""); setLoginPassword(""); setLoginError(""); setCurrentView("login"); 
  };
  
  const handleNavigateRead = (id) => { 
    let found = archiveArticles.find(a => a.id === id);
    if (!found) {
      const saved = localStorage.getItem("ykos_admin_records");
      if (saved) {
        try { found = JSON.parse(saved).find(a => a.id === id); } catch(e) {}
      }
    }
    setSelectedArticleData(found || {
      title: "Bulgu Detayı",
      content: "İçerik yüklenemedi.",
      category: "Genel",
      date: new Date().toLocaleDateString('tr-TR')
    });
    setCurrentView("read"); 
  };

  const containerStyle = { 
    maxWidth: "1220px", 
    margin: "0 auto", 
    padding: "16px", 
    backgroundColor: "#050811", 
    border: "1px solid #ffd700", 
    borderRadius: "10px", 
    boxShadow: "0 8px 32px rgba(0,0,0,0.8)", 
    color: "#fff", 
    boxSizing: "border-box" 
  };

  return (
    <div className="app-main-wrapper" style={{ backgroundColor: "#050811", minHeight: "100vh", color: "#ffffff", paddingBottom: "25px" }}>

      {/* GERİ BUTONU */}
      {currentView !== "dashboard" && (
        <div style={{ maxWidth: "1220px", margin: "0 auto", padding: "10px 16px 6px", textAlign: "right" }}>
          <button 
            onClick={() => setCurrentView("dashboard")} 
            style={{ padding: "6px 14px", background: "transparent", border: "1px solid #ffd700", color: "#ffd700", fontWeight: "bold", borderRadius: "6px", cursor: "pointer", fontSize: "0.8rem" }}
          >
            🏠 Ana Sayfa
          </button>
        </div>
      )}

      {/* 1. ANA SAYFA */}
      {currentView === "dashboard" && (
        <YKOSDashboard 
          archiveArticles={archiveArticles} rssArticles={rssArticles} currentLang={currentLang} setCurrentLang={setCurrentLang}
          onVisualize={() => setCurrentView("visualize")} onNavigateRead={handleNavigateRead}
          onNavigateLogin={handleNavigateLogin} onNavigateAtlas={() => setCurrentView("atlas")}
          onNavigateEngine={() => setCurrentView("engine")} onNavigateFlow={() => setCurrentView("flow")}
          onNavigateMethod={() => setCurrentView("methodology")} onGoHome={() => setCurrentView("dashboard")}
          onNavigateAcikVeri={() => setCurrentView("yalinVeri")} onNavigateOpsCenter={() => setCurrentView("ops-center")}
        />
      )}

      {/* 2. BALONCUK MATRİSİ (MATRİSLER GERİ GELDİ) */}
      {currentView === "visualize" && (
        <div style={containerStyle}>
          <BubbleMatrix onGoHome={() => setCurrentView("dashboard")} onSelectNode={(node) => console.log(node)} />
        </div>
      )}

      {/* 3. DAMGA ATLASI */}
      {currentView === "atlas" && (
        <div style={containerStyle}>
          <AtlasMap onGoHome={() => setCurrentView("dashboard")} />
        </div>
      )}

      {/* 4. OKUMA MODÜLÜ */}
      {currentView === "read" && selectedArticleData && (
        <div style={containerStyle}>
          <div style={{ borderBottom: "1px solid #ffd700", paddingBottom: "8px", marginBottom: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#ffd700", marginBottom: "4px" }}>
              <span>🏷️ {selectedArticleData.category || selectedArticleData.kategori || "YKOS Katmanı"}</span>
              <span>📅 {selectedArticleData.date || selectedArticleData.tarih || "Kayıt"}</span>
            </div>
            <h1 style={{ color: "#ffd700", margin: "0 0 6px 0", fontSize: "1.35rem", lineHeight: "1.3" }}>
              {selectedArticleData.title || selectedArticleData.baslik}
            </h1>
            {(selectedArticleData.summary || selectedArticleData.ozet) && (
              <p style={{ color: "#00ff7f", fontSize: "0.9rem", fontStyle: "italic", margin: 0, lineHeight: "1.4" }}>
                {selectedArticleData.summary || selectedArticleData.ozet}
              </p>
            )}
          </div>

          {(selectedArticleData.image || selectedArticleData.mansetGorsel || selectedArticleData.imagePreview) && (
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <img 
                src={selectedArticleData.image || selectedArticleData.mansetGorsel || selectedArticleData.imagePreview} 
                alt="Manşet" 
                title="Büyütmek için tıklayın"
                onClick={() => setLightboxImage(selectedArticleData.image || selectedArticleData.mansetGorsel || selectedArticleData.imagePreview)}
                style={{ maxWidth: "100%", maxHeight: "360px", borderRadius: "6px", border: "1px solid #ffd700", objectFit: "contain", cursor: "zoom-in" }}
              />
            </div>
          )}

          <div style={{ color: "#ddd", fontSize: "0.92rem", lineHeight: "1.6", whiteSpace: "pre-wrap", marginBottom: "18px", background: "rgba(255,255,255,0.02)", padding: "14px", borderRadius: "6px", border: "1px solid #222" }}>
            {selectedArticleData.content || selectedArticleData.icerik || selectedArticleData.description || "Detaylı metin bulunamadı."}
          </div>

          {selectedArticleData.gallery && selectedArticleData.gallery.length > 0 && (
            <div style={{ marginBottom: "16px" }}>
              <h4 style={{ color: "#ffd700", borderBottom: "1px dashed #444", paddingBottom: "4px", fontSize: "0.9rem", margin: "0 0 10px 0" }}>
                🖼️ İnceleme & Detay Galerisi
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "8px" }}>
                {selectedArticleData.gallery.map((img, i) => (
                  <img 
                    key={i} 
                    src={img} 
                    alt={`Galeri ${i+1}`} 
                    title="Büyütmek için tıklayın"
                    style={{ width: "100%", height: "90px", objectFit: "cover", borderRadius: "4px", border: "1px solid #444", cursor: "zoom-in" }}
                    onClick={() => setLightboxImage(img)}
                  />
                ))}
              </div>
            </div>
          )}

          <div style={{ textAlign: "center", borderTop: "1px solid #222", paddingTop: "12px" }}>
            <button 
              onClick={() => setCurrentView("dashboard")} 
              style={{ padding: "8px 20px", background: "#ffd700", color: "#000", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", fontSize: "0.85rem" }}
            >
              ← Ana Sayfaya Dön
            </button>
          </div>
        </div>
      )}

      {/* 5. YALIN BULGU FORMU */}
      {currentView === "yalinVeri" && (
        <div style={containerStyle}>
          <YalinVeriGirisi />
        </div>
      )}

      {/* 6. YÖNETİCİ PANELİ */}
      {currentView === "admin-panel" && (
        <div style={containerStyle}>
          <AdminPanel onLogout={() => setCurrentView("dashboard")} userRole={userRole} />
        </div>
      )}

      {/* 7. OPERASYON MERKEZİ */}
      {currentView === "ops-center" && (
        <div style={containerStyle}>
          <OpsCenter onGoHome={() => setCurrentView("dashboard")} />
        </div>
      )}

      {/* 8. ŞİFRELİ GİRİŞ */}
      {currentView === "login" && (
        <div style={containerStyle}>
          <div style={{ maxWidth: "380px", margin: "20px auto", background: "rgba(255,215,0,0.03)", border: "1px solid #ffd700", padding: "20px", borderRadius: "8px" }}>
            <h2 style={{ color: "#ffd700", textAlign: "center", fontSize: "1rem" }}>🔒 YÖNETİCİ GİRİŞİ</h2>
            {loginError && <div style={{ color: "#ff4d4d", marginBottom: "8px", fontSize: "0.8rem" }}>{loginError}</div>}
            <input type="text" placeholder="Yönetici ID" value={loginId} onChange={(e) => setLoginId(e.target.value)} style={{ width: "100%", padding: "8px", marginBottom: "8px", background: "#000", border: "1px solid #ffd700", color: "#fff", borderRadius: "4px", boxSizing: "border-box" }} />
            <input type="password" placeholder="Şifre" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} style={{ width: "100%", padding: "8px", marginBottom: "12px", background: "#000", border: "1px solid #ffd700", color: "#fff", borderRadius: "4px", boxSizing: "border-box" }} />
            <button onClick={() => {
              if (loginId === "admin" && loginPassword === "ykos2026") {
                setLoginError(""); setCurrentView("admin-panel");
              } else { setLoginError("Hatalı ID veya Şifre!"); }
            }} style={{ width: "100%", padding: "10px", background: "#ffd700", color: "#000", border: "none", borderRadius: "4px", fontWeight: "900", cursor: "pointer" }}>GİRİŞ YAP</button>
          </div>
        </div>
      )}

      {/* LIGHTBOX */}
      {lightboxImage && (
        <div 
          onClick={() => setLightboxImage(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(6px)",
            zIndex: 99999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "zoom-out"
          }}
        >
          <button 
            onClick={() => setLightboxImage(null)} 
            style={{ position: "absolute", top: "20px", right: "30px", background: "transparent", border: "none", color: "#ffd700", fontSize: "2.5rem", fontWeight: "bold", cursor: "pointer" }}
          >
            ×
          </button>
          <img 
            src={lightboxImage} 
            alt="Büyük Görsel" 
            style={{ maxWidth: "92vw", maxHeight: "88vh", borderRadius: "8px", border: "2px solid #ffd700", boxShadow: "0 0 35px rgba(255,215,0,0.3)" }} 
          />
        </div>
      )}

    </div>
  );
}

export default App;