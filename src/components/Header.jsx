import React, { useState } from "react";
import "./Header.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="ykos-header">
      {/* ÜST BAR: Tek Tuş Menü + Logo + Dil Seçimi */}
      <div className="header-top-bar">
        <button 
          className="menu-toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="hamburger-icon">☰</span>
          <span className="menu-text">MENÜ</span>
        </button>

        <div className="main-logo-badge">
          <span className="logo-ykos">YKOS</span>
          <span className="logo-sub">BİLGİ SİSTEMİ</span>
        </div>

        <div className="lang-box">
          <button className="lang-btn">TR / EN ▼</button>
        </div>
      </div>

      {/* MENÜ ÇİZGİSİNİN ALTINA AÇILAN MODÜLER TUŞLAR */}
      {isOpen && (
        <nav className="dropdown-menu-grid">
          <button className="menu-btn">KURUMSAL</button>
          <button className="menu-btn">YKOS METODOLOJİSİ</button>
          <button className="menu-btn active">KÖK HECE MATRİSİ</button>
          <button className="menu-btn">DAMGA ATLASI</button>
          <button className="menu-btn">OKUMA & ANALİZ MOTORU</button>
          <button className="menu-btn">GÖÇ & AKIŞ HARİTASI</button>
          <button className="menu-btn">🎥 VİDEO & SUNUMLAR</button>
          <button className="menu-btn">KÜLLİYAT & YAYINLAR</button>
          <button className="menu-btn">DİJİTAL ARŞİV</button>
        </nav>
      )}
    </header>
  );
}
