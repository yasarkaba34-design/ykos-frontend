import { useState, useEffect } from "react";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const delay = setTimeout(async () => {
      const res = await fetch(`/api/v1/search?q=${query}`);
      const data = await res.json();
      setResults(data);
    }, 200);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="🔍 Araştırma, Damga, Yazıt, Petroglif, Atlas..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {results.length > 0 && (
        <div className="search-results">
          {results.map((item) => (
            <div key={item.id} className="result-item">
              {item.title} ({item.id})
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
