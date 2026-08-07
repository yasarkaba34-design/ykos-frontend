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
// FILE: src/matrices/Matrix.jsx

import React, { useEffect, useState } from "react";
import metaLayer from "./meta/MetaLayer.json";

export default function Matrix() {
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    // MetaLayer verisini yükle
    setMeta(metaLayer);
  }, []);

  return (
    <div className="matrix-container" style={{ background: "#111", color: "gold", padding: "20px" }}>
      <h2>YKOS MetaKatman</h2>
      <pre style={{ fontFamily: "Courier New, monospace", fontSize: "14px" }}>
        {JSON.stringify(meta, null, 2)}
      </pre>
    </div>
  );
}
// FILE: src/matrices/Matrix.jsx

import React, { useEffect, useState } from "react";

// MetaKatman JSON'u
import metaLayer from "./meta/MetaLayer.json";

// Matris dosyaları
import M8 from "./m8.jsx";
import M11 from "./m11.jsx";
import M12 from "./m12.jsx";

export default function Matrix() {
  const [meta, setMeta] = useState(null);
  const [matrices, setMatrices] = useState([]);

  useEffect(() => {
    // MetaLayer yükleniyor
    setMeta(metaLayer);

    // Tüm matris modülleri yükleniyor
    setMatrices([
      { id: "m8", component: <M8 meta={metaLayer} /> },
      { id: "m11", component: <M11 meta={metaLayer} /> },
      { id: "m12", component: <M12 meta={metaLayer} /> }
    ]);
  }, []);

  return (
    <div style={{ background: "#111", color: "gold", padding: "20px" }}>
      <h2>YKOS Matrix Engine</h2>

      <h3>MetaLayer</h3>
      <pre style={{ fontFamily: "Courier New", fontSize: "14px" }}>
        {JSON.stringify(meta, null, 2)}
      </pre>

      <h3>Matris Modülleri</h3>
      {matrices.map((m) => (
        <div key={m.id} style={{ marginBottom: "20px" }}>
          <h4>{m.id.toUpperCase()}</h4>
          {m.component}
        </div>
      ))}
    </div>
  );
}
// FILE: src/matrices/Matrix.jsx

import HecePanel from "./components/HecePanel";

...

<div>
  <HecePanel />
</div>
// FILE: src/matrices/Matrix.jsx

import FluxPanel from "../flux/FluxPanel";

...

<div>
  <FluxPanel />
</div>
// FILE: src/matrices/Matrix.jsx

import EvaluatorPanel from "../evaluator/EvaluatorPanel";

...

<div>
  <EvaluatorPanel />
</div>
// FILE: src/matrices/Matrix.jsx

import UnifiedPanel from "../yunified/UnifiedPanel";

...

<div>
  <UnifiedPanel />
</div>
// FILE: src/matrices/Matrix.jsx

import AtlasMap from "../atlas/AtlasMap";

...

<div>
  <AtlasMap />
</div>
// FILE: src/matrices/Matrix.jsx

import CoreDashboard from "../dashboard/CoreDashboard";

...

<div>
  <CoreDashboard />
</div>
// FILE: src/matrices/Matrix.jsx

import DFlow from "../dflow/DFlow";

...

<div>
  <DFlow />
</div>
// FILE: src/matrices/Matrix.jsx

import Kernel from "../kernel/Kernel";

...

<div>
  <Kernel />
</div>
// FILE: src/matrices/Matrix.jsx

import RTE from "../runtime/RTE";

...

<div>
  <RTE />
</div>
// FILE: src/matrices/Matrix.jsx

import RTE from "../runtime/RTE";

...

<div>
  <RTE />
</div>
// FILE: src/matrices/Matrix.jsx

import RTE from "../runtime/RTE";

...


