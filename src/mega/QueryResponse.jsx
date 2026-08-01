/**
 * QueryResponse.jsx
 * YKOS Sorgu & Yanıt ekranı
 * - Kullanıcı sorgusunu alır
 * - Semantic Engine’e gönderir (simüle edilmiş)
 * - RMV vektörünü üretir ve BubbleMatrix’e aktarır
 */

import { useState } from "react";

export default function QueryResponse({ onRMV }) {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");

  // Basit semantik çözümleme simülasyonu
  const semanticProcess = (text) => {
    const roots = ["AT", "OK", "ER", "EL"];
    const found = roots.filter((r) => text.toUpperCase().includes(r));
    return found.length ? found : ["AT"]; // fallback
  };

  const handleQuery = () => {
    const result = `Sorgu işlendi: ${query}`;
    setAnswer(result);

    // RMV vektörü üretimi
    const rmvVector = semanticProcess(query);

    // BubbleMatrix’e gönder
    onRMV(rmvVector);
  };

  return (
    <div className="query-box">
      <input
        id="queryInput"
        type="text"
        placeholder="Damga, kök hece, ülke, il..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={handleQuery}>Sorgula</button>

      <div className="answer-box">{answer}</div>
    </div>
  );
}
