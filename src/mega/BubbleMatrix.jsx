import React, { useState } from "react";
import "./BubbleMatrix.css";

/**
 * BubbleMatrix
 * YKOS görsel-semiyotik motoru.
 * Baloncuklar atlas koordinatlarına göre konumlanır.
 * Props:
 *  - onNodeSelect: düğüm tıklama olayını üst bileşene iletir.
 */
export default function BubbleMatrix({ onNodeSelect }) {
  // Atlas koordinatları (örnek veri)
  const [nodes] = useState([
    {
      id: 1,
      label: "KA",
      x: 120,
      y: 180,
      data: {
        summary: "Kök hece",
        semantic: "Başlangıç sesi",
        symbol: "⟡",
        language: "Proto-Türkçe",
        references: "Orhun Yazıtları"
      }
    },
    {
      id: 2,
      label: "BA",
      x: 340,
      y: 260,
      data: {
        summary: "Damga kökü",
        semantic: "Birlik sembolü",
        symbol: "⚶",
        language: "Altay Dili",
        references: "Petroglif Seti 12"
      }
    },
    {
      id: 3,
      label: "TA",
      x: 520,
      y: 120,
      data: {
        summary: "Yön hecesi",
        semantic: "Yol göstergesi",
        symbol: "✦",
        language: "Orta Asya Türkçesi",
        references: "Göktürk Haritası"
      }
    }
  ]);

  return (
    <div className="bubble-matrix">
      {nodes.map((node) => (
        <div
          key={node.id}
          className="bubble-node"
          style={{
            left: `${node.x}px`,
            top: `${node.y}px`
          }}
          onClick={() => onNodeSelect(node)}
        >
          <span className="bubble-label">{node.label}</span>
        </div>
      ))}
    </div>
  );
}
