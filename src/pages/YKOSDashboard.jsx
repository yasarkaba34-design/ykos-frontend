import React, { useEffect, useState } from "react";
import { bulkIndexYouTubeChannel } from "../modules/YKOSLiveSemanticEngine/YouTubeBulkIndexer";
import { clusterVideos } from "../modules/YKOSLiveSemanticEngine/YouTubeClusterEngine";
import { getBubbleStyle } from "../modules/YKOSLiveSemanticEngine/MatrixBubbleVisuals";

export default function YKOSDashboard() {
  const [clusters, setClusters] = useState({});

  useEffect(() => {
    bulkIndexYouTubeChannel("YOUR_API_KEY", "UCxxxxxxxxxxxx").then(index => {
      const grouped = clusterVideos(index);
      setClusters(grouped);
    });
  }, []);

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h1>YKOS Dashboard</h1>
      <h2>YouTube Semantik Haritası</h2>

      {Object.keys(clusters).map((clusterName, ci) => (
        <div key={ci} style={{ marginBottom: "40px" }}>
          <h3 style={{ color: "gold" }}>{clusterName}</h3>

          <div
            style={{
              position: "relative",
              width: "100%",
              height: "300px",
              background: "#000",
              overflow: "hidden",
              border: "1px solid #333",
              borderRadius: "8px",
              marginTop: "10px"
            }}
          >
            {clusters[clusterName].map((video, i) => {
              const bubble = {
                position: {
                  x: Math.random() * 20 - 10,
                  y: Math.random() * 20 - 10
                },
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
      ))}
    </div>
  );
}
