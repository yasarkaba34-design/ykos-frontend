// FILE: src/App.jsx
import React, { useEffect, useState } from "react";

// --- ANA MODÜLLER ---
import YKOSAnadoluEvrenselPano from "./mega/YKOSAnadoluEvrenselPano";

// --- ALT MODÜLLER ---
import Chain from "./mega/Chain.jsx";
import QuantumEngine from "./mega/QuantumEngine.js";
import LayerSystem from "./components/LayerSystem.jsx";
import { startCosmicUniverse } from "./engine/CosmicUniverseEngine";

export default function App() {
  const [universeData, setUniverseData] = useState(null);

  useEffect(() => {
    // Sayfa açıldığında motoru tek seferlik başlatır (ekranın gelip gitmesini önler)
    const cleanup = startCosmicUniverse((packet) => {
      setUniverseData(packet);
    });

    return () => cleanup && cleanup();
  }, []); // Boş dizi [] kalması kritik!

  return (
    <div style={{ fontFamily: "Arial", textAlign: "center", padding: "20px", backgroundColor: "#0b0c10", color: "#fff", minHeight: "100vh" }}>
      <h1>YKOS Semantic Lab</h1>

      {universeData && (
        <div style={{ padding: "10px", background: "#1f2833", margin: "10px auto", maxWidth: "500px", borderRadius: "8px", border: "1px solid gold" }}>
          <strong>Canlı Akış Tick:</strong> {universeData.tick} | <strong>Dalga:</strong> {universeData.cosmicWave}
        </div>
      )}

      <YKOSAnadoluEvrenselPano />

      <div style={{ marginTop: "30px" }}>
        <Chain />
        <QuantumEngine />
        <LayerSystem selectedRoot="YOL" />
      </div>
    </div>
  );
}
