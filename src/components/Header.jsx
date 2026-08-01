import React, { useState } from "react";
import "./Header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="ykos-header-wrapper">
      {/* MENÜ ÇİZGİSİ: Tek Tuş Menü + Ortalanmış Logo + Dil Düğmesi */}
      <div className="header-main-bar">
        <button 
          className="hamburger-btn" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰ MENÜ
        </button>

        <div className="header-brand">
          <span className="brand-logo">YKOS</span>
          <span className="brand-title">BİLGİ SİSTEMİ</span>
        </div>

        <button className="lang-toggle">
          TR ▾
        </button>
      </div>

      {/* MENÜ ÇİZGİSİNİN ALTINA AÇILAN BUTONLAR (TEK TUŞA BASINCA GÖRÜNÜR) */}
      {menuOpen && (
        <div className="dropdown-menu-container">
          <button className="nav-btn">KURUMSAL</button>
          <button className="nav-btn">YKOS METODOLOJİSİ</button>
          <button className="nav-btn active">KÖK HECE MATRİSİ</button>
          <button className="nav-btn">DAMGA ATLASI</button>
          <button className="nav-btn">OKUMA & ANALİZ MOTORU</button>
          <button className="nav-btn">GÖÇ & AKIŞ HARİTASI</button>
          <button className="nav-btn">🎥 VİDEO & SUNUMLAR</button>
          <button className="nav-btn">KÜLLİYAT & YAYINLAR</button>
          <button className="nav-btn">DİJİTAL ARŞİV</button>
        </div>
      )}
    </header>
  );
}
