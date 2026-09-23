// src/mega/BubbleMatrixView.jsx
import React, { useEffect } from "react";
import { useYKOS } from "../../hooks/useYKOS";

export const BubbleMatrixView = () => {
  const ykos = useYKOS();

  useEffect(() => {
    ykos.setFlow();
  }, []);

  return <canvas id="bubble-matrix" />;
};
