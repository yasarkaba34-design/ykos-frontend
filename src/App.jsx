import React from "react";
import Matris from "./components/Matris";
import Atlas from "./components/Atlas";
import Chain from "./components/Chain";
import QuantumEngine from "./components/QuantumEngine";

function App() {
  return (
    <div style={{ fontFamily: "Arial" }}>
      <h1>YKOS Semantic Lab</h1>
      <Matris />
      <Atlas />
      <Chain />
      <QuantumEngine />
    </div>
  );
}

export default App;
