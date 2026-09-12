// src/components/ReadingPanel.jsx
import React, { useState, useEffect } from "react";

// Sizin hazırladığınız temiz ve kararlı embed dönüştürücü fonksiyon
export const getEmbedUrl = (url) => {
  if (!url) return null;
  let id = "";
  if (url.includes("youtu.be/")) {
    id = url.split("youtu.be/")[1].split("?")[0];
  } else if (url.includes("v=")) {
    id = url.split("v=")[1].split("&")[0];
  } else if (url.includes("embed/")) {
    id = url.split("embed/")[1].split("?")[0];
  }
  return id ? `https://www.youtube.com/embed/${id}` : url;
};

const readsData = [
  {
    id: 1,
    title: "Göbeklitepe T-Sütunu YKOS Okuması",
    category: "Arkeolojik Okuma Katmanı",
    period: "M.Ö. 9600",
    location: "Şanlıurfa, Anadolu",
    summary: "Göbeklitepe T-sütunları üzerindeki ikil sembollerin YKOS kök hece ve damga yöntemiyle okunması.",
    content: `Göbeklitepe T-sütunları üzerinde yer alan 'H' ve 'C' piktogramları ile hayvan rölyefleri, geleneksel arkeolojik yaklaşımların aksine birer süsleme değil, Ön-Türkçe kök hece dizgesine dayalı kavramsal metinlerdir.`
  }
];

export default function ReadingPanel({ content }) {
  const [adminRecords, setAdminRecords] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("ykos_admin_records") || "[]");
      setAdminRecords(saved);
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Kayıt bulma mekanizması
  let currentItem = null;

  if (adminRecords.length > 0) {
    if (content) {
      if (typeof content === "object") {
        currentItem = adminRecords.find(
          (r) => String(r.id) === String(content.id || content.title || content.baslik) ||
                 (r.title && content.title && r.title.toLowerCase() === content.title.toLowerCase()) ||
                 (r.baslik && content.baslik && r.baslik.toLowerCase() === content.baslik.toLowerCase())
        );
      } else {
        currentItem = adminRecords.find(
          (r) => String(r.id) === String(content) ||
                 (r.title && r.title.toLowerCase().includes(String(content).toLowerCase())) ||
                 (r.baslik && r.baslik.toLowerCase().includes(String(content).toLowerCase()))
        );
      }
    }

    if (!currentItem) {
      currentItem = adminRecords[0];
    }
  }

  if (!currentItem) {
    currentItem = readsData[0];
  }

  const itemTitle = currentItem.title || currentItem.baslik || "Başlıksız Kayıt";
  const itemCategory = currentItem.category || currentItem.icerikTuru || currentItem.kategori || "YKOS Arşiv";
  const itemContent = currentItem.content || currentItem.icerik || currentItem.kapsamliAnaliz || currentItem.summary || currentItem.ozet || currentItem.aciklama || "Detaylı metin bulunamadı.";
  const itemImage = currentItem.image || currentItem.kapakGorseli || currentItem.gorsel || currentItem.imageUrl || currentItem.resim || "";
  const itemVideo = currentItem.videoUrl || currentItem.video || currentItem.videoBaglantisi || "";

  const videoEmbedUrl = getEmbedUrl(itemVideo);

  return (
    <div style={{ padding: "20px", color: "#fff", fontFamily: "Segoe UI, sans-serif", maxWidth: "900px", margin: "0 auto" }}>
      <div
        style={{
          backgroundColor: "#050811",
          border: "1.5px solid #ffd700",
          borderRadius: "12px",
          padding: "25px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.8)"
        }}
      >
        <div
          style={{
            borderBottom: "1px solid rgba(255, 215, 0, 0.3)",
            paddingBottom: "15px",
            marginBottom: "20px"
          }}
        >
          <span
            style={{
              backgroundColor: "rgba(255, 215, 0, 0.15)",
              color: "#ffd700",
              border: "1px solid #ffd700",
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "0.75rem",
              fontWeight: "bold"
            }}
          >
            {itemCategory}
          </span>

          <h1 style={{ color: "#ffd700", fontSize: "1.8rem", margin: "12px 0 6px 0" }}>
            {itemTitle}
          </h1>

          <div style={{ fontSize: "0.85rem", color: "#38bdf8", display: "flex", gap: "15px" }}>
            {currentItem.period && <span>⏳ {currentItem.period}</span>}
            {currentItem.location && <span>📍 {currentItem.location}</span>}
            {currentItem.date && <span>📅 {currentItem.date}</span>}
          </div>
        </div>

        {/* Manşet Görseli */}
        {itemImage && (
          <div style={{ marginBottom: "20px", textAlign: "center" }}>
            <img
              src={itemImage}
              alt={itemTitle}
              style={{ maxWidth: "100%", maxHeight: "400px", borderRadius: "8px", border: "1px solid #ffd700", objectFit: "cover" }}
            />
          </div>
        )}

        {/* Detay Metni */}
        <div
          style={{
            fontSize: "1rem",
            lineHeight: "1.7",
            color: "#e2e8f0",
            whiteSpace: "pre-line"
          }}
        >
          {itemContent}
        </div>

        {/* 🎥 VİDEO OYNATICI (Sayfanın En Altında) */}
        {videoEmbedUrl && (
          <div style={{ marginTop: "32px", borderTop: "1px solid rgba(255, 215, 0, 0.3)", paddingTop: "20px" }}>
            <h3 style={{ color: "#ffd700", fontSize: "1.1rem", marginBottom: "12px", textTransform: "uppercase" }}>
              🎥 İlgili Sunum / Video Arşivi
            </h3>
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: "8px", border: "1.5px solid #ffd700" }}>
              <iframe
                src={videoEmbedUrl}
                title="YKOS Video Oynatıcı"
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}