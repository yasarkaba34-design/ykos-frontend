import { useState } from "react";
// Import yolunu mega klasörüne yönlendirdik
import BubbleMatrix from "../mega/BubbleMatrix";

import "./MatrixToggle.css";

export default function MatrixToggle({ data }) {
  const [open, setOpen] = useState(false);

  // Okuma ekranından gelen veriyi BubbleMatrix formatına dönüştürme
  const bubbleData = Array.isArray(data)
    ? data
    : [
        {
          label: data?.title || "YKOS Matris",
          color: "#d4af37",
          atlas: data?.atlas || "Anadolu",
          matrix: data?.matrix,
          tags: data?.tags
        }
      ];

  return (
    <div className="matrix-toggle-wrapper">
      <button
        className="matrix-toggle-btn"
        onClick={() => setOpen(!open)}
      >
        MATRİSLERİ GÖRSELLEŞTİR
      </button>

      {open && (
        <div className="matrix-panel">
          <BubbleMatrix data={bubbleData} />
        </div>
      )}
    </div>
  );
}
