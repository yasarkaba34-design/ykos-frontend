// src/App.jsx
import React, { useState, useEffect } from "react";
import { nodeAnalysisData } from "./nodeAnalysisData";
import YKOSDashboard from "./layouts/YKOSDashboard";
import { defaultArchiveArticles } from "./data/ykosDataService";
import AdminPanel from "./layouts/AdminPanel";
import YalinVeriGirisi from './pages/YalinVeriGirisi';
import OpsCenter from "./layouts/OpsCenter";
import BubbleMatrix from "./mega/BubbleMatrix.jsx";
import AtlasMap from "./mega/AtlasMap";
import Hakkimizda from "./pages/Hakkimizda";
import './index.css' // (veya App.css)

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
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    try {
      const savedAdmin = JSON.parse(localStorage.getItem('ykos_admin_records') || '[]');
      const approvedItems = savedAdmin
        .filter(r => r.status === 'approved' || r.durum === 'onaylandi' || r.status === 'published' || r.status === 'Aktif' || r.durum === 'Aktif')
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

      {/* GERİ DÖNÜŞ BUTONU */}
      {currentView !== "dashboard" && (
        <div style={{ maxWidth: "1220px", margin: "0 auto", padding: "10px 16px 6px", textAlign: "right" }}>
          <button 
            onClick={() => { setCurrentView("dashboard"); setSelectedNode(null); }} 
            style={{ padding: "6px 14px", background: "transparent", border: "1.5px solid #ffd700", color: "#ffd700", fontWeight: "bold", borderRadius: "6px", cursor: "pointer", fontSize: "0.8rem" }}
          >
            🏠 Ana Sayfa
          </button>
        </div>
      )}

      {/* 1. ANA SAYFA */}
      {currentView === "dashboard" && (
        <YKOSDashboard 
          archiveArticles={archiveArticles} 
          rssArticles={rssArticles} 
          currentLang={currentLang} 
          setCurrentLang={setCurrentLang}
          onVisualize={() => setCurrentView("visualize")} 
          onNavigateRead={handleNavigateRead}
          onNavigateLogin={handleNavigateLogin} 
          onNavigateAtlas={() => setCurrentView("atlas")}
          onNavigateEngine={() => setCurrentView("engine")} 
          onNavigateFlow={() => setCurrentView("flow")}
          onNavigateMethod={() => setCurrentView("hakkimizda")}
          onGoHome={() => setCurrentView("dashboard")}
          onNavigateAcikVeri={() => setCurrentView("yalinVeri")} 
          onNavigateOpsCenter={() => setCurrentView("ops-center")}
        />
      )}

      {/* 2. TUDİTAM HAKKIMIZDA & YÖNERGE */}
      {currentView === "hakkimizda" && (
        <Hakkimizda onGoHome={() => setCurrentView("dashboard")} />
      )}

      {/* 3. BALONCUK MATRİSİ VE SAĞ ÇÖZÜMLEME PANELİ */}
      {currentView === "visualize" && (
        <div style={{ ...containerStyle, display: "flex", position: "relative", padding: 0, overflow: "hidden", minHeight: "80vh" }}>
          
          <div style={{ flex: 1, height: "80vh" }}>
            <BubbleMatrix 
              onGoHome={() => setCurrentView("dashboard")} 
              onSelectNode={(node) => setSelectedNode(node)} 
            />
          </div>

          {selectedNode && (
            <div style={{
              width: "320px",
              background: "#060913",
              borderLeft: "1.5px solid #ffd700",
              padding: "16px",
              color: "#fff",
              overflowY: "auto",
              maxHeight: "80vh",
              boxSizing: "border-box",
              zIndex: 100
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "8px", marginBottom: "12px" }}>
                <h3 style={{ color: "#38bdf8", margin: 0, fontSize: "1rem", fontWeight: "900", letterSpacing: "1px" }}>YKOS ÇÖZÜMLEME</h3>
                <button onClick={() => setSelectedNode(null)} style={{ background: "transparent", border: "none", color: "#ef4444", fontSize: "1.2rem", cursor: "pointer", fontWeight: "bold" }}>✕</button>
              </div>

              <div style={{ textAlign: "center", marginBottom: "14px" }}>
                <div style={{ fontSize: "0.68rem", color: "#888", letterSpacing: "1.5px", fontWeight: "bold" }}>SEÇİLEN ELEMAN</div>
                <div style={{ fontSize: "1.2rem", fontWeight: "900", color: "#ffd700", marginTop: "2px" }}>
                  {selectedNode.label || selectedNode.id || selectedNode.name}
                </div>
              </div>

              {(() => {
                const nodeKey = selectedNode.label || selectedNode.id || selectedNode.name;
                const data = (nodeAnalysisData && nodeAnalysisData[nodeKey]) ? nodeAnalysisData[nodeKey] : {
                  category: "Genel Çözümleme",
                  score: "%98.0",
                  desc: `${nodeKey} düğümü YKOS epistemolojik ağı üzerinde doğrulanmış morfolojik birimdir.`,
                  layers: ["Anadolu Katmanı", "Fonetik Ağ"],
                  formula: "Kök Fonem ↔ Damga Eşleşmesi",
                  summary: "Algoritmik dil matrisi içerisinde aktif ilişkisel ağa sahiptir."
                };

                return (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", background: "rgba(255,215,0,0.05)", border: "1px solid rgba(255,215,0,0.2)", borderRadius: "6px", padding: "6px 10px" }}>
                      <div>
                        <div style={{ fontSize: "0.62rem", color: "#aaa" }}>KATEGORİ</div>
                        <div style={{ fontSize: "0.78rem", color: "#00ff7f", fontWeight: "bold" }}>{data.category}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "0.62rem", color: "#aaa" }}>REZONANS</div>
                        <div style={{ fontSize: "0.78rem", color: "#ffd700", fontWeight: "bold" }}>{data.score}</div>
                      </div>
                    </div>

                    <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid #1e293b", borderRadius: "6px", padding: "8px 10px" }}>
                      <div style={{ fontSize: "0.68rem", color: "#38bdf8", fontWeight: "bold", marginBottom: "3px" }}>📋 ONTO-FONETİK TANIM</div>
                      <p style={{ fontSize: "0.74rem", color: "#ddd", margin: 0, lineHeight: "1.4" }}>{data.desc}</p>
                    </div>

                    <div style={{ background: "rgba(56, 189, 248, 0.05)", border: "1px solid rgba(56, 189, 248, 0.3)", borderRadius: "6px", padding: "8px 10px" }}>
                      <div style={{ fontSize: "0.68rem", color: "#ffd700", fontWeight: "bold", marginBottom: "3px" }}>⚙️ ALGORİTMİK FORMÜL</div>
                      <code style={{ fontSize: "0.72rem", color: "#38bdf8" }}>{data.formula}</code>
                    </div>

                    <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid #1e293b", borderRadius: "6px", padding: "8px 10px" }}>
                      <div style={{ fontSize: "0.68rem", color: "#00ff7f", fontWeight: "bold", marginBottom: "5px" }}>🏛️ EPİGRAFİK KATMANLAR</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                        {data.layers && data.layers.map((layer, i) => (
                          <span key={i} style={{ background: "#0c1524", border: "1px solid rgba(0,255,127,0.3)", color: "#eee", fontSize: "0.65rem", padding: "2px 6px", borderRadius: "4px" }}>
                            {layer}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ background: "#0a0f1d", border: "1px dashed rgba(255,215,0,0.3)", borderRadius: "6px", padding: "8px 10px" }}>
                      <div style={{ fontSize: "0.66rem", color: "#aaa", fontStyle: "italic" }}>"{data.summary}"</div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

        </div>
      )}

      {/* 4. DAMGA ATLASI */}
      {currentView === "atlas" && (
        <div style={containerStyle}>
          <AtlasMap onGoHome={() => setCurrentView("dashboard")} />
        </div>
      )}

      {/* 5. OKUMA MODÜLÜ */}
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

      {/* 6. YALIN BULGU FORMU */}
      {currentView === "yalinVeri" && (
        <div style={containerStyle}>
          <YalinVeriGirisi onGoHome={() => setCurrentView("dashboard")} />
        </div>
      )}

      {/* 7. YÖNETİCİ PANELİ */}
      {currentView === "admin-panel" && (
        <div style={containerStyle}>
          <AdminPanel onLogout={() => setCurrentView("dashboard")} userRole={userRole} />
        </div>
      )}

      {/* 8. OPERASYON MERKEZİ */}
      {currentView === "ops-center" && (
        <div style={containerStyle}>
          <OpsCenter onGoHome={() => setCurrentView("dashboard")} />
        </div>
      )}

      {/* 9. ŞİFRELİ GİRİŞ */}
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
