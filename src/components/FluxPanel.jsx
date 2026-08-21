import { useEffect, useState } from "react";

const FluxPanel = () => {
  const [fluxData, setFluxData] = useState(null);

  // 🔥 1) BubbleMatrix baloncuğu tıklanınca Flux başlat
  useEffect(() => {
    const startHandler = (e) => {
      setFluxData({
        id: e.detail.id,
        title: e.detail.title,
        category: e.detail.category,
        ykosCode: e.detail.ykosCode,
        loading: true
      });
    };

    window.addEventListener("flux-start", startHandler);
    return () => window.removeEventListener("flux-start", startHandler);
  }, []);

  // 🔥 2) Evaluator sonucu gelince Flux güncelle
  useEffect(() => {
    const updateHandler = (e) => {
      setFluxData((prev) => ({
        ...prev,
        ...e.detail,
        loading: false
      }));
    };

    window.addEventListener("flux-update", updateHandler);
    return () => window.removeEventListener("flux-update", updateHandler);
  }, []);

  if (!fluxData) return null;

  return (
    <div style={panelStyle}>
      <h3 style={titleStyle}>Semiyotik Akış Paneli</h3>

      <p><strong>Başlık:</strong> {fluxData.title}</p>
      <p><strong>Kategori:</strong> {fluxData.category}</p>
      <p><strong>Kök-Hece:</strong> {fluxData.root || "—"}</p>
      <p><strong>Sembol:</strong> {fluxData.symbol || "—"}</p>
      <p><strong>Dönem:</strong> {fluxData.period || "—"}</p>

      {fluxData.loading ? (
        <p style={{ color: "#f1c40f" }}>Evaluator çalışıyor...</p>
      ) : (
        <>
          <p><strong>Anlam:</strong> {fluxData.meaning}</p>
          <p><strong>Bağlantılar:</strong> {fluxData.connections?.join(" ↔ ")}</p>
        </>
      )}
    </div>
  );
};

export default FluxPanel;

// 🎨 Panel Stili
const panelStyle = {
  position: "absolute",
  right: "20px",
  bottom: "20px",
  background: "#0b0b0b",
  border: "1px solid #f1c40f",
  padding: "16px",
  borderRadius: "8px",
  color: "#fff",
  width: "320px",
  fontFamily: "Inter, sans-serif",
  zIndex: 999
};

const titleStyle = {
  color: "#f1c40f",
  marginBottom: "8px"
};
