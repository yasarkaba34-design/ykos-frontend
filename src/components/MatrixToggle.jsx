import React, { useState } from "react";
import "./MatrixToggle.css";

export default function MatrixToggle({ onNavigateRead }) {
  const [selectedNode, setSelectedNode] = useState(null);

  // YKOS Kök Hece ve Arkeolojik Çözümleme Verileri
  const nodes = [
    { 
      id: "ykos100", 
      label: "YKOS 100", 
      x: 65, y: 55, size: 55, color: "#1e3a8a", border: "#3b82f6",
      details: {
        title: "YKOS 100 - Kök Hece Matrisi",
        desc: "Anadolu merkezli 40 temel kök hece ve piktogram dizilimi.",
        root: "Ana Hece Dizilimi: BA, BİR, YOL, KÖK",
        layer: "Katman: İlk Çağ Ön-Türkçe Piktogramlar"
      }
    },
    { 
      id: "ykos200", 
      label: "YKOS 200", 
      x: 55, y: 72, size: 58, color: "#064e3b", border: "#10b981",
      details: {
        title: "YKOS 200 - Arkeolojik Çözümleme",
        desc: "Göbeklitepe T-Sütunları, Sümer Tabletleri ve Etrüsk Yazıtları.",
        root: "Analiz: Taş ve Kil üzeri Damga Eşleşmesi",
        layer: "Katman: M.Ö. 10.000 - M.Ö. 3.000 Arkeolojik Sözlük"
      }
    },
    { 
      id: "ykos300", 
      label: "YKOS 300", 
      x: 42, y: 68, size: 60, color: "#7c2d12", border: "#f97316",
      details: {
        title: "YKOS 300 - Küresel Akış Atlası",
        desc: "Anadolu'dan Asya, Avrupa ve Amerika'ya kök hece ve damga akış hattı.",
        root: "Migrasyon: Anadolu → Orta Asya → Bering → Amerika",
        layer: "Katman: Karşılaştırmalı Dil & Dilbilgisi Atlası"
      }
    },
    { 
      id: "anadolu", 
      label: "ANADOLU ATLASI", 
      x: 58, y: 46, size: 45, color: "#7c2d12", border: "#ea580c",
      details: {
        title: "Anadolu Kültür Atlası",
        desc: "Kök hece ve damga sisteminin doğuş ve küresel yayılım odağı.",
        root: "Odak: Çatalhöyük, Göbeklitepe, Karahantepe hece havuzu",
        layer: "Sistem: YKOS Başlangıç Çekirdeği"
      }
    },
    { 
      id: "yol", 
      label: "YOL", 
      x: 74, y: 53, size: 32, color: "#1e293b", border: "#64748b",
      details: {
        title: "YOL (Kök Hece Çözümlemesi)",
        desc: "YKOS Kavramsal Çerçevesi: Süreç, akış ve dinamik ilerleme hatı ('Rulo değil yol').",
        root: "Fonetik Çözüm: Y-O-L / Akış, Yön ve Hareket Damgası",
        layer: "Katalog Ref: YKOS-KÖK-04"
      }
    },
    { 
      id: "bir", 
      label: "BİR", 
      x: 68, y: 48, size: 34, color: "#581c87", border: "#a855f7",
      details: {
        title: "BİR (Kök Hece Çözümlemesi)",
        desc: "Varlık, bütünlük ve birincil kaynak sembolizmi.",
        root: "Fonetik Çözüm: B-İ-R / Başlangıç ve Nokta Damgası",
        layer: "Katalog Ref: YKOS-KÖK-01"
      }
    },
    { 
      id: "gobeklitepe", 
      label: "Göbeklitepe", 
      x: 63, y: 75, size: 36, color: "#047857", border: "#34d399",
      details: {
        title: "Göbeklitepe T-Sütunu YKOS Okuması",
        desc: "T-Sütunlar üzerindeki H ve C sembollerinin YKOS kök hece analizi.",
        root: "Fonetik Çözüm: ER-İK-AN / KÖK-SU Metin Eşleşmesi",
        layer: "Tarihlendirme: M.Ö. 9600"
      }
    }
  ];

  const links = [
    { from: "ykos100", to: "bir" },
    { from: "ykos100", to: "yol" },
    { from: "ykos100", to: "anadolu" },
    { from: "ykos200", to: "gobeklitepe" }
  ];

  const getNode = (id) => nodes.find(n => n.id === id);

  return (
    <div className="matrix-canvas-wrapper" style={{ width: "100%", height: "650px", backgroundColor: "#030712", borderRadius: "12px", position: "relative", overflow: "hidden", border: "1px solid rgba(255,215,0,0.3)" }}>
      
      {/* Üst Sol Başlık */}
      <div style={{ position: "absolute", top: "20px", left: "20px", backgroundColor: "rgba(5,8,17,0.9)", border: "1px solid #ffd700", padding: "12px 20px", borderRadius: "8px", zIndex: 10 }}>
        <h3 style={{ color: "#ffd700", margin: 0, fontSize: "1.1rem" }}>YKOS DİNAMİK ÇÖZÜMLEME MATRİSİ</h3>
        <small style={{ color: "#38bdf8", display: "block", marginTop: "2px", fontWeight: "bold" }}>Her baloncuk tıklanabilir canlı YKOS veri kartıdır</small>
      </div>

      {/* Tuval */}
      <svg style={{ width: "100%", height: "100%" }}>
        {links.map((link, idx) => {
          const source = getNode(link.from);
          const target = getNode(link.to);
          if (!source || !target) return null;
          return (
            <line
              key={idx}
              x1={`${source.x}%`}
              y1={`${source.y}%`}
              x2={`${target.x}%`}
              y2={`${target.y}%`}
              stroke="rgba(255, 215, 0, 0.3)"
              strokeWidth="2"
            />
          );
        })}

        {nodes.map((node) => (
          <g 
            key={node.id} 
            onClick={() => setSelectedNode(node)}
            style={{ cursor: "pointer" }}
          >
            <circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r={node.size / 2}
              fill={node.color}
              stroke={selectedNode?.id === node.id ? "#ffffff" : node.border}
              strokeWidth={selectedNode?.id === node.id ? "4" : "2.5"}
              style={{ filter: "drop-shadow(0px 0px 10px " + node.border + ")" }}
            />
            <text
              x={`${node.x}%`}
              y={`${node.y}%`}
              textAnchor="middle"
              dy=".3em"
              fill="#ffffff"
              fontSize={node.size > 45 ? "12px" : "10px"}
              fontWeight="bold"
              style={{ pointerEvents: "none", userSelect: "none" }}
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>

      {/* SAĞ ALT: CANLI YKOS ÇÖZÜMLEME KARTI */}
      {selectedNode && selectedNode.details && (
        <div style={{ position: "absolute", bottom: "20px", right: "20px", backgroundColor: "#050811", border: "1px solid #ffd700", padding: "16px", borderRadius: "12px", width: "300px", color: "#fff", zIndex: 100, boxShadow: "0 10px 30px rgba(0,0,0,0.95)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px", borderBottom: "1px solid rgba(255,215,0,0.2)", paddingBottom: "6px" }}>
            <h4 style={{ color: "#ffd700", margin: 0, fontSize: "1rem" }}>{selectedNode.details.title}</h4>
            <button onClick={() => setSelectedNode(null)} style={{ background: "transparent", border: "none", color: "#ffd700", fontSize: "1.1rem", cursor: "pointer" }}>✕</button>
          </div>
          
          <p style={{ fontSize: "0.82rem", color: "#e2e8f0", margin: "6px 0", lineHeight: "1.4" }}>
            {selectedNode.details.desc}
          </p>

          <div style={{ background: "rgba(255, 215, 0, 0.08)", borderLeft: "3px solid #ffd700", padding: "6px 10px", margin: "10px 0", borderRadius: "4px", fontSize: "0.78rem", color: "#fef08a" }}>
            {selectedNode.details.root}
          </div>

          <div style={{ fontSize: "0.72rem", color: "#94a3b8", marginBottom: "12px" }}>
            {selectedNode.details.layer}
          </div>

          <button 
            onClick={() => onNavigateRead && onNavigateRead(1)}
            style={{ width: "100%", background: "linear-gradient(135deg, #ffd700, #b8860b)", color: "#000", border: "none", padding: "8px", borderRadius: "6px", fontWeight: "bold", fontSize: "0.8rem", cursor: "pointer" }}
          >
            DETAYLI ANALİZİ OKU ➔
          </button>
        </div>
      )}

    </div>
  );
}