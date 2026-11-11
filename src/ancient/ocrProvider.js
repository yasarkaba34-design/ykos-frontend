/**
 * OCR boundary for script-specific providers.
 *
 * Provider credentials and network calls belong in a server-side adapter. The
 * browser must never hold OCR vendor secrets. Until a provider is configured,
 * image reading remains manual and the UI should say so.
 */
export function createOcrProvider(adapter) {
  if (!adapter || typeof adapter.recognize !== "function") {
    throw new TypeError("OCR sağlayıcısı recognize(image, context) sunmalıdır.");
  }

  return {
    async recognize(image, context = {}) {
      if (!(image instanceof Blob)) {
        throw new TypeError("OCR için bir görsel Blob/File gereklidir.");
      }
      if (!context.scriptId) {
        throw new Error("OCR isteğinde yazı sistemi belirtilmelidir.");
      }

      const result = await adapter.recognize(image, {
        languageId: context.languageId ?? null,
        scriptId: context.scriptId
      });

      if (!result || !Array.isArray(result.lines)) {
        throw new Error("OCR sağlayıcısı satır listesi döndürmedi.");
      }

      return {
        provider: String(result.provider ?? "unknown"),
        status: "machine-suggestion",
        lines: result.lines.map((line, index) => ({
          id: line.id ?? `ocr-line-${index + 1}`,
          text: String(line.text ?? ""),
          confidence: Number.isFinite(Number(line.confidence))
            ? Number(line.confidence)
            : null,
          bounds: line.bounds ?? null,
          reviewStatus: "needs-human-review"
        }))
      };
    }
  };
}

export const OCR_CAPABILITY = Object.freeze({
  configured: false,
  status: "provider-required",
  message: "Henüz OCR sağlayıcısı bağlanmadı. Görsel yükleme ve insan tarafından çevriyazı girişi kullanılabilir."
});
