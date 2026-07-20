export default function CosmicAtlasMap({ universe }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#7fc8ff",
        fontSize: "20px"
      }}
    >
      🌍 Atlas Haritası — QuantumFlux: {universe.quantumFlux}
    </div>
  );
}
import YKOSAnadoluEvrenselPano from "./mega/YKOSAnadoluEvrenselPano";

export default function App() {
  return (
    <div style={{ fontFamily: "Arial", textAlign: "center", padding: "20px" }}>
      <h1>YKOS Semantic Lab</h1>
      <YKOSAnadoluEvrenselPano />
    </div>
  );
}
