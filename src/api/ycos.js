iimport { YKOS_ROOTS } from "../data/ykos_roots"; // c harfi k olarak nizamî hale getirildi
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
  }
};

  atlas(kok) {
    return YKOS_GEO[kok.toUpperCase()];
  },

  layer(kok) {
    return YKOS_LAYERS[kok.toUpperCase()];
  },

  chain(kok) {
    const data = YKOS_ROOTS[kok.toUpperCase()];
    return data ? data.zincir : null;
  },

  logs() {
    return JSON.parse(localStorage.getItem("ykos_logs") || "[]");
  },

  report() {
    const logs = JSON.parse(localStorage.getItem("ykos_logs") || "[]");
    const countByRoot = logs.reduce((acc, log) => {
      acc[log.root] = (acc[log.root] || 0) + 1;
      return acc;
    }, {});
    return { logs, countByRoot };
  },

  full() {
    const logs = JSON.parse(localStorage.getItem("ykos_logs") || "[]");
    return {
      roots: YKOS_ROOTS,
      geo: YKOS_GEO,
      layers: YKOS_LAYERS,
      logs
    };
  }
};
