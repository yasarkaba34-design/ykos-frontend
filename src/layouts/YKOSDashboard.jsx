import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import "./YKOSDashboard.css";

export default function YKOSDashboard({ onVisualize }) {
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("TR");

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

  const stats = [
    { icon: "🌐", count: "214", label: "Ülkeler" },
    { icon: "🏛️", count: "248", label: "Araştırmalar" },
    { icon: "🔷", count: "9.870", label: "Damgalar" },
    { icon: "🗿", count: "18.420", label: "Petroglifler" },
    { icon: "📜", count: "4.132", label: "Yazıtlar" },
    { icon: "📚", count: "12.580", label: "Kaynaklar" },
    { icon: "📷", count: "46.900", label: "Görseller" },
    { icon: "🗺️", count: "58", label: "Atlaslar" }
  ];

  return (
    <div className="ykos-dashboard-box">
      
      {/* 1. ANA BAŞLIK VE MENÜ KUTUSU */}
      <div className="ykos-card-box">
        <div className="ykos-header-row">
          <div className="ykos-brand-area">
            <span className="ykos-badge">YKOS</span>
            <h1 className="ykos-title">YKOS BİLGİ SİSTEMİ</h1>
            <p className="ykos-subtitle">Disiplinler Arası Algoritmik Kültür ve Dil Veri Tabanı</p>
          </div>

          {/* 10 DİLLİ DİL MENÜSÜ */}
          <div className="ykos-lang-wrapper">
            <button 
              className="ykos-lang-btn"
              onClick={() => setLangOpen(!langOpen)}
            >
              🌐 {currentLang} ▾
            </button>
            {langOpen && (
              <div className="ykos-lang-dropdown">
                {languages.map((l) => (
                  <button 
                    key={l.code}
                    className={currentLang === l.code ? "active" : ""}
                    onClick={() => {
                      setCurrentLang(l.code);
                      setLangOpen(false);
                    }}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 9 BUTONLU ŞERİT */}
        <div className="ykos-nav-row">
          <button className="ykos-nav-btn">KURUMSAL</button>
          <button className="ykos-nav-btn">YKOS METODOLOJİSİ</button>
          <button className="ykos-nav-btn active">KÖK HECE MATRİSİ</button>
          <button className="ykos-nav-btn">DAMGA ATLASI</button>
          <button className="ykos-nav-btn">OKUMA & ANALİZ MOTORU</button>
          <button className="ykos-nav-btn">GÖÇ & AKIŞ HARİTASI</button>
          <button className="ykos-nav-btn">🎥 VİDEO & SUNUMLAR</button>
          <button className="ykos-nav-btn">KÜLLİYAT & YAYINLAR</button>
          <button className="ykos-nav-btn">DİJİTAL ARŞİV</button>
        </div>
      </div>

      {/* 2. ARAMA BARI */}
      <div className="ykos-search-row">
        <SearchBar />
      </div>

      {/* 3. İSTATİSTİK KUTUSU */}
      <div className="ykos-card-box">
        <div className="ykos-status-header">
          <div className="ykos-status-tag">
            <span>SİSTEM DURUMU</span>
            <strong>AKTİF</strong>
            <small>YKOS v1.0 Beta</small>
          </div>
        </div>

        <div className="ykos-stats-grid">
          {stats.map((item, idx) => (
            <div key={idx} className="ykos-stat-card">
              <span className="icon">{item.icon}</span>
              <span className="count">{item.count}</span>
              <span className="label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. ALT 2 SÜTUNLU KARTLAR */}
      <div className="ykos-bottom-grid">
        <div className="ykos-card-box">
          <h3 className="ykos-section-title">MATRİSLER VE KATMANLAR</h3>
          <ul className="ykos-layer-list">
            <li>► <span>🔤 KÖK HECE MATRİSİ</span></li>
            <li>► <span>🗺️ DAMGA ATLASI</span></li>
            <li>► <span>🔬 OKUMA & ANALİZ MOTORU</span></li>
            <li>► <span>🌏 GÖÇ & AKIŞ HARİTASI</span></li>
          </ul>
        </div>

        <div className="ykos-card-box ykos-flex-col">
          <h3 className="ykos-section-title">⚡ YKOS ÇÖZÜMLERİ VE İNDEKLSER</h3>
          <div className="ykos-solution-list">
            <div className="ykos-solution-card">📜 Göbeklitepe T-Sütunu YKOS Okuması</div>
            <div className="ykos-solution-card">📜 Etrüsk Lemnos Kitabesi & Ön Türkçe Eşleşmesi</div>
          </div>

          <button className="ykos-gold-action-btn" onClick={onVisualize}>
            🗣️ BALONCUK MATRİSİNİ GÖRSELLEŞTİR ➔
          </button>
        </div>
      </div>

    </div>
  );
}