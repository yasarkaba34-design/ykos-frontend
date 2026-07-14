import { YKOS_DATA } from "../data/ykosData";

export function startCosmicUniverse(callback) {
  let t = 0;

  setInterval(() => {
    t++;

    const universePacket = {
      time: Date.now(),
      tick: t,

      // Kozmik titreşim (sonsuz dalga)
      cosmicWave: Math.sin(t / 20).toFixed(4),

      // Evren genişleme katsayısı
      expansion: (1 + Math.sin(t / 50)).toFixed(4),

      // Evren davranış akışı (semantik alan döngüsü)
      behaviorFlow: YKOS_DATA.semantic[t % YKOS_DATA.semantic.length],

      // Kozmik katman döngüsü
      cosmicLayer: YKOS_DATA.layers[t % YKOS_DATA.layers.length],

      // Sonsuz CosmicChain akışı
      chainNode: YKOS_DATA.cosmicChain[t % YKOS_DATA.cosmicChain.length],

      // Evrenin kendi kendini üretme katsayısı
      selfGenerate: Math.cos(t / 33).toFixed(4)
    };

    callback(universePacket);
  }, 1000);
}
