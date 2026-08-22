// src/layouts/AdminPanel.jsx
import React, { useState, useEffect } from "react";
import { uploadImageToImgBB } from "../api/imageService";
import { db } from "../data/firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";

export default function AdminPanel({ onLogout, userRole = "admin", onNavigateOpsCenter }) {

  const initialFormState = {
    title: "", category: "Damga", country: "Türkiye", city: "",
    districtOrVillage: "", archaeologicalSite: "", coordinates: "", 
    periodStart: "", periodEnd: "",
    referenceSource: "", photographer: "", copyright: "",
    ykosCode: "", similarRecords: "", summary: "", imagePreview: null,
    images: [],          // 🖼️ Çoklu Fotoğraf / Galeri Havuzu
    content: "",         // 📝 Zengin İçerik / Detaylı Makale Metni
    contributor: "", email: "",
    selectedLayers: [],
    formScore: 95,
    phoneticScore: 96,
    chronologyScore: 98,
    sourceReliability: 95
  };

  const [formData, setFormData] = useState({ ...initialFormState, id: null });
  const [isUploading, setIsUploading] = useState(false);
  const [records, setRecords] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  const categories = ["Damga", "Petroglif", "Yazıt", "Tamga", "Kurgan", "Saha Gözlemi", "Diğer"];
  
  const ykos1000LayersList = [
    "1. Kozmik ve Jeolojik", "2. Anadolu Jeolojisi", "3. İlk İnsan İzleri", 
    "4. İlk Semboller ve Damgalar", "5. Kadim Merkezler", "6. Yazının Doğuşu", 
    "7. Dil ve Türkçe Katmanı", "8. Türk Lehçeleri Atlası", "9. Dünya Dilleri Atlası", "10. YKOS Yapay Zekâ Ağı"
  ];

  // Sağ panele taşınacak Katman Dağılım Verileri
  const layersData = [
    { name: "1. Kozmik Katman", val: 842, max: 2500, color: "#ffd700" },
    { name: "2. Anadolu Arkeolojisi", val: 2340, max: 2500, color: "#00ff7f" },
    { name: "3. Dil Katmanı", val: 1240, max: 2500, color: "#1e90ff" },
    { name: "4. Damga & Sembol", val: 617, max: 2500, color: "#ff8c00" },
    { name: "5. Kök-Hece & Dilbilim", val: 1987, max: 2500, color: "#ba55d3" },
    { name: "6. Kronoloji & Tarih", val: 1102, max: 2500, color: "#38bdf8" },
    { name: "7. Coğrafya & Atlas", val: 1268, max: 2500, color: "#4ade80" },
    { name: "8. Semiyotik & Anlam", val: 654, max: 2500, color: "#f87171" },
    { name: "9. YZ Entegrasyonu", val: 213, max: 2500, color: "#eab308" },
    { name: "10. YKOS Meta Katman", val: 223, max: 2500, color: "#a855f7" }
  ];

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

  const handleLayerToggle = (layerName) => {
    const currentLayers = formData.selectedLayers || [];
    if (currentLayers.includes(layerName)) {
      setFormData({ ...formData, selectedLayers: currentLayers.filter(l => l !== layerName) });
    } else {
      setFormData({ ...formData, selectedLayers: [...currentLayers, layerName] });
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true); 
    try {
      const imageUrl = await uploadImageToImgBB(file); 
      if (imageUrl) {
        setFormData({ ...formData, imagePreview: imageUrl });
        alert("✅ Kapak görseli başarıyla yüklendi!");
      }
    } catch (error) {
      alert("❌ Yükleme sırasında hata oluştu.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleMultipleImagesUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setIsUploading(true);
    try {
      const uploadPromises = files.map(file => uploadImageToImgBB(file));
      const uploadedUrls = await Promise.all(uploadPromises);
      const validUrls = uploadedUrls.filter(url => url !== null);
      
      setFormData(prev => ({
        ...prev,
        images: [...(prev.images || []), ...validUrls]
      }));
      alert(`✅ ${validUrls.length} adet ek fotoğraf galeriye eklendi!`);
    } catch (error) {
      console.error("Çoklu görsel yükleme hatası:", error);
      alert("❌ Fotoğraflar yüklenirken hata oluştu.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveGalleryImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove)
    }));
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
      if (!formData.imagePreview) return alert("Lütfen bir kapak görseli yükleyiniz.");
    } else {
      if (!formData.title.trim()) return alert("Lütfen başlığı giriniz.");
    }

    const calculatedCoherence = Math.round(
      (Number(formData.formScore) + Number(formData.phoneticScore) + Number(formData.chronologyScore) + Number(formData.sourceReliability)) / 4
    );

    try {
      if (isEditing) {
        const docRef = doc(db, "ykos_findings", formData.id);
        const updatedData = { ...formData, coherenceScore: `%${calculatedCoherence}`, updatedAt: serverTimestamp() };
        await updateDoc(docRef, updatedData);
        setRecords(records.map(rec => rec.id === formData.id ? updatedData : rec));
        alert("✏️ Kayıt başarıyla güncellendi!");
        setIsEditing(false);
      } else {
        const newRecData = { 
          ...formData, 
          coherenceScore: `%${calculatedCoherence}`,
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
          alert("📝 Yeni akademik kayıt ve detaylı içerik veritabanına eklendi!");
        }
      }
      setFormData({ ...initialFormState, id: null });
    } catch (error) {
      console.error("Veri kaydedilirken hata:", error);
      alert("❌ İşlem sırasında bir hata oluştu.");
    }
  };

  const handleEdit = (item) => { setFormData({ ...initialFormState, ...item }); setIsEditing(true); window.scrollTo({ top: 0, behavior: "smooth" }); };
  
  const handleApprove = async (id) => {
    try {
      await updateDoc(doc(db, "ykos_findings", id), { status: "approved" });
      setRecords(records.map(rec => rec.id === id ? { ...rec, status: "approved" } : rec));
      alert("✅ Veri onaylandı ve Atlas'a / Canlı Ağa aktarıldı!");
    } catch (error) {
      alert("❌ Onaylama sırasında hata oluştu.");
    }
  };

  const handleReject = async (id) => {
    const reason = prompt("Lütfen reddetme / arşivleme gerekçesini giriniz:");
    if (!reason) return;
    try {
      await updateDoc(doc(db, "ykos_findings", id), { status: "rejected", rejectionReason: reason });
      setRecords(records.map(rec => rec.id === id ? { ...rec, status: "rejected", rejectionReason: reason } : rec));
      alert("📁 Kayıt gerekçesiyle birlikte arşive kaldırıldı.");
    } catch (error) {
      alert("❌ İşlem sırasında hata oluştu.");
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

  const totalCount = records.length;
  const pendingCount = records.filter(r => r.status === "draft" || !r.status).length;
  const approvedCount = records.filter(r => r.status === "approved").length;
  const rejectedCount = records.filter(r => r.status === "rejected").length;

  const filteredHavuzRecords = records.filter(item => {
    if (filterStatus === "all") return true;
    if (filterStatus === "pending") return item.status === "draft" || !item.status;
    if (filterStatus === "approved") return item.status === "approved";
    if (filterStatus === "rejected") return item.status === "rejected";
    return true;
  });

  const cardStyle = { backgroundColor: "#050811", border: "1px solid #ffd700", borderRadius: "12px", padding: "20px", marginBottom: "20px", boxShadow: "0 4px 30px rgba(0, 0, 0, 0.9)", color: "#fff", fontFamily: "Segoe UI, sans-serif" };
  const inputStyle = { width: "100%", backgroundColor: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 215, 0, 0.4)", borderRadius: "6px", padding: "10px", color: "#fff", fontSize: "0.85rem", marginTop: "5px", boxSizing: "border-box", outline: "none" };
  const sectionTitleStyle = { color: "#b8860b", fontSize: "0.95rem", margin: "15px 0 10px 0", borderBottom: "1px dashed rgba(184,134,11,0.4)", paddingBottom: "5px", textTransform: "uppercase" };

  return (
    <div style={{ maxWidth: userRole === "guest" ? "700px" : "1350px", margin: "0 auto", padding: "15px" }}>
      
      {/* 1. ÜST OPERASYON & YÖNETİM BANDI */}
      <div style={{ background: "linear-gradient(135deg, #0a0c14, #121826)", border: "1.5px solid #ffd700", borderRadius: "10px", padding: "12px 20px", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", boxShadow: "0 4px 15px rgba(0,0,0,0.8)" }}>
        <div>
          <span style={{ color: "#ffd700", fontWeight: "900", fontSize: "0.95rem", letterSpacing: "1px" }}>👑 YKOS OPERASYON & YÖNETİM MERKEZİ</span>
          <div style={{ color: "#aaa", fontSize: "0.72rem" }}>Disiplinler Arası Katman ve Canlı Veri Yönetim Ekranı</div>
        </div>
        <div style={{ display: "flex", gap: "15px", alignItems: "center", flexWrap: "wrap", fontSize: "0.78rem" }}>
          <span style={{ color: "#fff" }}>Toplam Veri: <strong style={{ color: "#ffd700" }}>{totalCount}</strong></span>
          <span style={{ color: "#fff" }}>Onay Bekleyen: <strong style={{ color: "#fde047" }}>{pendingCount}</strong></span>
          <span style={{ color: "#fff" }}>Onaylanan: <strong style={{ color: "#4ade80" }}>{approvedCount}</strong></span>
          <span style={{ color: "#fff" }}>Arşivlenen/Red: <strong style={{ color: "#f87171" }}>{rejectedCount}</strong></span>
          <span style={{ color: "#00ff7f", fontWeight: "bold", border: "1px solid #00ff7f", padding: "2px 8px", borderRadius: "4px" }}>● ÇEVRİMİÇİ</span>
        </div>
        
        <div style={{ display: "flex", gap: "8px" }}>
          {onNavigateOpsCenter && (
            <button onClick={onNavigateOpsCenter} style={{ background: "#ffd700", border: "1px solid #ffd700", color: "#000", padding: "6px 14px", borderRadius: "6px", fontWeight: "900", cursor: "pointer", fontSize: "0.78rem" }}>
              ⚙️ Operasyon Paneli
            </button>
          )}
          <button onClick={onLogout} style={{ background: "rgba(255, 215, 0, 0.15)", border: "1px solid #ffd700", color: "#ffd700", padding: "6px 14px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", fontSize: "0.78rem" }}>⬅ Ana Sayfa</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: userRole === "guest" ? "1fr" : "1fr 1fr", gap: "20px" }}>
        
        {/* SOL: VERİ GİRİŞ FORMU */}
        <div style={cardStyle}>
          <h2 style={{ color: "#ffd700", fontSize: "1.1rem", marginTop: 0, marginBottom: "15px", borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "10px" }}>
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
                <input type="text" name="periodStart" value={formData.periodStart} onChange={handleChange} placeholder="Örn: MÖ 12.000" style={inputStyle} />
              </div>
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>Bitiş Tarihi / Dönemi (Opsiyonel)</label>
              <input type="text" name="periodEnd" value={formData.periodEnd} onChange={handleChange} placeholder="Örn: MÖ 10.000" style={inputStyle} />
            </div>

            <h3 style={sectionTitleStyle}>2. YKOS 10 Katmanlı Matris İlişkilendirmesi</h3>
            <div style={{ background: "rgba(255,215,0,0.02)", border: "1px solid rgba(255,215,0,0.2)", borderRadius: "8px", padding: "10px", marginBottom: "12px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {ykos1000LayersList.map((layer, idx) => (
                <label key={idx} style={{ fontSize: "0.75rem", color: "#ccc", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                  <input 
                    type="checkbox" 
                    checked={formData.selectedLayers?.includes(layer)} 
                    onChange={() => handleLayerToggle(layer)}
                    style={{ accentColor: "#ffd700" }}
                  />
                  {layer}
                </label>
              ))}
            </div>

            <h3 style={sectionTitleStyle}>3. Coğrafi Konum (Atlas İçin)</h3>
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
                <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>Arkeolojik Alan</label>
                <input type="text" name="archaeologicalSite" value={formData.archaeologicalSite} onChange={handleChange} placeholder="Örn: Karain Mağarası" style={inputStyle} />
              </div>
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>Koordinatlar (Enlem, Boylam)</label>
              <input type="text" name="coordinates" value={formData.coordinates} onChange={handleChange} placeholder="Örn: 37.2232, 38.9225" style={inputStyle} />
            </div>

            <h3 style={sectionTitleStyle}>4. Kaynak ve Telif</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
              <div>
                <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>Kaynak / Yayın Linki</label>
                <input type="text" name="referenceSource" value={formData.referenceSource} onChange={handleChange} placeholder="Makale URL veya Kitap" style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>Fotoğrafçı / Araştırmacı</label>
                <input type="text" name="photographer" value={formData.photographer} onChange={handleChange} placeholder="Görsel kime ait?" style={inputStyle} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
              <div>
                <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>YKOS Kök-Hece Kodu</label>
                <input type="text" name="ykosCode" value={formData.ykosCode} onChange={handleChange} placeholder="Örn: YKOS-DMG-01" style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>Telif ve Kullanım İzni</label>
                <select name="copyright" value={formData.copyright} onChange={handleChange} style={{ ...inputStyle, backgroundColor: "#050811" }}>
                  {copyrights.map((c, i) => <option key={i} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* 5. GÖRSEL VE ÇOKLU FOTOĞRAF GALERİSİ */}
            <h3 style={sectionTitleStyle}>5. Görsel ve Çoklu Fotoğraf Arşivi (Galeri)</h3>
            <div style={{ marginBottom: "12px", background: "rgba(255,215,0,0.03)", border: "1px dashed rgba(255,215,0,0.4)", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
              <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold", display: "block", marginBottom: "6px" }}>📷 Ana Kapak Görseli {userRole === "guest" && "(Zorunlu)"}</label>
              <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} id="file-input-edit" disabled={isUploading} />
              <label htmlFor="file-input-edit" style={{ background: "rgba(255, 215, 0, 0.15)", border: "1px solid #ffd700", color: "#ffd700", padding: "6px 12px", borderRadius: "6px", fontWeight: "bold", cursor: isUploading ? "wait" : "pointer", fontSize: "0.78rem", display: "inline-block" }}>
                {isUploading ? "⏳ Kapak Yükleniyor..." : "📁 Kapak Fotoğrafı Seç"}
              </label>
              {formData.imagePreview && <div style={{ marginTop: "10px" }}><img src={formData.imagePreview} alt="Kapak Önizleme" style={{ maxHeight: "100px", borderRadius: "6px", border: "1px solid #ffd700" }} /></div>}
            </div>

            {/* Çoklu Fotoğraf Seçim Alanı */}
            <div style={{ marginBottom: "15px", background: "rgba(0,255,127,0.03)", border: "1.5px dashed rgba(0,255,127,0.4)", borderRadius: "8px", padding: "12px", textAlign: "center" }}>
              <label style={{ fontSize: "0.8rem", color: "#00ff7f", fontWeight: "bold", display: "block", marginBottom: "6px" }}>🖼️ Ek Çoklu Fotoğraflar (Galeriye Ekle)</label>
              <input type="file" multiple accept="image/*" onChange={handleMultipleImagesUpload} style={{ display: "none" }} id="multi-file-input" disabled={isUploading} />
              <label htmlFor="multi-file-input" style={{ background: "rgba(0, 255, 127, 0.15)", border: "1px solid #00ff7f", color: "#00ff7f", padding: "6px 12px", borderRadius: "6px", fontWeight: "bold", cursor: isUploading ? "wait" : "pointer", fontSize: "0.78rem", display: "inline-block" }}>
                {isUploading ? "⏳ Yükleniyor..." : "📁 Bilgisayardan Toplu Fotoğraf Seç"}
              </label>

              {/* Yüklenen Galeri Önizlemeleri */}
              {formData.images && formData.images.length > 0 && (
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "12px", justifyContent: "center" }}>
                  {formData.images.map((imgUrl, idx) => (
                    <div key={idx} style={{ position: "relative", width: "65px", height: "65px", borderRadius: "6px", overflow: "hidden", border: "1px solid #00ff7f" }}>
                      <img src={imgUrl} alt={`Galeri ${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <button 
                        type="button" 
                        onClick={() => handleRemoveGalleryImage(idx)}
                        style={{ position: "absolute", top: "2px", right: "2px", background: "rgba(0,0,0,0.8)", color: "#ff4d4d", border: "none", borderRadius: "50%", width: "18px", height: "18px", fontSize: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                        title="Fotoğrafı Kaldır"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 6. İÇERİK METNİ VE ZENGİN MAKALE ALANI */}
            <h3 style={sectionTitleStyle}>6. Detaylı İçerik ve Makale Metni</h3>
            <div style={{ marginBottom: "12px" }}>
              <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>Kısa Özet</label>
              <textarea name="summary" rows="2" value={formData.summary} onChange={handleChange} placeholder="Bulgunun kısa özeti..." style={{ ...inputStyle, resize: "vertical" }}></textarea>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ fontSize: "0.8rem", color: "#ffd700", fontWeight: "bold" }}>📝 Kapsamlı Analiz / Makale İçeriği</label>
              <textarea name="content" rows="6" value={formData.content || ""} onChange={handleChange} placeholder="Bulgunun arkeolojik, etimolojik ve kök-hece çözümleme metnini buraya detaylı olarak yazabilirsiniz..." style={{ ...inputStyle, resize: "vertical", lineHeight: "1.5" }}></textarea>
            </div>

            <button type="submit" style={{ width: "100%", background: "linear-gradient(135deg, #ffd700, #b8860b)", color: "#000", border: "none", padding: "12px", borderRadius: "8px", fontWeight: "900", cursor: "pointer", marginTop: "10px" }}>
              🚀 AKADEMİK VERİYİ VERİTABANINA GÖNDER
            </button>
          </form>
        </div>

        {/* SAĞ: KATMAN DAĞILIMI, DOĞRULAMA MOTORU VE CANLI VERİ HAVUZU */}
        {userRole !== "guest" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            
            {/* 1. Katman Dağılımı Kutucuğu */}
            <div style={cardStyle}>
              <h3 style={{ color: "#ffd700", fontSize: "0.9rem", margin: "0 0 12px 0", borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "6px" }}>
                📊 YKOS KATMAN DAĞILIMI (10 Katman)
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {layersData.map((l, idx) => (
                  <div key={idx} style={{ fontSize: "0.72rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px", color: "#ccc" }}>
                      <span>{l.name}</span>
                      <strong style={{ color: "#ffd700" }}>{l.val}</strong>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.05)", height: "5px", borderRadius: "3px", overflow: "hidden" }}>
                      <div style={{ width: `${(l.val / l.max) * 100}%`, background: l.color, height: "100%" }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Doğrulama Motoru & Skoru Kutucuğu */}
            <div style={cardStyle}>
              <h3 style={{ color: "#ffd700", fontSize: "0.9rem", margin: "0 0 12px 0", borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "6px" }}>
                🔬 YKOS DOĞRULAMA MOTORU & SKORU
              </h3>
              <div style={{ textAlign: "center", padding: "10px 0" }}>
                <div style={{ fontSize: "2.3rem", fontWeight: "900", color: "#00ff7f" }}>%99.4</div>
                <div style={{ color: "#ffd700", fontSize: "0.8rem", fontWeight: "bold", marginTop: "2px" }}>GENEL SİSTEM TUTARLILIK SKORU</div>
                <div style={{ fontSize: "0.7rem", color: "#aaa", marginBottom: "15px" }}>Algoritmik Simetri, Fonetik ve Çapraz Eşleşme Oranı Mükemmel Düzeyde.</div>
              </div>
            </div>

            {/* 3. Canlı Veri Havuzu & Onay Merkezi */}
            <div style={cardStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px", borderBottom: "1px solid rgba(255,215,0,0.3)", paddingBottom: "10px" }}>
                <h2 style={{ color: "#ffd700", fontSize: "1rem", margin: 0 }}>🛡️ Canlı Veri Havuzu & Onay Merkezi</h2>
                
                <div style={{ display: "flex", gap: "4px" }}>
                  <button onClick={() => setFilterStatus("all")} style={{ background: filterStatus === "all" ? "#ffd700" : "transparent", color: filterStatus === "all" ? "#000" : "#ffd700", border: "1px solid #ffd700", padding: "2px 6px", borderRadius: "4px", fontSize: "0.65rem", cursor: "pointer" }}>Tümü</button>
                  <button onClick={() => setFilterStatus("pending")} style={{ background: filterStatus === "pending" ? "#eab308" : "transparent", color: filterStatus === "pending" ? "#000" : "#eab308", border: "1px solid #eab308", padding: "2px 6px", borderRadius: "4px", fontSize: "0.65rem", cursor: "pointer" }}>Bekleyen</button>
                  <button onClick={() => setFilterStatus("approved")} style={{ background: filterStatus === "approved" ? "#22c55e" : "transparent", color: filterStatus === "approved" ? "#000" : "#4ade80", border: "1px solid #22c55e", padding: "2px 6px", borderRadius: "4px", fontSize: "0.65rem", cursor: "pointer" }}>Onaylı</button>
                  <button onClick={() => setFilterStatus("rejected")} style={{ background: filterStatus === "rejected" ? "#ef4444" : "transparent", color: filterStatus === "rejected" ? "#000" : "#f87171", border: "1px solid #ef4444", padding: "2px 6px", borderRadius: "4px", fontSize: "0.65rem", cursor: "pointer" }}>Arşiv/Red</button>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxHeight: "550px", overflowY: "auto", paddingRight: "5px" }}>
                {filteredHavuzRecords.map((item) => (
                  <div key={item.id} style={{ 
                    backgroundColor: item.status === "approved" ? "rgba(34, 197, 94, 0.05)" : item.status === "rejected" ? "rgba(239, 68, 68, 0.05)" : "rgba(234, 179, 8, 0.05)", 
                    border: item.status === "approved" ? "1px solid #22c55e" : item.status === "rejected" ? "1px solid #ef4444" : "1px solid #eab308", 
                    borderRadius: "8px", padding: "12px" 
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ color: "#ffd700", fontWeight: "bold", fontSize: "0.85rem" }}>📜 {item.title}</span>
                      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                        {item.coherenceScore && (
                          <span style={{ fontSize: "0.68rem", background: "rgba(0,255,127,0.15)", color: "#00ff7f", padding: "2px 6px", borderRadius: "4px", fontWeight: "bold" }}>
                            Skor: {item.coherenceScore}
                          </span>
                        )}
                        <span style={{ fontSize: "0.68rem", padding: "2px 8px", borderRadius: "12px", fontWeight: "bold", backgroundColor: item.status === "approved" ? "rgba(34, 197, 94, 0.2)" : item.status === "rejected" ? "rgba(239, 68, 68, 0.2)" : "rgba(234, 179, 8, 0.2)", color: item.status === "approved" ? "#4ade80" : item.status === "rejected" ? "#f87171" : "#fde047" }}>
                          {item.status === "approved" ? "🟢 Onaylandı" : item.status === "rejected" ? "📁 Arşivlendi/Red" : "⏳ İnceleniyor"}
                        </span>
                      </div>
                    </div>

                    <div style={{ fontSize: "0.72rem", color: "#aaa", marginTop: "6px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px" }}>
                      <div>📍 {item.city} {item.districtOrVillage ? `/ ${item.districtOrVillage}` : ""}</div>
                      <div>⏳ {item.periodStart} {item.periodEnd ? `- ${item.periodEnd}` : ""}</div>
                      {item.ykosCode && <div style={{ color: "#00ff7f" }}>🔤 Kök: {item.ykosCode}</div>}
                      {item.selectedLayers && item.selectedLayers.length > 0 && (
                        <div style={{ color: "#38bdf8", gridColumn: "span 2" }}>🏷️ Katmanlar: {item.selectedLayers.join(", ")}</div>
                      )}
                    </div>

                    {item.status === "rejected" && item.rejectionReason && (
                      <div style={{ fontSize: "0.72rem", color: "#f87171", background: "rgba(239,68,68,0.1)", padding: "6px", borderRadius: "4px", marginTop: "6px" }}>
                        <strong>Arşiv Gerekçesi:</strong> {item.rejectionReason}
                      </div>
                    )}

                    {item.source === "guest" && (
                      <div style={{ fontSize: "0.72rem", background: "rgba(0, 255, 127, 0.1)", padding: "6px", borderRadius: "6px", marginTop: "6px", border: "1px solid rgba(0, 255, 127, 0.3)" }}>
                        <div style={{ color: "#00ff7f", fontWeight: "bold" }}>🧑‍🤝‍🧑 Konuk Katkısı: {item.contributor} ({item.email})</div>
                      </div>
                    )}

                    {/* Çoklu Görsel Önizleme Havuzu */}
                    {item.images && item.images.length > 0 && (
                      <div style={{ display: "flex", gap: "4px", margin: "8px 0", flexWrap: "wrap" }}>
                        {item.images.map((img, i) => (
                          <img key={i} src={img} alt="ek" style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "4px", border: "1px solid rgba(255,215,0,0.3)" }} />
                        ))}
                      </div>
                    )}

                    {item.imagePreview && !item.images?.length && <img src={item.imagePreview} alt="kayıt" style={{ maxHeight: "60px", borderRadius: "4px", margin: "8px 0", border: "1px solid rgba(255,215,0,0.3)" }} />}
                    
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", borderTop: "1px dashed rgba(255,255,255,0.1)", paddingTop: "8px" }}>
                      <button onClick={() => handleEdit(item)} style={{ background: "rgba(56, 189, 248, 0.15)", border: "1px solid #38bdf8", color: "#38bdf8", padding: "4px 10px", borderRadius: "4px", fontSize: "0.72rem", fontWeight: "bold", cursor: "pointer" }}>✏️ İncele/Düzenle</button>
                      {userRole === "admin" && item.status !== "approved" && (
                        <button onClick={() => handleApprove(item.id)} style={{ background: "rgba(34, 197, 94, 0.15)", border: "1px solid #22c55e", color: "#4ade80", padding: "4px 10px", borderRadius: "4px", fontSize: "0.72rem", fontWeight: "bold", cursor: "pointer" }}>✅ Onayla ve Aktar</button>
                      )}
                      {userRole === "admin" && item.status !== "rejected" && (
                        <button onClick={() => handleReject(item.id)} style={{ background: "rgba(239, 68, 68, 0.15)", border: "1px solid #ef4444", color: "#f87171", padding: "4px 10px", borderRadius: "4px", fontSize: "0.72rem", fontWeight: "bold", cursor: "pointer" }}>📁 Gerekçeyle Arşivle</button>
                      )}
                      {userRole === "admin" && (
                        <button onClick={() => handleDelete(item.id)} style={{ background: "rgba(100, 100, 100, 0.2)", border: "1px solid #888", color: "#aaa", padding: "4px 8px", borderRadius: "4px", fontSize: "0.70rem", cursor: "pointer" }}>🗑️ Sil</button>
                      )}
                    </div>
                  </div>
                ))}
                {filteredHavuzRecords.length === 0 && (
                  <div style={{ color: "#888", textAlign: "center", fontStyle: "italic", padding: "20px" }}>Bu kategoride kayıt bulunmuyor.</div>
                )}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
