import { getArchiveSynthesis } from "./ykosArchiveSynthesis";

export async function fetchYkosCoreMatrix() {
  try {
    const response = await fetch("https://www.ykos.com.tr/api/ykos-core", {
      method: "GET",
      headers: { Accept: "application/json" }
    });
    if (!response.ok) return null;

    const data = await response.json();
    return data?.ykos_core ?? data ?? null;
  } catch (error) {
    console.warn("Canlı JSON matrisi yüklenemedi.", error);
    return null;
  }
}

// Yanıt biçimi YKOSAnalysisEngine'in beklediği source/data/error sözleşmesini korur.
export async function searchYkosApi(query) {
  const cleanQuery = String(query || "").trim();
  if (cleanQuery.length < 2) {
    return { source: "none", data: null, error: null };
  }

  try {
    const url = new URL("https://www.ykos.com.tr/api/search");
    url.searchParams.set("q", cleanQuery);
    url.searchParams.set("scope", "all_archives");

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: { Accept: "application/json" }
    });
    if (!response.ok) {
      throw new Error(`Merkez arşiv yanıt vermedi (HTTP ${response.status}).`);
    }

    const data = await response.json();
    const message = typeof data?.message === "string" ? data.message : "";
    if (data?.success === false || data?.status === "error" || data?.error || /api hata|internal server error/i.test(message)) {
      throw new Error(message || data?.error || "Merkez arşiv API hata yanıtı verdi.");
    }

    return { source: "central-archive", data, error: null };
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
