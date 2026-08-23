// src/layouts/YKOSDashboard.jsx
import React, { useState, useEffect } from "react";
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
  const [adminRecords, setAdminRecords] = useState([]);

  const t = translations[currentLang] || translations.TR;

  // Yönetici tarafından girilen ve onaylanan içerikleri dinamik olarak yükleme
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("ykos_admin_records") || "[]");
      const approved = saved.filter(
        (r) => r.status === "approved" || r.durum === "onaylandi" || r.status === "published"
      );
      setAdminRecords(approved);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const languages = [
    { code: "TR", label: "Türkçe" }, { code: "EN", label: "English" },
    { code: "FR", label: "Français" }, { code: "RU", label: "Русский" },
    { code: "ZH", label: "中文" }, { code: "JA", label: "日本語" },
    { code: "PT", label: "Português" }, { code: "ES", label: "Español" },
    { code: "AR", label: "العربية" }, { code: "DE", label: "Deutsch" },
  ];

  const initialStats = [
    { icon: "🌐", count: "214", label: "Ülkeler" },
    { icon: "🏛️", count: "248", label: "Araştırmalar" },
    { icon: "🔷", count: "9.870", label: "Damgalar" },
    { icon: "🗿", count: "18.420", label: "Petroglifler" },
    { icon: "📜", count: "4.132", label: "Yazıtlar" },
    { icon: "📚", count: "12.580", label: "Kaynaklar" },
    { icon: "📷", count: "46.900", label: "Görseller" },
    { icon: "🗺️", count: "58", label: "Atlaslar" },
  ];

  const cardStyle = {
    backgroundColor: "#050811",
    border: "1.5px solid #ffd700",
    borderRadius: "14px",
    padding: "16px 14px",
    marginBottom: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.7)",
  };

  const btnBaseStyle = {
    background: "#050811",
    border: "1px solid rgba(255, 215, 0, 0.4)",
    color: "#ffffff",
    padding: "10px 4px",
    borderRadius: "8px",
    fontSize: "0.78rem",
    fontWeight: "bold",
    letterSpacing: "0.5px",
    cursor: "pointer",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    transition: "all 0.2s ease",
  };

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

  // SAĞ SÜTUN: Sistem içi gerçek içerikleri ve yöneticinin girdiği kayıtları açan liste
  const rightColumnItems = adminRecords.length > 0
    ? adminRecords.slice(0, 4).map((rec) => ({
        id: rec.id,
        title: rec.title || rec.baslik || "Yönetici Giriş İçeriği",
        desc: rec.summary || rec.ozet || "Yönetici paneli üzerinden onaylanmış araştırma verisi.",
        tag: rec.category || rec.kategori || "YÖNETİCİ",
        icon: "📑",
        onClick: () => onNavigateRead(rec.id)
      }))
    : [
        {
          id: "M-2",
          title: "Anadolu'nun 12.000 Yıllık Kültür Katmanları",
          desc: "YKOS dil ve sembol matrisi tam metin araştırma dosyası.",
          tag: "KÜLLİYAT",
          icon: "📚",
          onClick: () => onNavigateRead("M-2")
        },
        {
          id: "M-1",
          title: "Sembolik Sahiplenme ve Adaptasyon",
          desc: "İkonografik formlar ve epigrafik katmanların tarihsel analizi.",
          tag: "MAKALE",
          icon: "🏛️",
          onClick: () => onNavigateRead("M-1")
        },
        {
          id: "ACIK-VERI",
          title: "Açık Veri & Araştırma Dökümleri",
          desc: "Kaya resimleri, petroglifler ve yalın bulgu kayıt havuzu.",
          tag: "AÇIK VERİ",
          icon: "🌐",
          onClick: () => onNavigateAcikVeri()
        },
        {
          id: "C-1",
          title: "Hilal-Yıldız Damgası ve Kozmik Denge",
          desc: "Anadolu kaya resimlerindeki kök safha inceleme belgesi.",
          tag: "BİLDİRİ",
          icon: "📜",
          onClick: () => onNavigateRead("C-1")
        }
      ];

  const filteredGridCards = gridCards.filter((card) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return card.title.toLowerCase().includes(q) || (card.desc && card.desc.toLowerCase().includes(q));
  });

  const handleCardClick = (card) => {
    if (card.isMatrixCard) {
      onVisualize();
    } else {
      onNavigateRead(card.id);
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: "1280px", margin: "0 auto", padding: "10px", color: "#ffffff", fontFamily: "Segoe UI, sans-serif" }}>
      
      {/* 1. HEADER */}
      <div style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
          <button
            onClick={() => { setMenuOpen(!menuOpen); setLangOpen(false); }}
            style={{ 
              background: menuOpen ? "rgba(255, 215, 0, 0.25)" : "rgba(255, 215, 0, 0.1)", 
              border: "2px solid #ffd700", 
              color: "#ffd700", 
              padding: "7px 20px", 
              borderRadius: "8px", 
              fontWeight: "900", 
              cursor: "pointer", 
              fontSize: "0.95rem"
            }}
          >
            ≡ {t.menu || "MENÜ"}
          </button>

          <div style={{ position: "relative" }}>
            <button
              onClick={() => { setLangOpen(!langOpen); setMenuOpen(false); }}
              style={{ background: "rgba(255,215,0,0.05)", border: "2px solid #ffd700", color: "#ffd700", padding: "7px 16px", borderRadius: "8px", fontWeight: "900", cursor: "pointer", fontSize: "0.95rem" }}
            >
              🌐 {currentLang} ▾
            </button>
            {langOpen && (
              <div style={{ position: "absolute", right: 0, top: "120%", backgroundColor: "#050811", border: "2px solid #ffd700", borderRadius: "10px", display: "flex", flexDirection: "column", minWidth: "160px", zIndex: 1000, padding: "6px" }}>
                {languages.map((l) => (
                  <button key={l.code} onClick={() => { setCurrentLang(l.code); setLangOpen(false); }} style={{ background: currentLang === l.code ? "rgba(255,215,0,0.2)" : "transparent", border: "none", color: currentLang === l.code ? "#ffd700" : "#fff", padding: "8px 12px", textAlign: "left", fontSize: "0.85rem", cursor: "pointer" }}>
                    {l.label} ({l.code})
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div onClick={() => window.location.reload()} title="Sayfayı Yenile" style={{ textAlign: "center", cursor: "pointer", marginTop: "-6px", marginBottom: "8px" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "4px" }}>
            <img src="/ykos-logo.png" alt="YKOS Kartal Amblemi" style={{ maxHeight: "115px", maxWidth: "100%", objectFit: "contain", filter: "drop-shadow(0px 0px 12px rgba(255, 215, 0, 0.6))" }} onError={(e) => { e.target.style.display = "none"; }} />
          </div>
          <h1 style={{ color: "#ffd700", fontSize: "1.7rem", fontWeight: "900", margin: "0 0 4px 0", letterSpacing: "1.2px" }}>YKOS BİLGİ SİSTEMİ</h1>
          <p style={{ color: "#aaaaaa", fontSize: "0.82rem", margin: 0 }}>Disiplinler Arası Algoritmik Kültür ve Dil Veri Tabanı</p>
        </div>

        {menuOpen && (
          <div style={{ marginTop: "10px", borderTop: "1px dashed rgba(255, 215, 0, 0.3)", paddingTop: "12px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "12px" }}>
              <button onClick={() => { setMenuOpen(false); window.location.reload(); }} style={{ ...btnBaseStyle, border: "1.5px solid #ffd700", background: "rgba(255, 215, 0, 0.15)", color: "#ffd700", fontWeight: "900" }}>
                🏠 ANASAYFA
              </button>
              <button onClick={() => { setMenuOpen(false); onNavigateMethod(); }} style={btnBaseStyle}>
                KURUMSAL
              </button>
              <button onClick={() => { setMenuOpen(false); onNavigateMethod(); }} style={btnBaseStyle}>
                YKOS METODOLOJİSİ
              </button>
              <button onClick={() => { setMenuOpen(false); onVisualize(); }} style={{ ...btnBaseStyle, border: "1.5px solid #ffd700", color: "#ffd700", fontWeight: "900" }}>
                KÖK HECE MATRİSİ
              </button>
              <button onClick={() => { setMenuOpen(false); onNavigateAtlas(); }} style={btnBaseStyle}>
                DAMGA ATLASI
              </button>
              <button onClick={() => { setMenuOpen(false); onNavigateEngine(); }} style={btnBaseStyle}>
                OKUMA & ANALİZ MOTORU
              </button>
              <button onClick={() => { setMenuOpen(false); onNavigateFlow(); }} style={{ ...btnBaseStyle, gridColumn: "span 2", padding: "10px" }}>
                GÖÇ & AKIŞ HARİTASI
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", borderTop: "1px dashed rgba(255, 215, 0, 0.25)", paddingTop: "10px" }}>
              <button onClick={() => { setMenuOpen(false); onNavigateLogin && onNavigateLogin("guest"); }} style={{ ...btnBaseStyle, width: "100%", padding: "10px", color: "#ffd700", fontWeight: "900", border: "1px solid rgba(255, 215, 0, 0.5)" }}>
                👤 KONUK PANELİ GİRİŞİ
              </button>
              <button onClick={() => { setMenuOpen(false); onNavigateLogin && onNavigateLogin("admin"); }} style={{ ...btnBaseStyle, width: "100%", padding: "10px", color: "#ffd700", fontWeight: "900", border: "1.5px solid #ffd700", background: "rgba(255, 215, 0, 0.05)" }}>
                ⚙️ YÖNETİCİ VERİ GİRİŞİ
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 2. ARAMA BARI */}
      <div style={{ marginBottom: "12px" }}>
        <SearchBar onSearch={(q) => setSearchQuery(q)} />
      </div>

      {/* 3. SAYAÇLAR */}
      <div style={cardStyle}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "10px" }}>
          {initialStats.map((item, idx) => (
            <div 
              key={idx} 
              style={{ 
                background: "rgba(255, 255, 255, 0.02)", 
                border: "1px solid rgba(255, 215, 0, 0.35)", 
                borderRadius: "10px", 
                padding: "12px 6px", 
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "inset 0 0 10px rgba(0,0,0,0.5)"
              }}
            >
              <div style={{ fontSize: "1.5rem", marginBottom: "4px" }}>{item.icon}</div>
              <div style={{ color: "#ffffff", fontWeight: "900", fontSize: "1.15rem", letterSpacing: "0.5px" }}>{item.count}</div>
              <div style={{ color: "#aaaaaa", fontSize: "0.75rem", fontWeight: "bold", marginTop: "2px" }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. ANA GÖVDE: SOLDA ARŞİV + SAĞDA DOĞRUDAN OKUMA VE İÇERİK AÇAN KARTLAR */}
      <div style={{ ...cardStyle, display: "flex", flexDirection: "column" }}>
        <h3 style={{ color: "#ffd700", fontSize: "1.05rem", marginTop: 0, borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "8px", marginBottom: "12px" }}>
          ⚡ {t.solutionsTitle}
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "2.3fr 1fr", gap: "14px", minHeight: "440px", maxHeight: "560px" }}>
          
          {/* SOL-ORTA BÖLÜM */}
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

          {/* SAĞ SÜTUN: ARTIK DIŞ LİNKE GİTMEZ; SİSTEM İÇİNDEKİ İÇERİĞİ AÇAR */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", background: "rgba(255, 215, 0, 0.02)", padding: "12px", borderRadius: "8px", border: "1.5px solid rgba(255, 215, 0, 0.3)", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1.5px solid #ffd700", paddingBottom: "6px" }}>
              <span style={{ color: "#ffd700", fontSize: "0.85rem", fontWeight: "bold", display: "flex", alignItems: "center", gap: "6px" }}>
                📑 ONAYLI İÇERİK & VERİ
              </span>
              <span style={{ background: "#ffd700", color: "#000", fontSize: "8.5px", fontWeight: "900", padding: "2px 6px", borderRadius: "3px" }}>YAYIN</span>
            </div>

            {rightColumnItems.map((item, idx) => (
              <div
                key={`right-item-${idx}`}
                onClick={item.onClick}
                style={{
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
                    <span style={{ fontSize: "0.62rem", color: "#22c55e", fontWeight: "bold" }}>İÇERİK ➔</span>
                  </div>
                  <p style={{ margin: 0, fontSize: "0.66rem", color: "#ccc", lineHeight: "1.3", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {item.desc}
                  </p>
                </div>
              </div>
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
