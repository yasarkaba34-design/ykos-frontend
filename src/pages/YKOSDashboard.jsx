import React, { useState } from "react";
// Bileşenleri üst klasördeki components dizininden nokta atışı alıyoruz
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
      
      {/* 1. ÜST BAR */}
      <div className="top-bar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 20px", borderBottom: "1px solid #1a203b" }}>
        <div className="top-logo" style={{ fontSize: "24px", fontWeight: "bold", color: "#d4af37" }}>YKOS BİLGİ SİSTEMİ</div>
        <div className="top-menu" style={{ display: "flex", gap: "20px" }}>
          <span>Ana Sayfa</span>
          <span>Hakkında</span>
          <span>Metodoloji</span>
          <span>Atlas</span>
          <span>Araştırmacılar</span>
          <span>Kurumsal İşbirlikleri</span>
          <span>İletişim</span>
        </div>
        
        <div className="language-selector" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <div className="matrix-badges" style={{ display: "flex", gap: "8px" }}>
            <span style={{ fontSize: "12px", padding: "3px 8px", background: "#111", border: "1px solid #d4af37", color: "#d4af37", borderRadius: "4px" }}>m8</span>
            <span style={{ fontSize: "12px", padding: "3px 8px", background: "#111", border: "1px solid #d4af37", color: "#d4af37", borderRadius: "4px" }}>m11</span>
            <span style={{ fontSize: "12px", padding: "3px 8px", background: "#111", border: "1px solid #d4af37", color: "#d4af37", borderRadius: "4px" }}>m12</span>
          </div>
          <span>🌐 TR</span>
        </div>
      </div>

      {/* 2. GOOGLE BENZERİ ARAMA ÇUBUĞU */}
      <div style={{ display: "flex", justifyContent: "center", margin: "40px 0 30px 0" }}>
        <div className="search-box" style={{ display: "flex", alignItems: "center", gap: "12px", background: "#111", border: "1px solid #d4af37", padding: "12px 25px", borderRadius: "30px", width: "50%" }}>
          <span style={{ color: "#d4af37", fontSize: "18px" }}>🔍</span>
          <input 
            type="text" 
            placeholder="Damga, yazıt, petroglif veya kadim bir merkez arayın..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ background: "transparent", border: "none", color: "#fff", width: "100%", outline: "none", fontSize: "15px" }}
          />
        </div>
      </div>

      {/* 3. TEK SATIRLIK GÖSTERGE PANELI */}
      <div className="stats-bar" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", background: "#111", padding: "15px", borderRadius: "8px", margin: "0 20px", border: "1px solid #222" }}>
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
          <div className="stats-item" key={index} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", borderRight: index !== 7 ? "1px solid #222" : "none" }}>
            <span className="icon" style={{ fontSize: "20px", marginBottom: "4px" }}>{item.icon}</span>
            <span className="value" style={{ fontSize: "18px", fontWeight: "bold", color: "#fff" }}>{item.value}</span>
            <span className="label" style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* 4. MOTOR ENTEGRASYONLARI */}
      <div className="dashboard-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", padding: "20px", marginTop: "20px" }}>
        <div className="dashboard-card" style={{ background: "#111", padding: "20px", borderRadius: "8px", border: "1px solid #222" }}>
          <h2 style={{ color: "#d4af37", fontSize: "18px", marginBottom: "15px" }}>🔤 Semantik Motoru</h2>
          <SemanticEngine onRootSelect={setSelectedRoot} />
        </div>

        <div className="dashboard-card" style={{ background: "#111", padding: "20px", borderRadius: "8px", border: "1px solid #222" }}>
          <h2 style={{ color: "#d4af37", fontSize: "18px", marginBottom: "15px" }}>🗺️ Atlas Motoru</h2>
          <AtlasMap selectedRoot={selectedRoot} />
        </div>

        <div className="dashboard-card" style={{ background: "#111", padding: "20px", borderRadius: "8px", border: "1px solid #222" }}>
          <h2 style={{ color: "#d4af37", fontSize: "18px", marginBottom: "15px" }}>🧩 Katman Motoru</h2>
          <LayerSystem selectedRoot={selectedRoot} />
        </div>

        <div className="dashboard-card" style={{ background: "#111", padding: "20px", borderRadius: "8px", border: "1px solid #222" }}>
          <h2 style={{ color: "#d4af37", fontSize: "18px", marginBottom: "15px" }}>📊 Grafik Motoru</h2>
          <GraphMatrix selectedRoot={selectedRoot} />
        </div>
      </div>

      {/* 5. GİZLİ ÇALIŞAN ARKA PLAN SİSTEMLERİ */}
      <div className="hidden-engines" style={{ display: "none" }}>
        <MotionEngine selectedRoot={selectedRoot} />
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
