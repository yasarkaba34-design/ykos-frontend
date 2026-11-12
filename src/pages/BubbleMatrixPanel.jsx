import React from "react";
import data from "../data/data.json";

const damgalar = Array.isArray(data?.damgalar) ? data.damgalar : [];

export default function BubbleMatrixPanel({ onGoHome = () => {} }) {
  return (
    <main style={{ width: "100%", maxWidth: "1100px", margin: "0 auto", padding: "16px", color: "#f8fafc", fontFamily: "Segoe UI, sans-serif" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap", marginBottom: "16px" }}>
        <button
          type="button"
          onClick={onGoHome}
          style={{ background: "rgba(245, 158, 11, 0.12)", border: "1.5px solid #f59e0b", color: "#fbbf24", padding: "9px 16px", borderRadius: "7px", fontWeight: 800, cursor: "pointer" }}
        >
          🏠 Anasayfaya Dön
        </button>
        <span style={{ color: "#94a3b8", fontSize: "0.75rem", letterSpacing: "1px" }}>YKOS • DAMGA KOD SİSTEMİ</span>
      </header>

      <section style={{ background: "#050811", border: "2px solid #f59e0b", borderRadius: "16px", padding: "clamp(20px, 4vw, 36px)", boxShadow: "0 0 35px rgba(245,158,11,.12)" }}>
        <div style={{ textAlign: "center", marginBottom: "26px" }}>
          <p style={{ color: "#f59e0b", fontSize: "0.8rem", fontWeight: 800, letterSpacing: "2px", margin: "0 0 8px" }}>YKOS • OKUMA VE ANALİZ MATRİSİ</p>
          <h1 style={{ color: "#f8fafc", fontSize: "clamp(1.35rem, 4vw, 2rem)", fontWeight: 900, lineHeight: 1.2, margin: "0 0 10px" }}>
            YKOS-DAMGA KOD SİSTEMİ
            <br />
            <span style={{ color: "#fbbf24" }}>ANLAM AÇILIMI</span>
          </h1>
          <p style={{ color: "#cbd5e1", fontSize: "0.9rem", lineHeight: 1.6, maxWidth: "760px", margin: "0 auto" }}>
            Aşağıdaki kayıtlar YKOS veri dosyasındaki damga kodu, biçim, kavram ve kozmik açıklamayı birlikte gösterir. Bunlar sistemde kayıtlı yorumlardır; tarihsel doğrulama için ayrıca kaynak ve bağlam incelenmelidir.
          </p>
        </div>

        <aside role="status" style={{ background: "rgba(127,29,29,.2)", border: "1px solid #b45309", borderRadius: "9px", padding: "12px 14px", marginBottom: "16px", color: "#fde68a", fontSize: "0.85rem", lineHeight: 1.55 }}>
          <strong>Veri kapsamı:</strong> Bu depodaki dosyada {damgalar.length} damga kaydı bulunuyor; ayrı bir kök/hece envanteri bulunmuyor. Canlı matriste görünen “100 kök-hece” sayısı bu veri dosyasıyla doğrulanamıyor.
        </aside>

        {damgalar.length ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 290px), 1fr))", gap: "12px" }}>
            {damgalar.map((item) => (
              <article key={item.id} style={{ background: "rgba(15,23,42,.75)", border: "1px solid rgba(245,158,11,.45)", borderRadius: "12px", padding: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                  <span aria-hidden="true" style={{ width: "48px", height: "48px", display: "grid", placeItems: "center", flexShrink: 0, background: "#090d17", border: "1px solid #f59e0b", borderRadius: "50%", color: "#fbbf24", fontSize: "1.25rem" }}>
                    {item.shape === "daire" ? "◯" : item.shape === "yıldız" ? "✦" : item.shape === "kuş" ? "🕊" : item.shape === "haç" ? "✚" : item.shape === "dört çizgi" ? "Ⅳ" : "◇"}
                  </span>
                  <div>
                    <div style={{ color: "#fbbf24", fontSize: "1.25rem", fontWeight: 900 }}>{item.hece || item.id}</div>
                    <div style={{ color: "#94a3b8", fontSize: "0.82rem" }}>{item.shape || "Biçim belirtilmemiş"}</div>
                  </div>
                </div>
                <dl style={{ display: "grid", gridTemplateColumns: "minmax(82px, auto) 1fr", columnGap: "10px", rowGap: "9px", margin: 0, fontSize: "0.88rem", lineHeight: 1.45 }}>
                  <dt style={{ color: "#94a3b8" }}>Kavram</dt><dd style={{ color: "#f8fafc", margin: 0 }}>{item.kavram || "Kayıt yok"}</dd>
                  <dt style={{ color: "#94a3b8" }}>Açılım</dt><dd style={{ color: "#e2e8f0", margin: 0 }}>{item.cosmic || "Kayıt yok"}</dd>
                </dl>
              </article>
            ))}
          </div>
        ) : (
          <p role="status" style={{ textAlign: "center", color: "#fbbf24" }}>Damga kaydı bulunamadı. Veri dosyasını kontrol edin.</p>
        )}

        <footer style={{ borderTop: "1px solid rgba(245,158,11,.3)", marginTop: "24px", paddingTop: "14px", color: "#94a3b8", fontSize: "0.8rem", lineHeight: 1.5 }}>
          Her satır, YKOS veri tabanındaki bir damga kaydını gösterir. Karşılaştırmalar; biçim, ses/hece, kavram, kronoloji ve coğrafi bağlam birlikte incelenerek yapılmalıdır.
        </footer>
      </section>
    </main>
  );
}
