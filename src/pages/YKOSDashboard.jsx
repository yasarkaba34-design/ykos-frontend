import React, { useState } from "react";

// --- BİLEŞENLER VE MOTORLAR (COMPONENTS) ---
import LayerSystem from "../components/LayerSystem";
import SemanticEngine from "../components/SemanticEngine";
import GraphMatrix from "../components/GraphMatrix";
import MotionEngine from "../components/MotionEngine";
import AudioEngine from "../components/AudioEngine";
import ReportEngine from "../components/ReportEngine";
import ExportEngine from "../components/ExportEngine";
import LiveSyncEngine from "../components/LiveSyncEngine";
import CloudSyncEngine from "../components/CloudSyncEngine";
import SecurityEngine from "../components/SecurityEngine";
import PerformanceEngine from "../components/PerformanceEngine";
import AiEngine from "../components/AiEngine";
import AutoPilotEngine from "../components/AutoPilotEngine";
import MultiUserEngine from "../components/MultiUserEngine";
import OmniEngine from "../components/OmniEngine";
import QuantumEngine from "../components/QuantumEngine";
import HyperEngine from "../components/HyperEngine";
import UniverseSync from "../components/UniverseSync";
import UniverseAtlas from "../components/UniverseAtlas";
import UniverseChain from "../components/UniverseChain";
import UniverseLayer from "../components/UniverseLayer";
import UniverseReport from "../components/UniverseReport";
import UniverseCloud from "../components/UniverseCloud";
import CosmicEngine from "../components/CosmicEngine";
import CosmicSync from "../components/CosmicSync";
import CosmicAI from "../components/CosmicAI";
import CosmicAtlas from "../components/CosmicAtlas";

export default function YKOSDashboard() {
  const [selectedRoot, setSelectedRoot] = useState("");

  return (
    <div className="ykos-dashboard" style={{ padding: "20px", background: "#050505", color: "#fff", minHeight: "100vh" }}>
      {/* Üst Başlık Alanı */}
      <header style={{ borderBottom: "2px solid #d4af37", paddingBottom: "15px", marginBottom: "25px" }}>
        <h1 style={{ color: "#d4af37", margin: 0, fontSize: "28px", letterSpacing: "1px" }}>
          YKOS BİLGİ SİSTEMİ PANELİ
        </h1>
        <p style={{ color: "#888", margin: "5px 0 0 0", fontSize: "14px" }}>
          Semantik Katman Motoru ve Evrensel Damga Analizi Canlı Takip Arayüzü
        </p>
      </header>

      {/* Ana Arayüz Izgarası (Grid) */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px" }}>
        
        {/* Sol Kolon: Semantik Motor Kontrolü ve Katman Sistemi */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <section className="panel-section">
            <h2 style={{ color: "#d4af37", fontSize: "18px", marginBottom: "10px" }}>Semantik Motor</h2>
            <SemanticEngine onSelectRoot={setSelectedRoot} activeRoot={selectedRoot} />
          </section>

          <section className="panel-section">
            <h2 style={{ color: "#d4af37", fontSize: "18px", marginBottom: "10px" }}>Katman Motoru</h2>
            <LayerSystem selectedRoot={selectedRoot} />
          </section>
        </div>

        {/* Sağ Kolon: Grafik Matrisi ve Diğer Analitik Motorlar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <section className="panel-section">
            <h2 style={{ color: "#d4af37", fontSize: "18px", marginBottom: "10px" }}>Grafik Veri Matrisi</h2>
            <GraphMatrix selectedRoot={selectedRoot} />
          </section>

          {/* Arka Plan ve Senkronizasyon Motor Modülleri */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
            <MotionEngine selectedRoot={selectedRoot} />
            <AudioEngine selectedRoot={selectedRoot} />
            <ReportEngine />
            <ExportEngine />
            <LiveSyncEngine />
            <CloudSyncEngine />
            <SecurityEngine />
            <PerformanceEngine />
            <AiEngine />
            <AutoPilotEngine />
            <MultiUserEngine />
            <OmniEngine />
            <QuantumEngine />
            <HyperEngine />
          </div>
        </div>

      </div>

      {/* Alt Katman / Evrensel & Kozmik İzleme İstasyonları */}
      <footer style={{ marginTop: "30px", paddingTop: "20px", borderTop: "1px solid #222" }}>
        <h2 style={{ color: "#d4af37", fontSize: "18px", marginBottom: "15px" }}>Evrensel ve Kozmik Veri Ağları</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "15px" }}>
          <UniverseSync />
          <UniverseAtlas />
          <UniverseChain />
          <UniverseLayer />
          <UniverseReport />
          <UniverseCloud />
          <CosmicEngine />
          <CosmicSync />
          <CosmicAI />
          <CosmicAtlas />
        </div>
      </footer>
    </div>
  );
}
