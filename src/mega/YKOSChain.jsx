// FILE: src/mega/YKOSChain.jsx

import React, { useState } from "react";
import "./YKOSChain.css";

// Animasyon modülleri
import DamgaKodTransition from "../components/DamgaKodTransition.jsx";
import KodSistemTransition from "../components/KodSistemTransition.jsx";
import SistemAlgoritmaTransition from "../components/SistemAlgoritmaTransition.jsx";

export default function YKOSChain() {
  const [active, setActive] = useState("damga");

  return (
    <div className="chain-container">

      {/* DAMGA → KOD */}
      {active === "damga" && (
        <div onClick={() => setActive("kod")}>
          <DamgaKodTransition />
        </div>
      )}

      {/* KOD → SİSTEM */}
      {active === "kod" && (
        <div onClick={() => setActive("sistem")}>
          <KodSistemTransition />
        </div>
      )}

      {/* SİSTEM → ALGORİTMA */}
      {active === "sistem" && (
        <div onClick={() => setActive("algoritma")}>
          <SistemAlgoritmaTransition />
        </div>
      )}

      {/* ALGORİTMA (Final) */}
      {active === "algoritma" && (
        <div>
          <SistemAlgoritmaTransition />
          <h2 className="final-text">Algoritma Çekirdeği Aktif</h2>
        </div>
      )}

    </div>
  );
}
// FILE: src/mega/YKOSChain.jsx

import React, { useState, useEffect } from "react";
import "./YKOSChain.css";

import DamgaKodTransition from "../components/DamgaKodTransition.jsx";
import KodSistemTransition from "../components/KodSistemTransition.jsx";
import SistemAlgoritmaTransition from "../components/SistemAlgoritmaTransition.jsx";

export default function YKOSChain() {
  const [active, setActive] = useState("damga");
  const [demo, setDemo] = useState(true); // otomatik mod

  // DEMO MODU: zinciri otomatik oynat
  useEffect(() => {
    if (!demo) return;

    const timer = setTimeout(() => {
      if (active === "damga") setActive("kod");
      else if (active === "kod") setActive("sistem");
      else if (active === "sistem") setActive("algoritma");
    }, 1800);

    return () => clearTimeout(timer);
  }, [active, demo]);

  // Kullanıcı tıklarsa demo durur
  const manualNext = (next) => {
    setDemo(false);
    setActive(next);
  };

  return (
    <div className="chain-container">

      {active === "damga" && (
        <div onClick={() => manualNext("kod")}>
          <DamgaKodTransition />
        </div>
      )}

      {active === "kod" && (
        <div onClick={() => manualNext("sistem")}>
          <KodSistemTransition />
        </div>
      )}

      {active === "sistem" && (
        <div onClick={() => manualNext("algoritma")}>
          <SistemAlgoritmaTransition />
        </div>
      )}

      {active === "algoritma" && (
        <div>
          <SistemAlgoritmaTransition />
          <h2 className="final-text">Algoritma Çekirdeği Aktif</h2>
        </div>
      )}

    </div>
  );
}
