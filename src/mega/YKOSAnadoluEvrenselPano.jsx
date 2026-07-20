import React, { useEffect, useState } from "react";
import { startCosmicUniverse } from "../engine/CosmicUniverseEngine";
import CosmicAtlasMap from "../components/CosmicAtlasMap";
import CosmicMigrationFlow from "../components/CosmicMigrationFlow";
import AnadoluShieldInteractive from "../modules/AnadoluShieldInteractive";

export default function YKOSAnadoluEvrenselPano() {
  const [universeActive, setUniverseActive] = useState(false);

  useEffect(() => {
    // Kozmik evren motorunu tetikliyoruz
    try {
      startCosmicUniverse();
      setUniverseActive(true);
    } catch (error) {
      console.error("Kozmik evren motoru başlatılamadı:", error);
    }
  }, []);

  return (
    <div className="evrensel-pano-container" style={{ padding: "20px", background: "#0a0a0a", color: "#fff" }}>
      <header style={{ borderBottom: "1px solid #222", paddingBottom: "15px", marginBottom: "20px" }}>
        <h1 style={{ color: "#d4af37", margin: 0, fontSize: "24px" }}>🌌 YKOS Anadolu Evrensel Panosu</h1>
        <p style={{ color: "#888", margin: "5px 0 0 0", fontSize: "14px" }}>
          Kozmik damgaların ve Anadolu katmanlarının evrensel akış matrisi
        </p>
      </header>

      <div className="pano-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
        {/* Sol Sütun: Dijital Atlas ve Harita Katmanları */}
        <div className="main-maps-zone">
          <div style={{ marginBottom: "20px", background: "#111", padding: "15px", borderRadius: "8px", border: "1px solid #222" }}>
            <h3 style={{ color: "#d4af37", marginTop: 0 }}>🗺️ Dünya Damga Atlası ve Anadolu Katmanları</h3>
            <CosmicAtlasMap />
          </div>

          <div style={{ background: "#111", padding: "15px", borderRadius: "8px", border: "1px solid #222" }}>
            <h3 style={{ color: "#d4af37", marginTop: 0 }}>🏹 Kozmik Göç ve Akış Yolları</h3>
            <CosmicMigrationFlow />
          </div>
        </div>

        {/* Sağ Sütun: İnteraktif Anadolu Kalkanı Kontrol Paneli */}
        <div className="side-modules-zone">
          <div style={{ background: "#111", padding: "15px", borderRadius: "8px", border: "1px solid #222", height: "100%" }}>
            <h3 style={{ color: "#d4af37", marginTop: 0 }}>🛡️ Anadolu Kalkanı Kontrolü</h3>
            <AnadoluShieldInteractive />
            
            <div style={{ marginTop: "20px", paddingTop: "15px", borderTop: "1px solid #222", fontSize: "12px", color: "#666" }}>
              Motor Durumu: {universeActive ? "🟢 Kozmik Evren Aktif" : "🔴 Motor Beklemede"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}