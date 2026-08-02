import React from "react";

export default function YKOSDashboard({ onVisualize, onNavigateRead, onGoHome }) {
  return (
    <div style={{ maxWidth: "1240px", margin: "0 auto", color: "#fff", fontFamily: "Segoe UI, sans-serif" }}>
      
      {/* 🦅 ÜST LOGO & BAŞLIK ALANI (Derli Toplu & Kibar Sürüm) */}
      <div 
        style={{
          backgroundColor: "#050811",
          border: "1px solid #ffd700",
          borderRadius: "16px",
          padding: "15px 25px",
          marginBottom: "15px",
          boxShadow: "0 4px 25px rgba(0, 0, 0, 0.8)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
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
              maxHeight: "65px",
              filter: "drop-shadow(0px 0px 10px rgba(255,215,0,0.6))",
              marginBottom: "4px"
            }}
            onError={(e) => { e.target.style.display = "none"; }}
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

      {/* 🔍 ARAMA MOTORU BARI */}
      <div style={{
        backgroundColor: "#050811",
        border: "1px solid #ffd700",
        borderRadius: "12px",
        padding: "12px 20px",
        marginBottom: "15px",
        display: "flex",
        alignItems: "center",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.7)"
      }}>
        <span style={{ color: "#ffd700", fontSize: "1.2rem", marginRight: "12px" }}>🔍</span>
        <input 
          type="text" 
          placeholder="ykos.com.tr Arşivinde Ara: (Örn: Çatalhöyük, Göbeklitepe, YOL, Etrüsk...)" 
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            color: "#fff",
            fontSize: "0.95rem",
            outline: "none"
          }}
        />
      </div>

      {/* 📊 CANLI SAYAÇLAR PANOLARI */}
      <div style={{
        backgroundColor: "#050811",
        border: "1px solid #ffd700",
        borderRadius: "16px",
        padding: "20px",
        marginBottom: "20px",
        position: "relative"
      }}>
        <div style={{ position: "absolute", right: "20px", top: "15px", textAlign: "right" }}>
          <span style={{ fontSize: "0.65rem", color: "#aaa", display: "block" }}>SİSTEM DURUMU</span>
          <span style={{ fontSize: "0.85rem", color: "#ffd700", fontWeight: "900" }}>AKTİF</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: "10px", marginTop: "10px" }}>
          {[
            { label: "Ülkeler", val: "214", icon: "🌐" },
            { label: "Araştırmalar", val: "248", icon: "🏛️" },
            { label: "Damgalar", val: "9.870", icon: "🔹" },
            { label: "Petroglifler", val: "18.420", icon: "🗿" },
            { label: "Yazıtlar", val: "4.132", icon: "📜" },
            { label: "Kaynaklar", val: "12.580", icon: "📚" },
            { label: "Görseller", val: "46.900", icon: "📷" },
            { label: "Atlaslar", val: "58", icon: "🗺️" }
          ].map((st, idx) => (
            <div key={idx} style={{
              backgroundColor: "rgba(255, 215, 0, 0.03)",
              border: "1px solid rgba(255, 215, 0, 0.3)",
              borderRadius: "10px",
              padding: "12px 8px",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "1.1rem", marginBottom: "4px" }}>{st.icon}</div>
              <div style={{ color: "#ffd700", fontWeight: "bold", fontSize: "1.1rem" }}>{st.val}</div>
              <div style={{ color: "#aaa", fontSize: "0.72rem", marginTop: "2px" }}>{st.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 🧭 MATRİSLER VE YKOS İNDEKS ÇÖZÜMLERİ PANOLARI */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
        
        {/* SOL: MATRİSLER */}
        <div style={{
          backgroundColor: "#050811",
          border: "1px solid #ffd700",
          borderRadius: "16px",
          padding: "20px"
        }}>
          <h3 style={{ color: "#ffd700", fontSize: "1.05rem", marginTop: 0, marginBottom: "15px", borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "8px" }}>
            MATRİSLER VE KATMANLAR
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.88rem" }}>
            <li onClick={onVisualize} style={{ cursor: "pointer", color: "#ffd700", fontWeight: "bold" }}>💻 KÖK HECE MATRİSİ</li>
            <li style={{ color: "#ddd" }}>🗺️ DAMGA ATLASI</li>
            <li style={{ color: "#ddd" }}>🔬 OKUMA & ANALİZ MOTORU</li>
            <li style={{ color: "#ddd" }}>🟢 GÖÇ & AKIŞ HARİTASI</li>
          </ul>
        </div>

        {/* SAĞ: ÇÖZÜMLER */}
        <div style={{
          backgroundColor: "#050811",
          border: "1px solid #ffd700",
          borderRadius: "16px",
          padding: "20px"
        }}>
          <h3 style={{ color: "#ffd700", fontSize: "1.05rem", marginTop: 0, marginBottom: "15px", borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "8px" }}>
            ⚡ YKOS ÇÖZÜMLERİ VE İNDEKLSER
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { id: 1, title: "Çatalhöyük Kök Hece ve Damga Sembolizmi ➔", desc: "Çatalhöyük duvar resimleri ve pişmiş toprak mühürlerdeki YKOS 100 kök hece eşleşmeleri." },
              { id: 2, title: "Göbeklitepe T-Sütunu YKOS Okuması ➔", desc: "Şanlıurfa Göbeklitepe T Sütunları üzerindeki ikil sembollerin YKOS çözümü." }
            ].map((item) => (
              <div 
                key={item.id} 
                onClick={() => onNavigateRead(item.id)}
                style={{ cursor: "pointer", backgroundColor: "rgba(255,215,0,0.03)", padding: "10px", borderRadius: "8px", border: "1px solid rgba(255,215,0,0.2)" }}
              >
                <div style={{ color: "#ffd700", fontWeight: "bold", fontSize: "0.85rem" }}>📜 {item.title}</div>
                <div style={{ color: "#aaa", fontSize: "0.75rem", marginTop: "4px" }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}