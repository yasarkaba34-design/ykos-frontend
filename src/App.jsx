import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import YKOSDashboard from "./layouts/YKOSDashboard";

export default function App() {
  return (
    <div style={{ backgroundColor: "#050811", minHeight: "100vh", color: "#ffffff" }}>
      <Header />
      <main style={{ padding: "15px", maxWidth: "1200px", margin: "0 auto" }}>
        <Routes>
          <Route path="/" element={<YKOSDashboard />} />
          <Route path="*" element={<YKOSDashboard />} />
        </Routes>
      </main>
    </div>
  );
}