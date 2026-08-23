import React, { useState } from 'react';

export default function YalinVeriGirisi() {
  const [kategori, setKategori] = useState('Anadolu Arkeolojisi & Erken Dönem');
  const [baslik, setBaslik] = useState('');
  const [ozet, setOzet] = useState('');
  const [icerik, setIcerik] = useState('');
  const [mansetFoto, setMansetFoto] = useState('');
  const [cokluFoto, setCokluFoto] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [mesaj, setMesaj] = useState('');

  const kategoriler = [
  "Kozmik & Kozmolojik Katman",
  "Küresel Erken Dönem & Arkeoloji",
  "Dil Katmanı & Evrensel Morfoloji",
  "Damga, Piktogram & Petroglif",
  "Kök-Hece Matrisi & Fonetik",
  "Kronoloji & Tarihsel Katmanlaşma",
  "Küresel Göç & Kültür Rotaları",
  "Semiyotik & Göstergebilim",
  "Yapay Zekâ & Algoritmik Doğrulama",
  "YKOS Meta Katmanı (Evrensel Bilgi Tabanı)"
];


  // Fotoğrafı Base64 formatına çevirme
  const handleMansetChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setMansetFoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCokluFotoChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCokluFoto(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setYukleniyor(true);

    const yeniKayit = {
      id: "YKOS-BULGU-" + Date.now(),
      kategori,
      title: baslik,
      baslik: baslik,
      ozet: ozet || baslik,
      description: ozet || baslik,
      icerik: icerik,
      content: icerik,
      mansetGorsel: mansetFoto,
      galeri: cokluFoto,
      status: "pending", // Yönetici onayına düşer
      durum: "beklemede",
      eklenmeTarihi: new Date().toLocaleString('tr-TR'),
      tarih: new Date().toISOString()
    };

    // Mevcut yerel kayıtlara ekle (Admin panelinin okuduğu havuz)
    try {
      const mevcut = JSON.parse(localStorage.getItem('ykos_admin_records') || '[]');
      mevcut.unshift(yeniKayit);
      localStorage.setItem('ykos_admin_records', JSON.stringify(mevcut));

      setMesaj('✅ Bulgunuz başarıyla iletildi! Yönetici onay havuzuna aktarıldı.');
      setBaslik('');
      setOzet('');
      setIcerik('');
      setMansetFoto('');
      setCokluFoto([]);
    } catch (err) {
      console.error(err);
      setMesaj('❌ Kayıt sırasında bir hata oluştu.');
    } finally {
      setYukleniyor(false);
    }
  };

  return (
    <div style={formStyles.wrapper}>
      <h3 style={formStyles.title}>BULGU & ARAŞTIRMA GİRİŞİ</h3>
      <form onSubmit={handleSubmit} style={formStyles.form}>
        
        <label style={formStyles.label}>Kategori Seçin</label>
        <select value={kategori} onChange={(e) => setKategori(e.target.value)} style={formStyles.input}>
          {kategoriler.map((kat, i) => (
            <option key={i} value={kat}>{kat}</option>
          ))}
        </select>

        <label style={formStyles.label}>Başlık</label>
        <input 
          type="text" 
          placeholder="Bulgunun veya bölgenin adı..." 
          value={baslik} 
          onChange={(e) => setBaslik(e.target.value)} 
          required 
          style={formStyles.input}
        />

        <label style={formStyles.label}>Özet</label>
        <textarea 
          placeholder="Kısaca ne gördünüz?" 
          value={ozet} 
          onChange={(e) => setOzet(e.target.value)} 
          rows="2" 
          style={formStyles.textarea}
        />

        <label style={formStyles.label}>İçeriğin Tamamı</label>
        <textarea 
          placeholder="Bulgunun detayları, bulunduğu mevki, taşın yapısı..." 
          value={icerik} 
          onChange={(e) => setIcerik(e.target.value)} 
          rows="5" 
          required 
          style={formStyles.textarea}
        />

        <label style={formStyles.label}>📸 Manşet Görsel (Ana Fotoğraf)</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleMansetChange} 
          style={formStyles.fileInput}
        />

        <label style={formStyles.label}>🖼️ Çoklu Foto (Detay Fotoğrafları)</label>
        <input 
          type="file" 
          accept="image/*" 
          multiple 
          onChange={handleCokluFotoChange} 
          style={formStyles.fileInput}
        />

        <button type="submit" disabled={yukleniyor} style={formStyles.button}>
          {yukleniyor ? 'YÜKLENİYOR...' : '⚡ BULGUYU GÖNDER'}
        </button>

        {mesaj && <div style={formStyles.alert}>{mesaj}</div>}
      </form>
    </div>
  );
}

const formStyles = {
  wrapper: { maxWidth: '560px', margin: '20px auto', padding: '24px', backgroundColor: '#0e1015', borderRadius: '12px', border: '1px solid #ffd700', color: '#fff', fontFamily: 'sans-serif', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' },
  title: { textAlign: 'center', color: '#ffd700', margin: '0 0 20px 0', fontSize: '18px', letterSpacing: '1px' },
  form: { display: 'flex', flexDirection: 'column', gap: '14px' },
  label: { fontSize: '13px', fontWeight: 'bold', color: '#e5e5e5' },
  input: { padding: '12px', borderRadius: '6px', border: '1px solid #333', backgroundColor: '#1a1c23', color: '#fff', fontSize: '14px' },
  textarea: { padding: '12px', borderRadius: '6px', border: '1px solid #333', backgroundColor: '#1a1c23', color: '#fff', fontSize: '14px', resize: 'vertical' },
  fileInput: { padding: '10px', backgroundColor: '#14161d', borderRadius: '6px', border: '1px dashed #555', color: '#aaa', fontSize: '13px', cursor: 'pointer' },
  button: { padding: '14px', backgroundColor: '#ffd700', color: '#000', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', marginTop: '10px' },
  alert: { padding: '12px', marginTop: '10px', textAlign: 'center', borderRadius: '6px', backgroundColor: '#1a2e1a', color: '#4ade80', fontSize: '13px', fontWeight: 'bold' }
};
