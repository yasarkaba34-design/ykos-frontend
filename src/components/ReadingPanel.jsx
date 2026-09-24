// src/components/ReadingPanel.jsx

import React, { useState } from "react";
import { getEmbedUrl } from "../data/videoEmbed";

export default function ReadingPanel({ content }) {
  const [largeImage, setLargeImage] = useState(null);

  if (!content) {
    return (
      <div style={{ color: "#fff", padding: "20px" }}>
        İçerik bulunamadı.
      </div>
    );
  }

  const article = content?.article ?? content?.record ?? content;

  // Türkçe ve İngilizce alan adlarının ikisini de destekler
  const title = article?.title || article?.baslik || "";
  const summary = article?.summary || article?.kisaOzet || "";
  const articleContent =
    article?.content || article?.kapsamliAnaliz || "";
  const category =
    article?.category || article?.icerikTuru || "Merkez Arşiv";
  const image = article?.image || article?.kapakGorseli || "";
  const gallery = article?.gallery || article?.galeriGorselleri || [];
  const videoUrl = article?.videoUrl || "";
  const date = article?.date || article?.tarih || "";

  const isArticle = Boolean(
    title &&
      (summary ||
        articleContent ||
        category ||
        image ||
        videoUrl ||
        date)
  );

  if (!isArticle) {
    return (
      <div style={{ color: "#fff", padding: "20px" }}>
        Analiz verisi bulunamadı.
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1600px",
        margin: "20px auto",
        padding: "20px",
        color: "#fff",
        fontFamily: "Segoe UI, sans-serif",
        boxSizing: "border-box"
      }}
    >
      <div
        style={{
          backgroundColor: "#050811",
          border: "1.5px solid #ffd700",
          borderRadius: "14px",
          padding: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.8)"
        }}
      >
        <div
          style={{
            color: "#38bdf8",
            fontSize: "0.9rem",
            marginBottom: "12px"
          }}
        >
          {category}
          {date ? ` • ${date}` : ""}
        </div>

        <h1
          style={{
            color: "#ffd700",
            fontSize: "2rem",
            lineHeight: "1.3",
            margin: "0 0 20px"
          }}
        >
          {title}
        </h1>

        {image && (
          <img
            src={image}
            alt={title}
            onClick={() => setLargeImage(image)}
            title="Büyütmek için tıklayın"
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              objectFit: "contain",
              borderRadius: "10px",
              marginBottom: "22px",
              cursor: "zoom-in"
            }}
          />
        )}

        {summary && (
          <div
            style={{
              padding: "14px",
              marginBottom: "22px",
              color: "#38bdf8",
              backgroundColor: "rgba(56,189,248,0.08)",
              borderLeft: "3px solid #38bdf8",
              borderRadius: "5px",
              lineHeight: "1.7"
            }}
          >
            {summary}
          </div>
        )}

        <div
          style={{
            color: "#e2e8f0",
            fontSize: "1rem",
            lineHeight: "1.9",
            whiteSpace: "pre-line"
          }}
        >
          {articleContent || "İçerik metni bulunamadı."}
        </div>

        {Array.isArray(gallery) && gallery.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "15px",
              marginTop: "25px"
            }}
          >
            {gallery.map((galleryImage, index) => (
              <img
                key={`${galleryImage}-${index}`}
                src={galleryImage}
                alt={`${title} ${index + 1}`}
                onClick={() => setLargeImage(galleryImage)}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  border: "1px solid #334155",
                  cursor: "zoom-in"
                }}
              />
            ))}
          </div>
        )}

        {videoUrl && (
          <div style={{ marginTop: "25px" }}>
            <div
              style={{
                position: "relative",
                width: "100%",
                paddingTop: "56.25%",
                overflow: "hidden",
                borderRadius: "10px",
                border: "1px solid #ffd700",
                backgroundColor: "#000"
              }}
            >
              <iframe
                src={getEmbedUrl(videoUrl)}
                title={title || "YKOS Video"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  border: "none"
                }}
              />
            </div>

            <a
              href={videoUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-block",
                marginTop: "12px",
                padding: "10px 18px",
                color: "#000",
                backgroundColor: "#ffd700",
                borderRadius: "7px",
                fontWeight: "bold",
                textDecoration: "none"
              }}
            >
              🎥 YouTube’da Aç
            </a>
          </div>
        )}
      </div>

   {largeImage && (
  <div
    onClick={() => setLargeImage(null)}
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 99999,
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      overflow: "auto",
      padding: "25px",
      boxSizing: "border-box",
      backgroundColor: "rgba(0,0,0,0.94)",
      cursor: "zoom-out"
    }}
  >
    <button
      type="button"
      onClick={() => setLargeImage(null)}
      style={{
        position: "fixed",
        top: "20px",
        right: "25px",
        zIndex: 100000,
        width: "44px",
        height: "44px",
        color: "#000",
        backgroundColor: "#ffd700",
        border: "none",
        borderRadius: "50%",
        fontSize: "24px",
        fontWeight: "bold",
        cursor: "pointer"
      }}
    >
      ×
    </button>

    <img
      src={largeImage}
      alt={article.title}
      onClick={(event) => event.stopPropagation()}
      style={{
        display: "block",
        width: "96vw",
        maxWidth: "none",
        maxHeight: "none",
        height: "auto",
        objectFit: "contain",
        margin: "70px auto 30px",
        border: "1px solid #ffd700",
        borderRadius: "8px",
        boxShadow: "0 0 35px rgba(0,0,0,0.9)"
      }}
    />
  </div>
)} 

      </div>
    );
  }
