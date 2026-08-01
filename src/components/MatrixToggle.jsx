import React, { useState } from "react";
import BubbleMatrix from "../mega/BubbleMatrix";
import "./MatrixToggle.css";

export default function MatrixToggle({ data }) {
  // Tanımlama eksik olduğu için hata veriyordu, state'i buraya ekledik:
  const [selectedNode, setSelectedNode] = useState(null);

  return (
    <div className="matrix-toggle-container">
      {/* Baloncuk Ağ Haritası */}
      <BubbleMatrix data={data} onSelectNode={(node) => setSelectedNode(node)} />

      {/* YKOS Çözümleme Modal Penceresi */}
      {selectedNode && (
        <div className="matrix-modal-overlay" onClick={() => setSelectedNode(null)}>
          <div className="matrix-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="matrix-modal-header">
              <h3 className="matrix-modal-title">YKOS ÇÖZÜMLEME</h3>
              <button className="matrix-modal-close" onClick={() => setSelectedNode(null)}>✕</button>
            </div>

            <small style={{ color: "#888", display: "block", marginBottom: "8px" }}>SEÇİLEN ELEMAN</small>
            <div className="selected-element-badge">
              {selectedNode.label || selectedNode.title || "YKOS Matris"}
            </div>

            <p className="modal-detail-text">
              {selectedNode.description || "Seçilen düğümün YKOS kök hece ve damga detay analizi..."}
            </p>

            <button 
              className="modal-action-btn" 
              onClick={() => window.location.href = `/read/${selectedNode.id || 1}`}
            >
              Detaylı Okuma Ekranına Git →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
