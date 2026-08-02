import React, { useState } from "react";

export default function AdminPanel({ onBack }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "Damga",
    country: "Türkiye",
    region: "Anadolu",
    period: "M.Ö. 7000",
    rootSyllable: "",
    summary: "",
    analysis: "",
    tags: "",
    imageUrl: ""
  });

  const [savedLogs, setSavedLogs] = useState([]);

  const categories = ["Damga", "Petroglif", "Yazıt", "Makale / Külliyat", "Atlas & Bölge"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return alert("Lütfen en azından bir başlık giriniz.");

    const newEntry = {
      ...formData,
      id: Date.now(),
      createdAt: new Date().toLocaleDateString("tr-TR")
    };

    setSavedLogs([newEntry, ...savedLogs]);
    alert("✅ Yeni YKOS Bulgusu başarıyla sisteme mühürlendi ve indekslendi!");
    setFormData({
      title: "",
      category: "Damga",
      country: "Türkiye",
      region: "Anadolu",
      period: "M.Ö. 7000",
      rootSyllable: "",
      summary: "",
      analysis: "",
      tags: "",
      imageUrl: ""
    });
  };

  const cardStyle = {
    backgroundColor: "#050811",
    border: "1px solid #ffd700",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 4px 25px rgba(0, 0, 0, 0.8)",
    color: "#fff",
    fontFamily: "Segoe UI, sans-serif"
  };

  const inputStyle = {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 215, 0, 0.4)",
    borderRadius: "6px",
    padding: "10px",
    color: "#fff",
    fontSize: "0.85rem",
    marginTop: "5px",
    boxSizing: "border-box",
    outline: "none"
  };

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "15px" }}>
      {/* ÜST DÜĞME & BAŞLIK */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
        <button
          onClick={onBack}
          style={{ background: "rgba(255, 215, 0, 0.15)", border: "1px solid #ffd700", color: "#ffd700", padding: "8px 16px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}
        >
          ⬅ Ana Panele Dön
        </button>
        <span style={{ color: "#38bdf8", fontSize: "0.8rem", fontWeight: "bold" }}>🏛️ YKOS YÖNETİM & VERİ GİRİŞ PORTALI (ykos.com.tr)</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
        
        {/* SOL: FORM GİRİŞİ */}
        <div style={cardStyle}>
          <h2 style={{ color: "#ffd700", fontSize: "1.2rem", marginTop: 0, borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "10px" }}>
            📝 Yeni Küresel Bulgu & Hece Analizi Ekle
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "12px" }}>
              <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>Bulgu / Eser Başlığı</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Örn: Göbeklitepe T-Sütunu H Sembolü" style={inputStyle} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
              <div>
                <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>Veri Kategorisi</label>
                <select name="category" value={formData.category} onChange={handleChange} style={{ ...inputStyle, backgroundColor: "#050811" }}>
                  {categories.map((c, i) => <option key={i} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>Kök Hece / Damga</label>
                <input type="text" name="rootSyllable" value={formData.rootSyllable} onChange={handleChange} placeholder="Örn: ER-İK-AN / KÖK" style={inputStyle} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "12px" }}>
              <div>
                <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>Ülke</label>
                <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Örn: Türkiye" style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>Bölge / Atlas</label>
                <input type="text" name="region" value={formData.region} onChange={handleChange} placeholder="Örn: Anadolu Atlası" style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>Dönem / Çağ</label>
                <input type="text" name="period" value={formData.period} onChange={handleChange} placeholder="Örn: M.Ö. 9600" style={inputStyle} />
              </div>
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>Kısa Özet (Arama Sonucu İçin)</label>
              <input type="text" name="summary" value={formData.summary} onChange={handleChange} placeholder="Sorgu ekranında görünecek kısa açıklama..." style={inputStyle} />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>Detaylı YKOS Çözümleme Metni</label>
              <textarea name="analysis" rows="4" value={formData.analysis} onChange={handleChange} placeholder="Kök hece çözümü, fonetik analizler ve akademik açıklamalar..." style={{ ...inputStyle, resize: "vertical" }}></textarea>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>Arama Etiketleri (Virgülle Ayırın)</label>
              <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="göbeklitepe, h sembolü, anadolu, ön türkçe" style={inputStyle} />
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #ffd700, #b8860b)",
                color: "#000",
                border: "none",
                padding: "12px",
                borderRadius: "8px",
                fontWeight: "900",
                fontSize: "0.9rem",
                cursor: "pointer",
                boxShadow: "0 0 15px rgba(255, 215, 0, 0.4)"
              }}
            >
              🚀 BULGUYU MÜHÜRLE VE SİSTEME YÜKLE ➔
            </button>
          </form>
        </div>

        {/* SAĞ: CANLI YÜKLENEN KAYITLAR İZLEME PANELİ */}
        <div style={cardStyle}>
          <h2 style={{ color: "#ffd700", fontSize: "1.2rem", marginTop: 0, borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "10px" }}>
            📊 İndekslenen YKOS Veri Akışı ({savedLogs.length})
          </h2>

          {savedLogs.length === 0 ? (
            <div style={{ color: "#888", fontSize: "0.85rem", textAlign: "center", padding: "30px 0" }}>
              Henüz bu oturumda veri yüklenmedi. Sol taraftan ilk bulgunuzu yüklediğinizde arama motoru veritabanı anında güncellenecektir.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "550px", overflowY: "auto" }}>
              {savedLogs.map((item) => (
                <div key={item.id} style={{ backgroundColor: "rgba(255,215,0,0.05)", border: "1px solid rgba(255,215,0,0.3)", padding: "12px", borderRadius: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#ffd700", fontWeight: "bold", fontSize: "0.85rem" }}>
                    <span>📜 {item.title}</span>
                    <span style={{ fontSize: "0.7rem", color: "#38bdf8" }}>{item.category}</span>
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#aaa", marginTop: "4px" }}>
                    📍 {item.country} ({item.region}) | ⏳ {item.period} | 🔤 Kök: {item.rootSyllable || "Belirtilmedi"}
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "#ddd", margin: "6px 0 0 0" }}>{item.summary}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
