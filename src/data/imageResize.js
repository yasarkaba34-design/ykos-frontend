// Orijinaller tarayıcı kayıtlarında korunur. Yalnızca yayın kopyası dönüştürülür.
export async function prepareImage(source) {
  if (!source || !source.startsWith("data:image/")) return source;
  const image = await new Promise((resolve, reject) => {
    const img = new Image(); img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Görsel okunamadı.")); img.src = source;
  });
  const scale = Math.min(1, 1900 / image.naturalWidth);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Görsel işlenemedi.");
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/webp", 0.88);
}
export async function prepareRecordImages(record) {
  const result = { ...record };
  for (const key of ["image", "kapakGorseli", "mansetGorsel"])
    if (result[key]) result[key] = await prepareImage(result[key]);
  for (const key of ["gallery", "galeriGorselleri", "galeri"])
    if (Array.isArray(result[key])) result[key] = await Promise.all(result[key].map(prepareImage));
  return result;
}
