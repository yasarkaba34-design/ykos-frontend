import { useEffect, useState } from "react";

export default function BubbleMatrixView({ db }) {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    async function load() {
      const { bubbleMatrix } = await bootstrapYKOS(db);
      const data = await bubbleMatrix.getBubbles();
      setBubbles(data);
    }

    load();
  }, []);

  return (
    <div className="bubble-area">
      {bubbles.map(b => (
        <Bubble
          key={b.id}
          x={b.bubble.x}
          y={b.bubble.y}
          color={b.bubble.color}
          label={b.bubble.label}
        />
      ))}
    </div>
  );
}
