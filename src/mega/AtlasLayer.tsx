// file: src/mega/AtlasLayer.tsx
import React from "react";
import { AtlasLocation } from "./AtlasMap";
import { Bubble } from "./BubbleMatrix";

type AtlasLayerProps = {
  locations: AtlasLocation[];
  onCreateBubble: (bubble: Bubble) => void;
};

function mapLatLngToXY(lat: number, lng: number): { x: number; y: number } {
  const x = (lng + 180) * (400 / 360);
  const y = (90 - lat) * (300 / 180);
  return { x, y };
}

export const AtlasLayer: React.FC<AtlasLayerProps> = ({ locations, onCreateBubble }) => {
  const handleSelect = (loc: AtlasLocation) => {
    const { x, y } = mapLatLngToXY(loc.lat, loc.lng);

    onCreateBubble({
      id: loc.id,
      label: loc.name,
      x,
      y,
    });
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      <h3>AtlasLayer</h3>
      <p>Atlas verisi BubbleMatrix’e aktarılabilir durumda.</p>

      {locations.map((loc) => (
        <button
          key={loc.id}
          onClick={() => handleSelect(loc)}
          style={{ marginRight: "8px", padding: "6px 10px" }}
        >
          {loc.name}
        </button>
      ))}
    </div>
  );
};
