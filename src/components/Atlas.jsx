// src/components/Atlas.jsx
import React from "react";
import YKOS_API from "../ykos_api"; // 🔗 YKOS veri katmanı bağlantısı

export default function Atlas({ query = "", filter = "Hepsi" }) {
  const { geo, roots } = YKOS_API; // 🌐 Coğrafi ve kök verileri çekiyoruz

  return (
    <section style={styles.container}>
      <div style={styles.header}>
        <span style={styles.badge}>CANLI VERİ BAĞLANTISI</span>
        <h2 style={styles.title}>Dünya Damga Atlası</h2>
        <p style={styles.description}>
          Buzul Çağı'ndan günümüze, damgaların, petrogliflerin, yazıtların ve
          kadim merkezlerin coğrafi dağılımını inceleyen YKOS atlas katmanı.
        </p>
      </div>

      {/* 🔍 Dinamik bilgi kartları */}
      <div style={styles.infoGrid}>
        <div style={styles.infoCard}>
          <span style={styles.icon}>🌍</span>
          <strong>Arama</strong>
          <small>{query || "Henüz arama yapılmadı"}</small>
        </div>

        <div style={styles.infoCard}>
          <span style={styles.icon}>🔎</span>
          <strong>Aktif Filtre</strong>
          <small>{filter}</small>
        </div>

        <div style={styles.infoCard}>
          <span style={styles.icon}>🪨</span>
          <strong>Petroglif Atlası</strong>
          <small>Kaya sanatı ve semboller</small>
        </div>

        <div style={styles.infoCard}>
          <span style={styles.icon}>🔶</span>
          <strong>Damga Atlası</strong>
          <small>{roots.YKOS_ROOTS.length} kök kayıtlı</small>
        </div>
      </div>

      {/* 🌐 Coğrafi veri örneği */}
      <div style={styles.geoBlock}>
        <strong>Atlas Merkezleri:</strong>
        <pre style={styles.geoText}>{JSON.stringify(geo, null, 2)}</pre>
      </div>

      <div style={styles.tags}>
        <span style={styles.tag}>#KayaResimleri</span>
        <span style={styles.tag}>#Petroglifler</span>
        <span style={styles.tag}>#RunikAlfabeler</span>
        <span style={styles.tag}>#GöçYolları</span>
      </div>

      <div style={styles.actions}>
        <button
          type="button"
          style={styles.primaryButton}
          onClick={() => console.log("Dünya Damga Atlası açıldı")}
        >
          Dünya Damga Atlasını Başlat
        </button>

        <button
          type="button"
          style={styles.secondaryButton}
          onClick={() => console.log("Kadim merkezler açıldı")}
        >
          Kadim Merkezleri İncele
        </button>
      </div>
    </section>
  );
}

const styles = {
  container: {
    width: "100%",
    boxSizing: "border-box",
    padding: "28px",
    border: "1px solid #2a2a2a",
    borderRadius: "10px",
    backgroundColor: "#101010",
    color: "#f5f5f5",
  },
  header: { marginBottom: "24px" },
  badge: {
    display: "inline-block",
    marginBottom: "10px",
    color: "#26d98c",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.8px",
  },
  title: { margin: "0 0 10px", color: "#ffffff", fontSize: "26px" },
  description: {
    margin: 0,
    maxWidth: "760px",
    color: "#a9b0bb",
    fontSize: "14px",
    lineHeight: "1.7",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
    gap: "12px",
    marginBottom: "22px",
  },
  infoCard: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    padding: "16px",
    border: "1px solid #262626",
    borderRadius: "8px",
    backgroundColor: "#151515",
  },
  icon: { fontSize: "22px" },
  geoBlock: {
    marginBottom: "20px",
    padding: "10px",
    backgroundColor: "#0f0f0f",
    borderRadius: "6px",
    border: "1px solid #333",
  },
  geoText: {
    fontSize: "12px",
    color: "#d9a926",
    marginTop: "6px",
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "24px",
  },
  tag: {
    padding: "6px 10px",
    border: "1px solid #4a3710",
    borderRadius: "16px",
    backgroundColor: "rgba(255, 184, 0, 0.06)",
    color: "#d9a926",
    fontSize: "12px",
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    paddingTop: "20px",
    borderTop: "1px solid #252525",
  },
  primaryButton: {
    padding: "12px 18px",
    border: "1px solid #d8a400",
    borderRadius: "6px",
    backgroundColor: "#d8a400",
    color: "#080808",
    fontWeight: "700",
    cursor: "pointer",
  },
  secondaryButton: {
    padding: "12px 18px",
    border: "1px solid #343434",
    borderRadius: "6px",
    backgroundColor: "#151515",
    color: "#c7d2e0",
    cursor: "pointer",
  },
};
