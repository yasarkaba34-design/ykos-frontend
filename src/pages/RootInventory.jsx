import React, { useMemo, useState } from "react";
import rootData from "../data/protoRoots100.json";

const records = Array.isArray(rootData?.records) ? rootData.records : [];

export default function RootInventory() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("tr");
    if (!normalized) return records;
    return records.filter((record) =>
      [record.id, record.label, record.proto_hece, record.ritim, record.semiyotik, record.geo]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase("tr")
        .includes(normalized)
    );
  }, [query]);

  return (
    <section id="root-inventory" style={{ maxWidth: "1100px", margin: "0 auto 28px", padding: "20px 16px", color: "#f8fafc", fontFamily: "Segoe UI, sans-serif", scrollMarginTop: "16px" }}>
      <div style={{ border: "1px solid #0e7490", borderRadius: "12px", overflow: "hidden", background: "#07111d" }}>
        <header style={{ padding: "16px", borderBottom: "1px solid rgba(14,116,144,.5)" }}>
          <h2 style={{ margin: "0 0 8px", color: "#67e8f9", fontSize: "1.1rem" }}>
            Kök-Hece Prototip Envanteri
            <span style={{ color: "#fbbf24", marginLeft: "8px" }}>({filtered.length} / {records.length})</span>
          </h2>
          <p style={{ color: "#cbd5e1", margin: 0, fontSize: "0.83rem", lineHeight: 1.55 }}>
            Bu 100 kayıt araştırma adayıdır. Kaynakça ve ilk tarihsel tanıklık bilgileri doğrulanmadan kesin kök sonucu sayılmaz.
          </p>
          <label htmlFor="root-hece-filter" style={{ display: "block", color: "#94a3b8", fontSize: "0.8rem", marginTop: "14px", marginBottom: "6px" }}>
            Kayıtlarda ara
          </label>
          <input
            id="root-hece-filter"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Kavram, prototip hece, ritim veya coğrafya"
            style={{ boxSizing: "border-box", width: "100%", padding: "10px 12px", border: "1px solid #334155", borderRadius: "7px", background: "#030712", color: "#f8fafc" }}
          />
          <p role="status" style={{ margin: "8px 0 0", color: "#fbbf24", fontSize: "0.78rem" }}>
            {filtered.length} / {records.length} kayıt gösteriliyor
          </p>
        </header>
        <div style={{ maxHeight: "560px", overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "680px", fontSize: "0.82rem" }}>
            <thead style={{ position: "sticky", top: 0, background: "#111827", color: "#fbbf24", textAlign: "left" }}>
              <tr>
                {["No", "Kavram", "Prototip hece", "Ritim", "Semiyotik not", "Coğrafi not"].map((heading) => (
                  <th key={heading} style={{ padding: "10px", borderBottom: "1px solid #334155" }}>{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((record) => (
                <tr key={record.id}>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid #1e293b", color: "#94a3b8" }}>{record.id}</td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid #1e293b", color: "#f8fafc" }}>{record.label}</td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid #1e293b", color: "#67e8f9", fontWeight: 700 }}>{record.proto_hece}</td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid #1e293b", color: "#cbd5e1" }}>{record.ritim}</td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid #1e293b", color: "#cbd5e1" }}>{record.semiyotik}</td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid #1e293b", color: "#94a3b8" }}>{record.geo}</td>
                </tr>
              ))}
              {!filtered.length && (
                <tr><td colSpan="6" style={{ padding: "18px", textAlign: "center", color: "#94a3b8" }}>Bu aramayla eşleşen kayıt yok.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
