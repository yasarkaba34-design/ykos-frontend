import React, { useEffect, useState } from "react";

export default function CosmicAI({ selectedRoot }) {
  const [cosmicAI, setCosmicAI] = useState(null);

  useEffect(() => {
    if (!selectedRoot) return;

    const ai = {
      root: selectedRoot,
      cosmicMeaningField: [
        "OMNI",
        "QUANTUM",
        "HYPER",
        "UNIVERSE",
        "COSMIC"
      ].sort(() => Math.random() - 0.5),
      cosmicPrediction: Math.random().toFixed(7),
      level: "COSMIC_AI",
      timestamp: Date.now()
    };

    setCosmicAI(ai);

  }, [selectedRoot]);

  return (
    <div className="dashboard-card">
      <h2>🧬 CosmicAI</h2>
      {cosmicAI && (
        <>
          <div><strong>Kozmik Anlam Alanı:</strong> {cosmicAI.cosmicMeaningField.join(" • ")}</div>
          <div><strong>Kozmik Tahmin:</strong> {cosmicAI.cosmicPrediction}</div>
          <div><strong>Seviye:</strong> {cosmicAI.level}</div>
        </>
      )}
    </div>
  );
}
