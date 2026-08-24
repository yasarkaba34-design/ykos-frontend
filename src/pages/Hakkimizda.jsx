// src/pages/Hakkimizda.jsx
import React from "react";

export default function Hakkimizda({ onGoHome }) {
  const cardStyle = {
    background: "#050811",
    border: "1.5px solid #ffd700",
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.7)",
  };

  const sectionTitleStyle = {
    color: "#ffd700",
    fontSize: "1.15rem",
    fontWeight: "900",
    borderBottom: "1px solid rgba(255, 215, 0, 0.3)",
    paddingBottom: "8px",
    marginBottom: "14px",
    letterSpacing: "0.5px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  return (
    <div style={{ width: "100%", maxWidth: "1000px", margin: "0 auto", padding: "16px", color: "#e2e8f0", fontFamily: "Segoe UI, sans-serif" }}>
      
      {/* ÜST GEZİNME / GERİ DÖN BARI */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <button
          onClick={onGoHome}
          style={{
            background: "rgba(255, 215, 0, 0.1)",
            border: "1.5px solid #ffd700",
            color: "#ffd700",
            padding: "8px 18px",
            borderRadius: "6px",
            fontWeight: "bold",
            fontSize: "0.85rem",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          🏠 Anasayfaya Dön
        </button>
        <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Kurumsal Tanıtım ve Araştırma Esasları</span>
      </div>

      {/* BAŞLIK & MÜHÜR ALANI */}
      <div style={{ ...cardStyle, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{
          width: "110px",
          height: "110px",
          borderRadius: "50%",
          boxShadow: "0 0 25px rgba(212, 175, 55, 0.4)",
          border: "2px solid rgba(212, 175, 55, 0.8)",
          padding: "2px",
          background: "#080b14",
          marginBottom: "12px",
          overflow: "hidden"
        }}>
          <img 
            src="/tuditam-logo.png" 
            alt="TÜDİTAM" 
            style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} 
            onError={(e) => { e.target.style.display = "none"; }} 
          />
        </div>
        <h1 style={{ color: "#ffd700", fontSize: "1.6rem", fontWeight: "900", margin: "0 0 6px 0", letterSpacing: "2px" }}>
          TUDİTAM
        </h1>
        <div style={{ color: "#fff", fontSize: "1rem", fontWeight: "600", marginBottom: "4px" }}>
          Türk Dili ve Tarihi Araştırma Merkezi
        </div>
        <div style={{ color: "#94a3b8", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px" }}>
          Sosyal Sorumluluk Projeleri Derneği Kuruluşudur
        </div>
      </div>

      {/* GENEL TANITIM */}
      <div style={cardStyle}>
        <div style={sectionTitleStyle}>📌 HAKKIMIZDA</div>
        <p style={{ lineHeight: "1.65", fontSize: "0.9rem", color: "#cbd5e1", margin: "0 0 10px 0" }}>
          <b>Türk Dili ve Tarihi Araştırma Merkezi (TUDİTAM)</b>, Sosyal Sorumluluk Projeleri Derneği bünyesinde; Türk dili, tarih, tarihsel dil katmanları, yazı sistemleri, damgalar, semboller ve kültürel bellek alanlarında veri temelli ve karşılaştırmalı araştırmalar yürütmek amacıyla kurulmuştur.
        </p>
        <p style={{ lineHeight: "1.65", fontSize: "0.9rem", color: "#cbd5e1", margin: 0 }}>
          Merkez; geçmişten günümüze ulaşan dil, yazı, sembol ve kültürel verileri herhangi bir ön kabulden hareket etmeden incelemeyi; elde edilen verileri karşılaştırılabilir, sınanabilir ve arşivlenebilir araştırma materyallerine dönüştürmeyi amaçlar.
        </p>
      </div>

      {/* ARAŞTIRMA YAKLAŞIMIMIZ & DİZİN */}
      <div style={cardStyle}>
        <div style={sectionTitleStyle}>🔬 ARAŞTIRMA YAKLAŞIMIMIZ</div>
        <p style={{ lineHeight: "1.6", fontSize: "0.88rem", color: "#cbd5e1", marginBottom: "12px" }}>
          TUDİTAM çalışmalarında veri temelli ve karşılaştırmalı yöntem esastır. Bir dil, kültür veya uygarlık başlangıçta kaynak, alıcı, üstün ya da ikincil kabul edilmez. Benzerlikler tek başına tarihsel ilişki veya köken kanıtı sayılmaz.
        </p>

        <div style={{
          background: "#080c18",
          border: "1px solid rgba(255, 215, 0, 0.4)",
          borderRadius: "8px",
          padding: "12px",
          textAlign: "center",
          color: "#38bdf8",
          fontWeight: "bold",
          fontSize: "0.85rem",
          letterSpacing: "0.5px",
          marginBottom: "12px"
        }}>
          veri → kaynak → form → anlam → yapı → kronoloji → coğrafya → karşılaştırma → sonuç
        </div>

        <p style={{ lineHeight: "1.6", fontSize: "0.88rem", color: "#94a3b8", margin: 0, fontStyle: "italic" }}>
          "Amaç önceden belirlenmiş bir görüşü doğrulamak değil, verinin ortaya koyduğu sonucu görünür hâle getirmektir."
        </p>
      </div>

      {/* ÇALIŞMA ALANLARI VE BİRİMLER (2 SÜTUN) */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
        
        <div style={{ ...cardStyle, marginBottom: 0 }}>
          <div style={sectionTitleStyle}>📚 ÇALIŞMA ALANLARIMIZ</div>
          <ul style={{ paddingLeft: "18px", margin: 0, fontSize: "0.85rem", lineHeight: "1.7", color: "#cbd5e1" }}>
            <li>Türk dili ve lehçeleri</li>
            <li>Tarihsel Anadolu dil katmanları</li>
            <li>Kök ve yapı araştırmaları</li>
            <li>Damga ve sembol sistemleri</li>
            <li>Tarihsel yazı sistemleri</li>
            <li>Kültürel bellek</li>
            <li>Karşılaştırmalı dil araştırmaları</li>
            <li>Veri tabanı ve atlas çalışmaları</li>
            <li>Rapor, kitap ve dijital yayınlar</li>
            <li>Sergi ve bilimsel sunumlar</li>
          </ul>
        </div>

        <div style={{ ...cardStyle, marginBottom: 0 }}>
          <div style={sectionTitleStyle}>🏛️ ÇALIŞMA BİRİMLERİ</div>
          <p style={{ fontSize: "0.85rem", color: "#94a3b8", marginBottom: "10px" }}>Merkez Yönergesi doğrultusunda teşkil edilen birimler:</p>
          <ul style={{ paddingLeft: "18px", margin: 0, fontSize: "0.85rem", lineHeight: "1.7", color: "#cbd5e1" }}>
            <li><b>Türk Dilleri Karşılaştırma Laboratuvarı</b></li>
            <li><b>Damga ve Yazı Sistemleri Birimi</b></li>
            <li><b>Veri ve Atlas Birimi</b></li>
            <li><b>Yayın ve Rapor Birimi</b></li>
            <li><b>Sergi ve Sunum Birimi</b></li>
          </ul>

          <div style={{ marginTop: "18px", background: "rgba(0, 255, 127, 0.05)", border: "1px solid rgba(0, 255, 127, 0.3)", borderRadius: "6px", padding: "10px" }}>
            <div style={{ color: "#00ff7f", fontWeight: "bold", fontSize: "0.8rem", marginBottom: "4px" }}>⚖️ TEMEL İLKEMİZ</div>
            <div style={{ fontSize: "0.78rem", color: "#ccc", lineHeight: "1.4" }}>
              Araştırmanın görevi bir şeyi sahiplenmek değil, gerçeği araştırmaktır. Yeni veriler önceki değerlendirmeleri değiştirebilir; bu durumda eski kayıt korunur, yeni veri yeniden sınanır ve gerekçesiyle güncellenir.
            </div>
          </div>
        </div>

      </div>

      {/* KURULUŞ KARARI, YÖNERGE & İLETİŞİM (2 SÜTUN) */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "16px" }}>
        
        {/* KURULUŞ BİLGİLERİ */}
        <div style={cardStyle}>
          <div style={sectionTitleStyle}>📜 KURULUŞ KARARI & YÖNERGE</div>
          <p style={{ fontSize: "0.82rem", color: "#cbd5e1", lineHeight: "1.5", marginBottom: "10px" }}>
            TUDİTAM, Sosyal Sorumluluk Projeleri Derneği Yönetim Kurulunun 03.04.2026 tarih ve 6 sayılı kararı ile kurulmuş; çalışma usul ve esaslarını belirleyen yönerge 03.04.2026 tarih ve 7 sayılı karar ile kabul edilmiştir.
          </p>

          <div style={{ fontSize: "0.82rem", lineHeight: "1.6", color: "#cbd5e1", background: "#080c18", padding: "10px", borderRadius: "6px", border: "1px solid #334155" }}>
            <div>📅 <b>Kuruluş Tarihi:</b> 03 Nisan 2026</div>
            <div>📋 <b>Kuruluş Kararı:</b> No. 6</div>
            <div>📑 <b>Merkez Yönergesi:</b> No. 7</div>
            <div>👤 <b>Koordinatör:</b> Yaşar Kaba</div>
            <div>🏛️ <b>Bağlı Kuruluş:</b> Sosyal Sorumluluk Projeleri Derneği</div>
          </div>
        </div>

        {/* İLETİŞİM & MERKEZ ADRESİ */}
        <div style={cardStyle}>
          <div style={sectionTitleStyle}>📍 MERKEZ ADRESİ</div>
          <div style={{ fontSize: "0.82rem", lineHeight: "1.6", color: "#cbd5e1" }}>
            <div style={{ fontWeight: "bold", color: "#ffd700", marginBottom: "4px" }}>
              TUDİTAM — Türk Dili ve Tarihi Araştırma Merkezi
            </div>
            <div>Aziz Mahmut Hüdayi Mahallesi</div>
            <div>Ramazanoğlu Sokak No: 2, Daire: 4</div>
            <div style={{ color: "#38bdf8", fontWeight: "600", marginTop: "2px" }}>Üsküdar / İstanbul</div>
            <div style={{ marginTop: "10px", fontSize: "0.72rem", color: "#64748b", borderTop: "1px solid #1e293b", paddingTop: "6px" }}>
              Sosyal Sorumluluk Projeleri Derneği kuruluşudur.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}