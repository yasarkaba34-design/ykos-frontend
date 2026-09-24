import React, { useEffect, useRef, useState } from "react";

const BASE_WIDTH = 900;
const BASE_HEIGHT = 600;

export default function AtlasMap({ data = [] }) {
  const containerRef = useRef(null);
  const [hover, setHover] = useState(null);
  const [scale, setScale] = useState(1);

  // Mobil ekrana göre haritanın tamamını küçült
  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const nextScale = Math.min(containerWidth / BASE_WIDTH, 1);

      setScale(nextScale);
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Kültürel zincire göre frekans rengi
  const frequencyColor = (chain) => {
    switch (chain) {
      case "TUT":
        return "#FFB800";
      case "KUR":
        return "#FF8A00";
      case "BA":
        return "#FF3B3B";
      case "YOL":
        return "#3B8BFF";
      case "BİR":
        return "#A03BFF";
      case "KAL":
        return "#3BFF6E";
      default:
        return "#FFB800";
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: `${BASE_HEIGHT * scale}px`,
        overflow: "hidden",
        touchAction: "pan-y"
      }}
    >
      <style>{`
        @keyframes atlasFloat {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          25% {
            transform: translate3d(3px, -4px, 0) scale(1.02);
          }

          50% {
            transform: translate3d(-2px, -7px, 0) scale(1.05);
          }

          75% {
            transform: translate3d(-4px, -2px, 0) scale(1.02);
          }
        }

        @keyframes atlasHover {
          0%, 100% {
            transform: scale(1.08);
          }

          50% {
            transform: scale(1.18);
          }
        }

        .atlas-node {
          animation-name: atlasFloat;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          will-change: transform;
          cursor: pointer;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }

        .atlas-node.active {
          z-index: 20;
          animation-name: atlasHover;
          animation-duration: 0.8s !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .atlas-node {
            animation: none;
          }
        }
      `}</style>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: `${BASE_WIDTH}px`,
          height: `${BASE_HEIGHT}px`,
          transform: `translateX(-50%) scale(${scale})`,
          transformOrigin: "top center"
        }}
      >
        {data.map((item, index) => {
          if (!item.coords) return null;

          const isActive = hover === item.id;
          const color = frequencyColor(item.chain);

          return (
            <div
              key={item.id}
              style={{
                position: "absolute",
                left: item.coords.x,
                top: item.coords.y
              }}
            >
              <div
                className={`atlas-node ${isActive ? "active" : ""}`}
                onMouseEnter={() => setHover(item.id)}
                onMouseLeave={() => setHover(null)}
                onTouchStart={() => setHover(item.id)}
                onTouchEnd={() => setHover(null)}
                style={{
                  padding: "7px 11px",
                  color: isActive ? "#ffffff" : "#ffd700",
                  background: isActive
                    ? color
                    : "rgba(5, 8, 17, 0.92)",
                  border: `2px solid ${color}`,
                  borderRadius: "14px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  boxShadow: isActive
                    ? `0 0 22px ${color}, 0 0 40px ${color}88`
                    : `0 0 10px ${color}99`,
                  animationDuration: `${3.2 + (index % 5) * 0.45}s`,
                  animationDelay: `${-(index * 0.28)}s`,
                  transition:
                    "background 0.25s ease, color 0.25s ease, box-shadow 0.25s ease"
                }}
              >
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}