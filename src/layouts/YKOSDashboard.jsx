import React, { useState } from "react";
import SearchBar from "../components/SearchBar";

// İç Veri Tabanı
const archiveData = [
  {
    id: 1,
    title: "Çatalhöyük Kök Hece ve Damga Sembolizmi",
    category: "Arkeolojik Çözümleme",
    tags: ["çatalhöyük", "anadolu", "kök hece", "piktogram", "ykos 100"],
    summary: "Çatalhöyük duvar resimleri ve pişmiş toprak mühürlerdeki YKOS 100 kök hece eşleşmeleri.",
    analysis: "Çatalhöyük M.Ö. 7400 katmanlarında tespit edilen dairesel ve ışınsal motifler, YKOS 'ÇEV' ve 'BA' kök heceleriyle tam fonetik uyum gösterir."
  },
  {
    id: 2,
    title: "Göbeklitepe T-Sütunu YKOS Okuması",
    category: "Arkeolojik Çözümleme",
    tags: ["göbeklitepe", "t-sütun", "h sembolü", "c sembolü", "ykos 200"],
    summary: "Şanlıurfa Göbeklitepe T-Sütunları üzerindeki ikil sembollerin YKOS çözümü.",
    analysis: "T-sütunlardaki 'H' ve 'C' piktogramları ER-İK-AN ve KÖK-SU kavramsal kurgusunu ifade eder."
  },
  {
    id: 3,
    title: "Etrüsk Lemnos Kitabesi & Ön Türkçe Eşleşmesi",
    category: "Dil ve Yazıt Atlası",
    tags: ["etrüsk", "lemnos", "yazıt", "akdeniz", "ykos 300"],
    summary: "Lemnos adası mezar taşındaki alfabetik dizilimin YKOS kök fonetiği ile okuması.",
    analysis: "Batı Akdeniz'e taşınan alfabe dizgesi, Anadolu Ön-Türkçe kök ekleriyle deşifre edilmiştir."
  },
  {
    id: 4,
    title: "YOL Kök Hecesi ve Akış Teorisi",
    category: "Kök Hece Matrisi",
    tags: ["yol", "kök hece", "dinamik sistem", "ykos 100"],
    summary: "YKOS Kavramsal Çerçevesi: 'Rulo değil yol' mantığının dilbilimsel matrisi.",
    analysis: "Y-O-L kök hecesi; yön, hareket, süreç ve geçiş sembolizmini ifade eden ana eksendir."
  }
];

