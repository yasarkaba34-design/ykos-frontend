import { YKOS_GEO } from "../data/ycos_geo";
const getGeoForRoot = (root) => {
  return YKOS_GEO[root.toUpperCase()] || null;
};
geo: YKOS_GEO[item.step] || null

