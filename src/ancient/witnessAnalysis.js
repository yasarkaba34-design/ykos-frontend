/**
 * Language-neutral first pass. It segments visible/transliterated units only;
 * it does not assign roots, meanings, phonemes or historical relationships.
 */
export function tokenizeWitness(text) {
  return String(text ?? "")
    .normalize("NFC")
    .split(/[\\s.,;:!?()[\\]{}"'“”‘’|]+/u)
    .map((form) => form.trim())
    .filter(Boolean)
    .map((form, index) => ({
      id: `segment-${index + 1}`,
      position: index + 1,
      form,
      kind: "unreviewed-token",
      rootCandidates: [],
      comparisonStatus: "not-compared"
    }));
}

/**
 * Exact orthographic lookup is allowed only against caller-supplied,
 * cited corpus records. A spelling match is a candidate, never proof of kinship.
 */
export function compareWitnessTokens(tokens, corpusRecords = []) {
  if (!Array.isArray(corpusRecords) || corpusRecords.length === 0) {
    return {
      available: false,
      note: "Karşılaştırılabilir, kaynaklandırılmış dil korpusu henüz bağlı değil.",
      tokens: tokens.map((token) => ({
        ...token,
        comparisonStatus: "corpus-unavailable"
      }))
    };
  }

  const index = new Map();
  for (const record of corpusRecords) {
    const form = String(record?.form ?? record?.root ?? "").normalize("NFC").toLocaleLowerCase();
    if (!form) continue;
    if (!index.has(form)) index.set(form, []);
    index.get(form).push(record);
  }

  return {
    available: true,
    note: "Tam yazılış eşleşmeleri yalnızca adaydır; ses, anlam ve tarihsel ilişki ayrıca incelenmelidir.",
    tokens: tokens.map((token) => {
      const matches = index.get(token.form.normalize("NFC").toLocaleLowerCase()) ?? [];
      return {
        ...token,
        rootCandidates: matches,
        comparisonStatus: matches.length ? "orthographic-candidate" : "no-exact-spelling-match"
      };
    })
  };
}
