import YKOS_GEO from "../../ykos_core.json";

const getGeoForRoot = (root) => {
  return YKOS_GEO[root.toUpperCase()] || null;
};

export default getGeoForRoot;
