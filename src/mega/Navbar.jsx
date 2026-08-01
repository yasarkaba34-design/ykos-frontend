import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="navbar">
      {/* Üst Bar */}
      <div className="navbar-top">
        <div className="logo">YKOS</div>

        {/* Mobil Hamburger */}
        <div className="hamburger" onClick={() => setOpen(!open)}>
          <span />
          <span />
          <span />
        </div>
      </div>

      {/* Mobil Menü */}
      {open && (
        <div className="mobile-menu">
          {/* Dil Seçici */}
          <div className="language-select">
            <button>TR</button>
            <button>EN</button>
          </div>

          {/* Ana Menü */}
          <ul className="menu-list">
            <li>Kurumsal</li>
            <li>YKOS Metodolojisi</li>
            <li>Kök Hece Matrisi</li>
            <li>Damga Atlası</li>
            <li>Göç & Akış Haritası</li>
            <li>Semantik Motor</li>
          </ul>
        </div>
      )}
    </div>
  );
}
