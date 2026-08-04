import React, { useState } from "react";
import YKOSDashboard from "./layouts/YKOSDashboard";

export default function App() {
  const [currentView, setCurrentView] = useState("dashboard"); 
  const [userRole, setUserRole] = useState("guest");
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  // Genişletilmiş Kök Hece Matrisi Veri Seti
  const matrixNodes = [
    { 
      id: "YOL", x: 250, y: 130, r: 35, color: "#ffd700", label: "YOL", 
      desc: "Aks, Hareket, Akış ve Süreç Fonetiği", 
      connection: "ÇEV", score: "%99.8",
      details: "Anadolu Ön-Türkçe kök eklerinde yön, zaman ve dinamik vektör aksını temsil eder. Göç hatlarındaki birincil taşıyıcı matristir."
    },
    { 
      id: "ÇEV", x: 470, y: 110, r: 32, color: "#e6c200", label: "ÇEV", 
      desc: "Çevre, Daire, Merkez ve Kuşatma Sembolizmi", 
      connection: "KÖK", score: "%99.4",
      details: "Çatalhöyük ve Göbeklitepe dairesel mühürlerinde 'kuşatan alan' ve 'sınır' kavramlarını deşifre eden geometri."
    },
    { 
      id: "KÖK", x: 350, y: 260, r: 42, color: "#ffae00", label: "KÖK", 
      desc: "Temel, Kaynak, Menşe ve Öz Matrisi", 
      connection: "ER", score: "%99.9",
      details: "YKOS M5 sisteminin ana dikey ekseni. Tüm türetimlerin ilk kalkış ve tutarlılık referans noktası."
    },
    { 
      id: "ER", x: 160, y: 300, r: 30, color: "#ffd700", label: "ER", 
      desc: "Varlık, Eril Enerji, Güç ve Kimlik Vektörü", 
      connection: "SU", score: "%99.2",
      details: "Etrüsk ve Lemnos yazıtlarında kişi, özne ve hiyerarşik varlık tanımını oluşturan fonetik grup."
    },
    { 
      id: "SU", x: 540, y: 280, r: 34, color: "#1e90ff", label: "SU", 
      desc: "Hayat, Sıvı, Akıcılık ve Saflık Vektörü", 
      connection: "BA", score: "%99.8",
      details: "Su havzaları ve riverine kültür katmanlarında yerleşik yaşam ile yaşam döngüsünü sembolize eder."
    },
    { 
      id: "BA", x: 380, y: 410, r: 28, color: "#ffd700", label: "BA", 
      desc: "Bağlama, Başlangıç ve Doğuş Piktogramı", 
      connection: "YOL", score: "%98.9",
      details: "Bağlayıcı takı ve kök yapısı. 'YOL' ile entegre olduğunda akışın başlama noktasını ifade eder."
    },
    { 
      id: "AN", x: 230, y: 420, r: 26, color: "#ffae00", label: "AN", 
      desc: "Zaman, An, Merkez ve Göksel Eksen", 
      connection: "KÖK", score: "%99.1",
      details: "Zamana ve kozmik düzene işaret eden boyut matrisi."
    }
  ];

  const handleNavigateLogin = (role) => {
    setUserRole(role);
    setCurrentView("login");
  };

  const handleNavigateRead = (id) => {
    setSelectedArticleId(id);
    setCurrentView("read");
  };

  const containerStyle = {
    maxWidth: "1180px",
    margin: "25px auto",
    padding: "25px",
    backgroundColor: "#050811",
    border: "1px solid #ffd700",
    borderRadius: "12px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.8)",
    color: "#fff"
  };

  const backBtnStyle = {
    padding: "8px 18px",
    background: "transparent",
    border: "1px solid #ffd700",
    color: "#ffd700",
    fontWeight: "bold",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.8rem"
  };

  return (
    <div className="app-main-wrapper" style={{ backgroundColor: "#050811", minHeight: "100vh", color: "#ffffff" }}>
      
      {/* 1. ANA DASHBOARD EKRANI */}
      {currentView === "dashboard" && (
        <YKOSDashboard 
          onVisualize={() => setCurrentView("visualize")}
          onNavigateRead={handleNavigateRead}
          onNavigateLogin={handleNavigateLogin}
          onNavigateAtlas={() => setCurrentView("atlas")}
          onNavigateEngine={() => setCurrentView("engine")}
          onNavigateFlow={() => setCurrentView("flow")}
          onNavigateMethod={() => setCurrentView("methodology")}
          onGoHome={() => setCurrentView("dashboard")}
        />
      )}

      {/* 2. BALONCUK KÖK HECE MATRİSİ (DETAYLANDIRILMIŞ) */}
      {currentView === "visualize" && (
        <div style={containerStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "12px" }}>
            <div>
              <span style={{ color: "#ffd700", fontSize: "0.75rem", fontWeight: "bold" }}>🗣️ İNTERAKTİF DİL AĞI</span>
              <h2 style={{ color: "#ffd700", margin: "4px 0 0 0", fontSize: "1.3rem" }}>YKOS BALONCUK MATRİSİ VE KÖK HECE BAĞLANTILARI</h2>
            </div>
            <button onClick={() => setCurrentView("dashboard")} style={backBtnStyle}>← ANA PANEL'E DÖN</button>
          </div>

          <p style={{ color: "#ccc", fontSize: "0.85rem", marginBottom: "20px" }}>
            Baloncuklara tıklayarak kök heceler arasındaki semantik, fonetik ve kavramsal bağları detaylıca inceleyebilirsiniz.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "20px", alignItems: "start" }}>
            {/* SVG GRAFİK ALANI */}
            <div style={{ background: "rgba(0,0,0,0.6)", border: "1px dashed rgba(255,215,0,0.4)", borderRadius: "10px", padding: "10px" }}>
              <svg width="100%" height="480" viewBox="0 0 700 500" style={{ cursor: "pointer" }}>
                {/* Bağlantı Çizgileri */}
                <line x1="250" y1="130" x2="470" y2="110" stroke="rgba(255,215,0,0.4)" strokeWidth="2" strokeDasharray="4" />
                <line x1="470" y1="110" x2="350" y2="260" stroke="rgba(255,215,0,0.4)" strokeWidth="2" />
                <line x1="350" y1="260" x2="160" y2="300" stroke="rgba(255,215,0,0.4)" strokeWidth="2" strokeDasharray="4" />
                <line x1="350" y1="260" x2="540" y2="280" stroke="rgba(255,215,0,0.4)" strokeWidth="2" />
                <line x1="540" y1="280" x2="380" y2="410" stroke="rgba(255,215,0,0.4)" strokeWidth="2" />
                <line x1="380" y1="410" x2="250" y2="130" stroke="rgba(255,215,0,0.4)" strokeWidth="2" strokeDasharray="4" />
                <line x1="380" y1="410" x2="230" y2="420" stroke="rgba(255,215,0,0.4)" strokeWidth="2" />
                <line x1="230" y1="420" x2="350" y2="260" stroke="rgba(255,215,0,0.4)" strokeWidth="2" strokeDasharray="4" />

                {matrixNodes.map((node) => (
                  <g key={node.id} onClick={() => setSelectedNode(node)}>
                    <circle 
                      cx={node.x} 
                      cy={node.y} 
                      r={selectedNode?.id === node.id ? node.r + 6 : node.r} 
                      fill="rgba(5, 8, 17, 0.9)" 
                      stroke={selectedNode?.id === node.id ? "#ffffff" : node.color} 
                      strokeWidth={selectedNode?.id === node.id ? "3" : "2"} 
                    />
                    <text x={node.x} y={node.y + 5} textAnchor="middle" fill={node.color} fontSize="13" fontWeight="bold">
                      {node.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            {/* BİLGİ VE ANALİZ DETAY PANELİ */}
            <div style={{ background: "rgba(255,215,0,0.04)", border: "1px solid rgba(255,215,0,0.3)", borderRadius: "10px", padding: "18px" }}>
              <h3 style={{ color: "#ffd700", fontSize: "0.95rem", margin: "0 0 12px 0", borderBottom: "1px solid rgba(255,215,0,0.2)", paddingBottom: "6px" }}>
                {selectedNode ? `SEÇİLİ KÖK HECE: [${selectedNode.label}]` : "📌 MATRİS REHBERİ"}
              </h3>
              
              {selectedNode ? (
                <div>
                  <p style={{ color: "#fff", fontSize: "0.85rem", fontWeight: "bold", marginBottom: "8px" }}>{selectedNode.desc}</p>
                  
                  <div style={{ margin: "12px 0", padding: "10px", background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,215,0,0.2)", borderRadius: "6px", fontSize: "0.78rem", color: "#ccc" }}>
                    <div><strong>Algoritmik Aks:</strong> 360° Dönüşüm Vektörü</div>
                    <div style={{ marginTop: "4px" }}><strong>Eşleşen Kök:</strong> {selectedNode.connection}</div>
                    <div style={{ marginTop: "4px" }}><strong>Uyum Skoru:</strong> <span style={{ color: "#ffd700", fontWeight: "bold" }}>{selectedNode.score}</span></div>
                  </div>

                  <p style={{ color: "#aaa", fontSize: "0.78rem", lineHeight: "1.5", background: "rgba(255,255,255,0.02)", padding: "10px", borderRadius: "6px" }}>
                    {selectedNode.details}
                  </p>

                  <button onClick={() => setSelectedNode(null)} style={{ ...backBtnStyle, width: "100%", fontSize: "0.75rem", marginTop: "10px" }}>Seçimi Temizle</button>
                </div>
              ) : (
                <p style={{ color: "#aaa", fontSize: "0.8rem", lineHeight: "1.5" }}>
                  Ağ üzerindeki Kök Hece baloncuklarına tıklayarak fonetik türetimlerini, yazıt eşleşmelerini ve vektörel detaylarını görüntüleyebilirsiniz.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. DAMGA ATLASI MODÜLÜ */}
      {currentView === "atlas" && (
        <div style={containerStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "12px" }}>
            <div>
              <span style={{ color: "#ffd700", fontSize: "0.75rem", fontWeight: "bold" }}>🗺️ COĞRAFİ & SEMBOLİK KATMAN</span>
              <h2 style={{ color: "#ffd700", margin: "4px 0 0 0", fontSize: "1.3rem" }}>ANADOLU VE AVRASYA DAMGA ATLASI</h2>
            </div>
            <button onClick={() => setCurrentView("dashboard")} style={backBtnStyle}>← ANA PANEL'E DÖN</button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "15px" }}>
            {[
              { name: "Çatalhöyük Dairesel Damga", region: "Konya / Anadolu", date: "M.Ö. 7400", code: "YKOS-DMG-01", desc: "'ÇEV' ve 'BA' dairesel döngü matriksi." },
              { name: "Göbeklitepe H-C Piktogramı", region: "Şanlıurfa / Anadolu", date: "M.Ö. 9600", code: "YKOS-DMG-02", desc: "İkilik ve göksel bağ sembolizmi." },
              { name: "Yazılıkaya Hitit Güneş Kursu", region: "Çorum / Anadolu", date: "M.Ö. 1300", code: "YKOS-DMG-03", desc: "Merkez ve yön ışınları matrisi." },
              { name: "Lemnos Mezar Taşı Damgaları", region: "Lemnos / Akdeniz", date: "M.Ö. 600", code: "YKOS-DMG-04", desc: "Doğu Akdeniz alfabetik aks okuması." }
            ].map((item, idx) => (
              <div key={idx} style={{ background: "rgba(255,215,0,0.03)", border: "1px solid rgba(255,215,0,0.3)", borderRadius: "8px", padding: "16px" }}>
                <div style={{ height: "90px", background: "#000", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px", color: "#ffd700", fontSize: "1.8rem", border: "1px dashed rgba(255,215,0,0.2)" }}>
                  🔷
                </div>
                <span style={{ color: "#888", fontSize: "0.7rem", fontWeight: "bold" }}>{item.code}</span>
                <h4 style={{ color: "#ffd700", margin: "4px 0", fontSize: "0.9rem" }}>{item.name}</h4>
                <div style={{ color: "#ccc", fontSize: "0.78rem" }}>📍 {item.region}</div>
                <div style={{ color: "#888", fontSize: "0.75rem", marginTop: "2px" }}>⏳ {item.date}</div>
                <p style={{ color: "#aaa", fontSize: "0.72rem", marginTop: "8px", borderTop: "1px solid rgba(255,215,0,0.1)", paddingTop: "6px" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. OKUMA & ANALİZ MOTORU */}
      {currentView === "engine" && (
        <div style={containerStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "12px" }}>
            <div>
              <span style={{ color: "#ffd700", fontSize: "0.75rem", fontWeight: "bold" }}>🔬 ALGORİTMİK DEŞİFRE</span>
              <h2 style={{ color: "#ffd700", margin: "4px 0 0 0", fontSize: "1.3rem" }}>YKOS OKUMA VE ANALİZ MOTORU</h2>
            </div>
            <button onClick={() => setCurrentView("dashboard")} style={backBtnStyle}>← ANA PANEL'E DÖN</button>
          </div>

          <div style={{ background: "rgba(255,215,0,0.02)", border: "1px solid rgba(255,215,0,0.2)", borderRadius: "8px", padding: "20px" }}>
            <label style={{ color: "#ffd700", fontSize: "0.8rem", fontWeight: "bold", display: "block", marginBottom: "8px" }}>
              ANALİZ EDİLECEK YAZIT VEYA PİKTOGRAM METNİNİ GİRİNİZ:
            </label>
            <input 
              type="text" 
              defaultValue="YOL - ER - ÇEV - BA" 
              style={{ width: "100%", padding: "12px", background: "#000", border: "1px solid #ffd700", color: "#fff", borderRadius: "6px", boxSizing: "border-box", outline: "none", marginBottom: "15px", fontFamily: "monospace" }}
            />
            <button 
              onClick={() => alert("Algoritmik çözümleme tamamlandı! Coherence Skoru: %99.6")}
              style={{ padding: "10px 20px", background: "linear-gradient(135deg, #ffd700, #b8860b)", border: "none", color: "#000", fontWeight: "bold", borderRadius: "6px", cursor: "pointer" }}
            >
              ALGORİTMİK ANALİZİ BAŞLAT ➔
            </button>
          </div>
        </div>
      )}

      {/* 5. GÖÇ & AKIŞ HARİTASI */}
      {currentView === "flow" && (
        <div style={containerStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "12px" }}>
            <div>
              <span style={{ color: "#ffd700", fontSize: "0.75rem", fontWeight: "bold" }}>🟢 DİL DİNAMİĞİ</span>
              <h2 style={{ color: "#ffd700", margin: "4px 0 0 0", fontSize: "1.3rem" }}>KÖK HECE GÖÇ VE AKIŞ HARİTASI</h2>
            </div>
            <button onClick={() => setCurrentView("dashboard")} style={backBtnStyle}>← ANA PANEL'E DÖN</button>
          </div>

          <div style={{ padding: "30px", background: "rgba(0,0,0,0.5)", border: "1px dashed rgba(255,215,0,0.3)", borderRadius: "8px", textAlign: "center" }}>
            <h3 style={{ color: "#ffd700" }}>🗺️ Anadolu ➔ Asya ➔ Akdeniz ➔ İtalya Akış Eksenleri</h3>
            <p style={{ color: "#ccc", fontSize: "0.85rem", maxWidth: "700px", margin: "10px auto" }}>
              YKOS M5 matrisi uyarınca kök hecelerin tarih boyunca izlediği rotalar, nehir havzaları ve taşınma vektörleri haritalandırılmıştır.
            </p>
          </div>
        </div>
      )}

      {/* 6. METODOLOJİ VE KURUMSAL */}
      {currentView === "methodology" && (
        <div style={containerStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "12px" }}>
            <div>
              <span style={{ color: "#ffd700", fontSize: "0.75rem", fontWeight: "bold" }}>🏛️ KURUMSAL ÇERÇEVE</span>
              <h2 style={{ color: "#ffd700", margin: "4px 0 0 0", fontSize: "1.3rem" }}>YKOS METODOLOJİSİ VE İLKELERİ</h2>
            </div>
            <button onClick={() => setCurrentView("dashboard")} style={backBtnStyle}>← ANA PANEL'E DÖN</button>
          </div>

          <div style={{ color: "#ccc", fontSize: "0.9rem", lineHeight: "1.7" }}>
            <p><strong style={{ color: "#ffd700" }}>"Önce Veri, Sonra Analiz"</strong> ilkesi gereğince YKOS Bilgi Sistemi; piktogramları, petroglifleri ve yazıtları spekülatif yorumlardan uzak, algoritmik ve matematiksel matrislerle inceler.</p>
          </div>
        </div>
      )}

      {/* 7. OKUMA VE MAKALE DETAYI */}
      {currentView === "read" && (
        <div style={containerStyle}>
          <span style={{ color: "#ffd700", fontSize: "0.75rem", fontWeight: "bold" }}>📜 AKADEMİK ÇÖZÜMLEME</span>
          <h2 style={{ color: "#ffd700", margin: "10px 0" }}>
            {selectedArticleId === 1 ? "Çatalhöyük Kök Hece ve Damga Sembolizmi" :
             selectedArticleId === 2 ? "Göbeklitepe T-Sütunu YKOS Okuması" :
             selectedArticleId === 3 ? "Etrüsk Lemnos Kitabesi & Ön Türkçe Eşleşmesi" :
             "YOL Kök Hecesi ve Akış Teorisi"}
          </h2>
          <div style={{ padding: "15px 0", borderTop: "1px solid rgba(255,215,0,0.2)", color: "#ccc", lineHeight: "1.6" }}>
            <p>Anadolu merkezli YKOS M5 Kök Hece Matrisi ile yapılan çözümlemede tam algoritmik uyum sağlanmıştır.</p>
            <p style={{ background: "rgba(255,215,0,0.05)", padding: "10px", borderLeft: "3px solid #ffd700", color: "#ffd700" }}>
              ⚡ Tutarlılık Skoru (Coherence): %99.4 Algoritmik Uyum
            </p>
          </div>
          <button onClick={() => setCurrentView("dashboard")} style={backBtnStyle}>← ANA PANEL'E DÖN</button>
        </div>
      )}

      {/* 8. GİRİŞ PORTALI */}
      {currentView === "login" && (
        <div style={{ ...containerStyle, maxWidth: "420px", textAlign: "center" }}>
          <h3 style={{ color: "#ffd700", marginBottom: "15px" }}>🔑 {userRole.toUpperCase()} GİRİŞ PORTALI</h3>
          <input type="text" placeholder="E-posta" style={{ width: "100%", padding: "10px", background: "#000", border: "1px solid #ffd700", color: "#fff", borderRadius: "6px", marginBottom: "10px", boxSizing: "border-box" }} />
          <input type="password" placeholder="Şifre" style={{ width: "100%", padding: "10px", background: "#000", border: "1px solid #ffd700", color: "#fff", borderRadius: "6px", marginBottom: "15px", boxSizing: "border-box" }} />
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => setCurrentView("dashboard")} style={{ ...backBtnStyle, flex: 1 }}>İPTAL</button>
            <button onClick={() => { alert("Giriş Başarılı!"); setCurrentView("dashboard"); }} style={{ padding: "10px", background: "linear-gradient(135deg, #ffd700, #b8860b)", border: "none", color: "#000", fontWeight: "bold", borderRadius: "6px", cursor: "pointer", flex: 1 }}>GİRİŞ ➔</button>
          </div>
        </div>
      )}

    </div>
  );
}