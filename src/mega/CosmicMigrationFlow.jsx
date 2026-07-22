// FILE: src/mega/CosmicMigrationFlow.jsx
import React from "react";
import { readYKOSFlow } from "./YKOSFlowReader.js";

export default function CosmicMigrationFlow({ universe, direction }) {
  const flow = readYKOSFlow();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        color: "#ffddaa",
        fontSize: "18px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.85
      }}
    >
      <div>
        🌀 Göç Akışı ({direction}) — OmniField: {universe?.omniField ?? "Bilinmiyor"}
      </div>
      {flow && (
        <p style={{ color: "#0f0", marginTop: "10px" }}>
          Flux: {flow.quantum.flux}
        </p>
      )}
    </div>
  );
}
