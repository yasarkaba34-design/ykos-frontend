// FILE: src/data/ykos_roots.js

export const YKOS_MODULES = {
  root1: "Atlas",
  root2: "Matris",
  root3: "Chain",
  root4: "QuantumEngine",
};

export const YKOS_ROOTS = [
  "TUT", "KUR", "BA", "YOL", "BİR", "KAL", "AL", "VER", "GEL", "GİT",
  "ÇIK", "İN", "DÖN", "KES", "AÇ", "KAP", "YAP", "BOZ", "BUL", "KAY",
  "SAY", "SEÇ", "SÖZ", "DİL", "GÖR", "DUY", "BAK", "TİN", "CAN", "SU",
  "TAŞ", "YER", "GÖK", "EL", "AY", "GÜN", "YIL", "OK", "YÜK"
];

export const YKOS_ROOT_DETAILS = {
  ANA: { meaning: "temel kök", origin: "Türkçe", type: "isim" },
  SU: { meaning: "akışkan madde", origin: "Türkçe", type: "isim" },
  GÖR: { meaning: "algılama fiili", origin: "Türkçe", type: "fiil" }
};

export default {
  YKOS_MODULES,
  YKOS_ROOTS,
  YKOS_ROOT_DETAILS,
};
