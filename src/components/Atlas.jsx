import React, { useState } from "react";
import TehnikPanel from "./TehnikPanel.jsx";
import { YKOS_DATA } from "../data/ykosData";

export default function Atlas({ onSelectRoot }) {
  return (
    <div>
      <h2>Atlas</h2>
      <p>Kök seç ve TehnikPanel’e gönderilsin.</p>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {YKOS_DATA.roots.map((root) => (
          <li
            key={root.name}
            onClick={() => onSelectRoot(root)}
            style={{
              padding: "10px",
              marginBottom: "8px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            <strong>{root.name}</strong> — {root.meaning}
          </li>
        ))}
      </ul>
    </div>
  );
}

const roots = [
  { name: "TUT", meaning: "Bağlamak, tutmak, kavramak" },
  { name: "KUR", meaning: "Kurmak, oluşturmak, yapı inşa etmek" },
  { name: "BA", meaning: "Başlangıç, çıkış, doğuş" },
  { name: "YOL", meaning: "Yol, akış, hareket, süreç" },
  { name: "BİR", meaning: "Birlik, bütünlük, tekillik" },
  { name: "KAL", meaning: "Kalmak, süreklilik, devamlılık" }
];

export default function Atlas({ onSelectRoot }) {
  return (
    <div>
      <h2>Atlas</h2>
      <p>Kök seç ve TehnikPanel’e gönderilsin.</p>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {roots.map((root) => (
          <li
            key={root.name}
            onClick={() => onSelectRoot(root)}
            style={{
              padding: "10px",
              marginBottom: "8px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            <strong>{root.name}</strong> — {root.meaning}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Geçici atlas verisi (JSON bağlayınca burayı değiştireceğiz)
const atlas = [
  { kök: "TUT", bölge: "Anadolu", kültür: "Proto-Türk", tarih: "MÖ 3000" },
  { kök: "KUR", bölge: "Orta Asya", kültür: "Göktürk", tarih: "MÖ 2000" },
  { kök: "BA", bölge: "Sümer", kültür: "Mezopotamya", tarih: "MÖ 2500" }
];

export default function Atlas() {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ display: "flex", gap: "30px", padding: "20px" }}>
      <div style={{ width: "40%" }}>
        <h2>YKOS Atlas – Kökler</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {atlas.map((item, index) => (
            <li
              key={index}
              onClick={() => setSelected(item)}
              style={{
                padding: "10px",
                marginBottom: "8px",
                background: "#004",
                color: "#fff",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              {item.kök}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ width: "60%" }}>
        {selected ? (
          <div>
            <h2>{selected.kök} – Atlas Bilgisi</h2>
            <p><strong>Bölge:</strong> {selected.bölge}</p>
            <p><strong>Kültür:</strong> {selected.kültür}</p>
            <p><strong>Tarih:</strong> {selected.tarih}</p>
          </div>
        ) : (
          <p style={{ color: "#666" }}>
            Bir kök seçtiğinde atlas bilgisi burada görünecek…
          </p>
        )}
      </div>
    </div>
  );
}
