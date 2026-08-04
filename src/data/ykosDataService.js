// YKOS 1000 Master Arşiv & JSON Veri Bağlantı Servisi

// Varsayılan / Fallback Çözümlemeler ve Arşiv Katmanları
export const defaultArchiveArticles = [
  {
    id: 1,
    title: "Çatalhöyük Kök Hece ve Damga Sembolizmi",
    summary: "Çatalhöyük duvar resimlerindeki YKOS 100 eşleşmeleri.",
    category: "Anadolu Atlası",
    coherence: "%99.1",
    content: "Çatalhöyük M.Ö. 7400 katmanlarında çıkarılan pişmiş toprak dairesel mühürler ve duvar resimleri, YKOS 100 veri tabanındaki 'ÇEV' ve 'BA' kök heceleriyle birebir uyum gösterir."
  },
  {
    id: 2,
    title: "Göbeklitepe T-Sütunu YKOS Okuması",
    summary: "Şanlıurfa Göbeklitepe T-Sütunları üzerindeki semboller.",
    category: "Sıfır Noktası",
    coherence: "%99.7",
    content: "Göbeklitepe T-sütunları üzerinde belirgin biçimde işlenmiş 'H' ve 'C' piktogramları; ER-İK-AN ve KÖK-SU kavramsal kurgusunu ifade eden dikey ve yatay aks heceleridir."
  },
  {
    id: 3,
    title: "Etrüsk Lemnos Kitabesi & Ön Türkçe Eşleşmesi",
    summary: "Lemnos mezar taşındaki alfabetik dizilimin okuması.",
    category: "Dünya Bağlantıları (YKOS 300)",
    coherence: "%98.8",
    content: "Lemnos mezar steli üzerindeki alfabetik dizilim, Batı Akdeniz'e taşınan Anadolu Ön-Türkçe kök ekleri vasıtasıyla deşifre edilmiştir."
  },
  {
    id: 4,
    title: "YOL Kök Hecesi ve Akış Teorisi",
    summary: "'Rulo değil yol' mantığının dilbilimsel matrisi.",
    category: "Temel Matrisler (YKOS 100)",
    coherence: "%99.4",
    content: "Anadolu merkezli YKOS M5 Kök Hece Matrisi uyarınca; 'Y-O-L' kök hecesinin dildeki yalnız bir isim değil, zamansal ve fonetik bir akış aksı olduğu doğrulanmıştır."
  }
];

// JSON Arşiv Dosyalarından Dinamik Veri Yükleyici
export async function loadArchiveData() {
  try {
    // Projenizdeki local JSON veri yollarını kontrol eder
    const response = await fetch('/data/matrixData.json');
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.warn("Local JSON verisi bulunamadı, fallback arşiv katmanı kullanılıyor:", error);
  }
  return { articles: defaultArchiveArticles };
}
