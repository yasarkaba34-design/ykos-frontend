import React, { useState } from "react";
import { searchYkosApi } from "../data/ykosApiService";

const listKeys = ["results", "items", "posts", "records", "matches"];

function extractRecords(payload) {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== "object") return [];

  for (const key of listKeys) {
    if (Array.isArray(payload[key])) return payload[key];
  }

  for (const key of ["data", "result", "response"]) {
    const nested = payload[key];
    if (Array.isArray(nested)) return nested;
    if (nested && typeof nested === "object") {
      const records = extractRecords(nested);
      if (records.length) return records;
    }
  }

  if (payload.title || payload.baslik || payload.name || payload.synthesis) return [payload];
  return [];
}

function textValue(record, keys) {
  for (const key of keys) {
    const value = record?.[key];
    if (typeof value === "string" && value.trim()) return value;
  }
  return "";
}

function readableValue(value) {
  if (typeof value === "string") return value;
  if (value == null) return "";
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

export default function YKOSAnalysisEngine() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (event) => {
    event.preventDefault();
    const cleanQuery = query.trim();
    if (cleanQuery.length < 2) {
      setError("Arama için en az iki karakter girin.");
      setResult(null);
      return;
    }

    setIsSearching(true);
    setError("");
    setResult(null);
    try {
      const response = await searchYkosApi(cleanQuery);
      if (!response || response.source === "none") {
        setError("Arama sonucu alınamadı.");
      } else {
        setResult(response);
      }
    } catch (searchError) {
      setError(searchError?.message || "Arama sırasında beklenmeyen bir hata oluştu.");
    } finally {
      setIsSearching(false);
    }
  };

  const records = result ? extractRecords(result.data) : [];
  const fromArchive = result?.source === "central-archive";

  return (
    <section style={{
      maxWidth: "1100px",
      margin: "18px auto",
      padding: "20px",
      color: "#f8fafc",
      fontFamily: "Segoe UI, sans-serif"
    }}>
      <div style={{ background: "#050811", border: "1px solid #d4af37", borderRadius: "12px", padding: "clamp(18px, 4vw, 30px)" }}>
        <h1 style={{ color: "#ffd700", marginTop: 0 }}>YKOS Okuma ve Arşiv Analizi</h1>
        <p style={{ color: "#cbd5e1", lineHeight: 1.6 }}>
          Arama önce merkez arşivde yapılır. Bağlantı kurulamazsa yerel sentez ayrı ve açık biçimde gösterilir.
        </p>

        <form onSubmit={handleSearch} style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Arşivde aranacak sözcük veya konu"
            aria-label="Arşiv araması"
            style={{ flex: "1 1 260px", minWidth: 0, padding: "12px", borderRadius: "6px", border: "1px solid #8b7426", background: "#000", color: "#fff" }}
          />
          <button
            type="submit"
            disabled={isSearching}
            style={{ padding: "12px 20px", border: 0, borderRadius: "6px", background: "#d4af37", color: "#111", fontWeight: 700, cursor: isSearching ? "wait" : "pointer" }}
          >
            {isSearching ? "Aranıyor…" : "Ara"}
          </button>
        </form>

        {error && <p role="alert" style={{ color: "#fca5a5", marginTop: "16px" }}>{error}</p>}
        {isSearching && <p role="status" style={{ color: "#fcd34d", marginTop: "16px" }}>Merkez arşiv yanıtı bekleniyor…</p>}

        {result && (
          <div aria-live="polite" style={{ marginTop: "22px" }}>
            <div style={{
              border: `1px solid ${fromArchive ? "#22c55e" : "#f59e0b"}`,
              borderRadius: "8px",
              padding: "12px 14px",
              marginBottom: "14px",
              color: fromArchive ? "#bbf7d0" : "#fde68a"
            }}>
              {fromArchive
                ? "Kaynak: ykos.com.tr merkez arşiv API’si"
                : "Kaynak: yerel sentez. Bu içerik merkez arşiv kaydı değildir."}
              {result.error && <div style={{ marginTop: "6px", fontSize: "0.9rem" }}>API bilgisi: {result.error}</div>}
            </div>

            {records.length ? records.map((record, index) => {
              const title = textValue(record, ["title", "baslik", "name", "heading"]) || `Kayıt ${index + 1}`;
              const body = textValue(record, ["summary", "ozet", "synthesis", "content", "description", "excerpt", "text", "body"]);
              const source = textValue(record, ["sourceVolume", "source", "kaynak"]);
              return (
                <article key={record.id || record.slug || index} style={{ background: "#0b1220", border: "1px solid #334155", borderRadius: "8px", padding: "16px", marginTop: "10px" }}>
                  <h2 style={{ color: "#fcd34d", fontSize: "1.1rem", margin: "0 0 8px" }}>{title}</h2>
                  {body && <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.7, color: "#e2e8f0" }}>{body}</div>}
                  {source && <div style={{ color: "#94a3b8", marginTop: "10px", fontSize: "0.9rem" }}>Kaynak: {source}</div>}
                  {!body && <pre style={{ color: "#cbd5e1", whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>{readableValue(record)}</pre>}
                </article>
              );
            }) : (
              <p style={{ color: "#cbd5e1" }}>API yanıtı geldi ancak tanınan bir kayıt listesi bulunamadı.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
