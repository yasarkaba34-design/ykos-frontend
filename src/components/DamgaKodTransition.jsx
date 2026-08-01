import React, { useState } from "react";
import "./DamgaKodTransition.css";

export default function DamgaKodTransition() {
  const [phase, setPhase] = useState("damga");

  const handleClick = () => {
    setPhase("transition");
    setTimeout(() => setPhase("kod"), 1200);
  };

  return (
    <div className="dk-container">
      {phase === "damga" && (
        <div className="damga" onClick={handleClick}>
          DAMGA
        </div>
      )}

      {phase === "transition" && (
        <div className="transition-grid"></div>
      )}

      {phase === "kod" && (
        <div className="kod">
          KOD
        </div>
      )}
    </div>
  );
}
