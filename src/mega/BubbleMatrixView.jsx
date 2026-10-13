{/* YKOS VİDEO ARŞİVİ MODALI */}
{videoModalOpen && (
  <div style={{
    position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.85)", zIndex: 9999,
    display: "flex", alignItems: "center", justifyContent: "center", padding: "20px"
  }}>
    <div style={{
      backgroundColor: "#0c101d", border: "1.5px solid #ffd700", borderRadius: "12px",
      width: "100%", maxWidth: "900px", padding: "20px", boxSizing: "border-box",
      boxShadow: "0 10px 30px rgba(0,0,0,0.8)", position: "relative"
    }}>
      
      {/* 1. ANA SAYFAYA DÖNÜŞ BUTONU */}
      <button 
        onClick={() => { setVideoModalOpen(false); navigate("/"); }} 
        style={{
          background: "linear-gradient(135deg, #ffd700, #b8860b)",
          color: "#000",
          border: "none",
          padding: "8px 16px",
          borderRadius: "6px",
          fontWeight: "900",
          fontSize: "0.8rem",
          cursor: "pointer",
          marginBottom: "15px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.3)"
        }}
      >
        ← Ana Sayfaya Dön
      </button>

      {/* Modal Kapatma Çarpısı */}
      <button 
        onClick={() => setVideoModalOpen(false)}
        style={{
          position: "absolute", top: "15px", right: "15px",
          background: "transparent", border: "1px solid #ffd700", color: "#ffd700",
          borderRadius: "50%", width: "30px", height: "30px", fontWeight: "bold", cursor: "pointer"
        }}
      >
        ✕
      </button>

      <h3 style={{ color: "#ffd700", marginTop: "0", fontSize: "1.1rem", borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "10px" }}>
        🎥 YKOS VİDEO ARŞİVİ & SUNUMLAR
      </h3>

      {/* Video Oynatıcı Alanı (Embed / Engelsiz) */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "15px", marginTop: "15px" }}>
        <div style={{ width: "100%", height: "380px", background: "#000", border: "1px solid #ffd700", borderRadius: "8px", overflow: "hidden" }}>
          {activeVideo ? (
            <iframe
              src={
                activeVideo.url?.includes("embed") 
                  ? activeVideo.url 
                  : `https://www.youtube-nocookie.com/embed/${activeVideo.url?.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/)?.[1] || ""}`
              }
              title={activeVideo.title || "YKOS Video"}
              style={{ width: "100%", height: "100%", border: "none" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#aaa" }}>
              Lütfen sağdaki listeden bir video seçin.
            </div>
          )}
        </div>

        {/* Video Liste Alanı */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "380px", overflowY: "auto" }}>
          {allVideoRecords.map((vid, idx) => (
            <button
              key={idx}
              onClick={() => setActiveVideo(vid)}
              style={{
                background: activeVideo?.title === vid.title ? "rgba(255, 215, 0, 0.2)" : "#141824",
                border: "1px solid rgba(255, 215, 0, 0.4)",
                color: "#fff",
                padding: "10px",
                borderRadius: "6px",
                textAlign: "left",
                fontSize: "0.8rem",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              ▶ {vid.title}
            </button>
          ))}
        </div>
      </div>

    </div>
  </div>
)}