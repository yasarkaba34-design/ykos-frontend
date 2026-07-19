import React from "react";
import YKOSDashboard from "./modules/YKOSDashboard";
import SemanticEngine from "./components/SemanticEngine";
import AtlasMap from "./components/AtlasMap";
import LayersSystem from "./components/LayersSystem";




export default function App() {
  return (
    <div className="app-root">
      <YKOSDashboard />
    </div>
  );
}