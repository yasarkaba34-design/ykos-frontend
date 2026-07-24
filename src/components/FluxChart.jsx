// FILE: src/components/FluxChart.jsx
import { useEffect, useState } from "react";
import "./flux-chart.css";

export default function FluxChart() {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("/api/ykos-flux")
        .then((res) => res.json())
        .then((data) => {
          setPoints((prev) => {
            const next = [...prev, { flux: data.flux, tick: data.tick }];
            // Son 50 noktayı tut
            if (next.length > 50) next.shift();
            return next;
          });
        })
        .catch((err) => console.error("YKOS Flux API hatası (chart):", err));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // SVG koordinatları için basit ölçekleme
  const width = 500;
  const height = 200;
  const padding = 20;

  const minFlux = -1;
  const maxFlux = 1;

  const scaleX = (index) =>
    padding + (index / Math.max(points.length - 1, 1)) * (width - 2 * padding);

  const scaleY = (flux) =>
    height - padding - ((flux - minFlux) / (maxFlux - minFlux)) * (height - 2 * padding);

  const pathData =
    points.length > 0
      ? points
          .map((p, i) => {
            const x = scaleX(i);
            const y = scaleY(p.flux);
            return `${i === 0 ? "M" : "L"} ${x} ${y}`;
          })
          .join(" ")
      : "";

  return (
    <div className="flux-chart-container">
      <h3>YKOS Flux Zaman Grafiği</h3>
      <svg width={width} height={height} className="flux-chart-svg">
        {/* Eksenler */}
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          className="axis"
        />
        <line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={height - padding}
          className="axis"
        />

        {/* 0 Flux referans çizgisi */}
        <line
          x1={padding}
          y1={scaleY(0)}
          x2={width - padding}
          y2={scaleY(0)}
          className="zero-line"
        />

        {/* Flux çizgisi */}
        {points.length > 1 && (
          <path d={pathData} className="flux-line" />
        )}

        {/* Noktalar */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={scaleX(i)}
            cy={scaleY(p.flux)}
            r={2}
            className="flux-point"
          />
        ))}
      </svg>

      <div className="flux-chart-meta">
        {points.length > 0 && (
          <>
            <div>Son Flux: {points[points.length - 1].flux.toFixed(4)}</div>
            <div>Son Tick: {points[points.length - 1].tick}</div>
            <div>Nokta sayısı: {points.length}</div>
          </>
        )}
      </div>
    </div>
  );
}
