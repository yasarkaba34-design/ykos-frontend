import SemanticEngine from "../components/SemanticEngine";
import AtlasMap from "../components/AtlasMap";
import LayerSystem from "../components/LayerSystem";
import GraphMatrix from "../components/GraphMatrix";
import React, { useState } from "react";
import MotionEngine from "../components/MotionEngine";
import AudioEngine from "../components/AudioEngine";
import ReportEngine from "../components/ReportEngine";
import ExportEngine from "../components/ExportEngine";
import { YKOS_API } from "../api/ycos";
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
  const [selectedRoot, setSelectedRoot] = useState(null);
const [selectedRoot, setSelectedRoot] = useState(null);
const userId = "YKOS_USER_" + Math.floor(Math.random() * 999999);

  return (
    <div className="dashboard-container">
      <h1>YKOS Dashboard</h1>

      <SemanticEngine onRootSelect={setSelectedRoot} />

      <div className="dashboard-grid">
        <AtlasMap selectedRoot={selectedRoot} />
        <LayerSystem selectedRoot={selectedRoot} />
        <GraphMatrix selectedRoot={selectedRoot} />
      </div>
    </div>
  );
}
<div className="dashboard-grid">

  <div className="dashboard-card">
    <h2>🔤 Semantik Motoru</h2>
    <SemanticEngine onRootSelect={setSelectedRoot} />
  </div>

  <div className="dashboard-card">
    <h2>🗺️ Atlas Motoru</h2>
    <AtlasMap selectedRoot={selectedRoot} />
  </div>
const [syncData, setSyncData] = useState(null);

  <div className="dashboard-card">
    <h2>🧩 Katman Motoru</h2>
    <LayerSystem selectedRoot={selectedRoot} />
  </div>

  <div className="dashboard-card">
    <h2>📊 Grafik Motoru</h2>
    <GraphMatrix selectedRoot={selectedRoot} />
  </div>

</div>
<AudioEngine selectedRoot={selectedRoot} />
<ReportEngine />
<ExportEngine />
const [syncData, setSyncData] = useState(null);
<LiveSyncEngine selectedRoot={selectedRoot} onSync={setSyncData} />
<CloudSyncEngine selectedRoot={selectedRoot} />
<SecurityEngine selectedRoot={selectedRoot} />
<PerformanceEngine selectedRoot={selectedRoot} />
<AiEngine selectedRoot={selectedRoot} />
<AutoPilotEngine onAutoRoot={setSelectedRoot} />
<MultiUserEngine selectedRoot={selectedRoot} userId={userId} />
<OmniEngine selectedRoot={selectedRoot} />
<QuantumEngine selectedRoot={selectedRoot} />
<HyperEngine selectedRoot={selectedRoot} />
<UniverseSync selectedRoot={selectedRoot} />
<UniverseAtlas selectedRoot={selectedRoot} />
<UniverseChain selectedRoot={selectedRoot} />
<UniverseLayer selectedRoot={selectedRoot} />
<UniverseReport selectedRoot={selectedRoot} />
<UniverseCloud selectedRoot={selectedRoot} />
<CosmicEngine selectedRoot={selectedRoot} />
<CosmicSync selectedRoot={selectedRoot} />
<CosmicAI selectedRoot={selectedRoot} />
<CosmicAtlas selectedRoot={selectedRoot} />
