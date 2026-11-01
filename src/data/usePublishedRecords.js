import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

export function normalizeRecord(record, id = record.id) {
  return { ...record, id,
    title: record.title || record.baslik || "",
    summary: record.summary || record.kisaOzet || record.ozet || "",
    content: record.content || record.kapsamliAnaliz || record.icerik || "",
    category: record.category || record.icerikTuru || record.kategori || "",
    image: record.image || record.kapakGorseli || record.mansetGorsel || "",
    gallery: record.gallery || record.galeriGorselleri || record.galeri || [],
    videoUrl: record.videoUrl || record.video || record.videoBaglantisi || "",
    date: record.date || record.tarih || ""
  };
}
export function isPublished(record) {
  if (["pending", "draft", "rejected"].includes(record.status) ||
      ["beklemede", "taslak", "reddedildi"].includes(record.durum)) return false;
  return ["published", "approved"].includes(record.status) || record.durum === "onaylandi";
}
export function usePublishedRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => onSnapshot(collection(db, "ykos-bulgular"), snapshot => {
    setRecords(snapshot.docs.map(item => normalizeRecord(item.data(), item.id))
      .filter(isPublished).sort((a, b) => (b.updatedAt || "").localeCompare(a.updatedAt || "") || String(b.id).localeCompare(String(a.id))));
    setLoading(false); setError("");
  }, err => {
    console.error("Arşiv yüklenemedi", err);
    setError("Yayımlanan içerikler yüklenemedi. İnternet bağlantınızı kontrol edip sayfayı yenileyin.");
    setLoading(false);
  }), []);
  return { records, loading, error };
}
