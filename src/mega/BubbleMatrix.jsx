import React from "react";

export default function BubbleMatrix() {
  return (
    <main style={styles.page}>
      <div style={styles.shell}>
        <header style={styles.header}>
          <span style={styles.eyebrow}>YKOS · MERKEZ ARŞİV</span>
          <h1 style={styles.title}>Okuma ve Analiz Motoru</h1>
          <p style={styles.lead}>
            Okuma kayıtlarını Yaşar Kaba Okuma Sistemi'nin merkez arşivinde
            arayın. Sorgu, arşivin kendi arama sayfasında açılır; kayıt metni,
            yayın bilgisi ve kaynak bağlantısı merkez sitede görüntülenir.
          </p>
        </header>

        <section style={styles.searchCard}>
          <form action="https://www.ykos.com.tr/arama" method="get" target="_blank">
            <label htmlFor="archive-query" style={styles.label}>
              Arşivde aranacak kök, hece, dil veya başlık
            </label>
            <div style={styles.searchRow}>
              <input
                id="archive-query"
                name="query"
                placeholder="Örn. Hattice, kök-hece, Anadolu dil testleri"
                minLength={2}
                required
                style={styles.input}
              />
              <button type="submit" style={styles.button}>
                Merkez arşivde ara ↗
              </button>
            </div>
          </form>
          <p style={styles.hint}>
            Arama terimi doğrudan ykos.com.tr adresine gönderilir. Sonuçlar
            merkez arşivin kendi arama ekranından okunur.
          </p>
          <div style={styles.quickLinks}>
            <a
              href="https://www.ykos.com.tr/arastirma-dosyalari"
              target="_blank"
              rel="noreferrer"
              style={styles.link}
            >
              Araştırma dosyaları ↗
            </a>
            <a
              href="https://www.ykos.com.tr/tuditam"
              target="_blank"
              rel="noreferrer"
              style={styles.link}
            >
              YKOS Araştırma Merkezi ↗
            </a>
          </div>
        </section>

        <section style={styles.method}>
          <h2 style={styles.sectionTitle}>İnceleme ölçütleri</h2>
          <p style={styles.methodIntro}>
            Arşivdeki bir kayıt, yöntemsel değerlendirmede şu başlıklarla
            incelenir. Eksik kaynak veya karşı örnek varsa sonuç kesin hüküm
            olarak sunulmaz.
          </p>
          <div style={styles.steps}>
            {[
              "Kaynak ve kayıt tarihi",
              "Damga ve biçim",
              "Kök/hece yapısı",
              "Ses ve anlam karşılaştırması",
              "Yapı ve biçimbilim",
              "Tarih ve coğrafya",
              "Eksikler ve karşı örnekler",
              "Sürüm ve yeniden inceleme"
            ].map((step, index) => (
              <div key={step} style={styles.step}>
                <span style={styles.stepNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                {step}
              </div>
            ))}
          </div>
        </section>

        <footer style={styles.footer}>
          <span>Arşiv kaynağı: ykos.com.tr</span>
          <a href="https://www.ykos.com.tr/" target="_blank" rel="noreferrer" style={styles.link}>
            Merkez arşivi aç ↗
          </a>
        </footer>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "28px 18px 64px",
    background: "#030712",
    color: "#f8fafc"
  },
  shell: { width: "min(100%, 1060px)", margin: "0 auto" },
  header: {
    padding: "32px",
    border: "1px solid #806414",
    borderRadius: 16,
    background: "linear-gradient(135deg, #0b1020 0%, #090b12 100%)"
  },
  eyebrow: {
    color: "#fbbf24",
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: "0.12em"
  },
  title: { fontSize: "clamp(28px, 5vw, 42px)", margin: "12px 0" },
  lead: { color: "#cbd5e1", maxWidth: 780, lineHeight: 1.7, margin: 0 },
  searchCard: {
    marginTop: 18,
    padding: 24,
    border: "1px solid #334155",
    borderRadius: 14,
    background: "#0b1020"
  },
  label: { display: "block", marginBottom: 10, fontWeight: 700 },
  searchRow: { display: "flex", gap: 10, flexWrap: "wrap" },
  input: {
    flex: "1 1 320px",
    minWidth: 0,
    padding: "13px 14px",
    border: "1px solid #475569",
    borderRadius: 8,
    background: "#050914",
    color: "#fff",
    fontSize: 16
  },
  button: {
    padding: "13px 18px",
    border: "1px solid #fbbf24",
    borderRadius: 8,
    background: "#fbbf24",
    color: "#111827",
    fontWeight: 800,
    cursor: "pointer"
  },
  hint: { color: "#94a3b8", fontSize: 13, lineHeight: 1.6, marginBottom: 0 },
  quickLinks: { display: "flex", gap: 18, flexWrap: "wrap", marginTop: 18 },
  link: { color: "#67e8f9", fontWeight: 700, textDecoration: "none" },
  method: {
    marginTop: 18,
    padding: 24,
    border: "1px solid #164e63",
    borderRadius: 14,
    background: "#08111d"
  },
  sectionTitle: { margin: 0, fontSize: 20, color: "#fbbf24" },
  methodIntro: { color: "#cbd5e1", lineHeight: 1.6, marginBottom: 0 },
  steps: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
    gap: 8,
    marginTop: 18
  },
  step: {
    display: "flex",
    gap: 10,
    padding: 12,
    borderRadius: 8,
    background: "#111827",
    color: "#dbeafe",
    fontSize: 13,
    alignItems: "center"
  },
  stepNumber: { color: "#fbbf24", fontWeight: 800 },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
    padding: "18px 4px",
    color: "#94a3b8",
    fontSize: 13
  }
};
