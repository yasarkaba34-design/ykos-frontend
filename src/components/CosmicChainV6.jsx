import { useEffect, useState } from "react";
import chainData from "../data/cosmic_chain_v6.json";

export default function CosmicChainV6() {
  const chain = chainData.chain;
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((t) => t + 1);
    }, 750);
    return () => clearInterval(timer);
  }, []);

  const ent = (a, b) =>
    Math.abs(Math.sin(tick * 0.15 + a.phase - b.phase)) *
    ((a.energy + b.energy) / 2);

  const probabilityMatrix = chain.map((a) =>
    chain.map((b) => ent(a, b).toFixed(2))
  );

  const fractalDecision = chain.map((root) => ({
    id: root.id,
    branch: (root.meta * Math.abs(Math.sin(tick * root.freq))).toFixed(2)
  }));

  const topMeta = fractalDecision.reduce((a, b) =>
    parseFloat(a.branch) > parseFloat(b.branch) ? a : b
  );

  return (
    <div style={{
      marginTop: "30px",
      padding: "25px",
      background: "#0f1538",
      borderRadius: "14px",
      color: "white"
    }}>
      <h2 style={{ fontSize: "30px", marginBottom: "15px" }}>
        COSMICCHAIN v6 — Meta‑Consciousness & Quantum Entanglement
      </h2>

      {/* Entanglement Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: "6px",
        marginBottom: "25px"
      }}>
        {probabilityMatrix.flat().map((value, i) => (
          <div key={i}
            style={{
              height: "28px",
              borderRadius: "4px",
              background: "#66aaff",
              opacity: parseFloat(value),
              transition: "opacity 0.3s"
            }}
          />
        ))}
      </div>

      {/* Fractal Decision Tree */}
      <div style={{
        padding: "15px",
        background: "#151a38",
        borderRadius: "10px",
        marginBottom: "20px"
      }}>
        <h3 style={{ color: "#99ccff", marginBottom: "10px" }}>
          Fractal Decision Tree
        </h3>

        {fractalDecision.map((branch) => (
          <p key={branch.id} style={{ opacity: 0.85 }}>
            {branch.id} → Meta‑Dal: {branch.branch}
          </p>
        ))}
      </div>

      {/* Meta‑Consciousness Output */}
      <div style={{
        padding: "15px",
        background: "#0f1533",
        borderRadius: "10px",
        textAlign: "center"
      }}>
        <h3 style={{
          color: chain.find(c => c.id === topMeta.id).color
        }}>
          Meta‑Consciousness Output: {topMeta.id}
        </h3>
        <p style={{ opacity: 0.85 }}>
          Üst‑bilinç düzeyinde en güçlü meta‑dal tespit edildi.
        </p>
      </div>
    </div>
  );
}
