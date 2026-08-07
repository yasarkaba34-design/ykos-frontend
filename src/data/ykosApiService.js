// YKOS.COM.TR MİRAN / CANLI API GEÇİŞ SERVİSİ

const API_BASE_URL = "https://ykos.com.tr/api"; 

export async function searchYkosApi(query) {
  if (!query || query.trim().length < 2) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`API Yanıt Hatası: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.warn("ykos.com.tr API erişimi henüz aktif değil, yerel veritabanı kullanılıyor:", error);
    return null;
  }
}
import { getArchiveSynthesis } from "./ykosArchiveSynthesis";

// Canlı JSON verilerini çeken ana fonksiyon
export async function fetchYkosCoreMatrix() {
  try {
    const response = await fetch("https://www.ykos.com.tr/api/ykos-core", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
      const data = await response.json();
      // ykos_core altındaki nodes ve links yapılarını döndürür
      return data.ykos_core || data;
    }
  } catch (error) {
    console.log("Canlı JSON matrisi yüklenemedi, yerel dinamik katman kullanılıyor.");
  }
  return null;
}

// Arama motoru servisi
export async function searchYkosApi(query) {
  if (!query || query.trim().length < 2) return null;

  try {
    const response = await fetch(`https://www.ykos.com.tr/api/search?q=${encodeURIComponent(query)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log("Dış API yanıt vermedi, YKOS 1000 Yerel Külliyat Katmanı devreye girdi.");
  }

  return getArchiveSynthesis(query);
}