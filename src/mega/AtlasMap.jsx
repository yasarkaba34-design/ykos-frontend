import React, { useState } from "react";

const staticLocations = [
  {
    id: "ANADOLU-01",
    name: "Çatalhöyük & Konya Havzası",
    region: "Anadolu Refugium Katmanı",
    details: "M.Ö. 7400 Neolitik dairesel mühürler, 'ÇEV' ve 'BA' kök hece mülkiyet matrisinin merkez üssüdür."
  },
  {
    id: "ANADOLU-02",
    name: "Göbeklitepe & Şanlıurfa",
    region: "Epipaleolitik Grafik Algoritma",
    details: "M.Ö. 9600 T-sütunları üzerindeki 'H' piktogramı dikey varlık ve yatay bağ aksını kodlar."
  },
  {
    id: "ANADOLU-03",
    name: "Hattuşa & Çorum Havzası",
    region: "Hatti - Hitit Ön-Türkçe Kök Katmanı",
    details: "Hatti yazıtları ve mühürleri, YKOS KUR, DA ve ÇEV hece türetimleri ile %99.4 simetri gösterir."
  },
  {
    id: "AVRASYA-01",
    name: "Saymalıtaş & Altay Rotaları",
    region: "Kaya Resimleri ve Petroglif Hatları",
    details: "Anadolu çıkışlı göç dalgalarının Avrasya bozkırlarındaki 'GÖK' ve 'ÇİK' yükselim grafik izleri."
  },
  {
    id: "AKDENIZ-01",
    name: "Lemnos & Etruria (İtalya)",
    region: "Akdeniz & Etrüsk Alfabetik Aksı",
    details: "Lemnos mezar steli ve Etrüsk yazıtlarındaki 'YOL' kökü vasıtasıyla kanıtlanan Akdeniz dil akışı."
  }
];

export function AtlasMap({ locations, onSelectLocation }) {
  // Eğer dısaridan prop gelmezse veya bos gelirse dogrudan staticLocations kullan
  const activeData = (locations && Array.isArray(locations) && locations.length > 0) ? locations : staticLocations;
  const [selectedLoc, setSelectedLoc] = useState(activeData[0]);

  const handleSelect = (loc) => {
    setSelectedLoc(loc);
    if (onSelectLocation) {
      onSelectLocation(loc);
    }
  };

  return (
    <div style={{ width: "100%", backgroundColor: "#02040a", border: "1px solid rgba(255, 215, 0, 0.3)", borderRadius: "10px", padding: "15px", boxSizing: "border-box" }}>
      <h3 style={{ color: "#ffd700", margin: "0 0 12px 0", fontSize: "1rem" }}>
        🗺️ YKOS ANADOLU & DÜNYA COĞRAFİ ATLAS HARİTASI
      </h3>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "10px", marginBottom: "15px" }}>
        {activeData.map((loc, i) => (
          <div
            key={loc.id || i}
            onClick={() => handleSelect(loc)}
            style={{
              background: selectedLoc?.id === loc.id ? "rgba(255,215,0,0.2)" : "rgba(255,215,0,0.04)",
              border: selectedLoc?.id === loc.id ? "1.5px solid #ffd700" : "1px solid rgba(255,215,0,0.2)",
              borderRadius: "8px",
              padding: "12px",
              cursor: "pointer",
              color: "#fff"
            }}
          >
            <div style={{ color: "#ffd700", fontWeight: "bold", fontSize: "0.85rem" }}>📍 {loc.name || loc.id}</div>
            <div style={{ color: "#aaa", fontSize: "0.75rem", marginTop: "4px" }}>{loc.region || "Anadolu Katmanı"}</div>
          </div>
        ))}
      </div>

      {selectedLoc && (
        <div style={{ background: "rgba(0,0,0,0.7)", padding: "14px", borderRadius: "8px", borderLeft: "3.5px solid #ffd700", color: "#ddd", fontSize: "0.82rem", lineHeight: "1.6" }}>
          <strong style={{ color: "#ffd700", display: "block", marginBottom: "4px", fontSize: "0.9rem" }}>📜 {selectedLoc.name} Akademik Konum Raporu:</strong>
          {selectedLoc.details || "Anadolu merkezli kök hece ve damga yayılım hattı."}
        </div>
      )}
    </div>
  );
}

export default AtlasMap;
