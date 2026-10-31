import React from "react";

const cardStyle = {
  backgroundColor: "#050811",
  border: "1px solid rgba(255, 215, 0, 0.55)",
  borderRadius: "14px",
  padding: "20px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.45)",
};

const headingStyle = {
  color: "#ffd700",
  fontSize: "1.05rem",
  margin: "0 0 12px",
};

const textStyle = {
  color: "#d5dbe6",
  fontSize: "0.9rem",
  lineHeight: 1.7,
  margin: 0,
};

const steps = [
  ["01", "Kaynak kaydı", "Özgün biçim, anlam, bağlam, kaynak, tarih ve coğrafya kaydedilir."],
  ["02", "Damga ve biçim", "İşaret ya da sözcük biçimi, okuma önerisinden ayrı tutulur."],
  ["03", "Kök / hece yapısı", "YKOS okumasında önerilen kök veya hece yapısı ve izlenen işlem adımları gösterilir."],
  ["04", "Ses ve anlam karşılaştırması", "Ses karşılıkları ile anlam ilişkileri gerekçeleriyle ayrı ayrı değerlendirilir."],
  ["05", "Yapı ve biçimbilim", "Ekler, kök ilişkileri ve biçimsel düzen karşılaştırılır."],
  ["06", "Tarih ve coğrafya", "Tarihleme, buluntu yeri, olası temas ve aktarım bilgileri kaydedilir."],
  ["07", "Sonuç ve sınırlar", "Test sonucu, dayanakları, belirsizlikleri ve karşı örnekleriyle yayımlanır."],
  ["08", "Sürüm ve yeniden inceleme", "Yeni kaynak ve itirazlar ayrı kayıt olarak eklenir; önceki sürüm korunur."],
];

