// YKOS 1000 MASTER ARŞİV VE 11 CİLTLİK KÜLLİYAT DİNAMİK SERVİSİ

export const defaultArchiveArticles = [
  {
    id: 1,
    title: "Türkçenin Sıfır Noktası: YKOS Yapısal Okuma Modeli (Seri 4 - Cilt 4)",
    summary: "Form, bağlam ve anlam ekseninde dilin minimum birimden üretkenliğe uzanan 7 temel ilkesi ve TKOS entegrasyonu.",
    content: "YKOS (Yaşar Kaba Okuma Sistemi), dili köken tartışmaları üzerinden değil; form, bağlam ve anlam arasındaki yapısal ilişki üzerinden okuyan disiplinler arası bir okuma modelidir. Minimum birim analizi, morfolojik genişleme ve gramer omurgası testleriyle dildeki yapısal sürekliliği ölçer.",
    coherence: "%99.9",
    volume: "Seri 4 - Cilt 4",
    isbn: "978-625-93505-5-4"
  },
  {
    id: 2,
    title: "Çatalhöyük Kök Hece ve Damga Sembolizmi (Neolitik Katman)",
    summary: "Çatalhöyük dairesel mühürlerinde YKOS 100 'ÇEV' ve 'BA' dairesel döngü matris deşifresi.",
    content: "Çatalhöyük Neolitik katmanlarında çıkarılan dairesel pişmiş toprak mühürler, yerleşik yaşamın ilk mülkiyet ve kozmik döngü kodlarıdır. YKOS M5 matrisi uyarınca 'ÇEV' (kuşatma/daire) ve 'BA' (bağlantı) kök heceleriyle %99.8 tam uyum gösterir.",
    coherence: "%99.8",
    volume: "Cilt 1: Anadolu Refugium",
    isbn: "978-625-93505-1-1"
  },
  {
    id: 3,
    title: "Göbeklitepe T-Sütunu H-C Piktogram Okuması (Epipaleolitik)",
    summary: "Göbeklitepe T-sütunlarındaki H ve C piktogramlarının dikey/yatay aks ikiliği ve yer-gök bağ deşifresi.",
    content: "Göbeklitepe dikili taşları üzerindeki 'H' sembolü dikey varlık aksı ile yatay bağın birleşimini, 'C' simgesi ise aydönümü ve döngüsel hafızayı kodlar. Türkçe eklemeli mantığın ilk görsel yazılım mühürleridir.",
    coherence: "%99.7",
    volume: "Cilt 2: Göbeklitepe & Grafik Algoritma",
    isbn: "978-625-93505-2-2"
  },
  {
    id: 4,
    title: "Etrüsk Lemnos Kitabesi & Ön-Türkçe Eşleşmesi (Akdeniz Aksı)",
    summary: "Lemnos mezar steli üzerindeki alfabetik dizilimin Etrüskçe ve Türkçe kök ekleriyle deşifresi.",
    content: "Lemnos adasında bulunan stel üzerindeki alfabetik metin, Etrüsk dili ve Ön-Türkçe kök ekleri vasıtasıyla çözümlenmiş; Anadolu'dan Akdeniz ve İtalya'ya uzanan YOL aksının dilsel sürekliliğini kanıtlamıştır.",
    coherence: "%98.9",
    volume: "Cilt 5-6: Etrüsk & Akdeniz Göçleri",
    isbn: "978-625-93505-3-3"
  },
  {
    id: 5,
    title: "TKOS - Türkçe Kök Organizasyon Sistemi ve Yapısal Motor",
    summary: "Kökler arası ağ, 7'li test seti ve Türkçe morfoloji motorunun türetim algoritmaları.",
    content: "TKOS, minimum birim düzeyindeki çekirdek kök setinin (YOL, BİR, KÖK, ER, ÇEV, BA) fiil, isim ve sıfat türetme gücünü ölçer. Üretkenlik kırılmadığı sürece dilsel süreklilik bilimsel olarak kanıtlanmış olur.",
    coherence: "%99.6",
    volume: "Seri 4 - Cilt 4",
    isbn: "978-625-93505-5-4"
  }
];

export async function loadArchiveData() {
  try {
    // Gelecekte data/ klasöründeki JSON verileri dinamik çekilir
    return {
      articles: defaultArchiveArticles,
      totalStamps: 9870,
      totalPetroglyphs: 18420,
      status: "SUCCESS"
    };
  } catch (error) {
    console.error("YKOS Veri Yükleme Hatası:", error);
    return { articles: defaultArchiveArticles };
  }
}
