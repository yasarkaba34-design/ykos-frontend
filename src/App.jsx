// FILE: src/App.jsx
import React, { useEffect, useState } from "react";

// --- ANA MODÜLLER ---
import YKOSAnadoluEvrenselPano from "./mega/YKOSAnadoluEvrenselPano";

// --- ALT MODÜLLER ---
import Chain from "./mega/Chain.jsx";
import { computeQuantum } from "./mega/QuantumEngine.js";
import LayerSystem from "./components/LayerSystem.jsx";
import { startCosmicUniverse } from "./engine/CosmicUniverseEngine";

export default function App() {
  const [universeData, setUniverseData] = useState(null);
  const quantumData = computeQuantum(15);

  useEffect(() => {
    // Sayfa ilk yüklendiğinde motoru başlatır
    const cleanup = startCosmicUniverse((packet) => {
      setUniverseData(packet);
    });

    return () => cleanup && cleanup();
  }, []);

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
        
        {/* Kuantum Hesaplama Çıktısını Ekrana Basalım */}
        <div style={{ border: "1px solid cyan", padding: "15px", margin: "20px auto", maxWidth: "400px", borderRadius: "8px", background: "#081b29", color: "#fff" }}>
          <h3 style={{ color: "cyan", marginTop: 0 }}>Kuantum Motoru Verisi</h3>
          <p>Flux: {quantumData.flux}</p>
          <p>OmniField: {quantumData.omniField}</p>
          <p>Kararlılık: %{quantumData.stability.toFixed(1)}</p>
        </div>

        <LayerSystem selectedRoot="YOL" />
      </div>
    </div>
  );
}