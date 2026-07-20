import React, { useEffect } from "react";
import { YKOS_ROOTS } from "../data/ykos_roots"; // c harfi k olarak nizamî hale getirildi

export default function AutoPilotEngine({ onAutoRoot }) {

  useEffect(() => {
    const keys = Object.keys(YKOS_ROOTS);

    const cycle = setInterval(() => {
      const randomRoot = keys[Math.floor(Math.random() * keys.length)];
      onAutoRoot(randomRoot);
    }, 4000); // 4 saniyede bir otomatik kök

    return () => clearInterval(cycle);
  }, []);

  return (
    <div className="dashboard-card">
      <h2>🛸 AutoPilot Motoru</h2>
      <div>YKOS şu anda otomatik modda çalışıyor.</div>
    </div>
  );
}
