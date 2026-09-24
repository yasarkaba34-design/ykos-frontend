// FILE: src/matrices/Matrix.jsx
import React, { useMemo } from "react";

// MetaKatman JSON
import metaLayer from "./meta/MetaLayer.json";

// Alt modüller
import M8 from "./m8.jsx";
import M11 from "./m11.jsx";
import M12 from "./m12.jsx";
import HecePanel from "../components/HecePanel";
import FluxPanel from "../flux/FluxPanel";
import EvaluatorPanel from "../evaluator/EvaluatorPanel";
import UnifiedPanel from "../yunified/UnifiedPanel";
import AtlasMap from "../../data/atlas/AtlasMap";
import CoreDashboard from "../dashboard/CoreDashboard";
import DFlow from "../dflow/DFlow";
import Kernel from "../kernel/Kernel";
import RTE from "../runtime/RTE";

export default function Matrix() {
  const matrices = useMemo(
    () => [
      {
        id: "m8",
        title: "M8",
        component: <M8 meta={metaLayer} />
      },
      {
        id: "m11",
        title: "M11",
        component: <M11 meta={metaLayer} />
      },
      {
        id: "m12",
        title: "M12",
        component: <M12 meta={metaLayer} />
      }
    ],
    []
  );

  // Matris verilerini AtlasMap'e gönderen köprü
  const atlasData = useMemo(
    () =>
      matrices.map((matrix) => ({
        id: matrix.id,
        label: matrix.title,
        coords: metaLayer?.coordinates?.[matrix.id] || null,
        payload: metaLayer?.payloads?.[matrix.id] || null
      })),
    [matrices]
  );

  return (
    <main className="ykos-matrix-engine">
      <style>{`
        .ykos-matrix-engine {
          min-height: 100vh;
          padding: 20px;
          overflow-x: hidden;
          color: #ffd700;
          background:
            radial-gradient(
              circle at center,
              rgba(0, 180, 255, 0.08),
              transparent 38%
            ),
            #050811;
          box-sizing: border-box;
        }

        .ykos-matrix-engine * {
          box-sizing: border-box;
        }

        .ykos-matrix-section {
          margin-bottom: 24px;
          padding: 18px;
          border: 1px solid rgba(255, 215, 0, 0.65);
          border-radius: 12px;
          background: rgba(3, 8, 18, 0.9);
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.08);
        }

        .ykos-matrix-card {
          position: relative;
          margin-bottom: 24px;
          padding: 16px;
          overflow: hidden;
          border: 1px solid rgba(0, 255, 210, 0.55);
          border-radius: 12px;
          background: rgba(2, 11, 20, 0.92);
          box-shadow:
            0 0 16px rgba(0, 255, 210, 0.12),
            inset 0 0 18px rgba(0, 150, 255, 0.05);
          animation: matrixFloat 5s ease-in-out infinite;
          transition:
            transform 0.3s ease,
            border-color 0.3s ease,
            box-shadow 0.3s ease;
        }

        .ykos-matrix-card:nth-child(2) {
          animation-delay: -1.6s;
        }

        .ykos-matrix-card:nth-child(3) {
          animation-delay: -3.2s;
        }

        .ykos-matrix-card:hover {
          z-index: 2;
          transform: translateY(-5px) scale(1.01);
          border-color: #ffd700;
          box-shadow:
            0 0 28px rgba(255, 215, 0, 0.28),
            0 0 45px rgba(0, 200, 255, 0.12);
        }

        .ykos-matrix-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: -120%;
          width: 70%;
          height: 100%;
          pointer-events: none;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(0, 220, 255, 0.12),
            transparent
          );
          animation: matrixScan 6s linear infinite;
        }

        .ykos-matrix-title {
          position: relative;
          z-index: 1;
          margin: 0 0 14px;
          color: #00ffd5;
          letter-spacing: 1px;
          text-shadow: 0 0 10px rgba(0, 255, 213, 0.65);
        }

        .ykos-meta-output {
          max-height: 300px;
          padding: 14px;
          overflow: auto;
          color: #00ff88;
          border: 1px solid rgba(0, 255, 136, 0.3);
          border-radius: 8px;
          background: #02060b;
          font-family: "Courier New", monospace;
          font-size: 14px;
          white-space: pre-wrap;
        }

        .ykos-panel-stack > * {
          margin-bottom: 20px;
        }

        @keyframes matrixFloat {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-6px);
          }
        }

        @keyframes matrixScan {
          0% {
            left: -120%;
          }

          100% {
            left: 160%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ykos-matrix-card,
          .ykos-matrix-card::before {
            animation: none;
          }
        }
      `}</style>

      <h2>⚡ YKOS Matrix Engine</h2>

      <section className="ykos-matrix-section">
        <h3>MetaLayer</h3>

        <pre className="ykos-meta-output">
          {JSON.stringify(metaLayer, null, 2)}
        </pre>
      </section>

      <section className="ykos-matrix-section">
        <h3>AtlasMap</h3>
        <AtlasMap data={atlasData} />
      </section>

      <section className="ykos-matrix-section">
        <h3>Matris Modülleri</h3>

        {matrices.map((matrix) => (
          <article className="ykos-matrix-card" key={matrix.id}>
            <h4 className="ykos-matrix-title">{matrix.title}</h4>
            {matrix.component}
          </article>
        ))}
      </section>

      <section className="ykos-matrix-section ykos-panel-stack">
        <h3>YKOS Panelleri</h3>

        <HecePanel />
        <FluxPanel />
        <EvaluatorPanel />
        <UnifiedPanel />
        <CoreDashboard />
        <DFlow />
        <Kernel />
        <RTE />
      </section>
    </main>
  );
}