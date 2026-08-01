import "../styles/AtlasMap.css";

export default function AtlasMap() {
  return (
    <div className="atlas-container">
      <img
        src="/atlas/ykos-atlas.png"
        alt="YKOS Atlas Haritası"
        className="atlas-image"
      />
    </div>
  );
}

// Flux iz rengi hesaplama
export function getTrailColor(baseColor, flux) {
  const factor = Math.min(flux / 3, 1);

  const r = Math.floor(parseInt(baseColor.slice(1, 3), 16) * (1 + factor));
  const g = Math.floor(parseInt(baseColor.slice(3, 5), 16) * (1 + factor));
  const b = Math.floor(parseInt(baseColor.slice(5, 7), 16) * (1 + factor));

  return `rgba(${Math.min(r, 255)}, ${Math.min(g, 255)}, ${Math.min(b, 255)}, 0.6)`;
}

// Atlas koordinatları
export function atlasZoom(region) {
  const zoomLevels = {
    "Anadolu": { x: 140, y: 160, scale: 1.4 },
    "Orta Asya": { x: 260, y: 120, scale: 1.6 },
    "Avrupa": { x: 180, y: 80, scale: 1.3 },
    "Amerika": { x: 320, y: 200, scale: 1.5 },
    "Mezopotamya": { x: 160, y: 200, scale: 1.4 }
  };

  return zoomLevels[region] || { x: 120, y: 120, scale: 1.2 };
}
