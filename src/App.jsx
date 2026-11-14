// src/App.jsx
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./data/firebase";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";

import "./index.css";

// SAYFALAR & BİLEŞENLER
import YKOSDashboard from "./layouts/YKOSDashboard";
import AdminPanel from "./layouts/AdminPanel";
import YalinVeriGirisi from "./pages/YalinVeriGirisi";
import OpsCenter from "./layouts/OpsCenter";
import BubbleMatrix from "./mega/BubbleMatrix";
import RootInventory from "./pages/RootInventory";
import AtlasMap from "./mega/AtlasMap";
import Hakkimizda from "./pages/Hakkimizda";
import ReadingPanel from "./components/ReadingPanel";
import AdminLogin from "./components/AdminLogin";
import OpenData from "./pages/AcikVeriPortali";
import Archive from "./pages/Archive";
import VideoArchive from "./pages/VideoArchive";
import YKOSAnalysisEngine from "./components/YKOSAnalysisEngine";
import ProtoRoots3DMatrix from "./pages/ProtoRoots3DMatrix";
import RootTestPage from "./pages/RootTestPage";

// ANA SAYFA YÖNLENDİRMELERİ
function DashboardWrapper() {
  const navigate = useNavigate();

  // TUDITAM gelen ID'leri otomatik YKOS'a çevirip yönlendirir
  const handleNavigateRead = (id) => {
    if (!id) return;
    const cleanId = String(id);
    navigate(`/read/${encodeURIComponent(cleanId)}`);
  };

  return (
    <YKOSDashboard
      currentLang="TR"
      setCurrentLang={() => {}}
      onVisualize={() => navigate("/matrix")}
      onNavigateTest={() => navigate("/test")}
      onNavigate3D={() => navigate("/matrix-3d")}
      onNavigateRead={handleNavigateRead}
      onNavigateLogin={() => navigate("/admin-login")}
      onNavigateAtlas={() => navigate("/atlas")}
      onNavigateEngine={() => navigate("/analiz")}
      onNavigateFlow={() => navigate("/atlas")}
      onNavigateMethod={() => navigate("/hakkimizda")}
      onNavigateAcikVeri={() => navigate("/open-data")}
      onNavigateOpsCenter={() => navigate("/ops")}
    />
  );
}

// OKUMA PANELİ SARMALAYICI (URL'deki ID'yi okur ve normalize eder)
function ReadingPanelWrapper() {
  const { id } = useParams();
  const normalizedId = id;

  return <ReadingPanel id={normalizedId} readId={normalizedId} />;
}

function HakkimizdaWrapper() {
  const navigate = useNavigate();
  return (
    <Hakkimizda
      onNavigateHome={() => navigate("/")}
      onNavigateMatrix={() => navigate("/matrix")}
    />
  );
}

// YÖNETİCİ GİRİŞİ YÖNLENDİRMELERİ
function AdminLoginWrapper() {
  const navigate = useNavigate();

  return (
    <AdminLogin
      onSuccess={() => navigate("/admin", { replace: true })}
      onCancel={() => navigate("/", { replace: true })}
    />
  );
}

// YÖNETİCİ PANELİ ÇIKIŞ YÖNLENDİRMESİ
function AdminPanelWrapper() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => onAuthStateChanged(auth, current => {
    setUser(current); setLoading(false);
  }, () => { setError("Oturum kontrol edilemedi. Sayfayı yenileyin."); setLoading(false); }), []);
  if (loading) return <p role="status">Oturum kontrol ediliyor…</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!user || user.uid !== "WnKrb0wcY3dHpSJjdn9b2aAwTw02") return <Navigate to="/admin-login" replace />;
  return <AdminPanel onLogout={() => signOut(auth)} />;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* ANA SAYFA */}
        <Route path="/" element={<DashboardWrapper />} />

        {/* ARŞİV */}
        <Route path="/arsiv" element={<Archive />} />

        {/* BALONCUK MATRİSİ */}
        <Route
          path="/matrix"
          element={
            <div>
              <div
                style={{
                  position: "sticky",
                  top: 0,
                  zIndex: 1000,
                  display: "flex",
                  justifyContent: "center",
                  padding: "8px 12px",
                  background: "rgba(3, 7, 18, 0.94)",
                  borderBottom: "1px solid rgba(255, 215, 0, 0.28)",
                }}
              >
                <button
                  type="button"
                  onClick={() => window.location.assign("/")}
                  aria-label="Ana sayfaya dön"
                  style={{
                    background: "rgba(255, 215, 0, 0.1)",
                    border: "1px solid #ffd700",
                    color: "#ffd700",
                    padding: "8px 16px",
                    borderRadius: "7px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  ⬅ Ana Sayfaya Dön
                </button>
              </div>
              <BubbleMatrix />
              <RootInventory />
            </div>
          }
        />
        <Route path="/test" element={<RootTestPage />} />
        <Route path="/matrix-3d" element={<ProtoRoots3DMatrix onGoHome={() => window.location.assign("/")} />} />
        <Route path="/analiz" element={<YKOSAnalysisEngine />} />

        {/* ATLAS */}
        <Route path="/atlas" element={<AtlasMap />} />

        {/* AÇIK VERİ PORTALI */}
        <Route path="/open-data" element={<OpenData />} />

        {/* HAKKIMIZDA */}
        <Route path="/hakkimizda" element={<HakkimizdaWrapper />} />

        {/* YÖNETİCİ */}
        <Route path="/admin-login" element={<AdminLoginWrapper />} />
        <Route path="/admin" element={<AdminPanelWrapper />} />

        {/* OPERASYON MERKEZİ */}
        <Route path="/ops" element={<OpsCenter />} />

        {/* YALIN VERİ GİRİŞİ */}
        <Route path="/acikveri" element={<YalinVeriGirisi />} />

        {/* OKUMA PANELİ */}
        <Route path="/read/:id" element={<ReadingPanelWrapper />} />

        {/* VİDEO ARŞİVİ */}
        <Route path="/video-archive" element={<VideoArchive />} />

        {/* GEÇERSİZ ADRESLERİ ANA SAYFAYA GÖNDER */}
        <Route path="*" element={<DashboardWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;
