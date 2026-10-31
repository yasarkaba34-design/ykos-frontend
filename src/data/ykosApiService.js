import { getArchiveSynthesis } from "./ykosArchiveSynthesis";

// 1. Canlı JSON Matris Verisini Çeken Servis (ykos_core)
export async function fetchYkosCoreMatrix() {
  try {
    const response = await fetch("https://www.ykos.com.tr/api/ykos-core", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
      const data = await response.json();
      return data.ykos_core || data;
    }
  } catch (error) {
    console.log("Canlı JSON matrisi yüklenemedi, yerel dinamik katman kullanılıyor.");
  }
  return null;
}

// 2. Arama Motoru ve Canlı API Servisi (Tek Tanım)
export async function searchYkosApi(query) {
  if (!query || query.trim().length < 2) return null;

  try {
    const response = await fetch(`https://www.ykos.com.tr/api/search?q=${encodeURIComponent(query)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log("Dış API yanıt vermedi, YKOS 1000 Yerel Külliyat Katmanı devreye girdi.");
  }

  // API Bağlantısı olmadığında yerel 11 Ciltlik Külliyat verisinden sentez üretir
  return getArchiveSynthesis(query);
}

/**
 * Search the central YKOS archive without substituting local/demo content.
 * The engine uses this function so offline or malformed responses stay visible
 * as an unavailable state instead of being presented as archive findings.
 */
export async function searchCentralArchive(query) {
  const cleanQuery = String(query || "").trim();
  if (cleanQuery.length < 2) return { records: [], total: 0 };

  const response = await fetch(
    `https://www.ykos.com.tr/api/search?q=${encodeURIComponent(cleanQuery)}`,
    { method: "GET", headers: { Accept: "application/json" } }
  );
  if (!response.ok) {
    throw new Error(`Merkez arşiv yanıt vermedi (HTTP ${response.status}).`);
  }

  const payload = await response.json();
  const records = extractArchiveRecords(payload);
  return {
    records,
    total: Number.isFinite(payload?.total) ? payload.total : records.length,
    raw: payload
  };
}

function extractArchiveRecords(payload) {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== "object") return [];

  for (const key of ["results", "items", "posts", "records", "matches"]) {
    if (Array.isArray(payload[key])) return payload[key];
  }
  for (const key of ["data", "result", "response"]) {
    const nested = payload[key];
    if (Array.isArray(nested)) return nested;
    if (nested && typeof nested === "object") {
      const found = extractArchiveRecords(nested);
      if (found.length) return found;
    }
  }
  if (payload.title || payload.baslik || payload.name) return [payload];
  return [];
}

export default {
  fetchYkosCoreMatrix,
  searchYkosApi,
  searchCentralArchive
};