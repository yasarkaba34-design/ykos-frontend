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

// 2. Canlı ykos.com.tr RSS Akış Servisi
export async function fetchRssData() {
  try {
    const response = await fetch("https://www.ykos.com.tr/rss");
    if (!response.ok) return [];
    const text = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "application/xml");
    const items = Array.from(xml.querySelectorAll("item")).map(item => ({
      title: item.querySelector("title")?.textContent,
      link: item.querySelector("link")?.textContent,
      pubDate: item.querySelector("pubDate")?.textContent,
      description: item.querySelector("description")?.textContent
    }));
    return items;
  } catch (error) {
    console.log("RSS akışı şu an ulaşılamaz, yerel verilerle devam ediliyor.");
    return [];
  }
}

// 3. Arama Motoru ve Canlı API Servisi
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

  return getArchiveSynthesis(query);
}

export default {
  fetchYkosCoreMatrix,
  fetchRssData,
  searchYkosApi
};