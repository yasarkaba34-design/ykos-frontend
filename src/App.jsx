import React from "react";
import { Routes, Route } from "react-router-dom";
import YKOSDashboard from "./layouts/YKOSDashboard";
import ReadingScreen from "./components/ReadingScreen";
import "./App.css";

export default function App() {
  return (
    <div className="app-main-wrapper" style={{ backgroundColor: "#050811", minHeight: "100vh", color: "#fff" }}>
      {/* Çift başlığı engellemek için dışarıdaki eski Header bileşeni kaldırıldı */}
      <main style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}>
        <Routes>
          <Route path="/" element={<YKOSDashboard />} />
          <Route path="/read/:id" element={<ReadingScreen />} />
          <Route path="*" element={<YKOSDashboard />} />
        </Routes>
      </main>
    </div>
  );
}