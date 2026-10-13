// src/core/useBubblePipeline.js

import { AtlasMap } from "./AtlasMap";
import { RTE } from "./RTE";

const atlas = new AtlasMap();
const rte = new RTE();

// Örnek veri — sen kendi dataset'inle değiştirebilirsin
atlas.addPoint("1", "Göbeklitepe", 120, 200);
atlas.addPoint("2", "Hitit", 300, 150);
atlas.addPoint("3", "Luwi", 450, 260);

export function useBubblePipeline() {
  return {
    get: () => atlas.getBubbles(),
    select: (bubble) => rte.onSelect(bubble),
    last: () => rte.getLast()
  };
}
