// FILE: src/components/KodSistemTransition.jsx

import React, { useState } from "react";
import "../style/KodSistemTransition.css";

export default function KodSistemTransition() {
  const [phase, setPhase] = useState("kod");

  const handleClick = () => {
    setPhase("transition");
    setTimeout(() => setPhase("sistem"), 1400);
  };

  return (
    <div className="ks-container">
      {phase === "kod" && (
        <div className="kod-surface" onClick={handleClick}>
          KOD
        </div>
      )}

      {phase === "transition" && (
        <div className="system-build-grid"></div>
      )}

      {phase === "sistem" && (
        <div className="sistem-core">
          SİSTEM
        </div>
      )}
    </div>
  );
}
