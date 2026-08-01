import React, { useState } from "react";

export default function YKOSDashboard() {
  const [showMatrix, setShowMatrix] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const ykosSolutions = [
    { 
      id: 1, 
      title: "Göbeklitepe T-Sütunu YKOS Okuması", 
      clusterKey: "GNT-01",
      detail: "T-Sütunu üzerindeki ikonografik damgaların algoritmik hece matrisi çözümü." 
    },
    { 
      id: 2, 
      title: "Etrüsk Lemnos Kitabesi & Ön Türkçe Eşleşmesi", 
      clusterKey: "ETR-02",
      detail: "Lemnos yazıtındaki hece köklerinin Anadolu-Ön Türkçe damga atlası ile fonetik analizi." 
    },
    { 
      id: 3, 
      title: "YKOS 11 Ciltlik Külliyat ve Sembol Kataloğu", 
      clusterKey: "KUL-03",
      detail: "Külliyatın tüm ciltlerindeki piktogram ve petrogliflerin bütünleşik indeksi." 
    }
  ];

  return (
    <div style={{ padding: "10px", color: "#fff", minHeight: "100vh", fontFamily: "sans-serif" }}>
      
      {/* BAŞLIK VE ARAMA ALANI */}
      <div style={{ textAlign: "center", marginBottom: "20px", marginTop: "-15px", padding: "0 10px" }}>
        <h1 style={{ color: "#ffd700", fontSize: "clamp(22px, 5vw, 32px)", fontWeight: "900", margin: "0 0 4px 0", letterSpacing: "1px" }}>
          YKOS BİLGİ SİSTEMİ
        </h1>
        <p style={{ color: "#aaa", fontSize: "clamp(11px, 2.5vw, 14px)", margin: "0 0 14px 0" }}>
          Disiplinler Arası Algoritmik Kültür ve Dil Veri Tabanı
        </p>

        {/* OVAL ARAMA BAR */}
        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative" }}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="🔍 Damga, kök hece, ülke, il veya kadim merkez ara..."
            style={{
              width: "100%",
              padding: "12px 18px",
              backgroundColor: "#0d0d0d",
              border: "1px solid #ffd700",
              borderRadius: "25px",
              color: "#fff",
              fontSize: "13px",
              outline: "none",
              boxSizing: "border-box",
              boxShadow: "0 2px 8px rgba(255, 215, 0, 0.15)"
            }}
          />
        </div>
      </div>

      {/* İÇERİK ALANI */}
      <div className="dashboard-grid-container" style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: "20px" }}>
        
        {/* Sol Panel: CANLI BALONCUK VE AĞ MATRİSİ (ykos-matris.vercel.app Entegre Edildi) */}
        <div style={{ background: "#0a0a0a", border: "1px solid #222", borderRadius: "10px", padding: "15px", overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #222", paddingBottom: "10px", marginBottom: "10px" }}>
            <h2 style={{ color: "#ffd700", margin: 0, fontSize: "1.1rem" }}>
              DİNAMİK OKUMA MATRİSİ
            </h2>
            <span style={{ fontSize: "0.75rem", background: "#ffd70022", color: "#ffd700", padding: "3px 8px", borderRadius: "4px" }}>
              GLOBAL ATLAS CANLI
            </span>
          </div>
          
          {/* HARİCİ KÜRE / MATRİS UYGULAMASI PENCERESİ */}
          <div style={{ width: "100%", height: "550px", borderRadius: "8px", overflow: "hidden", border: "1px solid #1a233a" }}>
            <iframe
              src="https://ykos-matris.vercel.app/"
              title="YKOS Matrisleri Canlı Görselleştirici"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                background: "#000"
              }}
            />
          </div>
        </div>

        {/* Sağ Panel: YKOS Çözümleri ve İndeksler */}
        <div style={{ background: "#0a0a0a", border: "1px solid #ffd700", borderRadius: "10px", padding: "15px", height: "fit-content" }}>
          <h3 style={{ color: "#ffd700", marginTop: 0, fontSize: "1.1rem", marginBottom: "12px" }}>
            ⚡ YKOS ÇÖZÜMLERİ VE İNDEKSLER
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {ykosSolutions.map((sol) => (
              <button
                key={sol.id}
                onClick={() => setShowMatrix(true)}
                style={{
                  background: "#141414",
                  border: "1px solid #333",
                  color: "#fff",
                  padding: "12px",
                  borderRadius: "6px",
                  textAlign: "left",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}
              >
                <span style={{ color: "#ffd700", fontSize: "1.2rem" }}>📜</span>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "0.9rem", color: "#fff" }}>{sol.title}</div>
                  <div style={{ fontSize: "0.75rem", color: "#aaa", marginTop: "3px" }}>Matrise Git ➔</div>
                </div>
              </button>
            ))}
          </div>

          <div style={{ marginTop: "15px", textAlign: "center" }}>
            <button
              onClick={() => setShowMatrix(true)}
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #ffd700 0%, #b8860b 100%)",
                color: "#000",
                border: "none",
                padding: "11px",
                borderRadius: "6px",
                fontWeight: "bold",
                fontSize: "0.85rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px"
              }}
            >
              <span>🔮</span> BALONCUK MATRİSİNİ GÖRSELLEŞTİR ➔
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
