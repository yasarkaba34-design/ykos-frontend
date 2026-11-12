import React from "react";
import data from "../data/data.json";

function getText(record, keys) {
  for (const key of keys) {
    const value = record?.[key];
    if (typeof value === "string" && value.trim()) return value;
  }
  return "";
}

export default function ReadingPanel({ content }) {
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
        {image && <img src={image} alt={title} style={{ display: "block", maxWidth: "100%", maxHeight: "520px", objectFit: "contain", margin: "18px auto" }} />}
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
