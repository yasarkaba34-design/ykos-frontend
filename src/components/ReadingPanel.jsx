// src/components/ReadingPanel.jsx
import React, { useState } from "react";

export default function ReadingPanel({ content }) {
  const [largeImage, setLargeImage] = useState(null);

  if (!content) {
    return (
      <div style={{ color: "#fff", padding: "20px" }}>
        İçerik bulunamadı.
      </div>
    );
  }

  // MERKEZ ARŞİV / MAKALE KAYDI KONTROLÜ
  const article =
    content?.article ??
    content?.record ??
    content;

  const isArticle = Boolean(
    article?.title &&
      (
        article?.summary ||
        article?.content ||
        article?.category ||
        article?.image ||
        article?.date
      )
  );

  // MAKALE GÖRÜNÜMÜ
  if (isArticle) {
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
            {article.category || "Merkez Arşiv"}
            {article.date ? ` • ${article.date}` : ""}
          </div>

          <h1
            style={{
              color: "#ffd700",
              fontSize: "2rem",
              lineHeight: "1.3",
              margin: "0 0 20px"
            }}
          >
            {article.title}
          </h1>

{article.image && (
  <>
    <img
      src={article.image}
      alt={article.title}
      onClick={() => setLargeImage(article.image)}
      title="Büyütmek için tıklayın"
      style={{
        display: "block",
        width: "100%",
        height: "auto",
        maxHeight: "none",
        objectFit: "contain",
        borderRadius: "10px",
        marginBottom: "22px",
        cursor: "zoom-in"
      }}
    />

    {largeImage && (
      <div
        onClick={() => setLargeImage(null)}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "25px",
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
            maxWidth: "96vw",
            maxHeight: "94vh",
            width: "auto",
            height: "auto",
            objectFit: "contain",
            border: "1px solid #ffd700",
            borderRadius: "8px",
            boxShadow: "0 0 35px rgba(0,0,0,0.9)"
          }}
        />
      </div>
    )}
  </>
)}    
{article.summary && (
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
              {article.summary}
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
            {article.content || "İçerik metni bulunamadı."}
          </div>

          {Array.isArray(article.gallery) &&
            article.gallery.length > 0 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "15px",
                  marginTop: "25px"
                }}
              >
                {article.gallery.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${article.title} ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "1px solid #334155"
                    }}
                  />
                ))}
              </div>
            )}

          {article.videoUrl && (
            <div style={{ marginTop: "25px" }}>
              <a
                href={article.videoUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block",
                  padding: "10px 18px",
                  color: "#000",
                  backgroundColor: "#ffd700",
                  borderRadius: "7px",
                  fontWeight: "bold",
                  textDecoration: "none"
                }}
              >
                🎥 Videoyu Aç
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }

  // SEMANTİK ANALİZ VERİSİ
  const analysis =
    content?.analysis ??
    content?.result?.analysis ??
    content?.data?.analysis ??
    content;

  if (
    !analysis ||
    typeof analysis !== "object" ||
    Object.keys(analysis).length === 0
  ) {
    return (
      <div style={{ color: "#fff", padding: "20px" }}>
        Analiz verisi bulunamadı.
      </div>
    );
  }

  const root =
    analysis.root ??
    analysis.rootHece ??
    analysis.rootHeces ??
    "—";

  const phoneticRaw =
    analysis.phonetic ??
    analysis.phoneticChain ??
    [];

  const phonetic = Array.isArray(phoneticRaw)
    ? phoneticRaw
    : [phoneticRaw].filter(Boolean);

  const semantic =
    analysis.semantic ??
    analysis.semanticChain ??
    analysis.message ??
    "";

  const cultureRaw =
    analysis.cultureLinks ??
    analysis.culturalLinks ??
    analysis.cultures ??
    [];

  const cultureLinks = Array.isArray(cultureRaw)
    ? cultureRaw
    : [cultureRaw].filter(Boolean);

  const score =
    analysis.score ??
    analysis.similarityScore ??
    null;

  const validated =
    analysis.validated ??
    analysis.isValid ??
    false;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
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
          padding: "35px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.8)"
        }}
      >
        <h1
          style={{
            color: "#ffd700",
            fontSize: "2rem",
            marginBottom: "10px",
            fontWeight: "900"
          }}
        >
          Semantik Okuma Sonucu
        </h1>

        <div
          style={{
            fontSize: "1.2rem",
            color: "#38bdf8",
            marginBottom: "20px"
          }}
        >
          🔤 Kök: <strong>{root}</strong>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <h3
            style={{
              color: "#ffd700",
              fontSize: "1.1rem",
              marginBottom: "10px"
            }}
          >
            🧩 Fonetik Zincir
          </h3>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px"
            }}
          >
            {phonetic.length > 0 ? (
              phonetic.map((item, index) => (
                <span
                  key={index}
                  style={{
                    backgroundColor: "rgba(255,215,0,0.15)",
                    border: "1px solid #ffd700",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    fontSize: "0.9rem"
                  }}
                >
                  {typeof item === "object"
                    ? JSON.stringify(item)
                    : item}
                </span>
              ))
            ) : (
              <span>—</span>
            )}
          </div>
        </div>

        {semantic && (
          <div
            style={{
              fontSize: "1.05rem",
              lineHeight: "1.85",
              color: "#e2e8f0",
              marginBottom: "25px",
              whiteSpace: "pre-line"
            }}
          >
            {typeof semantic === "object"
              ? JSON.stringify(semantic)
              : semantic}
          </div>
        )}

        <div>
          <h3
            style={{
              color: "#ffd700",
              fontSize: "1.1rem",
              marginBottom: "10px"
            }}
          >
            🌍 Kültürel Bağlantılar
          </h3>

          {cultureLinks.length > 0 ? (
            <ul style={{ paddingLeft: "20px", color: "#e2e8f0" }}>
              {cultureLinks.map((item, index) => (
                <li key={index}>
                  {typeof item === "object"
                    ? JSON.stringify(item)
                    : item}
                </li>
              ))}
            </ul>
          ) : (
            <div style={{ color: "#e2e8f0" }}>—</div>
          )}
        </div>

        <div
          style={{
            marginTop: "25px",
            padding: "15px",
            backgroundColor: "rgba(56,189,248,0.1)",
            borderRadius: "10px",
            border: "1px solid #38bdf8"
          }}
        >
          <div style={{ fontSize: "0.95rem", marginBottom: "6px" }}>
            ✔ Doğrulama: {validated ? "Geçerli" : "Geçersiz"}
          </div>

          <div style={{ fontSize: "0.95rem" }}>
            📊 Skor: {score ?? "—"}
          </div>
        </div>
      </div>
    </div>
  );
}