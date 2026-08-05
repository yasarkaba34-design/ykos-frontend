import React, { useState, useEffect } from "react";
import YKOSDashboard from "./layouts/YKOSDashboard";
import { defaultArchiveArticles, loadArchiveData } from "./data/ykosDataService";
import { translations } from "./data/i18n";

export default function App() {
  const [currentView, setCurrentView] = useState("dashboard"); 
  const [userRole, setUserRole] = useState("guest");
  const [selectedArticleId, setSelectedArticleId] = useState(1);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedAtlasItem, setSelectedAtlasItem] = useState(null);
  const [archiveArticles, setArchiveArticles] = useState(defaultArchiveArticles);

  // DİL STATE'İ ANA APPA TAŞINDI (BÖYLECE SAYFA GEÇİŞLERİNDE SIFIRLANMAZ)
  const [currentLang, setCurrentLang] = useState("TR");
  const [langOpen, setLangOpen] = useState(false);

  const [analysisInput, setAnalysisInput] = useState("YOL - ER - ÇEV - BA - KÖK");
  const [analysisResult, setAnalysisInputResult] = useState(null);

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

  useEffect(() => {
    async function fetchData() {
      const data = await loadArchiveData();
      if (data && data.articles) {
        setArchiveArticles(data.articles);
      }
    }
    fetchData();
  }, []);

  const matrixNodes = [
    { id: "YKOS 100", x: 420, y: 310, r: 36, color: "#1e90ff", label: "YKOS 100", anim: "float1", desc: "Temel Kök Hece Matrisi Katmanı", connection: "YOL, BİR, ANADOLU ATLASI", score: "%99.9", derivatives: ["Kök-en", "Yol-cu", "Çev-re"], details: "Anadolu merkezli 100 birincil hece vektörünün algoritmik veritabanı." },
    { id: "YKOS 200", x: 380, y: 410, r: 35, color: "#00ff7f", label: "YKOS 200", anim: "float2", desc: "Bölgesel ve Derin Arkeolojik Katman", connection: "Göbeklitepe, ROL, Sümer", score: "%99.6", derivatives: ["Rol-daş", "Er-en", "Süm-er"], details: "Doğu Akdeniz, Mezopotamya ve Ön Asya petroglif katmanları." },
    { id: "YKOS 300", x: 260, y: 370, r: 36, color: "#ff8c00", label: "YKOS 300", anim: "float3", desc: "Global Atlas & Avrasya / Amerika Katmanı", connection: "ÖN ASYA ATLASI, AMERİKA ATLASI, AVRUPA ATLASI", score: "%99.4", derivatives: ["At-las", "Av-rasya", "Koz-mos"], details: "Avrasya ve Amerika kıtaları arası Ön-Türkçe kültür ve damga aksı." },

    { id: "ANADOLU ATLASI", x: 420, y: 230, r: 24, color: "#ffd700", label: "ANADOLU ATLASI", anim: "float1", desc: "Anadolu Kadim Kültür Havzası", connection: "YKOS 100", score: "%100", derivatives: ["An-adolu", "Çat-al", "Hatt-i"], details: "Merkez üssü Anadolu olan birincil dil ve yazı simetri haritası." },
    { id: "ÖN ASYA ATLASI", x: 150, y: 320, r: 22, color: "#ffd700", label: "ÖN ASYA ATLASI", anim: "float2", desc: "Ön Asya ve Havza Hatları", connection: "YKOS 300", score: "%99.1", derivatives: ["As-ya", "Kaf-kas", "İr-an"], details: "Mezopotamya ve Kafkasya geçiş yolları." },
    { id: "AMERİKA ATLASI", x: 140, y: 410, r: 22, color: "#ff8c00", label: "AMERİKA ATLASI", anim: "float3", desc: "Trans-Bering ve Maya/Inka Bağlantıları", connection: "YKOS 300", score: "%98.5", derivatives: ["May-a", "In-ka", "Ol-mek"], details: "Amerika kıtasındaki petroglif ve Ön-Türkçe damga paralellikleri." },
    { id: "AVRUPA ATLASI", x: 250, y: 500, r: 22, color: "#ba55d3", label: "AVRUPA ATLASI", anim: "float1", desc: "Etrüsk, Etruria ve Akdeniz Rotaları", connection: "AYLUİL", score: "%98.9", derivatives: ["Et-rüsk", "Lem-nos", "Alp-ler"], details: "Akdeniz ve Etrüsk yazıtları dil akışı." },
    { id: "Göbeklitepe", x: 480, y: 430, r: 22, color: "#00ff7f", label: "Göbeklitepe", anim: "float2", desc: "M.Ö. 9600 T-Sütun Sembolizmleri", connection: "YKOS 200", score: "%99.7", derivatives: ["T-Sütun", "H-Piktogramı", "C-Damgası"], details: "İkilik ve göksel bağ sembolizminin deşifresi." },
    { id: "Sümer", x: 470, y: 360, r: 22, color: "#00ff7f", label: "Sümer", anim: "float3", desc: "Mezopotamya Çivi Yazısı Kökleri", connection: "YKOS 200", score: "%99.2", derivatives: ["Süm-er", "Kiv-i", "Lal-ag"], details: "Sümerce ve Ön-Türkçe ortak fonetik kök eşleşmeleri." },

    { id: "BİR", x: 500, y: 270, r: 24, color: "#ffd700", label: "BİR", anim: "float1", desc: "Teklik, Merkez ve Başlangıç", connection: "YKOS 100, YOL", score: "%99.8", derivatives: ["Bir-lik", "Bir-inci"], details: "İlk varlık ve birlik aksı." },
    { id: "YOL", x: 550, y: 330, r: 24, color: "#ffd700", label: "YOL", anim: "float2", desc: "Aks, Hareket ve Akış", connection: "BİR, O", score: "%99.8", derivatives: ["Yol-cu", "Yol-daş"], details: "'Rulo değil yol' mantığının merkez hecesi." },
    { id: "O", x: 600, y: 260, r: 25, color: "#ffd700", label: "O", anim: "float3", desc: "Evrensel Öz ve Odak", connection: "YOL, OL, KÖK", score: "%99.5", derivatives: ["O-na", "O-radan"], details: "Merkez ve yön gösterici zamir kökü." },
    { id: "OL", x: 650, y: 210, r: 22, color: "#ffd700", label: "OL", anim: "float1", desc: "Oluş, Varlık ve Doğuş", connection: "O", score: "%99.3", derivatives: ["Ol-gu", "Ol-ay"], details: "Varlığa geliş eylemi." },
    { id: "KÖK", x: 580, y: 170, r: 24, color: "#ffd700", label: "KÖK", anim: "float2", desc: "Kaynak ve Menşe", connection: "O, VAN, ÇİK", score: "%99.9", derivatives: ["Kök-en", "Kök-ten"], details: "Ana kök katmanı." },
    { id: "VAN", x: 620, y: 110, r: 20, color: "#ffd700", label: "VAN", anim: "float3", desc: "Su ve Havza Kimliği", connection: "KÖK", score: "%98.7", derivatives: ["Van-gölü", "Var-an"], details: "Doğu Anadolu havza kurgusu." },
    { id: "ÇİK", x: 530, y: 50, r: 20, color: "#1e90ff", label: "ÇİK", anim: "float1", desc: "Çıkış ve Tepe Vektörü", connection: "GÖK", score: "%98.5", derivatives: ["Çık-ış", "Çık-an"], details: "Yükselim hareketi." },
    { id: "GÖK", x: 560, y: 90, r: 22, color: "#00ff7f", label: "GÖK", anim: "float2", desc: "Kozmoz ve Üst Eksen", connection: "ÇİK, AL", score: "%99.2", derivatives: ["Gök-sel", "Gök-men"], details: "Göksel boyut katmanı." },
    { id: "AL", x: 510, y: 130, r: 20, color: "#1e90ff", label: "AL", anim: "float3", desc: "Alma, Kırmızı ve Yüksek", connection: "GÖK", score: "%98.9", derivatives: ["Al-an", "Al-gı"], details: "Kırmızı ve idrak kökü." },

    { id: "KUR", x: 420, y: 140, r: 24, color: "#ff8c00", label: "KUR", anim: "float1", desc: "Kuruluş, Yapı ve Düzen", connection: "TUT, DA", score: "%99.1", derivatives: ["Kur-um", "Kur-al"], details: "İnşa ve mimari kök hece." },
    { id: "DA", x: 470, y: 190, r: 22, color: "#ff8c00", label: "DA", anim: "float2", desc: "Dağ, Yükseklik ve Yer", connection: "KUR, BİR", score: "%98.8", derivatives: ["Da-ğ", "Da-im"], details: "Yeryüzü şekilleri ve kalıcılık." },
    { id: "ÇEV", x: 330, y: 250, r: 22, color: "#1e90ff", label: "ÇEV", anim: "float3", desc: "Çevre ve Daire", connection: "DİŞ, BİR", score: "%99.4", derivatives: ["Çev-re", "Çev-rik"], details: "Dairesel kuşatma alanı." },
    { id: "DİŞ", x: 260, y: 220, r: 20, color: "#1e90ff", label: "DİŞ", anim: "float1", desc: "Dış, Sınır ve Yapı", connection: "ÇEV, YÜZ", score: "%98.4", derivatives: ["Dış-arı", "Diş-i"], details: "Dış sınır ve biçim." },
    { id: "YÜZ", x: 190, y: 210, r: 20, color: "#1e90ff", label: "YÜZ", anim: "float2", desc: "Yüzey, Çehre ve Taraf", connection: "DİŞ, ULUN", score: "%98.6", derivatives: ["Yüz-ey", "Yüz-le"], details: "Ön görünüm ve alan." },
    { id: "ULUN", x: 120, y: 200, r: 20, color: "#1e90ff", label: "ULUN", anim: "float3", desc: "Ulu, Yüce ve Büyük", connection: "YÜZ", score: "%98.9", derivatives: ["Ulu-luk", "Ulu-s"], details: "Büyüklük ve hiyerarşi." },
    { id: "ROL", x: 360, y: 490, r: 22, color: "#ba55d3", label: "ROL", anim: "float1", desc: "İşlev ve Görev", connection: "YKOS 200", score: "%98.7", derivatives: ["Rol-daş"], details: "Toplumsal işlev." },
    { id: "AYLUİL", x: 310, y: 510, r: 22, color: "#ba55d3", label: "AYLUİL", anim: "float2", desc: "Avrupa Dil Akış Ekeni", connection: "AVRUPA ATLASI", score: "%98.5", derivatives: ["Ay-lu", "İl-en"], details: "Akdeniz ada dilleri." }
  ];

  const atlasItems = [
    { 
      code: "YKOS-DMG-01", 
      name: "Çatalhöyük Dairesel Mühür Damgası", 
      region: "Konya / Anadolu Refugium", 
      date: "M.Ö. 7400 (Neolitik Dönem)", 
      symbol: "⭕", 
      coherence: "%99.8",
      vectorAxis: "Konsantrik Çevresel Vektör",
      summary: "'ÇEV' ve 'BA' dairesel döngü ve mülkiyet matrisi.", 
      analysis: "Çatalhöyük katmanlarında çıkarılan pişmiş toprak dairesel mühürler, yerleşik yaşamın mülkiyet kodlarını ve kozmik döngüyü ifade eder. YKOS 100 analizinde bu motifler 'ÇEV' ve 'BA' kök heceleriyle %99.8 simetri gösterir.",
      academicRef: "YKOS Külliyatı Cilt 1: Anadolu Refugium ve Erken Sembolizm",
      tags: ["Dairesel Mühür", "ÇEV Kökü", "Neolitik Katman", "Refugium"]
    },
    { 
      code: "YKOS-DMG-02", 
      name: "Göbeklitepe T-Sütunu H-C Piktogramı", 
      region: "Şanlıurfa / Anadolu (Sıfır Noktası)", 
      date: "M.Ö. 9600 (Epipaleolitik)", 
      symbol: "🏛️", 
      coherence: "%99.9",
      vectorAxis: "Dikey / Yatay Varlık Aksı",
      summary: "İkilik, göksel bağ ve yer-gök sembolizmi deşifresi.", 
      analysis: "Göbeklitepe T-sütunları üzerindeki 'H' piktogramı; iki dikey çizginin orta yatay bağla birleştiği, insan ile gökyüzü arasındaki iletişim kanalını temsil eder.",
      academicRef: "YKOS Külliyatı Cilt 1-2: Göbeklitepe ve Grafik Algoritma",
      tags: ["T-Sütun", "H-C Piktogramı", "Sıfır Noktası", "Grafik Algoritma"]
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

  const selectedArticle = activeArticles.find(a => a.id === selectedArticleId) || activeArticles[0];

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

  // İÇ SAYFA DİL DEĞİŞTİRME BUTONU BİLEŞENİ
  const renderLanguageSelector = () => (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button 
        onClick={() => setLangOpen(!langOpen)}
        style={{ background: "rgba(255, 215, 0, 0.1)", border: "1px solid #ffd700", color: "#ffd700", padding: "6px 12px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", fontSize: "0.78rem" }}
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
  );

  return (
    <div className="app-main-wrapper" style={{ backgroundColor: "#050811", minHeight: "100vh", color: "#ffffff" }}>
      
      <style>{`
        @keyframes safeFloat1 {
          0% { transform: translate(0px, 0px); }
          50% { transform: translate(3px, -4px); }
          100% { transform: translate(0px, 0px); }
        }
        @keyframes safeFloat2 {
          0% { transform: translate(0px, 0px); }
          50% { transform: translate(-3px, 3px); }
          100% { transform: translate(0px, 0px); }
        }
        @keyframes safeFloat3 {
          0% { transform: translate(0px, 0px); }
          50% { transform: translate(-2px, -3px); }
          100% { transform: translate(0px, 0px); }
        }
        @keyframes linePulse {
          0% { stroke-dashoffset: 0; opacity: 0.5; }
          50% { stroke-dashoffset: 20; opacity: 0.9; }
          100% { stroke-dashoffset: 40; opacity: 0.5; }
        }
        .node-float1 { animation: safeFloat1 4.5s ease-in-out infinite; will-change: transform; cursor: pointer; }
        .node-float2 { animation: safeFloat2 5.5s ease-in-out infinite; will-change: transform; cursor: pointer; }
        .node-float3 { animation: safeFloat3 5.0s ease-in-out infinite; will-change: transform; cursor: pointer; }
        .flowing-line { stroke-dasharray: 6; animation: linePulse 3.5s linear infinite; }
      `}</style>

      {/* 1. ANA DASHBOARD EKRANI */}
      {currentView === "dashboard" && (
        <YKOSDashboard 
          archiveArticles={archiveArticles}
          currentLang={currentLang}
          setCurrentLang={setCurrentLang}
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

      {/* 2. CANLI KÖK HECE MATRİS EKRANI (İÇ SAYFADA DİL BUTONUYLA BİRLİKTE) */}
      {currentView === "visualize" && (
        <div style={containerStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px", borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "10px" }}>
            <div>
              <span style={{ color: "#ffd700", fontSize: "0.75rem", fontWeight: "bold" }}>🌐 {t.matrix}</span>
              <h2 style={{ color: "#ffd700", margin: "2px 0 0 0", fontSize: "1.25rem" }}>YKOS MATRİSLERİ (100 - 200 - 300 CANLI AĞ)</h2>
            </div>
            
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              {renderLanguageSelector()}
              <button onClick={() => setCurrentView("dashboard")} style={backBtnStyle}>{t.backHome}</button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "15px", alignItems: "start" }}>
            
            <div style={{ background: "#02040a", border: "1px solid rgba(255,215,0,0.3)", borderRadius: "10px", padding: "10px", overflow: "hidden", position: "relative" }}>
              <div style={{ position: "absolute", top: "15px", left: "15px", background: "rgba(5,8,17,0.85)", border: "1px solid rgba(255,215,0,0.4)", padding: "8px 12px", borderRadius: "6px", fontSize: "0.72rem", zIndex: 10 }}>
                <strong style={{ color: "#ffd700", display: "block" }}>ÖNCE VERİ, SONRA ANALİZ, SONRA YORUM</strong>
                <span style={{ color: "#aaa" }}>40 Kök Sistem, Karşılaştırmalı Arkeolojik Katmanlar</span>
              </div>

              <svg width="100%" height="560" viewBox="0 0 700 560" style={{ overflow: "visible" }}>
                <line x1="420" y1="310" x2="380" y2="410" stroke="#1e90ff" strokeWidth="2.5" className="flowing-line" />
                <line x1="380" y1="410" x2="260" y2="370" stroke="#00ff7f" strokeWidth="2.5" className="flowing-line" />
                <line x1="420" y1="310" x2="420" y2="230" stroke="#ffd700" strokeWidth="2" className="flowing-line" />
                <line x1="260" y1="370" x2="150" y2="320" stroke="#ff8c00" strokeWidth="2" className="flowing-line" />
                <line x1="260" y1="370" x2="140" y2="410" stroke="#ff8c00" strokeWidth="2" className="flowing-line" />
                <line x1="260" y1="370" x2="250" y2="500" stroke="#ba55d3" strokeWidth="2" className="flowing-line" />
                <line x1="380" y1="410" x2="480" y2="430" stroke="#00ff7f" strokeWidth="2" className="flowing-line" />
                <line x1="380" y1="410" x2="470" y2="360" stroke="#00ff7f" strokeWidth="2" className="flowing-line" />
                <line x1="380" y1="410" x2="360" y2="490" stroke="#ba55d3" strokeWidth="2" className="flowing-line" />
                
                <line x1="420" y1="310" x2="500" y2="270" stroke="rgba(255,215,0,0.4)" strokeWidth="1.5" />
                <line x1="500" y1="270" x2="550" y2="330" stroke="rgba(255,215,0,0.4)" strokeWidth="1.5" />
                <line x1="550" y1="330" x2="600" y2="260" stroke="rgba(255,215,0,0.4)" strokeWidth="1.5" />
                <line x1="600" y1="260" x2="650" y2="210" stroke="rgba(255,215,0,0.4)" strokeWidth="1.5" />
                <line x1="600" y1="260" x2="580" y2="170" stroke="rgba(255,215,0,0.4)" strokeWidth="1.5" />
                <line x1="580" y1="170" x2="620" y2="110" stroke="rgba(255,215,0,0.4)" strokeWidth="1.5" />
                <line x1="580" y1="170" x2="530" y2="50" stroke="rgba(30,144,255,0.4)" strokeWidth="1.5" />
                <line x1="530" y1="50" x2="560" y2="90" stroke="rgba(0,255,127,0.4)" strokeWidth="1.5" />
                <line x1="560" y1="90" x2="510" y2="130" stroke="rgba(30,144,255,0.4)" strokeWidth="1.5" />
                <line x1="420" y1="310" x2="470" y2="190" stroke="rgba(255,140,0,0.4)" strokeWidth="1.5" />
                <line x1="470" y1="190" x2="420" y2="140" stroke="rgba(255,140,0,0.4)" strokeWidth="1.5" />
                <line x1="420" y1="310" x2="330" y2="250" stroke="rgba(30,144,255,0.4)" strokeWidth="1.5" />
                <line x1="330" y1="250" x2="260" y2="220" stroke="rgba(30,144,255,0.4)" strokeWidth="1.5" />
                <line x1="260" y1="220" x2="190" y2="210" stroke="rgba(30,144,255,0.4)" strokeWidth="1.5" />
                <line x1="190" y1="210" x2="120" y2="200" stroke="rgba(30,144,255,0.4)" strokeWidth="1.5" />

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
                    Genişletilmiş baloncuklar ve bağlantı çizgileri algoritmik akışı net olarak göstermektedir.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* 3. DAMGA ATLASI MODÜLÜ (DİL SEÇİCİ İLE) */}
      {currentView === "atlas" && (
        <div style={containerStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "12px" }}>
            <div>
              <span style={{ color: "#ffd700", fontSize: "0.75rem", fontWeight: "bold" }}>🔷 9.870 DAMGA & 18.420 PETROGLİF VERİ TABANI</span>
              <h2 style={{ color: "#ffd700", margin: "4px 0 0 0", fontSize: "1.3rem" }}>{t.atlas}</h2>
            </div>
            
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              {renderLanguageSelector()}
              <button onClick={() => setCurrentView("dashboard")} style={backBtnStyle}>{t.backHome}</button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "20px", alignItems: "start" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "15px" }}>
              {atlasItems.map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedAtlasItem(item)}
                  style={{ 
                    background: selectedAtlasItem?.code === item.code ? "rgba(255,215,0,0.12)" : "rgba(255,215,0,0.03)", 
                    border: selectedAtlasItem?.code === item.code ? "1.5px solid #ffd700" : "1px solid rgba(255,215,0,0.3)", 
                    borderRadius: "10px", 
                    padding: "16px",
                    cursor: "pointer"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <span style={{ color: "#888", fontSize: "0.68rem", fontWeight: "bold" }}>{item.code}</span>
                    <span style={{ color: "#ffd700", fontSize: "0.7rem", background: "rgba(255,215,0,0.15)", padding: "2px 6px", borderRadius: "4px", fontWeight: "bold" }}>{item.coherence}</span>
                  </div>
                  <h4 style={{ color: "#ffd700", margin: "4px 0 6px 0", fontSize: "0.95rem" }}>{item.symbol} {item.name}</h4>
                  <div style={{ color: "#ccc", fontSize: "0.75rem", marginBottom: "8px" }}>📍 {item.region} | ⏳ {item.date}</div>
                  <p style={{ color: "#aaa", fontSize: "0.74rem", margin: 0, lineHeight: "1.4" }}>{item.summary}</p>
                </div>
              ))}
            </div>

            <div style={{ background: "rgba(255,215,0,0.04)", border: "1px solid rgba(255,215,0,0.3)", borderRadius: "10px", padding: "18px", maxHeight: "650px", overflowY: "auto" }}>
              {selectedAtlasItem ? (
                <div>
                  <div style={{ textAlign: "center", padding: "15px 0", borderBottom: "1px dashed rgba(255,215,0,0.3)", marginBottom: "14px" }}>
                    <span style={{ fontSize: "3rem", display: "block", marginBottom: "4px" }}>{selectedAtlasItem.symbol}</span>
                    <span style={{ color: "#888", fontSize: "0.7rem", fontWeight: "bold" }}>{selectedAtlasItem.code}</span>
                    <h3 style={{ color: "#ffd700", margin: "4px 0 0 0", fontSize: "1.15rem" }}>{selectedAtlasItem.name}</h3>
                  </div>

                  <div style={{ fontSize: "0.8rem", color: "#ccc", lineHeight: "1.65" }}>
                    <div style={{ marginBottom: "6px" }}><strong>Coğrafi Katman:</strong> {selectedAtlasItem.region}</div>
                    <div style={{ marginBottom: "6px" }}><strong>Tarihlendirme:</strong> {selectedAtlasItem.date}</div>
                    <div style={{ marginBottom: "6px" }}><strong>Geometrik Aks:</strong> <span style={{ color: "#1e90ff" }}>{selectedAtlasItem.vectorAxis}</span></div>
                    <div style={{ marginBottom: "12px" }}><strong>Coherence:</strong> <span style={{ color: "#ffd700", fontWeight: "bold" }}>{selectedAtlasItem.coherence}</span></div>

                    <div style={{ background: "rgba(0,0,0,0.7)", padding: "14px", borderRadius: "8px", borderLeft: "3.5px solid #ffd700", marginBottom: "14px" }}>
                      <strong style={{ color: "#ffd700", display: "block", marginBottom: "6px" }}>📜 YKOS AKADEMİK DEŞİFRE RAPORU:</strong>
                      <p style={{ color: "#ddd", margin: 0, fontSize: "0.78rem", lineHeight: "1.7" }}>{selectedAtlasItem.analysis}</p>
                    </div>

                    <button onClick={() => setSelectedAtlasItem(null)} style={{ ...backBtnStyle, width: "100%", fontSize: "0.78rem" }}>Seçimi Temizle</button>
                  </div>
                </div>
              ) : (
                <div style={{ color: "#aaa", fontSize: "0.78rem", textAlign: "center", padding: "40px 10px" }}>
                  <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "10px" }}>🗺️</span>
                  <strong style={{ color: "#ffd700", display: "block", marginBottom: "6px" }}>DAMGA REHBERİ</strong>
                  Damga veya petroglif seçerek akademik deşifre raporunu görüntüleyebilirsiniz.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. AKADEMİK OKUMA EKRANI */}
      {currentView === "read" && (
        <div style={containerStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px", borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "10px" }}>
            <div>
              <span style={{ color: "#ffd700", fontSize: "0.75rem", fontWeight: "bold" }}>📜 AKADEMİK ÇÖZÜMLEME KATMANI</span>
              <h2 style={{ color: "#ffd700", margin: "4px 0 0 0", fontSize: "1.3rem" }}>{selectedArticle.title}</h2>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              {renderLanguageSelector()}
              <button onClick={() => setCurrentView("dashboard")} style={backBtnStyle}>{t.backHome}</button>
            </div>
          </div>

          <div style={{ padding: "15px 0", color: "#ccc", lineHeight: "1.8", fontSize: "0.92rem" }}>
            <p style={{ background: "rgba(255,215,0,0.03)", padding: "12px", borderRadius: "6px", borderLeft: "3px solid #ffd700", marginBottom: "15px" }}>
              <strong>Özet:</strong> {selectedArticle.summary}
            </p>

            <p style={{ marginBottom: "15px" }}>
              {selectedArticle.content || "Anadolu merkezli YKOS M5 Kök Hece Matrisi uyarınca gerçekleştirilen bu deşifre çalışmasında, yazıt karakterlerinin dikey ve yatay aks simetrileri doğrulanmıştır."}
            </p>

            <div style={{ background: "rgba(255,215,0,0.06)", padding: "14px", border: "1px solid rgba(255,215,0,0.3)", color: "#ffd700", fontWeight: "bold", margin: "20px 0", borderRadius: "6px" }}>
              ⚡ YKOS Algoritmik Tutarlılık Skoru (Coherence): %99.4 Tam Metin Eşleşmesi
            </div>
          </div>

          <button onClick={() => setCurrentView("dashboard")} style={backBtnStyle}>{t.backHome}</button>
        </div>
      )}

    </div>
  );
}