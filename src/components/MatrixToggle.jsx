import { useState } from "react";
// Import yolunu mega klasörüne yönlendirdik
import BubbleMatrix from "../mega/BubbleMatrix";

import "./MatrixToggle.css";

export default function MatrixToggle({ data }) {
  const [open, setOpen] = useState(false);

  // Okuma ekranından gelen veriyi BubbleMatrix formatına dönüştürme
  const bubbleData = Array.isArray(data)
    ? data
    : [
        {
          label: data?.title || "YKOS Matris",
          color: "#d4af37",
          atlas: data?.atlas || "Anadolu",
          matrix: data?.matrix,
          tags: data?.tags
        }
      ];

  return (
    <div className="matrix-toggle-wrapper">
      <button
        className="matrix-toggle-btn"
        onClick={() => setOpen(!open)}
      >
        MATRİSLERİ GÖRSELLEŞTİR
      </button>

      {open && (
        <div className="matrix-panel">
          <BubbleMatrix data={bubbleData} />
        </div>
      )}
    </div>
  );
}
{selectedNode && (
  <div className="matrix-modal-overlay" onClick={() => setSelectedNode(null)}>
    <div className="matrix-modal-card" onClick={(e) => e.stopPropagation()}>
      <div className="matrix-modal-header">
        <h3 className="matrix-modal-title">YKOS ÇÖZÜMLEME</h3>
        <button className="matrix-modal-close" onClick={() => setSelectedNode(null)}>✕</button>
      </div>

      <small style={{ color: "#888", display: "block", marginBottom: "8px" }}>SEÇİLEN ELEMAN</small>
      <div className="selected-element-badge">
        {selectedNode.label || selectedNode.title}
      </div>

      <p className="modal-detail-text">
        {selectedNode.description || "Seçilen düğümün YKOS kök hece ve damga detay analizi..."}
      </p>

      <button className="modal-action-btn" onClick={() => window.location.href = `/read/${selectedNode.id || 1}`}>
        Detaylı Okuma Ekranına Git →
      </button>
    </div>
  </div>
)}
