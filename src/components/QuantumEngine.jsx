import React, { useEffect, useState } from "react";

export default function QuantumEngine({ selectedRoot }) {
  const [quantumState, setQuantumState] = useState(null);

  useEffect(() => {
    if (!selectedRoot) return;

    const qState = {
      root: selectedRoot,
      superposition: [
        "TUT", "KUR", "BA", "YOL", "BİR", "KAL"
      ].sort(() => Math.random() - 0.5),
      probabilityField: Math.random().toFixed(4),
      timestamp: Date.now(),
      level: "QUANTUM_CORE"
    };

    setQuantumState(qState);

  }, [selectedRoot]);

  return (
    <div className="dashboard-card">
      <h2>⚛️ QuantumEngine</h2>
      {quantumState && (
        <>
          <div><strong>Süperpozisyon:</strong> {quantumState.superposition.join(" • ")}</div>
          <div><strong>Olasılık Alanı:</strong> {quantumState.probabilityField}</div>
          <div><strong>Seviye:</strong> {quantumState.level}</div>
        </>
      )}
    </div>
  );
}
