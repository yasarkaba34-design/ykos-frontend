export default function AnadoluShieldInteractive({ universe }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffaaaa",
        fontSize: "20px"
      }}
    >
      🛡 Anadolu Kalkanı — HyperState: {universe.hyperState}
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
