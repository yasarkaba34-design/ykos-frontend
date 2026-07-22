// FILE: src/mega/QuantumEngine.js
import React from "react";

export function computeQuantum(chainValue = 10) {
  return {
    flux: chainValue * 2,
    omniField: chainValue + 10,
    spin: Math.sin(chainValue / 5) * 10,
    entropy: Math.abs(Math.cos(chainValue / 7) * 20),
    stability: 100 - Math.abs(chainValue % 50)
  };
}

// React Bileşeni Hali
export default function QuantumEngine() {
  const data = computeQuantum(15);

  return (
    <div style={{ border: "1px solid cyan", padding: "15px", margin: "10px auto", maxWidth: "400px", borderRadius: "8px", background: "#081b29" }}>
      <h3 style={{ color: "cyan", marginTop: 0 }}>Kuantum Motoru</h3>
      <p>Flux: {data.flux}</p>
      <p>OmniField: {data.omniField}</p>
      <p>Kararlılık: %{data.stability.toFixed(1)}</p>
    </div>
  );
}
