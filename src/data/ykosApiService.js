import { getArchiveSynthesis } from "./ykosArchiveSynthesis";

// 1. Merkez Arşivi Matris Verisini ve Tüm Kayıtları Çeken Gelişmiş Servis
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

// 2. Merkez Arşivi ve Tüm Alt Alanları (ykos.net / ykos.org) Tarayan Kapsamlı Arama Servisi
export async function searchYkosApi(query) {
  if (!query || query.trim().length < 2) return null;

  try {
    // Hem ana API üzerinden merkez arşivi taraması hem de ykos.net / ykos.org uç noktaları
    const response = await fetch(`https://www.ykos.com.tr/api/search?q=${encodeURIComponent(query)}&scope=all_archives`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
      const data = await response.json();
      // Eğer dış API'den arşiv sonuçları döndüyse doğrudan onları ilet
      if (data && (data.results || data.length > 0)) {
        return data;
      }
    }
  } catch (error) {
    console.log("Merkez Arşiv API bağlantısı yanıt vermedi, yerel külliyat ve sentez katmanı devreye girdi.");
  }

  // API'den doğrudan sonuç alınamadığında veya çevrimdışı durumda Merkez Arşiv Sentezi ve Yerel Katman taranır
  return getArchiveSynthesis(query);
}

export default {
  fetchYkosCoreMatrix,
  searchYkosApi
};