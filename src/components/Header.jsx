import React, { useState } from "react";
import "./Header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="ykos-header">
      {/* 1. MOBİL / MASAÜSTÜ ÜST ÇUBUK */}
      <div className="header-bar">
        <button 
          className="menu-toggle-btn" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menüyü Aç/Kapa"
        >
          ☰
        </button>

        <div className="logo-badge">
          <span>YKOS</span>
        </div>

        <button className="lang-btn">
          🌐 TR
        </button>
      </div>

      {/* 2. TEK TUŞ (HAMBURGER) ALTINDA AÇILAN MENÜ LİSTESİ */}
      {menuOpen && (
        <nav className="dropdown-nav">
          <button className="nav-item">KURUMSAL</button>
          <button className="nav-item">YKOS METODOLOJİSİ</button>
          <button className="nav-item active">KÖK HECE MATRİSİ</button>
          <button className="nav-item">DAMGA ATLASI</button>
          <button className="nav-item">OKUMA & ANALİZ MOTORU</button>
          <button className="nav-item">GÖÇ & AKIŞ HARİTASI</button>
          <button className="nav-item">🎥 VİDEO & SUNUMLAR</button>
          <button className="nav-item">KÜLLİYAT & YAYINLAR</button>
          <button className="nav-item">DİJİTAL ARŞİV</button>
        </nav>
      )}
    </header>
  );
}
