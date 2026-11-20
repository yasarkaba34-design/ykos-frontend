import React, { useEffect, useRef, useState } from "react";
import data from "../data/data.json";
import ShareButtons from "./ShareButtons";

function getText(record, keys) {
  for (const key of keys) {
    const value = record?.[key];
    if (typeof value === "string" && value.trim()) return value;
  }
  return "";
}

export default function ReadingPanel({ content }) {
  const [imageExpanded, setImageExpanded] = useState(false);
  const imageTriggerRef = useRef(null);

  useEffect(() => {
    if (!imageExpanded) return undefined;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setImageExpanded(false);
        imageTriggerRef.current?.focus();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [imageExpanded]);
  let record = content && typeof content === "object" ? content : null;

  if (!record && content != null) {
    const id = String(content).trim();
    record = data.damgalar.find(
      (item) => String(item.id) === id || String(item.hece) === id
    ) || null;
  }

  if (!record) {
    return (
      <div style={{ color: "#fff", padding: "24px", textAlign: "center" }}>
        Seçilen içerik bulunamadı.
      </div>
    );
  }

  const title = getText(record, ["title", "baslik", "name"]) ||
    (record.hece ? `Damga / Kök hece: ${record.hece}` : "İçerik ayrıntısı");
  const category = getText(record, ["category", "kategori", "tag"]);
  const summary = getText(record, ["summary", "ozet", "desc", "description"]);
  const body = getText(record, ["content", "text", "synthesis", "aciklama", "kavram"]);
  const shape = getText(record, ["shape", "form"]);
  const culture = getText(record, ["cosmic", "location", "sourceVolume", "source"]);
  const image = getText(record, ["image", "imageUrl", "gorsel", "resim"]);

  return (
    <main style={{
      width: "100%",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
      color: "#fff",
      fontFamily: "Segoe UI, sans-serif",
      boxSizing: "border-box"
    }}>
      <article style={{
        background: "#050811",
        border: "1.5px solid #ffd700",
        borderRadius: "14px",
        padding: "clamp(20px, 4vw, 35px)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.55)"
      }}>
        {category && <div style={{ color: "#38bdf8", marginBottom: "8px" }}>{category}</div>}
        <h1 style={{ color: "#ffd700", margin: "0 0 12px", fontSize: "1.8rem" }}>{title}</h1>
        {record.hece && <p style={{ color: "#38bdf8" }}>Kök / hece: <strong>{record.hece}</strong></p>}
        {summary && <p style={{ lineHeight: 1.7, color: "#e2e8f0" }}>{summary}</p>}
        {image && (
          <>
            <button
              ref={imageTriggerRef}
              type="button"
              onClick={() => setImageExpanded(true)}
              aria-label={"Görseli büyüt: " + title}
              style={{ display: "block", position: "relative", maxWidth: "100%", margin: "18px auto", padding: 0, border: 0, borderRadius: "8px", background: "transparent", cursor: "zoom-in" }}
            >
              <img
                src={image}
                alt={title}
                style={{ display: "block", maxWidth: "100%", maxHeight: "520px", objectFit: "contain", borderRadius: "8px" }}
              />
              <span aria-hidden="true" style={{ position: "absolute", right: "10px", bottom: "10px", padding: "6px 10px", borderRadius: "999px", color: "#fff", background: "rgba(3, 7, 18, 0.82)", fontSize: "0.8rem", fontWeight: 700 }}>
                ⛶ Büyüt
              </span>
            </button>
            {imageExpanded && (
              <div
                role="dialog"
                aria-modal="true"
                aria-label={"Büyütülmüş görsel: " + title}
                onClick={() => { setImageExpanded(false); imageTriggerRef.current?.focus(); }}
                style={{ position: "fixed", inset: 0, zIndex: 10000, display: "flex", alignItems: "center", justifyContent: "center", padding: "56px 24px 24px", boxSizing: "border-box", background: "rgba(0, 0, 0, 0.92)", cursor: "zoom-out" }}
              >
                <button
                  type="button"
                  aria-label="Büyütülmüş görseli kapat"
                  onClick={(event) => { event.stopPropagation(); setImageExpanded(false); imageTriggerRef.current?.focus(); }}
                  style={{ position: "absolute", top: "16px", right: "20px", width: "44px", height: "44px", border: "1px solid rgba(255,255,255,0.65)", borderRadius: "50%", color: "#fff", background: "rgba(20,20,20,0.8)", fontSize: "28px", lineHeight: 1, cursor: "pointer" }}
                >
                  ×
                </button>
                <img src={image} alt={title} onClick={(event) => event.stopPropagation()} style={{ display: "block", maxWidth: "min(96vw, 1800px)", maxHeight: "calc(100vh - 88px)", width: "auto", height: "auto", objectFit: "contain", cursor: "default" }} />
              </div>
            )}
          </>
        )}
        <ShareButtons title={title} />
        {body && <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.8, color: "#e2e8f0" }}>{body}</div>}
        {shape && <p style={{ color: "#cbd5e1" }}>Biçim: {shape}</p>}
        {culture && <p style={{ color: "#94a3b8" }}>Bağlantı / kaynak: {culture}</p>}
        {!summary && !body && !shape && !culture && !image && (
          <p style={{ color: "#cbd5e1" }}>Bu kayıt için henüz ayrıntılı açıklama bulunmuyor.</p>
        )}
      </article>
    </main>
  );
}
