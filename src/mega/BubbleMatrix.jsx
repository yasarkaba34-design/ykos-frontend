// ESKİ VE HATALI YOLLAR:
// import Evaluator from "../mega/ykos-term-evaluator";
// import FeedbackLoop from "../mega/YKOSFeedbackLoop";
// import Sync from "../mega/YKOSSync";

// YENİ VE DOĞRU YOLLAR (Aynı klasör içinde oldukları için ./ kullanıyoruz):
import Evaluator from "./ykos-term-evaluator";
import FeedbackLoop from "./YKOSFeedbackLoop";
import Sync from "./YKOSSync";

import FinalStabilizer from "../mega/FinalStabilizer";

import { useState, useEffect } from "react";
import "./BubbleMatrix.css";   // 31‑7 görünüm CSS’i aktif

export default function BubbleMatrix({ data, atlas }) {
  const [bubbles, setBubbles] = useState([]);

  // Atlas koordinatları (Anadolu, Orta Asya, Avrupa, Amerika, Mezopotamya)
  const atlasCoords = {
    "Anadolu": { x: 140, y: 160 },
    "Orta Asya": { x: 260, y: 120 },
    "Avrupa": { x: 180, y: 80 },
    "Amerika": { x: 320, y: 200 },
    "Mezopotamya": { x: 160, y: 200 }
  };

  // 31‑7 Motor Entegrasyonu (DOĞRU YER)
  useEffect(() => {
    if (bubbles.length === 0) return;

    Evaluator.run(bubbles);
    FeedbackLoop.apply(bubbles);
    Sync.update(bubbles);
    FinalStabilizer.balance(bubbles);
  }, [bubbles]);

  // Veri yükleme (27‑7 çekirdeği)
  useEffect(() => {
    if (!data) return;

    // Tek kayıt (ReadingScreen)
    if (!Array.isArray(data)) {
      const activeAtlas = atlas || data.atlas || "Anadolu";
      const coord = atlasCoords[activeAtlas] || { x: 120, y: 120 };

      const bubble = {
        label: data.title || data.label || "YKOS Matris",
        x: coord.x,
        y: coord.y,
        size: 80,
        color: "#d4af37",
        flux: 1.2,
        atlas: activeAtlas,
        matrix: data.matrix,
        tags: data.tags
      };

      setBubbles([bubble]);
      return;
    }

    // Çoklu kayıt (Home / Dashboard)
    const mapped = data.map((item, i) => {
      const activeAtlas = atlas || item.atlas || "Anadolu";
      const coord = atlasCoords[activeAtlas] || {
        x: 100 + (i % 4) * 80,
        y: 100 + Math.floor(i / 4) * 60
      };

      return {
        label: item.label || item.title || `Baloncuk ${i + 1}`,
        x: coord.x,
        y: coord.y,
        size: 60 + i * 5,
        color: item.color || "#d4af37",
        flux: item.flux || 1.0,
        atlas: activeAtlas,
        matrix: item.matrix,
        tags: item.tags
      };
    });

    setBubbles(mapped);
  }, [data, atlas]);

  // Flux motoru (Sinüs/Kosinüs salınımı)
  useEffect(() => {
    if (bubbles.length === 0) return;

    const interval = setInterval(() => {
      setBubbles(prev =>
        prev.map(b => ({
          ...b,
          x: b.x + Math.sin(Date.now() / 300) * b.flux * 0.8,
          y: b.y + Math.cos(Date.now() / 400) * b.flux * 0.6,
          size: b.size + Math.sin(Date.now() / 500) * 0.3
        }))
      );
    }, 60);

    return () => clearInterval(interval);
  }, [bubbles.length]);

  return (
    <div className="bubble-area">
      {bubbles.map((b, i) => (
        <div
          key={i}
          className="bubble"
          style={{
            left: `${b.x}px`,
            top: `${b.y}px`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            backgroundColor: b.color
          }}
        >
          <span className="bubble-label">{b.label}</span>
        </div>
      ))}
    </div>
  );
}
