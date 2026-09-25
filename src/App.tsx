// file: src/App.tsx
import React, { useState } from "react";
import { AtlasMap, AtlasLocation } from "./mega/AtlasMap";
import { AtlasLayer } from "./mega/AtlasLayer";
import { BubbleMatrix, Bubble } from "./mega/BubbleMatrix";
import { SemanticPanel } from "./mega/SemanticPanel";

const atlasLocations: AtlasLocation[] = [
  { id: "hakkari", name: "Hakkari", lat: 37.574, lng: 43.740 },
  { id: "istanbul", name: "İstanbul", lat: 41.008, lng: 28.978 },
];

export const App: React.FC = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [rmv, setRMV] = useState<string>("");

  const handleCreateBubble = (bubble: Bubble) => {
    setBubbles((prev) => [...prev, bubble]);
  };

  const handleSelectBubble = (bubble: Bubble) => {
    setRMV(`RMV: ${bubble.label} için semantik mesaj üretildi.`);
  };

  return (
    <div style={{ padding: "16px", color: "#fff", background: "#111", minHeight: "100vh" }}>
      <h2>YKOS Atlas + BubbleMatrix Entegrasyonu</h2>

      <AtlasMap locations={atlasLocations} onSelectLocation={handleCreateBubble} />

      <AtlasLayer locations={atlasLocations} onCreateBubble={handleCreateBubble} />

      <BubbleMatrix bubbles={bubbles} onSelectBubble={handleSelectBubble} />

      <SemanticPanel rmv={rmv} />
    </div>
  );
};
