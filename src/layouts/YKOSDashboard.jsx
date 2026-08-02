import React from "react";

export default function YKOSDashboard({ onVisualize, onNavigateRead, onGoHome }) {
  return (
    <div style={{ maxWidth: "1240px", margin: "0 auto", color: "#fff", fontFamily: "Segoe UI, sans-serif" }}>
      
      {/* 🦅 ÜST LOGO & BAŞLIK ALANI (Yüksekliği Azaltılmış Compact Sürüm) */}
      <div 
        style={{
          backgroundColor: "#050811",
          border: "1px solid #ffd700",
          borderRadius: "16px",
          padding: "15px 25px", // Yükseklik yaklaşık 2 cm daraltıldı (eski değer: 40px 25px)
          marginBottom: "15px",
          boxShadow: "0 4px 25px rgba(0, 0, 0, 0.8)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justify: "center"
        }}
      >
        {/* SOL MENÜ DÜĞMESİ */}
        <button 
          style={{
            position: "absolute",
            left: "25px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(255,215,0,0.1)",
            border: "1px solid #ffd700",
            color: "#ffd700",
            padding: "8px 16px",
            borderRadius: "8px",
            fontWeight: "bold",
            fontSize: "0.85rem",
            cursor: "pointer"
          }}
        >
          ☰ MENÜ
        </button>

        {/* 🦅 YKOS KARTAL AMBLEMİ & LOGO (Tıklanınca Ana Sayfaya Dönüş) */}
        <div 
          onClick={onGoHome || (() => window.location.reload())}
          title="Ana Sayfaya Dön"
          style={{ 
            cursor: "pointer", 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center",
            transition: "transform 0.2s ease"
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          <img 
            src="/ykos-logo.png" 
            alt="YKOS Kartal Amblemi" 
            style={{ 
              maxHeight: "65px", // Logo boyutu dengelendi
              filter: "drop-shadow(0px 0px 10px rgba(255,215,0,0.6))",
              marginBottom: "4px"
            }}
            onError={(e) => {
              // Görsel henüz yüklenmediyse yedek ikon gösterimi
              e.target.onerror = null;
              e.target.style.display = "none";
            }}
          />
          <h1 style={{ 
            color: "#ffd700", 
            fontSize: "1.5rem", 
            fontWeight: "900", 
            letterSpacing: "2px", 
            margin: 0,
            textShadow: "0 0 12px rgba(255, 215, 0, 0.4)"
          }}>
            YKOS BİLGİ SİSTEMİ
          </h1>
          <span style={{ color: "#aaa", fontSize: "0.78rem", letterSpacing: "1px", marginTop: "2px" }}>
            Disiplinler Arası Algoritmik Kültür ve Dil Veri Tabanı
          </span>
        </div>

        {/* SAĞ DİL SEÇİMİ */}
        <div 
          style={{
            position: "absolute",
            right: "25px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(255,215,0,0.1)",
            border: "1px solid #ffd700",
            color: "#ffd700",
            padding: "8px 14px",
            borderRadius: "8px",
            fontSize: "0.85rem",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          🌐 TR ▾
        </div>

      </div>

      {/* ARAMA MOTORU VE DİĞER BİLEŞENLER AŞAĞIDA AYNEN DEVAM EDER... */}

    </div>
  );
}
