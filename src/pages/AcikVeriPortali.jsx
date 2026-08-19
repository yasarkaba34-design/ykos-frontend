import React, { useState } from 'react';
import { db } from '../data/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { uploadImageToImgBB } from '../api/imageService'; // Projedeki görsel servisimiz

const AcikVeriPortali = () => {
  const [formData, setFormData] = useState({
    baslik: '',
    kategori: 'Damga',
    bolge: 'Anadolu',
    aciklama: '',
    gorselUrl: ''
  });
  
  const [yukleniyor, setYukleniyor] = useState(false);
  const [resimYukleniyor, setResimYukleniyor] = useState(false);

  // Form alanları değiştikçe state'i günceller
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Bilgisayardan seçilen görseli ImgBB'ye yükleme
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setResimYukleniyor(true);
    try {
      const url = await uploadImageToImgBB(file);
      if (url) {
        setFormData(prev => ({ ...prev, gorselUrl: url }));
        alert("Görsel başarıyla yüklendi!");
      } else {
        alert("Görsel yüklenirken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Görsel yükleme hatası:", error);
      alert("Görsel yüklenemedi.");
    } finally {
      setResimYukleniyor(false);
    }
  };

  // Gönder butonuna basıldığında Firebase'e yazar
  const handleSubmit = async (e) => {
    e.preventDefault();
    setYukleniyor(true);

    try {
      await addDoc(collection(db, "bulgular"), {
        baslik: formData.baslik,
        kategori: formData.kategori,
        bolge: formData.bolge,
        aciklama: formData.aciklama,
        imagePreview: formData.gorselUrl || "", // Ana sayfada gösterim için
        gorselUrl: formData.gorselUrl || "Görsel eklenmedi", 
        eklenmeTarihi: serverTimestamp(),
        durum: "beklemede" // Yönetici onayından sonra yayınlanır
      });

      alert("Harika! Bulgunuz ve görseliniz YKOS sistemine başarıyla gönderildi. Yönetici onayından sonra veri havuzunda yerini alacaktır.");
      
      // Formu temizle
      setFormData({
        baslik: '',
        kategori: 'Damga',
        bolge: 'Anadolu',
        aciklama: '',
        gorselUrl: ''
      });

    } catch (error) {
      console.error("Veri gönderilirken hata oluştu: ", error);
      alert("Bir hata oluştu. Lütfen bağlantınızı kontrol edip tekrar deneyin.");
    } finally {
      setYukleniyor(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#111', color: '#fff', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '650px', margin: '0 auto', backgroundColor: '#1a1a1a', border: '1px solid #FFD700', borderRadius: '8px', padding: '30px' }}>
        
        <h2 style={{ color: '#FFD700', textAlign: 'center', marginBottom: '10px', borderBottom: '1px solid #333', paddingBottom: '15px' }}>
          YKOS AÇIK VERİ PORTALI
        </h2>
        <p style={{ textAlign: 'center', color: '#ccc', fontSize: '14px', marginBottom: '30px' }}>
          Anadolu ve dünya genelindeki antik tamga, petroglif ve kök-hece bulgularını görseliyle birlikte ekleyerek YKOS veritabanına katkıda bulunun.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Bulgu Başlığı */}
          <div>
            <label style={{ display: 'block', color: '#FFD700', marginBottom: '5px', fontSize: '14px' }}>Bulgu Başlığı (Zorunlu)</label>
            <input 
              type="text" 
              name="baslik"
              value={formData.baslik}
              onChange={handleChange}
              required
              placeholder="Örn: Antalya Karain Mağarası İşaretleri"
              style={{ width: '100%', padding: '10px', backgroundColor: '#222', color: '#fff', border: '1px solid #444', borderRadius: '4px', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            {/* Kategori */}
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={{ display: 'block', color: '#FFD700', marginBottom: '5px', fontSize: '14px' }}>Kategori</label>
              <select 
                name="kategori" 
                value={formData.kategori} 
                onChange={handleChange}
                style={{ width: '100%', padding: '10px', backgroundColor: '#222', color: '#fff', border: '1px solid #444', borderRadius: '4px', boxSizing: 'border-box' }}
              >
                <option value="Damga">Damga</option>
                <option value="Petroglif">Petroglif</option>
                <option value="Kök-Hece">Kök-Hece</option>
                <option value="Yazıt">Yazıt</option>
                <option value="Kurgan / Dikilitaş">Kurgan / Dikilitaş</option>
              </select>
            </div>

            {/* Bölge */}
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={{ display: 'block', color: '#FFD700', marginBottom: '5px', fontSize: '14px' }}>Bölge</label>
              <select 
                name="bolge" 
                value={formData.bolge} 
                onChange={handleChange}
                style={{ width: '100%', padding: '10px', backgroundColor: '#222', color: '#fff', border: '1px solid #444', borderRadius: '4px', boxSizing: 'border-box' }}
              >
                <option value="Anadolu">Anadolu</option>
                <option value="Orta Asya">Orta Asya</option>
                <option value="Kafkasya">Kafkasya</option>
                <option value="Mezopotamya">Mezopotamya</option>
                <option value="Avrupa">Avrupa</option>
                <option value="Diğer">Diğer</option>
              </select>
            </div>
          </div>

          {/* Görsel Yükleme Alanı */}
          <div>
            <label style={{ display: 'block', color: '#FFD700', marginBottom: '5px', fontSize: '14px' }}>Bulgu Görseli (Fotoğraf / Çizim)</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageUpload}
              style={{ width: '100%', padding: '8px', backgroundColor: '#222', color: '#fff', border: '1px solid #444', borderRadius: '4px', boxSizing: 'border-box' }}
            />
            {resimYukleniyor && <p style={{ color: '#00ff7f', fontSize: '12px', marginTop: '5px' }}>Görsel buluta yükleniyor, lütfen bekleyin...</p>}
            
            {/* Görsel Önizleme */}
            {formData.gorselUrl && (
              <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src={formData.gorselUrl} alt="Önizleme" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #FFD700' }} />
                <span style={{ color: '#00ff7f', fontSize: '12px' }}>Görsel başarıyla eklendi!</span>
              </div>
            )}
          </div>

          {/* Açıklama */}
          <div>
            <label style={{ display: 'block', color: '#FFD700', marginBottom: '5px', fontSize: '14px' }}>Bulgu Açıklaması</label>
            <textarea 
              name="aciklama"
              value={formData.aciklama}
              onChange={handleChange}
              rows="4"
              placeholder="Bulgunun tarihi, fiziksel özellikleri ve YKOS metodolojisine göre analizi..."
              style={{ width: '100%', padding: '10px', backgroundColor: '#222', color: '#fff', border: '1px solid #444', borderRadius: '4px', resize: 'vertical', boxSizing: 'border-box' }}
            ></textarea>
          </div>

          {/* Gönder Butonu */}
          <button 
            type="submit" 
            disabled={yukleniyor || resimYukleniyor}
            style={{ 
              marginTop: '10px', 
              padding: '12px', 
              backgroundColor: (yukleniyor || resimYukleniyor) ? '#666' : '#FFD700', 
              color: '#000', 
              border: 'none', 
              borderRadius: '4px', 
              fontWeight: 'bold', 
              cursor: (yukleniyor || resimYukleniyor) ? 'wait' : 'pointer',
              fontSize: '16px'
            }}
          >
            {yukleniyor ? 'SİSTEME GÖNDERİLİYOR...' : '🚀 SİSTEME GÖNDER'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AcikVeriPortali;
