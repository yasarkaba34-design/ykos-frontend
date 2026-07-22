// FILE: src/App.jsx
import React from "react";

// --- ANA MODÜLLER ---
import YKOSAnadoluEvrenselPano from "./mega/YKOSAnadoluEvrenselPano";

// --- ALT MODÜLLER ---
import Chain from "./mega/Chain.jsx";
import LayerSystem from "./components/LayerSystem.jsx";

export default function App() {
  return (
    <div style={{ fontFamily: "Arial", textAlign: "center", padding: "20px", color: "#fff", backgroundColor: "#111", minHeight: "100vh" }}>
      <h1>YKOS Semantic Lab</h1>

      <YKOSAnadoluEvrenselPano />

      <div style={{ marginTop: "30px" }}>
        <Chain />
        <LayerSystem selectedRoot="YOL" />
      </div>
    </div>
  );
}
