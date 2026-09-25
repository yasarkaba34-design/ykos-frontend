// file: src/mega/SemanticPanel.tsx
import React from "react";

type SemanticPanelProps = {
  rmv: string;
};

export const SemanticPanel: React.FC<SemanticPanelProps> = ({ rmv }) => {
  return (
    <div style={{ marginTop: "20px", padding: "12px", background: "#222", borderRadius: "6px" }}>
      <h3>SemanticPanel</h3>
      <p>{rmv || "Henüz bir RMV üretilmedi."}</p>
    </div>
  );
};
