import { YKOS_DATA } from "../data/ykosData";
import { quantumFlux } from "./quantumFlux";
import { omniField } from "./omniField";
import { hyperState } from "./hyperState";
import { totalityPulse } from "./totalityPulse";
import { cosmicEntropy } from "./cosmicEntropy";

export function startCosmicUniverse(callback) {
  let t = 0;

  const intervalId = setInterval(() => {
    t++;

    const universePacket = {
      time: Date.now(),
      tick: t,
      cosmicWave: Math.sin(t / 20).toFixed(4),
      expansion: (1 + Math.sin(t / 50)).toFixed(4),

      behaviorFlow:
        YKOS_DATA.semantic[t % YKOS_DATA.semantic.length],

      cosmicLayer:
        YKOS_DATA.layers[t % YKOS_DATA.layers.length],

      chainNode:
        YKOS_DATA.cosmicChain[t % YKOS_DATA.cosmicChain.length],

      selfGenerate: Math.cos(t / 33).toFixed(4),

      quantumFlux: quantumFlux(t),
      omniField: omniField(t),
      hyperState: hyperState(),
      totalityPulse: totalityPulse(t),
      cosmicEntropy: cosmicEntropy()
    };

    callback(universePacket);
  }, 1000);

  return () => clearInterval(intervalId);
}