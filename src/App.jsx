import React, { useState } from "react";
import YKOSDashboard from "./layouts/YKOSDashboard";
import MatrixToggle from "./components/MatrixToggle";
import ReadingScreen from "./components/ReadingScreen";
import archiveData from "./api/archive.json";
import "./App.css";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("dashboard"); // "dashboard", "matrix", "read"
  const [selectedReadId, setSelectedReadId] = useState(1);

  const handleNavigateRead = (id) => {
    setSelectedReadId(id);
    setCurrentScreen("read");
  };

  return (
    <div className="app-main-wrapper" style={{ backgroundColor: "#050811", minHeight: "100vh", color: "#fff" }}>
      <main style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}>
        
        {currentScreen === "dashboard" && (
          <YKOSDashboard 
            onVisualize={() => setCurrentScreen("matrix")} 
            onNavigateRead={handleNavigateRead}
          />
        )}

        {currentScreen === "matrix" && (
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <button 
              onClick={() => setCurrentScreen("dashboard")}
              style={{
                background: "rgba(255, 215, 0, 0.15)",
                border: "1px solid #ffd700",
                color: "#ffd700",
                padding: "8px 18px",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
                marginBottom: "15px"
              }}
            >
              ⬅ Ana Panele Dön
            </button>
            <MatrixToggle data={archiveData} />
          </div>
        )}

        {currentScreen === "read" && (
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <button 
              onClick={() => setCurrentScreen("dashboard")}
              style={{
                background: "rgba(255, 215, 0, 0.15)",
                border: "1px solid #ffd700",
                color: "#ffd700",
                padding: "8px 18px",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
                marginBottom: "15px"
              }}
            >
              ⬅ Ana Panele Dön
            </button>
            <ReadingScreen readId={selectedReadId} />
          </div>
        )}

      </main>
    </div>
  );
}
