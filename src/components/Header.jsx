import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <header className="main-header">
      <div className="header-top">
        <div className="logo-section">
          <span className="logo-badge">YKOS</span>
          <h1 className="main-title">YKOS BİLGİ SİSTEMİ</h1>
        </div>
        <div className="header-actions">
          <button className="lang-btn">🌐 TR / EN</button>
        </div>
      </div>
      
      {/* Menü Çizgilerinin Altındaki Navigasyon */}
      <nav className="header-nav">
        <button>KURUMSAL</button>
        <button>YKOS METODOLOJİSİ</button>
        <button className="active">KÖK HECE MATRİSİ</button>
        <button>DAMGA ATLASI</button>
        <button>OKUMA & ANALİZ MOTORU</button>
        <button>GÖÇ & AKIŞ HARİTASI</button>
        <button>KÜLLİYAT & YAYINLAR</button>
      </nav>
    </header>
  );
}
