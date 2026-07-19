import YKOS_GEO from "./ykos_core.json";
import MapComponent from "./MapComponent"; // varsa

const getGeoForRoot = (root) => {
  if (!root) return null;
  return YKOS_GEO[root.toUpperCase()] || null;
};

const AtlasMap = ({ item }) => {
  const geo = getGeoForRoot(item?.step);

  if (!geo) {
    return (
      <div style={{ padding: "10px", color: "#999" }}>
        Bu kök için atlas verisi bulunamadı.
      </div>
    );
  }

  return (
    <MapComponent
      coordinates={geo.coordinates}
      region={geo.region}
      label={geo.label}
      root={item.step}
    />
  );
};

export default AtlasMap;
