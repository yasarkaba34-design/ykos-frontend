export default function YKOSAnadoluEvrenselPano() {
  return (
    <div
      style={{
        background: "radial-gradient(circle at center, #000010, #000000)",
        color: "#fff",
        minHeight: "100vh",
        padding: "24px",
        display: "grid",
        // Başlığa otomatik yükseklik (auto), harita ve modüle 440'ar piksel veriyoruz
        gridTemplateRows: "auto 440px 440px", 
        gap: "24px"
      }}
    >
      {/* Başlık artık kendi satırında bağımsız ve nizamî duracak */}
      <h1 style={{ textAlign: "center", margin: "0 0 10px 0", fontSize: "28px", letterSpacing: "0.05em" }}>
        YKOS Anadolu Evrensel Pano
      </h1>

      {/* Üst: Atlas Gezegenleri + Göç Akışı (Anadolu merkezli dışa doğru akış) */}
      <div
        style={{
          position: "relative",
          border: "1px solid #333",
          borderRadius: "14px",
          overflow: "hidden",
          backgroundColor: "rgba(15, 23, 42, 0.3)"
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
          {/* Göç yönünün Anadolu'dan dışarıya doğru yapılandırıldığını doğrulamayı unutmayalım */}
          <CosmicMigrationFlow direction="outward-from-anatolia" />
        </div>
      </div>

      {/* Alt: Anadolu Kalkanı İnteraktif Modülü */}
      <div
        style={{
          border: "1px solid #333",
          borderRadius: "14px",
          overflow: "hidden",
          backgroundColor: "rgba(15, 23, 42, 0.3)"
        }}
      >
        <AnadoluShieldInteractive />
      </div>
    </div>
  );
}