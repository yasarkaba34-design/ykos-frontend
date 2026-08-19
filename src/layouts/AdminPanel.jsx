import React, { useState, useEffect } from "react";
import { uploadImageToImgBB } from "../api/imageService";

export default function AdminPanel({ onLogout, userRole = "admin" }) {
  const [formData, setFormData] = useState({
    id: null, title: "", category: "Damga", country: "Türkiye", region: "Anadolu",
    period: "Bilinmiyor", rootSyllable: "", summary: "", analysis: "", tags: "",
    imagePreview: null, status: "draft", contributor: "", email: "", source: "admin"
  });

  const [isUploading, setIsUploading] = useState(false);

  const [records, setRecords] = useState(() => {
    const savedRecords = localStorage.getItem("ykos_admin_records");
    return savedRecords ? JSON.parse(savedRecords) : [];
  });

  useEffect(() => {
    localStorage.setItem("ykos_admin_records", JSON.stringify(records));
  }, [records]);

  const [isEditing, setIsEditing] = useState(false);
  const categories = ["Damga", "Petroglif", "Yazıt", "Saha Gözlemi", "Diğer"];

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true); 
    try {
      const imageUrl = await uploadImageToImgBB(file); 
      if (imageUrl) {
        setFormData({ ...formData, imagePreview: imageUrl });
        alert("✅ Görsel başarıyla buluta yüklendi!");
      }
    } catch (error) {
      alert("❌ Yükleme sırasında hata oluştu.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // GÜNCELLEME: Konuklar için İsim ve E-posta zorunluluğu
    if (userRole === "guest") {
      if (!formData.contributor.trim()) return alert("Lütfen Adınızı ve Soyadınızı giriniz.");
      if (!formData.email.trim() || !formData.email.includes("@")) return alert("Lütfen geçerli bir E-posta adresi giriniz.");
      if (!formData.title.trim()) return alert("Lütfen bulgu başlığını giriniz.");
      if (!formData.imagePreview) return alert("Lütfen bir görsel yükleyiniz.");
    } else {
      if (!formData.title.trim()) return alert("Lütfen başlığı giriniz.");
    }

    if (isEditing) {
      setRecords(records.map(rec => rec.id === formData.id ? { ...formData } : rec));
      alert("✏️ Kayıt güncellendi!");
      setIsEditing(false);
    } else {
      const newRec = { 
        ...formData, 
        id: Date.now(), 
        status: "draft", 
        source: userRole === "guest" ? "guest" : "admin" 
      };
      setRecords([newRec, ...records]);
      
      if (userRole === "guest") {
        alert("🎉 Katkınız başarıyla alındı! Yönetici incelemesinin ardından adınızla sistemde yayınlanacaktır. YKOS'a desteğiniz için teşekkür ederiz.");
        onLogout(); 
      } else {
        alert("📝 Yeni kayıt havuza eklendi!");
      }
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({ id: null, title: "", category: "Damga", country: "Türkiye", region: "Anadolu", period: "Bilinmiyor", rootSyllable: "", summary: "", analysis: "", tags: "", imagePreview: null, status: "draft", contributor: "", email: "", source: "admin" });
    setIsEditing(false);
  };

  const handleEdit = (item) => { setFormData({ ...item }); setIsEditing(true); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const handleApprove = (id) => { setRecords(records.map(rec => rec.id === id ? { ...rec, status: "published" } : rec)); alert("✅ Veri onaylandı ve yayınlandı!"); };
  const handleDelete = (id) => { if (window.confirm("Silmek istediğinize emin misiniz?")) setRecords(records.filter(rec => rec.id !== id)); };

  const cardStyle = { backgroundColor: "#050811", border: "1px solid #ffd700", borderRadius: "12px", padding: "20px", marginBottom: "20px", boxShadow: "0 4px 30px rgba(0, 0, 0, 0.9)", color: "#fff", fontFamily: "Segoe UI, sans-serif" };
  const inputStyle = { width: "100%", backgroundColor: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 215, 0, 0.4)", borderRadius: "6px", padding: "10px", color: "#fff", fontSize: "0.85rem", marginTop: "5px", boxSizing: "border-box", outline: "none" };

  return (
    <div style={{ maxWidth: userRole === "guest" ? "700px" : "1100px", margin: "0 auto", padding: "15px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <button onClick={onLogout} style={{ background: "rgba(255, 215, 0, 0.15)", border: "1px solid #ffd700", color: "#ffd700", padding: "8px 18px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>⬅ Ana Sayfaya Dön</button>
        <span style={{ color: "#ffd700", fontSize: "0.9rem", fontWeight: "bold" }}>{userRole === "admin" ? "👑 YÖNETİCİ PORTALI" : userRole === "researcher" ? "🔬 ARAŞTIRMACI PORTALI" : "🌍 AÇIK VERİ KATKI PORTALI"}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: userRole === "guest" ? "1fr" : "repeat(auto-fit, minmax(340px, 1fr))", gap: "20px" }}>
        <div style={cardStyle}>
          <h2 style={{ color: "#ffd700", fontSize: "1.2rem", marginTop: 0, marginBottom: "15px", borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "10px" }}>
            {userRole === "guest" ? "🤝 YKOS Havuzuna Veri Gönder" : (isEditing ? "✏️ Bulguyu Düzenle" : "📝 Yeni Bulgu Girişi")}
          </h2>
          
          {userRole === "guest" && (
            <p style={{ color: "#aaa", fontSize: "0.8rem", marginBottom: "15px" }}>
              Bölgenizdeki kaya resimlerini veya damgaları YKOS sistemine ekleyerek araştırmalara katkıda bulunabilirsiniz. Güvenlik için e-posta adresiniz istenmektedir (Sitede yayınlanmaz).
            </p>
          )}

          <form onSubmit={handleSubmit}>
            {userRole === "guest" && (
              <div style={{ marginBottom: "12px", background: "rgba(0,255,127,0.05)", padding: "15px", borderRadius: "8px", border: "1px solid rgba(0,255,127,0.2)" }}>
                <div style={{ marginBottom: "10px" }}>
                  <label style={{ fontSize: "0.8rem", color: "#00ff7f", fontWeight: "bold" }}>Adınız Soyadınız (Zorunlu)</label>
                  <input type="text" name="contributor" value={formData.contributor} onChange={handleChange} placeholder="Adınız Soyadınız..." style={inputStyle} required />
                </div>
                <div>
                  <label style={{ fontSize: "0.8rem", color: "#00ff7f", fontWeight: "bold" }}>E-posta Adresiniz (Zorunlu - Gizli Tutulur)</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="ornek@email.com" style={inputStyle} required />
                </div>
              </div>
            )}

            <div style={{ marginBottom: "12px" }}>
              <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>Bulgu Başlığı (Zorunlu)</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Örn: Antalya Karain Mağarası İşaretleri" style={inputStyle} required />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
              <div>
                <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>Kategori</label>
                <select name="category" value={formData.category} onChange={handleChange} style={{ ...inputStyle, backgroundColor: "#050811" }}>
                  {categories.map((c, i) => <option key={i} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>Bölge / Şehir</label>
                <input type="text" name="region" value={formData.region} onChange={handleChange} placeholder="Örn: Antalya" style={inputStyle} />
              </div>
            </div>

            <div style={{ marginBottom: "15px", background: "rgba(255,215,0,0.03)", border: "1px dashed rgba(255,215,0,0.4)", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
              <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold", display: "block", marginBottom: "6px" }}>📷 Bulguyu Yükle {userRole === "guest" && "(Zorunlu)"}</label>
              <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} id="file-input-edit" disabled={isUploading} />
              <label htmlFor="file-input-edit" style={{ background: "rgba(255, 215, 0, 0.15)", border: "1px solid #ffd700", color: "#ffd700", padding: "6px 12px", borderRadius: "6px", fontWeight: "bold", cursor: isUploading ? "wait" : "pointer", fontSize: "0.78rem", display: "inline-block" }}>
                {isUploading ? "⏳ Buluta Yükleniyor..." : "📁 Fotoğraf Seç"}
              </label>
              {formData.imagePreview && <div style={{ marginTop: "10px" }}><img src={formData.imagePreview} alt="Önizleme" style={{ maxHeight: "120px", borderRadius: "6px", border: "1px solid #ffd700" }} /></div>}
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>Kısa Açıklama</label>
              <textarea name="summary" rows="3" value={formData.summary} onChange={handleChange} placeholder="Bulgu hakkında kısa bilgi verin..." style={{ ...inputStyle, resize: "vertical" }}></textarea>
            </div>

            <button type="submit" style={{ width: "100%", background: "linear-gradient(135deg, #ffd700, #b8860b)", color: "#000", border: "none", padding: "12px", borderRadius: "8px", fontWeight: "900", cursor: "pointer", marginTop: "10px" }}>
              🚀 SİSTEME GÖNDER
            </button>
          </form>
        </div>

        {userRole !== "guest" && (
          <div style={cardStyle}>
            <h2 style={{ color: "#ffd700", fontSize: "1.2rem", marginTop: 0, marginBottom: "15px", borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "10px" }}>🛡️ Veri Havuzu ({records.length})</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxHeight: "650px", overflowY: "auto" }}>
              {records.map((item) => (
                <div key={item.id} style={{ backgroundColor: item.status === "published" ? "rgba(34, 197, 94, 0.05)" : "rgba(234, 179, 8, 0.05)", border: item.status === "published" ? "1px solid #22c55e" : "1px solid #eab308", borderRadius: "8px", padding: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "#ffd700", fontWeight: "bold", fontSize: "0.85rem" }}>📜 {item.title}</span>
                    <span style={{ fontSize: "0.68rem", padding: "2px 8px", borderRadius: "12px", fontWeight: "bold", backgroundColor: item.status === "published" ? "rgba(34, 197, 94, 0.2)" : "rgba(234, 179, 8, 0.2)", color: item.status === "published" ? "#4ade80" : "#fde047" }}>
                      {item.status === "published" ? "🟢 Canlıda" : "⏳ Taslak"}
                    </span>
                  </div>
                  
                  {item.source === "guest" && (
                    <div style={{ fontSize: "0.75rem", background: "rgba(0, 255, 127, 0.1)", padding: "8px", borderRadius: "6px", marginTop: "8px", border: "1px solid rgba(0, 255, 127, 0.3)" }}>
                      <div style={{ color: "#00ff7f", fontWeight: "bold", marginBottom: "4px" }}>🧑‍🤝‍🧑 Konuk Katkısı: {item.contributor}</div>
                      <div style={{ color: "#aaa" }}>📧 İletişim: {item.email}</div>
                    </div>
                  )}
                  
                  {item.imagePreview && <img src={item.imagePreview} alt="kayıt" style={{ maxHeight: "40px", borderRadius: "4px", margin: "8px 0", border: "1px solid rgba(255,215,0,0.3)" }} />}
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", borderTop: "1px dashed rgba(255,255,255,0.1)", paddingTop: "8px" }}>
                    <button onClick={() => handleEdit(item)} style={{ background: "rgba(56, 189, 248, 0.15)", border: "1px solid #38bdf8", color: "#38bdf8", padding: "4px 10px", borderRadius: "4px", fontSize: "0.72rem", fontWeight: "bold", cursor: "pointer" }}>✏️ Düzenle</button>
                    {userRole === "admin" && item.status !== "published" && (
                      <button onClick={() => handleApprove(item.id)} style={{ background: "rgba(34, 197, 94, 0.15)", border: "1px solid #22c55e", color: "#4ade80", padding: "4px 10px", borderRadius: "4px", fontSize: "0.72rem", fontWeight: "bold", cursor: "pointer" }}>✅ Onayla</button>
                    )}
                    {userRole === "admin" && (
                      <button onClick={() => handleDelete(item.id)} style={{ background: "rgba(239, 68, 68, 0.15)", border: "1px solid #ef4444", color: "#f87171", padding: "4px 10px", borderRadius: "4px", fontSize: "0.72rem", fontWeight: "bold", cursor: "pointer" }}>🗑️ Sil</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}