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

export default function YKOSDashboard() {
  const [selectedRoot, setSelectedRoot] = useState(null);
  const [syncData, setSyncData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const userId = "YKOS_USER_" + Math.floor(Math.random() * 999999);

  return (
    <div className="dashboard-container" style={{ background: "#000", minHeight: "100vh", color: "#fff" }}>
      
      {/* 1. ÜST BAR: Logo, Menü ve Sağ Üstte Dil/Matrisler */}
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
        
        {/* Sağ Üst Panel (Dil ve Matris Modülleri) */}
        <div className="language-selector" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <div className="matrix-badges" style={{ display: "flex", gap: "8px" }}>
            <span style={{ fontSize: "12px", padding: "3px 8px", background: "#111", border: "1px solid #d4af37", color: "#d4af37", borderRadius: "4px" }}>m8</span>
            <span style={{ fontSize: "12px", padding: "3px 8px", background: "#111", border: "1px solid #d4af37", color: "#d4af37", borderRadius: "4px" }}>m11</span>
            <span style={{ fontSize: "12px", padding: "3px 8px", background: "#111", border: "1px solid #d4af37", color: "#d4af37", borderRadius: "4px" }}>m12</span>
          </div>
          <span>🌐 TR</span>
        </div>
      </div>

      {/* 2. GOOGLE TARZI ARAMA ÇUBUĞU */}
      <div style={{ display: "flex", justifyContent: "center", margin: "30px 0 20px 0" }}>
        <div className="search-box">
          <span style={{ color: "#d4af37", fontSize: "18px" }}>🔍</span>
          <input 
            type="text" 
            placeholder="Damga, yazıt, petroglif veya kadim bir merkez arayın..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* 3. TEK SATIRA SIĞAN ORTALANMIŞ GÖSTERGE PANELI (STATS BAR) */}
      <div className="stats-bar">
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
          <div className="stats-item" key={index} style={{ padding: "0 15px" }}>
            <span className="icon">{item.icon}</span>
            <span className="value">{item.value}</span>
            <span className="label">{item.label}</span>
          </div>
        ))}
      </div>

      {/* 4. ANA AKIŞ VE ANALİZ MOTORLARI */}
      <div className="dashboard-grid" style={{ marginTop: "30px" }}>
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

      {/* 5. ARKA PLAN AKIŞ VE UYUM MOTORLARI */}
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