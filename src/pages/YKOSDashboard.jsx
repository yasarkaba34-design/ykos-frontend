import React, { useState } from "react";
import SemanticEngine from "../components/SemanticEngine";
import AtlasMap from "../components/AtlasMap";
import LayerSystem from "../components/LayerSystem";
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
import { YKOS_API } from "../api/ycos";

export default function YKOSDashboard() {
  const [selectedRoot, setSelectedRoot] = useState(null);
  const [syncData, setSyncData] = useState(null);
  const userId = "YKOS_USER_" + Math.floor(Math.random() * 999999);

  return (
    <div className="dashboard-container">
      {/* 1. Nizamî Ortalanmış Üst Menü */}
      <div className="top-bar">
        <div className="top-logo">YKOS</div>
        <div className="top-menu">
          <span>Ana Sayfa</span>
          <span>Hakkında</span>
          <span>Metodoloji</span>
          <span>Atlas</span>
          <span>Araştırmacılar</span>
          <span>Kurumsal İşbirlikleri</span>
          <span>İletişim</span>
        </div>
        <div className="language-selector">🌐 TR</div>
      </div>

      {/* 2. Nizamî 8 Kutulu Veri Paneli (Stats Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 my-6">
        {[
          { icon: "🌐", value: "214", label: "Ülkeler" },
          { icon: "🏛️", value: "248", label: "Araştırmalar" },
          { icon: "🔷", value: "9.870", label: "Damgalar" },
          { icon: "📜", value: "18.420", label: "Petroglifler" },
          { icon: "📜", value: "4.132", label: "Yazıtlar" },
          { icon: "📚", value: "12.580", label: "Kaynaklar" },
          { icon: "📷", value: "46.900", label: "Görseller" },
          { icon: "🗺️", value: "58", label: "Atlaslar" }
        ].map((item, index) => (
          <div 
            key={index} 
            className="flex items-center gap-4 p-5 rounded-xl bg-[#141414] border border-gray-900 hover:border-amber-500/30 transition-all duration-200 shadow-md group"
          >
            <span className="text-2xl bg-[#0d0d0d] p-3 rounded-lg border border-gray-800 group-hover:border-amber-500/20 transition-colors">
              {item.icon}
            </span>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-slate-100 tracking-tight font-mono">
                {item.value}
              </span>
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider mt-0.5">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Ana Motorlar ve Grafik Matrisi Izgarası */}
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>🔤 Semantik Motoru</h2>
          <SemanticEngine onRootSelect={setSelectedRoot} />
        </div>

        <div className="dashboard-card">
          <h2>🗺️ Atlas Motoru</h2>
          <AtlasMap selectedRoot={selectedRoot} />
        </div>

        <div className="dashboard-card">
          <h2>🧩 Katman Motoru</h2>
          <LayerSystem selectedRoot={selectedRoot} />
        </div>

        <div className="dashboard-card">
          <h2>📊 Grafik Motoru</h2>
          <GraphMatrix selectedRoot={selectedRoot} />
        </div>
      </div>

      {/* 4. Arka Plan Senkronizasyon ve Evrensel/Kozmik Motor Katmanları */}
      <div className="hidden-engines" style={{ display: "none" }}>
        <AudioEngine selectedRoot={selectedRoot} />
        <ReportEngine />
        <ExportEngine />
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
      </div>
    </div>
  );
}
