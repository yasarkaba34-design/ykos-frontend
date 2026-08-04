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
      details: "Anadolu merkezli kök hece diziliminde Y-O-L vektörü; statik bir yapıyı değil, dinamik akışı temsil eder. 'Rulo değil yol' ilkesi uyarınca, bilginin ve dilin sabit bir rulo halinde depolanması yerine, tarihsel süreç boyunca nehir havzaları ve göç hatları üzerinden kesintisiz aktarıldığını doğrular."
    },
    { 
      id: "ÇEV", x: 470, y: 110, r: 32, color: "#e6c200", label: "ÇEV", 
      desc: "Çevre, Daire, Merkez ve Kuşatma Sembolizmi", 
      connection: "KÖK", score: "%99.4",
      details: "Çatalhöyük dairesel duvar resimlerinde ve pişmiş toprak mühürlerde tespit edilen dairesel formlar, 'ÇEV' kök hecesiyle tam algoritmik uyum gösterir. Merkezden dışa doğru genişleyen sosyal ve kozmik sınırları tanımlar."
    },
    { 
      id: "KÖK", x: 350, y: 260, r: 42, color: "#ffae00", label: "KÖK", 
      desc: "Temel, Kaynak, Menşe ve Öz Matrisi", 
      connection: "ER", score: "%99.9",
      details: "YKOS M5 sisteminin birincil dikey ekseni. Tüm Ön-Türkçe kök türetimlerinin ilk kalkış noktasıdır. Veri tabanındaki tüm petroglifler bu kaynak köke referansla çözümlenir."
    },
    { 
      id: "ER", x: 160, y: 300, r: 30, color: "#ffd700", label: "ER", 
      desc: "Varlık, Eril Enerji, Güç ve Kimlik Vektörü", 
      connection: "SU", score: "%99.2",
      details: "Etrüsk Lemnos kitabesinde ve Avrasya kaya resimlerinde birey, topluluk lideri ve dik duran özne kavramlarını belirleyen fonetik gruptur."
    },
    { 
      id: "SU", x: 540, y: 280, r: 34, color: "#1e90ff", label: "SU", 
      desc: "Hayat, Sıvı, Akıcılık ve Saflık Vektörü", 
      connection: "BA", score: "%99.8",
      details: "Nehir boylarında şekillenen yerleşik kültür katmanlarında suyun birleştirici ve hayat verici doğasını sembolize eder. Fonetik akışkanlığı yüksek ana unsurdur."
    },
    { 
      id: "BA", x: 380, y: 410, r: 28, color: "#ffd700", label: "BA", 
      desc: "Bağlama, Başlangıç ve Doğuş Piktogramı", 
      connection: "YOL", score: "%98.9",
      details: "Kök hecelerin birbirine eklemlenmesini sağlayan bağlayıcı yapı. 'YOL' kökü ile birleştiğinde akışın başlama noktasını ve türetim ivmesini tanımlar."
    },
    { 
      id: "AN", x: 230, y: 420, r: 26, color: "#ffae00", label: "AN", 
      desc: "Zaman, An, Merkez ve Göksel Eksen", 
      connection: "KÖK", score: "%99.1",
      details: "Göbeklitepe T-sütunlarındaki zamansal ve göksel döngüleri temsil eden, merkeze bağlı zaman aksı."
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

      {/* 2. BALONCUK KÖK HECE MATRİSİ */}
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

                  <p style={{ color: "#aaa", fontSize: "0.78rem", lineHeight: "1.6", background: "rgba(255,255,255,0.02)", padding: "12px", borderRadius: "6px", borderLeft: "2px solid #ffd700" }}>
                    {selectedNode.details}
                  </p>

                  <button onClick={() => setSelectedNode(null)} style={{ ...backBtnStyle, width: "100%", fontSize: "0.75rem", marginTop: "12px" }}>Seçimi Temizle</button>
                </div>
              ) : (
                <div style={{ color: "#ccc", fontSize: "0.8rem", lineHeight: "1.6" }}>
                  <p>
                    <strong>YKOS Algoritmik Ağ Analizi:</strong><br />
                    Soldaki diyagramda yer alan düğümler, Anadolu merkezli Ön-Türkçe dil mimarisinin birincil hece vektörleridir.
                  </p>
                  <p style={{ color: "#aaa", fontSize: "0.75rem", marginTop: "8px" }}>
                    • Bir baloncuk seçerek söz konusu kök hecenin tarihsel metinlerdeki izlerini, fonetik değerlerini ve deşifre sonuçlarını inceleyebilirsiniz.
                  </p>
                </div>
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
              { name: "Çatalhöyük Dairesel Damga", region: "Konya / Anadolu", date: "M.Ö. 7400", code: "YKOS-DMG-01", desc: "'ÇEV' ve 'BA' dairesel döngü matriksi. Çatalhöyük mühürlerinin algoritmik deşifresi." },
              { name: "Göbeklitepe H-C Piktogramı", region: "Şanlıurfa / Anadolu", date: "M.Ö. 9600", code: "YKOS-DMG-02", desc: "İkilik ve göksel bağ sembolizmi. T-sütunlar üzerindeki dikey/yatay aks okumaları." },
              { name: "Yazılıkaya Hitit Güneş Kursu", region: "Çorum / Anadolu", date: "M.Ö. 1300", code: "YKOS-DMG-03", desc: "Merkez ve yön ışınları matrisi. Anadolu hiyeroglif hece eşleşmeleri." },
              { name: "Lemnos Mezar Taşı Damgaları", region: "Lemnos / Akdeniz", date: "M.Ö. 600", code: "YKOS-DMG-04", desc: "Doğu Akdeniz alfabetik aks okuması. Etrüsk dili Ön-Türkçe bağlamı." }
            ].map((item, idx) => (
              <div key={idx} style={{ background: "rgba(255,215,0,0.03)", border: "1px solid rgba(255,215,0,0.3)", borderRadius: "8px", padding: "16px" }}>
                <div style={{ height: "90px", background: "#000", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px", color: "#ffd700", fontSize: "1.8rem", border: "1px dashed rgba(255,215,0,0.2)" }}>
                  🔷
                </div>
                <span style={{ color: "#888", fontSize: "0.7rem", fontWeight: "bold" }}>{item.code}</span>
                <h4 style={{ color: "#ffd700", margin: "4px 0", fontSize: "0.9rem" }}>{item.name}</h4>
                <div style={{ color: "#ccc", fontSize: "0.78rem" }}>📍 {item.region}</div>
                <div style={{ color: "#888", fontSize: "0.75rem", marginTop: "2px" }}>⏳ {item.date}</div>
                <p style={{ color: "#aaa", fontSize: "0.72rem", marginTop: "8px", borderTop: "1px solid rgba(255,215,0,0.1)", paddingTop: "6px", lineHeight: "1.4" }}>{item.desc}</p>
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
            <p style={{ color: "#ccc", fontSize: "0.85rem", maxWidth: "700px", margin: "10px auto", lineHeight: "1.6" }}>
              YKOS M5 matrisi uyarınca kök hecelerin tarih boyunca izlediği rotalar, nehir havzaları ve taşınma vektörleri haritalandırılmıştır. Anadolu kadim merkezinden hareketle Avrasya ve Akdeniz havzasına yayılan dil izleri algoritmik olarak modellenmiştir.
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
            <p style={{ marginTop: "12px" }}>
              Kök hece analizlerinde doğrudan yazıtların geometrik aksı, dikey ve yatay vektör hatları ile fonetik simetrileri baz alınır. Her çözümleme en az %95 algoritmik tutarlılık skoru (Coherence Score) gerektirir.
            </p>
          </div>
        </div>
      )}

      {/* 7. DETAYLI AKADEMİK OKUMA EKRANI */}
      {currentView === "read" && (
        <div style={containerStyle}>
          <span style={{ color: "#ffd700", fontSize: "0.75rem", fontWeight: "bold" }}>📜 AKADEMİK ÇÖZÜMLEME KATMANI</span>
          
          <h2 style={{ color: "#ffd700", margin: "10px 0 15px 0", fontSize: "1.4rem" }}>
            {selectedArticleId === 1 ? "Çatalhöyük Kök Hece ve Damga Sembolizmi" :
             selectedArticleId === 2 ? "Göbeklitepe T-Sütunu YKOS Okuması" :
             selectedArticleId === 3 ? "Etrüsk Lemnos Kitabesi & Ön Türkçe Eşleşmesi" :
             "YOL Kök Hecesi ve Akış Teorisi"}
          </h2>

          <div style={{ padding: "18px 0", borderTop: "1px solid rgba(255,215,0,0.2)", borderBottom: "1px solid rgba(255,215,0,0.2)", color: "#ccc", lineHeight: "1.7", fontSize: "0.88rem" }}>
            
            {selectedArticleId === 4 || !selectedArticleId ? (
              <>
                <p>
                  Anadolu merkezli <strong>YKOS M5 Kök Hece Matrisi</strong> uyarınca gerçekleştirilen bu kapsamlı deşifrede; <strong>"Y-O-L"</strong> kök hecesinin dildeki yalnız bir isim değil, zamansal, mekânsal ve fonetik bir akış aksı olduğu ortaya konmuştur.
                </p>
                <p style={{ marginTop: "12px" }}>
                  <strong>"Rulo değil yol"</strong> kurgusu; bilginin durağan bir rulo gibi saklanmak yerine, nehir yatakları, göç rotaları ve kültürel etkileşim hatlarında dinamik bir nehir gibi aktığını doğrular. Y-O-L kökü; yön tayini, hareket, süreç ve fonetik dönüşümlerin ana omurgasını teşkil eder.
                </p>
                <div style={{ background: "rgba(255,215,0,0.05)", padding: "14px", borderLeft: "4px solid #ffd700", color: "#ffd700", fontWeight: "bold", margin: "16px 0", borderRadius: "0 6px 6px 0" }}>
                  ⚡ YKOS Algoritmik UyumSkoru (Coherence): %99.4 Tam Metin Eşleşmesi
                </div>
                <p style={{ fontSize: "0.82rem", color: "#aaa" }}>
                  * İncelediğiniz bu akademide sunulan veriler, YKOS Bilgi Sistemi veri tabanındaki petroglif ve harita katmanlarıyla doğrulanmıştır.
                </p>
              </>
            ) : selectedArticleId === 1 ? (
              <>
                <p>
                  Çatalhöyük M.Ö. 7400 katmanlarında tespit edilen dairesel mühürler ve duvar resimlerindeki motifler, YKOS 100 veri tabanındaki <strong>'ÇEV'</strong> ve <strong>'BA'</strong> kök heceleriyle birebir uyum göstermektedir.
                </p>
                <p style={{ marginTop: "12px" }}>
                  Dairesel geometrinin merkezinde yer alan odak noktaları, yaşam alanının sınırlarını (ÇEV) ve doğuş anını (BA) simgeleyen dille ifade edilmektedir.
                </p>
                <div style={{ background: "rgba(255,215,0,0.05)", padding: "14px", borderLeft: "4px solid #ffd700", color: "#ffd700", fontWeight: "bold", margin: "16px 0", borderRadius: "0 6px 6px 0" }}>
                  ⚡ Tutarlılık Skoru (Coherence): %99.1 Algoritmik Uyum
                </div>
              </>
            ) : selectedArticleId === 2 ? (
              <>
                <p>
                  Göbeklitepe T-sütunları üzerinde belirgin biçimde işlenmiş 'H' ve 'C' piktogramları; ER-İK-AN ve KÖK-SU kavramsal kurgusunu ifade eden dikey ve yatay aks heceleridir.
                </p>
                <p style={{ marginTop: "12px" }}>
                  İkilik sembolizmi, gökyüzü ve yeryüzü arasındaki bağın fonetik kodlarını barındırır.
                </p>
                <div style={{ background: "rgba(255,215,0,0.05)", padding: "14px", borderLeft: "4px solid #ffd700", color: "#ffd700", fontWeight: "bold", margin: "16px 0", borderRadius: "0 6px 6px 0" }}>
                  ⚡ Tutarlılık Skoru (Coherence): %99.7 Algoritmik Uyum
                </div>
              </>
            ) : (
              <>
                <p>
                  Lemnos mezar taşında yer alan alfabe dizisi, Batı Akdeniz'e taşınan Anadolu Ön-Türkçe kök ekleri vasıtasıyla deşifre edilmiştir.
                </p>
                <p style={{ marginTop: "12px" }}>
                  Etrüsk alfabesinin Anadolu kök hece haritasıyla kesişimi, Doğu Akdeniz dil akışının temel belgesidir.
                </p>
                <div style={{ background: "rgba(255,215,0,0.05)", padding: "14px", borderLeft: "4px solid #ffd700", color: "#ffd700", fontWeight: "bold", margin: "16px 0", borderRadius: "0 6px 6px 0" }}>
                  ⚡ Tutarlılık Skoru (Coherence): %98.8 Algoritmik Uyum
                </div>
              </>
            )}

          </div>

          <button onClick={() => setCurrentView("dashboard")} style={{ ...backBtnStyle, marginTop: "18px" }}>← ANA PANEL'E DÖN</button>
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
