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

  const [selectedAnalyzeItem, setSelectedAnalyzeItem] = useState("OK_DAMGA");
  const [activeAnalysisLayer, setActiveAnalysisLayer] = useState("GEOMETRY");
  const [selectedRoute, setSelectedRoute] = useState("ANATOLIA_ASIA");
  const [selectedSolution, setSelectedSolution] = useState("YAZIT_01");

  const handleResetToHome = () => {
    setActiveMatrix(null);
    setSelectedHece("OK");
    setSearchTerm("");
    setCatalogFilter("ALL");
    setSelectedItemModal(null);
  };

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

  // 10 DİLLİ TAM SÖZLÜK MATRİSİ (SAĞ PANEL ÇÖZÜMLERİ DAHİL)
  const i18n = {
    TR: {
      flag: "🇹🇷", label: "Türkçe",
      title: "YKOS BİLGİ SİSTEMİ", subtitle: "Disiplinler Arası Algoritmik Kültür ve Dil Veri Tabanı",
      searchPlaceholder: "🔍 Damga, kök hece, ülke, il veya kadim merkez ara...",
      systemStatus: "Sistem Durumu", statusActive: "AKTİF", matricesTitle: "MATRİSLER VE KATMANLAR",
      rightPanelTitle: "⚡ YKOS ÇÖZÜMLERİ VE İNDEKSLER",
      rightPanelDesc: "* Sağ paneldeki çözümlere basarak doğrudan dinamik okuma matrislerine geçebilirsiniz.",
      solutions: {
        gobeklitepe: "📜 Göbeklitepe T-Sütunu YKOS Okuması",
        etrusk: "📜 Etrüsk Lemnos Kitabesi & Ön Türkçe Eşleşmesi",
        kulliyat: "📚 YKOS 11 Ciltlik Külliyat ve Sembol Kataloğu"
      },
      engineText: "Canlı Motor Bağlantısı", backToHome: "✖ Ana Sayfaya Dön", moduleTitle: "YKOS MODÜLÜ",
      searchResultsTitle: "🔍 Canlı Arama ve İndeks Sonuçları", noResults: "Aranan kriterlere uygun kayıt bulunamadı.",
      nav: { kurumsal: "KURUMSAL", metodoloji: "YKOS METODOLOJİSİ", kokHece: "KÖK HECE MATRİSİ", damgaAtlasi: "DAMGA ATLASI", analizEngine: "OKUMA & ANALİZ MOTORU", flowMap: "GÖÇ & AKIŞ HARİTASI", kulliyat: "KÜLLİYAT & YAYINLAR", dijitalArsiv: "DİJİTAL ARŞİV" },
      stats: ["Ülkeler", "Araştırmalar", "Damgalar", "Petroglifler", "Yazıtlar", "Kaynaklar", "Görseller", "Atlaslar"],
      labels: { phonetic: "Fonetik Kök", semantic: "Anlamsal Katman", anatolian: "Anadolu Odak Noktası", asian: "Asya Akış Hattı", coherence: "Matris Uyum (Coherence)", rootPrefix: "Kök", category: "Kategori", location: "Kadim Merkez" },
      catalog: { all: "Tümü", stamps: "Damgalar", petroglyphs: "Petroglifler", inspect: "İncele" },
      analysis: { title: "YKOS Algoritmik Okuma ve Çözümleme Motoru", geometryTab: "📐 Geometrik Vektör Katmanı", directionTab: "🏹 Yön ve Vektör Akışı", phoneticTab: "𐰸 Fonetik Eşleşme Matrisi", confidence: "Algoritma Okuma Doğruluğu" },
      map: { title: "Anadolu Odaklı Kadim Göç ve Sembol Akış Haritası", route1: "Anadolu ➔ Asya Ana Akış Hattı", route2: "Anadolu ➔ Akdeniz & Avrupa Hattı", origin: "Çıkış / Odak Merkezi", destination: "Varış / Yayılım Havzası", stampsTransferred: "Taşınan Damga/Kök Sayısı" },
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
      rightPanelDesc: "* Click solutions in the right panel to switch directly to dynamic reading matrices.",
      solutions: {
        gobeklitepe: "📜 Gobeklitepe T-Pillar YKOS Reading",
        etrusk: "📜 Etruscan Lemnos Inscription & Proto-Turkic Match",
        kulliyat: "📚 YKOS 11-Volume Collected Works & Symbol Catalog"
      },
      engineText: "Live Engine Connection", backToHome: "✖ Back to Home", moduleTitle: "YKOS MODULE",
      searchResultsTitle: "🔍 Live Search & Index Results", noResults: "No matching records found.",
      nav: { kurumsal: "CORPORATE", metodoloji: "YKOS METHODOLOGY", kokHece: "ROOT SYLLABLE MATRIX", damgaAtlasi: "STAMP ATLAS", analizEngine: "READING & ANALYSIS ENGINE", flowMap: "MIGRATION & FLOW MAP", kulliyat: "COLLECTED WORKS", dijitalArsiv: "DIGITAL ARCHIVE" },
      stats: ["Countries", "Researches", "Stamps", "Petroglyphs", "Inscriptions", "Sources", "Images", "Atlases"],
      labels: { phonetic: "Phonetic Root", semantic: "Semantic Layer", anatolian: "Anatolian Focal Point", asian: "Asian Flow Line", coherence: "Matrix Coherence", rootPrefix: "Root", category: "Category", location: "Ancient Center" },
      catalog: { all: "All", stamps: "Stamps", petroglyphs: "Petroglyphs", inspect: "Inspect" },
      analysis: { title: "YKOS Algorithmic Reading Engine", geometryTab: "📐 Geometric Vector Layer", directionTab: "🏹 Direction and Vector Flow", phoneticTab: "𐰸 Phonetic Matching Matrix", confidence: "Reading Accuracy" },
      map: { title: "Anatolian-Centered Ancient Migration Map", route1: "Anatolia ➔ Asia Main Line", route2: "Anatolia ➔ Europe Line", origin: "Origin Center", destination: "Destination Basin", stampsTransferred: "Transferred Stamps" },
      heceDetails: {
        OK: { meaning: "Direction, Ascension, Connection, Migration", anadolu: "Gobeklitepe / Catalhoyuk", asya: "Orkhon / Yenisey Line" },
        AT: { meaning: "Movement, Progress, Primary Man", anadolu: "Alacahoyuk / Kultepe", asya: "Altai-Sayan Basin" },
        ER: { meaning: "Existence, Identity, Power", anadolu: "Hattusa / Gordion", asya: "Issyk Kul / Balasagun" },
        EL: { meaning: "Community, Unity, State Structure", anadolu: "Yazilikaya / Karkemish", asya: "Talas / Otuken Basin" }
      }
    },
    FR: {
      flag: "🇫🇷", label: "Français",
      title: "SYSTÈME D'INFORMATION YKOS", subtitle: "Base de Données Algorithmique sur la Culture et la Langue",
      searchPlaceholder: "🔍 Rechercher sceau, racine, pays, centre ancien...",
      systemStatus: "État du Système", statusActive: "ACTIF", matricesTitle: "MATRICES ET COUCHES",
      rightPanelTitle: "⚡ SOLUTIONS ET INDEX YKOS",
      rightPanelDesc: "* Cliquez sur les solutions du panneau droit pour basculer vers les matrices.",
      solutions: {
        gobeklitepe: "📜 Lecture YKOS du Pilier T de Gobeklitepe",
        etrusk: "📜 Inscription Étrusque de Lemnos & Correspondance",
        kulliyat: "📚 Catalogue des Symboles YKOS en 11 Volumes"
      },
      engineText: "Connexion Moteur En Direct", backToHome: "✖ Accueil", moduleTitle: "MODULE YKOS",
      searchResultsTitle: "🔍 Résultats de Recherche", noResults: "Aucun enregistrement trouvé.",
      nav: { kurumsal: "ENTREPRISE", metodoloji: "MÉTHODOLOGIE YKOS", kokHece: "MATRICE DE RACINE", damgaAtlasi: "ATLAS DES SCEAUX", analizEngine: "MOTEUR D'ANALYSE", flowMap: "CARTE DE MIGRATION", kulliyat: "ŒUVRES COMPLÈTES", dijitalArsiv: "ARCHIVE NUMÉRIQUE" },
      stats: ["Pays", "Recherches", "Sceaux", "Pétroglyphes", "Inscriptions", "Sources", "Images", "Atlas"],
      labels: { phonetic: "Racine Phonétique", semantic: "Couche Sémantique", anatolian: "Point Focal Anatolien", asian: "Ligne d'Asie", coherence: "Cohérence Matricielle", rootPrefix: "Racine", category: "Catégorie", location: "Centre Ancien" },
      catalog: { all: "Tous", stamps: "Sceaux", petroglyphs: "Pétroglyphes", inspect: "Inspecter" },
      analysis: { title: "Moteur de Lecture Algorithmique YKOS", geometryTab: "📐 Vecteur Géométrique", directionTab: "🏹 Flux Vectoriel", phoneticTab: "𐰸 Matrice Phonétique", confidence: "Précision de Lecture" },
      map: { title: "Carte de Migration Ancienne", route1: "Anatolie ➔ Asie", route2: "Anatolie ➔ Europe", origin: "Origine", destination: "Destination", stampsTransferred: "Sceaux Transférés" },
      heceDetails: {
        OK: { meaning: "Direction, Ascension, Connexion", anadolu: "Gobeklitepe", asya: "Ligne d'Orkhon" },
        AT: { meaning: "Mouvement, Progrès", anadolu: "Alacahoyuk", asya: "Bassin de l'Altaï" },
        ER: { meaning: "Existence, Identité", anadolu: "Hattusa", asya: "Issyk Koul" },
        EL: { meaning: "Communauté, Unité", anadolu: "Yazilikaya", asya: "Bassin de Talas" }
      }
    },
    DE: {
      flag: "🇩🇪", label: "Deutsch",
      title: "YKOS INFORMATIONSSYSTEM", subtitle: "Interdisziplinäre Algorithmentat- und Sprachdatenbank",
      searchPlaceholder: "🔍 Suche Siegel, Silbe, Land, altes Zentrum...",
      systemStatus: "Systemstatus", statusActive: "AKTIV", matricesTitle: "MATRIZEN UND SCHICHTEN",
      rightPanelTitle: "⚡ YKOS LÖSUNGEN UND INDIZES",
      rightPanelDesc: "* Klicken Sie auf die Lösungen, um zu den Lesematrizen zu wechseln.",
      solutions: {
        gobeklitepe: "📜 Göbeklitepe T-Pfeiler YKOS Lesung",
        etrusk: "📜 Etruskische Lemnos-Inschrift & Proto-Türkisch",
        kulliyat: "📚 YKOS 11-Bändige Gesamtausgabe & Symbolkatalog"
      },
      engineText: "Live-Motorverbindung", backToHome: "✖ Startseite", moduleTitle: "YKOS MODUL",
      searchResultsTitle: "🔍 Suchergebnisse", noResults: "Keine Datensätze gefunden.",
      nav: { kurumsal: "UNTERNEHMEN", metodoloji: "YKOS METHODIK", kokHece: "STAMMSILBEN-MATRIX", damgaAtlasi: "SIEGEL-ATLAS", analizEngine: "ANALYSE-ENGINE", flowMap: "MIGRATIONSKARTE", kulliyat: "GESAMTAUSGABE", dijitalArsiv: "DIGITALES ARCHIV" },
      stats: ["Länder", "Forschungen", "Siegel", "Petroglyphen", "Inschriften", "Quellen", "Bilder", "Atlasse"],
      labels: { phonetic: "Phonetische Wurzel", semantic: "Semantische Schicht", anatolian: "Anatolischer Fokus", asian: "Asiatische Linie", coherence: "Kohärenz", rootPrefix: "Wurzel", category: "Kategorie", location: "Altes Zentrum" },
      catalog: { all: "Alle", stamps: "Siegel", petroglyphs: "Petroglyphen", inspect: "Prüfen" },
      analysis: { title: "YKOS Algorithmetische Lese-Engine", geometryTab: "📐 Geometrischer Vektor", directionTab: "🏹 Vektorfluss", phoneticTab: "𐰸 Phonetische Matrix", confidence: "Genauigkeit" },
      map: { title: "Anatolische Migrationskarte", route1: "Anatolien ➔ Asien", route2: "Anatolien ➔ Europa", origin: "Herkunft", destination: "Zielbecken", stampsTransferred: "Übertragene Siegel" },
      heceDetails: {
        OK: { meaning: "Richtung, Aufstieg, Verbindung", anadolu: "Göbeklitepe", asya: "Orchon-Linie" },
        AT: { meaning: "Bewegung, Fortschritt", anadolu: "Alacahöyük", asya: "Altai-Becken" },
        ER: { meaning: "Existenz, Identität", anadolu: "Hattuscha", asya: "Issykkul" },
        EL: { meaning: "Gemeinschaft, Einheit", anadolu: "Yazılıkaya", asya: "Talas-Becken" }
      }
    },
    ZH: {
      flag: "🇨🇳", label: "中文",
      title: "YKOS 信息系统", subtitle: "跨学科算法文化与语言数据库",
      searchPlaceholder: "🔍 搜索印章、根音节、国家、古中心...",
      systemStatus: "系统状态", statusActive: "活跃", matricesTitle: "矩阵与图层",
      rightPanelTitle: "⚡ YKOS 解决方案与索引",
      rightPanelDesc: "* 点击右侧面板中的解决方案直接切换到动态读取矩阵。",
      solutions: {
        gobeklitepe: "📜 哥贝克力石阵 T 柱 YKOS 解读",
        etrusk: "📜 伊特鲁里亚雷姆诺斯铭文与原始突厥语对应",
        kulliyat: "📚 YKOS 11 卷全集与符号目录"
      },
      engineText: "实时引擎连接", backToHome: "✖ 返回首页", moduleTitle: "YKOS 模块",
      searchResultsTitle: "🔍 实时搜索结果", noResults: "未找到符合条件的记录。",
      nav: { kurumsal: "企业", metodoloji: "YKOS 方法论", kokHece: "根音节矩阵", damgaAtlasi: "印章地图集", analizEngine: "分析引擎", flowMap: "迁移路线图", kulliyat: "全集与出版物", dijitalArsiv: "数字档案" },
      stats: ["国家", "研究", "印章", "岩画", "铭文", "文献", "图像", "地图集"],
      labels: { phonetic: "语音根", semantic: "语义层", anatolian: "安纳托利亚焦点", asian: "亚洲流动线", coherence: "矩阵一致性", rootPrefix: "根", category: "类别", location: "古中心" },
      catalog: { all: "全部", stamps: "印章", petroglyphs: "岩画", inspect: "查看" },
      analysis: { title: "YKOS 算法解读引擎", geometryTab: "📐 几何向量层", directionTab: "🏹 方向与向量流", phoneticTab: "𐰸 语音匹配矩阵", confidence: "准确率" },
      map: { title: "安纳托利亚古迁移地图", route1: "安纳托利亚 ➔ 亚洲", route2: "安纳托利亚 ➔ 欧洲", origin: "起点", destination: "终点", stampsTransferred: "转移的印章" },
      heceDetails: {
        OK: { meaning: "方向、上升、连接", anadolu: "哥贝克力石阵", asya: "鄂尔浑线" },
        AT: { meaning: "运动、进步", anadolu: "阿拉贾霍裕克", asya: "阿尔泰盆地" },
        ER: { meaning: "存在、身份", anadolu: "哈图沙", asya: "伊塞克湖" },
        EL: { meaning: "社区、统一", anadolu: "亚兹利卡亚", asya: "塔拉斯盆地" }
      }
    },
    JA: {
      flag: "🇯🇵", label: "日本語",
      title: "YKOS 情報システム", subtitle: "学際的アルゴリズム文化・言語データベース",
      searchPlaceholder: "🔍 刻印、音節、国家、古代中心地を検索...",
      systemStatus: "システム状態", statusActive: "アクティブ", matricesTitle: "マトリックスとレイヤー",
      rightPanelTitle: "⚡ YKOS ソリューション＆インデックス",
      rightPanelDesc: "* 右パネルのソリューションをクリックするとマトリックスに切り替わります。",
      solutions: {
        gobeklitepe: "📜 ギョベクリ・テペ T柱 YKOS 解読",
        etrusk: "📜 エトルリア・レムノス碑文＆プロト・ターキック照合",
        kulliyat: "📚 YKOS 全11巻全集＆シンボルカタログ"
      },
      engineText: "ライブエンジン接続", backToHome: "✖ ホームへ戻る", moduleTitle: "YKOS モジュール",
      searchResultsTitle: "🔍 検索結果", noResults: "該当する記録が見つかりません。",
      nav: { kurumsal: "企業", metodoloji: "YKOS メソドロジー", kokHece: "根音節マトリックス", damgaAtlasi: "刻印アトラス", analizEngine: "解析エンジン", flowMap: "移動・ルートマップ", kulliyat: "全集・出版物", dijitalArsiv: "デジタルアーカイブ" },
      stats: ["国家", "研究", "刻印", "岩刻", "碑文", "光源", "画像", "地図"],
      labels: { phonetic: "音素根", semantic: "意味論レイヤー", anatolian: "アナトリアの焦点", asian: "アジアライン", coherence: "整合性", rootPrefix: "根", category: "カテゴリ", location: "古代中心地" },
      catalog: { all: "すべて", stamps: "刻印", petroglyphs: "岩刻", inspect: "詳細" },
      analysis: { title: "YKOS アルゴリズム解読エンジン", geometryTab: "📐 幾何学ベクトル", directionTab: "🏹 ベクトル流", phoneticTab: "𐰸 音声マッチング", confidence: "解読精度" },
      map: { title: "古代移動ルートマップ", route1: "アナトリア ➔ アジア", route2: "アナトリア ➔ ヨーロッパ", origin: "起点", destination: "目的地", stampsTransferred: "移動した刻印" },
      heceDetails: {
        OK: { meaning: "方向、上昇、結合", anadolu: "ギョベクリ・テペ", asya: "オルホンライン" },
        AT: { meaning: "移動、進歩", anadolu: "アラジャホユック", asya: "アルタイ盆地" },
        ER: { meaning: "存在、アイデンティティ", anadolu: "ハトゥシャ", asya: "イシク・クル" },
        EL: { meaning: "共同体、統一", anadolu: "ヤズルカヤ", asya: "タラス盆地" }
      }
    },
    IT: {
      flag: "🇮🇹", label: "Italiano",
      title: "SISTEMA INFORMATIVO YKOS", subtitle: "Database Algoritmico Interdisciplinare di Cultura e Lingua",
      searchPlaceholder: "🔍 Cerca sigillo, radice, paese, centro antico...",
      systemStatus: "Stato del Sistema", statusActive: "ATTIVO", matricesTitle: "MATRICI E LIVELLI",
      rightPanelTitle: "⚡ SOLUZIONI E INDICI YKOS",
      rightPanelDesc: "* Clicca sulle soluzioni per passare alle matrici di lettura.",
      solutions: {
        gobeklitepe: "📜 Lettura YKOS del Pilastro T di Gobeklitepe",
        etrusk: "📜 Iscrizione Etrusca di Lemno & Corrispondenza",
        kulliyat: "📚 Catalogo dei Simboli YKOS in 11 Volumi"
      },
      engineText: "Connessione Motore Live", backToHome: "✖ Home Page", moduleTitle: "MODULO YKOS",
      searchResultsTitle: "🔍 Risultati della Ricerca", noResults: "Nessun risultato trovato.",
      nav: { kurumsal: "AZIENDALE", metodoloji: "METODOLOGIA YKOS", kokHece: "MATRICE SILLABICA", damgaAtlasi: "ATLANTE DEI SIGILLI", analizEngine: "MOTORE DI ANALISI", flowMap: "MAPPA DI MIGRAZIONE", kulliyat: "OPERE COMPLETE", dijitalArsiv: "ARCHIVIO DIGITALE" },
      stats: ["Paesi", "Ricerche", "Sigilli", "Petroglifi", "Iscrizioni", "Fonti", "Immagini", "Atlanti"],
      labels: { phonetic: "Radice Fonetica", semantic: "Livello Semantico", anatolian: "Foco Anatolico", asian: "Linea Asiatica", coherence: "Coerenza Matriciale", rootPrefix: "Radice", category: "Categoria", location: "Centro Antico" },
      catalog: { all: "Tutti", stamps: "Sigilli", petroglyphs: "Petroglifi", inspect: "Ispeziona" },
      analysis: { title: "Motore di Lettura Algoritmica YKOS", geometryTab: "📐 Vettore Geometrico", directionTab: "🏹 Flusso Vettoriale", phoneticTab: "𐰸 Matrice Fonetica", confidence: "Precisione" },
      map: { title: "Mappa delle Migrazioni Antiche", route1: "Anatolia ➔ Asia", route2: "Anatolia ➔ Europa", origin: "Origine", destination: "Destinazione", stampsTransferred: "Sigilli Trasferiti" },
      heceDetails: {
        OK: { meaning: "Direzione, Ascensione, Connessione", anadolu: "Gobeklitepe", asya: "Linea Orkhon" },
        AT: { meaning: "Movimento, Progresso", anadolu: "Alacahoyuk", asya: "Bacino Altai" },
        ER: { meaning: "Esistenza, Identità", anadolu: "Hattusa", asya: "Issyk Kul" },
        EL: { meaning: "Comunità, Unità", anadolu: "Yazilikaya", asya: "Bacino Talas" }
      }
    },
    ES: {
      flag: "🇪🇸", label: "Español",
      title: "SISTEMA DE INFORMACIÓN YKOS", subtitle: "Base de Datos Algorítmica Interdisciplinaria de Cultura y Lengua",
      searchPlaceholder: "🔍 Buscar sello, raíz, país, centro antiguo...",
      systemStatus: "Estado del Sistema", statusActive: "ACTIVO", matricesTitle: "MATRICES Y CAPAS",
      rightPanelTitle: "⚡ SOLUCIONES E ÍNDICES YKOS",
      rightPanelDesc: "* Haga clic en las soluciones para pasar directamente a las matrices.",
      solutions: {
        gobeklitepe: "📜 Lectura YKOS del Pilar T de Gobeklitepe",
        etrusk: "📜 Inscripción Etrusca de Lemnos y Coincidencia",
        kulliyat: "📚 Catálogo de Símbolos YKOS en 11 Volúmenes"
      },
      engineText: "Conexión Motor en Vivo", backToHome: "✖ Inicio", moduleTitle: "MÓDULO YKOS",
      searchResultsTitle: "🔍 Resultados de Búsqueda", noResults: "No se encontraron registros.",
      nav: { kurumsal: "CORPORATIVO", metodoloji: "METODOLOGÍA YKOS", kokHece: "MATRIZ DE RAÍZ", damgaAtlasi: "ATLAS DE SELLOS", analizEngine: "MOTOR DE ANÁLISIS", flowMap: "MAPA DE MIGRACIÓN", kulliyat: "OBRAS COMPLETAS", dijitalArsiv: "ARCHIVOS DIGITALES" },
      stats: ["Países", "Investigaciones", "Sellos", "Petroglifos", "Inscripciones", "Fuentes", "Imágenes", "Atlas"],
      labels: { phonetic: "Raíz Fonética", semantic: "Capa Semántica", anatolian: "Foco Anatolio", asian: "Línea Asiática", coherence: "Coherencia de Matriz", rootPrefix: "Raíz", category: "Categoría", location: "Centro Antiguo" },
      catalog: { all: "Todos", stamps: "Sellos", petroglyphs: "Petroglifos", inspect: "Inspeccionar" },
      analysis: { title: "Motor de Lectura Algorítmica YKOS", geometryTab: "📐 Vector Geométrico", directionTab: "🏹 Flujo Vectorial", phoneticTab: "𐰸 Matriz Fonética", confidence: "Precisión" },
      map: { title: "Mapa de Migración Antigua", route1: "Anatolia ➔ Asia", route2: "Anatolia ➔ Europa", origin: "Origen", destination: "Destino", stampsTransferred: "Sellos Transferidos" },
      heceDetails: {
        OK: { meaning: "Dirección, Ascensión, Conexión", anadolu: "Gobeklitepe", asya: "Línea Orkhon" },
        AT: { meaning: "Movimiento, Progreso", anadolu: "Alacahoyuk", asya: "Cuenca Altai" },
        ER: { meaning: "Existencia, Identidad", anadolu: "Hattusa", asya: "Issyk Kul" },
        EL: { meaning: "Comunidad, Unidad", anadolu: "Yazilikaya", asya: "Cuenca Talas" }
      }
    },
    AR: {
      flag: "🇸🇦", label: "العربية",
      title: "نظام المعلومات YKOS", subtitle: "قاعدة بيانات ثقافة ولغة خوارزمية متعددة التخصصات",
      searchPlaceholder: "🔍 البحث عن الختم، الجذر، الدولة، المركز القديم...",
      systemStatus: "حالة النظام", statusActive: "نشط", matricesTitle: "المصفوفات والطبقات",
      rightPanelTitle: "⚡ حلول ومؤشرات YKOS",
      rightPanelDesc: "* انقر على الحلول في اللوحة اليمنى للانتقال مباشرة إلى مصفوفات القراءة.",
      solutions: {
        gobeklitepe: "📜 قراءة YKOS لعمود T في جوبيكلي تبه",
        etrusk: "📜 نقش ليمنوس الإتروسكي ومطابقة اللغة التركية القديمة",
        kulliyat: "📚 كتيّب رموز وآثار YKOS في 11 مجلداً"
      },
      engineText: "اتصال المحرك المباشر", backToHome: "✖ الصفحة الرئيسية", moduleTitle: "وحدة YKOS",
      searchResultsTitle: "🔍 نتائج البحث المباشر", noResults: "لم يتم العثور على سجلات مطابقة.",
      nav: { kurumsal: "المؤسسية", metodoloji: "منهجية YKOS", kokHece: "مصفوفة الجذر", damgaAtlasi: "أطلس الأختام", analizEngine: "محرك التحليل", flowMap: "خريطة الهجرة", kulliyat: "الآثار الكاملة", dijitalArsiv: "الأرشيف الرقمي" },
      stats: ["الدول", "الأبحاث", "الأختام", "النقوش الصخرية", "النقوش", "المصادر", "الصور", "الأطالس"],
      labels: { phonetic: "الجذر الصوتي", semantic: "الطبقة الدلالية", anatolian: "المركز الأناضولي", asian: "الخط الآسيوي", coherence: "اتساق المصفوفة", rootPrefix: "الجذر", category: "الفئة", location: "المركز القديم" },
      catalog: { all: "الكل", stamps: "الأختام", petroglyphs: "النقوش", inspect: "معاينة" },
      analysis: { title: "محرك القراءة الخوارزمية YKOS", geometryTab: "📐 المتجه الهندسي", directionTab: "🏹 تدفق المتجهات", phoneticTab: "𐰸 مصفوفة الصوت", confidence: "دقة القراءة" },
      map: { title: "خريطة الهجرة القديمة", route1: "الأناضول ➔ آسيا", route2: "الأناضول ➔ أوروبا", origin: "المركز", destination: "الوجهة", stampsTransferred: "الأختام المنقولة" },
      heceDetails: {
        OK: { meaning: "الاتجاه، الصعود، الاتصال", anadolu: "جوبيكلي تبه", asya: "خط أورخون" },
        AT: { meaning: "الحركة، التقدم", anadolu: "ألاجاهويوك", asya: "حوض التاي" },
        ER: { meaning: "الوجود، الهوية", anadolu: "حاتوشا", asya: "إيسيك كول" },
        EL: { meaning: "المجتمع، الوحدة", anadolu: "يازيلي كايا", asya: "حوض طلاس" }
      }
    },
    PT: {
      flag: "🇵🇹", label: "Português",
      title: "SISTEMA DE INFORMAÇÃO YKOS", subtitle: "Banco de Dados Algorítmico Interdisciplinar de Cultura e Língua",
      searchPlaceholder: "🔍 Pesquisar selo, sílaba, país, centro antigo...",
      systemStatus: "Status do Sistema", statusActive: "ATIVO", matricesTitle: "MATRIZES E CAMADAS",
      rightPanelTitle: "⚡ SOLUÇÕES E ÍNDICES YKOS",
      rightPanelDesc: "* Clique nas soluções para ir diretamente às matrizes de leitura.",
      solutions: {
        gobeklitepe: "📜 Leitura YKOS do Pilar T de Gobeklitepe",
        etrusk: "📜 Inscrição Etrusca de Lemnos e Correspondência",
        kulliyat: "📚 Catálogo de Símbolos YKOS em 11 Volumes"
      },
      engineText: "Conexão do Motor Ao Vivo", backToHome: "✖ Início", moduleTitle: "MÓDULO YKOS",
      searchResultsTitle: "🔍 Resultados da Pesquisa", noResults: "Nenhum registro encontrado.",
      nav: { kurumsal: "CORPORATIVO", metodoloji: "METODOLOGIA YKOS", kokHece: "MATRIZ DE RAÍZ", damgaAtlasi: "ATLAS DE SELOS", analizEngine: "MOTOR DE ANÁLISE", flowMap: "MAPA DE MIGRAÇÃO", kulliyat: "OBRAS COMPLETAS", dijitalArsiv: "ARQUIVO DIGITAL" },
      stats: ["Países", "Pesquisas", "Selos", "Petróglifos", "Inscrições", "Fontes", "Imagens", "Atlasses"],
      labels: { phonetic: "Raiz Fonética", semantic: "Camada Semântica", anatolian: "Foco Anatólio", asian: "Linha Asiática", coherence: "Coerência da Matriz", rootPrefix: "Raiz", category: "Categoria", location: "Centro Antigo" },
      catalog: { all: "Todos", stamps: "Selos", petróglifos: "Petróglifos", inspect: "Inspecionar" },
      analysis: { title: "Motor de Leitura Algorítmica YKOS", geometryTab: "📐 Vetor Geométrico", directionTab: "🏹 Fluxo Vetorial", phoneticTab: "𐰸 Matriz Fonética", confidence: "Precisão" },
      map: { title: "Mapa de Migração Antiga", route1: "Anatólia ➔ Ásia", route2: "Anatólia ➔ Europa", origin: "Origem", destination: "Destino", stampsTransferred: "Selos Transferidos" },
      heceDetails: {
        OK: { meaning: "Direção, Ascensão, Conexão", anadolu: "Gobeklitepe", asya: "Linha Orkhon" },
        AT: { meaning: "Movimento, Progresso", anadolu: "Alacahoyuk", asya: "Bacia Altai" },
        ER: { meaning: "Existência, Identidade", anadolu: "Hattusa", asya: "Issyk Kul" },
        EL: { meaning: "Comunidade, Unidade", anadolu: "Yazilikaya", asya: "Bacia Talas" }
      }
    }
  };

  const t = i18n[currentLang] || i18n.TR;

  const solutionsData = {
    YAZIT_01: {
      title: t.solutions.gobeklitepe,
      stampsUsed: "OK (𐰸) + BAL (🗿) + AT (𐰡)",
      decipheredText: "Kök Ok-Er Yayılım Aksı / Güneş Yolu",
      method: "YKOS Geometrik & Fonetik Katman Analizi",
      status: "TAMAMLANDI (%99.8)"
    },
    YAZIT_02: {
      title: t.solutions.etrusk,
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

          {/* LOGO VE BAŞLIK GRUBU */}
          <div 
            onClick={handleResetToHome}
            style={{ 
              display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "3px",
              cursor: "pointer", userSelect: "none"
            }}
          >
            <div 
              style={{
                border: "1.5px solid #d4af37", borderRadius: "50%", padding: "4px 12px", fontSize: "12px",
                fontWeight: "bold", color: "#d4af37", backgroundColor: "#0f0d08", boxShadow: "0 0 10px rgba(212, 175, 55, 0.3)",
                transition: "transform 0.2s ease"
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

          {/* 10 DİLLİ SEÇİM AÇILIR MENÜSÜ */}
          <div style={{ textAlign: "right", position: "relative" }}>
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              style={{
                backgroundColor: "#110f0a", border: "1.5px solid #d4af37", color: "#d4af37", padding: "6px 14px",
                borderRadius: "6px", cursor: "pointer", fontSize: "11px", fontWeight: "bold", letterSpacing: "0.8px",
                display: "inline-flex", alignItems: "center", gap: "6px"
              }}
            >
              <span>{i18n[currentLang]?.flag || "🇹🇷"}</span>
              <span>{currentLang}</span>
              <span style={{ fontSize: "8px" }}>▼</span>
            </button>

            {showLangMenu && (
              <div style={{
                position: "absolute", right: 0, top: "35px", backgroundColor: "#0d0c08",
                border: "1.5px solid #d4af37", borderRadius: "8px", boxShadow: "0 0 15px rgba(0,0,0,0.9)",
                zIndex: 100, display: "grid", gridTemplateColumns: "1fr", minWidth: "160px", maxHeight: "320px", overflowY: "auto"
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

        {/* MENÜ GEÇİŞLERİ */}
        <nav style={{ display: "flex", justifyContent: "center", gap: "6px", borderTop: "1px solid #332a15", paddingTop: "8px" }}>
          {navMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMatrix(activeMatrix === item.id ? null : item.id)}
              style={{
                background: activeMatrix === item.id ? "#2a220d" : "#110f0a",
                border: activeMatrix === item.id ? "1.5px solid #d4af37" : "1px solid #332a15",
                color: activeMatrix === item.id ? "#d4af37" : "#bbb",
                padding: "6px 14px", borderRadius: "5px", cursor: "pointer", fontSize: "10.5px", fontWeight: "bold", letterSpacing: "0.6px",
                boxShadow: activeMatrix === item.id ? "0 0 8px rgba(212, 175, 55, 0.3)" : "none"
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      {/* 2. CANLI ARAMA BARI */}
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

      {/* 4. AÇILIR MODÜL PANELİ */}
      {activeMatrix && (
        <div style={{ 
          border: "2px solid #d4af37", borderRadius: "10px", backgroundColor: "#0d0c08", padding: "18px",
          boxShadow: "0 0 20px rgba(212, 175, 55, 0.2)", marginBottom: "12px"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "1.5px solid #554218", paddingBottom: "10px" }}>
            <h2 style={{ margin: 0, color: "#d4af37", fontSize: "16px", letterSpacing: "1px" }}>
              📂 {t.moduleTitle}: <span style={{ color: "#fff" }}>{activeMatrix}</span>
            </h2>
            <button onClick={() => setActiveMatrix(null)} style={{ padding: "5px 12px", borderRadius: "5px", border: "1px solid #d4af37", backgroundColor: "#1f190a", color: "#d4af37", fontWeight: "bold", cursor: "pointer", fontSize: "11px" }}>
              ✖ {t.backToHome}
            </button>
          </div>

          {activeMatrix === "METODOLOJI" && (
            <div style={{ padding: "10px", color: "#ddd", fontSize: "13px", lineHeight: "1.6" }}>
              <h3 style={{ color: "#d4af37", marginTop: 0 }}>YKOS Metodolojisi ve Okuma Sistematiği</h3>
              <p>Yaşar Kaba Okuma Sistemi (YKOS); kadim yazıtlardaki sembol, damga ve petroglifleri kök hece matrisleri ve geometrik akslar üzerinden çözümleyen disiplinler arası bir analiz modelidir.</p>
            </div>
          )}

          {activeMatrix === "KOK_HECE" && (
            <div>
              <div style={{ display: "flex", gap: "8px", marginBottom: "15px" }}>
                {Object.keys(kokHeceVerileri).map((hece) => (
                  <button key={hece} onClick={() => setSelectedHece(hece)} style={{ padding: "7px 16px", borderRadius: "5px", border: selectedHece === hece ? "1.5px solid #d4af37" : "1px solid #332a15", backgroundColor: selectedHece === hece ? "#2a220d" : "#111", color: selectedHece === hece ? "#d4af37" : "#aaa", fontWeight: "bold", cursor: "pointer", fontSize: "12px" }}>
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

          {(activeMatrix === "DAMGA_ATLASI" || activeMatrix === "PETROGLİFLER" || activeMatrix === "PETROGLYPHS") && (
            <div>
              <div style={{ display: "flex", gap: "8px", marginBottom: "15px" }}>
                <button onClick={() => setCatalogFilter("ALL")} style={{ padding: "6px 14px", borderRadius: "5px", border: catalogFilter === "ALL" ? "1.5px solid #d4af37" : "1px solid #332a15", backgroundColor: catalogFilter === "ALL" ? "#2a220d" : "#111", color: catalogFilter === "ALL" ? "#d4af37" : "#aaa", fontSize: "11px", fontWeight: "bold", cursor: "pointer" }}>🌐 {t.catalog.all} ({catalogItems.length})</button>
                <button onClick={() => setCatalogFilter("DAMGA")} style={{ padding: "6px 14px", borderRadius: "5px", border: catalogFilter === "DAMGA" ? "1.5px solid #d4af37" : "1px solid #332a15", backgroundColor: catalogFilter === "DAMGA" ? "#2a220d" : "#111", color: catalogFilter === "DAMGA" ? "#d4af37" : "#aaa", fontSize: "11px", fontWeight: "bold", cursor: "pointer" }}>🔷 {t.catalog.stamps}</button>
                <button onClick={() => setCatalogFilter("PETROGLIF")} style={{ padding: "6px 14px", borderRadius: "5px", border: catalogFilter === "PETROGLIF" ? "1.5px solid #d4af37" : "1px solid #332a15", backgroundColor: catalogFilter === "PETROGLIF" ? "#2a220d" : "#111", color: catalogFilter === "PETROGLIF" ? "#d4af37" : "#aaa", fontSize: "11px", fontWeight: "bold", cursor: "pointer" }}>🗿 {t.catalog.petroglyphs}</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px" }}>
                {filteredCatalog.map((item) => (
                  <div key={item.id} style={{ backgroundColor: "#050505", border: "1px solid #554218", borderRadius: "8px", padding: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div style={{ backgroundColor: "#14120b", border: "1px solid #332a15", borderRadius: "6px", height: "100px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px" }}>{item.icon}</div>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: "bold", color: "#d4af37" }}>{item.title}</div>
                      <div style={{ fontSize: "10px", color: "#aaa", marginTop: "2px" }}>📍 {item.location}</div>
                      <div style={{ fontSize: "10px", color: "#777", marginTop: "1px" }}>⏳ {item.period}</div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: "6px", borderTop: "1px dashed #222" }}>
                      <span style={{ fontSize: "10px", color: "#0f0", fontWeight: "bold" }}>Kök: [{item.kok}]</span>
                      <button onClick={() => setSelectedItemModal(item)} style={{ padding: "4px 8px", backgroundColor: "#1f190a", border: "1px solid #d4af37", color: "#d4af37", borderRadius: "4px", fontSize: "10px", fontWeight: "bold", cursor: "pointer" }}>🔍 {t.catalog.inspect}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeMatrix === "ANALIZ_ENGINE" && (
            <div>
              <div style={{ fontSize: "13px", color: "#d4af37", fontWeight: "bold", marginBottom: "12px" }}>🔬 {t.analysis.title}</div>
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
                  <button key={key} onClick={() => setSelectedAnalyzeItem(key)} style={{ padding: "8px 14px", borderRadius: "6px", border: selectedAnalyzeItem === key ? "1.5px solid #d4af37" : "1px solid #332a15", backgroundColor: selectedAnalyzeItem === key ? "#2a220d" : "#111", color: selectedAnalyzeItem === key ? "#d4af37" : "#aaa", fontSize: "11px", fontWeight: "bold", cursor: "pointer" }}>
                    {analysisData[key].icon} {analysisData[key].name}
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", gap: "6px", borderBottom: "1px solid #332a15", paddingBottom: "8px", marginBottom: "15px" }}>
                <button onClick={() => setActiveAnalysisLayer("GEOMETRY")} style={{ padding: "6px 12px", background: activeAnalysisLayer === "GEOMETRY" ? "#1f190a" : "transparent", border: activeAnalysisLayer === "GEOMETRY" ? "1px solid #d4af37" : "none", color: activeAnalysisLayer === "GEOMETRY" ? "#d4af37" : "#888", borderRadius: "4px", cursor: "pointer", fontSize: "11px", fontWeight: "bold" }}>{t.analysis.geometryTab}</button>
                <button onClick={() => setActiveAnalysisLayer("DIRECTION")} style={{ padding: "6px 12px", background: activeAnalysisLayer === "DIRECTION" ? "#1f190a" : "transparent", border: activeAnalysisLayer === "DIRECTION" ? "1px solid #d4af37" : "none", color: activeAnalysisLayer === "DIRECTION" ? "#d4af37" : "#888", borderRadius: "4px", cursor: "pointer", fontSize: "11px", fontWeight: "bold" }}>{t.analysis.directionTab}</button>
                <button onClick={() => setActiveAnalysisLayer("PHONETIC")} style={{ padding: "6px 12px", background: activeAnalysisLayer === "PHONETIC" ? "#1f190a" : "transparent", border: activeAnalysisLayer === "PHONETIC" ? "1px solid #d4af37" : "none", color: activeAnalysisLayer === "PHONETIC" ? "#d4af37" : "#888", borderRadius: "4px", cursor: "pointer", fontSize: "11px", fontWeight: "bold" }}>{t.analysis.phoneticTab}</button>
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

          {activeMatrix === "FLOW_MAP" && (
            <div>
              <div style={{ fontSize: "13px", color: "#d4af37", fontWeight: "bold", marginBottom: "12px" }}>🌍 {t.map.title}</div>
              <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
                <button onClick={() => setSelectedRoute("ANATOLIA_ASIA")} style={{ padding: "8px 14px", borderRadius: "6px", border: selectedRoute === "ANATOLIA_ASIA" ? "1.5px solid #d4af37" : "1px solid #332a15", backgroundColor: selectedRoute === "ANATOLIA_ASIA" ? "#2a220d" : "#111", color: selectedRoute === "ANATOLIA_ASIA" ? "#d4af37" : "#aaa", fontSize: "11px", fontWeight: "bold", cursor: "pointer" }}>📍 {t.map.route1}</button>
                <button onClick={() => setSelectedRoute("ANATOLIA_EUROPE")} style={{ padding: "8px 14px", borderRadius: "6px", border: selectedRoute === "ANATOLIA_EUROPE" ? "1.5px solid #d4af37" : "1px solid #332a15", backgroundColor: selectedRoute === "ANATOLIA_EUROPE" ? "#2a220d" : "#111", color: selectedRoute === "ANATOLIA_EUROPE" ? "#d4af37" : "#aaa", fontSize: "11px", fontWeight: "bold", cursor: "pointer" }}>📍 {t.map.route2}</button>
              </div>
              <div style={{ backgroundColor: "#050505", border: "1px solid #554218", borderRadius: "8px", padding: "18px" }}>
                <div style={{ backgroundColor: "#0d0c08", border: "1.5px solid #d4af37", borderRadius: "8px", padding: "30px", marginBottom: "15px", textAlign: "center", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: "10px", left: "10px", fontSize: "10px", color: "#0f0", border: "1px solid #0f0", padding: "2px 8px", borderRadius: "4px" }}>LIVE FLOW VECTOR</div>
                  <div style={{ fontSize: "18px", fontWeight: "bold", color: "#d4af37", marginBottom: "15px" }}>{currentRoute.title}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "600px", margin: "0 auto", padding: "20px 0" }}>
                    <div style={{ border: "1px solid #60a5fa", borderRadius: "8px", padding: "12px", backgroundColor: "#0a192f", minWidth: "140px" }}>
                      <div style={{ fontSize: "20px" }}>🏛️</div>
                      <div style={{ fontSize: "11px", fontWeight: "bold", color: "#60a5fa" }}>ANADOLU</div>
                      <div style={{ fontSize: "9px", color: "#aaa" }}>Merkez Odak</div>
                    </div>
                    <div style={{ flex: 1, height: "2px", backgroundColor: "#d4af37", position: "relative", margin: "0 15px", boxShadow: "0 0 10px #d4af37" }}><span style={{ position: "absolute", top: "-10px", left: "45%", fontSize: "14px" }}>➔ ➔ ➔</span></div>
                    <div style={{ border: "1px solid #a855f7", borderRadius: "8px", padding: "12px", backgroundColor: "#1e102a", minWidth: "140px" }}>
                      <div style={{ fontSize: "20px" }}>🏔️</div>
                      <div style={{ fontSize: "11px", fontWeight: "bold", color: "#a855f7" }}>YAYILIM HAVZASI</div>
                      <div style={{ fontSize: "9px", color: "#aaa" }}>Varış Noktası</div>
                    </div>
                  </div>
                  <p style={{ fontSize: "11px", color: "#bbb", margin: "10px 0 0 0", fontStyle: "italic" }}>"{currentRoute.description}"</p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", fontSize: "12px" }}>
                  <div style={{ background: "#111", padding: "10px", borderRadius: "6px", border: "1px solid #332a15" }}><strong style={{ color: "#d4af37", display: "block", marginBottom: "3px" }}>{t.map.origin}:</strong><span style={{ color: "#60a5fa" }}>{currentRoute.origin}</span></div>
                  <div style={{ background: "#111", padding: "10px", borderRadius: "6px", border: "1px solid #332a15" }}><strong style={{ color: "#d4af37", display: "block", marginBottom: "3px" }}>{t.map.destination}:</strong><span style={{ color: "#a855f7" }}>{currentRoute.destination}</span></div>
                  <div style={{ background: "#111", padding: "10px", borderRadius: "6px", border: "1px solid #332a15" }}><strong style={{ color: "#d4af37", display: "block", marginBottom: "3px" }}>{t.map.stampsTransferred}:</strong><span style={{ color: "#0f0", fontWeight: "bold" }}>{currentRoute.stamps}</span></div>
                </div>
              </div>
            </div>
          )}

          {(activeMatrix === "KULLIYAT" || activeMatrix === "DIJITAL_ARSIV" || activeMatrix === "KURUMSAL") && (
            <div style={{ textAlign: "center", padding: "20px 0", color: "#aaa" }}>
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>📚</div>
              <h3 style={{ color: "#d4af37", margin: 0 }}>YKOS 11 Ciltlik Akademik Külliyat ve Dijital Arşiv</h3>
              <p style={{ fontSize: "12px", marginTop: "6px", color: "#888" }}>Küresel sembol sistemleri ve Ön Türkçe damga indeksleri taranmaktadır.</p>
            </div>
          )}
        </div>
      )}

      {/* 5. ALT PANEL (SAĞ ALT ÇÖZÜMLEMELER %100 DİNAMİKLEŞTİRİLDİ) */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "12px", marginBottom: "12px" }}>
        <div style={{ border: "1.5px solid #8c7126", borderRadius: "10px", backgroundColor: "#0a0a0a", padding: "18px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <h3 style={{ margin: 0, color: "#d4af37", fontSize: "15px", letterSpacing: "1px" }}>{t.matricesTitle}</h3>
          <div onClick={() => setActiveMatrix(activeMatrix === "KOK_HECE" ? null : "KOK_HECE")} style={{ color: activeMatrix === "KOK_HECE" ? "#d4af37" : "#fff", fontWeight: "bold", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px" }}>▶ 🔤 {t.nav.kokHece}</div>
          <div onClick={() => setActiveMatrix(activeMatrix === "DAMGA_ATLASI" ? null : "DAMGA_ATLASI")} style={{ color: activeMatrix === "DAMGA_ATLASI" ? "#d4af37" : "#fff", fontWeight: "bold", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px" }}>▶ 🗺️ {t.nav.damgaAtlasi}</div>
          <div onClick={() => setActiveMatrix(activeMatrix === "ANALIZ_ENGINE" ? null : "ANALIZ_ENGINE")} style={{ color: activeMatrix === "ANALIZ_ENGINE" ? "#d4af37" : "#fff", fontWeight: "bold", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px" }}>▶ 🔬 {t.nav.analizEngine}</div>
          <div onClick={() => setActiveMatrix(activeMatrix === "FLOW_MAP" ? null : "FLOW_MAP")} style={{ color: activeMatrix === "FLOW_MAP" ? "#d4af37" : "#fff", fontWeight: "bold", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px" }}>▶ 🌍 {t.nav.flowMap}</div>
          <div onClick={() => setActiveMatrix(activeMatrix === "DIJITAL_ARSIV" ? null : "DIJITAL_ARSIV")} style={{ color: activeMatrix === "DIJITAL_ARSIV" ? "#d4af37" : "#fff", fontWeight: "bold", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px" }}>▶ 📚 {t.nav.dijitalArsiv}</div>
          {data && (
            <div style={{ marginTop: "auto", paddingTop: "8px", borderTop: "1px solid #332a15", fontSize: "10.5px", color: "#0f0" }}>⚡ {t.engineText} (Tick): {data.tick} | Flux: {data.quantumFlux}</div>
          )}
        </div>

        {/* SAĞ PANEL DİNAMİK BAĞLANTI */}
        <div style={{ border: "1.5px solid #8c7126", borderRadius: "10px", backgroundColor: "#0a0a0a", padding: "18px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <h3 style={{ margin: 0, color: "#d4af37", fontSize: "13.5px", letterSpacing: "0.8px" }}>{t.rightPanelTitle}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <button onClick={() => { setSelectedSolution("YAZIT_01"); setActiveMatrix("ANALIZ_ENGINE"); }} style={{ padding: "10px", borderRadius: "6px", border: "1px solid #554218", backgroundColor: "#12100b", color: "#d4af37", fontWeight: "bold", cursor: "pointer", textAlign: "left", fontSize: "11px" }}>
              {t.solutions.gobeklitepe}
            </button>
            <button onClick={() => { setSelectedSolution("YAZIT_02"); setActiveMatrix("ANALIZ_ENGINE"); }} style={{ padding: "10px", borderRadius: "6px", border: "1px solid #554218", backgroundColor: "#12100b", color: "#d4af37", fontWeight: "bold", cursor: "pointer", textAlign: "left", fontSize: "11px" }}>
              {t.solutions.etrusk}
            </button>
            <button onClick={() => setActiveMatrix("KULLIYAT")} style={{ padding: "10px", borderRadius: "6px", border: "1px solid #554218", backgroundColor: "#12100b", color: "#aaa", fontWeight: "bold", cursor: "pointer", textAlign: "left", fontSize: "11px" }}>
              {t.solutions.kulliyat}
            </button>
          </div>
          <div style={{ marginTop: "auto", padding: "8px", backgroundColor: "#111", border: "1px solid #332a15", borderRadius: "6px", fontSize: "10px", color: "#888" }}>
            {t.rightPanelDesc}
          </div>
        </div>
      </div>

      {/* DETAY MODALI */}
      {selectedItemModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.85)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
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
            <button onClick={() => setSelectedItemModal(null)} style={{ width: "100%", marginTop: "15px", padding: "8px", backgroundColor: "#1f190a", border: "1px solid #d4af37", color: "#d4af37", fontWeight: "bold", borderRadius: "5px", cursor: "pointer" }}>Kapat</button>
          </div>
        </div>
      )}

    </div>
  );
}
