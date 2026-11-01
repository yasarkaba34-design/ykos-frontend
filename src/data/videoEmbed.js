export function getEmbedUrl(value) {
  try {
    const url = new URL(value);
    if (!["https:", "http:"].includes(url.protocol)) return null;
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    let id = "";
    if (host === "youtu.be") id = url.pathname.split("/")[1];
    if (["youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(host)) {
      id = url.searchParams.get("v") || "";
      const parts = url.pathname.split("/");
      if (["embed", "shorts", "live", "v"].includes(parts[1])) id = parts[2];
    }
    if (/^[\w-]{11}$/.test(id || "")) return `https://www.youtube-nocookie.com/embed/${id}`;
    return null;
  } catch { return null; }
}
