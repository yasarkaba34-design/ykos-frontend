import React, { useEffect, useState } from "react";
import { ANCIENT_LANGUAGES, WRITING_SYSTEMS, getAncientLanguage } from "../ancient/registry.js";
import { createAncientDocumentRecord, validateAncientDocumentRecord } from "../ancient/documentModel.js";
import { compareWitnessTokens, tokenizeWitness } from "../ancient/witnessAnalysis.js";
import { OCR_CAPABILITY } from "../ancient/ocrProvider.js";

const fieldStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "11px 12px",
  border: "1px solid #475569",
  borderRadius: 7,
  background: "#0b1220",
  color: "#f8fafc",
  font: "inherit"
};
const labelStyle = { display: "block", margin: "14px 0 6px", color: "#e2e8f0", fontWeight: 600 };
const smallStyle = { color: "#94a3b8", fontSize: 13, lineHeight: 1.5 };

export default function AncientTextWorkbench({ onBack = () => {} }) {
  const [languageId, setLanguageId] = useState("sux");
  const [scriptId, setScriptId] = useState("cuneiform");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [draft, setDraft] = useState(null);
  const [notice, setNotice] = useState("");

  const language = getAncientLanguage(languageId);
  const supportedScripts = language?.scripts ?? ["other"];

  useEffect(() => {
    if (!image) {
      setPreviewUrl("");
      return undefined;
    }
    const url = URL.createObjectURL(image);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  const updateLanguage = (nextId) => {
    const nextLanguage = getAncientLanguage(nextId);
    setLanguageId(nextId);
    setScriptId(nextLanguage?.scripts?.[0] ?? "other");
    setDraft(null);
  };

  const handleAnalyze = (event) => {
    event.preventDefault();
    setNotice("");

    const form = new FormData(event.currentTarget);
    const record = createAncientDocumentRecord({
      title: form.get("title"),
      languageId,
      scriptId,
      periodText: form.get("periodText"),
      site: form.get("site"),
      region: form.get("region"),
      catalogId: form.get("catalogId"),
      scriptText: form.get("scriptText"),
      transliteration: form.get("transliteration"),
      translation: form.get("translation"),
      translationLanguage: form.get("translationLanguage"),
      translationSourceTitle: form.get("translationSourceTitle"),
      translationSourceUrl: form.get("translationSourceUrl"),
      catalogSourceTitle: form.get("catalogSourceTitle"),
      catalogSourceUrl: form.get("catalogSourceUrl"),
      editionTitle: form.get("editionTitle"),
      editionUrl: form.get("editionUrl"),
      image: image
        ? { fileName: image.name, mimeType: image.type, size: image.size }
        : null
    });

    const validation = validateAncientDocumentRecord(record);
    if (!validation.valid) {
      setNotice(validation.errors.join(" "));
      setDraft(null);
      return;
    }

    const witnessText = record.witnesses[0].transliteration || record.witnesses[0].scriptText;
    const tokenized = tokenizeWitness(witnessText);
    const comparison = compareWitnessTokens(tokenized);
    record.analysis = {
      ...record.analysis,
      status: "segmented",
      segments: comparison.tokens,
      corpusStatus: "unavailable",
      note: comparison.note
    };
    setDraft(record);
  };

  const downloadRecord = () => {
    if (!draft) return;
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ykos-antik-belge-${draft.id}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main style={{ minHeight: "100vh", padding: 20, background: "#030712", color: "#f8fafc", fontFamily: "Segoe UI, sans-serif" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <button type="button" onClick={onBack} style={{ ...fieldStyle, width: "auto", cursor: "pointer", color: "#ffd700", borderColor: "#b8860b" }}>
          ← YKOS ana sayfa
        </button>

        <header style={{ margin: "22px 0" }}>
          <p style={{ color: "#fbbf24", marginBottom: 6 }}>YKOS • ANTİK BELGE ÇALIŞMA ALANI</p>
          <h1 style={{ margin: "0 0 10px", color: "#ffd700" }}>Görselden Kaynaklı Çözümlemeye</h1>
          <p style={smallStyle}>
            Belgeyi kendi dil ve yazı sistemi içinde kaydedin. Çevriyazı, çeviri ve tarihsel kaynakları ayrı alanlarda tutun.
            Kök-hece ve diller arası değerlendirme, kaynaklı korpus bağlandıkça etkinleştirilecektir.
          </p>
        </header>

        <div role="status" style={{ padding: 14, borderRadius: 8, background: "#172033", border: "1px solid #475569", marginBottom: 18 }}>
          <strong>Görsel okuma:</strong> {OCR_CAPABILITY.message}
        </div>

        <form onSubmit={handleAnalyze} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}>
          <section style={{ padding: 18, border: "1px solid #334155", borderRadius: 10, background: "#080d18" }}>
            <h2 style={{ color: "#ffd700", marginTop: 0 }}>1. Belge ve görsel</h2>

            <label style={labelStyle} htmlFor="artifact-title">Belge / eser adı</label>
            <input id="artifact-title" name="title" style={fieldStyle} placeholder="Örn. tablet, yazıt veya katalog adı" />

            <label style={labelStyle} htmlFor="artifact-language">Dil</label>
            <select id="artifact-language" value={languageId} onChange={(event) => updateLanguage(event.target.value)} style={fieldStyle}>
              {ANCIENT_LANGUAGES.map((item) => <option key={item.id} value={item.id}>{item.name} — {item.region}</option>)}
            </select>

            <label style={labelStyle} htmlFor="artifact-script">Yazı sistemi</label>
            <select id="artifact-script" value={scriptId} onChange={(event) => { setScriptId(event.target.value); setDraft(null); }} style={fieldStyle}>
              {supportedScripts.map((id) => <option key={id} value={id}>{WRITING_SYSTEMS[id] ?? id}</option>)}
            </select>

            <label style={labelStyle} htmlFor="artifact-image">Belge görseli</label>
            <input id="artifact-image" type="file" accept="image/*" onChange={(event) => { setImage(event.target.files?.[0] ?? null); setDraft(null); }} style={{ ...fieldStyle, padding: 8 }} />
            {previewUrl && <img src={previewUrl} alt="Yüklenen antik belge önizlemesi" style={{ display: "block", width: "100%", maxHeight: 360, objectFit: "contain", marginTop: 12, background: "#020617", borderRadius: 6 }} />}

            <label style={labelStyle} htmlFor="period">Tahmini tarih / dönem</label>
            <input id="period" name="periodText" style={fieldStyle} placeholder="Kaynağa göre yazın; bilinmiyorsa boş bırakın" />

            <label style={labelStyle} htmlFor="site">Buluntu yeri ve bölge</label>
            <input id="site" name="site" style={fieldStyle} placeholder="Yerleşim, müze veya arşiv" />
            <input name="region" aria-label="Coğrafi bölge" style={{ ...fieldStyle, marginTop: 8 }} placeholder="Coğrafi bölge" />

            <label style={labelStyle} htmlFor="catalog-id">Katalog / envanter numarası</label>
            <input id="catalog-id" name="catalogId" style={fieldStyle} />
          </section>

          <section style={{ padding: 18, border: "1px solid #334155", borderRadius: 10, background: "#080d18" }}>
            <h2 style={{ color: "#ffd700", marginTop: 0 }}>2. Okuma ve yayınlanmış çeviri</h2>

            <label style={labelStyle} htmlFor="script-text">Özgün işaretler (biliniyorsa)</label>
            <textarea id="script-text" name="scriptText" rows={4} style={{ ...fieldStyle, resize: "vertical" }} placeholder="Unicode işaretleri veya yayımlanmış özgün metin" />

            <label style={labelStyle} htmlFor="transliteration">Çevriyazı / metin aktarımı</label>
            <textarea id="transliteration" name="transliteration" rows={5} style={{ ...fieldStyle, resize: "vertical" }} placeholder="Yayımlanmış çevriyazıyı girin; satır sonlarını koruyabilirsiniz" />

            <label style={labelStyle} htmlFor="translation">Mevcut çeviri</label>
            <textarea id="translation" name="translation" rows={5} style={{ ...fieldStyle, resize: "vertical" }} placeholder="Varsa, yayımlanmış çeviriyi ve belirsizlik işaretlerini koruyun" />

            <label style={labelStyle} htmlFor="translation-language">Çeviri dili</label>
            <input id="translation-language" name="translationLanguage" defaultValue="tr" style={fieldStyle} placeholder="tr, en, de…" />

            <label style={labelStyle} htmlFor="translation-source">Çeviri kaynağı / yayın</label>
            <input id="translation-source" name="translationSourceTitle" style={fieldStyle} />
            <input name="translationSourceUrl" aria-label="Çeviri kaynak bağlantısı" style={{ ...fieldStyle, marginTop: 8 }} placeholder="Kaynak bağlantısı (varsa)" />

            <label style={labelStyle} htmlFor="edition-title">Yazıt edisyonu / akademik yayın</label>
            <input id="edition-title" name="editionTitle" style={fieldStyle} />
            <input name="editionUrl" aria-label="Yayın bağlantısı" style={{ ...fieldStyle, marginTop: 8 }} placeholder="Yayın veya DOI bağlantısı" />

            <label style={labelStyle} htmlFor="catalog-source">Katalog kaynağı</label>
            <input id="catalog-source" name="catalogSourceTitle" style={fieldStyle} />
            <input name="catalogSourceUrl" aria-label="Katalog bağlantısı" style={{ ...fieldStyle, marginTop: 8 }} placeholder="Müze / katalog bağlantısı" />
          </section>

          <div style={{ gridColumn: "1 / -1" }}>
            {notice && <p role="alert" style={{ color: "#fca5a5" }}>{notice}</p>}
            <button type="submit" style={{ ...fieldStyle, width: "auto", padding: "12px 18px", background: "#ffd700", color: "#080b12", fontWeight: 800, border: 0, cursor: "pointer" }}>
              Belgeyi düzenle ve ön çözümleme kaydı oluştur
            </button>
          </div>
        </form>

        {draft && (
          <section aria-live="polite" style={{ marginTop: 24, padding: 18, border: "1px solid #b8860b", borderRadius: 10, background: "#080d18" }}>
            <h2 style={{ color: "#ffd700", marginTop: 0 }}>Ön kayıt hazır</h2>
            <p style={smallStyle}>
              {language?.name} • {WRITING_SYSTEMS[scriptId]} • {draft.analysis.segments.length} metin birimi.
              {draft.analysis.note} Kök, anlam veya tarihsel ilişki sonucu üretilmedi.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "14px 0" }}>
              {draft.analysis.segments.map((segment) => (
                <span key={segment.id} style={{ padding: "6px 9px", border: "1px solid #475569", borderRadius: 6, color: "#e2e8f0" }}>{segment.form}</span>
              ))}
            </div>
            <p style={smallStyle}>Kaynak yönü varsayılmadı. Görsel OCR ve doğrulanmış dil korpusu bağlandığında bu aynı kayıt yapısı kullanılabilir.</p>
            <button type="button" onClick={downloadRecord} style={{ ...fieldStyle, width: "auto", cursor: "pointer" }}>Kayıt JSON’unu indir</button>
          </section>
        )}
      </div>
    </main>
  );
}
