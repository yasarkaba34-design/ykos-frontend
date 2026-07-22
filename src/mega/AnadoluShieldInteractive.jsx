// FILE: src/mega/AnadoluShieldInteractive.jsx

import React from "react";
import { readYKOSFlow } from "./YKOSFlowReader.js";
import { sendCrossSignal } from "./CrossModuleRouter.js";

export default function AnadoluShieldInteractive({ universe }) {
  const flow = readYKOSFlow();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffaaaa",
        fontSize: "20px"
      }}
    >
      🛡 Anadolu Kalkanı — HyperState: {universe?.hyperState}
      {flow && (
        <p style={{ color: "#0f0", marginTop: "10px" }}>
          Layer B: {flow.layers.layerB}
        </p>
      )}
      <button
        onClick={() => sendCrossSignal("goc", 2)}
        style={{
          marginTop: "15px",
          padding: "8px 16px",
          backgroundColor: "#222",
          color: "#ffaaaa",
          border: "1px solid #444",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Göç Flux +2
      </button>
    </div>
  );
}
