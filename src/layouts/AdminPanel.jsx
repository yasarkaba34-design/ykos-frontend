import React, { useState } from "react";

export default function AdminPanel({ onBack }) {
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    category: "Damga",
    country: "Türkiye",
    region: "Anadolu",
    period: "M.Ö. 7400",
    rootSyllable: "",
    summary: "",
    analysis: "",
    tags: "",
    imagePreview: null,
    status: "draft" // "draft" (Onay Bekliyor) veya "published" (Yayınlandı)
  });

  const [records, setRecords] = useState([
    {
      id: 101,
      title: "Çatalhöyük Dairesel Damga Motifleri",
      category: "Damga",
      country: "Türkiye",
      region: "Anadolu",
      period: "M.Ö. 7400",
      rootSyllable: "ÇEV / BA",
      summary: "Çatalhöyük duvar resimlerindeki dairesel damgaların YKOS 100 okuması.",
      analysis: "Çatalhöyük M.Ö. 7400 katmanlarında tespit edilen motifler ÇEV kök hecesiyle tam uyum gösterir.",
      tags: "çatalhöyük, damga, çev",
      imagePreview: null,
      status: "draft"
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);

  const categories = ["Damga", "Petroglif", "Yazıt", "Makale / Külliyat", "Atlas & Bölge"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  // Form Kaydetme veya Güncelleme
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return alert("Lütfen eser / bulgu başlığını giriniz.");

    if (isEditing) {
      // Güncelleme işlemi
      setRecords(records.map(rec => rec.id === formData.id ? { ...formData } : rec));
      alert("✏️ Kayıt başarıyla güncellendi!");
      setIsEditing(false);
    } else {
      // Yeni Taslak Ekleme
      const newRec = {
        ...formData,
        id: Date.now(),
        status: "draft"
      };
      setRecords([newRec, ...records]);
      alert("📝 Yeni YKOS Bulgusu taslak olarak kaydedildi. Onay bekliyor!");
    }

    resetForm();
  };

  // Düzenleme Moduna Alma
  const handleEdit = (item) => {
    setFormData({ ...item });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Onaylama ve Yayınlama
  const handleApprove = (id) => {
    setRecords(records.map(rec => rec.id === id ? { ...rec, status: "published" } : rec));
    alert("✅ YKOS Bulgusu onaylandı ve ykos.net / ykos.org arama motoru canlı yayınlaşmasına aktarıldı!");
  };

  // Silme
  const handleDelete = (id) => {
    if (window.confirm("Bu kaydı silmek istediğinizden emin misiniz?")) {
      setRecords(records.filter(rec => rec.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      title: "",
      category: "Damga",
      country: "Türkiye",
      region: "Anadolu",
      period: "M.Ö. 7400",
      rootSyllable: "",
      summary: "",
      analysis: "",
      tags: "",
      imagePreview: null,
      status: "draft"
    });
    setIsEditing(false);
  };

  const cardStyle = {
    backgroundColor: "#050811",
    border: "1px solid #ffd700",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.9)",
    color: "#fff",
    fontFamily: "Segoe UI, sans-serif"
  };

  const inputStyle = {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
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
      
      {/* ÜST GEÇİŞ BARI */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <button
          onClick={onBack}
          style={{ background: "rgba(255, 215, 0, 0.15)", border: "1px solid #ffd700", color: "#ffd700", padding: "8px 18px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}
        >
          ⬅ Ana Panele Dön
        </button>
        <span style={{ color: "#ffd700", fontSize: "0.9rem", fontWeight: "bold" }}>🏛️ ykos.com.tr VERİ GİRİŞ VE EDİTÖR PORTALI</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "20px" }}>
        
        {/* SOL: VERİ GİRİŞ & DÜZENLEME FORMU */}
        <div style={cardStyle}>
          <h2 style={{ color: "#ffd700", fontSize: "1.2rem", marginTop: 0, marginBottom: "15px", borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "10px" }}>
            {isEditing ? "✏️ YKOS Bulgusunu Düzenle" : "📝 Yeni YKOS Bulgusu Gir (Taslak)"}
          </h2>

          <form onSubmit={handleSubmit}>
            
            <div style={{ marginBottom: "12px" }}>
              <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>Bulgu / Eser Başlığı</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Örn: Çatalhöyük Dairesel Damga Motifleri" style={inputStyle} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
              <div>
                <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>Veri Kategorisi</label>
                <select name="category" value={formData.category} onChange={handleChange} style={{ ...inputStyle, backgroundColor: "#050811" }}>
                  {categories.map((c, i) => <option key={i} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>Kök Hece / Damga Kodu</label>
                <input type="text" name="rootSyllable" value={formData.rootSyllable} onChange={handleChange} placeholder="Örn: ÇEV / BA" style={inputStyle} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "12px" }}>
              <div>
                <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>Ülke</label>
                <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Örn: Türkiye" style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>Bölge</label>
                <input type="text" name="region" value={formData.region} onChange={handleChange} placeholder="Örn: Anadolu" style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>Dönem</label>
                <input type="text" name="period" value={formData.period} onChange={handleChange} placeholder="Örn: M.Ö. 7400" style={inputStyle} />
              </div>
            </div>

            {/* 📷 GÖRSEL YÜKLEME KUTUSU */}
            <div style={{ marginBottom: "15px", background: "rgba(255,215,0,0.03)", border: "1px dashed rgba(255,215,0,0.4)", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
              <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold", display: "block", marginBottom: "6px" }}>
                📷 Damga / Petroglif Görseli Yükle
              </label>
              <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} id="file-input-edit" />
              <label htmlFor="file-input-edit" style={{ background: "rgba(255, 215, 0, 0.15)", border: "1px solid #ffd700", color: "#ffd700", padding: "6px 12px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", fontSize: "0.78rem", display: "inline-block" }}>
                📁 Görsel Seç
              </label>

              {formData.imagePreview && (
                <div style={{ marginTop: "10px" }}>
                  <img src={formData.imagePreview} alt="Önizleme" style={{ maxHeight: "120px", borderRadius: "6px", border: "1px solid #ffd700" }} />
                </div>
              )}
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>Kısa Özet (Arama Yanıtı İçin)</label>
              <input type="text" name="summary" value={formData.summary} onChange={handleChange} placeholder="Arama motorunda kullanıcıya sunulacak özet..." style={inputStyle} />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>Detaylı YKOS Çözümleme Metni</label>
              <textarea name="analysis" rows="4" value={formData.analysis} onChange={handleChange} placeholder="Kök hece çözümü, fonetik okumalar..." style={{ ...inputStyle, resize: "vertical" }}></textarea>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>Arama Anahtar Kelimeleri</label>
              <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="çatalhöyük, damga, çev" style={inputStyle} />
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="submit"
                style={{
                  flex: 1,
                  background: isEditing ? "linear-gradient(135deg, #38bdf8, #0284c7)" : "linear-gradient(135deg, #ffd700, #b8860b)",
                  color: "#000",
                  border: "none",
                  padding: "12px",
                  borderRadius: "8px",
                  fontWeight: "900",
                  fontSize: "0.9rem",
                  cursor: "pointer"
                }}
              >
                {isEditing ? "💾 GÜNCELLEMEYİ KAYDET" : "📝 TASLAK OLARAK KAYDET"}
              </button>

              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  style={{ background: "#333", color: "#fff", border: "1px solid #666", padding: "12px", borderRadius: "8px", cursor: "pointer" }}
                >
                  İptal
                </button>
              )}
            </div>

          </form>
        </div>

        {/* SAĞ: ONAY BEKLEYEN VE YAYINLANAN KADİM VERİLER BÖLÜMÜ */}
        <div style={cardStyle}>
          <h2 style={{ color: "#ffd700", fontSize: "1.2rem", marginTop: 0, marginBottom: "15px", borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "10px" }}>
            🛡️ Veri Onay Havuzu ve Yayın Listesi ({records.length})
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxHeight: "650px", overflowY: "auto" }}>
            {records.map((item) => (
              <div 
                key={item.id} 
                style={{ 
                  backgroundColor: item.status === "published" ? "rgba(34, 197, 94, 0.05)" : "rgba(234, 179, 8, 0.05)", 
                  border: item.status === "published" ? "1px solid #22c55e" : "1px solid #eab308", 
                  borderRadius: "8px", 
                  padding: "12px" 
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#ffd700", fontWeight: "bold", fontSize: "0.85rem" }}>📜 {item.title}</span>
                  <span style={{ 
                    fontSize: "0.68rem", 
                    padding: "2px 8px", 
                    borderRadius: "12px", 
                    fontWeight: "bold",
                    backgroundColor: item.status === "published" ? "rgba(34, 197, 94, 0.2)" : "rgba(234, 179, 8, 0.2)",
                    color: item.status === "published" ? "#4ade80" : "#fde047"
                  }}>
                    {item.status === "published" ? "🟢 Canlıda Yayınlandı" : "⏳ Onay Bekliyor"}
                  </span>
                </div>

                <div style={{ fontSize: "0.72rem", color: "#aaa", marginTop: "4px" }}>
                  📍 {item.country} | 🔤 Kök: {item.rootSyllable || "Yok"} | 🏷️ {item.category}
                </div>

                <p style={{ fontSize: "0.78rem", color: "#ddd", margin: "6px 0 10px 0" }}>{item.summary}</p>

                {/* DÜZENLE - ONAYLA - SİL DÜĞMELERİ */}
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", borderTop: "1px dashed rgba(255,255,255,0.1)", paddingTop: "8px" }}>
                  <button 
                    onClick={() => handleEdit(item)} 
                    style={{ background: "rgba(56, 189, 248, 0.15)", border: "1px solid #38bdf8", color: "#38bdf8", padding: "4px 10px", borderRadius: "4px", fontSize: "0.72rem", fontWeight: "bold", cursor: "pointer" }}
                  >
                    ✏️ Düzenle
                  </button>

                  {item.status !== "published" && (
                    <button 
                      onClick={() => handleApprove(item.id)} 
                      style={{ background: "rgba(34, 197, 94, 0.15)", border: "1px solid #22c55e", color: "#4ade80", padding: "4px 10px", borderRadius: "4px", fontSize: "0.72rem", fontWeight: "bold", cursor: "pointer" }}
                    >
                      ✅ Onayla ve Yayınla
                    </button>
                  )}

                  <button 
                    onClick={() => handleDelete(item.id)} 
                    style={{ background: "rgba(239, 68, 68, 0.15)", border: "1px solid #ef4444", color: "#f87171", padding: "4px 10px", borderRadius: "4px", fontSize: "0.72rem", fontWeight: "bold", cursor: "pointer" }}
                  >
                    🗑️ Sil
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
