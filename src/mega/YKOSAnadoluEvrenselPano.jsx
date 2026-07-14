
export default function YKOSAnadoluEvrenselPano() {
  return (
    <div
      style={{
        background: "radial-gradient(circle at center, #000010, #000000)",
        color: "#fff",
        minHeight: "100vh",
        padding: "24px",
        display: "grid",
        gridTemplateRows: "440px 440px",
        gap: "24px"
      }}
    >
      <h1 style={{ gridColumn: "1 / -1", textAlign: "center", marginBottom: "10px" }}>
        YKOS Anadolu Evrensel Pano
      </h1>



      {/* Üst: Atlas Gezegenleri + Göç Akışı */}
      <div
        style={{
          position: "relative",
          border: "1px solid #333",
          borderRadius: "14px",
          overflow: "hidden"
        }}
      >
        <CosmicAtlasMap />
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none"
          }}
        >
          <CosmicMigrationFlow />
        </div>
      </div>

      {/* Alt: Anadolu Kalkanı İnteraktif Modülü */}
      <div
        style={{
          border: "1px solid #333",
          borderRadius: "14px",
          overflow: "hidden"
        }}
      >
        <AnadoluShieldInteractive />
      </div>
    </div>
  );
}
