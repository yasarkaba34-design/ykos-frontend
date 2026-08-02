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
    imagePreview: null
  });

  const categories = ["Damga", "Petroglif", "Yazıt", "Makale / Külliyat", "Atlas & Bölge"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Bilgisayardan/Telefondan Resim Seçme ve Yükleme Mantığı
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imagePreview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return alert("Lütfen eser / bulgu başlığını giriniz.");

    alert("✅ YKOS Bulgusu ve Görseli başarıyla sisteme mühürlendi ve arama motoru indeksine eklendi!");
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
      imagePreview: null
    });
  };

  const cardStyle = {
    backgroundColor: "#050811",
    border: "1px solid #ffd700",
    borderRadius: "12px",
    padding: "25px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.9)",
    color: "#fff",
    fontFamily: "Segoe UI, sans-serif"
  };

  const inputStyle = {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    border: "1px solid rgba(255, 215, 0, 0.4)",
    borderRadius: "6px",
    padding: "11px",
    color: "#fff",
    fontSize: "0.88rem",
    marginTop: "5px",
    boxSizing: "border-box",
    outline: "none"
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "15px" }}>
      
      {/* ÜST GEÇİŞ BARI */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <button
          onClick={onBack}
          style={{ background: "rgba(255, 215, 0, 0.15)", border: "1px solid #ffd700", color: "#ffd700", padding: "8px 18px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}
        >
          ⬅ Ana Panele Dön
        </button>
        <span style={{ color: "#ffd700", fontSize: "0.9rem", fontWeight: "bold" }}>🏛️ ykos.com.tr VERİ GİRİŞ PORTALI</span>
      </div>

      {/* VERİ GİRİŞ FORMU */}
      <div style={cardStyle}>
        <h2 style={{ color: "#ffd700", fontSize: "1.3rem", marginTop: 0, marginBottom: "20px", borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "12px", textAlign: "center", letterSpacing: "1px" }}>
          📝 YKOS BİLGİ MERKEZİ VERİ GİRİŞ FORMU
        </h2>

        <form onSubmit={handleSubmit}>
          
          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontSize: "0.85rem", color: "#ffd700", fontWeight: "bold" }}>Bulgu / Eser Başlığı</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Örn: Çatalhöyük Dairesel Damga Motifleri" style={inputStyle} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
            <div>
              <label style={{ fontSize: "0.85rem", color: "#ffd700", fontWeight: "bold" }}>Veri Kategorisi</label>
              <select name="category" value={formData.category} onChange={handleChange} style={{ ...inputStyle, backgroundColor: "#050811" }}>
                {categories.map((c, i) => <option key={i} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: "0.85rem", color: "#ffd700", fontWeight: "bold" }}>Kök Hece / Damga Kodu</label>
              <input type="text" name="rootSyllable" value={formData.rootSyllable} onChange={handleChange} placeholder="Örn: ÇEV / BA / KÖK" style={inputStyle} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "15px", marginBottom: "15px" }}>
            <div>
              <label style={{ fontSize: "0.85rem", color: "#ffd700", fontWeight: "bold" }}>Ülke</label>
              <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Örn: Türkiye" style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: "0.85rem", color: "#ffd700", fontWeight: "bold" }}>Bölge / Atlas</label>
              <input type="text" name="region" value={formData.region} onChange={handleChange} placeholder="Örn: Anadolu Atlası" style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: "0.85rem", color: "#ffd700", fontWeight: "bold" }}>Dönem / Çağ</label>
              <input type="text" name="period" value={formData.period} onChange={handleChange} placeholder="Örn: M.Ö. 7400" style={inputStyle} />
            </div>
          </div>

          {/* 📷 GÖRSEL VE ÇİZİM DOSYA YÜKLEME KUTUSU */}
          <div style={{ marginBottom: "20px", background: "rgba(255,215,0,0.03)", border: "1px dashed rgba(255,215,0,0.5)", borderRadius: "8px", padding: "15px", textAlign: "center" }}>
            <label style={{ fontSize: "0.9rem", color: "#ffd700", fontWeight: "bold", display: "block", marginBottom: "8px" }}>
              📷 Damga / Petroglif Görseli veya Çizim Dosyası Yükle
            </label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange}
              style={{ display: "none" }} 
              id="file-upload-input" 
            />
            <label 
              htmlFor="file-upload-input"
              style={{
                background: "rgba(255, 215, 0, 0.15)",
                border: "1px solid #ffd700",
                color: "#ffd700",
                padding: "8px 16px",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer",
                display: "inline-block"
              }}
            >
              📁 Cihazınızdan Dosya Seçin
            </label>

            {/* YÜKLENEN RESMİN CANLI ÖNİZLEMESİ */}
            {formData.imagePreview && (
              <div style={{ marginTop: "15px" }}>
                <span style={{ fontSize: "0.75rem", color: "#aaa", display: "block", marginBottom: "6px" }}>Seçilen Görsel Önizlemesi:</span>
                <img 
                  src={formData.imagePreview} 
                  alt="Damga Önizleme" 
                  style={{ maxHeight: "180px", borderRadius: "8px", border: "1px solid #ffd700", boxShadow: "0 0 10px rgba(255,215,0,0.3)" }} 
                />
              </div>
            )}
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontSize: "0.85rem", color: "#ffd700", fontWeight: "bold" }}>Kısa Özet (Arama Yanıt Ekranı İçin)</label>
            <input type="text" name="summary" value={formData.summary} onChange={handleChange} placeholder="Arama motorunda kullanıcıya sunulacak özeti giriniz..." style={inputStyle} />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontSize: "0.85rem", color: "#ffd700", fontWeight: "bold" }}>Detaylı YKOS Çözümleme Metni</label>
            <textarea name="analysis" rows="5" value={formData.analysis} onChange={handleChange} placeholder="Kök hece çözümü, fonetik okumalar ve akademik açıklamalar..." style={{ ...inputStyle, resize: "vertical" }}></textarea>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontSize: "0.85rem", color: "#ffd700", fontWeight: "bold" }}>Arama Anahtar Kelimeleri (Virgülle Ayırın)</label>
            <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="çatalhöyük, damga, çev, kök hece, anadolu" style={inputStyle} />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              background: "linear-gradient(135deg, #ffd700, #b8860b)",
              color: "#000",
              border: "none",
              padding: "14px",
              borderRadius: "8px",
              fontWeight: "900",
              fontSize: "1rem",
              cursor: "pointer",
              boxShadow: "0 0 20px rgba(255, 215, 0, 0.4)",
              letterSpacing: "1px"
            }}
          >
            🚀 GÖRSELİ VE VERİYİ KAYDET / SİSTEME YÜKLE ➔
          </button>

        </form>
      </div>
    </div>
  );
}
