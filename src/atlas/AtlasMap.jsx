// FILE: src/atlas/AtlasMap.jsx

import React from "react";
import metaLayer from "../matrices/meta/MetaLayer.json";

export default function AtlasMap() {
  const entries = metaLayer.entries;

  return (
    <div style={{ background: "#111", color: "gold", padding: "20px", border: "1px solid gold" }}>
      <h3>AtlasMap — Kültürel Coğrafya Paneli</h3>

      <div
        style={{
          width: "100%",
          height: "400px",
          background: "#222",
          border: "1px solid gold",
          position: "relative",
          marginTop: "20px",
        }}
      >
        {/* Basit grid tabanlı atlas prototipi */}
        {entries.map((entry) => {
          const [lat, lon] = entry.atlas_coord;

          // Koordinatları görsel alana ölçekleme (ilk sürüm)
          const x = (lon + 180) * (1000 / 360); // genişlik ölçekleme
          const y = (90 - lat) * (400 / 180);   // yükseklik ölçekleme

          return (
            <div
              key={entry.root}
              style={{
                position: "absolute",
                left: `${x}px`,
                top: `${y}px`,
                transform: "translate(-50%, -50%)",
                background: "gold",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                boxShadow: "0 0 10px gold",
              }}
              title={`${entry.root} — ${entry.atlas_region}`}
            ></div>
          );
        })}
      </div>

      <div style={{ marginTop: "20px" }}>
        {entries.map((entry) => (
          <p key={entry.root}>
            <strong>{entry.root}:</strong> {entry.atlas_region} — [{entry.atlas_coord.join(", ")}]
          </p>
        ))}
      </div>
    </div>
  );
}
