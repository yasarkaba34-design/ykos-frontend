export default function CosmicMigrationFlow({ universe, direction }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        color: "#ffddaa",
        fontSize: "18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.8
      }}
    >
      🌀 Göç Akışı ({direction}) — OmniField: {universe.omniField}
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
