// src/App.jsx
import React, { useState } from "react";
import { nodeAnalysisData } from "./nodeAnalysisData";
import YKOSDashboard from "./layouts/YKOSDashboard";
import { defaultArchiveArticles } from "./data/ykosDataService";
import AdminPanel from "./layouts/AdminPanel";
import YalinVeriGirisi from "./pages/YalinVeriGirisi";
import OpsCenter from "./layouts/OpsCenter";
import BubbleMatrix from "./mega/BubbleMatrix.jsx";
import AtlasMap from "./mega/AtlasMap";
import Hakkimizda from "./pages/Hakkimizda";
import ReadingPanel from "./components/ReadingPanel";
import "./index.css";
import AdminLogin from "./components/AdminLogin";

export default function App() {
  const [currentLang, setCurrentLang] = useState("TR");
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedContentId, setSelectedContentId] = useState(null);

    const findContentById = (source, id) => {
    if (!source || !id) return null;

    if (Array.isArray(source)) {
      return (
        source.find(
          (item) =>
            String(item?.id) === String(id) ||
            String(item?.code) === String(id) ||
            String(item?.nodeId) === String(id) ||
            String(item?.contentId) === String(id)
        ) || null
      );
    }

    if (typeof source === "object") {
      if (source[id]) return source[id];

      return (
        Object.values(source).find(
          (item) =>
            String(item?.id) === String(id) ||
            String(item?.code) === String(id) ||
            String(item?.nodeId) === String(id) ||
            String(item?.contentId) === String(id)
        ) || null
      );
    }

    return null;
  };

  const adminSelectedContent = (() => {
    try {
      const records = JSON.parse(
        localStorage.getItem("ykos_admin_records") || "[]"
      );

      return (
        records.find(
          (record) =>
            String(record?.id) === String(selectedContentId)
        ) || null
      );
    } catch (error) {
      console.error("YKOS merkez arşiv okuma hatası:", error);
      return null;
    }
  })();

  const selectedContent =
    findContentById(nodeAnalysisData, selectedContentId) ??
    findContentById(defaultArchiveArticles, selectedContentId) ??
    adminSelectedContent;

  const handleNavigateRead = (id) => {
    setSelectedContentId(id);
    setActiveView("detail");
    window.scrollTo(0, 0);
  };

  const backToDashboard = () => {
    setActiveView("dashboard");
    setSelectedContentId(null);
    window.scrollTo(0, 0);
  };

  const BackButton = () => (
    <div style={{ padding: "10px 20px" }}>
      <button
        onClick={backToDashboard}
        style={{
          background: "#ffd700",
          color: "#000",
          border: "none",
          padding: "8px 16px",
          borderRadius: "6px",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        ⬅ Ana Sayfaya Dön
      </button>
    </div>
  );

  return (
    <div
      style={{
        backgroundColor: "#030712",
        minHeight: "100vh",
        color: "#fff"
      }}
    >
      {activeView === "dashboard" && (
        <YKOSDashboard
          currentLang={currentLang}
          setCurrentLang={setCurrentLang}
          onVisualize={() => setActiveView("matrix")}
          onNavigateRead={handleNavigateRead}
          onNavigateLogin={() => setActiveView("login")}
          onNavigateAtlas={() => setActiveView("atlas")}
          onNavigateEngine={() => setActiveView("dashboard")}
          onNavigateFlow={() => setActiveView("dashboard")}
          onNavigateMethod={() => setActiveView("method")}
          onNavigateAcikVeri={() => setActiveView("acikveri")}
          onNavigateOpsCenter={() => setActiveView("ops")}
        />
      )}

      {activeView === "detail" && (
        <div>
          <BackButton />

          {selectedContent ? (
            <ReadingPanel
              content={selectedContent}
              currentLang={currentLang}
            />
          ) : (
            <div style={{ padding: "30px", color: "#fff" }}>
              Seçilen içeriğin analiz verisi bulunamadı:
              {" "}
              {selectedContentId}
            </div>
          )}
        </div>
      )}

      {activeView === "matrix" && (
        <div>
          <BackButton />
          <BubbleMatrix currentLang={currentLang} />
        </div>
      )}

      {activeView === "atlas" && (
        <div>
          <BackButton />
          <AtlasMap currentLang={currentLang} />
        </div>
      )}

      {activeView === "method" && (
        <div>
          <BackButton />
          <Hakkimizda currentLang={currentLang} />
        </div>
      )}

      {activeView === "acikveri" && (
        <YalinVeriGirisi
          currentLang={currentLang}
          onLogout={backToDashboard}
        />
      )}

      {activeView === "ops" && (
        <div>
          <BackButton />
          <OpsCenter currentLang={currentLang} />
        </div>
      )}

      {activeView === "login" && (
        <AdminLogin
          onSuccess={() => setActiveView("admin")}
          onCancel={() => setActiveView("dashboard")}
        />
      )}

      {activeView === "admin" && (
        <AdminPanel
          currentLang={currentLang}
          onLogout={() => setActiveView("dashboard")}
        />
      )}
    </div>
  );
}