import React, { useState } from "react";

export function BubbleMatrix({ bubbles = [], onSelectBubble }) {
  const [activeBubble, setActiveBubble] = useState(null);

  const handleBubbleClick = (bubble) => {
    setActiveBubble(bubble);
    if (onSelectBubble) {
      onSelectBubble(bubble);
    }
  };

  return (
    <div style={{ width: "100%", position: "relative", backgroundColor: "#02040a", padding: "15px", borderRadius: "10px", border: "1px solid rgba(255, 215, 0, 0.3)", boxSizing: "border-box" }}>
      <h3 style={{ color: "#ffd700", margin: "0 0 10px 0", fontSize: "1rem" }}>
        YKOS CANLI BALONCUK MATRİSİ
      </h3>
      
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center", justifyContent: "center", minHeight: "300px" }}>
        {bubbles && bubbles.length > 0 ? (
          bubbles.map((b, i) => (
            <div
              key={b.id || i}
              onClick={() => handleBubbleClick(b)}
              style={{
                width: b.size || "70px",
                height: b.size || "70px",
                borderRadius: "50%",
                backgroundColor: "#050811",
                border: `2px solid ${b.color || "#ffd700"}`,
                boxShadow: `0 0 12px ${b.color || "rgba(255, 215, 0, 0.5)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: b.color || "#ffd700",
                fontWeight: "bold",
                fontSize: "0.8rem",
                cursor: "pointer",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                transform: activeBubble?.id === b.id ? "scale(1.15)" : "scale(1)"
              }}
            >
              {b.label || b.id}
            </div>
          ))
        ) : (
          <div style={{ color: "#aaa", fontSize: "0.85rem" }}>
            Yükleniyor veya gösterilecek baloncuk bulunamadı.
          </div>
        )}
      </div>

      {activeBubble && (
        <div style={{ marginTop: "15px", padding: "10px", background: "rgba(255, 215, 0, 0.08)", border: "1px solid #ffd700", borderRadius: "6px", fontSize: "0.8rem", color: "#fff" }}>
          <strong style={{ color: "#ffd700" }}>Seçili Kök: {activeBubble.label || activeBubble.id}</strong>
          <div>{activeBubble.desc || "YKOS Katman Deşifre Detayı"}</div>
        </div>
      )}
    </div>
  );
}

export default BubbleMatrix;
