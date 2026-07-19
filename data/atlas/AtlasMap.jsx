import { YKOS_GEO } from "../data/ycos_geo";

const getGeoForRoot = (root) => {
  return YKOS_GEO[root.toUpperCase()] || null;
};

// Örnek kullanım:
const geo = YKOS_GEO[item.step] || null;

export default getGeoForRoot;
