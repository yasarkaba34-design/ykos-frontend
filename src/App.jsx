import React, { useState } from "react";
import Matris from "./components/Matris";
import Atlas from "./components/Atlas";
import VeriGirisi from "./components/VeriGirisi";
import "./App.css";

const FILTERS = [
  "Hepsi",
  "Ülke",
  "İl",
  "Antik Kent",
  "Damga",
  "Petroglif",
  "Yazıt",
  "Höyük",
];

const STATS = [
  { label: "Ülke", count: "196", icon: "🌍" },
  { label: "Türkiye İli", count: "81", icon: "📍" },
  { label: "Antik Kent", count: "1.240", icon: "🏛️" },
  { label: "Damga", count: "15.320", icon: "🔶" },
  { label: "Petroglif", count: "8.950", icon: "🪨" },
  { label: "Görsel", count: "120.000+", icon: "🖼️" },
];

const MENU_ITEMS = [
  { id: "m8", label: "m8 Matrisi", icon: "◈" },
  { id: "m11", label: "m11 Matrisi", icon: "◇" },
  { id: "m12", label: "m12 Matrisi", icon: "⬡" },
  { id: "atlas", label: "Dünya Atlası", icon: "🌍" },
  { id: "turkiye", label: "Türkiye Atlası", icon: "🇹🇷" },
  { id: "damga", label: "Damga Atlası", icon: "🔶" },
  { id: "petroglif", label: "Petroglif Atlası", icon: "🪨" },
  { id: "veri-girisi", label: "Veri Girişi", icon: "✚" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("m8");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Hepsi");
  const [menuOpen, setMenuOpen] = useState(false);

  const selectTab = (tab) => {
    setActiveTab(tab);
    setMenuOpen(false);
  };

  const renderContent = () => {
    if (activeTab === "veri-girisi") {
      return (
        <VeriGirisi
          searchQuery={searchQuery}
          activeFilter={activeFilter}
        />
      );
    }

    if (
      activeTab === "m8" ||
      activeTab === "m11" ||
      activeTab === "m12"
    ) {
      return (
        <Matris
          query={searchQuery}
          filter={activeFilter}
          matrixType={activeTab}
        />
      );
    }

    return (
      <Atlas
        query={searchQuery}
        filter={activeFilter}
        atlasType={activeTab}
      />
    );
  };

  return (
    <div className="ykos-app">
      <button
        type="button"
        className="mobile-menu-button"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Menüyü aç veya kapat"
      >
        ☰
      </button>

      <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <div className="sidebar-logo">YKOS</div>

          <div>
            <strong>YKOS</strong>
            <small>Bilgi Sistemi</small>
          </div>
        </div>

        <nav className="sidebar-nav">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => selectTab(item.id)}
              className={`sidebar-item ${
                activeTab === item.id ? "sidebar-item-active" : ""
              }`}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span className="live-dot" />
          Canlı veri bağlantısı
        </div>
      </aside>

      {menuOpen && (
        <button
          type="button"
          className="mobile-overlay"
          onClick={() => setMenuOpen(false)}
          aria-label="Menüyü kapat"
        />
      )}

      <div className="page-shell">
        <header className="hero">
          <div className="hero-logo">YKOS</div>

          <div>
            <h1>YKOS BİLGİ SİSTEMİ</h1>
            <p>
              Disiplinler Arası Algoritmik Kültür ve Dil Veri Tabanı
            </p>
          </div>

          <div className="system-status">
            <span className="live-dot" />
            Sistem aktif
          </div>
        </header>

        <section className="search-panel">
          <div className="search-row">
            <span className="search-icon">⌕</span>

            <input
              type="search"
              placeholder="Damga, kök hece, ülke, il veya kadim merkez ara..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="search-input"
            />

            {searchQuery && (
              <button
                type="button"
                className="clear-search"
                onClick={() => setSearchQuery("")}
                aria-label="Aramayı temizle"
              >
                ×
              </button>
            )}
          </div>

          <div className="filter-row">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`filter-button ${
                  activeFilter === filter
                    ? "filter-button-active"
                    : ""
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        <section className="quick-tabs">
          {MENU_ITEMS.slice(0, 5).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => selectTab(item.id)}
              className={`quick-tab ${
                activeTab === item.id ? "quick-tab-active" : ""
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </section>

        <main className="main-grid">
          <section className="content-panel">
            <div className="content-toolbar">
              <div>
                <span className="eyebrow">
                  Aktif çalışma katmanı
                </span>

                <h2>{getTabTitle(activeTab)}</h2>
              </div>

              <div className="active-query">
                <span>Filtre</span>
                <strong>{activeFilter}</strong>
              </div>
            </div>

            <div className="component-area">
              {renderContent()}
            </div>
          </section>

          <aside className="right-column">
            <article className="discovery-card">
              <div className="discovery-image">
                <div className="discovery-image-overlay" />

                <div className="discovery-badge">
                  <span className="live-dot" />
                  Günün keşfi
                </div>

                <div className="discovery-image-title">
                  <small>ŞANLIURFA · TÜRKİYE</small>
                  <h3>Göbeklitepe</h3>
                </div>
              </div>

              <div className="discovery-body">
                <p>
                  İnsanlık tarihinin erken anıtsal merkezlerinden biri
                  olarak YKOS karşılaştırmalı araştırmalarının temel
                  kayıt noktalarındandır.
                </p>

                <div className="discovery-metrics">
                  <div>
                    <span>Dönem</span>
                    <strong>MÖ 9600</strong>
                  </div>

                  <div>
                    <span>Damga</span>
                    <strong>148</strong>
                  </div>

                  <div>
                    <span>Petroglif</span>
                    <strong>62</strong>
                  </div>
                </div>

                <button
                  type="button"
                  className="primary-button"
                  onClick={() => {
                    setSearchQuery("Göbeklitepe");
                    setActiveFilter("Antik Kent");
                    selectTab("atlas");
                  }}
                >
                  Kaydı incele →
                </button>
              </div>
            </article>

            <article className="progress-card">
              <span className="eyebrow">Atlas ilerlemesi</span>
              <h3>Veri giriş durumu</h3>

              <ProgressItem label="Ülke dosyaları" value={64} />
              <ProgressItem label="Türkiye illeri" value={42} />
              <ProgressItem
                label="Petroglif kayıtları"
                value={31}
              />
            </article>
          </aside>
        </main>

        <section className="stats-section">
          <div className="stats-heading">
            <div>
              <span className="eyebrow">Canlı veri tabanı</span>
              <h2>YKOS Kayıt İstatistikleri</h2>
            </div>

            <span className="last-update">
              Son güncelleme: 2026
            </span>
          </div>

          <div className="stats-grid">
            {STATS.map((stat) => (
              <article key={stat.label} className="stat-card">
                <span className="stat-icon">{stat.icon}</span>

                <div>
                  <strong>{stat.count}</strong>
                  <span>{stat.label}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer className="footer">
          <div>
            <strong>YKOS Araştırma Platformu</strong>
            <span>© 2026</span>
          </div>

          <div>
            <span>Kurucu: Yaşar Kaba</span>
            <span>Dijital organizasyon: AL AJANS</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

function ProgressItem({ label, value }) {
  return (
    <div className="progress-item">
      <div className="progress-label">
        <span>{label}</span>
        <strong>%{value}</strong>
      </div>

      <div className="progress-track">
        <div
          className="progress-value"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function getTabTitle(tab) {
  const titles = {
    m8: "m8 Matrisi",
    m11: "m11 Matrisi",
    m12: "m12 Matrisi",
    atlas: "Dünya Atlası",
    turkiye: "Türkiye Katmanlar Atlası",
    damga: "Dünya Damga Atlası",
    petroglif: "Petroglif Atlası",
    "veri-girisi": "YKOS Veri Giriş ve Yönetim Paneli",
  };

  return titles[tab] || "YKOS Çalışma Alanı";
}