import React, { useState } from "react";

const BubbleMatrix = ({ onSelectNode }) => {
  const [selectedNode, setSelectedNode] = useState(null);
  
  const cosmicData = {
    QuantumFlux: "Aktif",
    OmniField: "Senkronize",
    CosmicField: "Rezonansta",
    Atlas: "Göbeklitepe rezonans hattı"
  };

  const [consoleLogs, setConsoleLogs] = useState([
    { time: "12:55", text: "QuantumFlux: Aktif | Kuantum Süzülme Animasyonları Başlatıldı." },
    { time: "12:55", text: "27 Matris Düğümü ve 6 Kuantum Damgası Canlı Akışta." }
  ]);

  const nodes = [
    { id: "YKOS 1000", x: 350, y: 180, r: 42, color: "#ffd700", label: "YKOS 1000", desc: "Ana Bilgi Entegrasyon Matrisi", connection: "YKOS 100, YKOS 200, YKOS 300", score: "%100", anim: "float1" },
    { id: "YKOS 100", x: 420, y: 310, r: 36, color: "#1e90ff", label: "YKOS 100", desc: "Temel Kök Hece Matrisi Katmanı", connection: "YOL, BİR, ÇEV", score: "%99.9", anim: "float2" },
    { id: "YKOS 200", x: 380, y: 410, r: 35, color: "#00ff7f", label: "YKOS 200", desc: "Bölgesel ve Derin Arkeolojik Katman", connection: "Göbeklitepe, ROL, Sümer", score: "%99.6", anim: "float3" },
    { id: "YKOS 300", x: 260, y: 370, r: 36, color: "#ff8c00", label: "YKOS 300", desc: "Global Atlas Katmanı", connection: "ÖN ASYA ATLASI, AMERİKA ATLASI", score: "%99.4", anim: "float1" },
    { id: "ANADOLU ATLASI", x: 420, y: 230, r: 24, color: "#ffd700", label: "ANADOLU ATLASI", desc: "Anadolu Kadim Kültür Havzası", connection: "YKOS 100", score: "%100", anim: "float2" },
    { id: "ÖN ASYA ATLASI", x: 150, y: 320, r: 22, color: "#ffd700", label: "ÖN ASYA ATLASI", desc: "Ön Asya Hatları", connection: "YKOS 300", score: "%99.1", anim: "float3" },
    { id: "AMERİKA ATLASI", x: 140, y: 410, r: 22, color: "#ff8c00", label: "AMERİKA ATLASI", desc: "Trans-Bering Bağlantıları", connection: "YKOS 300", score: "%98.5", anim: "float1" },
    { id: "AVRUPA ATLASI", x: 250, y: 500, r: 22, color: "#ba55d3", label: "AVRUPA ATLASI", desc: "Etrüsk ve Akdeniz Rotaları", connection: "AYLUİL", score: "%98.9", anim: "float2" },
    { id: "Göbeklitepe", x: 480, y: 430, r: 22, color: "#00ff7f", label: "Göbeklitepe", desc: "T-Sütun Sembolizmleri", connection: "YKOS 200", score: "%99.7", anim: "float3" },
    { id: "Sümer", x: 470, y: 360, r: 22, color: "#00ff7f", label: "Sümer", desc: "Mezopotamya Çivi Yazısı", connection: "YKOS 200", score: "%99.2", anim: "float1" },
    { id: "BİR", x: 500, y: 270, r: 24, color: "#ffd700", label: "BİR", desc: "Teklik ve Başlangıç", connection: "YKOS 100, YOL", score: "%99.8", anim: "float2" },
    { id: "YOL", x: 550, y: 330, r: 24, color: "#ffd700", label: "YOL", desc: "Aks ve Akış", connection: "BİR, O", score: "%99.8", anim: "float3" },
    { id: "O", x: 600, y: 260, r: 25, color: "#ffd700", label: "O", desc: "Evrensel Öz", connection: "YOL, OL, KÖK", score: "%99.5", anim: "float1" },
    { id: "OL", x: 650, y: 210, r: 22, color: "#ffd700", label: "OL", desc: "Oluş ve Varlık", connection: "O", score: "%99.3", anim: "float2" },
    { id: "KÖK", x: 580, y: 170, r: 24, color: "#ffd700", label: "KÖK", desc: "Kaynak", connection: "O, VAN, ÇİK, AL", score: "%99.9", anim: "float3" },
    { id: "VAN", x: 620, y: 110, r: 20, color: "#ffd700", label: "VAN", desc: "Su ve Havza", connection: "KÖK", score: "%98.7", anim: "float1" },
    { id: "ÇİK", x: 530, y: 50, r: 20, color: "#1e90ff", label: "ÇİK", desc: "Çıkış Vektörü", connection: "GÖK", score: "%98.5", anim: "float2" },
    { id: "GÖK", x: 560, y: 90, r: 22, color: "#00ff7f", label: "GÖK", desc: "Kozmoz", connection: "ÇİK, AL", score: "%99.2", anim: "float3" },
    { id: "AL", x: 510, y: 130, r: 20, color: "#1e90ff", label: "AL", desc: "Alma ve Yüksek", connection: "GÖK, KÖK", score: "%98.9", anim: "float1" },
    { id: "KUR", x: 420, y: 140, r: 24, color: "#ff8c00", label: "KUR", desc: "Kuruluş ve Yapı", connection: "YKOS 1000, DA", score: "%99.1", anim: "float2" },
    { id: "DA", x: 470, y: 190, r: 22, color: "#ff8c00", label: "DA", desc: "Dağ ve Yükseklik", connection: "KUR", score: "%98.8", anim: "float3" },
    { id: "ÇEV", x: 330, y: 250, r: 22, color: "#1e90ff", label: "ÇEV", desc: "Çevre ve Daire", connection: "YKOS 100, DİŞ", score: "%99.4", anim: "float1" },
    { id: "DİŞ", x: 260, y: 220, r: 20, color: "#1e90ff", label: "DİŞ", desc: "Dış Sınır", connection: "ÇEV, YÜZ", score: "%98.4", anim: "float2" },
    { id: "YÜZ", x: 190, y: 210, r: 20, color: "#1e90ff", label: "YÜZ", desc: "Yüzey ve Çehre", connection: "DİŞ, ULUN", score: "%98.6", anim: "float3" },
    { id: "ULUN", x: 120, y: 200, r: 20, color: "#1e90ff", label: "ULUN", desc: "Ulu ve Yüce", connection: "YÜZ", score: "%98.9", anim: "float1" },
    { id: "ROL", x: 360, y: 490, r: 22, color: "#ba55d3", label: "ROL", desc: "İşlev ve Görev", connection: "YKOS 200", score: "%98.7", anim: "float2" },
    { id: "AYLUİL", x: 310, y: 510, r: 22, color: "#ba55d3", label: "AYLUİL", desc: "Akdeniz Ekeni", connection: "AVRUPA ATLASI", score: "%98.5", anim: "float3" },
    { id: "AT", x: 180, y: 120, r: 22, color: "#00ff7f", label: "AT", desc: "Liderlik / Yıldız Damgası (3->4 Unsur)", connection: "OQ, ON", score: "%100", anim: "float1" },
    { id: "OQ", x: 250, y: 100, r: 22, color: "#00ff7f", label: "OQ", desc: "Oluş / Kuantum Haç Damgası", connection: "AT, ON", score: "%99.8", anim: "float2" },
    { id: "ON", x: 320, y: 90, r: 22, color: "#00ff7f", label: "ON", desc: "Kozmos Daire Damgası", connection: "OQ, UÇ", score: "%99.5", anim: "float3" },
    { id: "UÇ", x: 390, y: 90, r: 22, color: "#ff8c00", label: "UÇ", desc: "Ölüm / Yükseliş Kuş Damgası", connection: "ON, ÖG", score: "%99.3", anim: "float1" },
    { id: "ÖG", x: 460, y: 100, r: 22, color: "#ff8c00", label: "ÖG", desc: "Ruh / Bilinç Boynuzlu Baş", connection: "UÇ, TÖRT", score: "%99.9", anim: "float2" },
    { id: "TÖRT", x: 530, y: 120, r: 22, color: "#ba55d3", label: "TÖRT", desc: "Dört Unsur / Vakuum Damgası", connection: "ÖG", score: "%98.5", anim: "float3" }
  ];

  const handleBubbleClick = (node) => {
    setSelectedNode(node);
    const timeNow = new Date().toLocaleTimeString();
    setConsoleLogs(prev => [
      { time: timeNow, text: `[KÜRESEL AKIŞ] ${node.label} — ${node.desc} (Skor: ${node.score})` },
      ...prev.slice(0, 6)
    ]);
  };

  return (
    <div className="bubble-matrix" style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
      
      <style>{`
        @keyframes float1 {
          0% { transform: translate(0px, 0px); }
          50% { transform: translate(0px, -6px); }
          100% { transform: translate(0px, 0px); }
        }
        @keyframes float2 {
          0% { transform: translate(0px, 0px); }
          50% { transform: translate(5px, 5px); }
          100% { transform: translate(0px, 0px); }
        }
        @keyframes float3 {
          0% { transform: translate(0px, 0px); }
          50% { transform: translate(-5px, -4px); }
          100% { transform: translate(0px, 0px); }
        }
        .matrix-bubble-1 { animation: float1 4s ease-in-out infinite; transform-origin: center; }
        .matrix-bubble-2 { animation: float2 5s ease-in-out infinite; transform-origin: center; }
        .matrix-bubble-3 { animation: float3 4.5s ease-in-out infinite; transform-origin: center; }
      `}</style>

      {/* ÜST BİLGİ / KAPSUL DURUMU */}
      <div style={{ display: "flex", justifyContent: "space-between", background: "#02040a", border: "1px solid rgba(255,215,0,0.3)", padding: "10px 15px", borderRadius: "8px", fontSize: "0.8rem", color: "#ffd700" }}>
        <span>⚡ QuantumFlux: <strong>{cosmicData.QuantumFlux}</strong></span>
        <span>🌐 OmniField: <strong>{cosmicData.OmniField}</strong></span>
        <span>🏛️ Atlas: <strong>{cosmicData.Atlas}</strong></span>
      </div>

      {/* ANA GÖRSELLEŞTİRME ALANI */}
      <div style={{ position: "relative", width: "100%", height: "540px", background: "#02040a", borderRadius: "10px", border: "1px solid rgba(255,215,0,0.3)", overflow: "hidden" }}>
        
        {selectedNode && (
          <div style={{ position: "absolute", top: "15px", left: "15px", right: "15px", background: "rgba(5,8,17,0.95)", border: `1px solid ${selectedNode.color}`, padding: "12px", borderRadius: "8px", zIndex: 50, boxShadow: "0 4px 15px rgba(0,0,0,0.8)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ color: selectedNode.color, margin: 0, fontSize: "1rem" }}>{selectedNode.label} — {selectedNode.desc}</h3>
              <button onClick={() => setSelectedNode(null)} style={{ background: "transparent", border: "none", color: "#aaa", cursor: "pointer", fontSize: "1.1rem" }}>✕</button>
            </div>
            <div style={{ fontSize: "0.78rem", color: "#ccc", marginTop: "4px" }}>
              <span><strong>Bağlantılar:</strong> {selectedNode.connection}</span> | <span style={{ color: "#00ff7f" }}><strong>Skor:</strong> {selectedNode.score}</span>
            </div>
          </div>
        )}

        <svg width="100%" height="100%" viewBox="0 0 750 540" style={{ overflow: "visible" }}>
          <g stroke="rgba(255,215,0,0.2)" strokeWidth="1.5">
            <line x1="350" y1="180" x2="420" y2="310" />
            <line x1="350" y1="180" x2="380" y2="410" />
            <line x1="350" y1="180" x2="260" y2="370" />
            <line x1="420" y1="310" x2="380" y2="410" />
            <line x1="380" y1="410" x2="260" y2="370" />
            <line x1="420" y1="310" x2="420" y2="230" />
            <line x1="260" y1="370" x2="150" y2="320" />
            <line x1="260" y1="370" x2="140" y2="410" />
            <line x1="260" y1="370" x2="250" y2="500" />
            <line x1="380" y1="410" x2="480" y2="430" />
            <line x1="380" y1="410" x2="470" y2="360" />
            <line x1="380" y1="410" x2="360" y2="490" />
            <line x1="250" y1="500" x2="310" y2="510" />
            <line x1="420" y1="310" x2="500" y2="270" />
            <line x1="500" y1="270" x2="550" y2="330" />
            <line x1="550" y1="330" x2="600" y2="260" />
            <line x1="600" y1="260" x2="650" y2="210" />
            <line x1="600" y1="260" x2="580" y2="170" />
            <line x1="580" y1="170" x2="620" y2="110" />
            <line x1="580" y1="170" x2="510" y2="130" />
            <line x1="510" y1="130" x2="560" y2="90" />
            <line x1="560" y1="90" x2="530" y2="50" />
            <line x1="350" y1="180" x2="420" y2="140" />
            <line x1="420" y1="140" x2="470" y2="190" />
            <line x1="420" y1="310" x2="330" y2="250" />
            <line x1="330" y1="250" x2="260" y2="220" />
            <line x1="260" y1="220" x2="190" y2="210" />
            <line x1="190" y1="210" x2="120" y2="200" />
            <line x1="180" y1="120" x2="250" y2="100" />
            <line x1="250" y1="100" x2="320" y2="90" />
            <line x1="320" y1="90" x2="390" y2="90" />
            <line x1="390" y1="90" x2="460" y2="100" />
            <line x1="460" y1="100" x2="530" y2="120" />
          </g>

          {nodes.map((node, i) => {
            const animClass = node.anim === "float1" ? "matrix-bubble-1" : node.anim === "float2" ? "matrix-bubble-2" : "matrix-bubble-3";
            return (
              <g 
                key={node.id} 
                className={animClass}
                onClick={(e) => {
                  e.stopPropagation();
                  handleBubbleClick(node);
                }} 
                style={{ cursor: "pointer", pointerEvents: "all" }}
              >
                <circle 
                  cx={node.x} 
                  cy={node.y} 
                  r={node.r} 
                  fill="#050811" 
                  stroke={node.color} 
                  strokeWidth="2.5" 
                  style={{ filter: `drop-shadow(0px 0px 8px ${node.color})`, transition: "0.2s" }} 
                />
                <text 
                  x={node.x} 
                  y={node.y + 4} 
                  textAnchor="middle" 
                  fill={node.color} 
                  fontSize={node.r > 28 ? "11" : "9"} 
                  fontWeight="bold"
                  style={{ userSelect: "none", pointerEvents: "none" }}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* KONSOL TERMİNALİ */}
      <div style={{ background: "#02040a", border: "1px solid rgba(255,215,0,0.3)", borderRadius: "8px", padding: "10px", fontFamily: "monospace", fontSize: "0.75rem" }}>
        <div style={{ color: "#ffd700", fontWeight: "bold", marginBottom: "6px" }}>💻 KÖK-HECE & DAMGA KONSOL TERMİNALİ (KUANTUM AKIŞ AKTİF)</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
          {consoleLogs.map((log, index) => (
            <div key={index} style={{ color: index === 0 ? "#00ff7f" : "#888" }}>
              <span style={{ color: "#555" }}>[{log.time}]</span> {log.text}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default BubbleMatrix;