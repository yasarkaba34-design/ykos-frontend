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
  const cleanQuery = String(query || "").trim();
  if (cleanQuery.length < 2) {
    return { source: "none", data: null, error: null };
  }

  try {
    const response = await fetch(
      `https://www.ykos.com.tr/api/search?q=${encodeURIComponent(cleanQuery)}`,
      {
        method: "GET",
        headers: { Accept: "application/json" }
      }
    );

    if (!response.ok) {
      throw new Error(`Merkez arşiv yanıt vermedi (HTTP ${response.status}).`);
    }

    return {
      source: "central-archive",
      data: await response.json(),
      error: null
    };
  } catch (error) {
    console.warn("Merkez arşiv erişilemedi; yerel sentez gösteriliyor.", error);
    return {
      source: "local-synthesis",
      data: getArchiveSynthesis(cleanQuery),
      error: error?.message || "Merkez arşive ulaşılamadı."
    };
  }
}


export default {
  fetchYkosCoreMatrix,
  searchYkosApi
};