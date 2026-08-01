import React from "react";
import "./AnalyzerPanel.css";

export default function AnalyzerPanel({ content }) {
  if (!content || !content.analysis) {
    return (
      <div className="analyzer-empty">
        Analiz verisi bulunamadı veya yüklenemedi.
      </div>
    );
  }

  const { root, meaning, cultureLinks } = content.analysis;

  return (
    <div className="analyzer-panel">
      <h2 className="analyzer-title">YKOS Analiz Motoru</h2>

      <div className="analysis-block">
        <p><strong>Kök:</strong> {root}</p>
        <p><strong>Anlam:</strong> {meaning}</p>
        <p><strong>Kültürel Bağlantılar:</strong> {cultureLinks.join(", ")}</p>
      </div>

      <div className="analysis-note">
        Bu analiz, YKOS semantik motoru tarafından üretilmiştir.
      </div>
    </div>
  );
}
