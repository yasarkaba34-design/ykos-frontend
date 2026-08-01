import React, { useState } from "react";

export default function YKOSDashboard() {
  const [selectedSolution, setSelectedSolution] = useState(null);

  const ykosSolutions = [
    { id: 1, title: "Göbeklitepe T-Sütunu YKOS Okuması", clusterKey: "GNT-01" },
    { id: 2, title: "Etrüsk Lemnos Kitabesi & Ön Türkçe Eşleşmesi", clusterKey: "ETR-02" },
    { id: 3, title: "YKOS 11 Ciltlik Külliyat ve Sembol Kataloğu", clusterKey: "KUL-03" }
  ];

  const handleSolutionClick = (sol) => {
    setSelectedSolution(sol);
  };

  return (
    <div style={{ padding: "20px", background: "#050505", color: "#fff", minHeight: "100vh", fontFamily: "sans-serif" }}>
      {/* Üst Başlık & Navigasyon */}
      <header style={{ textAlign: "center", marginBottom: "25px", borderBottom: "1px solid #222", paddingBottom: "15px" }}>
        <h1 style={{ color: "#ffd700", margin: "0 0 5px 0", fontSize: "1.8rem", letterSpacing: "2px" }}>
          YKOS BİLGİ SİSTEMİ
        </h1>
        <p style={{ fontSize: "0.9rem", color: "#aaa", margin: 0 }}>
          Disiplinler Arası Algoritmik Kültür ve Dil Veri Tabanı
        </p>
      </header>

      {/* Ana İçerik Alanı */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: "20px" }}>
        {/* Sol Panel: Dinamik Okuma Matrisi */}
        <div style={{ background: "#0a0a0a", border: "1px solid #222", borderRadius: "10px", padding: "20px" }}>
          <h2 style={{ color: "#ffd700", marginTop: 0 }}>DİNAMİK OKUMA MATRİSİ</h2>
          {selectedSolution ? (
            <div>
              <h3 style={{ color: "#fff" }}>{selectedSolution.title}</h3>
              <p style={{ color: "#aaa" }}>Küme Kodu: {selectedSolution.clusterKey}</p>
              <div style={{ marginTop: "20px", padding: "15px", background: "#111", border: "1px dashed #ffd700", borderRadius: "8px" }}>
                🔮 Baloncuk matrisi aktif çözümleniyor...
              </div>
            </div>
          ) : (
            <p style={{ color: "#666" }}>Lütfen sağ panelden bir YKOS çözümü seçin veya matrisi görselleştirin.</p>
          )}
        </div>

                {/* Sağ Panel: YKOS Çözümleri ve İndeksler */}
        <div style={{ background: "#0a0a0a", border: "1px solid #ffd700", borderRadius: "10px", padding: "15px", height: "fit-content" }}>
          <h3 style={{ color: "#ffd700", marginTop: 0, fontSize: "1.1rem" }}>
            ⚡ YKOS ÇÖZÜMLERİ VE İNDEKSLER
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {ykosSolutions.map((sol) => (
              <button
                key={sol.id}
                onClick={() => handleSolutionClick(sol)}
                style={{
                  background: selectedSolution?.id === sol.id ? "#ffd70022" : "#141414",
                  border: selectedSolution?.id === sol.id ? "1px solid #ffd700" : "1px solid #333",
                  color: "#fff",
                  padding: "12px",
                  borderRadius: "6px",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#ffd700";
                  e.currentTarget.style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  if (selectedSolution?.id !== sol.id) {
                    e.currentTarget.style.borderColor = "#333";
                  }
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                <span style={{ color: "#ffd700", fontSize: "1.2rem" }}>📜</span>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "0.95rem", color: "#ffd700" }}>{sol.title}</div>
                  <div style={{ fontSize: "0.75rem", color: "#aaa", marginTop: "3px" }}>Matrise Git ➔</div>
                </div>
              </button>
            ))}
          </div>

          {/* Alt Buton */}
          <div style={{ marginTop: "15px", textAlign: "center" }}>
            <button
              onClick={() => {
                if (selectedSolution) {
                  handleSolutionClick(selectedSolution);
                } else {
                  handleSolutionClick(ykosSolutions[0]);
                }
              }}
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #ffd700 0%, #b8860b 100%)",
                color: "#000",
                border: "none",
                padding: "10px",
                borderRadius: "6px",
                fontWeight: "bold",
                fontSize: "0.85rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: "0 4px 12px rgba(255, 215, 0, 0.2)",
                transition: "transform 0.2s ease, filter 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.filter = "brightness(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.filter = "brightness(1)";
              }}
            >
              <span>🔮</span> BALONCUK MATRİSİNİ GÖRSELLEŞTİR ➔
            </button>
          </div>

          <p style={{ fontSize: "0.75rem", color: "#888", marginTop: "12px", fontStyle: "italic" }}>
            * Sağ paneldeki çözümlere basarak doğrudan dinamik okuma matrislerine geçebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}
