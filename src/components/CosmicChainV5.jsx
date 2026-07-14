import { useEffect, useState } from "react";
import chainData from "../data/cosmic_chain_v5.json";

export default function CosmicChainV5() {
  const chain = chainData.chain;
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((t) => t + 1);
    }, 800);
    return () => clearInterval(timer);
  }, []);

  const wave = (root) =>
    Math.abs(Math.sin(tick * root.freq + root.phase));

  const decisionBranches = chain.map((root) => ({
    id: root.id,
    probability: (wave(root) * root.energy).toFixed(2)
  }));

  const topDecision = decisionBranches.reduce((a, b) =>
    parseFloat(a.probability) > parseFloat(b.probability) ? a : b
  );

  return (
    <div style={{
      marginTop: "30px",
      padding: "25px",
      background: "#0e1330",
      borderRadius: "14px",
      color: "white"
    }}>
      <h2 style={{ fontSize: "30px", marginBottom: "15px" }}>
        COSMICCHAIN v5 — Quantum Consciousness Engine
      </h2>

      {/* Quantum Superposition */}
      <div style={{
        display: "flex",
        gap: "10px",
        marginBottom: "25px"
      }}>
        {chain.map((root) => (
          <div key={root.id}
            style={{
              flex: 1,
              height: "40px",
              background: root.color,
              opacity: 0.25 + wave(root) * 0.5,
              transition: "opacity 0.3s",
              borderRadius: "6px"
            }}
          />
        ))}
      </div>

      {/* Wave Function Field */}
      <div style={{
        position: "relative",
        height: "160px",
        background: "#111",
        borderRadius: "12px",
        marginBottom: "30px",
        overflow: "hidden"
      }}>
        {chain.map((root, i) => (
          <div key={root.id}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              background: root.color,
              opacity: 0.08 + wave(root) * 0.12,
              mixBlendMode: "screen",
              transition: "opacity 0.3s"
            }}
          />
        ))}
      </div>

      {/* Multi-Branch Decision Tree */}
      <div style={{
        padding: "15px",
        background: "#151a38",
        borderRadius: "10px",
        marginBottom: "20px"
      }}>
        <h3 style={{ color: "#66aaff", marginBottom: "10px" }}>
          Kozmik Karar Ağacı (Multi‑Branch)
        </h3>

        {decisionBranches.map((branch) => (
          <p key={branch.id} style={{ opacity: 0.85 }}>
            {branch.id} → Olasılık: {branch.probability}
          </p>
        ))}
      </div>

      {/* AI Consciousness Mapping */}
      <div style={{
        padding: "15px",
        background: "#0f1533",
        borderRadius: "10px",
        textAlign: "center"
      }}>
        <h3 style={{ color: topDecision.id === "BIR" ? "#33cc33" : chain.find(c => c.id === topDecision.id).color }}>
          AI Consciousness Output: {topDecision.id}
        </h3>
        <p style={{ opacity: 0.85 }}>
          En yüksek kuantum olasılığı tespit edildi.
        </p>
      </div>
    </div>
  );
}
