import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import "./YKOSDashboard.css";

export default function YKOSDashboard({ onVisualize }) {
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("TR");

  // İstediğiniz 10 Dil
  const languages = [
    { code: "TR", label: "Türkçe" },
    { code: "EN", label: "English (İngilizce)" },
    { code: "FR", label: "Français (Fransızca)" },
    { code: "RU", label: "Русский (Rusça)" },
    { code: "ZH", label: "中文 (Çince)" },
    { code: "ES", label: "Español (İspanyolca)" },
    { code: "IT", label: "Italiano (İtalyanca)" },
    { code: "AR", label: "العربية (Arapça)" },
    { code: "JA", label: "日本語 (Japonca)" },
    { code: "PT", label: "Português (Portekizce)" },
    { code: "DE", label: "Deutsch (Almanca)" }
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
    <div className="dashboard-container">
      
      {/* 1. ÜST HEADER KUTUSU */}
      <header className="main-header-box">
        <div className="header-top-row">
          <div className="logo-center">
            <span className="logo-badge">YKOS</span>
            <h1 className="header-title">YKOS BİLGİ SİSTEMİ</h1>
            <p className="header-subtitle">Disiplinler Arası Algoritmik Kültür ve Dil Veri Tabanı</p>
          </div>

          {/* AÇILIR 10 DİLLİ MENÜ */}
          <div className="lang-box-wrapper">
            <button 
              className="lang-dropdown-btn"
              onClick={() => setLangOpen(!langOpen)}
            >
              🌐 {currentLang} ▾
            </button>

            {langOpen && (
              <div className="lang-menu">
                {languages.map((lang) => (
                  <button 
                    key={lang.code}
                    className={currentLang === lang.code ? "active-lang" : ""}
                    onClick={() => {
                      setCurrentLang(lang.code);
                      setLangOpen(false);
                    }}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 9 BUTONLU YATAY MENÜ */}
        <nav className="header-nav-grid">
          <button className="nav-tab-btn">KURUMSAL</button>
          <button className="nav-tab-btn">YKOS METODOLOJİSİ</button>
          <button className="nav-tab-btn active">KÖK HECE MATRİSİ</button>
          <button className="nav-tab-btn">DAMGA ATLASI</button>
          <button className="nav-tab-btn">OKUMA & ANALİZ MOTORU</button>
          <button className="nav-tab-btn">GÖÇ & AKIŞ HARİTASI</button>
          <button className="nav-tab-btn">🎥 VİDEO & SUNUMLAR</button>
          <button className="nav-tab-btn">KÜLLİYAT & YAYINLAR</button>
          <button className="nav-tab-btn">DİJİTAL ARŞİV</button>
        </nav>
      </header>

      {/* 2. TAM GENİŞLİKTE ARAMA BARI */}
      <div className="search-section">
        <SearchBar />
      </div>

      {/* 3. İSTATİSTİK VE SAYAÇ KUTUSU */}
      <section className="stats-header-box">
        <div className="status-badge-container">
          <div className="status-badge">
            <span className="status-title">SİSTEM DURUMU</span>
            <span className="status-state">AKTİF</span>
            <small className="status-version">YKOS v1.0 Beta</small>
          </div>
        </div>

        <div className="stats-grid">
          {stats.map((item, idx) => (
            <div key={idx} className="stat-card">
              <span className="stat-icon">{item.icon}</span>
              <span className="stat-count">{item.count}</span>
              <span className="stat-label">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. ALT ÇİFT SÜTUNLU PANEL */}
      <div className="bottom-panels-grid">
        {/* SOL PANEL */}
        <div className="panel-box">
          <h3 className="panel-title">MATRİSLER VE KATMANLAR</h3>
          <ul className="layers-list">
            <li>► <span>🔤 KÖK HECE MATRİSİ</span></li>
            <li>► <span>🗺️ DAMGA ATLASI</span></li>
            <li>► <span>🔬 OKUMA & ANALİZ MOTORU</span></li>
            <li>► <span>🌏 GÖÇ & AKIŞ HARİTASI</span></li>
          </ul>
        </div>

        {/* SAĞ PANEL */}
        <div className="panel-box">
          <h3 className="panel-title">⚡ YKOS ÇÖZÜMLERİ VE İNDEKLSER</h3>
          <div className="solution-cards">
            <div className="solution-item">
              📜 <strong>Göbeklitepe T-Sütunu YKOS Okuması</strong>
            </div>
            <div className="solution-item">
              📜 <strong>Etrüsk Lemnos Kitabesi & Ön Türkçe Eşleşmesi</strong>
            </div>
          </div>

          <button className="visualize-action-btn" onClick={onVisualize}>
            🗣️ BALONCUK MATRİSİNİ GÖRSELLEŞTİR ➔
          </button>
        </div>
      </div>

    </div>
  );
}