export default function YKOSDashboard({ onVisualize, onNavigateRead, onGoHome }) {
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("TR");
  const [searchQuery, setSearchQuery] = useState("");

  const languages = [
    { code: "TR", label: "Türkçe" },
    { code: "EN", label: "English" },
    { code: "FR", label: "Français" },
    { code: "RU", label: "Русский" },
    { code: "ZH", label: "中文" },
    { code: "ES", label: "Español" },
    { code: "IT", label: "Italiano" },
    { code: "AR", label: "العربية" },
    { code: "JA", label: "日本語" },
    { code: "DE", label: "Deutsch" }
  ];

  const initialStats = [
    { icon: "🌐", count: "214", label: "Ülkeler" },
    { icon: "🏛️", count: "248", label: "Araştırmalar" },
    { icon: "🔷", count: "9.870", label: "Damgalar" },
    { icon: "🗿", count: "18.420", label: "Petroglifler" },
    { icon: "📜", count: "4.132", label: "Yazıtlar" },
    { icon: "📚", count: "12.580", label: "Kaynaklar" },
    { icon: "📷", count: "46.900", label: "Görseller" },
    { icon: "🗺️", count: "58", label: "Atlaslar" }
  ];

  const filteredData = archiveData.filter((item) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      item.title.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.analysis.toLowerCase().includes(q) ||
      item.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  });

  const cardStyle = {
    backgroundColor: "#050811",
    border: "1px solid #ffd700",
    borderRadius: "12px",
    padding: "16px 20px",
    marginBottom: "15px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.7)",
    position: "relative"
  };

  return (
    <div style={{ width: "100%", maxWidth: "1240px", margin: "0 auto", padding: "10px", boxSizing: "border-box", color: "#ffffff", fontFamily: "Segoe UI, sans-serif" }}>
      
      {/* 1. ÜST HEADER KUTUSU (2 CM KISALTILMIŞ COMPACT BÖLÜM) */}
      <div style={{
        ...cardStyle,
        padding: "8px 16px 10px 16px", // Dikey boşluklar düşürüldü (Tam 2 cm kısaltma sağlandı)
        marginBottom: "12px"
      }}>
        
        {/* SOL ÜST MENÜ & SAĞ ÜST DİL */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0px" }}>
          <button 
            onClick={() => { setMenuOpen(!menuOpen); setLangOpen(false); }}
            style={{ background: "rgba(255, 215, 0, 0.1)", border: "1px solid #ffd700", color: "#ffd700", padding: "4px 10px", borderRadius: "5px", fontWeight: "bold", cursor: "pointer", fontSize: "0.75rem" }}
          >
            ☰ MENÜ
          </button>

          <div style={{ position: "relative" }}>
            <button 
              onClick={() => { setLangOpen(!langOpen); setMenuOpen(false); }}
              style={{ background: "transparent", border: "1px solid #ffd700", color: "#ffd700", padding: "4px 8px", borderRadius: "5px", fontWeight: "bold", cursor: "pointer", fontSize: "0.75rem" }}
            >
              🌐 {currentLang} ▾
            </button>

            {langOpen && (
              <div style={{ position: "absolute", right: 0, top: "110%", backgroundColor: "#050811", border: "1px solid #ffd700", borderRadius: "8px", display: "flex", flexDirection: "column", minWidth: "130px", maxHeight: "200px", overflowY: "auto", zIndex: 1000, boxShadow: "0 6px 20px rgba(0,0,0,0.9)", padding: "4px" }}>
                {languages.map((l) => (
                  <button 
                    key={l.code}
                    onClick={() => { setCurrentLang(l.code); setLangOpen(false); }}
                    style={{ background: currentLang === l.code ? "rgba(255,215,0,0.2)" : "transparent", border: "none", color: currentLang === l.code ? "#ffd700" : "#fff", padding: "5px 8px", textAlign: "left", fontSize: "0.75rem", cursor: "pointer", fontWeight: currentLang === l.code ? "bold" : "normal" }}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ORTA LOGO & BAŞLIK (TIKLANINCA ANA SAYFAYA DÖNÜŞ LINKI) */}
        <div 
          onClick={onGoHome || (() => window.location.reload())}
          title="Ana Sayfaya Dön"
          style={{ textAlign: "center", margin: "0 auto", cursor: "pointer", display: "block", width: "100%", marginTop: "-8px" }}
        >
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "2px" }}>
            <img 
              src="/ykos-logo.png" 
              alt="YKOS Kartal Amblemi" 
              style={{ maxHeight: "52px", maxWidth: "100%", objectFit: "contain", filter: "drop-shadow(0px 0px 8px rgba(255, 215, 0, 0.4))" }} 
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
          <h1 style={{ color: "#ffd700", fontSize: "1.35rem", fontWeight: "900", margin: "0", letterSpacing: "1.5px", lineHeight: "1.2" }}>YKOS BİLGİ SİSTEMİ</h1>
          <p style={{ color: "#aaaaaa", fontSize: "0.72rem", margin: "2px 0 0 0" }}>Disiplinler Arası Algoritmik Kültür ve Dil Veri Tabanı</p>
        </div>

        {menuOpen && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "6px", marginTop: "10px", borderTop: "1px solid rgba(255, 215, 0, 0.25)", paddingTop: "10px" }}>
            {["KURUMSAL", "YKOS METODOLOJİSİ", "KÖK HECE MATRİSİ", "DAMGA ATLASI", "OKUMA & ANALİZ MOTORU", "GÖÇ & AKIŞ HARİTASI", "🎥 VİDEO & SUNUMLAR", "KÜLLİYAT & YAYINLAR", "DİJİTAL ARŞİV"].map((item, i) => (
              <button key={i} onClick={() => { setMenuOpen(false); if(i===2) onVisualize(); }} style={{ background: i === 2 ? "rgba(255, 215, 0, 0.2)" : "rgba(255, 255, 255, 0.02)", border: i === 2 ? "1px solid #ffd700" : "1px solid rgba(255, 215, 0, 0.3)", color: i === 2 ? "#ffd700" : "#ccc", padding: "5px 6px", borderRadius: "4px", fontSize: "0.68rem", fontWeight: "bold", cursor: "pointer" }}>
                {item}
              </button>
            ))}
          </div>
        )}

      </div>

      {/* 2. ARAMA BARI */}
      <div style={{ marginBottom: "15px", width: "100%" }}>
        <SearchBar onSearch={(q) => setSearchQuery(q)} />
      </div>

      {/* 3. İSTATİSTİK SAYAÇ KUTUSU */}
      <div style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
          <div style={{ border: "1px solid #ffd700", borderRadius: "6px", padding: "3px 10px", textAlign: "center", fontSize: "0.65rem", background: "rgba(255, 215, 0, 0.05)" }}>
            <span style={{ color: "#888", display: "block" }}>SİSTEM DURUMU</span>
            <strong style={{ color: "#ffd700", fontSize: "0.85rem", display: "block" }}>AKTİF</strong>
            <small style={{ color: "#666" }}>YKOS v1.0 Beta</small>
          </div>
        </div>

        <div className="stats-grid-container">
          <style>{`
            .stats-grid-container {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 10px;
            }
            @media (min-width: 768px) {
              .stats-grid-container {
                grid-template-columns: repeat(4, 1fr);
              }
            }
            @media (min-width: 1024px) {
              .stats-grid-container {
                grid-template-columns: repeat(8, 1fr);
              }
            }
          `}</style>

          {initialStats.map((item, idx) => (
            <div key={idx} style={{ background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 215, 0, 0.25)", borderRadius: "8px", padding: "10px 4px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
              <span style={{ color: "#fff", fontWeight: "900", fontSize: "1rem", margin: "2px 0" }}>{item.count}</span>
              <span style={{ color: "#888", fontSize: "0.68rem", fontWeight: "bold" }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. ALT KARTLAR */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "15px" }}>
        
        {/* SOL PANEL */}
        <div style={cardStyle}>
          <h3 style={{ color: "#ffd700", fontSize: "0.95rem", fontWeight: "bold", marginTop: 0, marginBottom: "12px" }}>MATRİSLER VE KATMANLAR</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ color: "#ffd700", fontWeight: "bold", fontSize: "0.85rem", cursor: "pointer" }} onClick={onVisualize}>► <span style={{ color: "#fff" }}>💻 KÖK HECE MATRİSİ</span></div>
            <div style={{ color: "#ffd700", fontWeight: "bold", fontSize: "0.85rem", cursor: "pointer" }} onClick={() => alert("🗺️ DAMGA ATLASI yükleniyor...")}>► <span style={{ color: "#fff" }}>🗺️ DAMGA ATLASI</span></div>
            <div style={{ color: "#ffd700", fontWeight: "bold", fontSize: "0.85rem", cursor: "pointer" }} onClick={() => alert("🔬 OKUMA & ANALİZ MOTORU başlatılıyor...")}>► <span style={{ color: "#fff" }}>🔬 OKUMA & ANALİZ MOTORU</span></div>
            <div style={{ color: "#ffd700", fontWeight: "bold", fontSize: "0.85rem", cursor: "pointer" }} onClick={() => alert("🟢 GÖÇ & AKIŞ HARİTASI hazırlanıyor...")}>► <span style={{ color: "#fff" }}>🟢 GÖÇ & AKIŞ HARİTASI</span></div>
          </div>
        </div>

        {/* SAĞ PANEL */}
        <div style={{ ...cardStyle, display: "flex", flexDirection: "column" }}>
          <h3 style={{ color: "#ffd700", fontSize: "0.95rem", fontWeight: "bold", marginTop: 0, marginBottom: "12px" }}>
            {searchQuery ? `🔍 ARAMA SONUÇLARI (${filteredData.length})` : "⚡ YKOS ÇÖZÜMLERİ VE İNDEKLSER"}
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "15px" }}>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => onNavigateRead && onNavigateRead(item.id)}
                  style={{ background: "rgba(255, 215, 0, 0.05)", border: "1px solid rgba(255, 215, 0, 0.4)", borderRadius: "6px", padding: "10px", fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold", cursor: "pointer" }}
                >
                  📜 {item.title} →
                  <div style={{ fontSize: "0.72rem", color: "#ccc", fontWeight: "normal", marginTop: "4px" }}>
                    {item.summary}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ color: "#888", fontSize: "0.8rem", textAlign: "center", padding: "10px" }}>
                Aramanızla eşleşen veri bulunamadı.
              </div>
            )}
          </div>

          <button 
            onClick={onVisualize}
            style={{ background: "linear-gradient(135deg, #ffd700, #b8860b)", color: "#000000", border: "none", padding: "12px", borderRadius: "6px", fontWeight: "900", fontSize: "0.85rem", cursor: "pointer", marginTop: "auto", boxShadow: "0 0 12px rgba(255, 215, 0, 0.35)" }}
          >
            🗣️ BALONCUK MATRİSİNİ GÖRSELLEŞTİR ➔
          </button>
        </div>

      </div>

    </div>
  );
}