export default function MethodologyPanel({ onNavigateHome = () => {} }) {
  return (
    <main style={{ width: "100%", maxWidth: "1100px", margin: "0 auto", padding: "16px", color: "#fff", fontFamily: "Segoe UI, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap", marginBottom: "16px" }}>
        <button
          type="button"
          onClick={onNavigateHome}
          style={{ background: "rgba(245, 158, 11, 0.15)", border: "1px solid #f59e0b", color: "#f59e0b", padding: "8px 16px", borderRadius: "8px", fontWeight: 800, cursor: "pointer" }}
        >
          🏠 ANASAYFAYA DÖN
        </button>
        <span style={{ color: "#94a3b8", fontSize: "0.78rem", letterSpacing: "0.08em" }}>
          YKOS YÖNTEMİ · ARAŞTIRMA KAYDI
        </span>
      </div>

      <section style={{ ...cardStyle, textAlign: "center", padding: "28px 20px", marginBottom: "16px" }}>
        <p style={{ color: "#f59e0b", fontSize: "0.78rem", letterSpacing: "0.12em", margin: "0 0 8px" }}>
          DAMGA KOD SİSTEMİ
        </p>
        <h1 style={{ color: "#ffd700", fontSize: "clamp(1.5rem, 4vw, 2rem)", margin: "0 0 8px" }}>
          Yaşar Kaba Okuma Sistemi
        </h1>
        <p style={{ ...textStyle, maxWidth: "760px", margin: "0 auto" }}>
          YKOS, damga, kök ve hece yapısını belirli okuma adımlarıyla inceleyen bir teknik yöntemdir. Bu yöntemle yürütülen testlerin verileri, işlem basamakları ve sonuçları açık ve izlenebilir biçimde kaydedilir.
        </p>
      </section>

      <section style={{ ...cardStyle, marginBottom: "16px" }}>
        <h2 style={headingStyle}>Yöntem ile araştırma sonucu</h2>
        <p style={textStyle}>
          YKOS okuma ve karşılaştırma yöntemini tanımlar. Anadolu Dil Katmanları × 30 Türk dili/lehçesi gibi çalışmalar ise bu yöntemin belirli veri kümelerine uygulandığı ayrı testlerdir. Bir testin tamamlanması, aday veri kümesinin eksiksiz veya her kaydın doğrulanmış olduğu anlamına gelmez.
        </p>
        <p style={{ ...textStyle, marginTop: "10px" }}>
          Tek bir ses ya da anlam benzerliği genel dil ilişkisini göstermez. İlişki değerlendirmesi; düzenli ses karşılıkları, kök/hece ve ek yapısı, anlam, tarih, coğrafya, temas olasılığı ve kaynakların birlikte incelenmesini gerektirir.
        </p>
      </section>

      <section style={{ ...cardStyle, marginBottom: "16px" }}>
        <h2 style={headingStyle}>İzlenebilir test akışı</h2>
        <p style={{ ...textStyle, marginBottom: "14px" }}>
          Her testte kullanılan ölçütler ve sıra önceden belirtilir. Her aşamadaki bulgu, gerekçe ve eksik kanıt kayda bağlanır.
        </p>
        <ol style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "10px", listStyle: "none", margin: 0, padding: 0 }}>
          {steps.map(([number, title, description]) => (
            <li key={number} style={{ padding: "12px", background: "rgba(255,255,255,0.035)", borderRadius: "8px", borderLeft: "3px solid #f59e0b" }}>
              <span style={{ color: "#f59e0b", fontWeight: 800, fontSize: "0.76rem" }}>{number} · </span>
              <strong style={{ color: "#fff", fontSize: "0.88rem" }}>{title}</strong>
              <p style={{ ...textStyle, fontSize: "0.82rem", marginTop: "6px" }}>{description}</p>
            </li>
          ))}
        </ol>
      </section>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px", marginBottom: "16px" }}>
        <section style={cardStyle}>
          <h2 style={headingStyle}>Kök merkezli ve aşamalı inceleme</h2>
          <p style={textStyle}>
            Kök/hece yapısı incelemenin ana eksenidir. Çalışmalar Anadolu merkezinden başlayıp belirlenen dairesel sırayla dış alanlara ilerler. Bu sıra araştırmanın düzenidir; tek başına köken, göç veya aktarım kanıtı sayılmaz. Her dil ve bölge için aynı test kaydı ve ölçütler kullanılır.
          </p>
        </section>
        <section style={cardStyle}>
          <h2 style={headingStyle}>Kaynak, kanıt ve yorum</h2>
          <p style={textStyle}>
            Kaynakta geçen sözcük, işaret, anlam ve bağlam ham kayıt olarak saklanır. YKOS okuması ve karşılaştırma sonucu ayrı test kaydında sunulur. Her sonuç kaynak gösterir; yorum, kanıtın gücü ve sınırlarıyla birlikte yayımlanır.
          </p>
        </section>
      </div>

      <section style={{ ...cardStyle, marginBottom: "16px" }}>
        <h2 style={headingStyle}>Kapsam, eksikler ve itirazlar</h2>
        <p style={textStyle}>
          Her çalışma kendi kapsamı içinde tamamlanır. Eksik belge, tarihleme sorunu, belirsiz okuma ve karşı örnekler açıkça işaretlenir; sonraki araştırma veya sürümlerde ele alınabilir. Kaynaklı itirazlar ve alternatif okumalar gerekçeleriyle eklenir. Çelişkili kayıtlar silinmez; yeniden inceleme olarak tutulur.
        </p>
      </section>

      <section style={{ ...cardStyle, borderColor: "rgba(56, 189, 248, 0.55)" }}>
        <h2 style={{ ...headingStyle, color: "#38bdf8" }}>Araştırma sırası</h2>
        <p style={textStyle}>
          Çalışmalar Anadolu merkezinden dışa doğru, belirlenmiş coğrafi ve tarihsel halkalarla yürütülür. Sonraki diller sırayla eklenir; coğrafi yakınlık, tekil benzerlik veya sıralama tek başına tarihsel ilişki sonucu olarak yorumlanmaz.
        </p>
        <p style={{ ...textStyle, marginTop: "10px", color: "#94a3b8" }}>
          TÜDİTAM kurumsal araştırma ve arşiv işlevini; YKOS ise okuma ve test yöntemini ifade eder.
        </p>
      </section>
    </main>
  );
}
