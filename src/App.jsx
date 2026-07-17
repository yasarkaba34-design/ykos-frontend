import React, { useState } from "react";
import Sidebar from "./components/Sidebar";

export default function App() {
  // İlk açılışta doğrudan ana sayfa özet panelinin gelmesi için varsayılanı "ana-sayfa" yaptık
  const [activeTab, setActiveTab] = useState("ana-sayfa");

  const handleTabSelect = (tabId) => {
    setActiveTab(tabId);
  };

  const renderMainContent = () => {
    switch (activeTab) {
      case "ana-sayfa":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Orijinal YKOS Bilgi Sistemi Tanıtım Kartı */}
            <div className="ykos-matrix-panel" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <h2>YKOS Bilgi Sistemi</h2>
                <p>Kültürel mirasın dijital araştırma platformu. Arkeoloji, dil, damga, yazıt ve kültürel verileri ortak bir bilgi ağı içinde ilişkilendirir.</p>
              </div>
              <div style={{ background: "#0c0d0f", border: "1px solid #4c3b00", borderRadius: "8px", padding: "12px 20px", textAlign: "center", minWidth: "140px" }}>
                <span style={{ fontSize: "11px", color: "#9a9a9a", display: "block" }}>Sistem Durumu</span>
                <strong style={{ fontSize: "18px", color: "#22c66a", display: "block", margin: "4px 0" }}>AKTİF</strong>
                <span style={{ fontSize: "10px", color: "#777" }}>YKOS v1.0 Beta</span>
              </div>
            </div>

            {/* İstatistik Sayıcı Kartları */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: "12px" }}>
              {[
                { label: "Ülkeler", value: "214", icon: "🌍" },
                { label: "Araştırmalar", value: "248", icon: "🏛️" },
                { label: "Damgalar", value: "9.870", icon: "🔷" },
                { label: "Petroglifler", value: "18.420", icon: "📜" },
                { label: "Yazıtlar", value: "4.132", icon: "📜" },
                { label: "Kaynaklar", value: "12.580", icon: "📚" },
                { label: "Görseller", value: "46.900", icon: "📷" },
                { label: "Atlaslar", value: "58", icon: "🗺️" }
              ].map((stat, idx) => (
                <div key={idx} style={{ background: "#111214", border: "1px solid #4c3b00", borderRadius: "10px", padding: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "20px" }}>{stat.icon}</span>
                  <div>
                    <strong style={{ display: "block", fontSize: "16px", color: "#fff" }}>{stat.value}</strong>
                    <span style={{ fontSize: "11px", color: "#9a9a9a" }}>{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Alt İki Blok: Son Eklenenler ve Hızlı Erişim */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
              {/* Göbeklitepe'nin Bulunduğu Araştırmalar Paneli */}
              <div className="ykos-matrix-panel">
                <h2>Son Eklenen Araştırmalar</h2>
                <ul style={{ color: "#f3f3f3", fontSize: "14px", lineHeight: "2", paddingLeft: "20px", margin: "10px 0 0 0" }}>
                  <li>YKOS-34-001 Yoros Kalesi</li>
                  <li style={{ color: "#d6ad2f", fontWeight: "bold" }}>Göbeklitepe</li>
                  <li>Tamgalı</li>
                  <li>Saymalıtaş</li>
                  <li>Hierapolis</li>
                </ul>
              </div>

              {/* Hızlı Erişim Paneli */}
              <div className="ykos-matrix-panel">
                <h2>Hızlı Erişim</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "12px" }}>
                  {["Araştırmalar", "Atlaslar", "Akademik", "Dijital Arşiv"].map((btn, idx) => (
                    <button key={idx} style={{ width: "100%", height: "36px", background: "#1a1b1e", border: "1px solid rgba(214,173,47,0.15)", borderRadius: "6px", color: "#d8d8d8", fontSize: "13px", cursor: "pointer", textAlign: "center" }}>
                      {btn}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case "m8":
        return (
          <div className="ykos-matrix-panel">
            <h2>m8 Matrisi Veri Laboratuvarı</h2>
            <p>Kök-Hece algoritmasına göre m8 matrisi dinamik analizi ve veri ağları burada listelenir.</p>
          </div>
        );
      case "m11":
        return (
          <div className="ykos-matrix-panel">
            <h2>m11 Matrisi Veri Laboratuvarı</h2>
            <p>m11 parametreleri, Anadolu sembol sistemleri ve tamga dizilimleri aktif görünümü.</p>
          </div>
        );
      case "m12":
        return (
          <div className="ykos-matrix-panel">
            <h2>m12 Matrisi Veri Laboratuvarı</h2>
            <p>Kozmik dil ve kaya resmi (petroglif) semantik matris doğrulamaları.</p>
          </div>
        );
      case "dunya":
        return (
          <div className="ykos-matrix-panel">
            <h2>Dünya Atlası Coğrafi Veri Sistemi</h2>
            <p>Küresel ölçekteki dil, damga ve petroglif yayılımlarının haritalandırma merkezi.</p>
          </div>
        );
      case "turkiye":
        return (
          <div className="ykos-matrix-panel">
            <h2>Türkiye Atlası Bölgesel Analiz Paneli</h2>
            <p>Anadolu coğrafyasındaki tamgaların lokasyon bazlı yoğunluk haritaları.</p>
          </div>
        );
      case "damga-atlasi":
        return (
          <div className="ykos-matrix-panel">
            <h2>Damga Atlası Tipoloji Veri Tabanı</h2>
            <p>Erken dönem sembol sistemlerinin köken ve biçimsel analizi.</p>
          </div>
        );
      case "petroglif":
        return (
          <div className="ykos-matrix-panel">
            <h2>Petroglif Atlası Kronolojik Haritalama</h2>
            <p>Kaya resimlerinin dünya genelindeki semantik ve dönemsel katmanları.</p>
          </div>
        );
      case "veri-girisi":
        return (
          <div className="ykos-matrix-panel">
            <h2>Yeni Kültürel Veri Giriş Formu</h2>
            <p>Sisteme yeni damga, petroglif veya dil analizi ekleme arayüzü.</p>
          </div>
        );
      default:
        return (
          <div className="ykos-matrix-panel">
            <h2>YKOS Bilgi Sistemi Genel Özet Paneli</h2>
          </div>
        );
    }
  };

  return (
    <div className="ykos-app-container" style={{ display: "flex" }}>
      {/* Sol Sabit Menü */}
      <Sidebar activeTab={activeTab} onTabSelect={handleTabSelect} />

      {/* Sağ Ana İçerik Gövdesi */}
      <main className="ykos-main-content" style={{ flex: 1 }}>
        
        {/* ÜST BEYAZ BANNER VE LACİVERT NAVİGASYON BARI */}
        <div className="ykos-header-wrapper" style={{ width: "100%", background: "#fff" }}>
          <div className="ykos-top-banner" style={{ display: "flex", alignItems: "center", padding: "12px 24px", justifyContent: "space-between", borderBottom: "1px solid #eef0f2" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {/* Sol logoya tıklandığında ana sayfaya dönme işlevi ekledik */}
              <div onClick={() => setActiveTab("ana-sayfa")} style={{ background: "#102436", color: "#fff", padding: "8px 12px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>YKOS</div>
              <div>
                <h1 onClick={() => setActiveTab("ana-sayfa")} style={{ margin: 0, fontSize: "18px", color: "#0f172a", fontWeight: "800", letterSpacing: "0.5px", cursor: "pointer" }}>YKOS BİLGİ SİSTEMİ</h1>
                <p style={{ margin: 0, fontSize: "11px", color: "#64748b" }}>Disiplinler Arası Algoritmik Kültür ve Dil Veri Tabanı</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "12px", color: "#22c55e", background: "#f0fdf4", padding: "4px 8px", borderRadius: "12px", fontWeight: "600" }}>● Sistem aktif</span>
              <span style={{ fontSize: "11px", color: "#94a3b8" }}>v1.0 Beta</span>
            </div>
          </div>

          <div className="ykos-sub-nav" style={{ background: "#0f1e2d", padding: "0 24px", display: "flex", height: "46px", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: "20px" }}>
              {/* Üst menüdeki Ana Sayfa yazısına basınca da paneli tetikliyoruz */}
              <span onClick={() => setActiveTab("ana-sayfa")} style={{ color: activeTab === "ana-sayfa" ? "#fff" : "#94a3b8", fontSize: "13px", fontWeight: "500", cursor: "pointer" }}>Ana Sayfa</span>
              <span style={{ color: "#94a3b8", fontSize: "13px", cursor: "pointer" }}>Araştırmalar</span>
              <span style={{ color: "#94a3b8", fontSize: "13px", cursor: "pointer" }}>Atlaslar</span>
              <span style={{ color: "#94a3b8", fontSize: "13px", cursor: "pointer" }}>Akademik</span>
              <span style={{ color: "#94a3b8", fontSize: "13px", cursor: "pointer" }}>Dijital Arşiv</span>
              <span style={{ color: "#94a3b8", fontSize: "13px", cursor: "pointer" }}>Hakkında</span>
              <span style={{ color: "#94a3b8", fontSize: "13px", cursor: "pointer" }}>İletişim</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer" }}>🔍</button>
              <span style={{ color: "#fff", fontSize: "12px", background: "#1e293b", padding: "4px 8px", borderRadius: "4px" }}>🌐 TR Türkçe</span>
            </div>
          </div>
        </div>

        {/* ALT DİNAMİK İÇERİK ALANI */}
        <div className="ykos-page-body" style={{ padding: "24px" }}>
          {renderMainContent()}
        </div>

      </main>
    </div>
  );
}