import React, { useState } from "react";
// Yeni eklenen modül yapısını projeye dahil ediyoruz
import { AnadoluShieldModule } from "./modules/AnadoluShieldModule";

export default function App() {
  const [activeTopMenu, setActiveTopMenu] = useState("Ana Sayfa");
  const [activeTab, setActiveTab] = useState("m8");

  // Orijinal şablon verileriniz
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
    <div className="min-h-screen p-6 selection:bg-yellow-500 selection:text-black">
      {/* Üst Logo ve Başlık Alanı */}
      <header className="border-b border-gray-800 pb-4 mb-4 flex justify-between items-center">
        <div>
          <div className="flex items-center space-x-3">
            <span className="px-2 py-1 bg-yellow-600/20 text-yellow-500 font-bold rounded border border-yellow-500/30 text-sm">YKOS</span>
            <h1 className="text-2xl font-bold text-yellow-500 tracking-wide uppercase">YKOS BİLGİ SİSTEMİ</h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">Disiplinler Arası Algoritmik Kültür ve Dil Veri Tabanı</p>
        </div>
        <div className="text-xs text-green-400 bg-green-950/30 px-3 py-1 rounded-full border border-green-500/20 flex items-center space-x-1.5">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span>Sistem Aktif v1.0 Beta</span>
        </div>
      </header>

      {/* Üst Yatay Menü */}
      <nav className="flex space-x-4 border-b border-gray-900 pb-3 mb-6 text-xs text-gray-400">
        {["Ana Sayfa", "Hakkında", "Metodoloji", "Atlas", "Araştırmacılar", "Kurumsal İşbirlikleri", "İletişim"].map((item) => (
          <button 
            key={item} 
            onClick={() => setActiveTopMenu(item)}
            className={`hover:text-yellow-500 transition-colors ${activeTopMenu === item ? "text-yellow-500 font-bold" : ""}`}
          >
            {item}
          </button>
        ))}
      </nav>

      {/* Analiz Merkezi Matris Butonları */}
      <section className="mb-6">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Analiz Merkezi</h3>
        <div className="flex space-x-2">
          {["m8 Matrisi", "m11 Matrisi", "m12 Matrisi", "YKOS Matris Matrisi"].map((matrix) => (
            <button 
              key={matrix}
              onClick={() => { setActiveTab(matrix.split(" ")[0]); setActiveTopMenu("Araştırmalar"); }}
              className={`px-3 py-1.5 text-xs font-medium rounded border transition-all ${
                activeTab === matrix.split(" ")[0] && activeTopMenu === "Araştırmalar"
                  ? "bg-yellow-500 text-black border-yellow-500"
                  : "bg-gray-950 text-yellow-500 border-yellow-500/30 hover:bg-gray-900"
              }`}
            >
              ♦ {matrix}
            </button>
          ))}
        </div>
      </section>

      {/* İçerik Alanı */}
      <main className="space-y-6">
        {activeTopMenu === "Ana Sayfa" && (
          <>
            {/* Giriş Spotu */}
            <div className="p-4 bg-gray-950/50 rounded border border-gray-900">
              <h2 className="text-lg font-bold text-yellow-500 mb-1">YKOS Bilgi Sistemi</h2>
              <p className="text-xs text-gray-400 leading-relaxed">
                Kültürel mirasın dijital araştırma platformu. Arkeoloji, dil, damga, yazıt ve kültürel verileri ortak bir bilgi ağı içinde ilişkilendirir.
              </p>
            </div>

            {/* İstatistik Kartları Izgarası */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="p-3 bg-gray-950/40 rounded border border-gray-900 flex items-center space-x-3 hover:border-gray-800 transition-colors">
                  <span className="text-xl p-1.5 bg-gray-900 rounded">{stat.icon}</span>
                  <div>
                    <div className="text-lg font-mono font-bold text-gray-200">{stat.count}</div>
                    <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* İki Sütunlu Yan Yana Alt Panel */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Sol Sütun: Son Eklenen Araştırmalar */}
              <div className="md:col-span-2 p-4 bg-gray-950/40 rounded border border-gray-900">
                <h3 className="text-xs font-bold text-yellow-500 uppercase tracking-wider mb-3 pb-1 border-b border-gray-900">
                  Son Eklenen Araştırmalar
                </h3>
                <ul className="space-y-2 text-xs text-gray-300 font-mono">
                  <li className="p-2 bg-gray-900/30 rounded border border-gray-900">• YKOS-34-001 Yoros Kalesi</li>
                  <li className="p-2 bg-gray-900/30 rounded border border-gray-900">• Göbeklitepe</li>
                  <li className="p-2 bg-gray-900/30 rounded border border-gray-900">• Tamgalı</li>
                  <li className="p-2 bg-gray-900/30 rounded border border-gray-900">• Saymalıtaş</li>
                  <li className="p-2 bg-gray-900/30 rounded border border-gray-900">• Hierapolis</li>
                </ul>
              </div>

              {/* Sağ Sütun: Hızlı Erişim ve Modül Durumu */}
              <div className="space-y-4">
                <div className="p-4 bg-gray-950/40 rounded border border-gray-900">
                  <h3 className="text-xs font-bold text-yellow-500 uppercase tracking-wider mb-3 pb-1 border-b border-gray-900">
                    Hızlı Erişim
                  </h3>
                  <div className="flex flex-col space-y-2">
                    {["Araştırmalar", "Atlaslar", "Akademik", "Dijital Arşiv"].map((menu) => (
                      <button
                        key={menu}
                        onClick={() => setActiveTopMenu(menu === "Atlaslar" ? "Atlas" : menu)}
                        className="w-full text-left p-2.5 rounded bg-gray-900/50 text-gray-300 hover:text-yellow-500 hover:bg-gray-800 border border-gray-850 transition-all text-xs flex justify-between items-center"
                      >
                        <span>{menu}</span>
                        <span className="text-gray-600">→</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Algoritmik Modüllerin Aktiflik Göstergesi */}
                <div className="p-3 bg-gray-950/60 rounded border border-yellow-900/30 text-[10px] text-gray-400 font-mono space-y-1">
                  <div className="text-yellow-600 font-bold uppercase tracking-wider mb-1">Modül Entegrasyonu</div>
                  <div className="flex justify-between"><span>Anadolu Core:</span> <span className="text-green-500">Yüklendi</span></div>
                  <div className="flex justify-between"><span>Göç Sarmalı (Spiral):</span> <span className="text-green-500">Aktif</span></div>
                </div>
              </div>

            </div>
          </>
        )}

        {/* Diğer Alt Menü Sekmeleri */}
        {activeTopMenu !== "Ana Sayfa" && (
          <div className="p-6 bg-gray-950/40 rounded border border-gray-900 text-gray-400 text-xs font-mono">
            {activeTopMenu} modülü panel görünümleri ve algoritmik veriler yükleniyor...
          </div>
        )}
      </main>
    </div>
  );
}