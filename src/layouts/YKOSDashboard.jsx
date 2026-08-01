import React from "react";
import TopMenu from "../components/TopMenu";
import BubbleMatrixCore from "../mega/BubbleMatrix";

import "../styles/dashboard.css";

export default function YKOSDashboard() {
  return (
    <div className="dashboard-wrapper">
      <TopMenu />

      {/* Başlık */}
      <header className="ykos-header">
        <h1>YKOS BİLGİ SİSTEMİ</h1>
        <p>Disiplinler Arası Algoritmik Kültür ve Dil Veri Tabanı</p>
      </header>

      {/* Arama Kutusu */}
      <input
        type="text"
        className="ykos-search"
        placeholder="Damga, kök hece, ülke, il veya kadim merkez ara..."
      />

      {/* Dinamik Okuma Matrisi */}
      <section className="matrix-section">
        <h2>DİNAMİK OKUMA MATRİSİ</h2>
        <span className="atlas-status">GLOBAL ATLAS CANLI</span>
        <div className="matrix-canvas">
          <BubbleMatrixCore />
        </div>
      </section>

      {/* Alt Panel: YKOS Çözümleri ve İndeksler */}
      <section className="solutions-section">
        <h3>⚡ YKOS ÇÖZÜMLERİ VE İNDEKSLER</h3>

        <div className="solution-list">
          <button>Göbeklitepe T-Sütunu YKOS Okuması</button>
          <button>Etrüsk Lemnos Kitabesi & Ön Türkçe Eşleşmesi</button>
          <button>YKOS 11 Ciltlik Külliyat ve Sembol Kataloğu</button>
        </div>

        <button className="visualize-btn">
          🔮 BALONCUK MATRİSİNİ GÖRSELLEŞTİR ➔
        </button>
      </section>
    </div>
  );
}
