// FILE: src/mega/YKOSAnadoluEvrenselPano.jsx
import React, { useState, useEffect } from "react";
import { startCosmicUniverse } from "../engine/CosmicUniverseEngine.js";

export default function YKOSAnadoluEvrenselPano() {
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeMatrix, setActiveMatrix] = useState(null);
  const [selectedHece, setSelectedHece] = useState("OK");
  const [currentLang, setCurrentLang] = useState("TR");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [catalogFilter, setCatalogFilter] = useState("ALL");
  const [selectedItemModal, setSelectedItemModal] = useState(null);

  // 3. Modül: Analiz Motoru
  const [selectedAnalyzeItem, setSelectedAnalyzeItem] = useState("OK_DAMGA");
  const [activeAnalysisLayer, setActiveAnalysisLayer] = useState("GEOMETRY");

  // 4. Modül: Coğrafi Akış Haritası
  const [selectedRoute, setSelectedRoute] = useState("ANATOLIA_ASIA");

  // Sağ Panel Canlı Çözümleme ve Arşiv Seçimi
  const [selectedSolution, setSelectedSolution] = useState("YAZIT_01");

  useEffect(() => {
    let mounted = true;
    let stopFn = null;

    try {
      stopFn = startCosmicUniverse((packet) => {
        if (mounted) setData(packet);
      });
    } catch (err) {
      console.error(err);
    }

    return () => {
      mounted = false;
      if (typeof stopFn === "function") stopFn();
    };
  }, []);

  // 10 DİLLİ SÖZLÜK MATRİSİ
  const i18n = {
    TR: {
      flag: "🇹🇷", label: "Türkçe",
      title: "YKOS BİLGİ SİSTEMİ", subtitle: "Disiplinler Arası Algoritmik Kültür ve Dil Veri Tabanı",
      searchPlaceholder: "🔍 Damga, kök hece, ülke, il veya kadim merkez ara...",
      systemStatus: "Sistem Durumu", statusActive: "AKTİF", matricesTitle: "MATRİSLER VE KATMANLAR",
      rightPanelTitle: "⚡ YKOS ÇÖZÜMLERİ VE İNDEKSLER",
      engineText: "Canlı Motor Bağlantısı", backToHome: "✖ Ana Sayfaya Dön", moduleTitle: "YKOS MODÜLÜ",
      searchResultsTitle: "🔍 Canlı Arama ve İndeks Sonuçları",
      noResults: "Aranan kriterlere uygun kayıt bulunamadı.",
      nav: { kurumsal: "KURUMSAL", metodoloji: "YKOS METODOLOJİSİ", kokHece: "KÖK HECE MATRİSİ", damgaAtlasi: "DAMGA ATLASI", analizEngine: "OKUMA & ANALİZ MOTORU", flowMap: "GÖÇ & AKIŞ HARİTASI", kulliyat: "KÜLLİYAT & YAYINLAR", dijitalArsiv: "DİJİTAL ARŞİV" },
      stats: ["Ülkeler", "Araştırmalar", "Damgalar", "Petroglifler", "Yazıtlar", "Kaynaklar", "Görseller", "Atlaslar"],
      rightButtons: ["YAZIT ÇÖZÜMLEMELERİ", "KÜLLİYAT İNDEKSİ", "MOPHO-SENTAKS MATRİSİ"],
      labels: { phonetic: "Fonetik Kök", semantic: "Anlamsal Katman", anatolian: "Anadolu Odak Noktası", asian: "Asya Akış Hattı", coherence: "Matris Uyum (Coherence)", rootPrefix: "Kök", category: "Kategori", location: "Kadim Merkez" },
      catalog: { all: "Tümü", stamps: "Damgalar", petroglyphs: "Petroglifler", inspect: "İncele" },
      analysis: {
        title: "YKOS Algoritmik Okuma ve Çözümleme Motoru",
        geometryTab: "📐 Geometrik Vektör Katmanı", directionTab: "🏹 Yön ve Vektör Akışı", phoneticTab: "𐰸 Fonetik Eşleşme Matrisi", confidence: "Algoritma Okuma Doğruluğu"
      },
      map: {
        title: "Anadolu Odaklı Kadim Göç ve Sembol Akış Haritası", route1: "Anadolu ➔ Asya Ana Akış Hattı", route2: "Anadolu ➔ Akdeniz & Avrupa Hattı",
        origin: "Çıkış / Odak Merkezi", destination: "Varış / Yayılım Havzası", stampsTransferred: "Taşınan Damga/Kök Sayısı"
      },
      heceDetails: {
        OK: { meaning: "Yön, Yükseliş, Bağlantı, Akış, Göç Hattı", anadolu: "Göbeklitepe / Çatalhöyük", asya: "Orhun / Yenisey Hobi Hattı" },
        AT: { meaning: "Hareket, İlerleme, Sıçrama, Birincil Er", anadolu: "Alacahöyük / Kültepe", asya: "Altay-Sayan Kültür Havzası" },
        ER: { meaning: "Varlık, Kimlik, Güç, Erginleşme", anadolu: "Hattuşa / Gordion", asya: "Issık Göl / Balasagun" },
        EL: { meaning: "Topluluk, Birlik, El/İl Yönetim Yapısı", anadolu: "Yazılıkaya / Karkamış", asya: "Talaz / Ötüken Havzası" }
      }
    },
    EN: {
      flag: "🇬🇧", label: "English",
      title: "YKOS INFORMATION SYSTEM", subtitle: "Interdisciplinary Algorithmic Culture and Language Database",
      searchPlaceholder: "🔍 Search stamp, root syllable, country, city or ancient center...",
      systemStatus: "System Status", statusActive: "ACTIVE", matricesTitle: "MATRICES AND LAYERS",
      rightPanelTitle: "⚡ YKOS SOLUTIONS & INDEXES",
      engineText: "Live Engine Connection", backToHome: "✖ Back to Home", moduleTitle: "YKOS MODULE",
      searchResultsTitle: "🔍 Live Search & Index Results",
      noResults: "No matching records found.",
      nav: { kurumsal: "CORPORATE", metodoloji: "YKOS METHODOLOGY", kokHece: "ROOT SYLLABLE MATRIX", damgaAtlasi: "STAMP ATLAS", analizEngine: "READING & ANALYSIS ENGINE", flowMap: "MIGRATION & FLOW MAP", kulliyat: "COLLECTED WORKS", dijitalArsiv: "DIGITAL ARCHIVE" },
      stats: ["Countries", "Researches", "Stamps", "Petroglyphs", "Inscriptions", "Sources", "Images", "Atlases"],
      rightButtons: ["INSCRIPTION DECIPHERMENTS", "COLLECTED WORKS INDEX", "MORPHO-SYNTAX MATRIX"],
      labels: { phonetic: "Phonetic Root", semantic: "Semantic Layer", anatolian: "Anatolian Focal Point", asian: "Asian Flow Line", coherence: "Matrix Coherence", rootPrefix: "Root", category: "Category", location: "Ancient Center" },
      catalog: { all: "All", stamps: "Stamps", petroglyphs: "Petroglyphs", inspect: "Inspect" },
      analysis: {
        title: "YKOS Algorithmic Reading and Decipherment Engine",
        geometryTab: "📐 Geometric Vector Layer", directionTab: "🏹 Direction and Vector Flow", phoneticTab: "𐰸 Phonetic Matching Matrix", confidence: "Algorithm Reading Accuracy"
      },
      map: {
        title: "Anatolian-Centered Ancient Migration & Symbol Flow Map", route1: "Anatolia ➔ Asia Main Flow Line", route2: "Anatolia ➔ Mediterranean & Europe Line",
        origin: "Origin / Focal Center", destination: "Destination / Spread Basin", stampsTransferred: "Transferred Stamps/Roots"
      },
      heceDetails: {
        OK: { meaning: "Direction, Ascension, Connection, Flow, Migration Line", anadolu: "Gobeklitepe / Catalhoyuk", asya: "Orkhon / Yenisey Line" },
        AT: { meaning: "Movement, Progress, Leap, Primary Man", anadolu: "Alacahoyuk / Kultepe", asya: "Altai-Sayan Cultural Basin" },
        ER: { meaning: "Existence, Identity, Power, Maturation", anadolu: "Hattusa / Gordion", asya: "Issyk Kul / Balasagun" },
        EL: { meaning: "Community, Unity, State/Tribe Governance Structure", anadolu: "Yazilikaya / Karkemish", asya: "Talas / Otuken Basin" }
      }
    }
  };

  const t = i18n[currentLang] || i18n.EN;

  // SAĞ PANEL: CANLI ÇÖZÜMLEME MATRİSLERİ VE KÜLLİYAT DİZİNİ
  const solutionsData = {
    YAZIT_01: {
      title: "Göbeklitepe T-Sütunu YKOS Çözümlemesi",
      stampsUsed: "OK (𐰸) + BAL (🗿) + AT (𐰡)",
      decipheredText: "Kök Ok-Er Yayılım Aksı / Güneş Yolu",
      method: "YKOS Geometrik & Fonetik Katman Analizi",
      status: "TAMAMLANDI (%99.8)"
    },
    YAZIT_02: {
      title: "Etrüsk Lemnos Yazıtı & Anadolu Bağlantısı",
      stampsUsed: "EL (𐰠) + KIN (⚔️) + ER (𐰼)",
      decipheredText: "El-Er İl Yönetimi ve Birlik Andı",
      method: "Etrüsk - Ön Türkçe Fonetik Matrisi",
      status: "TAMAMLANDI (%98.4)"
    }
  };

  const routesData = {
    ANATOLIA_ASIA: {
      id: "ANATOLIA_ASIA", title: "Anadolu ➔ Kafkasya ➔ Altay / Orhun Göç Akışı",
      origin: "Göbeklitepe / Çatalhöyük / Kültepe (Anadolu)", destination: "Altay-Sayan Havzası, Orhun-Yenisey Vadisi",
      stamps: "OK (🏹), AT (🐎), ER (𐰼), BAL (🗿)", period: "M.Ö. 8000 - M.Ö. 2000",
      description: "Erken dönem kültür ve sembol hareketleri Anadolu odak merkezlerinden doğuya, Asya içlerine ve Altay kültür havzalarına doğru yayılmıştır."
    },
    ANATOLIA_EUROPE: {
      id: "ANATOLIA_EUROPE", title: "Anadolu ➔ Ege ➔ Balkanlar / Akdeniz Akış Hattı",
      origin: "Troya / Alacahöyük / Yazılıkaya (Anadolu)", destination: "Balkan Havzası, Etrüsk / İtalya Kıyıları",
      stamps: "EL (🖐️), KIN (⚔️), KUT (☀️)", period: "M.Ö. 5000 - M.Ö. 1200",
      description: "Anadolu kıyı ve iç merkezlerinden batıya, Akdeniz ve Kuzey İtalya Etrüsk yazı/damga geleneklerine uzanan fonetik akış hattı."
    }
  };

  const analysisData = {
    OK_DAMGA: {
      id: "OK_DAMGA", name: "Göbeklitepe Ok / Yay Damga Vektörü", icon: "🏹", symbolCode: "𐰸",
      geometry: { form: "Dikey Vektör + Yay Açısı (45°)", vectors: "2 Ana Çizgi, 1 Açısal Kesişim", symmetry: "Çift Yönlü Aksiyel Simetri" },
      direction: { flow: "Güneyden Kuzeye Yükselen Akış", vectorType: "Dışa Açılan Yayın Yönlendirici Etkisi", speed: "Yüksek Vektör İvmesi" },
      phonetic: { root: "OK / UK", soundValue: "[oq / uq]", meaning: "Hedefe Yönelim, Birleştirici Çizgi", accuracy: "%99.4" }
    },
    AT_DAMGA: {
      id: "AT_DAMGA", name: "Hakkari Gevaruk Sıçrayan Er Damgası", icon: "🐎", symbolCode: "𐰡",
      geometry: { form: "Çapraz Aksiyel Çizgi + Çift Kavis", vectors: "3 Birincil Vektör Katmanı", symmetry: "Dinamik Asimetri" },
      direction: { flow: "Batıdan Doğuya Sıçrama Aksı", vectorType: "İleriye Doğru Kinetik İvme", speed: "Kinetik Hareket Düzlemi" },
      phonetic: { root: "AT / ET", soundValue: "[at / et]", meaning: "Hızlı İlerleme, Sıçrama, Birincil Er", accuracy: "%98.7" }
    },
    ER_DAMGA: {
      id: "ER_DAMGA", name: "Kağızman Camuşlu Er Duruş Damgası", icon: "🧍", symbolCode: "𐰼",
      geometry: { form: "Merkezi Dikey Kolon + Çapraz Kollar", vectors: "4 Birleşik Çizgi Kesiti", symmetry: "Merkezi Denge" },
      direction: { flow: "Topraktan Göğe Dikey Yükseliş", vectorType: "Sabit Duruş ve Güç Merkezi", speed: "Statik Denge Katmanı" },
      phonetic: { root: "ER / IR", soundValue: "[er / ır]", meaning: "Kimlik, Varlık, Erginleşme", accuracy: "%97.8" }
    }
  };

  const catalogItems = [
    { id: "D01", title: "Yön Gösteren Ok Damgası", type: "DAMGA", kok: "OK", icon: "🏹", code: "𐰸", location: "Göbeklitepe T-Pillar", period: "M.Ö. 9600" },
    { id: "P01", title: "Dağ Keçisi Petroglifi", type: "PETROGLIF", kok: "AT", icon: "🐐", code: "𐰡", location: "Hakkari Gevaruk", period: "M.Ö. 4000" },
    { id: "D02", title: "Karakuş Yükseliş Damgası", type: "DAMGA", kok: "OK", icon: "🦅", code: "𐰸", location: "Çatalhöyük Katman IV", period: "M.Ö. 7000" },
    { id: "P02", title: "Süvari ve Er Betimlemesi", type: "PETROGLIF", kok: "ER", icon: "🐎", code: "𐰼", location: "Kars Kağızman Camuşlu", period: "M.Ö. 3000" },
    { id: "D03", title: "Birlik ve El Yönetim Çizimi", type: "DAMGA", kok: "EL", icon: "🖐️", code: "𐰠", location: "Yazılıkaya Kabartmaları", period: "M.Ö. 1300" },
    { id: "P03", title: "Güneş Kursu ve Işık Yolu", type: "PETROGLIF", kok: "AT", icon: "☀️", code: "𐰡", location: "Alacahöyük Höyük Havzası", period: "M.Ö. 2500" }
  ];

  const kokHeceVerileri = {
    OK: { hece: "OK", damgaGorsel: "🏹 / 𐰸", fonetikKok: "O-K / U-K", coherence: "0.9942" },
    AT: { hece: "AT", damgaGorsel: "🐎 / 𐰡", fonetikKok: "A-T / E-T", coherence: "0.9871" },
    ER: { hece: "ER", damgaGorsel: "🧍 / 𐰼", fonetikKok: "E-R / I-R", coherence: "0.9785" },
    EL: { hece: "EL", damgaGorsel: "🖐️ / 𐰠", fonetikKok: "E-L / I-L", coherence: "0.9810" }
  };

  const rawStats = [
    { id: 1, icon: "🌍", count: "214" },
    { id: 2, icon: "🏛️", count: "248" },
    { id: 3, icon: "🔷", count: "9.870" },
    { id: 4, icon: "🗿", count: "18.420" },
    { id: 5, icon: "📜", count: "4.132" },
    { id: 6, icon: "📚", count: "12.580" },
    { id: 7, icon: "📷", count: "46.900" },
    { id: 8, icon: "🗺️", count: "58" },
  ];

  const navMenuItems = [
    { id: "KURUMSAL", label: t.nav.kurumsal },
    { id: "METODOLOJI", label: t.nav.metodoloji },
    { id: "KOK_HECE", label: t.nav.kokHece },
    { id: "DAMGA_ATLASI", label: t.nav.damgaAtlasi },
    { id: "ANALIZ_ENGINE", label: t.nav.analizEngine },
    { id: "FLOW_MAP", label: t.nav.flowMap },
    { id: "KULLIYAT", label: t.nav.kulliyat },
    { id: "DIJITAL_ARSIV", label: t.nav.dijitalArsiv },
  ];

  const currentHece = kokHeceVerileri[selectedHece];
  const currentHeceDetail = t.heceDetails[selectedHece] || t.heceDetails.OK;
  const currentAnalyze = analysisData[selectedAnalyzeItem];
  const currentRoute = routesData[selectedRoute];

  const isSearching = searchTerm.trim().length > 0;
  const searchResults = catalogItems.filter(item => {
    const query = searchTerm.toLowerCase();
    return item.title.toLowerCase().includes(query) ||
           item.location.toLowerCase().includes(query) ||
           item.kok.toLowerCase().includes(query) ||
           item.type.toLowerCase().includes(query);
  });

  const filteredCatalog = catalogItems.filter(item => {
    const matchesType = catalogFilter === "ALL" || item.type === catalogFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.kok.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div style={{ width: "100%", maxWidth: "1280px", margin: "0 auto", padding: "10px", color: "#fff" }}>
      
      {/* 1. ÜST HEADER */}
      <header style={{
        border: "1.5px solid #d4af37", borderRadius: "10px", padding: "10px 20px 8px 20px",
        backgroundColor: "#0a0a0a", marginBottom: "12px", boxShadow: "0 0 15px rgba(212, 175, 55, 0.1)"
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", marginBottom: "10px" }}>
          <div></div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "3px" }}>
            <div 
              onClick={() => setActiveMatrix(null)}
              style={{
                border: "1.5px solid #d4af37", borderRadius: "50%", padding: "4px 12px", fontSize: "12px",
                fontWeight: "bold", color: "#d4af37", backgroundColor: "#0f0d08", boxShadow: "0 0 10px rgba(212, 175, 55, 0.25)",
                cursor: "pointer", width: "fit-content"
              }}
            >
              YKOS
            </div>

            <div>
              <h1 style={{ margin: 0, fontSize: "20px", color: "#d4af37", letterSpacing: "1.5px", fontWeight: "900", lineHeight: "1.1" }}>
                {t.title}
              </h1>
              <p style={{ margin: "2px 0 0 0", fontSize: "10px", color: "#aaa", letterSpacing: "0.5px" }}>
                {t.subtitle}
              </p>
            </div>
          </div>

          <div style={{ textAlign: "right", position: "relative" }}>
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              style={{
                backgroundColor: "#110f0a", border: "1.5px solid #d4af37", color: "#d4af37", padding: "6px 14px",
                borderRadius: "6px", cursor: "pointer", fontSize: "11px", fontWeight: "bold", letterSpacing: "0.8px",
                display: "inline-flex", alignItems: "center", gap: "6px"
              }}
            >
              <span>{t.flag}</span>
              <span>{currentLang}</span>
              <span style={{ fontSize: "8px" }}>▼</span>
            </button>

            {showLangMenu && (
              <div style={{
                position: "absolute", right: 0, top: "35px", backgroundColor: "#0d0c08",
                border: "1.5px solid #d4af37", borderRadius: "8px", boxShadow: "0 0 15px rgba(0,0,0,0.9)",
                zIndex: 100, display: "grid", gridTemplateColumns: "1fr", minWidth: "150px", maxHeight: "320px", overflowY: "auto"
              }}>
                {Object.keys(i18n).map((langKey) => (
                  <button
                    key={langKey}
                    onClick={() => { setCurrentLang(langKey); setShowLangMenu(false); }}
                    style={{
                      padding: "8px 14px", background: currentLang === langKey ? "#2a220d" : "transparent",
                      border: "none", borderBottom: "1px solid #222", color: currentLang === langKey ? "#d4af37" : "#ccc",
                      cursor: "pointer", textAlign: "left", fontSize: "11px", fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px"
                    }}
                  >
                    <span>{i18n[langKey].flag}</span>
                    <span>{i18n[langKey].label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <nav style={{ display: "flex", justifyContent: "center", gap: "6px", borderTop: "1px solid #332a15", paddingTop: "8px" }}>
          {navMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMatrix(item.id)}
              style={{
                background: activeMatrix === item.id ? "#2a220d" : "#110f0a",
                border: activeMatrix === item.id ? "1px solid #d4af37" : "1px solid #332a15",
                color: activeMatrix === item.id ? "#d4af37" : "#bbb",
                padding: "5px 12px", borderRadius: "5px", cursor: "pointer", fontSize: "10.5px", fontWeight: "bold", letterSpacing: "0.6px"
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      {/* 2. ARAMA BARI */}
      <div style={{ marginBottom: "12px", position: "relative" }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t.searchPlaceholder}
          style={{
            width: "100%", padding: "12px 20px", borderRadius: "30px", border: "1.5px solid #d4af37",
            backgroundColor: "#0d0d0d", color: "#fff", fontSize: "13.5px", outline: "none", boxSizing: "border-box",
            boxShadow: "0 0 10px rgba(212, 175, 55, 0.15)"
          }}
        />
        {isSearching && (
          <button
            onClick={() => setSearchTerm("")}
            style={{ position: "absolute", right: "15px", top: "10px", background: "none", border: "none", color: "#d4af37", cursor: "pointer", fontSize: "14px" }}
          >
            ✖
          </button>
        )}
      </div>

      {/* ARAMA SONUÇLARI */}
      {isSearching && (
        <div style={{ border: "1.5px solid #d4af37", borderRadius: "10px", backgroundColor: "#0d0c08", padding: "16px", marginBottom: "15px" }}>
          <div style={{ fontSize: "13px", fontWeight: "bold", color: "#d4af37", marginBottom: "10px" }}>
            {t.searchResultsTitle} ({searchResults.length})
          </div>
          {searchResults.length === 0 ? (
            <div style={{ color: "#aaa", fontSize: "12px", padding: "10px 0" }}>{t.noResults}</div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "10px" }}>
              {searchResults.map((item) => (
                <div key={item.id} onClick={() => setSelectedItemModal(item)} style={{ backgroundColor: "#111", border: "1px solid #554218", borderRadius: "6px", padding: "10px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "24px" }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: "bold", color: "#d4af37" }}>{item.title}</div>
                    <div style={{ fontSize: "9.5px", color: "#aaa" }}>📍 {item.location} | Kök: [{item.kok}]</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. İSTATİSTİK KARTLARI */}
      <div style={{ border: "1.5px solid #8c7126", borderRadius: "10px", backgroundColor: "#0a0a0a", padding: "14px", marginBottom: "12px" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
          <div style={{ border: "1.5px solid #d4af37", borderRadius: "8px", padding: "5px 12px", backgroundColor: "#0f0d08", textAlign: "center", minWidth: "110px" }}>
            <div style={{ fontSize: "8.5px", color: "#aaa", textTransform: "uppercase" }}>{t.systemStatus}</div>
            <div style={{ fontSize: "13px", fontWeight: "bold", color: "#d4af37", margin: "1px 0" }}>{t.statusActive}</div>
            <div style={{ fontSize: "8.5px", color: "#777" }}>YKOS v1.0 Beta</div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: "6px" }}>
          {rawStats.map((s, idx) => (
            <div key={s.id} style={{ border: "1px solid #554218", borderRadius: "6px", padding: "8px 6px", backgroundColor: "#111", display: "flex", alignItems: "center", gap: "6px", minWidth: 0 }}>
              <span style={{ fontSize: "16px", flexShrink: 0 }}>{s.icon}</span>
              <div style={{ overflow: "hidden" }}>
                <div style={{ fontSize: "12px", fontWeight: "bold", color: "#fff", whiteSpace: "nowrap" }}>{s.count}</div>
                <div style={{ fontSize: "8.5px", color: "#aaa", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.stats[idx]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. ANA SAYFA ALT MATRİS VE SAĞ CANLI ÇÖZÜMLEME PANOLARI */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "12px", marginBottom: "12px" }}>
        
        {/* SOL MATRİS SEÇENEKLERİ */}
        <div style={{ border: "1.5px solid #8c7126", borderRadius: "10px", backgroundColor: "#0a0a0a", padding: "18px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <h3 style={{ margin: 0, color: "#d4af37", fontSize: "15px", letterSpacing: "1px" }}>{t.matricesTitle}</h3>
          
          <div onClick={() => setActiveMatrix("KOK_HECE")} style={{ color: activeMatrix === "KOK_HECE" ? "#d4af37" : "#fff", fontWeight: "bold", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
            ▶ 🔤 {t.nav.kokHece}
          </div>

          <div onClick={() => setActiveMatrix("DAMGA_ATLASI")} style={{ color: activeMatrix === "DAMGA_ATLASI" ? "#d4af37" : "#d4af37", fontWeight: "bold", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
            ▶ 🗺️ {t.nav.damgaAtlasi}
          </div>

          <div onClick={() => setActiveMatrix("ANALIZ_ENGINE")} style={{ color: activeMatrix === "ANALIZ_ENGINE" ? "#d4af37" : "#fff", fontWeight: "bold", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
            ▶ 🔬 {t.nav.analizEngine}
          </div>

          <div onClick={() => setActiveMatrix("FLOW_MAP")} style={{ color: activeMatrix === "FLOW_MAP" ? "#d4af37" : "#fff", fontWeight: "bold", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
            ▶ 🌍 {t.nav.flowMap}
          </div>

          <div onClick={() => setActiveMatrix("DIJITAL_ARSIV")} style={{ color: activeMatrix === "DIJITAL_ARSIV" ? "#d4af37" : "#fff", fontWeight: "bold", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
            ▶ 📚 {t.nav.dijitalArsiv}
          </div>
          
          {data && (
            <div style={{ marginTop: "auto", paddingTop: "8px", borderTop: "1px solid #332a15", fontSize: "10.5px", color: "#0f0" }}>
              ⚡ {t.engineText} (Tick): {data.tick} | Flux: {data.quantumFlux}
            </div>
          )}
        </div>

        {/* SAĞ PANEL: CANLI ÇÖZÜMLER VE İNDEKSLER (GÖRÜNÜR KILINDI) */}
        <div style={{ border: "1.5px solid #8c7126", borderRadius: "10px", backgroundColor: "#0a0a0a", padding: "18px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <h3 style={{ margin: 0, color: "#d4af37", fontSize: "13px", letterSpacing: "0.8px" }}>{t.rightPanelTitle}</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <button
              onClick={() => { setSelectedSolution("YAZIT_01"); setActiveMatrix("ANALIZ_ENGINE"); }}
              style={{ padding: "10px", borderRadius: "6px", border: "1px solid #554218", backgroundColor: "#12100b", color: "#d4af37", fontWeight: "bold", cursor: "pointer", textAlign: "left", fontSize: "11px" }}
            >
              📜 Göbeklitepe T-Sütunu YKOS Okuması
            </button>

            <button
              onClick={() => { setSelectedSolution("YAZIT_02"); setActiveMatrix("ANALIZ_ENGINE"); }}
              style={{ padding: "10px", borderRadius: "6px", border: "1px solid #554218", backgroundColor: "#12100b", color: "#d4af37", fontWeight: "bold", cursor: "pointer", textAlign: "left", fontSize: "11px" }}
            >
              📜 Etrüsk Lemnos Kitabesi & Ön Türkçe Eşleşmesi
            </button>

            <button
              onClick={() => setActiveMatrix("KULLIYAT")}
              style={{ padding: "10px", borderRadius: "6px", border: "1px solid #554218", backgroundColor: "#12100b", color: "#aaa", fontWeight: "bold", cursor: "pointer", textAlign: "left", fontSize: "11px" }}
            >
              📚 YKOS 11 Ciltlik Külliyat ve Sembol Kataloğu
            </button>
          </div>

          <div style={{ marginTop: "auto", padding: "8px", backgroundColor: "#111", border: "1px solid #332a15", borderRadius: "6px", fontSize: "10px", color: "#888" }}>
            * Sağ paneldeki çözümlere basarak doğrudan dinamik okuma matrislerine geçebilirsiniz.
          </div>
        </div>

      </div>

      {/* 5. AÇILIR MODÜL PANELİ */}
      {activeMatrix && (
        <div style={{ 
          border: "2px solid #d4af37", borderRadius: "10px", backgroundColor: "#0d0c08", padding: "18px",
          boxShadow: "0 0 20px rgba(212, 175, 55, 0.2)"
        }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1.5px solid #554218", paddingBottom: "10px" }}>
            <h2 style={{ margin: 0, color: "#d4af37", fontSize: "17px", letterSpacing: "1px" }}>
              📂 {t.moduleTitle}: <span style={{ color: "#fff" }}>{activeMatrix}</span>
            </h2>

            <button
              onClick={() => setActiveMatrix(null)}
              style={{
                padding: "5px 12px", borderRadius: "5px", border: "1px solid #d4af37",
                backgroundColor: "#1f190a", color: "#d4af37", fontWeight: "bold", cursor: "pointer", fontSize: "11px"
              }}
            >
              {t.backToHome}
            </button>
          </div>

          {/* KÖK HECE MATRİSİ */}
          {activeMatrix === "KOK_HECE" && (
            <div>
              <div style={{ display: "flex", gap: "8px", marginBottom: "15px" }}>
                {Object.keys(kokHeceVerileri).map((hece) => (
                  <button
                    key={hece}
                    onClick={() => setSelectedHece(hece)}
                    style={{
                      padding: "7px 16px", borderRadius: "5px",
                      border: selectedHece === hece ? "1.5px solid #d4af37" : "1px solid #332a15",
                      backgroundColor: selectedHece === hece ? "#2a220d" : "#111",
                      color: selectedHece === hece ? "#d4af37" : "#aaa", fontWeight: "bold", cursor: "pointer", fontSize: "12px"
                    }}
                  >
                    {t.labels.rootPrefix}: {hece}
                  </button>
                ))}
              </div>

              <div style={{ backgroundColor: "#050505", border: "1px solid #554218", borderRadius: "8px", padding: "16px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "16px", alignItems: "center" }}>
                  <div style={{ textAlign: "center", background: "#14120b", padding: "20px", borderRadius: "8px", border: "1.5px solid #d4af37" }}>
                    <div style={{ fontSize: "38px", marginBottom: "6px" }}>{currentHece.damgaGorsel}</div>
                    <div style={{ fontSize: "18px", fontWeight: "bold", color: "#d4af37" }}>[{currentHece.hece}]</div>
                    <div style={{ fontSize: "9.5px", color: "#888", marginTop: "4px" }}>YKOS Matris Kodu</div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "13px" }}>
                    <div><strong style={{ color: "#d4af37" }}>{t.labels.phonetic}:</strong> <span style={{ color: "#fff" }}>{currentHece.fonetikKok}</span></div>
                    <div><strong style={{ color: "#d4af37" }}>{t.labels.semantic}:</strong> <span style={{ color: "#ddd" }}>{currentHeceDetail.meaning}</span></div>
                    <div><strong style={{ color: "#d4af37" }}>{t.labels.anatolian}:</strong> <span style={{ color: "#60a5fa" }}>{currentHeceDetail.anadolu}</span></div>
                    <div><strong style={{ color: "#d4af37" }}>{t.labels.asian}:</strong> <span style={{ color: "#a855f7" }}>{currentHeceDetail.asya}</span></div>
                    <div><strong style={{ color: "#d4af37" }}>{t.labels.coherence}:</strong> <span style={{ color: "#0f0" }}>{currentHece.coherence}</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. MODÜL: OKUMA & ANALİZ MOTORU VE YAZIT ÇÖZÜMLEMELERİ */}
          {activeMatrix === "ANALIZ_ENGINE" && (
            <div>
              <div style={{ fontSize: "13px", color: "#d4af37", fontWeight: "bold", marginBottom: "12px" }}>
                🔬 {t.analysis.title}
              </div>

              {/* SEÇİLİ YAZIT ÇÖZÜM BİLGİSİ */}
              {selectedSolution && (
                <div style={{ backgroundColor: "#1a160d", border: "1px solid #d4af37", borderRadius: "6px", padding: "12px", marginBottom: "15px" }}>
                  <div style={{ fontSize: "11px", color: "#0f0", fontWeight: "bold" }}>⚡ AKTİF ÇÖZÜMLEME DİZİNİ:</div>
                  <div style={{ fontSize: "14px", color: "#d4af37", fontWeight: "bold", margin: "2px 0" }}>{solutionsData[selectedSolution].title}</div>
                  <div style={{ fontSize: "11px", color: "#fff" }}><strong>Okunan Metin:</strong> "{solutionsData[selectedSolution].decipheredText}"</div>
                  <div style={{ fontSize: "10px", color: "#aaa", marginTop: "2px" }}><strong>Kullanılan Damgalar:</strong> {solutionsData[selectedSolution].stampsUsed}</div>
                </div>
              )}

              <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
                {Object.keys(analysisData).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedAnalyzeItem(key)}
                    style={{
                      padding: "8px 14px", borderRadius: "6px",
                      border: selectedAnalyzeItem === key ? "1.5px solid #d4af37" : "1px solid #332a15",
                      backgroundColor: selectedAnalyzeItem === key ? "#2a220d" : "#111",
                      color: selectedAnalyzeItem === key ? "#d4af37" : "#aaa", fontSize: "11px", fontWeight: "bold", cursor: "pointer"
                    }}
                  >
                    {analysisData[key].icon} {analysisData[key].name}
                  </button>
                ))}
              </div>

              <div style={{ display: "flex", gap: "6px", borderBottom: "1px solid #332a15", paddingBottom: "8px", marginBottom: "15px" }}>
                <button onClick={() => setActiveAnalysisLayer("GEOMETRY")} style={{ padding: "6px 12px", background: activeAnalysisLayer === "GEOMETRY" ? "#1f190a" : "transparent", border: activeAnalysisLayer === "GEOMETRY" ? "1px solid #d4af37" : "none", color: activeAnalysisLayer === "GEOMETRY" ? "#d4af37" : "#888", borderRadius: "4px", cursor: "pointer", fontSize: "11px", fontWeight: "bold" }}>
                  {t.analysis.geometryTab}
                </button>
                <button onClick={() => setActiveAnalysisLayer("DIRECTION")} style={{ padding: "6px 12px", background: activeAnalysisLayer === "DIRECTION" ? "#1f190a" : "transparent", border: activeAnalysisLayer === "DIRECTION" ? "1px solid #d4af37" : "none", color: activeAnalysisLayer === "DIRECTION" ? "#d4af37" : "#888", borderRadius: "4px", cursor: "pointer", fontSize: "11px", fontWeight: "bold" }}>
                  {t.analysis.directionTab}
                </button>
                <button onClick={() => setActiveAnalysisLayer("PHONETIC")} style={{ padding: "6px 12px", background: activeAnalysisLayer === "PHONETIC" ? "#1f190a" : "transparent", border: activeAnalysisLayer === "PHONETIC" ? "1px solid #d4af37" : "none", color: activeAnalysisLayer === "PHONETIC" ? "#d4af37" : "#888", borderRadius: "4px", cursor: "pointer", fontSize: "11px", fontWeight: "bold" }}>
                  {t.analysis.phoneticTab}
                </button>
              </div>

              <div style={{ backgroundColor: "#050505", border: "1px solid #554218", borderRadius: "8px", padding: "18px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px", alignItems: "center" }}>
                  <div style={{ textAlign: "center", background: "#14120b", border: "1.5px solid #d4af37", borderRadius: "8px", padding: "25px", position: "relative" }}>
                    <div style={{ position: "absolute", top: "8px", left: "8px", fontSize: "9px", color: "#0f0", border: "1px solid #0f0", padding: "2px 6px", borderRadius: "4px" }}>ANALYZING...</div>
                    <div style={{ fontSize: "56px", margin: "10px 0" }}>{currentAnalyze.icon}</div>
                    <div style={{ fontSize: "24px", color: "#d4af37", fontWeight: "bold" }}>[{currentAnalyze.symbolCode}]</div>
                    <div style={{ fontSize: "10px", color: "#888", marginTop: "4px" }}>YKOS Vektör Çözümlemesi</div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px" }}>
                    {activeAnalysisLayer === "GEOMETRY" && (
                      <>
                        <div><strong style={{ color: "#d4af37" }}>Form Yapısı:</strong> <span style={{ color: "#fff" }}>{currentAnalyze.geometry.form}</span></div>
                        <div><strong style={{ color: "#d4af37" }}>Vektör Çizgileri:</strong> <span style={{ color: "#ddd" }}>{currentAnalyze.geometry.vectors}</span></div>
                        <div><strong style={{ color: "#d4af37" }}>Simetri Derecesi:</strong> <span style={{ color: "#60a5fa" }}>{currentAnalyze.geometry.symmetry}</span></div>
                      </>
                    )}
                    {activeAnalysisLayer === "DIRECTION" && (
                      <>
                        <div><strong style={{ color: "#d4af37" }}>Akış Yönü:</strong> <span style={{ color: "#fff" }}>{currentAnalyze.direction.flow}</span></div>
                        <div><strong style={{ color: "#d4af37" }}>Vektör Tipi:</strong> <span style={{ color: "#ddd" }}>{currentAnalyze.direction.vectorType}</span></div>
                        <div><strong style={{ color: "#d4af37" }}>Hareket Hızı:</strong> <span style={{ color: "#a855f7" }}>{currentAnalyze.direction.speed}</span></div>
                      </>
                    )}
                    {activeAnalysisLayer === "PHONETIC" && (
                      <>
                        <div><strong style={{ color: "#d4af37" }}>Fonetik Kök:</strong> <span style={{ color: "#fff" }}>{currentAnalyze.phonetic.root}</span></div>
                        <div><strong style={{ color: "#d4af37" }}>Ses Değeri:</strong> <span style={{ color: "#ddd" }}>{currentAnalyze.phonetic.soundValue}</span></div>
                        <div><strong style={{ color: "#d4af37" }}>Çözümlenen Anlam:</strong> <span style={{ color: "#60a5fa" }}>{currentAnalyze.phonetic.meaning}</span></div>
                      </>
                    )}
                    <div style={{ marginTop: "10px", paddingTop: "10px", borderTop: "1px dashed #332a15", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "11px", color: "#aaa" }}>{t.analysis.confidence}:</span>
                      <span style={{ fontSize: "14px", color: "#0f0", fontWeight: "bold" }}>{currentAnalyze.phonetic.accuracy}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DİĞER MODÜLLER (DAMGA ATLASI, FLOW MAP VB.) */}
          {activeMatrix !== "KOK_HECE" && activeMatrix !== "ANALIZ_ENGINE" && (
            <div style={{ textAlign: "center", padding: "30px 0", color: "#aaa" }}>
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>🏛️</div>
              <h3 style={{ color: "#d4af37", margin: 0 }}>{activeMatrix}</h3>
              <p style={{ fontSize: "12px", marginTop: "6px", color: "#888" }}>
                YKOS disiplinler arası kültür ve dil veri tabanı indeksleri aktif taranmaktadır.
              </p>
            </div>
          )}

        </div>
      )}

      {/* DETAY MODALI */}
      {selectedItemModal && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.85)",
          zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px"
        }}>
          <div style={{ backgroundColor: "#0d0c08", border: "2px solid #d4af37", borderRadius: "10px", padding: "20px", maxWidth: "450px", width: "100%", boxShadow: "0 0 25px rgba(212,175,55,0.3)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", borderBottom: "1px solid #332a15", pb: "8px" }}>
              <h3 style={{ margin: 0, color: "#d4af37", fontSize: "16px" }}>🔍 YKOS Görsel Analiz</h3>
              <button onClick={() => setSelectedItemModal(null)} style={{ background: "none", border: "none", color: "#d4af37", fontSize: "16px", cursor: "pointer" }}>✖</button>
            </div>

            <div style={{ textAlign: "center", backgroundColor: "#14120b", border: "1px solid #554218", borderRadius: "8px", padding: "25px", marginBottom: "15px" }}>
              <div style={{ fontSize: "52px" }}>{selectedItemModal.icon}</div>
              <div style={{ fontSize: "22px", color: "#d4af37", fontWeight: "bold", marginTop: "8px" }}>[{selectedItemModal.code}]</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px", color: "#ddd" }}>
              <div><strong style={{ color: "#d4af37" }}>Eser Adı:</strong> {selectedItemModal.title}</div>
              <div><strong style={{ color: "#d4af37" }}>{t.labels.category}:</strong> {selectedItemModal.type}</div>
              <div><strong style={{ color: "#d4af37" }}>{t.labels.rootPrefix}:</strong> [{selectedItemModal.kok}]</div>
              <div><strong style={{ color: "#d4af37" }}>{t.labels.location}:</strong> {selectedItemModal.location}</div>
              <div><strong style={{ color: "#d4af37" }}>Tarihlendirme:</strong> {selectedItemModal.period}</div>
            </div>

            <button
              onClick={() => setSelectedItemModal(null)}
              style={{ width: "100%", marginTop: "15px", padding: "8px", backgroundColor: "#1f190a", border: "1px solid #d4af37", color: "#d4af37", fontWeight: "bold", borderRadius: "5px", cursor: "pointer" }}
            >
              Kapat
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
