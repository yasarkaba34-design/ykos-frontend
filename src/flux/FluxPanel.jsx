// FILE: src/flux/FluxPanel.jsx

import React from "react";
import metaLayer from "../matrices/meta/MetaLayer.json";

export default function FluxPanel() {
  const entries = metaLayer.entries;

  return (
    <div style={{ background: "#111", color: "gold", padding: "20px", border: "1px solid gold" }}>
      <h3>Flux Motoru — Yönsel Vektör Paneli</h3>

      {entries.map((entry) => (
        <div
          key={entry.root}
          style={{
            marginBottom: "20px",
            padding: "15px",
            border: "1px solid gold",
            background: "#222",
          }}
        >
          <h4>{entry.root}</h4>

          <p><strong>Flux Vector:</strong> [{entry.flux_vector.join(", ")}]</p>
          <p><strong>Flux Energy:</strong> {entry.flux_energy}</p>
          <p><strong>Flux Phase:</strong> {entry.flux_phase}</p>

          <div style={{ marginTop: "10px" }}>
            <strong>Yönsel Açıklama:</strong>
            <p>
              {entry.root === "TUT"
                ? "TUT hecesi sabitleme ve bağlama yönlü düşük açılı bir vektör üretir."
                : "KUR hecesi yapı kurma ve düzenleme yönlü yüksek açılı bir vektör üretir."}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
function FluxTimeline({ chain }) {
  return (
    <div className="flux-timeline">
      {chain.map((item, i) => (
        <div key={i} className="timeline-item">
          <div className="timeline-circle">{item}</div>

          {i < chain.length - 1 && <div className="timeline-line"></div>}
        </div>
      ))}
    </div>
  );
}

<FluxTimeline chain={flux.chain} />
