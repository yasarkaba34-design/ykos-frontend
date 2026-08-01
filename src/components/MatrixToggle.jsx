import { useState } from "react";
// Import yolunu mega klasörüne yönlendirdik
import BubbleMatrix from "../mega/BubbleMatrix";

import "./MatrixToggle.css";

export default function MatrixToggle({ data }) {
  const [open, setOpen] = useState(false);

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
          <BubbleMatrix data={data} />
        </div>
      )}
    </div>
  );
}
