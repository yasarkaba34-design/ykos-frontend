import React, { useEffect, useRef, useState } from "react";
import "../styles/header.css";

const menuItems = [
  {
    label: "Araştırmalar",
    items: [
      { label: "Araştırma Dosyaları", href: "#arastirma-dosyalari" },
      { label: "Dil Araştırmaları", href: "#dil-arastirmalari" },
      { label: "Damga Analizleri", href: "#damga-analizleri" },
      { label: "Petroglif Analizleri", href: "#petroglif-analizleri" },
      { label: "Yazıt Analizleri", href: "#yazit-analizleri" },
      { label: "Yer Adları", href: "#yer-adlari" },
      { label: "Karşılaştırmalı Çalışmalar", href: "#karsilastirmali" },
      { label: "YKOS Analizleri", href: "#ykos-analizleri" },
    ],
  },
  {
    label: "Atlaslar",
    items: [
      { label: "Dünya Atlası", href: "#dunya-atlasi" },
      { label: "Türkiye Atlası", href: "#turkiye-atlasi" },
      { label: "Damga Atlası", href: "#damga-atlasi" },
      { label: "Petroglif Atlası", href: "#petroglif-atlasi" },
      { label: "Yazıt Atlası", href: "#yazit-atlasi" },
      { label: "Yer Adları Atlası", href: "#yer-adlari-atlasi" },
      { label: "Kazı Alanları Atlası", href: "#kazi-alanlari" },
    ],
  },
  {
    label: "Akademik",
    items: [
      { label: "Akademik Makaleler", href: "#akademik-makaleler" },
      { label: "Bildiriler", href: "#bildiriler" },
      { label: "Araştırma Raporları", href: "#arastirma-raporlari" },
      { label: "Yayınlar", href: "#yayinlar" },
      { label: "YKOS Metodolojisi", href: "#ykos-metodolojisi" },
      { label: "Bibliyografya", href: "#bibliyografya" },
      { label: "Kaynakça", href: "#kaynakca" },
      { label: "Akademik İş Birlikleri", href: "#akademik-isbirlikleri" },
    ],
  },
  {
    label: "Dijital Arşiv",
    items: [
      { label: "Fotoğraf Arşivi", href: "#fotograf-arsivi" },
      { label: "Video Arşivi", href: "#video-arsivi" },
      { label: "Belge Arşivi", href: "#belge-arsivi" },
      { label: "Haritalar", href: "#haritalar" },
      { label: "Kaynaklar", href: "#kaynaklar" },
      { label: "Veri Tabloları", href: "#veri-tablolari" },
    ],
  },
];

const languages = [
  { code: "tr", flag: "🇹🇷", label: "Türkçe" },
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "fr", flag: "🇫🇷", label: "Français" },
  { code: "de", flag: "🇩🇪", label: "Deutsch" },
  { code: "it", flag: "🇮🇹", label: "Italiano" },
  { code: "es", flag: "🇪🇸", label: "Español" },
  { code: "pt", flag: "🇵🇹", label: "Português" },
  { code: "ru", flag: "🇷🇺", label: "Русский" },
  { code: "ar", flag: "🇸🇦", label: "العربية" },
  { code: "zh", flag: "🇨🇳", label: "中文" },
  { code: "ja", flag: "🇯🇵", label: "日本語" },
];

