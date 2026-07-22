// FILE: src/mega/CosmicAtlasMap.jsx
import React from "react";
import { startCosmicUniverse } from "../engine/CosmicUniverseEngine.js";
import { readYKOSFlow } from "./YKOSFlowReader.js";
import { sendCrossSignal } from "./CrossModuleRouter.js";

export default function CosmicAtlasMap({ universe }) {
  const flow = readYKOSFlow();
  const cosmicData = startCosmicUniverse(universe);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#7fc8ff",
        fontSize: "20px",
        background: "#0a0a0a",
        borderRadius: "8px",
        padding: "20px"
      }}
    >
      <h3 style={{ color: "#d4af37", marginBottom: "10px" }}>🌍 Atlas Haritası</h3>
      <div>
        QuantumFlux: {universe?.quantumFlux ?? "Tanımsız"} <br />
        OmniField: {flow?.quantum?.omniField ?? "Yükleniyor..."} <br />
        CosmicField: {cosmicData?.fieldName ?? "Bilinmiyor"}
      </div>

      <button
        onClick={() => sendCrossSignal("goc", -1)}
        style={{
          marginTop: "15px",
          padding: "8px 16px",
          backgroundColor: "#222",
          color: "#7fc8ff",
          border: "1px solid #444",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Flux -1 (QuantumEngine etkisi)
      </button>
    </div>
  );
}
