import BubbleMatrix from "./BubbleMatrix";
import "@/styles/AtlasMap.css";

export default function AtlasMap({ bubble }) {
  return (
    <div className="atlas-container">
      <img
        src="/atlas/ykos-atlas.png"
        alt="YKOS Atlas Haritası"
        className="atlas-image"
      />

      <BubbleMatrix bubble={bubble} />
    </div>
  );
}
export function getTrailColor(baseColor, flux) {
  // flux arttıkça iz daha parlak olur
  const factor = Math.min(flux / 3, 1);

  const r = Math.floor(parseInt(baseColor.slice(1, 3), 16) * (1 + factor));
  const g = Math.floor(parseInt(baseColor.slice(3, 5), 16) * (1 + factor));
  const b = Math.floor(parseInt(baseColor.slice(5, 7), 16) * (1 + factor));

  return `rgba(${Math.min(r,255)}, ${Math.min(g,255)}, ${Math.min(b,255)}, 0.6)`;
}