export default function Header() {
  const [openMenu, setOpenMenu] = useState(null);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setOpenMenu(null);
        setLanguageOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setLanguageOpen(false);
        setMobileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function toggleMenu(label) {
    setOpenMenu((current) => (current === label ? null : label));
    setLanguageOpen(false);
  }

  function selectLanguage(language) {
    setSelectedLanguage(language);
    setLanguageOpen(false);
    setMobileOpen(false);

    // Çeviri altyapısı bağlandığında burada dil değiştirilecek.
    document.documentElement.lang = language.code;
  }

  function closeNavigation() {
    setOpenMenu(null);
    setLanguageOpen(false);
    setMobileOpen(false);
  }

  return (
    <header ref={headerRef} className="ykos-header">
      <div className="ykos-header-top">
        <a
          href="#ana-sayfa"
          className="ykos-brand"
          onClick={closeNavigation}
          aria-label="YKOS ana sayfa"
        >
          <div className="ykos-header-logo" aria-hidden="true">
            YKOS
          </div>

          <div className="ykos-header-text">
            <h1>YKOS BİLGİ SİSTEMİ</h1>
            <p>Disiplinler Arası Algoritmik Kültür ve Dil Veri Tabanı</p>
          </div>
        </a>

        <div className="ykos-header-meta">
          <div className="ykos-system-status">
            <span className="ykos-live-dot" />
            <span>Sistem aktif</span>
          </div>

          <span className="ykos-version">v1.0 Beta</span>
        </div>

        <button
          type="button"
          className="ykos-mobile-toggle"
          aria-label="Menüyü aç veya kapat"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav
        className={`ykos-navbar ${mobileOpen ? "is-open" : ""}`}
        aria-label="Ana menü"
      >
        <div className="ykos-navbar-menu">
          <a
            href="#ana-sayfa"
            className="ykos-nav-link"
            onClick={closeNavigation}
          >
            Ana Sayfa
          </a>

          {menuItems.map((menu) => {
            const isOpen = openMenu === menu.label;

            return (
              <div
                className={`ykos-dropdown ${isOpen ? "is-open" : ""}`}
                key={menu.label}
              >
                <button
                  type="button"
                  className="ykos-nav-link ykos-dropdown-trigger"
                  aria-expanded={isOpen}
                  onClick={() => toggleMenu(menu.label)}
                >
                  <span>{menu.label}</span>
                  <span className="ykos-chevron" aria-hidden="true">
                    ▾
                  </span>
                </button>

                <div className="ykos-dropdown-panel">
                  <div className="ykos-dropdown-title">{menu.label}</div>

                  {menu.items.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={closeNavigation}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            );
          })}

          <a
            href="#hakkinda"
            className="ykos-nav-link"
            onClick={closeNavigation}
          >
            Hakkında
          </a>

          <a
            href="#iletisim"
            className="ykos-nav-link"
            onClick={closeNavigation}
          >
            İletişim
          </a>
        </div>

        <div className="ykos-navbar-actions">
          <button
            type="button"
            className="ykos-icon-button"
            aria-label="Arama"
            title="Arama"
          >
            <span aria-hidden="true">⌕</span>
          </button>

          <div
            className={`ykos-language ${
              languageOpen ? "is-open" : ""
            }`}
          >
            <button
              type="button"
              className="ykos-language-trigger"
              aria-expanded={languageOpen}
              onClick={() => {
                setLanguageOpen((current) => !current);
                setOpenMenu(null);
              }}
            >
              <span className="ykos-globe" aria-hidden="true">
                🌍
              </span>

              <span className="ykos-active-flag">
                {selectedLanguage.flag}
              </span>

              <span className="ykos-language-name">
                {selectedLanguage.label}
              </span>

              <span className="ykos-chevron" aria-hidden="true">
                ▾
              </span>
            </button>

            <div className="ykos-language-panel">
              <div className="ykos-language-heading">
                <strong>Dünya Dilleri</strong>
                <span>Dilinizi seçin</span>
              </div>

              <div className="ykos-language-grid">
                {languages.map((language) => (
                  <button
                    type="button"
                    key={language.code}
                    className={
                      selectedLanguage.code === language.code
                        ? "is-selected"
                        : ""
                    }
                    onClick={() => selectLanguage(language)}
                  >
                    <span className="ykos-language-flag">
                      {language.flag}
                    </span>

                    <span>{language.label}</span>

                    {selectedLanguage.code === language.code && (
                      <span className="ykos-language-check">✓</span>
                    )}
                  </button>
                ))}
              </div>

              <div className="ykos-language-note">
                Ön planda dil, arka planda bölgesel dil yapıları.
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}