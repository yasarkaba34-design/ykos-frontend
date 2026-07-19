import React, { useState } from "react";

export default function App() {
  const [activeTopMenu, setActiveTopMenu] = useState("Ana Sayfa");
  const [activeTab, setActiveTab] = useState("m8");

  const stats = [
    { label: "Ülkeler", count: "214", icon: "🌐" },
    { label: "Araştırmalar", count: "248", icon: "🏛️" },
    { label: "Damgalar", count: "9.870", icon: "🔷" },
    { label: "Petroglifler", count: "18.420", icon: "📜" },
    { label: "Yazıtlar", count: "4.132", icon: "📜" },
    { label: "Kaynaklar", count: "12.580", icon: "📚" },
    { label: "Görseller", count: "46.900", icon: "📷" },
    { label: "Atlaslar", count: "58", icon: "🗺️" }
  ];

  return (
    <div style={{ padding: "24px", minHeight: "100vh" }}>
      {/* Üst Logo ve Başlık Alanı */}
      <header style={{ display: "flex", justifyContent: "between", itemsCenter: "center", borderBottom: "1px solid #1e293b", paddingBottom: "16px", marginBottom: "16px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ padding: "4px 8px", backgroundColor: "rgba(202, 138, 4, 0.2)", border: "1px solid rgba(234, 179, 8, 0.3)", borderRadius: "4px", fontSize: "14px", fontWeight: "bold" }}>YKOS</span>
            <h1 style={{ fontSize: "24px", fontWeight: "bold", trackingWide: "0.05em", textTransform: "uppercase", margin: 0 }}>YKOS BİLGİ SİSTEMİ</h1>
          </div>
          <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "4px", margin: 0 }}>Disiplinler Arası Algoritmik Kültür ve Dil Veri Tabanı</p>
        </div>
      </header>

      {/* Üst Yatay Menü */}
      <nav style={{ display: "flex", gap: "16px", borderBottom: "1px solid #0f172a", paddingBottom: "12px", marginBottom: "24px", fontSize: "12px" }}>
        {["Ana Sayfa", "Hakkında", "Metodoloji", "Atlas", "Araştırmacılar", "Kurumsal İşbirlikleri", "İletişim"].map((item) => (
          <button 
            key={item} 
            onClick={() => setActiveTopMenu(item)}
            style={{ 
              background: "none", 
              border: "none", 
              color: activeTopMenu === item ? "#fbbf24" : "#94a3b8", 
              fontWeight: activeTopMenu === item ? "bold" : "normal",
              cursor: "pointer"
            }}
          >
            {item}
          </button>
        ))}
      </nav>

      {/* Analiz Merkezi Matris Butonları */}
      <section style={{ marginBottom: "24px" }}>
        <h3 style={{ fontSize: "12px", fontWeight: "600", color: "#64748b", textTransform: "uppercase", marginBottom: "8px", margin: 0 }}>Analiz Merkezi</h3>
        <div style={{ display: "flex", gap: "8px" }}>
          {["m8 Matrisi", "m11 Matrisi", "m12 Matrisi", "YKOS Matris Matrisi"].map((matrix) => (
            <button 
              key={matrix}
              onClick={() => { setActiveTab(matrix.split(" ")[0]); setActiveTopMenu("Araştırmalar"); }}
              style={{ 
                padding: "6px 12px", 
                fontSize: "12px", 
                borderRadius: "4px", 
                border: "1px solid rgba(234, 179, 8, 0.3)", 
                backgroundColor: activeTab === matrix.split(" ")[0] && activeTopMenu === "Araştırmalar" ? "#fbbf24" : "#0f172a",
                color: activeTab === matrix.split(" ")[0] && activeTopMenu === "Araştırmalar" ? "#000" : "#fbbf24",
                cursor: "pointer"
              }}
            >
              ♦ {matrix}
            </button>
          ))}
        </div>
      </section>

      {/* İçerik Alanı */}
      <main style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {activeTopMenu === "Ana Sayfa" && (
          <>
            {/* Giriş Spotu */}
            <div style={{ padding: "16px", backgroundColor: "#0f172a", borderRadius: "4px", border: "1px solid #1e293b" }}>
              <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "4px", margin: 0 }}>YKOS Bilgi Sistemi</h2>
              <p style={{ fontSize: "12px", color: "#94a3b8", lineHeight: "1.6", margin: 0 }}>
                Kültürel mirasın dijital araştırma platformu. Arkeoloji, dil, damga, yazıt ve kültürel verileri ortak bir bilgi ağı içinde ilişkilendirir.
              </p>
            </div>

            {/* İstatistik Kartları Izgarası (Garantili Yan Yana Düzen) */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "16px" }}>
              {stats.map((stat, idx) => (
                <div key={idx} style={{ padding: "12px", backgroundColor: "#0f172a", borderRadius: "4px", border: "1px solid #1e293b", display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "20px", padding: "6px", backgroundColor: "#020617", borderRadius: "4px" }}>{stat.icon}</span>
                  <div>
                    <div style={{ fontSize: "18px", fontWeight: "bold", color: "#e2e8f0" }}>{stat.count}</div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Alt Panel */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
              
              {/* Sol Sütun: Son Eklenen Araştırmalar */}
              <div style={{ padding: "16px", backgroundColor: "#0f172a", borderRadius: "4px", border: "1px solid #1e293b" }}>
                <h3 style={{ fontSize: "12px", fontWeight: "bold", uppercase: "true", paddingBottom: "4px", borderBottom: "1px solid #1e293b", marginBottom: "12px", margin: 0 }}>
                  Son Eklenen Araştırmalar
                </h3>
                <ul style={{ listStyleType: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px" }}>
                  {["YKOS-34-001 Yoros Kalesi", "Göbeklitepe", "Tamgalı", "Saymalıtaş", "Hierapolis"].map((item) => (
                    <li key={item} style={{ padding: "8px", backgroundColor: "rgba(15, 23, 42, 0.5)", borderRadius: "4px", border: "1px solid #1e293b" }}>
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sağ Sütun: Hızlı Erişim */}
              <div style={{ padding: "16px", backgroundColor: "#0f172a", borderRadius: "4px", border: "1px solid #1e293b" }}>
                <h3 style={{ fontSize: "12px", fontWeight: "bold", uppercase: "true", paddingBottom: "4px", borderBottom: "1px solid #1e293b", marginBottom: "12px", margin: 0 }}>
                  Hızlı Erişim
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {["Araştırmalar", "Atlaslar", "Akademik", "Dijital Arşiv"].map((menu) => (
                    <button
                      key={menu}
                      onClick={() => setActiveTopMenu(menu === "Atlaslar" ? "Atlas" : menu)}
                      style={{ 
                        width: "100%", 
                        textAlign: "left", 
                        padding: "10px", 
                        borderRadius: "4px", 
                        backgroundColor: "#020617", 
                        color: "#e2e8f0", 
                        border: "1px solid #1e293b", 
                        cursor: "pointer",
                        fontSize: "12px",
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      <span>{menu}</span>
                      <span style={{ color: "#475569" }}>→</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </>
        )}

        {activeTopMenu !== "Ana Sayfa" && (
          <div style={{ padding: "24px", backgroundColor: "#0f172a", borderRadius: "4px", border: "1px solid #1e293b", fontSize: "12px", color: "#94a3b8" }}>
            {activeTopMenu} modülü panel görünümleri yükleniyor...
          </div>
        )}
      </main>
    </div>
  );
}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
  {[
    { icon: "🌐", value: "214", label: "Ülkeler" },
    { icon: "🏛️", value: "248", label: "Araştırmalar" },
    { icon: "🔷", value: "9.870", label: "Damgalar" },
    { icon: "📜", value: "18.420", label: "Petroglifler" },
    { icon: "📜", value: "4.132", label: "Yazıtlar" },
    { icon: "📚", value: "12.580", label: "Kaynaklar" },
    { icon: "📷", value: "46.900", label: "Görseller" },
    { icon: "🗺️", value: "58", label: "Atlaslar" }
  ].map((item, index) => (
    <div 
      key={index} 
      className="flex items-center gap-4 p-5 rounded-xl bg-[#141414] border border-gray-900 hover:border-amber-500/30 transition-all duration-200 shadow-md group"
    >
      <span className="text-2xl bg-[#0d0d0d] p-3 rounded-lg border border-gray-800 group-hover:border-amber-500/20 transition-colors">
        {item.icon}
      </span>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-slate-100 tracking-tight font-mono">
          {item.value}
        </span>
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider mt-0.5">
          {item.label}
        </span>
      </div>
    </div>
  ))}
</div>
