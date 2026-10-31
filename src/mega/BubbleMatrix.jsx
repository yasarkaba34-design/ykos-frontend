import React, { useState } from "react";
import { searchCentralArchive } from "../data/ykosApiService";

function firstValue(record, keys) {
  for (const key of keys) {
    const value = record?.[key];
    if (typeof value === "string" && value.trim()) return value.trim();
    if (typeof value === "number") return String(value);
  }
  return "";
}

function archiveUrl(record) {
  const value = firstValue(record, ["url", "link", "permalink", "sourceUrl"]);
  if (!value) return "";
  try {
    const url = new URL(value, "https://www.ykos.com.tr");
    return url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
}

function ArchiveRecord({ record, index }) {
  const title =
    firstValue(record, ["title", "baslik", "name", "heading"]) ||
    `Arşiv kaydı ${index + 1}`;
  const excerpt = firstValue(record, [
    "excerpt",
    "summary",
    "description",
    "content",
    "body",
    "text",
    "aciklama"
  ]);
  const date = firstValue(record, ["date", "publishedAt", "createdAt", "tarih"]);
  const category = firstValue(record, ["category", "kategori", "type", "language"]);
  const url = archiveUrl(record);

  return (
    <article style={styles.record}>
      <div style={styles.recordTop}>
        <div>
          {category && <span style={styles.tag}>{category}</span>}
          <h3 style={styles.recordTitle}>{title}</h3>
        </div>
        {date && <time style={styles.date}>{date}</time>}
      </div>
      {excerpt ? (
        <p style={styles.excerpt}>{excerpt}</p>
      ) : (
        <p style={styles.muted}>Arşiv yanıtında açıklama alanı bulunmuyor.</p>
      )}
      <div style={styles.recordFoot}>
        <span style={styles.source}>Kaynak: ykos.com.tr merkez arşivi</span>
        {url && (
          <a href={url} target="_blank" rel="noreferrer" style={styles.link}>
            Arşiv kaydını aç ↗
          </a>
        )}
      </div>
    </article>
  );
}

export default function BubbleMatrix() {
  const [query, setQuery] = useState("");
  const [records, setRecords] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function runSearch(event) {
    event.preventDefault();
    const clean = query.trim();
    if (clean.length < 2) {
      setError("Arama için en az iki karakter yazın.");
      return;
    }

    setLoading(true);
    setError("");
    setSearched(true);
    try {
      const result = await searchCentralArchive(clean);
      setRecords(result.records);
      if (!result.records.length) {
        setError("Merkez arşiv bu arama için kayıt döndürmedi.");
      }
    } catch (err) {
      setRecords([]);
      setError(
        err?.message ||
          "Merkez arşive şu anda ulaşılamıyor. Bağlantıyı kontrol edip yeniden deneyin."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.page}>
      <div style={styles.shell}>
        <header style={styles.header}>
          <span style={styles.eyebrow}>YKOS · MERKEZ ARŞİV BAĞLANTISI</span>
          <h1 style={styles.title}>Okuma ve Analiz Motoru</h1>
          <p style={styles.lead}>
            Aramayı ykos.com.tr merkez arşivinde yapın. Sonuçlar arşivden
            geldiği biçimde gösterilir; kanıt ve kaynak bulunmayan kayıtlar
            için benzerlik puanı veya tarihsel sonuç üretilmez.
          </p>
        </header>

        <form onSubmit={runSearch} style={styles.searchForm}>
          <label htmlFor="archive-query" style={styles.label}>
            Kök, hece, dil, damga veya arşiv başlığı
          </label>
          <div style={styles.searchRow}>
            <input
              id="archive-query"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Örn. Hattice, kök-hece, Anadolu dil testleri"
              style={styles.input}
              minLength={2}
            />
            <button type="submit" disabled={loading} style={styles.button}>
              {loading ? "Arşiv aranıyor…" : "Merkez arşivde ara"}
            </button>
          </div>
          <p style={styles.hint}>
            Arama, merkez arşivin canlı arama uç noktasına gönderilir. Yerel
            örnek kayıtlar veya önceki arşiv sentezleri kullanılmaz.
          </p>
        </form>

        <section style={styles.method}>
          <h2 style={styles.sectionTitle}>İnceleme ölçütleri</h2>
          <div style={styles.steps}>
            {[
              "Kaynak ve kayıt tarihi",
              "Damga ve biçim",
              "Kök/hece yapısı",
              "Ses ve anlam karşılaştırması",
              "Yapı ve biçimbilim",
              "Tarih ve coğrafya",
              "Eksikler ve karşı örnekler",
              "Sürüm ve yeniden inceleme"
            ].map((step, index) => (
              <div key={step} style={styles.step}>
                <span style={styles.stepNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                {step}
              </div>
            ))}
          </div>
        </section>

        <section aria-live="polite" style={styles.results}>
          <div style={styles.resultsHeading}>
            <h2 style={styles.sectionTitle}>Merkez arşiv kayıtları</h2>
            {searched && !loading && !error && (
              <span style={styles.count}>{records.length} kayıt</span>
            )}
          </div>
          {loading && <p style={styles.notice}>Merkez arşiv sorgulanıyor…</p>}
          {!loading && error && (
            <p role="status" style={styles.notice}>{error}</p>
          )}
          {!loading && !searched && (
            <p style={styles.notice}>
              Arama başlatıldığında eşleşen arşiv kayıtları burada listelenir.
            </p>
          )}
          {!loading && records.length > 0 && (
            <div style={styles.recordList}>
              {records.map((record, index) => (
                <ArchiveRecord
                  key={record.id || record.slug || record.url || index}
                  record={record}
                  index={index}
                />
              ))}
            </div>
          )}
          {searched && !loading && !error && (
            <p style={styles.disclaimer}>
              Bu liste merkez arşiv arama eşleşmeleridir. Bir eşleşme tek başına
              yöntemsel doğrulama veya aday veri kümesinin tamamlandığı anlamına gelmez.
            </p>
          )}
        </section>

        <footer style={styles.footer}>
          <span>Veri kaynağı: ykos.com.tr</span>
          <a href="https://www.ykos.com.tr/" target="_blank" rel="noreferrer" style={styles.link}>
            Merkez arşivi aç ↗
          </a>
        </footer>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "28px 18px 64px",
    background: "#030712",
    color: "#f8fafc"
  },
  shell: { width: "min(100%, 1060px)", margin: "0 auto" },
  header: {
    padding: "32px",
    border: "1px solid #806414",
    borderRadius: 16,
    background: "linear-gradient(135deg, #0b1020 0%, #090b12 100%)"
  },
  eyebrow: {
    color: "#fbbf24",
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: "0.12em"
  },
  title: { fontSize: "clamp(28px, 5vw, 42px)", margin: "12px 0" },
  lead: { color: "#cbd5e1", maxWidth: 780, lineHeight: 1.7, margin: 0 },
  searchForm: {
    marginTop: 18,
    padding: 24,
    border: "1px solid #334155",
    borderRadius: 14,
    background: "#0b1020"
  },
  label: { display: "block", marginBottom: 10, fontWeight: 700 },
  searchRow: { display: "flex", gap: 10, flexWrap: "wrap" },
  input: {
    flex: "1 1 320px",
    minWidth: 0,
    padding: "13px 14px",
    border: "1px solid #475569",
    borderRadius: 8,
    background: "#050914",
    color: "#fff",
    fontSize: 16
  },
  button: {
    padding: "13px 18px",
    border: "1px solid #fbbf24",
    borderRadius: 8,
    background: "#fbbf24",
    color: "#111827",
    fontWeight: 800,
    cursor: "pointer"
  },
  hint: { color: "#94a3b8", fontSize: 13, marginBottom: 0, lineHeight: 1.6 },
  method: {
    marginTop: 18,
    padding: 24,
    border: "1px solid #164e63",
    borderRadius: 14,
    background: "#08111d"
  },
  sectionTitle: { margin: 0, fontSize: 20, color: "#fbbf24" },
  steps: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
    gap: 8,
    marginTop: 18
  },
  step: {
    display: "flex",
    gap: 10,
    padding: 12,
    borderRadius: 8,
    background: "#111827",
    color: "#dbeafe",
    fontSize: 13,
    alignItems: "center"
  },
  stepNumber: { color: "#fbbf24", fontWeight: 800 },
  results: {
    marginTop: 18,
    padding: 24,
    border: "1px solid #334155",
    borderRadius: 14,
    background: "#080d18"
  },
  resultsHeading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap"
  },
  count: { color: "#67e8f9", fontWeight: 700 },
  notice: {
    padding: 16,
    borderRadius: 8,
    background: "#111827",
    color: "#cbd5e1",
    lineHeight: 1.6
  },
  recordList: { display: "grid", gap: 12, marginTop: 16 },
  record: {
    padding: 18,
    border: "1px solid #334155",
    borderRadius: 10,
    background: "#0b1220"
  },
  recordTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    flexWrap: "wrap"
  },
  recordTitle: { margin: "8px 0", fontSize: 18, lineHeight: 1.4 },
  tag: {
    display: "inline-block",
    padding: "4px 8px",
    borderRadius: 999,
    background: "#164e63",
    color: "#a5f3fc",
    fontSize: 12
  },
  date: { color: "#94a3b8", fontSize: 12 },
  excerpt: {
    color: "#cbd5e1",
    lineHeight: 1.65,
    whiteSpace: "pre-wrap",
    overflowWrap: "anywhere"
  },
  muted: { color: "#94a3b8" },
  recordFoot: {
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    flexWrap: "wrap",
    borderTop: "1px solid #263244",
    paddingTop: 12,
    marginTop: 12
  },
  source: { color: "#94a3b8", fontSize: 12 },
  link: { color: "#67e8f9", fontWeight: 700, textDecoration: "none" },
  disclaimer: { color: "#94a3b8", fontSize: 13, lineHeight: 1.6 },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
    padding: "18px 4px",
    color: "#94a3b8",
    fontSize: 13
  }
};
