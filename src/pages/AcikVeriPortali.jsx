// src/pages/AcikVeriPortali.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../data/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { uploadImageToImgBB } from '../api/imageService';

const AcikVeriPortali = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    isimSoyisim: "",
    eposta: "",
    bulguBasligi: "",
    kategori: "Damga & Sembol",
    bulguBolgesi: "",
    bulguAciklamasi: "",
    manşetGorsel: null,
    galeriGorselleri: []
  });

  const [yukleniyor, setYukleniyor] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMansetUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const url = await uploadImageToImgBB(file);
      if (url) {
        setFormData(prev => ({ ...prev, manşetGorsel: url }));
        alert("Manşet görseli başarıyla yüklendi!");
      }
    } catch (err) {
      console.error(err);
      alert("Görsel yüklenemedi.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.isimSoyisim.trim() || !formData.bulguBasligi.trim()) {
      return alert("⚠️ Lütfen zorunlu alanları doldurunuz.");
    }

    setYukleniyor(true);
    try {
      await addDoc(collection(db, "ykos_findings"), {
        ...formData,
        status: "draft",
        source: "guest",
        eklenmeTarihi: serverTimestamp()
      });
      alert("🎉 Bulgularınız TÜDİTAM Bilim Kurulu onayına gönderilmiştir!");
      setFormData({
        isimSoyisim: "", eposta: "", bulguBasligi: "",
        kategori: "Damga & Sembol", bulguBolgesi: "",
        bulguAciklamasi: "", manşetGorsel: null, galeriGorselleri: []
      });
    } catch (error) {
      console.error(error);
      alert("Gönderim sırasında hata oluştu.");
    } finally {
      setYukleniyor(false);
    }
  };

  const inputStyle = { width: '100%', padding: '10px', backgroundColor: '#1a1a1a', color: '#fff', border: '1px solid #444', borderRadius: '4px', boxSizing: 'border-box', marginTop: '5px' };

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '30px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto', backgroundColor: '#0d0d0d', border: '1.5px solid #FFD700', borderRadius: '10px', padding: '25px', boxShadow: '0 0 25px rgba(255,215,0,0.15)' }}>
        
        {/* ANA SAYFAYA DÖNÜŞ BUTONU */}
        <button 
          onClick={() => navigate("/")} 
          style={{
            background: "linear-gradient(135deg, #ffd700, #b8860b)",
            color: "#000",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            fontWeight: "900",
            fontSize: "0.8rem",
            cursor: "pointer",
            marginBottom: "20px"
          }}
        >
          ← Ana Sayfaya Dön
        </button>

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h2 style={{ color: '#FFD700', fontSize: '1.3rem', margin: '0 0 5px 0', fontWeight: '900' }}>
            🌐 AÇIK VERİ & KONUK BULGU GİRİŞİ
          </h2>
          <p style={{ color: '#aaa', fontSize: '0.8rem', margin: 0 }}>
            Gönderilen bulgular TÜDİTAM Bilim Kurulu onayından sonra canlı arşive aktarılacaktır.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={{ fontSize: '0.78rem', color: '#FFD700', fontWeight: 'bold' }}>👤 İSİM SOYİSİM *</label>
              <input type="text" name="isimSoyisim" value={formData.isimSoyisim} onChange={handleChange} placeholder="Örn: Yaşar Kaba" style={inputStyle} required />
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={{ fontSize: '0.78rem', color: '#FFD700', fontWeight: 'bold' }}>✉️ E-POSTA *</label>
              <input type="email" name="eposta" value={formData.eposta} onChange={handleChange} placeholder="ornek@eposta.com" style={inputStyle} required />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', color: '#FFD700', fontWeight: 'bold' }}>📌 BULGU BAŞLIĞI *</label>
            <input type="text" name="bulguBasligi" value={formData.bulguBasligi} onChange={handleChange} placeholder="Örn: Göbeklitepe T-Sütunu Çizgi Analizi" style={inputStyle} required />
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={{ fontSize: '0.78rem', color: '#FFD700', fontWeight: 'bold' }}>🏷️ KATEGORİ</label>
              <select name="kategori" value={formData.kategori} onChange={handleChange} style={inputStyle}>
                <option value="Damga & Sembol">Damga & Sembol</option>
                <option value="Petroglif">Petroglif</option>
                <option value="Yazıt">Yazıt</option>
                <option value="Kurgan & Mimari">Kurgan & Mimari</option>
              </select>
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={{ fontSize: '0.78rem', color: '#FFD700', fontWeight: 'bold' }}>📍 BULGU BÖLGESİ</label>
              <input type="text" name="bulguBolgesi" value={formData.bulguBolgesi} onChange={handleChange} placeholder="Örn: Şanlıurfa / Göbeklitepe" style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', color: '#FFD700', fontWeight: 'bold' }}>📝 BULGU AÇIKLAMASI & OKUMA ANALİZİ</label>
            <textarea name="bulguAciklamasi" value={formData.bulguAciklamasi} onChange={handleChange} rows="3" placeholder="Bulgunun detayları, morfolojik yapısı ve kaynaklar..." style={{ ...inputStyle, resize: 'vertical' }}></textarea>
          </div>

          <div style={{ backgroundColor: '#141414', padding: '12px', borderRadius: '6px', border: '1.5px dashed #444' }}>
            <label style={{ fontSize: '0.78rem', color: '#FFD700', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>👑 MANŞET KAPAK GÖRSELİ</label>
            <input type="file" accept="image/*" onChange={handleMansetUpload} style={{ color: '#aaa', fontSize: '0.8rem' }} />
            {formData.manşetGorsel && <span style={{ color: '#00ff7f', fontSize: '11px', display: 'block', marginTop: '4px' }}>✔ Manşet görseli yüklendi</span>}
          </div>

          <button 
            type="submit" 
            disabled={yukleniyor}
            style={{ 
              marginTop: '10px', 
              padding: '12px', 
              backgroundColor: yukleniyor ? '#555' : '#FFD700', 
              color: '#000', 
              border: 'none', 
              borderRadius: '6px', 
              fontWeight: '900', 
              cursor: yukleniyor ? 'wait' : 'pointer',
              fontSize: '0.85rem'
            }}
          >
            {yukleniyor ? 'GÖNDERİLİYOR...' : 'BULGUYU TÜDİTAM KURUL ONAYINA GÖNDER'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AcikVeriPortali;
