import React, { useState, useEffect } from 'react';

export default function AdminPanel({ onLogout }) {
  const [records, setRecords] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const initialForm = {
    category: 'Kozmik & Kozmolojik Katman',
    title: '',
    summary: '',
    content: '',
    image: '',
    gallery: []
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = () => {
    const saved = localStorage.getItem('ykos_admin_records');
    if (saved) {
      try {
        setRecords(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const saveToStorage = (updated) => {
    setRecords(updated);
    localStorage.setItem('ykos_admin_records', JSON.stringify(updated));
  };

  const handleMansetUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result, mansetGorsel: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          gallery: [...(prev.gallery || []), reader.result]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  // YAYINLA VEYA GÜNCELLE
  const handleSave = () => {
    if (!formData.title) {
      alert("Lütfen başlık giriniz!");
      return;
    }

    if (editingId) {
      // GÜNCELLEME İŞLEMİ
      const updated = records.map(r => r.id === editingId ? {
        ...r,
        ...formData,
        tarih: new Date().toLocaleDateString('tr-TR')
      } : r);
      saveToStorage(updated);
      setEditingId(null);
      alert("İçerik başarıyla güncellendi!");
    } else {
      // YENİ EKLEME İŞLEMİ
      const item = {
        id: "YKOS-BULGU-" + Date.now(),
        ...formData,
        status: "approved",
        durum: "onaylandi",
        tarih: new Date().toLocaleDateString('tr-TR')
      };
      saveToStorage([item, ...records]);
      alert("Yeni içerik yayınlandı!");
    }

    setFormData(initialForm);
  };

  // DÜZENLEME MODUNA AL
  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      category: item.category || item.kategori || 'Kozmik & Kozmolojik Katman',
      title: item.title || item.baslik || '',
      summary: item.summary || item.ozet || '',
      content: item.content || item.icerik || '',
      image: item.image || item.mansetGorsel || '',
      gallery: item.gallery || item.galeri || []
    });
  };

  // SİLME İŞLEMİ
  const handleDelete = (id) => {
    if (window.confirm("Bu içeriği silmek istediğinize emin misiniz?")) {
      const updated = records.filter(r => r.id !== id);
      saveToStorage(updated);
      if (editingId === id) {
        setEditingId(null);
        setFormData(initialForm);
      }
    }
  };

  return (
    <div style={{ padding: '15px', color: '#fff', fontFamily: 'Segoe UI, sans-serif' }}>
      
      {/* ÜST BAR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ffd700', paddingBottom: '10px', marginBottom: '16px' }}>
        <h2 style={{ color: '#ffd700', margin: 0, fontSize: '1.25rem' }}>⚙️ YKOS İçerik & Haber Yönetim Paneli</h2>
        <button onClick={onLogout} style={{ padding: '6px 14px', background: '#e11d48', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem' }}>
          Çıkış Yap
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '16px' }}>
        
        {/* SOL: FORMU EKLE / DÜZENLE */}
        <div style={{ background: '#0b0c10', padding: '16px', borderRadius: '8px', border: '1px solid #333' }}>
          <h3 style={{ color: '#ffd700', marginTop: 0, fontSize: '0.95rem', borderBottom: '1px solid #222', paddingBottom: '6px' }}>
            {editingId ? '✏️ İçeriği Düzenle' : '➕ Yeni Kayıt & Haber Girişi'}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
            <label style={{ fontSize: '11px', color: '#ffd700' }}>Kategori</label>
            <select 
              value={formData.category} 
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              style={{ padding: '8px', background: '#1a1c23', border: '1px solid #444', color: '#fff', borderRadius: '4px', fontSize: '0.8rem' }}
            >
              <option>Kozmik & Kozmolojik Katman</option>
              <option>Küresel Erken Dönem & Arkeoloji</option>
              <option>Dil Katmanı & Evrensel Morfoloji</option>
              <option>Damga, Piktogram & Petroglif</option>
              <option>Kök-Hece Matrisi & Fonetik</option>
              <option>Kronoloji & Tarihsel Katmanlaşma</option>
              <option>Küresel Göç & Kültür Rotaları</option>
              <option>Semiyotik & Göstergebilim</option>
              <option>Yapay Zekâ & Algoritmik Doğrulama</option>
              <option>YKOS Meta Katmanı</option>
            </select>

            <label style={{ fontSize: '11px', color: '#ffd700' }}>Başlık</label>
            <input 
              type="text" 
              placeholder="İçerik Başlığı..." 
              value={formData.title} 
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={{ padding: '8px', background: '#1a1c23', border: '1px solid #444', color: '#fff', borderRadius: '4px', fontSize: '0.8rem' }}
            />

            <label style={{ fontSize: '11px', color: '#ffd700' }}>Özet</label>
            <textarea 
              rows="2" 
              placeholder="Kısa Özet..." 
              value={formData.summary} 
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              style={{ padding: '8px', background: '#1a1c23', border: '1px solid #444', color: '#fff', borderRadius: '4px', fontSize: '0.8rem' }}
            />

            <label style={{ fontSize: '11px', color: '#ffd700' }}>İçerik (Makale Metni)</label>
            <textarea 
              rows="4" 
              placeholder="Detaylı Açıklama..." 
              value={formData.content} 
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              style={{ padding: '8px', background: '#1a1c23', border: '1px solid #444', color: '#fff', borderRadius: '4px', fontSize: '0.8rem' }}
            />

            {/* MANŞET GÖRSEL */}
            <label style={{ fontSize: '11px', color: '#ffd700' }}>📸 Manşet Görsel</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleMansetUpload} 
              style={{ padding: '4px', background: '#14161d', border: '1px dashed #ffd700', borderRadius: '4px', color: '#aaa', fontSize: '11px' }}
            />
            {formData.image && (
              <img src={formData.image} alt="Önizleme" style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ffd700' }} />
            )}

            {/* BUTONLAR */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
              <button onClick={handleSave} style={{ flex: 1, padding: '10px', background: '#ffd700', color: '#000', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem' }}>
                {editingId ? '💾 DEĞİŞİKLİKLERİ KAYDET' : '⚡ DİREKT YAYINLA'}
              </button>
              {editingId && (
                <button onClick={() => { setEditingId(null); setFormData(initialForm); }} style={{ padding: '10px 14px', background: '#333', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '0.85rem' }}>
                  İptal
                </button>
              )}
            </div>
          </div>
        </div>

        {/* SAĞ: YAYINLANAN TÜM İÇERİKLERİN TABLOSU (HABERLER LİSTESİ) */}
        <div style={{ background: '#0b0c10', padding: '16px', borderRadius: '8px', border: '1px solid #333' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222', paddingBottom: '6px', marginBottom: '10px' }}>
            <h3 style={{ color: '#ffd700', margin: 0, fontSize: '0.95rem' }}>📋 YAYINLANAN TÜM İÇERİKLER ({records.length})</h3>
          </div>

          <div style={{ maxHeight: '420px', overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#161922', color: '#ffd700', borderBottom: '1px solid #333' }}>
                  <th style={{ padding: '8px' }}>Durum</th>
                  <th style={{ padding: '8px' }}>Başlık</th>
                  <th style={{ padding: '8px' }}>Kategori</th>
                  <th style={{ padding: '8px' }}>Tarih</th>
                  <th style={{ padding: '8px', textAlign: 'center' }}>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {records.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#666' }}>Henüz kayıt bulunmuyor.</td>
                  </tr>
                ) : (
                  records.map((item) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #1a1c24', background: editingId === item.id ? 'rgba(255, 215, 0, 0.08)' : 'transparent' }}>
                      <td style={{ padding: '8px' }}>
                        <span style={{ background: '#22c55e', color: '#000', padding: '2px 6px', borderRadius: '3px', fontWeight: 'bold', fontSize: '10px' }}>Aktif</span>
                      </td>
                      <td style={{ padding: '8px', color: '#fff', fontWeight: 'bold', maxWidth: '180px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.title || item.baslik}
                      </td>
                      <td style={{ padding: '8px', color: '#aaa', maxWidth: '120px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.category || item.kategori}
                      </td>
                      <td style={{ padding: '8px', color: '#888', whiteSpace: 'nowrap' }}>
                        {item.tarih || 'Bugün'}
                      </td>
                      <td style={{ padding: '8px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                        {/* DÜZENLE BUTONU */}
                        <button 
                          onClick={() => handleEdit(item)} 
                          title="Düzenle"
                          style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', marginRight: '5px', fontSize: '11px' }}
                        >
                          ✏️
                        </button>
                        {/* SİL BUTONU */}
                        <button 
                          onClick={() => handleDelete(item.id)} 
                          title="Sil"
                          style={{ background: '#e11d48', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}