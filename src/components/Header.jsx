import React, { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState({ code: "TR", label: "Türkçe" });

  const languages = [
    { code: "TR", label: "Türkçe" },
    { code: "EN", label: "English" },
    { code: "AZ", label: "Azərbaycan" },
    { code: "KK", label: "Qazaqşa" },
    { code: "KY", label: "Kırgızca" },
    { code: "UZ", label: "Oʻzbekcha" }
  ];

  return (
    <header style={{ width: "100%", borderBottom: "1px solid #222", padding: "12px 16px", boxSizing: "border-box" }}>
      {/* ÜST BAR: MOBİL VE MASAÜSTÜ UYUMLU KAPSAYICI */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1200px", margin: "0 auto" }}>
        
        {/* MOBİL HAMBURGER MENÜ BUTONU (Masaüstünde Gizli) */}
        <button
          className="mobile-hamburger-btn"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
            setIsLangOpen(false);
          }}
          style={{
            background: "#141414",
            border: "1px solid #ffd700",
            borderRadius: "6px",
            color: "#ffd700",
            padding: "8px 12px",
            fontSize: "18px",
            cursor: "pointer",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          ☰
        </button>

        {/* ORTA: LOGO (MOBİLDE BÜYÜK YKOS, MASAÜSTÜNDE İSE DETAYLI) */}
        <div style={{ textAlign: "center" }}>
          <div
            className="header-logo-title"
            style={{
              border: "2px solid #ffd700",
              borderRadius: "10px",
              padding: "4px 18px",
              backgroundColor: "#111",
              color: "#ffd700",
              fontWeight: "900",
              fontSize: "18px",
              display: "inline-block"
            }}
          >
            YKOS
          </div>
          <div className="header-sub-title" style={{ color: "#aaa", fontSize: "10px", marginTop: "4px" }}>
            Disiplinler Arası Algoritmik Kültür ve Dil Veri Tabanı
          </div>
        </div>

        {/* SAĞ: ÇOKLU DİL BUTONU */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => {
              setIsLangOpen(!isLangOpen);
              setIsMenuOpen(false);
            }}
            style={{
              background: "#141414",
              border: "1px solid #ffd700",
              borderRadius: "6px",
              color: "#ffd700",
              padding: "6px 12px",
              fontSize: "12px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            🌐 {selectedLang.code}
          </button>

          {/* DİL SEÇİM AÇILIR MENÜSÜ */}
          {isLangOpen && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "40px",
                backgroundColor: "#111",
                border: "1px solid #ffd700",
                borderRadius: "6px",
                padding: "6px",
                zIndex: 9999,
                minWidth: "130px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.8)"
              }}
            >
              {languages.map((item) => (
                <button
                  key={item.code}
                  onClick={() => {
                    setSelectedLang(item);
                    setIsLangOpen(false);
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    background: selectedLang.code === item.code ? "#221e05" : "transparent",
                    color: selectedLang.code === item.code ? "#ffd700" : "#ccc",
                    border: "none",
                    padding: "6px 8px",
                    fontSize: "11px",
                    cursor: "pointer",
                    borderRadius: "4px"
                  }}
                >
                  {item.label} ({item.code})
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 9 BUTONLUK MENÜ ALANI: Masaüstünde açık, Mobilde hamburger tıklandığında açılır */}
      <div className={`header-nav-buttons ${isMenuOpen ? "active" : ""}`} style={{ marginTop: "15px" }}>
        <button className="menu-btn">KURUMSAL</button>
        <button className="menu-btn">YKOS METODOLOJİSİ</button>
        <button className="menu-btn">KÖK HECE MATRİSİ</button>
        <button className="menu-btn">DAMGA ATLASI</button>
        <button className="menu-btn">OKUMA & ANALİZ MOTORU</button>
        <button className="menu-btn">GÖÇ & AKIŞ HARİTASI</button>
        <button className="menu-btn">VİDEO & SUNUMLAR</button>
        <button className="menu-btn">KÜLLİYAT & YAYINLAR</button>
        <button className="menu-btn" style={{ backgroundColor: "#1c1905", color: "#ffd700" }}>DİJİTAL ARŞİV</button>
      </div>
    </header>
  );
}
