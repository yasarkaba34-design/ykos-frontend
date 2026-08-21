import React, { useState, useEffect } from "react";
import { uploadImageToImgBB } from "../api/imageService";
import { db } from "../data/firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";

export default function AdminPanel({ onLogout, userRole = "admin" }) {
  const initialFormState = {
    title: "", category: "Damga", country: "Türkiye", city: "",
    districtOrVillage: "", archaeologicalSite: "", coordinates: "", 
    periodStart: "", periodEnd: "",
    referenceSource: "", photographer: "", copyright: "",
    ykosCode: "", similarRecords: "", summary: "", imagePreview: null,
    contributor: "", email: ""
  };

  const [formData, setFormData] = useState({ ...initialFormState, id: null });
  const [isUploading, setIsUploading] = useState(false);
  const [records, setRecords] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const categories = ["Damga", "Petroglif", "Yazıt", "Tamga", "Kurgan", "Saha Gözlemi", "Diğer"];
  const copyrights = [
    "Lütfen telif durumunu seçiniz", 
    "Açık Kaynak (İzinli)", 
    "Telif Hakkı Saklı", 
    "Araştırmacı İzni Gerekli", 
    "Bilinmiyor"
  ];

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "ykos_findings"));
        const fetchedRecords = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRecords(fetchedRecords);
      } catch (error) {
        console.error("Firebase'den veri çekilirken hata:", error);
      }
    };
    fetchRecords();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.copyright === "Lütfen telif durumunu seçiniz" || !formData.copyright) {
      return alert("⚠️ Lütfen geçerli bir telif ve kullanım izni seçiniz.");
    }

    if (userRole === "guest") {
      if (!formData.contributor.trim()) return alert("Lütfen Adınızı ve Soyadınızı giriniz.");
      if (!formData.email.trim() || !formData.email.includes("@")) return alert("Lütfen geçerli e-posta giriniz.");
      if (!formData.title.trim()) return alert("Lütfen bulgu başlığını giriniz.");
      if (!formData.imagePreview) return alert("Lütfen bir görsel yükleyiniz.");
    } else {
      if (!formData.title.trim()) return alert("Lütfen başlığı giriniz.");
    }

    try {
      if (isEditing) {
        const docRef = doc(db, "ykos_findings", formData.id);
        await updateDoc(docRef, { ...formData, updatedAt: serverTimestamp() });
        setRecords(records.map(rec => rec.id === formData.id ? { ...formData } : rec));
        alert("✏️ Kayıt başarıyla güncellendi!");
        setIsEditing(false);
      } else {
        const newRecData = { 
          ...formData, 
          status: "draft", 
          source: userRole === "guest" ? "guest" : "admin",
          createdAt: serverTimestamp()
        };
        delete newRecData.id;

        const docRef = await addDoc(collection(db, "ykos_findings"), newRecData);
        const newRec = { ...newRecData, id: docRef.id };
        setRecords([newRec, ...records]);
        
        if (userRole === "guest") {
          alert("🎉 Katkınız başarıyla alındı! Yönetici incelemesinin ardından sistemde yayınlanacaktır.");
          onLogout(); 
        } else {
          alert("📝 Yeni akademik kayıt veritabanına eklendi!");
        }
      }
      setFormData({ ...initialFormState, id: null });
    } catch (error) {
      console.error("Veri kaydedilirken hata:", error);
      alert("❌ İşlem sırasında bir hata oluştu.");
    }
  };

  const handleEdit = (item) => { setFormData({ ...item }); setIsEditing(true); window.scrollTo({ top: 0, behavior: "smooth" }); };
  
  const handleApprove = async (id) => {
    try {
      await updateDoc(doc(db, "ykos_findings", id), { status: "approved" });
      setRecords(records.map(rec => rec.id === id ? { ...rec, status: "approved" } : rec));
      alert("✅ Veri onaylandı, Evaluator tetiklendi ve Atlas'a aktarıldı!");
    } catch (error) {
      alert("❌ Onaylama sırasında hata oluştu.");
    }
  };

  const handleDelete = async (id) => { 
    if (window.confirm("Bu kaydı veritabanından tamamen silmek istediğinize emin misiniz?")) {
      try {
        await deleteDoc(doc(db, "ykos_findings", id));
        setRecords(records.filter(rec => rec.id !== id));
      } catch (error) {
        alert("❌ Silme işlemi sırasında hata oluştu.");
      }
    }
  };

  const cardStyle = { backgroundColor: "#050811", border: "1px solid #ffd700", borderRadius: "12px", padding: "20px", marginBottom: "20px", boxShadow: "0 4px 30px rgba(0, 0, 0, 0.9)", color: "#fff", fontFamily: "Segoe UI, sans-serif" };
  const inputStyle = { width: "100%", backgroundColor: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 215, 0, 0.4)", borderRadius: "6px", padding: "10px", color: "#fff", fontSize: "0.85rem", marginTop: "5px", boxSizing: "border-box", outline: "none" };
  const sectionTitleStyle = { color: "#b8860b", fontSize: "0.95rem", margin: "15px 0 10px 0", borderBottom: "1px dashed rgba(184,134,11,0.4)", paddingBottom: "5px", textTransform: "uppercase" };

  return (
    <div style={{ maxWidth: userRole === "guest" ? "700px" : "1100px", margin: "0 auto", padding: "15px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <button onClick={onLogout} style={{ background: "rgba(255, 215, 0, 0.15)", border: "1px solid #ffd700", color: "#ffd700", padding: "8px 18px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>⬅ Ana Sayfaya Dön</button>
        <span style={{ color: "#ffd700", fontSize: "0.9rem", fontWeight: "bold" }}>{userRole === "admin" ? "👑 YÖNETİCİ PORTALI" : userRole === "researcher" ? "🔬 ARAŞTIRMACI PORTALI" : "🌍 AÇIK VERİ KATKI PORTALI"}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: userRole === "guest" ? "1fr" : "1fr 1fr", gap: "20px" }}>
        <div style={cardStyle}>
          <h2 style={{ color: "#ffd700", fontSize: "1.2rem", marginTop: 0, marginBottom: "15px", borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "10px" }}>
            {userRole === "guest" ? "🤝 YKOS Havuzuna Akademik Veri Gönder" : (isEditing ? "✏️ Bulguyu Düzenle" : "📝 Yeni Arkeolojik Bulgu Girişi")}
          </h2>
          
          <form onSubmit={handleSubmit}>
            {userRole === "guest" && (
              <div style={{ marginBottom: "12px", background: "rgba(0,255,127,0.05)", padding: "15px", borderRadius: "8px", border: "1px solid rgba(0,255,127,0.2)" }}>
                <div style={{ marginBottom: "10px" }}>
                  <label style={{ fontSize: "0.8rem", color: "#00ff7f", fontWeight: "bold" }}>Adınız Soyadınız / Kurum (Zorunlu)</label>
                  <input type="text" name="contributor" value={formData.contributor} onChange={handleChange} placeholder="Adınız Soyadınız..." style={inputStyle} required />
                </div>
                <div>
                  <label style={{ fontSize: "0.8rem", color: "#00ff7f", fontWeight: "bold" }}>E-posta Adresiniz (Zorunlu - Gizli Tutulur)</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="ornek@email.com" style={inputStyle} required />
                </div>
              </div>
            )}

            <h3 style={sectionTitleStyle}>1. Temel Bilgiler ve Kronoloji</h3>
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
                <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>Başlangıç Tarihi / Dönemi</label>
                <input type="text" name="periodStart" value={formData.periodStart} onChange={handleChange} placeholder="Örn: MÖ 12.000 veya Paleolitik" style={inputStyle} />
              </div>
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>Bitiş Tarihi / Dönemi (Opsiyonel)</label>
              <input type="text" name="periodEnd" value={formData.periodEnd} onChange={handleChange} placeholder="Örn: MÖ 10.000 (Tek dönemsel ise boş bırakabilirsiniz)" style={inputStyle} />
            </div>

            <h3 style={sectionTitleStyle}>2. Coğrafi Konum (Atlas İçin)</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
              <div>
                <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>Ülke</label>
                <input type="text" name="country" value={formData.country} onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>İl / Bölge</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Örn: Antalya" style={inputStyle} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
              <div>
                <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>İlçe / Köy / Mevki</label>
                <input type="text" name="districtOrVillage" value={formData.districtOrVillage} onChange={handleChange} placeholder="Örn: Yağcılar Köyü" style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>Arkeolojik Alan / Buluntu Yeri</label>
                <input type="text" name="archaeologicalSite" value={formData.archaeologicalSite} onChange={handleChange} placeholder="Örn: Karain Mağarası B Mağarası" style={inputStyle} />
              </div>
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>Koordinatlar (Enlem, Boylam)</label>
              <input type="text" name="coordinates" value={formData.coordinates} onChange={handleChange} placeholder="Örn: 37.2232, 38.9225" style={inputStyle} />
            </div>

            <h3 style={sectionTitleStyle}>3. Kaynak ve YKOS Metodolojisi</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
              <div>
                <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>Kaynak / Yayın Linki</label>
                <input type="text" name="referenceSource" value={formData.referenceSource} onChange={handleChange} placeholder="Makale URL veya Kitap Adı" style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>Fotoğrafçı / Araştırmacı</label>
                <input type="text" name="photographer" value={formData.photographer} onChange={handleChange} placeholder="Görsel kime ait?" style={inputStyle} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
              <div>
                <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>YKOS Kök-Hece / Damga Kodu</label>
                <input type="text" name="ykosCode" value={formData.ykosCode} onChange={handleChange} placeholder="Örn: YKOS-DMG-01" style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>Telif ve Kullanım İzni</label>
                <select name="copyright" value={formData.copyright} onChange={handleChange} style={{ ...inputStyle, backgroundColor: "#050811" }}>
                  {copyrights.map((c, i) => <option key={i} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <h3 style={sectionTitleStyle}>4. Görsel, Açıklama ve Bağlantılar</h3>
            <div style={{ marginBottom: "15px", background: "rgba(255,215,0,0.03)", border: "1px dashed rgba(255,215,0,0.4)", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
              <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold", display: "block", marginBottom: "6px" }}>📷 Bulguyu Yükle {userRole === "guest" && "(Zorunlu)"}</label>
              <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} id="file-input-edit" disabled={isUploading} />
              <label htmlFor="file-input-edit" style={{ background: "rgba(255, 215, 0, 0.15)", border: "1px solid #ffd700", color: "#ffd700", padding: "6px 12px", borderRadius: "6px", fontWeight: "bold", cursor: isUploading ? "wait" : "pointer", fontSize: "0.78rem", display: "inline-block" }}>
                {isUploading ? "⏳ Buluta Yükleniyor..." : "📁 Fotoğraf veya Çizim Seç"}
              </label>
              {formData.imagePreview && <div style={{ marginTop: "10px" }}><img src={formData.imagePreview} alt="Önizleme" style={{ maxHeight: "120px", borderRadius: "6px", border: "1px solid #ffd700" }} /></div>}
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>Detaylı İnceleme ve Açıklama</label>
              <textarea name="summary" rows="4" value={formData.summary} onChange={handleChange} placeholder="Bulgunun özellikleri ve analizi..." style={{ ...inputStyle, resize: "vertical" }}></textarea>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>Benzer YKOS Kaydı / Bağlantısı (İsteğe bağlı)</label>
              <input type="text" name="similarRecords" value={formData.similarRecords} onChange={handleChange} placeholder="Örn: YKOS-DMG-12 veya ilgili bağlantı" style={inputStyle} />
            </div>

            <button type="submit" style={{ width: "100%", background: "linear-gradient(135deg, #ffd700, #b8860b)", color: "#000", border: "none", padding: "12px", borderRadius: "8px", fontWeight: "900", cursor: "pointer", marginTop: "10px" }}>
              🚀 AKADEMİK VERİYİ VERİTABANINA GÖNDER
            </button>
          </form>
        </div>

        {userRole !== "guest" && (
          <div style={cardStyle}>
            <h2 style={{ color: "#ffd700", fontSize: "1.2rem", marginTop: 0, marginBottom: "15px", borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "10px" }}>🛡️ İncelenecek Veri Havuzu ({records.length})</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxHeight: "800px", overflowY: "auto", paddingRight: "5px" }}>
              {records.map((item) => (
                <div key={item.id} style={{ backgroundColor: item.status === "approved" ? "rgba(34, 197, 94, 0.05)" : "rgba(234, 179, 8, 0.05)", border: item.status === "approved" ? "1px solid #22c55e" : "1px solid #eab308", borderRadius: "8px", padding: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "#ffd700", fontWeight: "bold", fontSize: "0.85rem" }}>📜 {item.title}</span>
                    <span style={{ fontSize: "0.68rem", padding: "2px 8px", borderRadius: "12px", fontWeight: "bold", backgroundColor: item.status === "approved" ? "rgba(34, 197, 94, 0.2)" : "rgba(234, 179, 8, 0.2)", color: item.status === "approved" ? "#4ade80" : "#fde047" }}>
                      {item.status === "approved" ? "🟢 Onaylandı" : "⏳ İnceleniyor"}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#aaa", marginTop: "6px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px" }}>
                    <div>📍 {item.city} {item.districtOrVillage ? `/ ${item.districtOrVillage}` : ""}</div>
                    <div>⏳ {item.periodStart} {item.periodEnd ? `- ${item.periodEnd}` : ""}</div>
                    {item.ykosCode && <div style={{ color: "#00ff7f" }}>🔤 Kök: {item.ykosCode}</div>}
                  </div>
                  {item.source === "guest" && (
                    <div style={{ fontSize: "0.75rem", background: "rgba(0, 255, 127, 0.1)", padding: "8px", borderRadius: "6px", marginTop: "8px", border: "1px solid rgba(0, 255, 127, 0.3)" }}>
                      <div style={{ color: "#00ff7f", fontWeight: "bold", marginBottom: "4px" }}>🧑‍🤝‍🧑 Konuk: {item.contributor}</div>
                      <div style={{ color: "#aaa" }}>📧 {item.email}</div>
                    </div>
                  )}
                  {item.imagePreview && <img src={item.imagePreview} alt="kayıt" style={{ maxHeight: "60px", borderRadius: "4px", margin: "8px 0", border: "1px solid rgba(255,215,0,0.3)" }} />}
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", borderTop: "1px dashed rgba(255,255,255,0.1)", paddingTop: "8px" }}>
                    <button onClick={() => handleEdit(item)} style={{ background: "rgba(56, 189, 248, 0.15)", border: "1px solid #38bdf8", color: "#38bdf8", padding: "4px 10px", borderRadius: "4px", fontSize: "0.72rem", fontWeight: "bold", cursor: "pointer" }}>✏️ İncele/Düzenle</button>
                    {userRole === "admin" && item.status !== "approved" && (
                      <button onClick={() => handleApprove(item.id)} style={{ background: "rgba(34, 197, 94, 0.15)", border: "1px solid #22c55e", color: "#4ade80", padding: "4px 10px", borderRadius: "4px", fontSize: "0.72rem", fontWeight: "bold", cursor: "pointer" }}>✅ Onayla ve Atlasa Gönder</button>
                    )}
                    {userRole === "admin" && (
                      <button onClick={() => handleDelete(item.id)} style={{ background: "rgba(239, 68, 68, 0.15)", border: "1px solid #ef4444", color: "#f87171", padding: "4px 10px", borderRadius: "4px", fontSize: "0.72rem", fontWeight: "bold", cursor: "pointer" }}>🗑️ Reddet/Sil</button>
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
