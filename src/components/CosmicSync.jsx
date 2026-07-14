import React, { useEffect } from "react";

export default function CosmicSync({ selectedRoot }) {

  useEffect(() => {
    if (!selectedRoot) return;

    const cosmicPacket = {
      root: selectedRoot,
      cosmicSync: true,
      timestamp: Date.now(),
      level: "COSMIC_SYNC"
    };

    console.log("CosmicSync:", cosmicPacket);

  }, [selectedRoot]);

  return (
    <div className="dashboard-card">
      <h2>✨ CosmicSync</h2>
      <div>Kozmik senkronizasyon aktif.</div>
    </div>
  );
}
