import React from 'react';
import React from "react";
import ykos_roots from "../data/ykos_roots.js";

export default function Matris() {
  return (
    <div style={{ color: "gold", background: "black", padding: "20px" }}>
      <h2>Matris Modülü</h2>
      <pre>{JSON.stringify(ykos_roots, null, 2)}</pre>
    </div>
  );
}

// 'query' ve 'filter' proplarını yukarıdan teslim alıyoruz gari Hocam!
export default function Matris({ query, filter }) {
  
  // Örnek YKOS Semantik Veri Havuzu
  const veriler = [
    { id: 1, baslik: "Göbeklitepe T Sütunları", tur: "Antik Kent", konum: "Şanlıurfa, Türkiye", detay: "MÖ 9600 presesyon döngüsü m8 analizi." },
    { id: 2, baslik: "Ön-Türk Damgaları", tur: "Damga", konum: "Orhun Vadisi", detay: "Kozmik kökenli semantik damgalar." },
    { id: 3, baslik: "Yazılıkaya Kaya Kabartmaları", tur: "Yazıt", konum: "Çorum, Türkiye", detay: "Hitit panteonu ve astronomik hizalamalar." },
    { id: 4, baslik: "Saymalıtaş Petroglifleri", tur: "Petroglif", konum: "Kırgızistan", detay: "8000+ tescilli kaya resmi ve kozmik sembolizm." },
    { id: 5, baslik: "Alajassa Kalesi Çekirdeği", tur: "Antik Kent", konum: "Alajassa", detay: "Kutsal semantik merkez." },
    { id: 6, baslik: "Çatalhöyük Neolitik Yerleşimi", tur: "Höyük", konum: "Konya, Türkiye", detay: "İlk tarım toplulukları ve ana tanrıça damgaları." }
  ];

  // ⚡ SİBER FİLTRELEME MOTORU GARI!
  const filtrelenmisVeriler = veriler.filter((veri) => {
    // 1. Arama sorgusu filtresi (Başlık veya detayda eşleşme arar)
    const aramaUyumlu = 
      veri.baslik.toLowerCase().includes(query.toLowerCase()) || 
      veri.detay.toLowerCase().includes(query.toLowerCase());

    // 2. Buton filtrelemesi ("Hepsi" seçiliyse veya türler eşleşiyorsa)
    const filtreUyumlu = filter === "Hepsi" || veri.tur === filter;

    return aramaUyumlu && filtreUyumlu;
  });

  return (
    <div style={styles.matrisContainer}>
      <h3 style={styles.baslik}>Aktif Veri Segmenti ({filter})</h3>
      
      {filtrelenmisVeriler.length > 0 ? (
        <div style={styles.liste}>
          {filtrelenmisVeriler.map((veri) => (
            <div key={veri.id} style={styles.kart}>
              <div style={styles.kartUst}>
                <span style={styles.kartBaslik}>{veri.baslik}</span>
                <span style={styles.kartRozet}>{veri.tur}</span>
              </div>
              <p style={styles.kartDetay}>{veri.detay}</p>
              <small style={styles.kartKonum}>📍 {veri.konum}</small>
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.bosUyarisi}>
          Aranan kriterlere uygun semantik veri bulunamadı gari.
        </div>
      )}
    </div>
  );
}

// MATRİS İÇİ TASARIM STİLLERİ
const styles = {
  matrisContainer: {
    color: '#fff',
  },
  baslik: {
    fontSize: '18px',
    color: '#FFB800',
    marginBottom: '20px',
    borderBottom: '1px solid #222',
    paddingBottom: '10px'
  },
  liste: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  kart: {
    backgroundColor: '#161616',
    border: '1px solid #222',
    borderRadius: '6px',
    padding: '15px',
    transition: 'all 0.3s ease',
  },
  kartUst: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px'
  },
  kartBaslik: {
    fontWeight: 'bold',
    fontSize: '15px',
    color: '#fff'
  },
  kartRozet: {
    backgroundColor: 'rgba(255, 184, 0, 0.1)',
    color: '#FFB800',
    border: '1px solid #FFB800',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '10px',
    textTransform: 'uppercase'
  },
  kartDetay: {
    fontSize: '13px',
    color: '#aaa',
    margin: '0 0 10px 0',
    lineHeight: '1.4'
  },
  kartKonum: {
    fontSize: '11px',
    color: '#666'
  },
  bosUyarisi: {
    padding: '40px',
    textAlign: 'center',
    color: '#555',
    border: '1px dashed #222',
    borderRadius: '6px'
  }
};
