// FILE: src/mega/YKOSAnadoluEvrenselPano.jsx
import React, { useEffect, useState } from "react";
import { startCosmicUniverse } from "../engine/CosmicUniverseEngine.js";
import CosmicAtlasMap from "./CosmicAtlasMap.jsx";
import CosmicMigrationFlow from "./CosmicMigrationFlow.jsx";
import AnadoluShieldInteractive from "./AnadoluShieldInteractive.jsx";

export default function YKOSAnadoluEvrenselPano() {
  const [universeActive, setUniverseActive] = useState(false);
  const [flow, setFlow] = useState(null);

  useEffect(() => {
    try {
      startCosmicUniverse((packet) => {
        setFlow(packet);
      });
      setUniverseActive(true);
    } catch (error) {
      console.error("Kozmik evren motoru başlatılamadı:", error);
    }
  }, []);

  return (
    <div className="evrensel-pano-container" style={{ padding: "20px", background: "#0a0a0a", color: "#fff" }}>
      
      {/* Başlık */}
      <header style={{ borderBottom: "1px solid #222", paddingBottom: "15px", marginBottom: "20px" }}>
        <h1 style={{ color: "#d4af37", margin: 0, fontSize: "24px" }}>🌌 YKOS Anadolu Evrensel Panosu</h1>
        <p style={{ color: "#888", margin: "5px 0 0 0", fontSize: "14px" }}>
          Kozmik damgaların ve Anadolu katmanlarının evrensel akış matrisi
        </p>
      </header>

      {/* Grid */}
      <div className="pano-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
        
        {/* Sol Sütun */}
        <div className="main-maps-zone">
          
          {/* Atlas */}
          <div style={{ marginBottom: "20px", background: "#111", padding: "15px", borderRadius: "8px", border: "1px solid #222" }}>
            <h3 style={{ color: "#d4af37", marginTop: 0 }}>🗺️ Dünya Damga Atlası ve Anadolu Katmanları</h3>
            <CosmicAtlasMap universe={flow} />
          </div>

          {/* Göç Akışı */}
          <div style={{ background: "#111", padding: "15px", borderRadius: "8px", border: "1px solid #222" }}>
            <h3 style={{ color: "#d4af37", marginTop: 0 }}>🏹 Kozmik Göç ve Akış Yolları</h3>
            <CosmicMigrationFlow universe={flow} direction="YOL" />
          </div>
        </div>

        {/* Sağ Sütun */}
        <div className="side-modules-zone">
          <div style={{ background: "#111", padding: "15px", borderRadius: "8px", border: "1px solid #222", height: "100%" }}>
            <h3 style={{ color: "#d4af37", marginTop: 0 }}>🛡️ Anadolu Kalkanı Kontrolü</h3>
            <AnadoluShieldInteractive />

            {/* Motor Durumu */}
            <div style={{ marginTop: "20px", paddingTop: "15px", borderTop: "1px solid #222", fontSize: "12px", color: "#666" }}>
              Motor Durumu: {universeActive ? "🟢 Kozmik Evren Aktif" : "🔴 Motor Beklemede"}
            </div>

            {/* YKOS Akış Durumu */}
            {window.__YKOS_FLOW_ACTIVE__ === false && (
              <div style={{ color: "#f00", marginTop: "20px" }}>
                YKOS Akışı Kapalı (Final Stabilizer Aktif)
              </div>
            )}

            {window.__YKOS_FLOW_ACTIVE__ === true && (
              <div style={{ color: "#0f0", marginTop: "20px" }}>
                YKOS Akışı Açık
              </div>
            )}

            {/* Quantum Bilgileri */}
            {flow && (
              <div style={{ marginTop: "20px", color: "#0ff" }}>
                <p>Spin: {flow.quantumFlux}</p>
                <p>Entropy: {flow.cosmicEntropy}</p>
                <p>Stability: {flow.hyperState}</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
