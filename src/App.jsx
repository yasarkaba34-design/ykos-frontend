import React, { useState, useEffect } from "react";
import YKOSDashboard from "./layouts/YKOSDashboard";
import { defaultArchiveArticles, loadArchiveData } from "./data/ykosDataService";
import { translations } from "./data/i18n";
import AtlasMap from "./mega/AtlasMap";
import AuthMenu from './components/AuthMenu';
import AdminPanel from "./layouts/AdminPanel";
import AcikVeriPortali from "./pages/AcikVeriPortali";
import BubbleMatrix from "./mega/BubbleMatrix.jsx";
import OpsCenter from "./layouts/OpsCenter";

export function App() {
  const [currentView, setCurrentView] = useState("dashboard"); 
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [userRole, setUserRole] = useState("guest");
  
  const [selectedArticleId, setSelectedArticleId] = useState(1);
  const [selectedArticleData, setSelectedArticleData] = useState(null);
  
  const [selectedNode, setSelectedNode] = useState(null);
  const [archiveArticles, setArchiveArticles] = useState(defaultArchiveArticles);
  const [rssArticles, setRssArticles] = useState([]);

  const [currentLang, setCurrentLang] = useState("TR");
  const [langOpen, setLangOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [analysisInput, setAnalysisInput] = useState("YOL - ER - ÇEV - BA - KÖK");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [selectedMasterLayer, setSelectedMasterLayer] = useState(null);

  const t = translations[currentLang] || translations.TR;
  const activeArticles = t.articles || archiveArticles;

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
    { id: "FLOW-01", title: "Anadolu Refugium ➔ Doğu Akdeniz & Sümer Hatları", description: "Buzulların erimesi ve Karadeniz tatlı su gölünün tuzlu denizle birleşmesi sonrası Anadolu'dan güneye inen eklemeli dil kök aktarımı.", coherence: "%99.6" },
    { id: "FLOW-02", title: "Anadolu ➔ Kafkasya, Altay & Orhun Havzaları", description: "Anadolu'dan Asya'ya büyük dil ve damga akışı. GÖK, ÇİK ve İL kök hecelerinin bozkırlara taşınması.", coherence: "%99.8" },
    { id: "FLOW-03", title: "Anadolu ➔ Lemnos & Etrüsk (Etruria / İtalya)", description: "Lemnos steli ve Etrüsk yazıtlarındaki YOL ve EL köklerinin Akdeniz deniz rotası vasıtasıyla yayılımı.", coherence: "%98.9" },
    { id: "FLOW-04", title: "Avrasya ➔ Bering & Amerika (Maya / Olmek Hatları)", description: "Trans-Bering hattını izleyen kök-piktogram ve kaya resimlerinin Amerika yerli dillerindeki fonetik izleri.", coherence: "%98.5" }
  ];

  const atlasLocations = [
    { id: "ANADOLU-01", name: "Çatalhöyük & Konya Havzası", region: "Anadolu Refugium Katmanı", details: "M.Ö. 7400 Neolitik dairesel mühürler, ÇEV ve BA kök hece mülkiyet matrisinin merkez üssüdür." },
    { id: "ANADOLU-02", name: "Göbeklitepe & Şanlıurfa", region: "Epipaleolitik Grafik Algoritma", details: "M.Ö. 9600 T-sütunları üzerindeki H piktogramı dikey varlık ve yatay bağ aksını kodlar." },
    { id: "ANADOLU-03", name: "Hattuşa & Çorum Havzası", region: "Hatti - Hitit Ön-Türkçe Kök Katmanı", details: "Hatti yazıtları ve mühürleri, YKOS KUR, DA ve ÇEV hece türetimleri ile %99.4 simetri gösterir." },
    { id: "AVRASYA-01", name: "Saymalıtaş & Altay Rotaları", region: "Kaya Resimleri ve Petroglif Hatları", details: "Anadolu çıkışlı göç dalgalarının Avrasya bozkırlarındaki GÖK ve ÇİK yükselim grafik izleri." },
    { id: "AKDENIZ-01", name: "Lemnos & Etruria (İtalya)", region: "Akdeniz & Etrüsk Alfabetik Aksı", details: "Lemnos mezar steli ve Etrüsk yazıtlarındaki YOL kökü vasıtasıyla kanıtlanan Akdeniz dil akışı." }
  ];

  const matrixNodes = [
    { id: "YKOS 1000", x: 350, y: 180, r: 42, color: "#ffd700", label: "YKOS 1000", anim: "float1", desc: "Ana Bilgi Entegrasyon Matrisi", connection: "YKOS 100, YKOS 200, YKOS 300", score: "%100", derivatives: ["Master-Veri", "Yapay-Zekâ"], details: "Sistemin tüm katmanlarını bağlayan yapay zekâ destekli üst entegrasjon matrisi." },
    { id: "YKOS 100", x: 420, y: 310, r: 36, color: "#1e90ff", label: "YKOS 100", anim: "float1", desc: "Temel Kök Hece Matrisi Katmanı", connection: "YOL, BİR, ÇEV", score: "%99.9", derivatives: ["Kök-en", "Yol-cu", "Çev-re"], details: "Anadolu merkezli 100 birincil hece vektörünün algoritmik veritabanı." },
    { id: "YKOS 200", x: 380, y: 410, r: 35, color: "#00ff7f", label: "YKOS 200", anim: "float2", desc: "Bölgesel ve Derin Arkeolojik Katman", connection: "Göbeklitepe, ROL, Sümer", score: "%99.6", derivatives: ["Rol-daş", "Er-en", "Süm-er"], details: "Doğu Akdeniz ve Mezopotamya petroglif katmanları." },
    { id: "YKOS 300", x: 260, y: 370, r: 36, color: "#ff8c00", label: "YKOS 300", anim: "float3", desc: "Global Atlas Katmanı", connection: "ÖN ASYA ATLASI, AMERİKA ATLASI", score: "%99.4", derivatives: ["At-las", "Av-rasya"], details: "Avrasya ve Amerika kıtaları arası kültür ve damga aksı." },
    { id: "ANADOLU ATLASI", x: 420, y: 230, r: 24, color: "#ffd700", label: "ANADOLU ATLASI", anim: "float1", desc: "Anadolu Kadim Kültür Havzası", connection: "YKOS 100", score: "%100", derivatives: ["An-adolu", "Çat-al"], details: "Merkez üssü Anadolu olan birincil simetri haritası." },
    { id: "ÖN ASYA ATLASI", x: 150, y: 320, r: 22, color: "#ffd700", label: "ÖN ASYA ATLASI", anim: "float2", desc: "Ön Asya Hatları", connection: "YKOS 300", score: "%99.1", derivatives: ["As-ya", "Kaf-kas"], details: "Mezopotamya ve Kafkasya geçiş yolları." },
    { id: "AMERİKA ATLASI", x: 140, y: 410, r: 22, color: "#ff8c00", label: "AMERİKA ATLASI", anim: "float3", desc: "Trans-Bering Bağlantıları", connection: "YKOS 300", score: "%98.5", derivatives: ["May-a", "In-ka"], details: "Amerika kıtasındaki damga paralellikleri." },
    { id: "AVRUPA ATLASI", x: 250, y: 500, r: 22, color: "#ba55d3", label: "AVRUPA ATLASI", anim: "float1", desc: "Etrüsk ve Akdeniz Rotaları", connection: "AYLUİL", score: "%98.9", derivatives: ["Et-rüsk", "Lem-nos"], details: "Akdeniz ve Etrüsk yazıtları dil akışı." },
    { id: "Göbeklitepe", x: 480, y: 430, r: 22, color: "#00ff7f", label: "Göbeklitepe", anim: "float2", desc: "T-Sütun Sembolizmleri", connection: "YKOS 200", score: "%99.7", derivatives: ["T-Sütun", "H-Piktogramı"], details: "İkilik ve göksel bağ sembolizminin deşifresi." },
    { id: "Sümer", x: 470, y: 360, r: 22, color: "#00ff7f", label: "Sümer", anim: "float3", desc: "Mezopotamya Çivi Yazısı", connection: "YKOS 200", score: "%99.2", derivatives: ["Süm-er", "Kiv-i"], details: "Sümerce ve Ön-Türkçe ortak fonetik kökler." },
    { id: "BİR", x: 500, y: 270, r: 24, color: "#ffd700", label: "BİR", anim: "float1", desc: "Teklik ve Başlangıç", connection: "YKOS 100, YOL", score: "%99.8", derivatives: ["Bir-lik"], details: "İlk varlık ve birlik aksı." },
    { id: "YOL", x: 550, y: 330, r: 24, color: "#ffd700", label: "YOL", anim: "float2", desc: "Aks ve Akış", connection: "BİR, O", score: "%99.8", derivatives: ["Yol-cu"], details: "Rulo değil yol mantığının merkez hecesi." },
    { id: "O", x: 600, y: 260, r: 25, color: "#ffd700", label: "O", anim: "float3", desc: "Evrensel Öz", connection: "YOL, OL, KÖK", score: "%99.5", derivatives: ["O-na"], details: "Merkez ve yön gösterici zamir kökü." },
    { id: "OL", x: 650, y: 210, r: 22, color: "#ffd700", label: "OL", anim: "float1", desc: "Oluş ve Varlık", connection: "O", score: "%99.3", derivatives: ["Ol-gu"], details: "Varlığa geliş eylemi." },
    { id: "KÖK", x: 580, y: 170, r: 24, color: "#ffd700", label: "KÖK", anim: "float2", desc: "Kaynak", connection: "O, VAN, ÇİK, AL", score: "%99.9", derivatives: ["Kök-en"], details: "Ana kök katmanı." },
    { id: "VAN", x: 620, y: 110, r: 20, color: "#ffd700", label: "VAN", anim: "float3", desc: "Su ve Havza", connection: "KÖK", score: "%98.7", derivatives: ["Van-gölü"], details: "Doğu Anadolu havza kurgusu." },
    { id: "ÇİK", x: 530, y: 50, r: 20, color: "#1e90ff", label: "ÇİK", anim: "float1", desc: "Çıkış Vektörü", connection: "GÖK", score: "%98.5", derivatives: ["Çık-ış"], details: "Yükselim hareketi." },
    { id: "GÖK", x: 560, y: 90, r: 22, color: "#00ff7f", label: "GÖK", anim: "float2", desc: "Kozmoz", connection: "ÇİK, AL", score: "%99.2", derivatives: ["Gök-sel"], details: "Göksel boyut katmanı." },
    { id: "AL", x: 510, y: 130, r: 20, color: "#1e90ff", label: "AL", anim: "float3", desc: "Alma ve Yüksek", connection: "GÖK, KÖK", score: "%98.9", derivatives: ["Al-an"], details: "Kırmızı ve idrak kökü." },
    { id: "KUR", x: 420, y: 140, r: 24, color: "#ff8c00", label: "KUR", anim: "float1", desc: "Kuruluş ve Yapı", connection: "YKOS 1000, DA", score: "%99.1", derivatives: ["Kur-um"], details: "İnşa ve mimari kök hece." },
    { id: "DA", x: 470, y: 190, r: 22, color: "#ff8c00", label: "DA", anim: "float2", desc: "Dağ ve Yükseklik", connection: "KUR", score: "%98.8", derivatives: ["Da-ğ"], details: "Yeryüzü şekilleri ve kalıcılık." },
    { id: "ÇEV", x: 330, y: 250, r: 22, color: "#1e90ff", label: "ÇEV", anim: "float3", desc: "Çevre ve Daire", connection: "YKOS 100, DİŞ", score: "%99.4", derivatives: ["Çev-re"], details: "Dairesel kuşatma alanı." },
    { id: "DİŞ", x: 260, y: 220, r: 20, color: "#1e90ff", label: "DİŞ", anim: "float1", desc: "Dış Sınır", connection: "ÇEV, YÜZ", score: "%98.4", derivatives: ["Dış-arı"], details: "Dış sınır ve biçim." },
    { id: "YÜZ", x: 190, y: 210, r: 20, color: "#1e90ff", label: "YÜZ", anim: "float2", desc: "Yüzey ve Çehre", connection: "DİŞ, ULUN", score: "%98.6", derivatives: ["Yüz-ey"], details: "Ön görünüm ve alan." },
    { id: "ULUN", x: 120, y: 200, r: 20, color: "#1e90ff", label: "ULUN", anim: "float3", desc: "Ulu ve Yüce", connection: "YÜZ", score: "%98.9", derivatives: ["Ulu-s"], details: "Büyüklük ve hiyerarşi." },
    { id: "ROL", x: 360, y: 490, r: 22, color: "#ba55d3", label: "ROL", anim: "float1", desc: "İşlev ve Görev", connection: "YKOS 200", score: "%98.7", derivatives: ["Rol-daş"], details: "Toplumsal işlev." },
    { id: "AYLUİL", x: 310, y: 510, r: 22, color: "#ba55d3", label: "AYLUİL", anim: "float2", desc: "Akdeniz Ekeni", connection: "AVRUPA ATLASI", score: "%98.5", derivatives: ["Ay-lu"], details: "Akdeniz ada dilleri." }
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await loadArchiveData();
        if (data) localStorage.setItem('ykos_archive_data', JSON.stringify(data));
      } catch (error) { console.error("Arşiv verisi yüklenirken hata:", error); }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchLiveNews() {
      try {
        const rssUrl = "https://www.ykos.com.tr/rss"; 
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`);
        if (response.ok) {
          const data = await response.json();
          if (data.items && data.items.length > 0) {
            const formattedArticles = data.items.map(item => ({
              title: item.title, url: item.link,
              summary: item.description ? item.description.replace(/(<([^>]+)>)/ig, "").substring(0, 110) + "..." : ""
            }));
            setRssArticles(formattedArticles);
          }
        }
      } catch (error) {
        const scrapedData = localStorage.getItem('ykos_scraped_articles');
        if (scrapedData) setRssArticles(JSON.parse(scrapedData)); 
      }
    }
    fetchLiveNews();
  }, []);

  const handleNavigateLogin = (role) => { 
    setUserRole(role); 
    if (role === "guest") setCurrentView("admin-panel"); 
    else setCurrentView("login"); 
  };
  
  const handleNavigateRead = (id) => { 
    setSelectedArticleId(id); 
    let found = activeArticles.find(a => a.id === id);
    if (!found) {
      const savedRecords = localStorage.getItem("ykos_admin_records");
      if (savedRecords) {
        try { found = JSON.parse(savedRecords).find(a => a.id === id); } catch(e) {}
      }
    }
    setSelectedArticleData(found || activeArticles[0]);
    setCurrentView("read"); 
  };

  const handleNodeClick = (node) => { 
    setSelectedNode(node); 
  };

  const containerStyle = { maxWidth: "1220px", margin: "10px auto", padding: "15px", backgroundColor: "#050811", border: "1px solid #ffd700", borderRadius: "12px", boxShadow: "0 8px 32px rgba(0,0,0,0.8)", color: "#fff", boxSizing: "border-box" };

  return (
    <div className="app-main-wrapper" style={{ backgroundColor: "#050811", minHeight: "100vh", color: "#ffffff", paddingBottom: "30px" }}>

      {/* SADECE ANA SAYFA DIŞINDA GÖRÜNEN GERİ DÖNÜŞ BUTONU */}
      {currentView !== "dashboard" && (
        <div style={{ maxWidth: "1220px", margin: "0 auto", padding: "15px 15px 0", textAlign: "right" }}>
          <button onClick={() => setCurrentView("dashboard")} style={{ padding: "8px 14px", background: "transparent", border: "1px solid #ffd700", color: "#ffd700", fontWeight: "bold", borderRadius: "6px", cursor: "pointer", fontSize: "0.78rem" }}>🏠 Ana Sayfa</button>
        </div>
      )}

      {/* ANA SAYFA (DASHBOARD) */}
      {currentView === "dashboard" && (
        <YKOSDashboard 
          archiveArticles={archiveArticles} rssArticles={rssArticles} currentLang={currentLang} setCurrentLang={setCurrentLang}
          onVisualize={() => setCurrentView("visualize")} onNavigateRead={handleNavigateRead}
          onNavigateLogin={handleNavigateLogin} onNavigateAtlas={() => setCurrentView("atlas")}
          onNavigateEngine={() => setCurrentView("engine")} onNavigateFlow={() => setCurrentView("flow")}
          onNavigateYkos1000={() => setCurrentView("ykos1000")} onNavigateMethod={() => setCurrentView("methodology")}
          onGoHome={() => setCurrentView("dashboard")}
          onNavigateAcikVeri={() => setCurrentView("acikveri")} 
          onNavigateOpsCenter={() => setCurrentView("ops-center")}
          onNavigateVideo={() => setCurrentView("video")}
          onNavigateLiterature={() => setCurrentView("literature")}
        />
      )}

      {/* OPERASYON MERKEZİ */}
      {currentView === "ops-center" && (
        <div style={containerStyle}>
          <OpsCenter onGoHome={() => setCurrentView("dashboard")} />
        </div>
      )}

      {/* 3. MATRİS GÖRSELLEŞTİRME (BALONCUK AĞI) */}
      {currentView === "visualize" && (
        <div style={containerStyle}>
          <BubbleMatrix nodes={matrixNodes} onNodeClick={handleNodeClick} />
        </div>
      )}

      {/* VİDEO GÖRÜNÜMÜ */}
      {currentView === "video" && (
        <div style={containerStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ color: "#ffd700", margin: 0 }}>🎥 YKOS Video Arşivi</h2>
            <button onClick={() => setCurrentView("dashboard")} style={{ padding: "6px 12px", background: "#1f2028", color: "#ffd700", border: "1px solid #ffd700", borderRadius: "6px", cursor: "pointer" }}>Geri Dön</button>
          </div>
          <p style={{ color: "#9ca3af" }}>Anadolu petroglifleri, kök-hece analizleri ve YKOS metodolojisi video anlatımları yakında burada yer alacaktır.</p>
        </div>
      )}

      {/* EDEBİYAT GÖRÜNÜMÜ */}
      {currentView === "literature" && (
        <div style={containerStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ color: "#ffd700", margin: 0 }}>📚 Edebiyat ve Şiir Arşivi</h2>
            <button onClick={() => setCurrentView("dashboard")} style={{ padding: "6px 12px", background: "#1f2028", color: "#ffd700", border: "1px solid #ffd700", borderRadius: "6px", cursor: "pointer" }}>Geri Dön</button>
          </div>
          <p style={{ color: "#9ca3af" }}>Anadolu mirası, doğa, sevgi ve insan değerlerini irdeleyen özgün şiir ve denemeler burada listelenmektedir.</p>
        </div>
      )}

      {/* DİĞER MODÜLLER */}
      {currentView === "acikveri" && <div style={containerStyle}><AcikVeriPortali /></div>}
      {currentView === "admin-panel" && <div style={containerStyle}><AdminPanel onLogout={() => setCurrentView("dashboard")} userRole={userRole} /></div>}
      {currentView === "login" && (
        <div style={containerStyle}>
          <div style={{ maxWidth: "420px", margin: "30px auto", background: "rgba(255,215,0,0.03)", border: "1px solid #ffd700", padding: "24px", borderRadius: "10px" }}>
            <h2 style={{ color: "#ffd700", textAlign: "center", fontSize: "1.1rem" }}>YÖNETİCİ GİRİŞİ</h2>
            {loginError && <div style={{ color: "#ff4d4d", marginBottom: "10px", fontSize: "0.85rem" }}>{loginError}</div>}
            <input type="text" placeholder="Yönetici ID" value={loginId} onChange={(e) => setLoginId(e.target.value)} style={{ width: "100%", padding: "10px", marginBottom: "10px", background: "#000", border: "1px solid #ffd700", color: "#fff", borderRadius: "6px", boxSizing: "border-box" }} />
            <input type="password" placeholder="Şifre" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} style={{ width: "100%", padding: "10px", marginBottom: "15px", background: "#000", border: "1px solid #ffd700", color: "#fff", borderRadius: "6px", boxSizing: "border-box" }} />
            <button onClick={() => {
              if (loginId === "admin" && loginPassword === "ykos2026") {
                setLoginError(""); setCurrentView("admin-panel");
              } else { setLoginError("Hatalı ID veya Şifre!"); }
            }} style={{ width: "100%", padding: "12px", background: "#ffd700", color: "#000", border: "none", borderRadius: "6px", fontWeight: "900", cursor: "pointer" }}>GİRİŞ YAP</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
