import React, { useState } from "react";
import { YKOS_ROOTS } from "../data/ycos_roots";
import { YKOS_GEO } from "../data/ycos_geo";
geo: YKOS_GEO[item.step] || null
import LayerSystem from "./LayerSystem";
export default function SemanticEngine({ onRootSelect }) {

export default function SemanticEngine() {
  const [input, setInput] = useState("");
  const [chain, setChain] = useState([]);

  const SEMANTIC_STEPS = ["TUT", "KUR", "BA", "YOL", "BİR", "KAL"];
import GraphMatrix from "./GraphMatrix";

  const analyze = () => {
    if (!input.trim()) return;

    // Basit YKOS zinciri: her adımda kökü işleyip bir aşama üret
    const result = SEMANTIC_STEPS.map((step, index) => {
      return {
        step,
        value: `${step}-${input}-${index}`
      };
    });

    setChain(result);
  };

  return (
    <div>
      <h2>Semantik Motor</h2>
<LayerSystem selectedRoot={selectedRoot} />

      <input
        type="text"
        placeholder="Kök gir..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={analyze}>Çözümle</button>

      <div className="semantic-output">
        {chain.map((item) => (
          <div key={item.step}>
            <strong>{item.step}</strong> → {item.value}
          </div>
        ))}
      </div>
    </div>
  );
}
import React, { useState } from "react";

const ROOTS = {
  "TUT": ["tut", "tutmak", "tutucu"],
  "KUR": ["kur", "kurmak", "kurucu"],
  "BA": ["ba", "bağ", "bağla"],
  "YOL": ["yol", "yolcu", "yolmak"],
  "BİR": ["bir", "birlik", "birleş"],
  "KAL": ["kal", "kalmak", "kalıcı"]
};

const analyzeRoot = (root) => {
  const steps = ["TUT", "KUR", "BA", "YOL", "BİR", "KAL"];

  return steps.map((step) => {
    const matches = ROOTS[step].filter((item) =>
      item.startsWith(root.toLowerCase())
    );

    return {
      step,
      matches: matches.length > 0 ? matches : ["eşleşme yok"]
    };
  });
};

export default function SemanticEngine() {
  const [input, setInput] = useState("");
  const [chain, setChain] = useState([]);

  const handleAnalyze = () => {
    const result = analyzeRoot(input);
    setChain(result);
  };
const YKOS_ROOTS = {
  TUT: {
    kökler: ["tut", "tutmak", "tutucu"],
    anlam: "tutma, kavrama, bağlama başlangıcı",
    kategori: "başlangıç eylemi"
  },
  KUR: {
    kökler: ["kur", "kurmak", "kurucu"],
    anlam: "kurma, yapı oluşturma",
    kategori: "yapı eylemi"
  },
  BA: {
    kökler: ["ba", "bağ", "bağla"],
    anlam: "bağlama, ilişki kurma",
    kategori: "ilişki eylemi"
  },
  YOL: {
    kökler: ["yol", "yolcu", "yolmak"],
    anlam: "yol alma, yön belirleme",
    kategori: "hareket eylemi"
  },
  BİR: {
    kökler: ["bir", "birlik", "birleş"],
    anlam: "birleştirme, bütünleme",
    kategori: "birlik eylemi"
  },
  KAL: {
    kökler: ["kal", "kalmak", "kalıcı"],
    anlam: "kalma, süreklilik",
    kategori: "süreklilik eylemi"
  }
};

  return (
    <div>
      <h2>Semantik Motor</h2>

      <input
        type="text"
        placeholder="Kök gir..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={handleAnalyze}>Çözümle</button>

      <div className="semantic-output">
        {chain.map((item) => (
          <div key={item.step}>
            <strong>{item.step}</strong> → {item.matches.join(", ")}
          </div>
        ))}
      </div>
    </div>
  );
}
import React, { useState } from "react";

const YKOS_ROOTS = {
  TUT: { kökler: ["tut", "tutmak", "tutucu"], anlam: "tutma, kavrama", kategori: "başlangıç" },
  KUR: { kökler: ["kur", "kurmak", "kurucu"], anlam: "kurma, yapı", kategori: "oluşum" },
  BA:  { kökler: ["ba", "bağ", "bağla"], anlam: "bağlama, ilişki", kategori: "ilişki" },
  YOL: { kökler: ["yol", "yolcu", "yolmak"], anlam: "yol alma, yön", kategori: "hareket" },
  BİR: { kökler: ["bir", "birlik", "birleş"], anlam: "birleştirme", kategori: "birlik" },
  KAL: { kökler: ["kal", "kalmak", "kalıcı"], anlam: "kalma, süreklilik", kategori: "süreklilik" }
};

const analyzeYKOS = (root) => {
  const steps = ["TUT", "KUR", "BA", "YOL", "BİR", "KAL"];

  return steps.map((step) => {
    const data = YKOS_ROOTS[step];
    const matches = data.kökler.filter((item) =>
      item.startsWith(root.toLowerCase())
    );

    return {
      step,
      matches: matches.length ? matches : ["eşleşme yok"],
      anlam: data.anlam,
      kategori: data.kategori
    };
  });
};

export default function SemanticEngine() {
  const [input, setInput] = useState("");
  const [chain, setChain] = useState([]);

  const handleAnalyze = () => {
    setChain(analyzeYKOS(input));
  };

  return (
    <div>
      <h2>Semantik Motor</h2>

      <input
        type="text"
        placeholder="Kök gir..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={handleAnalyze}>Çözümle</button>

      <div className="semantic-output">
        {chain.map((item) => (
          <div key={item.step}>
            <strong>{item.step}</strong>  
            <br />
            Kök: {item.matches.join(", ")}  
            <br />
            Anlam: {item.anlam}  
            <br />
            Kategori: {item.kategori}
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}
const analyzeYKOS = (root) => {
  const steps = ["TUT", "KUR", "BA", "YOL", "BİR", "KAL"];

  return steps.map((step) => {
    const data = YKOS_ROOTS[root.toUpperCase()] || null;
import GraphMatrix from "./GraphMatrix";

    if (!data) {
      return {
        step,
        matches: ["kök bulunamadı"],
        anlam: "-",
        kategori: "-",
        fonetik: "-",
        geo: "-",
        kültür: "-"
      };
    }
<GraphMatrix selectedRoot={selectedRoot} />

    return {
      step,
      matches: data.varyantlar || [],
      anlam: data.anlam || "-",
      kategori: data.kategori || "-",
      fonetik: data.fonetik || "-",
      geo: data.geo || "-",
      kültür: data.kültür || "-"
    };
  });
};
