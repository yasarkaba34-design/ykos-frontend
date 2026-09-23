// FILE: src/mega/BubbleMatrixView.jsx
import React, { useEffect } from "react";
import { useYKOS } from "./hooks/useYKOS";

export const BubbleMatrixView = () => {
  const ykos = useYKOS();

  useEffect(() => {
    if (!ykos) return;

    // YKOS çekirdeğini başlat
    ykos.startLoop();

    return () => {
      ykos.stopLoop();
    };
  }, [ykos]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: "10px"
      }}
    >
      <canvas
        id="bubble-matrix"
        width={800}
        height={600}
        style={{
          maxWidth: "100%",
          height: "auto",
          border: "1px solid #ffd700",
          borderRadius: "8px",
          background: "#050811"
        }}
      />
    </div>
  );
};
