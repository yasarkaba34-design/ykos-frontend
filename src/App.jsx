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
import { YKOS_ROOTS } from "../data/ykos_roots";
import { YKOS_GEO } from "../data/ycos_geo";
import { YKOS_LAYERS } from "../components/LayerSystem";

export const YKOS_API = {
  root(kok) {
    const key = kok.toUpperCase();
    return {
      root: key,
      ...YKOS_ROOTS[key],
      geo: YKOS_GEO[key],
      layers: YKOS_LAYERS[key]
    };
  },
  getAllRoots() {
    return YKOS_ROOTS; // Arayüzün tüm kökleri çekip (0 kök) ibaresini kurtarması için gerekli alan
  }
};