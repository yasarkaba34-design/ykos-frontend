// src/components/ReadingPanel.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getEmbedUrl } from "../data/videoEmbed";
import { loadArchiveData } from "../data/ykosDataService";
import { db } from "../data/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
const normalizeId = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/^(tuditam-|ykos-)/i, "");
const isApproved = (record) =>
  record.status === "approved" ||
  record.status === "published" ||
  record.durum === "onaylandi";
export default function ReadingPanel({
  content: incomingContent,
  id,
  readId,
}) {
  const { id: routeId } = useParams();
  const paramId = readId || id || routeId;
  const [content, setContent] = useState(incomingContent || null);
  const [loading, setLoading] = useState(
    !incomingContent && Boolean(paramId)
  );
  const [error, setError] = useState("");
  const [largeImage, setLargeImage] = useState(null);
  useEffect(() => {
    let cancelled = false;
    setLargeImage(null);
    setError("");
    if (incomingContent) {
      setContent(incomingContent);
      setLoading(false);
      return;
    }
    setContent(null);
    if (!paramId) {
      setLoading(false);
      return;
    }
    const targetId = normalizeId(paramId);
    const matchesId = (record, documentId) =>
      [record.id, record.kod, documentId].some(
        (value) =>
          value != null && normalizeId(value) === targetId
      );
    async function loadContent() {
      setLoading(true);
      try {
        // 1. Ana sayfanın kullandığı onaylı yerel kayıtlar.
        let localRecords = [];
        try {
          const saved = JSON.parse(
            localStorage.getItem("ykos_admin_records") || "[]"
          );
          localRecords = Array.isArray(saved) ? saved : [];
        } catch (err) {
          console.warn("Yerel kayıtlar okunamadı:", err);
        }
        const localMatch = localRecords.find(
          (record) =>
            record && isApproved(record) && matchesId(record)
        );
        if (localMatch) {
          if (!cancelled) setContent(localMatch);
          return;
        }
        // 2. C-2 dahil dosyada bulunan tam arşiv içerikleri.
        const archiveRecords = loadArchiveData();
        const archiveMatch = Array.isArray(archiveRecords)
          ? archiveRecords.find(
              (record) => record && matchesId(record)
            )
          : null;
        if (archiveMatch) {
          if (!cancelled) setContent(archiveMatch);
          return;
        }
        // 3. Firestore: önce doğrudan belge kimliği.
        const collections = ["bulgular", "ykos_bulgulari"];
        const rawId = String(paramId).trim();
        const candidateIds = [...new Set([
          rawId,
          rawId.replace(/^TUDITAM-/i, "YKOS-"),
          rawId.replace(/^(TUDITAM-|YKOS-)/i, ""),
        ])];
        let firestoreError = null;
        for (const collectionName of collections) {
          for (const candidateId of candidateIds) {
            if (cancelled) return;
            try {
              const snapshot = await getDoc(
                doc(db, collectionName, candidateId)
              );
              if (snapshot.exists()) {
                if (!cancelled) setContent(snapshot.data());
                return;
              }
            } catch (err) {
              firestoreError = err;
              console.warn(
                `${collectionName} belge okuma hatası:`,
                err
              );
            }
          }
        }
        // 4. Firestore: belgenin id veya kod alanını eşleştir.
        for (const collectionName of collections) {
          if (cancelled) return;
          try {
            const snapshot = await getDocs(
              collection(db, collectionName)
            );
            const match = snapshot.docs.find((item) =>
              matchesId(item.data(), item.id)
            );
            if (match) {
              if (!cancelled) setContent(match.data());
              return;
            }
          } catch (err) {
            firestoreError = err;
            console.warn(
              `${collectionName} koleksiyon okuma hatası:`,
              err
            );
          }
        }
        if (firestoreError && !cancelled) {
          setError(
            "Yerel arşivde eşleşme bulunamadı; Firestore araması sırasında hata oluştu."
          );
        }
      } catch (err) {
        console.warn("İçerik yükleme hatası:", err);
        if (!cancelled) {
          setError("İçerik yüklenirken hata oluştu.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadContent();
    return () => {
      cancelled = true;
    };
  }, [paramId, incomingContent]);
  useEffect(() => {
    if (!largeImage) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setLargeImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [largeImage]);
  if (loading) {
    return (
      <div
        style={{
          color: "#ffd700",
          padding: "40px",
          textAlign: "center",
          fontSize: "1.2rem",
        }}
      >
        Veri yükleniyor...
      </div>
    );
  }
  if (!content) {
    return (
      <div
        style={{
          color: "#fff",
          padding: "40px",
          textAlign: "center",
        }}
      >
        {error || "İçerik bulunamadı."}
        <br />
        <span
          style={{
            color: "#94a3b8",
            fontSize: "0.85rem",
          }}
        >
          Aranan Kimlik: {paramId || "Belirtilmedi"}
        </span>
      </div>
    );
  }
  const article = content.article ?? content.record ?? content;
  const title = article.baslik || article.title || "";
  const summary =
    article.kisaOzet || article.summary || article.ozet || "";
  const articleContent =
    article.aciklama ||
    article.kapsamliAnaliz ||
    article.content ||
    article.icerik ||
    article.description ||
    "";
  const category =
    article.kategori ||
    article.category ||
    article.icerikTuru ||
    "Merkez Arşiv";
  const region = article.bolge
    ? ` • Bölge: ${article.bolge}`
    : "";
  const image =
    article.gorselUrl ||
    article.resimOnizleme ||
    article.kapakGorseli ||
    article.image ||
    article.gorsel ||
    article.imageUrl ||
    article.resim ||
    "";
  const gallery =
    article.galeriGorselleri || article.gallery || [];
  const videoUrl =
    article.videoUrl ||
    article.video ||
    article.videoBaglantisi ||
    "";
  const rawDate =
    article.eklenmeTarihi || article.tarih || article.date || "";
  const date =
    typeof rawDate?.toDate === "function"
      ? rawDate.toDate().toLocaleDateString("tr-TR")
      : typeof rawDate === "string" ||
          typeof rawDate === "number"
        ? String(rawDate)
        : "";
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1600px",
        margin: "20px auto",
        padding: "clamp(10px, 3vw, 20px)",
        color: "#fff",
        fontFamily: "Segoe UI, sans-serif",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          backgroundColor: "#050811",
          border: "1.5px solid #ffd700",
          borderRadius: "14px",
          padding: "clamp(16px, 4vw, 30px)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
        }}
      >
        <Link
          to="/"
          style={{
            display: "inline-block",
            marginBottom: "20px",
            padding: "10px 16px",
            background: "#ffd700",
            color: "#050811",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          ← Ana Sayfaya Dön
        </Link>
        <div
          style={{
            color: "#38bdf8",
            fontSize: "0.9rem",
            marginBottom: "12px",
          }}
        >
          {category}
          {region}
          {date ? ` • ${date}` : ""}
        </div>
        <h1
          style={{
            color: "#ffd700",
            fontSize: "clamp(1.4rem, 4vw, 2rem)",
            lineHeight: "1.3",
            margin: "0 0 20px",
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
              cursor: "zoom-in",
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
              lineHeight: "1.7",
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
            whiteSpace: "pre-line",
            overflowWrap: "anywhere",
          }}
        >
          {articleContent || "İçerik metni bulunamadı."}
        </div>
        {Array.isArray(gallery) && gallery.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
              gap: "15px",
              marginTop: "25px",
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
                  cursor: "zoom-in",
                }}
              />
            ))}
          </div>
        )}
        {videoUrl && (
          <div
            style={{
              width: "100%",
              marginTop: "25px",
              aspectRatio: "16 / 9",
              position: "relative",
              overflow: "hidden",
              border: "1px solid #ffd700",
              borderRadius: "10px",
              backgroundColor: "#000",
              boxSizing: "border-box",
            }}
          >
            <iframe
              src={getEmbedUrl(videoUrl)}
              title={title || "YKOS Video"}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{
                position: "absolute",
                inset: 0,
                display: "block",
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
          </div>
        )}
      </div>
      {largeImage && (
        <div
          onClick={() => setLargeImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Büyütülmüş görsel"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.94)",
            cursor: "zoom-out",
          }}
        >
          <button
            type="button"
            onClick={() => setLargeImage(null)}
            aria-label="Görseli kapat"
            style={{
              position: "absolute",
              top: "15px",
              right: "15px",
              background: "#050811",
              color: "#ffd700",
              border: "1px solid #ffd700",
              borderRadius: "6px",
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
          <img
            src={largeImage}
            alt={title}
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              objectFit: "contain",
              border: "1px solid #ffd700",
              borderRadius: "8px",
            }}
          />
        </div>
      )}
    </div>
  );
}