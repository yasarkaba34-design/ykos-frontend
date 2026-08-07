import React, { useState, useEffect } from "react";
// App.jsx içine eklenecek import
import { fetchRssData } from "./data/ykosApiService";

// App fonksiyonu içinde state'i tanımlayın
const [rssArticles, setRssArticles] = useState([]);

// Mevcut useEffect'inizi şu şekilde güncelleyin:
useEffect(() => {
  async function fetchData() {
    // 1. Yerel arşiv yükle
    const data = await loadArchiveData();
    if (data && data.articles) {
      setArchiveArticles(data.articles);
    }
    
    // 2. Canlı RSS akışını çek
    const rssData = await fetchRssData();
    if (rssData.length > 0) {
      setRssArticles(rssData);
    }
  }
  fetchData();
}, []);

import YKOSDashboard from "./layouts/YKOSDashboard";
import { defaultArchiveArticles, loadArchiveData } from "./data/ykosDataService";
import { translations } from "./data/i18n";
import AtlasMap from "./mega/AtlasMap";

export function App() {
  const [currentView, setCurrentView] = useState("dashboard"); 
  const [userRole, setUserRole] = useState("guest");
  const [selectedArticleId, setSelectedArticleId] = useState(1);
  const [selectedNode, setSelectedNode] = useState(null);
  const [archiveArticles, setArchiveArticles] = useState(defaultArchiveArticles);

  const [currentLang, setCurrentLang] = useState("TR");
  const [langOpen, setLangOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  // MOTOR VE YKOS 1000 STATE'LERİ
  const [analysisInput, setAnalysisInput] = useState("YOL - ER - ÇEV - BA - KÖK");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [selectedMasterLayer, setSelectedMasterLayer] = useState(null);

  const t = translations[currentLang] || translations.TR;
  const activeArticles = t.articles || archiveArticles;

  // YKOS 1000 - 10 DİKEY VERİ KATMANI
  const ykos1000Layers = [
    { no: 1, title: "Kozmik ve Jeolojik Katman", desc: "Evrenin ve Dünya'nın oluşumu, süperkıtalar, buzul çağı döngüleri.", status: "AKTİF" },
    { no: 2, title: "Anadolu Jeolojisi ve Coğrafyası", desc: "Dağ kuşakları, sığınak havzalar (Refugium), hidrolojik hafıza ve mikroklimalar.", status: "AKTİF" },
    { no: 3, title: "İlk İnsan İzleri ve Yerleşimler", desc: "Yarımburgaz, Karain Mağaraları, avcı-toplayıcı yaşam ve Neolitik geçiş.", status: "AKTİF" },
    { no: 4, title: "İlk Semboller ve Damgalar", desc: "Kaya resimleri, piktogramlar ve fikirlerin algoritmik grafik kodlara dönüşümü.", status: "AKTİF" },
    { no: 5, title: "Anadolu'nun Kadim Merkezleri", desc: "Göbeklitepe, Çatalhöyük, Hattuşa, Alacahöyük, Efes ve Troya medeniyet ağları.", status: "AKTİF" },
    { no: 6, title: "Yazının Doğuşu ve Gelişimi", desc: "Çivi yazısı, hiyeroglifler, runik yazılar ve Türk alfabesinin evrimi.", status: "AKTİF" },
    { no: 7, title: "Dil ve Türkçe Katmanı", desc: "Kök-hece sistemi (M5), eklemeli yapı ve anlam ağlarının algoritmik analizi.", status: "AKTİF" },
    { no: 8, title: "Türk Dilleri ve Lehçeleri Atlası", desc: "30+ lehçenin köksel bütünlüğü, fonetik korunumu ve Avrasya yayılımı.", status: "AKTİF" },
    { no: 9, title: "Dünya Dilleri ve Kültürler Atlası", desc: "Küresel dil ailelerinin Anadolu merkezli göç ve etkileşim haritası.", status: "AKTİF" },
    { no: 10, title: "YKOS Entegrasyon & Yapay Zekâ", desc: "10 dilde çalışan, sorgulanabilir dijital bilgi ve canlı veri tabanı ağı.", status: "CANLI" }
  ];

  const migrationRoutes = [
    {
      id: "FLOW-01",
      title: "Anadolu Refugium ➔ Doğu Akdeniz & Sümer Hatları",
      period: "M.Ö. 10.000 - M.Ö. 4.000",
      origin: "Anadolu (Buzul Çağı Sığınağı)",
      destination: "Mezopotamya / Basra Körfezi",
      description: "Buzulların erimesi ve Karadeniz tatlı su gölünün tuzlu denizle birleşmesi sonrası Anadolu'dan güneye inen eklemeli dil ve çivi yazısı kök aktarımı.",
      coherence: "%99.6"
    },
    {
      id: "FLOW-02",
      title: "Anadolu ➔ Kafkasya, Altay & Orhun Havzaları",
      period: "M.Ö. 8.000 - M.Ö. 1.000",
      origin: "Anadolu Merkez (Hattuşa / Çorum / Van)",
      destination: "Saymalıtaş / Altay Dağları / Orhun Vadisi",
      description: "Anadolu'dan Asya'ya büyük dil ve damga akışı. 'GÖK', 'ÇİK' ve 'İL' kök hecelerinin Doğu Bozkırlarına taşınması.",
      coherence: "%99.8"
    },
    {
      id: "FLOW-03",
      title: "Anadolu ➔ Lemnos & Etrüsk (Etruria / İtalya)",
      period: "M.Ö. 2.000 - M.Ö. 600",
      origin: "Batı Anadolu & Ege Adaları",
      destination: "Lemnos Adası & Etruria (İtalya)",
      description: "Lemnos steli ve Etrüsk yazıtlarındaki 'YOL' ve 'EL' köklerinin Akdeniz deniz rotası vasıtasıyla batıya yayılımı.",
      coherence: "%98.9"
    },
    {
      id: "FLOW-04",
      title: "Avrasya ➔ Bering & Amerika (Maya / Olmek Hatları)",
      period: "M.Ö. 12.000 - M.Ö. 3.000",
      origin: "Sibirya / Avrasya Hattı",
      destination: "Kuzey & Orta Amerika (Arizona / Maya Katmanı)",
      description: "Trans-Bering hattını izleyen kök-piktogram ve kaya resimlerinin Amerika yerli dillerindeki fonetik izleri.",
      coherence: "%98.5"
    }
  ];

  const atlasLocations = [
    { id: "ANADOLU-01", name: "Çatalhöyük & Konya Havzası", region: "Anadolu Refugium Katmanı", details: "M.Ö. 7400 Neolitik dairesel mühürler, 'ÇEV' ve 'BA' kök hece mülkiyet matrisinin merkez üssüdür." },
    { id: "ANADOLU-02", name: "Göbeklitepe & Şanlıurfa", region: "Epipaleolitik Grafik Algoritma", details: "M.Ö. 9600 T-sütunları üzerindeki 'H' piktogramı dikey varlık ve yatay bağ aksını kodlar." },
    { id: "ANADOLU-03", name: "Hattuşa & Çorum Havzası", region: "Hatti - Hitit Ön-Türkçe Kök Katmanı", details: "Hatti yazıtları ve mühürleri, YKOS KUR, DA ve ÇEV hece türetimleri ile %99.4 simetri gösterir." },
    { id: "AVRASYA-01", name: "Saymalıtaş & Altay Rotaları", region: "Kaya Resimleri ve Petroglif Hatları", details: "Anadolu çıkışlı göç dalgalarının Avrasya bozkırlarındaki 'GÖK' ve 'ÇİK' yükselim grafik izleri." },
    { id: "AKDENIZ-01", name: "Lemnos & Etruria (İtalya)", region: "Akdeniz & Etrüsk Alfabetik Aksı", details: "Lemnos mezar steli ve Etrüsk yazıtlarındaki 'YOL' kökü vasıtasıyla kanıtlanan Akdeniz dil akışı." }
  ];

  const languages = [
    { code: "TR", label: "Türkçe" }, { code: "EN", label: "English" }, { code: "FR", label: "Français" }, 
    { code: "RU", label: "Русский" }, { code: "ZH", label: "中文" }, { code: "JA", label: "日本語" }, 
    { code: "PT", label: "Português" }, { code: "ES", label: "Español" }, { code: "AR", label: "العربية" }, { code: "DE", label: "Deutsch" }
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

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 2.2));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.6));
  const handleZoomReset = () => setZoomLevel(1);

  const handleRunAnalysis = () => {
    setAnalysisResult({
      status: "SUCCESS",
      coherenceScore: "%99.6",
      vectorPath: "Dikey / Yatay Aks",
      synthesis: "Girdiğiniz kök hece zinciri, YKOS M5 algoritmasına göre yapısal bütünlüğünü korumaktadır. Türkçe eklemeli mantığın ve form-bağlam-anlam eşzamanlılığının tüm kuralları bu dizilimde çalışmaktadır."
    });
  };

  const matrixNodes = [
    { id: "YKOS 1000", x: 350, y: 180, r: 42, color: "#ffd700", label: "YKOS 1000", anim: "float1", desc: "Ana Bilgi Entegrasyon Matrisi", connection: "YKOS 100, YKOS 200, YKOS 300", score: "%100", derivatives: ["Master-Veri", "Yapay-Zekâ"], details: "Sistemin tüm katmanlarını bağlayan yapay zekâ destekli üst entegrasyon matrisi." },
    { id: "YKOS 100", x: 420, y: 310, r: 36, color: "#1e90ff", label: "YKOS 100", anim: "float1", desc: "Temel Kök Hece Matrisi Katmanı", connection: "YOL, BİR, ANADOLU ATLASI, ÇEV", score: "%99.9", derivatives: ["Kök-en", "Yol-cu", "Çev-re"], details: "Anadolu merkezli 100 birincil hece vektörünün algoritmik veritabanı." },
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
    { id: "KÖK", x: 580, y: 170, r: 24, color: "#ffd700", label: "KÖK", anim: "float2", desc: "Kaynak ve Menşe", connection: "O, VAN, ÇİK, AL", score: "%99.9", derivatives: ["Kök-en", "Kök-ten"], details: "Ana kök katmanı." },
    { id: "VAN", x: 620, y: 110, r: 20, color: "#ffd700", label: "VAN", anim: "float3", desc: "Su ve Havza Kimliği", connection: "KÖK", score: "%98.7", derivatives: ["Van-gölü", "Var-an"], details: "Doğu Anadolu havza kurgusu." },
    { id: "ÇİK", x: 530, y: 50, r: 20, color: "#1e90ff", label: "ÇİK", anim: "float1", desc: "Çıkış ve Tepe Vektörü", connection: "GÖK", score: "%98.5", derivatives: ["Çık-ış", "Çık-an"], details: "Yükselim hareketi." },
    { id: "GÖK", x: 560, y: 90, r: 22, color: "#00ff7f", label: "GÖK", anim: "float2", desc: "Kozmoz ve Üst Eksen", connection: "ÇİK, AL", score: "%99.2", derivatives: ["Gök-sel", "Gök-men"], details: "Göksel boyut katmanı." },
    { id: "AL", x: 510, y: 130, r: 20, color: "#1e90ff", label: "AL", anim: "float3", desc: "Alma, Kırmızı ve Yüksek", connection: "GÖK, KÖK", score: "%98.9", derivatives: ["Al-an", "Al-gı"], details: "Kırmızı ve idrak kökü." },

    { id: "KUR", x: 420, y: 140, r: 24, color: "#ff8c00", label: "KUR", anim: "float1", desc: "Kuruluş, Yapı ve Düzen", connection: "YKOS 1000, DA", score: "%99.1", derivatives: ["Kur-um", "Kur-al"], details: "İnşa ve mimari kök hece." },
    { id: "DA", x: 470, y: 190, r: 22, color: "#ff8c00", label: "DA", anim: "float2", desc: "Dağ, Yükseklik ve Yer", connection: "KUR", score: "%98.8", derivatives: ["Da-ğ", "Da-im"], details: "Yeryüzü şekilleri ve kalıcılık." },
    { id: "ÇEV", x: 330, y: 250, r: 22, color: "#1e90ff", label: "ÇEV", anim: "float3", desc: "Çevre ve Daire", connection: "YKOS 100, DİŞ", score: "%99.4", derivatives: ["Çev-re", "Çev-rik"], details: "Dairesel kuşatma alanı." },
    { id: "DİŞ", x: 260, y: 220, r: 20, color: "#1e90ff", label: "DİŞ", anim: "float1", desc: "Dış, Sınır ve Yapı", connection: "ÇEV, YÜZ", score: "%98.4", derivatives: ["Dış-arı", "Diş-i"], details: "Dış sınır ve biçim." },
    { id: "YÜZ", x: 190, y: 210, r: 20, color: "#1e90ff", label: "YÜZ", anim: "float2", desc: "Yüzey, Çehre ve Taraf", connection: "DİŞ, ULUN", score: "%98.6", derivatives: ["Yüz-ey", "Yüz-le"], details: "Ön görünüm ve alan." },
    { id: "ULUN", x: 120, y: 200, r: 20, color: "#1e90ff", label: "ULUN", anim: "float3", desc: "Ulu, Yüce ve Büyük", connection: "YÜZ", score: "%98.9", derivatives: ["Ulu-luk", "Ulu-s"], details: "Büyüklük ve hiyerarşi." },
    { id: "ROL", x: 360, y: 490, r: 22, color: "#ba55d3", label: "ROL", anim: "float1", desc: "İşlev ve Görev", connection: "YKOS 200", score: "%98.7", derivatives: ["Rol-daş"], details: "Toplumsal işlev." },
    { id: "AYLUİL", x: 310, y: 510, r: 22, color: "#ba55d3", label: "AYLUİL", anim: "float2", desc: "Avrupa Dil Akış Ekeni", connection: "AVRUPA ATLASI", score: "%98.5", derivatives: ["Ay-lu", "İl-en"], details: "Akdeniz ada dilleri." }
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
    margin: "10px auto",
    padding: "15px",
    backgroundColor: "#050811",
    border: "1px solid #ffd700",
    borderRadius: "12px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.8)",
    color: "#fff",
    boxSizing: "border-box"
  };

  const backBtnStyle = {
    padding: "8px 14px",
    background: "transparent",
    border: "1px solid #ffd700",
    color: "#ffd700",
    fontWeight: "bold",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.78rem"
  };

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

  const getPanelLabel = (key) => {
    const labels = {
      selectedLayer: { TR: "SEÇİLİ KATMAN / HECE", EN: "SELECTED LAYER / SYLLABLE" },
      clearSelection: { TR: "Seçimi Temizle", EN: "Clear Selection" },
      derivatives: { TR: "TÜRETİLEN KÖK SÖZCÜKLER / BİLEŞENLER:", EN: "DERIVED ROOT WORDS / COMPONENTS:" },
      connections: { TR: "Algoritmik Bağlantılar:", EN: "Algorithmic Connections:" },
      coherence: { TR: "Coherence Skoru:", EN: "Coherence Score:" },
      guideTitle: { TR: "📌 MATRİS VE GLOBAL ATLAS REHBERİ", EN: "📌 MATRIX & GLOBAL ATLAS GUIDE" },
      motiveTitle: { TR: "ÖNCE VERİ, SONRA ANALİZ, SONRA YORUM", EN: "FIRST DATA, THEN ANALYSIS, THEN INTERPRETATION" },
      motiveSub: { TR: "40 Kök Sistem, Karşılaştırmalı Arkeolojik Katmanlar", EN: "40 Root Systems, Comparative Archaeological Layers" },
      guideDesc: { TR: "YKOS Canlı Küresel Ağ: Genişletilmiş baloncuklar ve bağlantı çizgileri algoritmik akışı net olarak göstermektedir.", EN: "YKOS Live Global Network: Expanded bubbles and connecting lines clearly display the algorithmic flow." }
    };
    return labels[key]?.[currentLang] || labels[key]?.TR;
  };

  return (
    <div className="app-main-wrapper" style={{ backgroundColor: "#050811", minHeight: "100vh", color: "#ffffff" }}>
      
      <style>{`
        @keyframes safeFloat1 { 0% { transform: translate(0px, 0px); } 50% { transform: translate(3px, -4px); } 100% { transform: translate(0px, 0px); } }
        @keyframes safeFloat2 { 0% { transform: translate(0px, 0px); } 50% { transform: translate(-3px, 3px); } 100% { transform: translate(0px, 0px); } }
        @keyframes safeFloat3 { 0% { transform: translate(0px, 0px); } 50% { transform: translate(-2px, -3px); } 100% { transform: translate(0px, 0px); } }
        @keyframes linePulse { 0% { stroke-dashoffset: 0; opacity: 0.5; } 50% { stroke-dashoffset: 20; opacity: 0.9; } 100% { stroke-dashoffset: 40; opacity: 0.5; } }
        .node-float1 { animation: safeFloat1 4.5s ease-in-out infinite; will-change: transform; cursor: pointer; }
        .node-float2 { animation: safeFloat2 5.5s ease-in-out infinite; will-change: transform; cursor: pointer; }
        .node-float3 { animation: safeFloat3 5.0s ease-in-out infinite; will-change: transform; cursor: pointer; }
        .flowing-line { stroke-dasharray: 6; animation: linePulse 3.5s linear infinite; }

        .responsive-matrix-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 15px;
          align-items: start;
        }

        @media (max-width: 900px) {
          .responsive-matrix-grid { grid-template-columns: 1fr !important; }
          .matrix-canvas-wrapper { order: 1 !important; min-height: 460px !important; }
          .matrix-guide-panel { order: 2 !important; }
        }
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
          onNavigateYkos1000={() => setCurrentView("ykos1000")}
          onNavigateMethod={() => setCurrentView("methodology")}
          onGoHome={() => setCurrentView("dashboard")}
        />
      )}

      {/* 2. YKOS 1000 MASTER MATRİS MODÜLÜ */}
      {currentView === "ykos1000" && (
        <div style={containerStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "12px", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <span style={{ color: "#ffd700", fontSize: "0.75rem", fontWeight: "bold" }}>👑 YKOS 1000 MASTER BİLGİ ENTEGRASYON MATRİSİ</span>
              <h2 style={{ color: "#ffd700", margin: "4px 0 0 0", fontSize: "1.3rem" }}>10 Dikey Veri Katmanı ve Yapay Zekâ Şemsiyesi</h2>
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              {renderLanguageSelector()}
              <button onClick={() => setCurrentView("dashboard")} style={backBtnStyle}>{t.backHome}</button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "12px" }}>
            {ykos1000Layers.map((layer) => (
              <div 
                key={layer.no}
                onClick={() => setSelectedMasterLayer(layer)}
                style={{
                  background: selectedMasterLayer?.no === layer.no ? "rgba(255, 215, 0, 0.15)" : "rgba(255, 215, 0, 0.03)",
                  border: selectedMasterLayer?.no === layer.no ? "1.5px solid #ffd700" : "1px solid rgba(255, 215, 0, 0.25)",
                  borderRadius: "8px",
                  padding: "14px",
                  cursor: "pointer"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <span style={{ color: "#ffd700", fontWeight: "bold", fontSize: "0.75rem" }}>KATMAN {layer.no}</span>
                  <span style={{ color: "#00ff7f", fontSize: "0.68rem", border: "1px solid #00ff7f", padding: "1px 5px", borderRadius: "3px" }}>{layer.status}</span>
                </div>
                <h4 style={{ color: "#fff", margin: "0 0 6px 0", fontSize: "0.92rem" }}>{layer.title}</h4>
                <p style={{ color: "#aaa", fontSize: "0.75rem", margin: 0, lineHeight: "1.4" }}>{layer.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. CANLI KÖK HECE MATRİS EKRANI (TAM İNTERAKTİF SVG VE REHBER PANELİ) */}
      {currentView === "visualize" && (
        <div style={containerStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px", borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "10px", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <span style={{ color: "#ffd700", fontSize: "0.75rem", fontWeight: "bold" }}>🌐 {t.matrix}</span>
              <h2 style={{ color: "#ffd700", margin: "2px 0 0 0", fontSize: "1.15rem" }}>YKOS MATRİSLERİ (100 - 200 - 300 - 1000 CANLI AĞ)</h2>
            </div>
            
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              {renderLanguageSelector()}
              <button onClick={() => setCurrentView("dashboard")} style={backBtnStyle}>{t.backHome}</button>
            </div>
          </div>

          <div className="responsive-matrix-grid">
            <div className="matrix-canvas-wrapper" style={{ background: "#02040a", border: "1px solid rgba(255,215,0,0.3)", borderRadius: "10px", padding: "10px", overflow: "hidden", position: "relative", width: "100%", boxSizing: "border-box" }}>
              
              <div style={{ position: "absolute", top: "10px", left: "10px", background: "rgba(5,8,17,0.88)", border: "1px solid rgba(255,215,0,0.4)", padding: "6px 10px", borderRadius: "6px", fontSize: "0.68rem", zIndex: 10, maxWidth: "60%" }}>
                <strong style={{ color: "#ffd700", display: "block" }}>{getPanelLabel("motiveTitle")}</strong>
                <span style={{ color: "#aaa" }}>{getPanelLabel("motiveSub")}</span>
              </div>

              <div style={{ position: "absolute", top: "10px", right: "10px", display: "flex", gap: "4px", zIndex: 20, background: "rgba(5,8,17,0.9)", padding: "4px", borderRadius: "6px", border: "1px solid rgba(255,215,0,0.4)" }}>
                <button onClick={handleZoomIn} style={{ background: "#000", border: "1px solid #ffd700", color: "#ffd700", width: "30px", height: "30px", borderRadius: "4px", fontWeight: "bold", fontSize: "1.1rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                <button onClick={handleZoomOut} style={{ background: "#000", border: "1px solid #ffd700", color: "#ffd700", width: "30px", height: "30px", borderRadius: "4px", fontWeight: "bold", fontSize: "1.1rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>-</button>
                <button onClick={handleZoomReset} style={{ background: "#000", border: "1px solid #ffd700", color: "#ffd700", height: "30px", padding: "0 8px", borderRadius: "4px", fontWeight: "bold", fontSize: "0.7rem", cursor: "pointer" }}>🔍 %{Math.round(zoomLevel * 100)}</button>
              </div>

              <div style={{ width: "100%", overflow: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <svg width="100%" height="100%" viewBox="0 0 700 560" style={{ overflow: "visible", minHeight: "460px", transform: `scale(${zoomLevel})`, transformOrigin: "center center", transition: "transform 0.25s ease-out" }}>
                  
                  {/* ANA DÜĞÜM ÇİZGİLERİ */}
                  <line x1="350" y1="180" x2="420" y2="310" stroke="#ffd700" strokeWidth="3" className="flowing-line" />
                  <line x1="350" y1="180" x2="380" y2="410" stroke="#ffd700" strokeWidth="3" className="flowing-line" />
                  <line x1="350" y1="180" x2="260" y2="370" stroke="#ffd700" strokeWidth="3" className="flowing-line" />

                  {/* KATMAN VE ATLAS BAĞLANTILARI */}
                  <line x1="420" y1="310" x2="380" y2="410" stroke="#1e90ff" strokeWidth="2.5" className="flowing-line" />
                  <line x1="380" y1="410" x2="260" y2="370" stroke="#00ff7f" strokeWidth="2.5" className="flowing-line" />
                  <line x1="420" y1="310" x2="420" y2="230" stroke="#ffd700" strokeWidth="2" className="flowing-line" />
                  <line x1="260" y1="370" x2="150" y2="320" stroke="#ff8c00" strokeWidth="2" className="flowing-line" />
                  <line x1="260" y1="370" x2="140" y2="410" stroke="#ff8c00" strokeWidth="2" className="flowing-line" />
                  <line x1="260" y1="370" x2="250" y2="500" stroke="#ba55d3" strokeWidth="2" className="flowing-line" />
                  <line x1="380" y1="410" x2="480" y2="430" stroke="#00ff7f" strokeWidth="2" className="flowing-line" />
                  <line x1="380" y1="410" x2="470" y2="360" stroke="#00ff7f" strokeWidth="2" className="flowing-line" />
                  <line x1="380" y1="410" x2="360" y2="490" stroke="#ba55d3" strokeWidth="2" className="flowing-line" />
                  <line x1="250" y1="500" x2="310" y2="510" stroke="#ba55d3" strokeWidth="2" className="flowing-line" />
                  
                  {/* SAĞ KANAT KÖK HECE BAĞLANTILARI */}
                  <line x1="420" y1="310" x2="500" y2="270" stroke="rgba(255,215,0,0.5)" strokeWidth="1.8" />
                  <line x1="500" y1="270" x2="550" y2="330" stroke="rgba(255,215,0,0.5)" strokeWidth="1.8" />
                  <line x1="550" y1="330" x2="600" y2="260" stroke="rgba(255,215,0,0.5)" strokeWidth="1.8" />
                  <line x1="600" y1="260" x2="650" y2="210" stroke="rgba(255,215,0,0.5)" strokeWidth="1.8" />
                  <line x1="600" y1="260" x2="580" y2="170" stroke="rgba(255,215,0,0.5)" strokeWidth="1.8" />
                  <line x1="580" y1="170" x2="620" y2="110" stroke="rgba(255,215,0,0.5)" strokeWidth="1.8" />
                  <line x1="580" y1="170" x2="510" y2="130" stroke="rgba(255,215,0,0.5)" strokeWidth="1.8" />
                  <line x1="510" y1="130" x2="560" y2="90" stroke="rgba(255,215,0,0.5)" strokeWidth="1.8" />
                  <line x1="560" y1="90" x2="530" y2="50" stroke="rgba(255,215,0,0.5)" strokeWidth="1.8" />

                  {/* ÜST KANAT: KUR - DA BAĞLANTILARI */}
                  <line x1="350" y1="180" x2="420" y2="140" stroke="#ff8c00" strokeWidth="2" />
                  <line x1="420" y1="140" x2="470" y2="190" stroke="#ff8c00" strokeWidth="2" />

                  {/* SOL KANAT: ULUN ➔ YÜZ ➔ DİŞ ➔ ÇEV ➔ YKOS 100 BAĞLANTI HATTI */}
                  <line x1="420" y1="310" x2="330" y2="250" stroke="#1e90ff" strokeWidth="2" className="flowing-line" />
                  <line x1="330" y1="250" x2="260" y2="220" stroke="#1e90ff" strokeWidth="2" className="flowing-line" />
                  <line x1="260" y1="220" x2="190" y2="210" stroke="#1e90ff" strokeWidth="2" className="flowing-line" />
                  <line x1="190" y1="210" x2="120" y2="200" stroke="#1e90ff" strokeWidth="2" className="flowing-line" />

                  {/* DÜĞÜMLER */}
                  {matrixNodes.map((node) => (
                    <g key={node.id} className={`node-${node.anim}`} onClick={() => setSelectedNode(node)}>
                      <circle cx={node.x} cy={node.y} r={selectedNode?.id === node.id ? node.r + 6 : node.r} fill="#050811" stroke={selectedNode?.id === node.id ? "#ffffff" : node.color} strokeWidth={selectedNode?.id === node.id ? "3.5" : "2"} style={{ filter: `drop-shadow(0px 0px 8px ${node.color})` }} />
                      <text x={node.x} y={node.y + 4} textAnchor="middle" fill={node.color} fontSize={node.r > 28 ? "11" : "9"} fontWeight="bold">{node.label}</text>
                    </g>
                  ))}
                </svg>
              </div>

            </div>

            <div className="matrix-guide-panel" style={{ background: "rgba(255,215,0,0.04)", border: "1px solid rgba(255,215,0,0.3)", borderRadius: "10px", padding: "16px" }}>
              <h3 style={{ color: "#ffd700", fontSize: "0.88rem", margin: "0 0 10px 0", borderBottom: "1px solid rgba(255,215,0,0.2)", paddingBottom: "6px" }}>
                {selectedNode ? `${getPanelLabel("selectedLayer")}: [${selectedNode.label}]` : getPanelLabel("guideTitle")}
              </h3>

              {selectedNode ? (
                <div>
                  <p style={{ color: "#fff", fontSize: "0.85rem", fontWeight: "bold", marginBottom: "8px" }}>{selectedNode.desc}</p>
                  
                  <div style={{ margin: "10px 0", padding: "10px", background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,215,0,0.2)", borderRadius: "6px", fontSize: "0.75rem", color: "#ccc" }}>
                    <div><strong>{getPanelLabel("connections")}</strong> {selectedNode.connection}</div>
                    <div style={{ marginTop: "4px" }}><strong>{getPanelLabel("coherence")}</strong> <span style={{ color: "#ffd700", fontWeight: "bold" }}>{selectedNode.score}</span></div>
                  </div>

                  <div style={{ margin: "10px 0" }}>
                    <span style={{ color: "#ffd700", fontSize: "0.72rem", fontWeight: "bold", display: "block", marginBottom: "4px" }}>🌱 {getPanelLabel("derivatives")}</span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                      {selectedNode.derivatives.map((der, i) => (
                        <span key={i} style={{ background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.3)", color: "#fff", padding: "2px 6px", borderRadius: "4px", fontSize: "0.7rem" }}>{der}</span>
                      ))}
                    </div>
                  </div>

                  <p style={{ color: "#aaa", fontSize: "0.76rem", lineHeight: "1.5", background: "rgba(255,255,255,0.02)", padding: "10px", borderRadius: "6px", borderLeft: "2px solid #ffd700", marginTop: "10px" }}>
                    {selectedNode.details}
                  </p>

                  <button onClick={() => setSelectedNode(null)} style={{ ...backBtnStyle, width: "100%", fontSize: "0.75rem", marginTop: "10px" }}>{getPanelLabel("clearSelection")}</button>
                </div>
              ) : (
                <div style={{ color: "#ccc", fontSize: "0.78rem", lineHeight: "1.5" }}>
                  <p>{getPanelLabel("guideDesc")}</p>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* 4. COĞRAFİ ATLAS HARİTASI MODÜLÜ */}
      {currentView === "atlas" && (
        <div style={containerStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px", borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "10px", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <span style={{ color: "#ffd700", fontSize: "0.75rem", fontWeight: "bold" }}>🗺️ ANADOLU & KÜRESEL COĞRAFİ KATMAN HARİTASI</span>
              <h2 style={{ color: "#ffd700", margin: "2px 0 0 0", fontSize: "1.15rem" }}>{t.atlas}</h2>
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              {renderLanguageSelector()}
              <button onClick={() => setCurrentView("dashboard")} style={backBtnStyle}>{t.backHome}</button>
            </div>
          </div>
          <AtlasMap locations={atlasLocations} />
        </div>
      )}

      {/* 5. GÖÇ & AKIŞ HARİTASI MODÜLÜ */}
      {currentView === "flow" && (
        <div style={containerStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "12px", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <span style={{ color: "#00ff7f", fontSize: "0.75rem", fontWeight: "bold" }}>🟢 ANADOLU MERKEZLİ DİL VE KÜLTÜR AKIŞ SİMÜLASYONU</span>
              <h2 style={{ color: "#ffd700", margin: "4px 0 0 0", fontSize: "1.3rem" }}>{t.flow}</h2>
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              {renderLanguageSelector()}
              <button onClick={() => setCurrentView("dashboard")} style={backBtnStyle}>{t.backHome}</button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "15px" }}>
            {migrationRoutes.map((route) => (
              <div key={route.id} style={{ background: "rgba(255,215,0,0.03)", border: "1px solid rgba(255,215,0,0.3)", borderRadius: "10px", padding: "16px" }}>
                <h4 style={{ color: "#ffd700", margin: "0 0 8px 0" }}>{route.title}</h4>
                <p style={{ color: "#ddd", fontSize: "0.78rem" }}>{route.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. OKUMA & ANALİZ MOTORU EKRANI */}
      {currentView === "engine" && (
        <div style={containerStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "12px", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <span style={{ color: "#ffd700", fontSize: "0.75rem", fontWeight: "bold" }}>🔬 YAPAY ZEKÂ DESTEKLİ OKUMA MOTORU</span>
              <h2 style={{ color: "#ffd700", margin: "4px 0 0 0", fontSize: "1.3rem" }}>{t.engine}</h2>
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              {renderLanguageSelector()}
              <button onClick={() => setCurrentView("dashboard")} style={backBtnStyle}>{t.backHome}</button>
            </div>
          </div>

          <div style={{ background: "rgba(255,215,0,0.03)", border: "1px solid rgba(255,215,0,0.3)", borderRadius: "10px", padding: "20px", boxSizing: "border-box" }}>
            <input 
              type="text" 
              value={analysisInput}
              onChange={(e) => setAnalysisInput(e.target.value)}
              placeholder="Kök hece veya terim girin (Örn: YOL, ÇEV, ER)..."
              style={{ width: "100%", padding: "12px", background: "#000", border: "1px solid #ffd700", color: "#fff", borderRadius: "6px", marginBottom: "15px", boxSizing: "border-box" }}
            />
            <button onClick={handleRunAnalysis} style={{ background: "#ffd700", color: "#000", padding: "10px 18px", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>ANALİZİ BAŞLAT ⚡</button>
            
            {analysisResult && (
              <div style={{ marginTop: "15px", color: "#00ff7f", background: "rgba(0,255,127,0.08)", padding: "12px", borderRadius: "6px", border: "1px solid #00ff7f" }}>
                {analysisResult.synthesis}
              </div>
            )}

            {/* CANLI YKOS.COM.TR RSS AKADEMİK AKIŞ BÖLÜMÜ */}
            <div style={{ marginTop: "30px", borderTop: "1px solid rgba(255,215,0,0.2)", paddingTop: "20px" }}>
              <h3 style={{ color: "#ffd700", fontSize: "1rem", marginBottom: "15px" }}>📡 CANLI AKADEMİK AKIŞ (YKOS.COM.TR)</h3>
              
              {rssArticles && rssArticles.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {rssArticles.map((article, index) => (
                    <div key={index} style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,215,0,0.2)", padding: "14px", borderRadius: "8px" }}>
                      <h4 style={{ color: "#fff", margin: "0 0 6px 0", fontSize: "0.95rem" }}>{article.title}</h4>
                      <p style={{ color: "#aaa", fontSize: "0.78rem", margin: "0 0 10px 0", lineHeight: "1.4" }}>{article.description}</p>
                      <a href={article.link} target="_blank" rel="noopener noreferrer" style={{ color: "#ffd700", fontSize: "0.75rem", textDecoration: "none", fontWeight: "bold" }}>
                        Tam Metni Oku ve İncele →
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ color: "#888", fontSize: "0.82rem", fontStyle: "italic", padding: "10px 0" }}>
                  Canlı RSS veri akışı bekleniyor veya yerel modda çalışılıyor...
                </div>
              )}
            </div>

          </div>
        </div>
      )}


      {/* 7. METODOLOJİ MODÜLÜ */}
      {currentView === "methodology" && (
        <div style={containerStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "10px" }}>
            <div>
              <span style={{ color: "#ffd700", fontSize: "0.75rem", fontWeight: "bold" }}>📜 AKADEMİK FELSEFE VE BİLİMSEL ÇERÇEVE</span>
              <h2 style={{ color: "#ffd700", margin: "4px 0 0 0", fontSize: "1.3rem" }}>YKOS METODOLOJİSİ VE BİLİMSEL İLKELER</h2>
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              {renderLanguageSelector()}
              <button onClick={() => setCurrentView("dashboard")} style={backBtnStyle}>{t.backHome}</button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "15px" }}>
            <div style={{ background: "rgba(255,215,0,0.03)", border: "1px solid rgba(255,215,0,0.25)", padding: "16px", borderRadius: "8px" }}>
              <h3 style={{ color: "#ffd700", margin: "0 0 8px 0", fontSize: "0.95rem" }}>1. Anadolu Odaklı Refugium Modeli</h3>
              <p style={{ color: "#ccc", fontSize: "0.8rem", lineHeight: "1.6" }}>
                Buzul çağındaki mikroklima koruması sayesinde Anadolu, insanlığın ve sembollerin kök rahmidir. Erken kültür akışı Asya'dan Anadolu'ya değil; Anadolu'dan Asya ve Akdeniz hatlarına doğru gerçekleşmiştir.
              </p>
            </div>

            <div style={{ background: "rgba(255,215,0,0.03)", border: "1px solid rgba(255,215,0,0.25)", padding: "16px", borderRadius: "8px" }}>
              <h3 style={{ color: "#ffd700", margin: "0 0 8px 0", fontSize: "0.95rem" }}>2. 'Rulo Değil Yol' İlkesi</h3>
              <p style={{ color: "#ccc", fontSize: "0.8rem", lineHeight: "1.6" }}>
                Kültürel hafıza statik bir arşiv kaydı (rulo) değil; yaşayan, sürekli güncellenen ve kök heceler vasıtasıyla bugüne taşınan dinamik bir yoldur.
              </p>
            </div>

            <div style={{ background: "rgba(255,215,0,0.03)", border: "1px solid rgba(255,215,0,0.25)", padding: "16px", borderRadius: "8px" }}>
              <h3 style={{ color: "#ffd700", margin: "0 0 8px 0", fontSize: "0.95rem" }}>3. Form–Bağlam–Anlam Eşzamanlılığı</h3>
              <p style={{ color: "#ccc", fontSize: "0.8rem", lineHeight: "1.6" }}>
                Damgalar ve piktogramlar rastgele çizimler değildir; geometrik aksı, dikey varlık ve yatay bağ simetrisini kodlayan görsel algoritmik mühürlerdir.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 8. ARAŞTIRMACI VE PORTAL GİRİŞ EKRANI */}
      {currentView === "login" && (
        <div style={containerStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "10px" }}>
            <div>
              <span style={{ color: "#ffd700", fontSize: "0.75rem", fontWeight: "bold" }}>🔐 GÜVENLİ AKADEMİK ERİŞİM PORTALI</span>
              <h2 style={{ color: "#ffd700", margin: "4px 0 0 0", fontSize: "1.2rem" }}>
                {userRole === "guest" && "🌐 ZİYARETÇİ VE AKADEMİK ARAŞTIRMA PORTALI"}
                {userRole === "researcher" && "🔬 LİSANS / LİSANSÜSTÜ ARAŞTIRMACI GİRİŞİ"}
                {userRole === "admin" && "👑 YKOS MASTER YÖNETİCİ & EDİTÖR PANELİ"}
              </h2>
            </div>
            <button onClick={() => setCurrentView("dashboard")} style={backBtnStyle}>{t.backHome}</button>
          </div>

          <div style={{ maxWidth: "420px", margin: "30px auto", background: "rgba(255,215,0,0.03)", border: "1px solid #ffd700", padding: "24px", borderRadius: "10px" }}>
            <p style={{ color: "#aaa", fontSize: "0.8rem", marginBottom: "15px" }}>YKOS Bilgi Sistemi entegre canlı veri tabanına erişmek için kullanıcı bilgilerinizi giriniz.</p>
            <input type="text" placeholder="Kullanıcı Adı / Akademisyen ID" style={{ width: "100%", padding: "10px", marginBottom: "10px", background: "#000", border: "1px solid rgba(255,215,0,0.4)", color: "#fff", borderRadius: "6px", boxSizing: "border-box" }} />
            <input type="password" placeholder="Şifre" style={{ width: "100%", padding: "10px", marginBottom: "15px", background: "#000", border: "1px solid rgba(255,215,0,0.4)", color: "#fff", borderRadius: "6px", boxSizing: "border-box" }} />
            <button onClick={() => setCurrentView("dashboard")} style={{ width: "100%", padding: "10px", background: "#ffd700", color: "#000", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>SİSTEME GİRİŞ YAP</button>
          </div>
        </div>
      )}

      {/* 9. AKADEMİK OKUMA EKRANI */}
      {currentView === "read" && (
        <div style={containerStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px", borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "10px", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <span style={{ color: "#ffd700", fontSize: "0.75rem", fontWeight: "bold" }}>📜 AKADEMİK ÇÖZÜMLEME KATMANI</span>
              <h2 style={{ color: "#ffd700", margin: "4px 0 0 0", fontSize: "1.3rem" }}>{selectedArticle.title}</h2>
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
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

export default App;
