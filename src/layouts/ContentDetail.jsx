import React, { useState, useEffect } from "react";
import { getEmbedUrl } from "../data/videoEmbed";

export default function ContentDetail({ selectedId }) {
  const [record, setRecord] = useState(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("ykos_admin_records") || "[]");
      
      let found = null;
      if (selectedId) {
        found = saved.find(
          (r) => String(r.id) === String(selectedId) || r.title === selectedId || r.baslik === selectedId
        );
      }
      
      if (!found && saved.length > 0) {
        found = saved[0];
      }

      setRecord(found);
    } catch (e) {
      console.error(e);
    }
  }, [selectedId]);

  if (!record) {
    return (
      <div style={{ padding: "30px", color: "#ffd700", textAlign: "center", fontFamily: "Segoe UI, sans-serif" }}>
        <h2>İçerik yükleniyor veya bulunamadı...</h2>
      </div>
    );
  }

  const title = record.title || record.baslik || "Başlıksız Kayıt";
  const category = record.category || record.kategori || "YKOS Arşiv";
  const videoUrl = record.videoUrl || record.video || record.videoBaglantisi || "";
  const content = record.content || record.icerik || record.kapsamliAnaliz || record.summary || record.ozet || "";
  const imageUrl = record.image || record.gorsel || record.imageUrl || record.resim || "";
  
  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <div className="content-detail" style={{ padding: "20px", color: "#fff", maxWidth: "900px", margin: "0 auto", fontFamily: "Segoe UI, sans-serif" }}>
      <div style={{ backgroundColor: "#050811", border: "1.5px solid #ffd700", borderRadius: "12px", padding: "25px", boxShadow: "0 10px 30px rgba(0,0,0,0.8)" }}>
        
        <span style={{ backgroundColor: "rgba(255, 215, 0, 0.15)", color: "#ffd700", border: "1px solid #ffd700", padding: "4px 12px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "bold" }}>
          {category}
        </span>

        <h2 style={{ color: "#ffd700", fontSize: "1.8rem", margin: "12px 0 15px 0" }}>{title}</h2>

        {imageUrl && (
          <div style={{ marginBottom: "20px", textAlign: "center" }}>
            <img src={imageUrl} alt={title} style={{ maxWidth: "100%", maxHeight: "400px", borderRadius: "8px", border: "1px solid #ffd700", objectFit: "cover" }} />
          </div>
        )}

        {/* METİN ALANI */}
        <div className="content-text" style={{ fontSize: "1rem", lineHeight: "1.7", color: "#e2e8f0", marginBottom: "30px" }}>
          {content && content.trim() !== "" ? (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            <p>Detaylı metin bulunamadı.</p>
          )}
        </div>

        {/* 🎥 VİDEO OYNATICI (En Altta Bağımsız Alan) */}
        {embedUrl && (
          <div style={{ borderTop: "1px solid rgba(255, 215, 0, 0.3)", paddingTop: "20px" }}>
            <h3 style={{ color: "#ffd700", fontSize: "1.1rem", marginBottom: "12px", textTransform: "uppercase" }}>
              🎥 İlgili Sunum / Video Arşivi
            </h3>
            <iframe
              width="100%"
              height="480"
              src={embedUrl}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ borderRadius: "8px", border: "1.5px solid #ffd700" }}
            ></iframe>
          </div>
        )}

      </div>
    </div>
  );
}
