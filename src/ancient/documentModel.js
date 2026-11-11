import { getAncientLanguage, WRITING_SYSTEMS } from "./registry.js";

const asText = (value) => String(value ?? "").trim();

/**
 * Shared document shape used by the UI, API and future corpus importers.
 * Images are referenced by storage metadata; binary image content is never
 * embedded in the linguistic record.
 */
export function createAncientDocumentRecord(input = {}) {
  const language = getAncientLanguage(input.languageId);
  const scriptId = asText(input.scriptId);
  const id = globalThis.crypto?.randomUUID?.()
    ?? `ykos-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  return {
    schemaVersion: "ykos-ancient-document/1.0",
    id,
    status: "draft",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    neutrality: {
      originAssumed: false,
      directionAssumed: false,
      relationshipClaimed: false
    },
    artifact: {
      title: asText(input.title),
      languageId: language?.id ?? asText(input.languageId),
      languageName: language?.name ?? asText(input.languageId),
      scriptId,
      scriptName: WRITING_SYSTEMS[scriptId] ?? "Diğer / henüz sınıflandırılmadı",
      periodText: asText(input.periodText),
      site: asText(input.site),
      region: asText(input.region),
      catalogId: asText(input.catalogId),
      image: input.image
        ? {
            fileName: asText(input.image.fileName),
            mimeType: asText(input.image.mimeType),
            size: Number(input.image.size) || 0,
            storageRef: asText(input.image.storageRef)
          }
        : null
    },
    witnesses: [{
      id: `${id}-w1`,
      kind: "transliteration",
      scriptText: asText(input.scriptText),
      transliteration: asText(input.transliteration),
      sourceLanguage: asText(input.sourceLanguage) || "und",
      enteredBy: "user",
      reviewStatus: "unreviewed"
    }],
    translations: asText(input.translation)
      ? [{
          languageCode: asText(input.translationLanguage) || "tr",
          text: asText(input.translation),
          sourceTitle: asText(input.translationSourceTitle),
          sourceUrl: asText(input.translationSourceUrl),
          status: asText(input.translationSourceTitle) || asText(input.translationSourceUrl)
            ? "source-cited"
            : "user-provided-unverified"
        }]
      : [],
    citations: [
      {
        kind: "artifact-catalog",
        title: asText(input.catalogSourceTitle),
        url: asText(input.catalogSourceUrl),
        accessedAt: new Date().toISOString()
      },
      {
        kind: "edition-or-publication",
        title: asText(input.editionTitle),
        url: asText(input.editionUrl),
        accessedAt: new Date().toISOString()
      }
    ].filter((citation) => citation.title || citation.url),
    analysis: {
      method: "ykos-root-syllable-comparison",
      status: "not-run",
      segments: [],
      candidates: [],
      reviewStatus: "not-reviewed"
    }
  };
}

export function validateAncientDocumentRecord(record) {
  const errors = [];
  if (!record || typeof record !== "object") {
    return { valid: false, errors: ["Belge kaydı bir nesne olmalıdır."] };
  }
  if (record.schemaVersion !== "ykos-ancient-document/1.0") {
    errors.push("Desteklenmeyen belge şeması.");
  }
  if (!record.artifact?.languageId) errors.push("Belge dili belirtilmelidir.");
  if (!record.artifact?.scriptId) errors.push("Yazı sistemi belirtilmelidir.");
  if (!record.witnesses?.some((witness) => witness.transliteration || witness.scriptText)) {
    errors.push("Özgün yazı veya çevriyazı girilmelidir.");
  }
  if (!record.neutrality || record.neutrality.originAssumed !== false) {
    errors.push("Kaynak veya aktarım yönü varsayılmamalıdır.");
  }
  return { valid: errors.length === 0, errors };
}
