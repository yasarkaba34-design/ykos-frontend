// Expandable catalog for ancient-language document work.
// Corpus/OCR availability is explicit so an unconfigured language is never
// presented as analyzed or deciphered.
export const ANCIENT_LANGUAGES = [
  { id: "sux", name: "Sümerce", region: "Mezopotamya", scripts: ["cuneiform"], corpusStatus: "unconfigured" },
  { id: "akk", name: "Akkadca", region: "Mezopotamya", scripts: ["cuneiform"], corpusStatus: "unconfigured" },
  { id: "hit", name: "Hititçe", region: "Anadolu", scripts: ["cuneiform"], corpusStatus: "unconfigured" },
  { id: "xlu", name: "Luvice", region: "Anadolu", scripts: ["anatolian-hieroglyphs", "cuneiform"], corpusStatus: "unconfigured" },
  { id: "hat", name: "Hattice", region: "Anadolu", scripts: ["cuneiform"], corpusStatus: "unconfigured" },
  { id: "xhu", name: "Hurrice", region: "Mezopotamya / Anadolu", scripts: ["cuneiform"], corpusStatus: "unconfigured" },
  { id: "xur", name: "Urartuca", region: "Doğu Anadolu", scripts: ["cuneiform"], corpusStatus: "unconfigured" },
  { id: "peo", name: "Eski Farsça", region: "İran", scripts: ["old-persian-cuneiform"], corpusStatus: "unconfigured" },
  { id: "phn", name: "Fenikece", region: "Doğu Akdeniz", scripts: ["phoenician"], corpusStatus: "unconfigured" },
  { id: "arc", name: "Aramice", region: "Doğu Akdeniz / Mezopotamya", scripts: ["aramaic"], corpusStatus: "unconfigured" },
  { id: "grc", name: "Eski Yunanca", region: "Akdeniz", scripts: ["greek"], corpusStatus: "unconfigured" },
  { id: "xpg", name: "Frigce", region: "Anadolu", scripts: ["greek", "phrygian"], corpusStatus: "unconfigured" },
  { id: "xli", name: "Likçe", region: "Anadolu", scripts: ["lycian", "greek"], corpusStatus: "unconfigured" },
  { id: "xlc", name: "Lidce", region: "Anadolu", scripts: ["lydian"], corpusStatus: "unconfigured" },
  { id: "xcr", name: "Karyaca", region: "Anadolu", scripts: ["carian", "greek"], corpusStatus: "unconfigured" },
  { id: "ett", name: "Etrüskçe", region: "İtalya", scripts: ["etruscan"], corpusStatus: "unconfigured" },
  { id: "lat", name: "Latince", region: "Akdeniz", scripts: ["latin"], corpusStatus: "unconfigured" },
  { id: "egy", name: "Eski Mısırca", region: "Kuzey Afrika", scripts: ["egyptian-hieroglyphs", "hieratic", "demotic"], corpusStatus: "unconfigured" },
  { id: "otk", name: "Eski Türkçe", region: "Orta Asya", scripts: ["old-turkic"], corpusStatus: "unconfigured" },
  { id: "other", name: "Diğer antik dil", region: "Belirtilmemiş", scripts: ["other"], corpusStatus: "unconfigured" }
];

export const WRITING_SYSTEMS = {
  cuneiform: "Çivi yazısı",
  "anatolian-hieroglyphs": "Anadolu hiyeroglifleri",
  "old-persian-cuneiform": "Eski Fars çivi yazısı",
  phoenician: "Fenike alfabesi",
  aramaic: "Arami yazısı",
  greek: "Yunan alfabesi",
  phrygian: "Frig yazısı",
  lycian: "Likya yazısı",
  lydian: "Lidya yazısı",
  carian: "Karya yazısı",
  etruscan: "Etrüsk alfabesi",
  latin: "Latin alfabesi",
  "egyptian-hieroglyphs": "Mısır hiyeroglifleri",
  hieratic: "Hiyeratik",
  demotic: "Demotik",
  "old-turkic": "Eski Türk yazısı",
  other: "Diğer / henüz sınıflandırılmadı"
};

export const CORPUS_LANGUAGES = [
  { code: "tr", name: "Türkçe" },
  { code: "en", name: "İngilizce" },
  { code: "de", name: "Almanca" },
  { code: "fr", name: "Fransızca" },
  { code: "it", name: "İtalyanca" },
  { code: "es", name: "İspanyolca" },
  { code: "ar", name: "Arapça" },
  { code: "other", name: "Diğer" }
];

export function getAncientLanguage(languageId) {
  return ANCIENT_LANGUAGES.find((language) => language.id === languageId) ?? null;
}
