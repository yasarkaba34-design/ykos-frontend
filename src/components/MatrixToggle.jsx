import React, { useState } from "react";
import "./MatrixToggle.css";

export default function MatrixToggle() {
  const [selectedNode, setSelectedNode] = useState(null);

  // Vercel'deki Tam Veri Ağacı
  const nodes = [
    // Ana Merkezler
    { id: "ykos100", label: "YKOS 100", type: "core-100", x: 65, y: 55, size: 55, color: "#1e3a8a", border: "#3b82f6" },
    { id: "ykos200", label: "YKOS 200", type: "core-200", x: 55, y: 72, size: 58, color: "#064e3b", border: "#10b981" },
    { id: "ykos300", label: "YKOS 300", type: "core-300", x: 42, y: 68, size: 60, color: "#7c2d12", border: "#f97316" },

    // Atlaslar & Kadim Merkezler
    { id: "anadolu", label: "ANADOLU ATLASI", type: "atlas", x: 58, y: 46, size: 45, color: "#7c2d12", border: "#ea580c" },
    { id: "ortaasya", label: "ORTA ASYA ATLASI", type: "atlas", x: 34, y: 60, size: 42, color: "#7c2d12", border: "#ea580c" },
    { id: "amerika", label: "AMERİKA ATLASI", type: "atlas", x: 30, y: 71, size: 38, color: "#7c2d12", border: "#ea580c" },
    { id: "avrupa", label: "AVRUPA ATLASI", type: "atlas", x: 42, y: 90, size: 40, color: "#7c2d12", border: "#ea580c" },

    // Arkeolojik Okuma Merkezleri
    { id: "sumer", label: "Sümer", type: "site", x: 54, y: 58, size: 36, color: "#047857", border: "#34d399" },
    { id: "gobeklitepe", label: "Göbeklitepe", type: "site", x: 63, y: 75, size: 36, color: "#047857", border: "#34d399" },
    { id: "etrusk", label: "Etrüsk", type: "site", x: 49, y: 93, size: 34, color: "#047857", border: "#34d399" },
    { id: "glozel", label: "Glozel", type: "site", x: 52, y: 86, size: 32, color: "#047857", border: "#34d399" },

    // Kök Heceler & Damgalar
    { id: "bir", label: "BİR", type: "root", x: 68, y: 48, size: 34, color: "#581c87", border: "#a855f7" },
    { id: "yol", label: "YOL", type: "root", x: 74, y: 53, size: 32, color: "#1e293b", border: "#64748b" },
    { id: "kok", label: "KÖK", type: "root", x: 74, y: 26, size: 34, color: "#581c87", border: "#a855f7" },
    { id: "kur", label: "KUR", type: "root", x: 63, y: 16, size: 34, color: "#7c2d12", border: "#f97316" },
    { id: "ba", label: "BA", type: "root", x: 64, y: 34, size: 34, color: "#7c2d12", border: "#f97316" },
    { id: "cev", label: "ÇEV", type: "root", x: 61, y: 44, size: 30, color: "#1e293b", border: "#64748b" },
    { id: "dis", label: "DİŞ", type: "root", x: 50, y: 38, size: 32, color: "#1e293b", border: "#64748b" },
    { id: "yuz", label: "YÜZ", type: "root", x: 44, y: 38, size: 30, color: "#1e293b", border: "#64748b" },
    { id: "derin", label: "DERİN", type: "root", x: 36, y: 34, size: 34, color: "#1e293b", border: "#64748b" },
    { id: "bol", label: "BÖL", type: "root", x: 57, y: 85, size: 32, color: "#581c87", border: "#a855f7" },
    { id: "kes", label: "KES", type: "root", x: 61, y: 66, size: 32, color: "#581c87", border: "#a855f7" }
  ];

  // Bağlantı Çizgileri
  const links = [
    { from: "ykos100", to: "bir" },
    { from: "ykos100", to: "yol" },
    { from: "ykos100", to: "anadolu" },
    { from: "ykos100", to: "kes" },
    { from: "ykos200", to: "gobeklitepe" },
    { from: "ykos200", to: "sumer" },
    { from: "ykos200", to: "bol" },
    { from: "ykos300", to: "ortaasya" },
    { from: "ykos300", to: "amerika" },
    { from: "ykos300", to: "avrupa" },
    { from: "anadolu", to: "ba" },
    { from: "ba", to: "kur" },
    { from: "cev", to: "dis" },
    { from: "dis", to: "yuz" },
    { from: "yuz", to: "derin" },
    { from: "avrupa", to: "etrusk" },
    { from: "etrusk", to: "glozel" }
  ];

  const getNode = (id) => nodes.find(n => n.id === id);

  return (
    <div className="matrix-canvas-wrapper" style={{ width: "100%", height: "650px", backgroundColor: "#030712", borderRadius: "12px", position: "relative", overflow: "hidden", border: "1px solid rgba(255,215,0,0.3)" }}>
      
      {/* Sol Üst Başlık Etiketi */}
      <div style={{ position: "absolute", top: "20px", left: "20px", backgroundColor: "rgba(5,8,17,0.85)", border: "1px solid #ffd700", padding: "12px 20px", borderRadius: "8px", zIndex: 10 }}>
        <h3 style={{ color: "#ffd700", margin: 0, fontSize: "1.1rem" }}>YKOS MATRİSLERİ</h3>
        <small style={{ color: "#38bdf8", display: "block", marginTop: "2px", fontWeight: "bold" }}>100 • 200 • 300 GLOBAL ATLAS ENTEGRASYONU</small>
        <p style={{ color: "#9ca3af", fontSize: "0.7rem", margin: "6px 0 0 0", maxWidth: "280px" }}>ÖNCE VERİ, SONRA ANALİZ, SONRA YORUM: Kadim Kök Sistemler ve Küresel Kültür Atlası aktif.</p>
      </div>

      {/* SVG Çizgi Bağlantıları ve Baloncuklar */}
      <svg style={{ width: "100%", height: "100%" }}>
        {/* Çizgiler */}
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
              stroke="rgba(255, 215, 0, 0.25)"
              strokeWidth="2"
            />
          );
        })}

        {/* Düğümler (Baloncuklar) */}
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
              stroke={node.border}
              strokeWidth="2.5"
              style={{ filter: "drop-shadow(0px 0px 8px " + node.border + ")" }}
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

      {/* Tıklanan Düğüm Detay Modalı */}
      {selectedNode && (
        <div style={{ position: "absolute", bottom: "20px", right: "20px", backgroundColor: "#050811", border: "1px solid #ffd700", padding: "15px", borderRadius: "10px", width: "260px", color: "#fff", zIndex: 100, boxShadow: "0 10px 25px rgba(0,0,0,0.9)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h4 style={{ color: "#ffd700", margin: 0 }}>{selectedNode.label}</h4>
            <button onClick={() => setSelectedNode(null)} style={{ background: "transparent", border: "none", color: "#ffd700", fontSize: "1rem", cursor: "pointer" }}>✕</button>
          </div>
          <p style={{ fontSize: "0.8rem", color: "#ccc", margin: "8px 0 0 0" }}>YKOS Çözümleme sistemi altında dinamik bağlam analizi aktif.</p>
        </div>
      )}

    </div>
  );
}