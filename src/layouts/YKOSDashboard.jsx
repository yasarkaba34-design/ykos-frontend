// src/layouts/YKOSDashboard.jsx
import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import { translations } from "../data/i18n";

export default function YKOSDashboard({
  currentLang,
  setCurrentLang,
  onVisualize,
  onNavigateRead,
  onNavigateLogin,
  onNavigateAtlas,
  onNavigateEngine,
  onNavigateFlow,
  onNavigateMethod,
  onNavigateAcikVeri,
  onNavigateOpsCenter,
  onOpenPoetryModal,
  onNavigateVideo,
  onNavigateLiterature,
}) {
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const t = translations[currentLang] || translations.TR;

  const languages = [
    { code: "TR", label: "Türkçe" }, { code: "EN", label: "English" },
    { code: "FR", label: "Français" }, { code: "RU", label: "Русский" },
    { code: "ZH", label: "中文" }, { code: "JA", label: "日本語" },
    { code: "PT", label: "Português" }, { code: "ES", label: "Español" },
    { code: "AR", label: "العربية" }, { code: "DE", label: "Deutsch" },
  ];

  const initialStats = [
    { icon: "🌐", count: "214", label: t.countries },
    { icon: "🏛️", count: "248", label: t.researches },
    { icon: "🔷", count: "9.870", label: t.stamps },
    { icon: "🗿", count: "18.420", label: t.petroglyphs },
    { icon: "📜", count: "4.132", label: t.inscriptions },
    { icon: "📚", count: "12.580", label: t.sources },
    { icon: "📷", count: "46.900", label: t.images },
    { icon: "🗺️", count: "58", label: t.atlases },
  ];

  const cardStyle = {
    backgroundColor: "#050811",
    border: "1px solid #ffd700",
    borderRadius: "12px",
    padding: "14px 18px",
    marginBottom: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.7)",
  };

  // SOL VE ORTA: Orijinal Yeşil Başlıklı Arşiv Kartları (2 Sütunlu Izgara)
  const gridCards = [
    {
      id: "C-1",
      title: "ANADOLU TARİHÇESİNDE HİLAL-YILDIZ DAMGASI",
      desc: "Bu dosya, Hilal-Yıldız damgasının Anadolu kültür tarihindeki erken kök safhası, sembolik kozmik denge kavramı...",
      isNew: true,
    },
    {
      id: "C-2",
      title: "ANADOLU DAMGALARI KAPSAMINDA DEĞERLENDİRME",
      desc: "Anadolu damgaları kronolojisi, arkeolojik bağlamı, geometrik yapı ve kökensel ilişkileriyle YKOS veritabanında s...",
      isNew: true,
    },
    {
      id: "C-3",
      title: "HAYAT AĞACI",
      desc: "Hayat Ağacı damgası Urartu botanik İBDAK dikey yükseliş aksı ve tarihsel kronolojisiyle YKOS Sembol Atlası'n...",
      isNew: true,
    },
    {
      id: "C-4",
      title: "ÇEMBER İÇİNDE EŞ KOLLU HAÇ",
      desc: "Çember içinde eş kollu haç, dörtlü aks yapısı ve koruyucu çember sembolizmiyle tarihsel kronoloji kapsamınd...",
      isNew: true,
    },
    {
      id: "C-5",
      title: "(Öksökö / Çift Başlı Koruyucu Kuş)",
      desc: "Çift başlı kartal, Öksökö kökeni, koruyucu kuş sembolizmi ve Anadolu kök safhasındaki tarihsel kronolojisiyle...",
      isNew: true,
    },
    {
      id: "C-6",
      title: "(Döner Çark / Dairesel Dört Kollu Form)",
      desc: "Çarkıfelek, döner çark yapısı, dairesel dört kollu formu ve erken Kök Safhası MÖ 6000-2000 kronolojisiyle YKO...",
      isNew: true,
    },
    {
      id: "M-1",
      title: "SEMBOLİK SAHİPLENME VE ADAPTASYON KAFA KARIŞTIRIYOR",
      desc: "Son katmanın kökeni temsil ettiği yanılgısı, Anadolu buluntularında ikonografik formlar ile geç epigrafik müd...",
      isNew: true,
    },
    {
      id: "M-2",
      title: "ANADOLU'NUN 12.000 YILLIK DİL VE KÜLTÜR KATMANLARI VE BATI",
      desc: "Anadolu'nun 12.000 yıllık dil ve kültür katmanları ile geç dönem Batı merkezli riyad yazıları nedir? YKOS ra...",
      isNew: true,
    },
    {
      id: "M-3",
      title: "Endonezya Petroglifleri",
      desc: "Endonezya kaya sanatı, Sulawesi ve Kalimantan'daki 40.000 yıllık figüratif örnekleriyle insanlığın en eski g5...",
      isNew: false,
    },
    {
      id: "M-4",
      title: "YOROS KALESİ VE DÖRT KOL İZLERİ",
      desc: "Yoros Kalesi'ndeki dört kollu motifli taş, fotoğraflar ve arkeolojik verilerle YKOS karşılaştırma yöntemi bul...",
      isNew: true,
    },
    {
      id: "MATRIX-LINK",
      title: "Matrisler",
      desc: "https://ykos-kure.vercel.app/",
      isMatrixCard: true,
    },
    {
      id: "C-11",
      title: "Çatalhöyük Dairesel Damga Motifleri",
      desc: "Çatalhöyük duvar resimlerindeki dairesel damgaların YKOS 100 okuması.",
      badge: "Kök: ÇEV / BA",
      subBadge: "Damga",
      isNew: false,
    },
    {
      id: "M-7",
      title: "Çatalhöyük Kök Hece ve Damga Sembolizmi",
      desc: "Çatalhöyük duvar resimlerindeki YKOS 100 eşleşmeleri.",
      isNew: false,
    },
    {
      id: "M-8",
      title: "Göbeklitepe T-Sütunu YKOS Okuması",
      desc: "Şanlıurfa Göbeklitepe T-Sütunları üzerindeki semboller.",
      isNew: false,
    },
    {
      id: "M-5",
      title: "Etrüsk Lemnos Kitabesi & Ön Türkçe Eşleşmesi",
      desc: "Lemnos mezar taşındaki alfabetik dizilimin okunması.",
      isNew: false,
    },
    {
      id: "M-6",
      title: "YOL Kök Hecesi ve Akış Teorisi",
      desc: "Dile dahil ontolojik mantığın dilbilimsel matrisi.",
      isNew: false,
    },
  ];

  // SAĞ SÜTUN: YKOS.ORG GİRİŞ VE PORTAL AKIŞI
  const ykosOrgEntries = [
    {
      title: "YKOS.ORG PORTAL ANA GİRİŞİ",
      desc: "ykos.org uluslararası araştırma arşivi, külliyat veritabanı ve dijital merkez portalı.",
      url: "https://ykos.org",
      tag: "ANA GİRİŞ",
      icon: "🏛️"
    },
    {
      title: "Külliyat & Makale Havuzu",
      desc: "Anadolu kök-hece, tamga ve epigrafik analiz dosyaları tam metin yayını.",
      url: "https://ykos.org",
      tag: "KÜLLİYAT",
      icon: "📚"
    },
    {
      title: "Açık Veri & Araştırma Dökümleri",
      desc: "Kaya resimleri, Göbeklitepe ve Avrasya petroglif veri setleri.",
      url: "https://ykos.org",
      tag: "AÇIK VERİ",
      icon: "🌐"
    },
    {
      title: "Akademik İndeks ve Bildiriler",
      desc: "Disiplinler arası dilbilim ve tarih araştırmaları resmi yayın bülteni.",
      url: "https://ykos.org",
      tag: "BİLDİRİ",
      icon: "📜"
    }
  ];

  const filteredGridCards = gridCards.filter((card) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return card.title.toLowerCase().includes(q) || (card.desc && card.desc.toLowerCase().includes(q));
  });

  const handleCardClick = (card) => {
    if (card.isMatrixCard) {
      window.open("https://ykos-kure.vercel.app/", "_blank");
    } else {
      onNavigateRead(card.id);
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: "1280px", margin: "0 auto", padding: "10px", color: "#ffffff", fontFamily: "Segoe UI, sans-serif" }}>
      
      {/* HEADER */}
      <div style={{ ...cardStyle, padding: "6px 24px 8px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2px" }}>
          <button
            onClick={() => { setMenuOpen(!menuOpen); setLangOpen(false); }}
            style={{ background: menuOpen ? "rgba(255, 215, 0, 0.25)" : "rgba(255, 215, 0, 0.1)", border: "2px solid #ffd700", color: "#ffd700", padding: "8px 22px", borderRadius: "8px", fontWeight: "900", cursor: "pointer", fontSize: "1rem", textTransform: "uppercase" }}
          >
            {t.menu}
          </button>

          <div style={{ position: "relative" }}>
            <button
              onClick={() => { setLangOpen(!langOpen); setMenuOpen(false); }}
              style={{ background: "rgba(255,215,0,0.05)", border: "2px solid #ffd700", color: "#ffd700", padding: "8px 18px", borderRadius: "8px", fontWeight: "900", cursor: "pointer", fontSize: "1rem" }}
            >
              🌐 {currentLang} ▾
            </button>
            {langOpen && (
              <div style={{ position: "absolute", right: 0, top: "120%", backgroundColor: "#050811", border: "2px solid #ffd700", borderRadius: "10px", display: "flex", flexDirection: "column", minWidth: "180px", zIndex: 1000, padding: "8px" }}>
                {languages.map((l) => (
                  <button key={l.code} onClick={() => { setCurrentLang(l.code); setLangOpen(false); }} style={{ background: currentLang === l.code ? "rgba(255,215,0,0.2)" : "transparent", border: "none", color: currentLang === l.code ? "#ffd700" : "#fff", padding: "10px 14px", textAlign: "left", fontSize: "0.9rem", cursor: "pointer" }}>
                    {l.label} ({l.code})
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Logo ve Başlık */}
        <div onClick={() => window.location.reload()} title="Sayfayı Yenile" style={{ textAlign: "center", cursor: "pointer", marginTop: "-6px" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "2px" }}>
            <img src="/ykos-logo.png" alt="YKOS Kartal Amblemi" style={{ maxHeight: "110px", maxWidth: "100%", objectFit: "contain", filter: "drop-shadow(0px 0px 12px rgba(255, 215, 0, 0.6))" }} onError={(e) => { e.target.style.display = "none"; }} />
          </div>
          <h1 style={{ color: "#ffd700", fontSize: "1.65rem", fontWeight: "900", margin: "0", letterSpacing: "1.2px" }}>{t.systemTitle}</h1>
          <p style={{ color: "#aaaaaa", fontSize: "0.8rem", margin: "1px 0 0 0" }}>{t.subTitle}</p>
        </div>

        {menuOpen && (
          <div style={{ marginTop: "10px", borderTop: "1px solid rgba(255, 215, 0, 0.3)", paddingTop: "10px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "6px", marginBottom: "8px" }}>
              <button onClick={() => window.location.reload()} style={{ background: "rgba(255, 215, 0, 0.3)", border: "1.5px solid #ffd700", color: "#ffd700", padding: "6px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: "bold", cursor: "pointer" }}>{t.home}</button>
              <button onClick={() => { setMenuOpen(false); onNavigateMethod(); }} style={{ background: "rgba(255,255,255,0.02)", border: "1.5px solid rgba(255,215,0,0.3)", color: "#ccc", padding: "6px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: "bold", cursor: "pointer" }}>{t.corporate}</button>
              <button onClick={() => { setMenuOpen(false); onNavigateMethod(); }} style={{ background: "rgba(255,255,255,0.02)", border: "1.5px solid rgba(255,215,0,0.3)", color: "#ccc", padding: "6px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: "bold", cursor: "pointer" }}>{t.methodology}</button>
              <button onClick={() => { setMenuOpen(false); onVisualize(); }} style={{ background: "rgba(255, 215, 0, 0.15)", border: "1.5px solid #ffd700", color: "#ffd700", padding: "6px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: "bold", cursor: "pointer" }}>{t.matrix}</button>
              <button onClick={() => { setMenuOpen(false); onNavigateAtlas(); }} style={{ background: "rgba(255,255,255,0.02)", border: "1.5px solid rgba(255,215,0,0.3)", color: "#ccc", padding: "6px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: "bold", cursor: "pointer" }}>{t.atlas}</button>
              <button onClick={() => { setMenuOpen(false); onNavigateEngine(); }} style={{ background: "rgba(255,255,255,0.02)", border: "1.5px solid rgba(255,215,0,0.3)", color: "#ccc", padding: "6px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: "bold", cursor: "pointer" }}>{t.engine}</button>
              <button onClick={() => { setMenuOpen(false); onNavigateFlow(); }} style={{ background: "rgba(255,255,255,0.02)", border: "1.5px solid rgba(255,215,0,0.3)", color: "#ccc", padding: "6px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: "bold", cursor: "pointer" }}>{t.flow}</button>
              {onNavigateVideo && <button onClick={() => { setMenuOpen(false); onNavigateVideo(); }} style={{ background: "rgba(255,255,255,0.02)", border: "1.5px solid rgba(255,215,0,0.3)", color: "#ccc", padding: "6px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: "bold", cursor: "pointer" }}>🎥 Video</button>}
              {onNavigateLiterature && <button onClick={() => { setMenuOpen(false); onNavigateLiterature(); }} style={{ background: "rgba(255,255,255,0.02)", border: "1.5px solid rgba(255,215,0,0.3)", color: "#ccc", padding: "6px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: "bold", cursor: "pointer" }}>📚 Edebiyat</button>}
              {onNavigateOpsCenter && <button onClick={() => { setMenuOpen(false); onNavigateOpsCenter(); }} style={{ background: "rgba(255, 215, 0, 0.25)", border: "1px solid #ffd700", color: "#ffd700", padding: "6px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: "bold", cursor: "pointer" }}>⚙️ Operasyon Merkezi</button>}
              {onOpenPoetryModal && <button onClick={() => { setMenuOpen(false); onOpenPoetryModal(); }} style={{ background: "linear-gradient(135deg, rgba(255,215,0,0.15), rgba(184,134,11,0.1))", border: "1px solid #ffd700", color: "#ffd700", padding: "6px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: "bold", cursor: "pointer" }}>🎵 Kozmik Şiir & Felsefe</button>}
            </div>

            <div style={{ display: "flex", justifyContent: "center", paddingTop: "8px", borderTop: "1px dashed rgba(255, 215, 0, 0.25)" }}>
              <button onClick={() => { setMenuOpen(false); onNavigateLogin("admin"); }} style={{ background: "linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(184, 134, 11, 0.1))", border: "1px solid rgba(255, 215, 0, 0.5)", color: "#ffd700", padding: "8px 24px", borderRadius: "6px", fontSize: "0.8rem", fontWeight: "800", cursor: "pointer" }}>
                🔒 {t.adminLogin}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ARAMA BARI */}
      <div style={{ marginBottom: "12px" }}>
        <SearchBar onSearch={(q) => setSearchQuery(q)} />
      </div>

      {/* SAYAÇLAR */}
      <div style={cardStyle}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: "10px" }}>
          {initialStats.map((item, idx) => (
            <div key={idx} style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 215, 0, 0.25)", borderRadius: "8px", padding: "8px 4px", textAlign: "center" }}>
              <span style={{ fontSize: "1rem" }}>{item.icon}</span>
              <div style={{ color: "#fff", fontWeight: "900", fontSize: "0.95rem" }}>{item.count}</div>
              <div style={{ color: "#888", fontSize: "0.65rem", fontWeight: "bold" }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ANA GÖVDE: SOLDA 2 SÜTUNLU ORİJİNAL ARŞİV + SAĞDA YKOS.ORG GİRİŞİ */}
      <div style={{ ...cardStyle, display: "flex", flexDirection: "column" }}>
        <h3 style={{ color: "#ffd700", fontSize: "1.05rem", marginTop: 0, borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "8px", marginBottom: "12px" }}>
          ⚡ {t.solutionsTitle}
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "2.3fr 1fr", gap: "14px", minHeight: "440px", maxHeight: "560px" }}>
          
          {/* SOL-ORTA BÖLÜM: ORİJİNAL 2 SÜTUNLU YEŞİL BAŞLIKLI KART IZGARASI */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", overflowY: "auto", paddingRight: "6px" }}>
            {filteredGridCards.map((card, idx) => {
              if (card.isMatrixCard) {
                return (
                  <div
                    key={`matrix-${idx}`}
                    onClick={() => handleCardClick(card)}
                    style={{
                      background: "rgba(6, 182, 212, 0.05)",
                      border: "1.5px solid #06b6d4",
                      borderRadius: "6px",
                      padding: "10px 12px",
                      cursor: "pointer",
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                      transition: "all 0.2s"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#ffd700")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#06b6d4")}
                  >
                    <div style={{ width: "38px", height: "38px", background: "#081b26", border: "1px solid #06b6d4", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>
                      🌌
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "0.82rem", fontWeight: "bold", color: "#ffd700" }}>{card.title}</div>
                      <div style={{ fontSize: "0.65rem", color: "#38bdf8", wordBreak: "break-all" }}>{card.desc}</div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={card.id || `card-${idx}`}
                  onClick={() => handleCardClick(card)}
                  style={{
                    background: "rgba(0, 255, 127, 0.02)",
                    border: "1px solid rgba(0, 255, 127, 0.3)",
                    borderRadius: "6px",
                    padding: "9px 11px",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#00ff7f";
                    e.currentTarget.style.background = "rgba(0, 255, 127, 0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0, 255, 127, 0.3)";
                    e.currentTarget.style.background = "rgba(0, 255, 127, 0.02)";
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "6px", marginBottom: "4px" }}>
                      <div style={{ fontSize: "0.75rem", fontWeight: "bold", color: "#00ff7f", lineHeight: "1.3" }}>
                        ► {card.title}
                      </div>
                      {card.isNew && (
                        <span style={{ background: "#22c55e", color: "#000", fontSize: "8px", fontWeight: "900", padding: "1px 4px", borderRadius: "2px", flexShrink: 0 }}>
                          YENİ
                        </span>
                      )}
                    </div>
                    
                    {card.badge && (
                      <div style={{ display: "flex", gap: "4px", marginBottom: "4px" }}>
                        <span style={{ background: "rgba(6,182,212,0.2)", color: "#38bdf8", fontSize: "8px", padding: "1px 4px", borderRadius: "2px" }}>{card.badge}</span>
                        {card.subBadge && <span style={{ background: "rgba(245,158,11,0.2)", color: "#f59e0b", fontSize: "8px", padding: "1px 4px", borderRadius: "2px" }}>{card.subBadge}</span>}
                      </div>
                    )}

                    <p style={{ margin: 0, fontSize: "0.68rem", color: "#aaa", lineHeight: "1.35", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {card.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* SAĞ SÜTUN: SADECE YKOS.ORG GİRİŞİ VE PORTAL AKIŞI */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", background: "rgba(255, 215, 0, 0.02)", padding: "12px", borderRadius: "8px", border: "1.5px solid rgba(255, 215, 0, 0.3)", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1.5px solid #ffd700", paddingBottom: "6px" }}>
              <span style={{ color: "#ffd700", fontSize: "0.85rem", fontWeight: "bold", display: "flex", alignItems: "center", gap: "6px" }}>
                🌐 YKOS.ORG GİRİŞİ
              </span>
              <span style={{ background: "#ffd700", color: "#000", fontSize: "8.5px", fontWeight: "900", padding: "2px 6px", borderRadius: "3px" }}>PORTAL</span>
            </div>

            {ykosOrgEntries.map((item, idx) => (
              <a
                key={`org-${idx}`}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  background: idx === 0 ? "rgba(255, 215, 0, 0.08)" : "#0c101d",
                  border: idx === 0 ? "1.5px solid #ffd700" : "1px solid rgba(255, 215, 0, 0.25)",
                  borderRadius: "6px",
                  padding: "10px",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#ffd700";
                  e.currentTarget.style.background = "rgba(255, 215, 0, 0.15)";
                  e.currentTarget.style.transform = "translateX(2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = idx === 0 ? "#ffd700" : "rgba(255, 215, 0, 0.25)";
                  e.currentTarget.style.background = idx === 0 ? "rgba(255, 215, 0, 0.08)" : "#0c101d";
                  e.currentTarget.style.transform = "none";
                }}
              >
                <div style={{ width: "36px", height: "36px", background: "#1a1505", border: "1px solid #ffd700", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2px" }}>
                    <h4 style={{ margin: 0, fontSize: "0.78rem", color: "#ffd700", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {item.title}
                    </h4>
                    <span style={{ fontSize: "0.62rem", color: "#22c55e", fontWeight: "bold" }}>↗</span>
                  </div>
                  <p style={{ margin: 0, fontSize: "0.66rem", color: "#ccc", lineHeight: "1.3", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {item.desc}
                  </p>
                </div>
              </a>
            ))}
          </div>

        </div>

        {/* ALT BUTONLAR */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", width: "100%", maxWidth: "800px", margin: "14px auto 0 auto" }}>
          <button onClick={onVisualize} style={{ flex: 1, background: "linear-gradient(135deg, #ffd700, #b8860b)", color: "#000", border: "none", padding: "12px", borderRadius: "8px", fontWeight: "900", fontSize: "0.9rem", cursor: "pointer" }}>
            {t.visualizeBtn}
          </button>
          <button onClick={onNavigateAcikVeri} style={{ flex: 1, background: "linear-gradient(135deg, #00ff7f, #008000)", color: "#000", border: "none", padding: "12px", borderRadius: "8px", fontWeight: "900", fontSize: "0.9rem", cursor: "pointer" }}>
            🌐 AÇIK VERİ PORTALINA GİT
          </button>
        </div>
      </div>

    </div>
  );
}
