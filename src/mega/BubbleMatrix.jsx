import { useState, useEffect } from "react";
import "@/styles/BubbleMatrix.css";

export default function BubbleMatrix({ bubble }) {
  const [bubbles, setBubbles] = useState([]);

  // Yeni baloncuk geldiğinde listeye ekle
  useEffect(() => {
    if (bubble) {
      setBubbles(prev => [...prev, bubble]);
    }
  }, [bubble]);

  // Flux motoruna göre animasyon
  useEffect(() => {
    const interval = setInterval(() => {
      setBubbles(prev =>
        prev.map(b => ({
          ...b,
          x: b.x + b.flux * 1.5,
          y: b.y + Math.sin(Date.now() / 400) * b.flux * 1.2,
          size: b.size + b.flux * 0.3
        }))
      );
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bubble-area">
      {bubbles.map((b, i) => (
        <div
          key={i}
          className="bubble"
          style={{
            left: b.x,
            top: b.y,
            width: b.size,
            height: b.size,
            backgroundColor: b.color
          }}
        >
          <span className="bubble-label">{b.label}</span>
        </div>
      ))}
    </div>
  );
}
<div
  key={i}
  className={`bubble bubble-${b.shape}`}
  style={{
    left: b.x,
    top: b.y,
    width: b.size,
    height: b.size,
    backgroundColor: b.color
  }}
>
  <span className="bubble-label">{b.label}</span>
</div>
useEffect(() => {
  const interval = setInterval(() => {
    setBubbles(prev =>
      prev.map(b => {
        let newX = b.x;
        let newY = b.y;
        let newSize = b.size;

        switch (b.animation) {
          case "forward":
            newX += b.flux * 2;
            break;

          case "accelerate":
            newX += b.flux * 3;
            newSize += b.flux * 0.5;
            break;

          case "pulse":
            newSize += Math.sin(Date.now() / 200) * b.flux * 1.5;
            break;

          case "rise":
            newY -= b.flux * 2;
            break;

          case "anchor":
            newX += Math.sin(Date.now() / 300) * b.flux;
            break;

          case "drift":
            newX += Math.sin(Date.now() / 500) * b.flux * 1.2;
            newY += Math.cos(Date.now() / 500) * b.flux * 1.2;
            break;

          default:
            break;
        }

        return {
          ...b,
          x: newX,
          y: newY,
          size: newSize
        };
      })
    );
  }, 60);

  return () => clearInterval(interval);
}, []);
useEffect(() => {
  const interval = setInterval(() => {
    setBubbles(prev =>
      prev.map(b => {
        let newX = b.x;
        let newY = b.y;
        let newSize = b.size;

        switch (b.animation) {
          case "forward":
            newX += b.flux * 2;
            break;

          case "accelerate":
            newX += b.flux * 3;
            newSize += b.flux * 0.5;
            break;

          case "pulse":
            newSize += Math.sin(Date.now() / 200) * b.flux * 1.5;
            break;

          case "rise":
            newY -= b.flux * 2;
            break;

          case "anchor":
            newX += Math.sin(Date.now() / 300) * b.flux;
            break;

          case "drift":
            newX += Math.sin(Date.now() / 500) * b.flux * 1.2;
            newY += Math.cos(Date.now() / 500) * b.flux * 1.2;
            break;

          default:
            break;
        }

        return {
          ...b,
          x: newX,
          y: newY,
          size: newSize
        };
      })
    );
  }, 60);

  return () => clearInterval(interval);
}, []);
useEffect(() => {
  const interval = setInterval(() => {
    setBubbles(prev =>
      prev.map(b => {
        let newX = b.x;
        let newY = b.y;
        let newSize = b.size;

        const freq = b.frequency;     // zincir frekansı
        const amp = b.flux * 1.2;     // flux genliği

        switch (b.animation) {
          case "pulse":
            newSize += Math.sin(Date.now() / (100 / freq)) * amp;
            break;

          case "drift":
            newX += Math.sin(Date.now() / (300 / freq)) * amp;
            newY += Math.cos(Date.now() / (300 / freq)) * amp;
            break;

          case "rise":
            newY -= amp * freq;
            break;

          case "forward":
            newX += amp * freq;
            break;

          case "accelerate":
            newX += amp * freq * 1.5;
            newSize += amp * freq * 0.4;
            break;

          case "anchor":
            newX += Math.sin(Date.now() / (200 / freq)) * amp;
            break;

          default:
            break;
        }

        return {
          ...b,
          x: newX,
          y: newY,
          size: newSize
        };
      })
    );
  }, 60);

  return () => clearInterval(interval);
}, []);
<div
  key={i}
  className={`bubble bubble-${b.shape}`}
  style={{
    left: b.x,
    top: b.y,
    width: b.size,
    height: b.size,
    backgroundColor: b.color,
    "--glow": `${b.glow}px`
  }}
>
  <span className="bubble-label">{b.label}</span>
</div>
<div
  key={i}
  className={`bubble bubble-${b.shape}`}
  style={{
    left: b.x,
    top: b.y,
    width: b.size,
    height: b.size,
    backgroundColor: b.color,
    "--tilt": `${b.tilt}deg`,
    "--shadow-x": `${b.shadowDirection.x * b.shadow.length}px`,
    "--shadow-y": `${b.shadowDirection.y * b.shadow.length}px`,
    "--shadow-blur": `${b.shadow.length * 0.6}px`,
    "--shadow-intensity": b.shadow.intensity
  }}
>
  <span className="bubble-label">{b.label}</span>
</div>
newX += Math.sin(Date.now() / 120) * b.vibrationVector.x * b.vibrationAmplitude;
newY += Math.sin(Date.now() / 120) * b.vibrationVector.y * b.vibrationAmplitude;
useEffect(() => {
  const interval = setInterval(() => {
    setTrails(prev => {
      const newTrails = [...prev];

      bubbles.forEach(b => {
        newTrails.push({
          x: b.x - b.trailDirection.x * 10,
          y: b.y - b.trailDirection.y * 10,
          color: b.trailColor,
          size: b.size * 0.4
        });
      });

      return newTrails.slice(-300); // maksimum 300 iz
    });
  }, 80);

  return () => clearInterval(interval);
}, [bubbles]);
const baseDecay = 0.01;
const fluxFactor = 0.05;

function updateTrails(deltaTime, flux) {
  const decayRate = baseDecay + flux * fluxFactor;

  trails.forEach(trail => {
    trail.opacity -= decayRate * deltaTime;

    if (trail.opacity <= 0) {
      removeTrail(trail);
    }
  });
}
const baseDecay = 0.01;
const fluxFactor = 0.05;

const baseLength = 10;
const lengthFactor = 40;

function updateTrails(deltaTime, flux) {
  const decayRate = baseDecay + flux * fluxFactor;
  const trailLength = baseLength + flux * lengthFactor;

  trails.forEach(trail => {
    trail.opacity -= decayRate * deltaTime;

    if (trail.history.length > trailLength) {
      trail.history.shift(); // fazla noktaları at
    }

    if (trail.opacity <= 0) {
      removeTrail(trail);
    }
  });
}
import { useRef, useEffect } from "react";

export default function BubbleMatrix({ bubbles }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let trails = [];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubbles.forEach((bubble) => {
        const {
          x,
          y,
          radius,
          flux,
          resonance,
          atlasColor,
          semanticChain,
        } = bubble;

        // -----------------------------
        // 1) RESONANCE FIELD (Glow Aura)
        // -----------------------------
        const fieldStrength = resonance * flux;
        ctx.shadowBlur = fieldStrength * 12;
        ctx.shadowColor = `rgba(${atlasColor.r}, ${atlasColor.g}, ${atlasColor.b}, 0.55)`;

        // -----------------------------
        // 2) BUBBLE VIBRATION (Amplitude + Frequency)
        // -----------------------------
        const vibrationAmp = resonance * 2.2;
        const vibrationFreq = resonance * 0.15;

        const vibX = x + Math.sin(Date.now() * vibrationFreq) * vibrationAmp;
        const vibY = y + Math.cos(Date.now() * vibrationFreq) * vibrationAmp;

        // -----------------------------
        // 3) DRAW BUBBLE
        // -----------------------------
        ctx.beginPath();
        ctx.fillStyle = `rgba(${atlasColor.r}, ${atlasColor.g}, ${atlasColor.b}, 0.85)`;
        ctx.arc(vibX, vibY, radius, 0, Math.PI * 2);
        ctx.fill();

        // -----------------------------
        // 4) SEMANTIC TRAIL DIRECTION
        // -----------------------------
        const lastSyllable = semanticChain.at(-1);
        let dirX = 0.7;
        let dirY = 0.7;

        if ("aeıioöuü".includes(lastSyllable)) {
          dirX = 1.2;
          dirY = 0.2;
        }

        // -----------------------------
        // 5) TRAIL CREATION
        // -----------------------------
        trails.push({
          x: vibX,
          y: vibY,
          radius: radius * (0.4 + flux),
          opacity: 0.55 +
import { useRef, useEffect } from "react";

export default function BubbleMatrix({ bubbles, onFluxUpdate }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let trails = [];

    const drawEnergyLink = (x1, y1, x2, y2, intensity) => {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(255, 215, 0, ${0.2 + intensity})`; // altın enerji bağı
      ctx.lineWidth = 2 + intensity * 3;
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // -----------------------------
      // 1) BALONLARI ÇİZ
      // -----------------------------
      bubbles.forEach((bubble) => {
        const {
          x,
          y,
          radius,
          flux,
          resonance,
          atlasColor,
          semanticChain,
        } = bubble;

        const fieldStrength = resonance * flux;
        ctx.shadowBlur = fieldStrength * 12;
        ctx.shadowColor = `rgba(${atlasColor.r}, ${atlasColor.g}, ${atlasColor.b}, 0.55)`;

        const vibrationAmp = resonance * 2.2;
        const vibrationFreq = resonance * 0.15;

        const vibX = x + Math.sin(Date.now() * vibrationFreq) * vibrationAmp;
        const vibY = y + Math.cos(Date.now() * vibrationFreq) * vibrationAmp;

        ctx.beginPath();
        ctx.fillStyle = `rgba(${atlasColor.r}, ${atlasColor.g}, ${atlasColor.b}, 0.85)`;
        ctx.arc(vibX, vibY, radius, 0, Math.PI * 2);
        ctx.fill();

        const lastSyllable = semanticChain.at(-1);
        let dirX = 0.7;
        let dirY = 0.7;

        if ("aeıioöuü".includes(lastSyllable)) {
          dirX = 1.2;
          dirY = 0.2;
        }

        trails.push({
          x: vibX,
          y: vibY,
          radius: radius * (0.4 + flux),
          opacity: 0.55 + flux * 0.4,
          color: atlasColor,
          dirX,
          dirY,
          flux,
        });

        if (trails.length > 300) trails.shift();
      });

      // -----------------------------
      // 2) TRAIL MOTORU
      // -----------------------------
      trails.forEach((t) => {
        t.opacity -= 0.008 * t.flux;
        t.x += t.dirX * 0.6;
        t.y += t.dirY * 0.6;

        ctx.beginPath();
        ctx.fillStyle = `rgba(${t.color.r}, ${t.color.g}, ${t.color.b}, ${t.opacity})`;
        ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // -----------------------------
      // 3) BALONLAR ARASI ETKİLEŞİM
      // -----------------------------
      for (let i = 0; i < bubbles.length; i++) {
        for (let j = i + 1; j < bubbles.length; j++) {
          const b1 = bubbles[i];
          const b2 = bubbles[j];
if (dist < field1 + field2) {
  const intensity =
    (b1.resonance + b2.resonance) * (b1.flux + b2.flux) * 0.15;

  drawEnergyLink(b1.x, b1.y, b2.x, b2.y, intensity);

  // Flux artışı
  if (onFluxUpdate) {
    onFluxUpdate(i, b1.flux + 0.0015);
    onFluxUpdate(j, b2.flux + 0.0015);
  }

  // SEMANTIC CHAIN ETKİLEŞİMİ
  if (applySemanticInteraction && setTempChain) {
    applySemanticInteraction(i, bubbles, setTempChain);
    applySemanticInteraction(j, bubbles, setTempChain);
  }
}

          const dx = b1.x - b2.x;
          const dy = b1.y - b2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const field1 = b1.radius * (1 + b1.resonance * 0.8);
          const field2 = b2.radius * (1 + b2.resonance * 0.8);

          if (dist < field1 + field2) {
            const intensity =
              (b1.resonance + b2.resonance) * (b1.flux + b2.flux) * 0.15;

            drawEnergyLink(b1.x, b1.y, b2.x, b2.y, intensity);

            if (onFluxUpdate) {
              onFluxUpdate(i, b1.flux + 0.0015);
              onFluxUpdate(j, b2.flux + 0.0015);
            }
          }
        }
      }

      requestAnimationFrame(draw);
    };

    draw();
  }, [bubbles]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100vw",
        height: "100vh",
        background: "black",
      }}
    />
  );
}
// SEMANTIC CHAIN INTERACTION
const applySemanticInteraction = (bubbleIndex, bubbles, setTempChain) => {
  const bubble = bubbles[bubbleIndex];

  // Son heceyi geçici olarak değiştir
  const original = bubble.semanticChain.at(-1);

  // Etkileşim hecesi (kültürel rezonans etkisi)
  const interactionSyllable = original === "a" ? "e" :
                              original === "e" ? "i" :
                              original === "i" ? "o" :
                              original === "o" ? "u" :
                              original === "u" ? "a" :
                              "a";

  // Geçici değişiklik
  setTempChain(bubbleIndex, interactionSyllable);

  // 500 ms sonra geri al
  setTimeout(() => {
    setTempChain(bubbleIndex, original);
  }, 500);
};
