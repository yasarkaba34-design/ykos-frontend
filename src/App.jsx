import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import YKOSDashboard from "./layouts/YKOSDashboard";
import ReadingScreen from "./components/ReadingScreen";
import "./App.css";

export default function App() {
  return (
    <div style={{ backgroundColor: "#0a0a0a", minHeight: "100vh", color: "#fff" }}>
      {/* Üst Bar */}
      <Header />

      {/* Sayfa Yönlendirmeleri (Routing) */}
      <main style={{ width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "10px", boxSizing: "border-box" }}>
        <Routes>
          {/* Ana Sayfa: YKOS Dashboard */}
          <Route path="/" element={<YKOSDashboard />} />
          
          {/* Okuma / Çözüm Detay Ekranı */}
          <Route path="/read/:id" element={<ReadingScreen />} />
        </Routes>
      </main>
    </div>
  );
}