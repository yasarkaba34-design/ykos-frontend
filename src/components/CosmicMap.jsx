import { useEffect, useState } from "react";
import { startCosmicUniverse } from "../engine/CosmicUniverseEngine";
// src/App.jsx
import YKOSAnadoluEvrenselPano from "./mega/YKOSAnadoluEvrenselPano";

function App() {
  return <YKOSAnadoluEvrenselPano />;
}

export default App;

export default function CosmicMap() {
  const [universe, setUniverse] = useState(null);

  useEffect(() => {
    startCosmicUniverse((packet) => setUniverse(packet));
  }, []);

  return (
    <div style={{ textAlign: "center", color: "#fff", background: "#000", padding: "20px" }}>
      <h2>YKOS Kozmik Evren Haritası</h2>
      {universe && (
        <div>
          <p>🌌 Kozmik Dalga: {universe.cosmicWave}</p>
          <p>🪐 Genişleme: {universe.expansion}</p>
          <p>🔮 Davranış Akışı: {universe.behaviorFlow}</p>
          <p>💫 Katman: {universe.cosmicLayer.name}</p>
        </div>
      )}
      <div style={{ marginTop: "30px" }}>
        <img src="/cosmicwave.png" alt="Kozmik Dalga" style={{ width: "80%", borderRadius: "10px" }} />
      </div>
    </div>
  );
}
