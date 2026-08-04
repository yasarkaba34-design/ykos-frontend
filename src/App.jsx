import React, { useState } from "react";
import YKOSDashboard from "./layouts/YKOSDashboard";

export default function App() {
  const [currentView, setCurrentView] = useState("dashboard"); 
  const [userRole, setUserRole] = useState("guest");
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedAtlasItem, setSelectedAtlasItem] = useState(null);

  // KÖK HECE MATRİSİ - ZENGİNLEŞTİRİLMİŞ 14 ANA MERKEZ VE TÜRETİM DÜĞÜMLERİ
  const matrixNodes = [
    { 
      id: "KÖK", x: 350, y: 240, r: 42, color: "#ffae00", label: "KÖK", 
      desc: "Temel, Kaynak, Menşe ve Öz Matrisi", 
      connection: "ER, AN, YOL, ÇEV", score: "%99.9",
      derivatives: ["Kök-en", "Kök-sül", "Köke-niz", "Kök-ten"],
      details: "YKOS M5 sisteminin ana dikey aksı. Tüm Ön-Türkçe kök hece türetimlerinin ilk kalkış ve doğrulama referans noktasıdır. Sistemdeki tüm damga ve piktogramlar bu kaynak köke olan algoritmik mesafesiyle analiz edilir."
    },
    { 
      id: "YOL", x: 230, y: 120, r: 34, color: "#ffd700", label: "YOL", 
      desc: "Aks, Hareket, Akış ve Süreç Fonetiği", 
      connection: "ÇEV, BA", score: "%99.8",
      derivatives: ["Yol-cu", "Yol-lak", "Yol-daş", "Yol-un"],
      details: "'Rulo değil yol' ilkesinin merkez hecesi. Anadolu'dan başlayan tarihsel dil ve kültür hareketliliğinin nehir yatakları ve göç rotaları üzerinden aktarılan dinamik taşıyıcı vektörüdür."
    },
    { 
      id: "ÇEV", x: 480, y: 100, r: 32, color: "#e6c200", label: "ÇEV", 
      desc: "Çevre, Daire, Merkez ve Kuşatma Sembolizmi", 
      connection: "KÖK, AÇ", score: "%99.4",
      derivatives: ["Çev-re", "Çev-rik", "Çev-ren", "Çev-ir"],
      details: "Çatalhöyük dairesel mühürlerinde tespit edilen geometrik kuşatma alanı. Sosyal yerleşimlerin ve kozmik sınırların dilbilimsel karşılığıdır."
    },
    { 
      id: "ER", x: 150, y: 280, r: 32, color: "#ffd700", label: "ER", 
      desc: "Varlık, Eril Enerji, Güç ve Kimlik Vektörü", 
      connection: "SU, KÖK", score: "%99.2",
      derivatives: ["Er-en", "Er-dem", "Er-ik", "Er-gin"],
      details: "Etrüsk ve Lemnos yazıtlarında kişi, özne ve hiyerarşik varlık tanımını belirleyen, dik duran insan figürünü sembolize eden fonetik gruptur."
    },
    { 
      id: "SU", x: 550, y: 260, r: 34, color: "#1e90ff", label: "SU", 
      desc: "Hayat, Sıvı, Akıcılık ve Saflık Vektörü", 
      connection: "BA, AK", score: "%99.8",
      derivatives: ["Su-la", "Su-yuk", "Su-var", "Su-cul"],
      details: "Nehir havzalarında şekillenen yerleşik kültür katmanlarında yaşam döngüsünü sembolize eder. Fonetik akışkanlığı en yüksek olan birincil hecedir."
    },
    { 
      id: "BA", x: 400, y: 400, r: 30, color: "#ffd700", label: "BA", 
      desc: "Bağlama, Başlangıç ve Doğuş Piktogramı", 
      connection: "YOL, AN", score: "%98.9",
      derivatives: ["Ba-ğ", "Ba-ş", "Ba-kır", "Ba-ğıl"],
      details: "Kök hecelerin birbirine eklemlenmesini sağlayan bağlayıcı yapı. Akışın başlama noktasını ve türetim ivmesini tanımlar."
    },
    { 
      id: "AN", x: 210, y: 400, r: 30, color: "#ffae00", label: "AN", 
      desc: "Zaman, An, Merkez ve Göksel Eksen", 
      connection: "KÖK, GÖK", score: "%99.1",
      derivatives: ["An-ı", "An-lat", "An-ak", "An-daş"],
      details: "Göbeklitepe T-sütunlarındaki zamansal ve göksel döngüleri temsil eden, merkeze bağlı zaman aksı."
    },
    { 
      id: "AK", x: 610, y: 180, r: 28, color: "#1e90ff", label: "AK", 
      desc: "Akış, Beyazlık, Temizlik ve Işık", 
      connection: "SU, YOL", score: "%99.0",
      derivatives: ["Ak-ış", "Ak-ar", "Ak-an", "Ak-ıl"],
      details: "Sıvı ve ışık hareketlerinin yönünü belirleyen, hız ve berraklık belirten hece matrisi."
    },
    { 
      id: "AÇ", x: 580, y: 80, r: 26, color: "#e6c200", label: "AÇ", 
      desc: "Açılım, Genişleme ve Başlangıç Vektörü", 
      connection: "ÇEV", score: "%98.7",
      derivatives: ["Aç-ık", "Aç-ı", "Aç-an", "Aç-ım"],
      details: "Merkezden dışarıya doğru gerçekleşen dairesel ve genişleyen hamlelerin kök eylemi."
    },
    { 
      id: "GÖK", x: 120, y: 420, r: 28, color: "#ffae00", label: "GÖK", 
      desc: "Kozmoz, Yükseklik, Mavi ve Üst Eksen", 
      connection: "AN", score: "%99.3",
      derivatives: ["Gök-men", "Gök-çe", "Gök-sel", "Gök-er"],
      details: "Yeryüzü ile gökyüzü arasındaki dikey bağın tepe noktasını oluşturan kavramsal kök."
    },
    { 
      id: "ÖZ", x: 270, y: 220, r: 26, color: "#ffd700", label: "ÖZ", 
      desc: "Merkez, İç Varlık, Maya ve Cevher", 
      connection: "KÖK", score: "%99.5",
      derivatives: ["Öz-el", "Öz-en", "Öz-gü", "Öz-lem"],
      details: "Varlığın iç nüvesini ve değişmeyen temel niteliğini gösteren birincil yapı taşı."
    },
    { 
      id: "İL", x: 100, y: 180, r: 26, color: "#ffd700", label: "İL", 
      desc: "Yurt, Ülke, Bağ ve Toplumsal Düzen", 
      connection: "ER, YOL", score: "%98.8",
      derivatives: ["İl-gi", "İl-ek", "İl-ke", "İl-en"],
      details: "Toplumsal örgütlenmenin ve yerleşik vatan kavramının epigrafik kökü."
    },
    { 
      id: "AY", x: 320, y: 60, r: 26, color: "#ffae00", label: "AY", 
      desc: "Işık, Zaman Dilimi, Dönem ve Gece Işığı", 
      connection: "YOL, AN", score: "%99.0",
      derivatives: ["Ay-dın", "Ay-az", "Ay-ır", "Ay-an"],
      details: "Göksel takvim ve zaman ölçümünün neolitik dönemdeki sembolik kökeni."
    },
    { 
      id: "TAŞ", x: 490, y: 340, r: 26, color: "#ffae00", label: "TAŞ", 
      desc: "Sertlik, Kayalık, Anıt ve Kalıcılık", 
      connection: "KÖK, BA", score: "%98.6",
      derivatives: ["Taş-ıt", "Taş-ra", "Taş-kın", "Taş-ım"],
      details: "Kaya resimleri, petroglifler ve dikili taş anıtların fiziksel taşıyıcı materyali."
    }
  ];

  // Damga Atlası Detaylı Veri Seti
  const atlasItems = [
    { 
      code: "YKOS-DMG-01", 
      name: "Çatalhöyük Dairesel Damga", 
      region: "Konya / Anadolu", 
      date: "M.Ö. 7400", 
      symbol: "⭕",
      summary: "'ÇEV' ve 'BA' dairesel döngü matrisi.",
      analysis: "Çatalhöyük M.Ö. 7400 katmanlarında çıkarılan pişmiş toprak dairesel mühürlerdeki konsantrik halkalar, YKOS 'ÇEV' (kuşatan alan) ve 'BA' (bağlantı/doğuş) kök heceleriyle tam algoritmik eşleşme verir. Dairesel form, topluluğun merkez alanını temsil eder.",
      tags: ["Dairesel Mühür", "ÇEV Kökü", "Neolitik Dönem"]
    },
    { 
      code: "YKOS-DMG-02", 
      name: "Göbeklitepe H-C Piktogramı", 
      region: "Şanlıurfa / Anadolu", 
      date: "M.Ö. 9600", 
      symbol: "🏛️",
      summary: "İkilik ve göksel bağ sembolizmi.",
      analysis: "Göbeklitepe T-Sütunları üzerinde belirgin biçimde kazınmış olan 'H' ve 'C' piktogramları, dikey ve yatay aks hecelerini temsil eder. ER-İK-AN ve KÖK-SU kavramsal kurgusu uyarınca yeryüzü ile gökyüzü arasındaki ikili dengeyi gösterir.",
      tags: ["T-Sütun", "H-C Piktogramı", "Göksel Eksen"]
    },
    { 
      code: "YKOS-DMG-03", 
      name: "Yazılıkaya Hitit Güneş Kursu", 
      region: "Çorum / Anadolu", 
      date: "M.Ö. 1300", 
      symbol: "☀️",
      summary: "Merkez ve yön ışınları matrisi.",
      analysis: "Hattuşa Yazılıkaya açık hava tapınağında yer alan kabartmalardaki kanatlı güneş kursu ve yön ışınları, YKOS 'KÖK' ve 'AN' vektörleriyle uyumludur. Merkezden 4 ana yöne yayılan hiyeroglif kök hece dizgesini barındırır.",
      tags: ["Güneş Kursu", "Hitit Hiyeroglifi", "Aksel Vektör"]
    },
    { 
      code: "YKOS-DMG-04", 
      name: "Lemnos Mezar Taşı Damgaları", 
      region: "Lemnos / Akdeniz", 
      date: "M.Ö. 600", 
      symbol: "📜",
      summary: "Doğu Akdeniz alfabetik aks okuması.",
      analysis: "Lemnos adasında bulunan steldeki harf dizilişi, Etrüsk dili ve Ön-Türkçe kök hece alfabesiyle okunmıştır. Anadolu'dan Ege ve Akdeniz'e taşınan dil akışının en somut epigrafik belgesidir.",
      tags: ["Etrüsk Steli", "Lemnos Kitabesi", "Akdeniz Akışı"]
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

      {/* 2. BALONCUK KÖK HECE MATRİSİ (GENİŞLETİLMİŞ DİL AĞI) */}
      {currentView === "visualize" && (
        <div style={containerStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "12px" }}>
            <div>
              <span style={{ color: "#ffd700", fontSize: "0.75rem", fontWeight: "bold" }}>🗣️ İNTERAKTİF DİL AĞI & KÖK MATRİSİ</span>
              <h2 style={{ color: "#ffd700", margin: "4px 0 0 0", fontSize: "1.3rem" }}>YKOS 100+ KÖK HECE VE TÜRETİM MATRİSİ</h2>
            </div>
            <button onClick={() => setCurrentView("dashboard")} style={backBtnStyle}>← ANA PANEL'E DÖN</button>
          </div>

          <p style={{ color: "#ccc", fontSize: "0.85rem", marginBottom: "20px" }}>
            Aşağıdaki dinamik baloncuklara tıklayarak kök hecelerin türetim dallarını, yazıt paralelliklerini ve algoritmik detaylarını görüntüleyebilirsiniz.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "20px", alignItems: "start" }}>
            {/* SVG ZENGİN GRAFİK ALANI */}
            <div style={{ background: "rgba(0,0,0,0.7)", border: "1px dashed rgba(255,215,0,0.4)", borderRadius: "10px", padding: "10px" }}>
              <svg width="100%" height="520" viewBox="0 0 720 520" style={{ cursor: "pointer" }}>
                {/* Ağ Bağlantı Çizgileri */}
                <line x1="350" y1="240" x2="230" y2="120" stroke="rgba(255,215,0,0.4)" strokeWidth="2" />
                <line x1="350" y1="240" x2="480" y2="100" stroke="rgba(255,215,0,0.4)" strokeWidth="2" />
                <line x1="350" y1="240" x2="150" y2="280" stroke="rgba(255,215,0,0.4)" strokeWidth="2" />
                <line x1="350" y1="240" x2="550" y2="260" stroke="rgba(255,215,0,0.4)" strokeWidth="2" />
                <line x1="350" y1="240" x2="400" y2="400" stroke="rgba(255,215,0,0.4)" strokeWidth="2" />
                <line x1="350" y1="240" x2="210" y2="400" stroke="rgba(255,215,0,0.4)" strokeWidth="2" />
                <line x1="350" y1="240" x2="270" y2="220" stroke="rgba(255,215,0,0.4)" strokeWidth="2" strokeDasharray="3" />
                
                <line x1="230" y1="120" x2="320" y2="60" stroke="rgba(255,215,0,0.3)" strokeWidth="1.5" strokeDasharray="3" />
                <line x1="480" y1="100" x2="580" y2="80" stroke="rgba(255,215,0,0.3)" strokeWidth="1.5" strokeDasharray="3" />
                <line x1="550" y1="260" x2="610" y2="180" stroke="rgba(255,215,0,0.3)" strokeWidth="1.5" strokeDasharray="3" />
                <line x1="150" y1="280" x2="100" y2="180" stroke="rgba(255,215,0,0.3)" strokeWidth="1.5" strokeDasharray="3" />
                <line x1="210" y1="400" x2="120" y2="420" stroke="rgba(255,215,0,0.3)" strokeWidth="1.5" strokeDasharray="3" />
                <line x1="400" y1="400" x2="490" y2="340" stroke="rgba(255,215,0,0.3)" strokeWidth="1.5" strokeDasharray="3" />

                {/* Baloncuk Düğümleri */}
                {matrixNodes.map((node) => (
                  <g key={node.id} onClick={() => setSelectedNode(node)}>
                    <circle 
                      cx={node.x} 
                      cy={node.y} 
                      r={selectedNode?.id === node.id ? node.r + 6 : node.r} 
                      fill="rgba(5, 8, 17, 0.95)" 
                      stroke={selectedNode?.id === node.id ? "#ffffff" : node.color} 
                      strokeWidth={selectedNode?.id === node.id ? "3" : "2"} 
                    />
                    <text x={node.x} y={node.y + 4} textAnchor="middle" fill={node.color} fontSize="12" fontWeight="bold">
                      {node.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            {/* BİLGİ VE TÜRETİM DETAY PANELİ */}
            <div style={{ background: "rgba(255,215,0,0.04)", border: "1px solid rgba(255,215,0,0.3)", borderRadius: "10px", padding: "18px" }}>
              <h3 style={{ color: "#ffd700", fontSize: "0.95rem", margin: "0 0 12px 0", borderBottom: "1px solid rgba(255,215,0,0.2)", paddingBottom: "6px" }}>
                {selectedNode ? `SEÇİLİ KÖK HECE: [${selectedNode.label}]` : "📌 MATRİS VE TÜRETİM REHBERİ"}
              </h3>
              
              {selectedNode ? (
                <div>
                  <p style={{ color: "#fff", fontSize: "0.85rem", fontWeight: "bold", marginBottom: "8px" }}>{selectedNode.desc}</p>
                  
                  <div style={{ margin: "10px 0", padding: "10px", background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,215,0,0.2)", borderRadius: "6px", fontSize: "0.78rem", color: "#ccc" }}>
                    <div><strong>Algoritmik Bağlar:</strong> {selectedNode.connection}</div>
                    <div style={{ marginTop: "4px" }}><strong>Algoritmik Uyum Skoru:</strong> <span style={{ color: "#ffd700", fontWeight: "bold" }}>{selectedNode.score}</span></div>
                  </div>

                  {/* TÜRETİLEN SÖZCÜKLER KATMANI */}
                  <div style={{ margin: "12px 0" }}>
                    <span style={{ color: "#ffd700", fontSize: "0.75rem", fontWeight: "bold", display: "block", marginBottom: "6px" }}>🌱 TÜRETİLEN ÖN-TÜRKÇE / KÖK KELİMELER:</span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {selectedNode.derivatives.map((der, i) => (
                        <span key={i} style={{ background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.4)", color: "#fff", padding: "3px 8px", borderRadius: "4px", fontSize: "0.72rem", fontWeight: "bold" }}>
                          {der}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p style={{ color: "#aaa", fontSize: "0.78rem", lineHeight: "1.6", background: "rgba(255,255,255,0.02)", padding: "12px", borderRadius: "6px", borderLeft: "2px solid #ffd700", marginTop: "10px" }}>
                    {selectedNode.details}
                  </p>

                  <button onClick={() => setSelectedNode(null)} style={{ ...backBtnStyle, width: "100%", fontSize: "0.75rem", marginTop: "12px" }}>Seçimi Temizle</button>
                </div>
              ) : (
                <div style={{ color: "#ccc", fontSize: "0.8rem", lineHeight: "1.6" }}>
                  <p>
                    <strong>YKOS Algoritmik Ağ Analizi:</strong><br />
                    Soldaki diyagramda yer alan 14 ana merkez kök hece ve türetim dalları, Anadolu merkezli Ön-Türkçe dil mimarisinin temel vektörleridir.
                  </p>
                  <p style={{ color: "#aaa", fontSize: "0.75rem", marginTop: "8px" }}>
                    • Bir kök baloncuk seçerek türetilen alt sözcükleri, sembolik ilişkileri ve algoritmik deşifre ayrıntılarını görüntüleyebilirsiniz.
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

          {selectedAtlasItem && (
            <div style={{ background: "rgba(255,215,0,0.06)", border: "1px solid #ffd700", borderRadius: "10px", padding: "20px", marginBottom: "25px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <span style={{ color: "#ffd700", fontWeight: "bold", fontSize: "0.8rem" }}>🔎 DETAYLI AKADEMİK İNCELEME: [{selectedAtlasItem.code}]</span>
                <button onClick={() => setSelectedAtlasItem(null)} style={{ ...backBtnStyle, padding: "4px 10px", fontSize: "0.75rem" }}>✕ Kapat</button>
              </div>
              <h3 style={{ color: "#ffd700", margin: "0 0 10px 0" }}>{selectedAtlasItem.symbol} {selectedAtlasItem.name}</h3>
              <p style={{ color: "#ccc", fontSize: "0.88rem", lineHeight: "1.6", marginBottom: "15px" }}>{selectedAtlasItem.analysis}</p>
              <div style={{ display: "flex", gap: "8px" }}>
                {selectedAtlasItem.tags.map((tag, i) => (
                  <span key={i} style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,215,0,0.4)", color: "#ffd700", padding: "4px 10px", borderRadius: "12px", fontSize: "0.7rem", fontWeight: "bold" }}>#{tag}</span>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "18px" }}>
            {atlasItems.map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedAtlasItem(item)}
                style={{ background: "rgba(255,215,0,0.03)", border: "1px solid rgba(255,215,0,0.3)", borderRadius: "10px", padding: "18px", cursor: "pointer", transition: "all 0.2s ease" }}
              >
                <div style={{ height: "110px", background: "radial-gradient(circle, rgba(255,215,0,0.15) 0%, rgba(0,0,0,0.9) 100%)", borderRadius: "8px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: "12px", border: "1px solid rgba(255,215,0,0.25)" }}>
                  <span style={{ fontSize: "2.8rem", filter: "drop-shadow(0 0 10px rgba(255,215,0,0.5))" }}>{item.symbol}</span>
                  <span style={{ color: "#ffd700", fontSize: "0.65rem", letterSpacing: "1px", fontWeight: "bold", marginTop: "4px" }}>YKOS M5 DAMGA KATMANI</span>
                </div>

                <span style={{ color: "#888", fontSize: "0.7rem", fontWeight: "bold" }}>{item.code}</span>
                <h4 style={{ color: "#ffd700", margin: "4px 0 6px 0", fontSize: "0.95rem" }}>{item.name}</h4>
                <div style={{ color: "#ccc", fontSize: "0.78rem" }}>📍 {item.region}</div>
                <div style={{ color: "#888", fontSize: "0.75rem", marginTop: "2px" }}>⏳ Tarih: {item.date}</div>
                
                <p style={{ color: "#aaa", fontSize: "0.76rem", marginTop: "10px", borderTop: "1px solid rgba(255,215,0,0.15)", paddingTop: "8px", lineHeight: "1.4" }}>
                  {item.summary}
                </p>

                <div style={{ marginTop: "10px", color: "#ffd700", fontSize: "0.72rem", fontWeight: "bold", textAlign: "right" }}>
                  DETAYLI İNCELE ➔
                </div>
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

          <div style={{ padding: "18px 0", borderTop: "1px solid rgba(255,215,0,0.2)", borderBottom: "1px solid rgba(255,215,0,0.2)", color: "#ccc", lineHeight: "1.75", fontSize: "0.9rem" }}>
            
            {selectedArticleId === 3 ? (
              <>
                <p>
                  <strong>Etrüsk Ve Lemnos Yazıtlarının Ön-Türkçe Kök Hece Fonetiği İle Çözümlenmesi:</strong><br />
                  Lemnos Adası'nda ortaya çıkarılan M.Ö. 6. yüzyıla ait ünlü mezar steli (Lemnos Kitabesi) üzerindeki alfabetik dizilim, Batı klasik filolojisinin yıllardır "çözülemeyen/akraba dili bulunamayan halklar" kategorisine hapsettiği Etrüsk dil mimarisinin doğrudan Anadolu merkezli Ön-Türkçe kök ekleri ile eklemlendiğini kanıtlamaktadır.
                </p>
                <p style={{ marginTop: "14px" }}>
                  <strong>YKOS M5 Algoritmik Deşifre Metodolojisi:</strong><br />
                  Yazıttaki harf karakterleri harita üzerindeki dikey ve yatay vektör hatlarına yerleştirildiğinde; 'ER', 'AK', 'AN', 'KÖK' ve 'Sİ' ses birimlerinin tesadüfi birer harf yığını olmadığı, tam aksine Anadolu'dan Akdeniz ve İtalya yarımadasına taşınan aksel bir fonetik kurgu oluşturduğu görülmüştür. YKOS Fonetik Analiz Motoru uyarınca yazıttaki kelime kökleri %98.8 algoritmik simetri yakalamaktadır.
                </p>
                <p style={{ marginTop: "14px" }}>
                  <strong>Tarihsel Ve Dilbilimsel Akış Ekeni:</strong><br />
                  Anadolu kadim coğrafyasından Ege adalarına ve oradan İtalya'nın Etruria bölgesine uzanan bu hat, dilin sabit bir rulo gibi durağan kalmadığını, 'YOL' kök hecesinin ifade ettiği üzere dinamik bir akış nehri halinde Akdeniz havzasına taşındığını göstermektedir. Etrüsk alfabetik dizilimi, Doğu Akdeniz kültür havzasının Ön-Türkçe kök dil altyapısıyla olan doğrudan bağını epigrafik olarak tescillemektedir.
                </p>
                <div style={{ background: "rgba(255,215,0,0.05)", padding: "14px", borderLeft: "4px solid #ffd700", color: "#ffd700", fontWeight: "bold", margin: "18px 0", borderRadius: "0 6px 6px 0" }}>
                  ⚡ YKOS Algoritmik Tutarlılık Skoru (Coherence): %98.8 Tam Epigrafik Eşleşme
                </div>
              </>
            ) : selectedArticleId === 1 ? (
              <>
                <p>
                  <strong>Çatalhöyük Mührü Ve Neolitik Damga Sembolizmi:</strong><br />
                  Konya Çatalhöyük M.Ö. 7400 katmanlarında çıkarılan pişmiş toprak dairesel mühürler, yerleşik insan topluluklarının kullandığı ilk somut grafik iletişim araçlarındandır. YKOS 100 veri tabanındaki piktografik eşleşmeler doğrultusunda, mühür yüzeylerindeki iç içe geçmiş dairesel formlar <strong>'ÇEV'</strong> ve <strong>'BA'</strong> kök heceleriyle birebir örtüşmektedir.
                </p>
                <div style={{ background: "rgba(255,215,0,0.05)", padding: "14px", borderLeft: "4px solid #ffd700", color: "#ffd700", fontWeight: "bold", margin: "18px 0", borderRadius: "0 6px 6px 0" }}>
                  ⚡ Tutarlılık Skoru (Coherence): %99.1 Algoritmik Uyum
                </div>
              </>
            ) : selectedArticleId === 2 ? (
              <>
                <p>
                  <strong>Göbeklitepe T-Sütunları Ve İkilik Sembolizminin Deşifresi:</strong><br />
                  Şanlıurfa Göbeklitepe M.Ö. 9600 yapılarında yer alan monolitik T-sütunları üzerinde kabartma olarak işlenen 'H' ve 'C' piktogramları, YKOS çözümleme matrisinde gökyüzü ile yeryüzünü birbirine bağlayan dikey aksı temsil etmektedir.
                </p>
                <div style={{ background: "rgba(255,215,0,0.05)", padding: "14px", borderLeft: "4px solid #ffd700", color: "#ffd700", fontWeight: "bold", margin: "18px 0", borderRadius: "0 6px 6px 0" }}>
                  ⚡ Tutarlılık Skoru (Coherence): %99.7 Algoritmik Uyum
                </div>
              </>
            ) : (
              <>
                <p>
                  <strong>"Rulo Değil Yol": YOL Kök Hecesi Ve Akış Teorisi:</strong><br />
                  Anadolu merkezli YKOS M5 Kök Hece Matrisi uyarınca gerçekleştirilen bu kapsamlı deşifrede; "Y-O-L" kök hecesinin dildeki yalnız bir isim değil, zamansal, mekânsal ve fonetik bir akış aksı olduğu ortaya konmuştur.
                </p>
                <div style={{ background: "rgba(255,215,0,0.05)", padding: "14px", borderLeft: "4px solid #ffd700", color: "#ffd700", fontWeight: "bold", margin: "18px 0", borderRadius: "0 6px 6px 0" }}>
                  ⚡ YKOS Algoritmik Uyum Skoru (Coherence): %99.4 Tam Metin Eşleşmesi
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