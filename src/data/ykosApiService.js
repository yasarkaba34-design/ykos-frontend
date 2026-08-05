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
