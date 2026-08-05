// YKOS AKADEMİK ARŞİV VERİ SERVİSİ

export const defaultArchiveArticles = [
  {
    id: 1,
    title: "Çatalhöyük Kök Hece ve Damga Sembolizmi",
    summary: "Çatalhöyük duvar resimlerindeki YKOS 100 eşleşmeleri ve Neolitik mühür deşifresi.",
    content: "Çatalhöyük katmanlarında çıkarılan dairesel pişmiş toprak mühürler, yerleşik yaşamın mülkiyet kodlarını ve kozmik döngüyü ifade etmektedir. YKOS M5 algoritmasına göre 'ÇEV' ve 'BA' kök heceleri %99.8 tutarlılıkla eşleşmektedir."
  },
  {
    id: 2,
    title: "Göbeklitepe T-Sütunu YKOS Okuması",
    summary: "Şanlıurfa Göbeklitepe T-Sütunları üzerindeki semboller ve 'H' piktogramı deşifresi.",
    content: "Göbeklitepe T-sütunlarındaki 'H' motifi dikey varlık aksı ile yatay bağın birlikteliğini, 'C' simgesi ise aydönümü ve döngüsel hafızayı kodlar. Bu yapı dikey-yatay simetri analiziyle çözümlenmiştir."
  },
  {
    id: 3,
    title: "Etrüsk Lemnos Kitabesi & Ön-Türkçe Eşleşmesi",
    summary: "Lemnos mezar taşındaki alfabetik dizilimin YKOS kök hece yöntemiyle okuması.",
    content: "Lemnos steli üzerindeki alfabetik metin, Ön-Türkçe kök ekleri vasıtasıyla çözümlenmiş; Anadolu'dan Etruria hattına uzanan Akdeniz dilsel sürekliliğini doğrulamıştır."
  },
  {
    id: 4,
    title: "YOL Kök Hecesi ve Akış Teorisi",
    summary: "'Rulo değil yol' mantığının dilbilimsel matrisi ve Avrasya yayılımı.",
    content: "YKOS sisteminin temelini oluşturan 'Rulo değil yol' mantığı, dil ve kültür akışının statik arşivler yerine canlı vektörel hatlar üzerinden okunması gerektiğini kanıtlar."
  }
];

export async function loadArchiveData() {
  try {
    // İleride dış servisten veri çekmek gerekirse burası kullanılır
    return { articles: defaultArchiveArticles };
  } catch (error) {
    console.log("Yerel arşiv verisi yüklendi.");
    return { articles: defaultArchiveArticles };
  }
}

export default {
  defaultArchiveArticles,
  loadArchiveData
};