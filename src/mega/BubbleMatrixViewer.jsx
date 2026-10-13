// src/mega/BubbleMatrixViewer.jsx

import React, { useEffect, useState } from "react";
import { useBubblePipeline } from "@/core/useBubblePipeline";
import "@/styles/bubblematrix.css";

export const BubbleMatrixViewer = () => {
  const pipeline = useBubblePipeline();

  const [bubbles, setBubbles] = useState([]);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [selectedInfo, setSelectedInfo] = useState(null);

  useEffect(() => {
    let frame;

    const tick = () => {
      const data = pipeline.get();
      setBubbles(data);
      frame = requestAnimationFrame(tick);
    };

    tick();

    return () => cancelAnimationFrame(frame);
  }, [pipeline]);

  const handleSelect = (bubble) => {
    const selected = pipeline.select(bubble);
    setSelectedInfo(selected);
  };

  return (
    <div className="bubble-matrix">
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="bubble"
          style={{
            left: `${b.x}px`,
            top: `${b.y}px`,
            backgroundColor: b.color
          }}
          onMouseEnter={() => setHoverInfo(b)}
          onMouseLeave={() => setHoverInfo(null)}
          onClick={() => handleSelect(b)}
        >
          <div className="bubble-label">{b.label}</div>
          <div className="bubble-evaluator-result">
            {b.weight.toFixed(2)}
          </div>
        </div>
      ))}

      {hoverInfo && (
        <div
          className="bubble-tooltip"
          style={{
            left: hoverInfo.x + 40,
            top: hoverInfo.y + 40
          }}
        >
          <div><strong>{hoverInfo.label}</strong></div>
          <div>Ağırlık: {hoverInfo.weight.toFixed(2)}</div>
        </div>
      )}

      {selectedInfo && (
        <div className="bubble-resonance-card">
          <div className="brc-title">Rezonans Kartı</div>
          <div><strong>Etiket:</strong> {selectedInfo.label}</div>
          <div><strong>Ağırlık:</strong> {selectedInfo.weight.toFixed(2)}</div>
          <div><strong>Zaman:</strong> {new Date(selectedInfo.timestamp).toLocaleTimeString()}</div>
        </div>
      )}
    </div>
  );
};
