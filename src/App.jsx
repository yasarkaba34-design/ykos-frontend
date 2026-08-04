import React, { useState } from "react";
import YKOSDashboard from "./layouts/YKOSDashboard";

export default function App() {
  const [currentView, setCurrentView] = useState("dashboard"); 
  const [userRole, setUserRole] = useState("guest");
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedAtlasItem, setSelectedAtlasItem] = useState(null);

  // DİNAMİK CANLI MATRİS DÜĞÜMLERİ
  const matrixNodes = [
    { id: "YKOS 100", x: 480, y: 360, r: 38, color: "#1e90ff", label: "YKOS 100", anim: "float1", desc: "Temel Kök Hece Matrisi Katmanı", connection: "YOL, BİR, ANADOLU ATLASI", score: "%99.9", derivatives: ["Kök-en", "Yol-cu", "Çev-re"], details: "Anadolu merkezli 100 birincil hece vektörünün algoritmik veritabanı." },
    { id: "YKOS 200", x: 410, y: 430, r: 35, color: "#00ff7f", label: "YKOS 200", anim: "float2", desc: "Bölgesel ve Derin Arkeolojik Katman", connection: "Göbeklitepe, ROL, Sümer", score: "%99.6", derivatives: ["Rol-daş", "Er-en", "Süm-er"], details: "Doğu Akdeniz, Mezopotamya ve Ön Asya petroglif katmanları." },
    { id: "YKOS 300", x: 330, y: 400, r: 38, color: "#ff8c00", label: "YKOS 300", anim: "float3", desc: "Global Atlas & Avrasya / Amerika Katmanı", connection: "ÖN ASYA ATLASI, AMERİKA ATLASI, AVRUPA ATLASI", score: "%99.4", derivatives: ["At-las", "Av-rasya", "Koz-mos"], details: "Avrasya ve Amerika kıtaları arası Ön-Türkçe kültür ve damga aksı." },

    { id: "ANADOLU ATLASI", x: 440, y: 340, r: 24, color: "#ffd700", label: "ANADOLU ATLASI", anim: "float1", desc: "Anadolu Kadim Kültür Havzası", connection: "YKOS 100", score: "%100", derivatives: ["An-adolu", "Çat-al", "Hatt-i"], details: "Merkez üssü Anadolu olan birincil dil ve yazı simetri haritası." },
    { id: "ÖN ASYA ATLASI", x: 260, y: 380, r: 22, color: "#ffd700", label: "ÖN ASYA ATLASI", anim: "float2", desc: "Ön Asya ve Havza Hatları", connection: "YKOS 300", score: "%99.1", derivatives: ["As-ya", "Kaf-kas", "İr-an"], details: "Mezopotamya ve Kafkasya geçiş yolları." },
    { id: "AMERİKA ATLASI", x: 260, y: 420, r: 22, color: "#ff8c00", label: "AMERİKA ATLASI", anim: "float3", desc: "Trans-Bering ve Maya/Inka Bağlantıları", connection: "YKOS 300", score: "%98.5", derivatives: ["May-a", "In-ka", "Ol-mek"], details: "Amerika kıtasındaki petroglif ve Ön-Türkçe damga paralellikleri." },
    { id: "AVRUPA ATLASI", x: 310, y: 510, r: 22, color: "#ba55d3", label: "AVRUPA ATLASI", anim: "float1", desc: "Etrüsk, Etruria ve Akdeniz Rotaları", connection: "AYLUİL", score: "%98.9", derivatives: ["Et-rüsk", "Lem-nos", "Alp-ler"], details: "Akdeniz ve Etrüsk yazıtları dil akışı." },
    { id: "Göbeklitepe", x: 450, y: 420, r: 22, color: "#00ff7f", label: "Göbeklitepe", anim: "float2", desc: "M.Ö. 9600 T-Sütun Sembolizmleri", connection: "YKOS 200", score: "%99.7", derivatives: ["T-Sütun", "H-Piktogramı", "C-Damgası"], details: "İkilik ve göksel bağ sembolizminin deşifresi." },
    { id: "Sümer", x: 410, y: 370, r: 22, color: "#00ff7f", label: "Sümer", anim: "float3", desc: "Mezopotamya Çivi Yazısı Kökleri", connection: "YKOS 200", score: "%99.2", derivatives: ["Süm-er", "Kiv-i", "Lal-ag"], details: "Sümerce ve Ön-Türkçe ortak fonetik kök eşleşmeleri." },

    { id: "BİR", x: 490, y: 310, r: 25, color: "#ffd700", label: "BİR", anim: "float1", desc: "Teklik, Merkez ve Başlangıç", connection: "YKOS 100, YOL", score: "%99.8", derivatives: ["Bir-lik", "Bir-inci"], details: "İlk varlık ve birlik aksı." },
    { id: "YOL", x: 510, y: 340, r: 25, color: "#ffd700", label: "YOL", anim: "float2", desc: "Aks, Hareket ve Akış", connection: "BİR, O", score: "%99.8", derivatives: ["Yol-cu", "Yol-daş"], details: "'Rulo değil yol' mantığının merkez hecesi." },
    { id: "O", x: 530, y: 290, r: 26, color: "#ffd700", label: "O", anim: "float3", desc: "Evrensel Öz ve Odak", connection: "YOL, OL, KÖK", score: "%99.5", derivatives: ["O-na", "O-radan"], details: "Merkez ve yön gösterici zamir kökü." },
    { id: "OL", x: 590, y: 260, r: 22, color: "#ffd700", label: "OL", anim: "float1", desc: "Oluş, Varlık ve Doğuş", connection: "O", score: "%99.3", derivatives: ["Ol-gu", "Ol-ay"], details: "Varlığa geliş eylemi." },
    { id: "KÖK", x: 520, y: 210, r: 25, color: "#ffd700", label: "KÖK", anim: "float2", desc: "Kaynak ve Menşe", connection: "O, VAN, ÇİK", score: "%99.9", derivatives: ["Kök-en", "Kök-ten"], details: "Ana kök katmanı." },
    { id: "VAN", x: 540, y: 190, r: 20, color: "#ffd700", label: "VAN", anim: "float3", desc: "Su ve Havza Kimliği", connection: "KÖK", score: "%98.7", derivatives: ["Van-gölü", "Var-an"], details: "Doğu Anadolu havza kurgusu." },
    { id: "ÇİK", x: 490, y: 70, r: 20, color: "#1e90ff", label: "ÇİK", anim: "float1", desc: "Çıkış ve Tepe Vektörü", connection: "GÖK", score: "%98.5", derivatives: ["Çık-ış", "Çık-an"], details: "Yükselim hareketi." },
    { id: "GÖK", x: 510, y: 110, r: 22, color: "#00ff7f", label: "GÖK", anim: "float2", desc: "Kozmoz ve Üst Eksen", connection: "ÇİK, AL", score: "%99.2", derivatives: ["Gök-sel", "Gök-men"], details: "Göksel boyut katmanı." },
    { id: "AL", x: 500, y: 140, r: 20, color: "#1e90ff", label: "AL", anim: "float3", desc: "Alma, Kırmızı ve Yüksek", connection: "GÖK", score: "%98.9", derivatives: ["Al-an", "Al-gı"], details: "Kırmızı ve idrak kökü." },
    { id: "KUR", x: 390, y: 180, r: 24, color: "#ff8c00", label: "KUR", anim: "float1", desc: "Kuruluş, Yapı ve Düzen", connection: "TUT, DA", score: "%99.1", derivatives: ["Kur-um", "Kur-al"], details: "İnşa ve mimari kök hece." },
    { id: "DA", x: 450, y: 250, r: 22, color: "#ff8c00", label: "DA", anim: "float2", desc: "Dağ, Yükseklik ve Yer", connection: "KUR, BİR", score: "%98.8", derivatives: ["Da-ğ", "Da-im"], details: "Yeryüzü şekilleri ve kalıcılık." },
    { id: "ÇEV", x: 420, y: 300, r: 22, color: "#1e90ff", label: "ÇEV", anim: "float3", desc: "Çevre ve Daire", connection: "DİŞ, BİR", score: "%99.4", derivatives: ["Çev-re", "Çev-rik"], details: "Dairesel kuşatma alanı." },
    { id: "DİŞ", x: 340, y: 270, r: 20, color: "#1e90ff", label: "DİŞ", anim: "float1", desc: "Dış, Sınır ve Yapı", connection: "ÇEV, YÜZ", score: "%98.4", derivatives: ["Dış-arı", "Diş-i"], details: "Dış sınır ve biçim." },
    { id: "YÜZ", x: 270, y: 260, r: 20, color: "#1e90ff", label: "YÜZ", anim: "float2", desc: "Yüzey, Çehre ve Taraf", connection: "DİŞ, ULUN", score: "%98.6", derivatives: ["Yüz-ey", "Yüz-le"], details: "Ön görünüm ve alan." },
    { id: "ULUN", x: 210, y: 250, r: 20, color: "#1e90ff", label: "ULUN", anim: "float3", desc: "Ulu, Yüce ve Büyük", connection: "YÜZ", score: "%98.9", derivatives: ["Ulu-luk", "Ulu-s"], details: "Büyüklük ve hiyerarşi." },
    { id: "ROL", x: 410, y: 480, r: 22, color: "#ba55d3", label: "ROL", anim: "float1", desc: "İşlev ve Görev", connection: "YKOS 200", score: "%98.7", derivatives: ["Rol-daş"], details: "Toplumsal işlev." },
    { id: "AYLUİL", x: 370, y: 490, r: 22, color: "#ba55d3", label: "AYLUİL", anim: "float2", desc: "Avrupa Dil Akış Ekeni", connection: "AVRUPA ATLASI", score: "%98.5", derivatives: ["Ay-lu", "İl-en"], details: "Akdeniz ada dilleri." }
  ];

  const atlasItems = [
    { code: "YKOS-DMG-01", name: "Çatalhöyük Dairesel Damga", region: "Konya / Anadolu", date: "M.Ö. 7400", symbol: "⭕", summary: "'ÇEV' ve 'BA' dairesel döngü matrisi.", analysis: "Çatalhöyük M.Ö. 7400 katmanlarında çıkarılan pişmiş toprak dairesel mühürlerdeki konsantrik halkalar YKOS 'ÇEV' ve 'BA' kök heceleriyle tam eşleşir." },
    { code: "YKOS-DMG-02", name: "Göbeklitepe H-C Piktogramı", region: "Şanlıurfa / Anadolu", date: "M.Ö. 9600", symbol: "🏛️", summary: "İkilik ve göksel bağ sembolizmi.", analysis: "Göbeklitepe T-Sütunları üzerindeki 'H' ve 'C' piktogramları dikey ve yatay aks hecelerini temsil eder." }
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
    maxWidth: "1220px",
    margin: "20px auto",
    padding: "20px",
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
      
      {/* CANLI HAREKET ANİMASYON CSS STİLLERİ */}
      <style>{`
        @keyframes float1 {
          0% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-7px) translateX(3px); }
          100% { transform: translateY(0px) translateX(0px); }
        }
        @keyframes float2 {
          0% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(6px) translateX(-5px); }
          100% { transform: translateY(0px) translateX(0px); }
        }
        @keyframes float3 {
          0% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-5px) translateX(-4px); }
          100% { transform: translateY(0px) translateX(0px); }
        }
        @keyframes linePulse {
          0% { stroke-dashoffset: 0; opacity: 0.4; }
          50% { stroke-dashoffset: 20; opacity: 0.9; }
          100% { stroke-dashoffset: 40; opacity: 0.4; }
        }
        .node-float1 { animation: float1 4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; cursor: pointer; }
        .node-float2 { animation: float2 5.2s ease-in-out infinite; transform-box: fill-box; transform-origin: center; cursor: pointer; }
        .node-float3 { animation: float3 4.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center; cursor: pointer; }
        .flowing-line { stroke-dasharray: 6; animation: linePulse 3s linear infinite; }
      `}</style>

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

      {/* 2. CANLI HAREKETLİ GLOBAL ATLAS VE MATRİS KATMANI */}
      {currentView === "visualize" && (
        <div style={containerStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px", borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "10px" }}>
            <div>
              <span style={{ color: "#ffd700", fontSize: "0.75rem", fontWeight: "bold" }}>🌐 GLOBAL ATLAS & ARKEOLOJİK KATMANLAR (DİNAMİK)</span>
              <h2 style={{ color: "#ffd700", margin: "2px 0 0 0", fontSize: "1.25rem" }}>YKOS MATRİSLERİ (100 - 200 - 300 CANLI AĞ)</h2>
            </div>
            <button onClick={() => setCurrentView("dashboard")} style={backBtnStyle}>← ANA PANEL'E DÖN</button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "15px", alignItems: "start" }}>
            
            {/* KOZMİK AĞ SVG TUVALİ (HAREKETLİ) */}
            <div style={{ background: "#02040a", border: "1px solid rgba(255,215,0,0.3)", borderRadius: "10px", padding: "10px", overflow: "hidden", position: "relative" }}>
              <div style={{ position: "absolute", top: "15px", left: "15px", background: "rgba(5,8,17,0.85)", border: "1px solid rgba(255,215,0,0.4)", padding: "8px 12px", borderRadius: "6px", fontSize: "0.72rem", zIndex: 10 }}>
                <strong style={{ color: "#ffd700", display: "block" }}>ÖNCE VERİ, SONRA ANALİZ, SONRA YORUM</strong>
                <span style={{ color: "#aaa" }}>40 Kök Sistem, Karşılaştırmalı Arkeolojik Katmanlar ve Canlı Kültür Atlası</span>
              </div>

              <svg width="100%" height="560" viewBox="0 0 700 560">
                {/* Canlı Akış Çizgileri */}
                <line x1="480" y1="360" x2="410" y2="430" stroke="#1e90ff" strokeWidth="2.5" className="flowing-line" />
                <line x1="410" y1="430" x2="330" y2="400" stroke="#00ff7f" strokeWidth="2.5" className="flowing-line" />
                <line x1="480" y1="360" x2="440" y2="340" stroke="#ffd700" strokeWidth="2" className="flowing-line" />
                <line x1="330" y1="400" x2="260" y2="380" stroke="#ff8c00" strokeWidth="2" className="flowing-line" />
                <line x1="330" y1="400" x2="260" y2="420" stroke="#ff8c00" strokeWidth="2" className="flowing-line" />
                <line x1="330" y1="400" x2="310" y2="510" stroke="#ba55d3" strokeWidth="2" className="flowing-line" />
                <line x1="410" y1="430" x2="450" y2="420" stroke="#00ff7f" strokeWidth="2" className="flowing-line" />
                <line x1="410" y1="430" x2="410" y2="370" stroke="#00ff7f" strokeWidth="2" className="flowing-line" />
                <line x1="410" y1="430" x2="410" y2="480" stroke="#ba55d3" strokeWidth="2" className="flowing-line" />
                
                <line x1="480" y1="360" x2="490" y2="310" stroke="rgba(255,215,0,0.4)" strokeWidth="1.5" />
                <line x1="490" y1="310" x2="510" y2="340" stroke="rgba(255,215,0,0.4)" strokeWidth="1.5" />
                <line x1="510" y1="340" x2="530" y2="290" stroke="rgba(255,215,0,0.4)" strokeWidth="1.5" />
                <line x1="530" y1="290" x2="590" y2="260" stroke="rgba(255,215,0,0.4)" strokeWidth="1.5" />
                <line x1="530" y1="290" x2="520" y2="210" stroke="rgba(255,215,0,0.4)" strokeWidth="1.5" />
                <line x1="520" y1="210" x2="540" y2="190" stroke="rgba(255,215,0,0.4)" strokeWidth="1.5" />
                <line x1="520" y1="210" x2="490" y2="70" stroke="rgba(30,144,255,0.4)" strokeWidth="1.5" />
                <line x1="490" y1="70" x2="510" y2="110" stroke="rgba(0,255,127,0.4)" strokeWidth="1.5" />
                <line x1="510" y1="110" x2="500" y2="140" stroke="rgba(30,144,255,0.4)" strokeWidth="1.5" />
                <line x1="480" y1="360" x2="450" y2="250" stroke="rgba(255,140,0,0.4)" strokeWidth="1.5" />
                <line x1="450" y1="250" x2="390" y2="180" stroke="rgba(255,140,0,0.4)" strokeWidth="1.5" />
                <line x1="480" y1="360" x2="420" y2="300" stroke="rgba(30,144,255,0.4)" strokeWidth="1.5" />
                <line x1="420" y1="300" x2="340" y2="270" stroke="rgba(30,144,255,0.4)" strokeWidth="1.5" />
                <line x1="340" y1="270" x2="270" y2="260" stroke="rgba(30,144,255,0.4)" strokeWidth="1.5" />
                <line x1="270" y1="260" x2="210" y2="250" stroke="rgba(30,144,255,0.4)" strokeWidth="1.5" />

                {/* Süzülen Hareketli Düğümler */}
                {matrixNodes.map((node) => (
                  <g key={node.id} className={`node-${node.anim}`} onClick={() => setSelectedNode(node)}>
                    <circle 
                      cx={node.x} 
                      cy={node.y} 
                      r={selectedNode?.id === node.id ? node.r + 6 : node.r} 
                      fill="#050811" 
                      stroke={selectedNode?.id === node.id ? "#ffffff" : node.color} 
                      strokeWidth={selectedNode?.id === node.id ? "3.5" : "2"} 
                      style={{ filter: `drop-shadow(0px 0px 8px ${node.color})` }}
                    />
                    <text x={node.x} y={node.y + 4} textAnchor="middle" fill={node.color} fontSize={node.r > 28 ? "11" : "9"} fontWeight="bold">
                      {node.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            {/* BİLGİ VE DETAY PANELİ */}
            <div style={{ background: "rgba(255,215,0,0.04)", border: "1px solid rgba(255,215,0,0.3)", borderRadius: "10px", padding: "16px" }}>
              <h3 style={{ color: "#ffd700", fontSize: "0.9rem", margin: "0 0 10px 0", borderBottom: "1px solid rgba(255,215,0,0.2)", paddingBottom: "6px" }}>
                {selectedNode ? `SEÇİLİ KATMAN / HECE: [${selectedNode.label}]` : "📌 MATRİS VE GLOBAL ATLAS REHBERİ"}
              </h3>

              {selectedNode ? (
                <div>
                  <p style={{ color: "#fff", fontSize: "0.85rem", fontWeight: "bold", marginBottom: "8px" }}>{selectedNode.desc}</p>
                  
                  <div style={{ margin: "10px 0", padding: "10px", background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,215,0,0.2)", borderRadius: "6px", fontSize: "0.75rem", color: "#ccc" }}>
                    <div><strong>Algoritmik Bağlantılar:</strong> {selectedNode.connection}</div>
                    <div style={{ marginTop: "4px" }}><strong>Coherence Skoru:</strong> <span style={{ color: "#ffd700", fontWeight: "bold" }}>{selectedNode.score}</span></div>
                  </div>

                  <div style={{ margin: "10px 0" }}>
                    <span style={{ color: "#ffd700", fontSize: "0.72rem", fontWeight: "bold", display: "block", marginBottom: "4px" }}>🌱 TÜRETİLEN KÖK SÖZCÜKLER / BİLEŞENLER:</span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                      {selectedNode.derivatives.map((der, i) => (
                        <span key={i} style={{ background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.3)", color: "#fff", padding: "2px 6px", borderRadius: "4px", fontSize: "0.7rem" }}>{der}</span>
                      ))}
                    </div>
                  </div>

                  <p style={{ color: "#aaa", fontSize: "0.76rem", lineHeight: "1.5", background: "rgba(255,255,255,0.02)", padding: "10px", borderRadius: "6px", borderLeft: "2px solid #ffd700", marginTop: "10px" }}>
                    {selectedNode.details}
                  </p>

                  <button onClick={() => setSelectedNode(null)} style={{ ...backBtnStyle, width: "100%", fontSize: "0.75rem", marginTop: "10px" }}>Seçimi Temizle</button>
                </div>
              ) : (
                <div style={{ color: "#ccc", fontSize: "0.78rem", lineHeight: "1.5" }}>
                  <p>
                    <strong>YKOS Canlı Küresel Ağ:</strong><br />
                    Ekranda gördüğünüz baloncuklar uzay boşluğundaki gibi süzülmekte, bağlantı çizgileri ise algoritmik akışı canlı olarak aktarmaktadır.
                  </p>
                  <p style={{ color: "#aaa", fontSize: "0.72rem", marginTop: "8px" }}>
                    • Bir düğüme tıklayarak onun akış detayını ve türetim köklerini inceleyebilirsiniz.
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
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ color: "#ffd700" }}>ANADOLU VE AVRASYA DAMGA ATLASI</h2>
            <button onClick={() => setCurrentView("dashboard")} style={backBtnStyle}>← ANA PANEL'E DÖN</button>
          </div>
          <p style={{ color: "#ccc" }}>Damga atlası içerikleri aktif.</p>
        </div>
      )}

      {/* 4. OKUMA & ANALİZ MOTORU */}
      {currentView === "engine" && (
        <div style={containerStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ color: "#ffd700" }}>YKOS OKUMA VE ANALİZ MOTORU</h2>
            <button onClick={() => setCurrentView("dashboard")} style={backBtnStyle}>← ANA PANEL'E DÖN</button>
          </div>
          <p style={{ color: "#ccc" }}>Algoritmik deşifre motoru aktif.</p>
        </div>
      )}

      {/* 5. GÖÇ & AKIŞ HARİTASI */}
      {currentView === "flow" && (
        <div style={containerStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ color: "#ffd700" }}>KÖK HECE GÖÇ VE AKIŞ HARİTASI</h2>
            <button onClick={() => setCurrentView("dashboard")} style={backBtnStyle}>← ANA PANEL'E DÖN</button>
          </div>
          <p style={{ color: "#ccc" }}>Anadolu ➔ Asya ➔ Akdeniz ➔ İtalya Akış Eksenleri.</p>
        </div>
      )}

      {/* 6. METODOLOJİ VE KURUMSAL */}
      {currentView === "methodology" && (
        <div style={containerStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ color: "#ffd700" }}>YKOS METODOLOJİSİ VE İLKELERİ</h2>
            <button onClick={() => setCurrentView("dashboard")} style={backBtnStyle}>← ANA PANEL'E DÖN</button>
          </div>
          <p style={{ color: "#ccc" }}>"Önce Veri, Sonra Analiz" ilkesi.</p>
        </div>
      )}

      {/* 7. AKADEMİK OKUMA EKRANI */}
      {currentView === "read" && (
        <div style={containerStyle}>
          <h2 style={{ color: "#ffd700" }}>YKOS AKADEMİK ÇÖZÜMLEME</h2>
          <button onClick={() => setCurrentView("dashboard")} style={{ ...backBtnStyle, marginTop: "15px" }}>← ANA PANEL'E DÖN</button>
        </div>
      )}

      {/* 8. GİRİŞ PORTALI */}
      {currentView === "login" && (
        <div style={{ ...containerStyle, maxWidth: "420px", textAlign: "center" }}>
          <h3 style={{ color: "#ffd700" }}>🔑 {userRole.toUpperCase()} GİRİŞ PORTALI</h3>
          <button onClick={() => setCurrentView("dashboard")} style={{ ...backBtnStyle, marginTop: "15px" }}>İPTAL</button>
        </div>
      )}

    </div>
  );
}
