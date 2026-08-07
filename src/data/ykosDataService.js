// YKOS Yerel Arşiv ve Külliyat Veri Servisi

export const defaultArchiveArticles = [
  {
    id: 1,
    title: "Çatalhöyük Kök Hece ve Damga Sembolizmi",
    summary: "Çatalhöyük duvar resimlerindeki YKOS 100 eşleşmeleri ve dairesel mühürlerin analizi.",
    content: "Çatalhöyük Neolitik yerleşiminde yer alan mühürler ve duvar sembolleri, 'ÇEV' ve 'BA' kök hecelerinin form-bağlam-anlam eksenindeki ilk mülkiyet matrisini oluşturur."
  },
  {
    id: 2,
    title: "Göbeklitepe T-Sütunu YKOS Okuması",
    summary: "Şanlıurfa Göbeklitepe 1-Sütunları üzerindeki sembollerin dikey varlık ve yatay bağ analizi.",
    content: "M.Ö. 9600 tarihli T-sütunları üzerindeki kabartmalar, evrensel dikey eksen ile yatay bağ sembolizminin deşifresinde birincil anahtardır."
  },
  {
    id: 3,
    title: "Etrüsk Lemnos Kitabesi & Ön Türkçe Eşleşmesi",
    summary: "Lemnos mezar taşındaki alfabetik dizilimin YKOS Kök Hece Matrisi ile okunması.",
    content: "Lemnos steli üzerindeki yazıtların kök ses analizleri, Akdeniz havzasındaki Ön-Türkçe fonetik sürekliliğini net bir şekilde kanıtlamaktadır."
  },
  {
    id: 4,
    title: "YOL Kök Hecesi ve Akış Teorisi",
    summary: "'Rulo değil yol' mantığının dilbilimsel ve algoritmik matrisi.",
    content: "Kültürel hafıza statik bir arşiv değil; yaşayan, kök heceler vasıtasıyla günümüze taşınan dinamik bir yol ve akış sistemidir."
  }
];

export async function loadArchiveData() {
  try {
    return {
      articles: defaultArchiveArticles
    };
  } catch (error) {
    console.log("Arşiv verileri yüklenemedi, varsayılan katman kullanılıyor.");
    return { articles: defaultArchiveArticles };
  }
}

export default {
  defaultArchiveArticles,
  loadArchiveData
};
