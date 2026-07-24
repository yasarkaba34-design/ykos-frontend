import React, { useEffect, useState } from "react";
import { bulkIndexYouTubeChannel } from "../modules/YKOSLiveSemanticEngine/YouTubeBulkIndexer";
import { clusterVideos } from "../modules/YKOSLiveSemanticEngine/YouTubeClusterEngine";
import { getBubbleStyle } from "../modules/YKOSLiveSemanticEngine/MatrixBubbleVisuals";

import YKOS_SYSTEM_ROOTS from "../data/ykos_system_roots";
import { YKOS_LANGUAGE_ROOTS } from "../data/ykos_language_roots";

export default function YKOSDashboard() {
  const [clusters, setClusters] = useState({});

  useEffect(() => {
    const apiKey ="AIzaSyDzvu66ZC5V3aH7LeY8gct_Uzyu7Gy-8mE";
    const channelId = "UCxxxxxxxxxxxx";

    async function loadData() {
      try {
        const index = await bulkIndexYouTubeChannel(apiKey, channelId);
        const grouped = clusterVideos(index);
        setClusters(grouped);
      } catch (error) {
        console.error("YouTube verisi yüklenemedi:", error);
      }
    }

    loadData();
  }, []); // bağımlılık dizisi eklendi, uyarı kalkar

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h1>YKOS Dashboard</h1>
      <h2>YouTube Semantik Haritası</h2>

      {Object.keys(clusters).length === 0 ? (
        <p>Veri yükleniyor...</p>
      ) : (
        Object.keys(clusters).map((clusterName, ci) => (
          <div key={ci} style={{ marginBottom: "30px" }}>
            <h3 style={{ color: "gold" }}>{clusterName}</h3>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                background: "#111",
                padding: "10px",
                borderRadius: "8px"
              }}
            >
              {clusters[clusterName].map((video, i) => {
                const bubble = {
                  position: { x: Math.random() * 20 - 10, y: Math.random() * 20 - 10 },
                  colorEntropy: 0.7 + Math.random() * 0.3,
                  haloIntensity: 0.5 + Math.random() * 0.5,
                  resonance: 0.4 + Math.random() * 0.6
                };

                return (
                  <div key={i} style={getBubbleStyle(bubble)}>
                    <span
                      style={{
                        color: "#fff",
                        fontSize: "10px",
                        position: "absolute",
                        top: "45px",
                        width: "120px"
                      }}
                    >
                      {video.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
