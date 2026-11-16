// src/App.jsx
import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "./data/firebase";

import YKOSDashboard from "./layouts/YKOSDashboard";
import AdminPanel from "./layouts/AdminPanel";
import OpsCenter from "./layouts/OpsCenter";

import AdminLogin from "./pages/AdminLogin";
import YalinVeriGirisi from "./pages/YalinVeriGirisi";
import Hakkimizda from "./pages/Hakkimizda";

import BubbleMatrixPanel from "./pages/BubbleMatrixPanel";
import ProtoRoots3DMatrix from "./pages/ProtoRoots3DMatrix";
import AtlasMap from "./mega/AtlasMap";
import ReadingPanel from "./components/ReadingPanel";
import YKOSAnalysisEngine from "./components/YKOSAnalysisEngine";

import "./index.css";

const routeViews = {
  "/": "dashboard",
  "/test": "test",
  "/matrix": "matrix",
  "/matrix-3d": "matrix3d",
  "/hakkimizda": "method",
  "/analiz": "engine",
  "/atlas": "atlas",
  "/admin": "login",
  "/veri": "acikveri",
  "/ops": "ops",
};
const viewPaths = Object.fromEntries(
  Object.entries(routeViews).map(([path, view]) => [view, path]),
);

function getViewFromPath() {
  let path = window.location.pathname;
  while (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  return routeViews[path] || "dashboard";
}

export default function App() {
  const [currentLang, setCurrentLang] = useState("TR");
  const [activeView, setActiveView] = useState(getViewFromPath);
  const [selectedContentId, setSelectedContentId] = useState(null);

  useEffect(() => {
    const path = viewPaths[activeView];
    if (path && window.location.pathname !== path) {
      window.history.replaceState({}, "", path);
    }
  }, [activeView]);

  useEffect(() => {
    if (activeView !== "test") return undefined;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById("test-root-heading")?.scrollIntoView({ block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [activeView]);

  useEffect(() => {
    const handlePopState = () => setActiveView(getViewFromPath());
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Firebase yönetici oturumu
  const [adminUser, setAdminUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Firebase oturum durumunu sürekli takip eder
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAdminUser(user);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Gerçek Firebase çıkış işlemi
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setAdminUser(null);
      setActiveView("dashboard");
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Çıkış işlemi başarısız:", error);
      alert("Çıkış yapılamadı. Lütfen tekrar deneyiniz.");
    }
  };

  const returnToTuditam = () => window.location.assign("https://tuditam.org/");

  const handleNavigateRead = (id) => {
    setSelectedContentId(id);
    setActiveView("detail");
    window.scrollTo(0, 0);
  };

  return (
    <div
      style={{
        backgroundColor: "#030712",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      {(activeView === "dashboard" || activeView === "test") && (
        <YKOSDashboard
          currentLang={currentLang}
          setCurrentLang={setCurrentLang}
          onVisualize={() => setActiveView("matrix")}
          onNavigate3D={() => setActiveView("matrix3d")}
          onNavigateTuditam={returnToTuditam}
          onNavigateRead={handleNavigateRead}
          onNavigateLogin={() => setActiveView("login")}
          onNavigateAtlas={() => setActiveView("atlas")}
          onNavigateEngine={() => setActiveView("engine")}
          onNavigateFlow={() => setActiveView("dashboard")}
          onNavigateMethod={() => setActiveView("method")}
          onNavigateAcikVeri={() => setActiveView("acikveri")}
          onNavigateOpsCenter={() => setActiveView("ops")}
        />
      )}

      {activeView === "detail" && (
        <div>
          <div style={{ padding: "10px 20px" }}>
            <button
              onClick={returnToTuditam}
              style={{
                background: "#ffd700",
                color: "#000",
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              ⬅ Ana Sayfaya Dön
            </button>
          </div>

          <ReadingPanel
            content={selectedContentId}
            currentLang={currentLang}
          />
        </div>
      )}

      {activeView === "engine" && (
        <div>
          <div style={{ padding: "10px 20px" }}>
            <button
              onClick={() => setActiveView("dashboard")}
              style={{
                background: "#ffd700",
                color: "#000",
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              ⬅ Ana Sayfaya Dön
            </button>
          </div>

          <YKOSAnalysisEngine />
        </div>
      )}

      {activeView === "matrix" && (
        <BubbleMatrixPanel onGoHome={returnToTuditam} />
      )}

      {activeView === "matrix3d" && (
        <ProtoRoots3DMatrix onGoHome={returnToTuditam} />
      )}

      {activeView === "atlas" && (
        <div>
          <div style={{ padding: "10px 20px" }}>
            <button
              onClick={() => setActiveView("dashboard")}
              style={{
                background: "#ffd700",
                color: "#000",
                border: "1px solid #ffd700",
                padding: "8px 16px",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              ⬅ Ana Sayfaya Dön
            </button>
          </div>

          <AtlasMap currentLang={currentLang} />
        </div>
      )}

      {activeView === "method" && (
        <Hakkimizda
          currentLang={currentLang}
          onNavigateHome={returnToTuditam}
        />
      )}

      {activeView === "acikveri" && (
        <YalinVeriGirisi
          currentLang={currentLang}
          onLogout={returnToTuditam}
        />
      )}

      {activeView === "ops" && (
        <div>
          <div style={{ padding: "10px 20px" }}>
            <button
              onClick={() => setActiveView("dashboard")}
              style={{
                background: "#ffd700",
                color: "#000",
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              ⬅ Ana Sayfaya Dön
            </button>
          </div>

          <OpsCenter currentLang={currentLang} />
        </div>
      )}

      {activeView === "login" &&
        (authLoading ? (
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffd700",
              fontWeight: "bold",
            }}
          >
            Oturum kontrol ediliyor...
          </div>
        ) : adminUser ? (
          <AdminPanel
            currentLang={currentLang}
            onLogout={handleLogout}
          />
        ) : (
          <AdminLogin
            onBack={returnToTuditam}
          />
        ))}
    </div>
  );
}