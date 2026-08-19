import React, { useState } from 'react';
import { db } from '../data/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const AcikVeriPortali = () => {
  const [formData, setFormData] = useState({
    baslik: '',
    kategori: 'Damga',
    bolge: 'Anadolu',
    aciklama: '',
    gorselUrl: ''
  });
  
  const [yukleniyor, setYukleniyor] = useState(false);

  // Form alanları değiştikçe state'i günceller
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Gönder butonuna basıldığında Firebase'e yazar
  const handleSubmit = async (e) => {
    e.preventDefault();
    setYukleniyor(true);

    try {
      // Firebase 'bulgular' koleksiyonuna veri ekleme
      await addDoc(collection(db, "bulgular"), {
        baslik: formData.baslik,
        kategori: formData.kategori,
        bolge: formData.bolge,
        aciklama: formData.aciklama,
        gorselUrl: formData.gorselUrl || "Görsel eklenmedi", 
        eklenmeTarihi: serverTimestamp(),
        durum: "beklemede" // Bu sayede sadece Yönetici onaylarsa yayına girer
      });

      alert("Harika! Bulgunuz YKOS sistemine başarıyla gönderildi. Yönetici onayından sonra veri havuzunda yerini alacaktır.");
      
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
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#1a1a1a', border: '1px solid #FFD700', borderRadius: '8px', padding: '30px' }}>
        
        <h2 style={{ color: '#FFD700', textAlign: 'center', marginBottom: '10px', borderBottom: '1px solid #333', paddingBottom: '15px' }}>
          YKOS AÇIK VERİ PORTALI
        </h2>
        <p style={{ textAlign: 'center', color: '#ccc', fontSize: '14px', marginBottom: '30px' }}>
          Anadolu ve dünya genelindeki antik tamga, petroglif ve kök-hece bulgularını sisteme ekleyerek YKOS veritabanına katkıda bulunun.
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
              style={{ width: '100%', padding: '10px', backgroundColor: '#222', color: '#fff', border: '1px solid #444', borderRadius: '4px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            {/* Kategori */}
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', color: '#FFD700', marginBottom: '5px', fontSize: '14px' }}>Kategori</label>
              <select 
                name="kategori" 
                value={formData.kategori} 
                onChange={handleChange}
                style={{ width: '100%', padding: '10px', backgroundColor: '#222', color: '#fff', border: '1px solid #444', borderRadius: '4px' }}
              >
                <option value="Damga">Damga</option>
                <option value="Petroglif">Petroglif</option>
                <option value="Kök-Hece">Kök-Hece</option>
                <option value="Yazıt">Yazıt</option>
                <option value="Kurgan / Dikilitaş">Kurgan / Dikilitaş</option>
              </select>
            </div>

            {/* Bölge */}
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', color: '#FFD700', marginBottom: '5px', fontSize: '14px' }}>Bölge</label>
              <select 
                name="bolge" 
                value={formData.bolge} 
                onChange={handleChange}
                style={{ width: '100%', padding: '10px', backgroundColor: '#222', color: '#fff', border: '1px solid #444', borderRadius: '4px' }}
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

          {/* Açıklama */}
          <div>
            <label style={{ display: 'block', color: '#FFD700', marginBottom: '5px', fontSize: '14px' }}>Bulgu Açıklaması</label>
            <textarea 
              name="aciklama"
              value={formData.aciklama}
              onChange={handleChange}
              rows="4"
              placeholder="Bulgunun tarihi, fiziksel özellikleri ve YKOS metodolojisine göre analizi..."
              style={{ width: '100%', padding: '10px', backgroundColor: '#222', color: '#fff', border: '1px solid #444', borderRadius: '4px', resize: 'vertical' }}
            ></textarea>
          </div>

          {/* Gönder Butonu */}
          <button 
            type="submit" 
            disabled={yukleniyor}
            style={{ 
              marginTop: '10px', 
              padding: '12px', 
              backgroundColor: yukleniyor ? '#666' : '#FFD700', 
              color: '#000', 
              border: 'none', 
              borderRadius: '4px', 
              fontWeight: 'bold', 
              cursor: yukleniyor ? 'wait' : 'pointer',
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