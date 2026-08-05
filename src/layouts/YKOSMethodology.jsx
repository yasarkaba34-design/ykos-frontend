import React from "react";

export default function YKOSMethodology({ onGoHome }) {
  return (
    <div style={{ maxWidth: "1220px", margin: "10px auto", padding: "20px", backgroundColor: "#050811", border: "1px solid #ffd700", borderRadius: "12px", color: "#fff" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "10px" }}>
        <div>
          <span style={{ color: "#ffd700", fontSize: "0.75rem", fontWeight: "bold" }}>📜 AKADEMİK FELSEFE VE BİLİMSEL ÇERÇEVE</span>
          <h2 style={{ color: "#ffd700", margin: "4px 0 0 0", fontSize: "1.3rem" }}>YKOS METODOLOJİSİ VE BİLİMSEL İLKELER</h2>
        </div>
        <button onClick={onGoHome} style={{ padding: "8px 14px", background: "transparent", border: "1px solid #ffd700", color: "#ffd700", fontWeight: "bold", borderRadius: "6px", cursor: "pointer" }}>← ANA PANELE DÖN</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "15px" }}>
        <div style={{ background: "rgba(255,215,0,0.03)", border: "1px solid rgba(255,215,0,0.25)", padding: "16px", borderRadius: "8px" }}>
          <h3 style={{ color: "#ffd700", margin: "0 0 8px 0", fontSize: "0.95rem" }}>1. Anadolu Odaklı Refugium Modeli</h3>
          <p style={{ color: "#ccc", fontSize: "0.8rem", lineHeight: "1.6" }}>
            Buzul çağındaki mikroklima koruması sayesinde Anadolu, insanlığın ve sembollerin kök rahmidir. Erken kültür akışı Asya'dan Anadolu'ya değil; Anadolu'dan Asya ve Akdeniz hatlarına doğru gerçekleşmiştir.
          </p>
        </div>

        <div style={{ background: "rgba(255,215,0,0.03)", border: "1px solid rgba(255,215,0,0.25)", padding: "16px", borderRadius: "8px" }}>
          <h3 style={{ color: "#ffd700", margin: "0 0 8px 0", fontSize: "0.95rem" }}>2. 'Rulo Değil Yol' İlkesi</h3>
          <p style={{ color: "#ccc", fontSize: "0.8rem", lineHeight: "1.6" }}>
            Kültürel hafıza statik bir arşiv kaydı (rulo) değil; yaşayan, sürekli güncellenen ve kök heceler vasıtasıyla bugüne taşınan dinamik bir yoldur.
          </p>
        </div>

        <div style={{ background: "rgba(255,215,0,0.03)", border: "1px solid rgba(255,215,0,0.25)", padding: "16px", borderRadius: "8px" }}>
          <h3 style={{ color: "#ffd700", margin: "0 0 8px 0", fontSize: "0.95rem" }}>3. Form–Bağlam–Anlam Eşzamanlılığı</h3>
          <p style={{ color: "#ccc", fontSize: "0.8rem", lineHeight: "1.6" }}>
            Damgalar ve piktogramlar rastgele çizimler değildir; geometrik aksı, dikey varlık ve yatay bağ simetrisini kodlayan görsel algoritmik mühürlerdir.
          </p>
        </div>
      </div>
    </div>
  );
}
