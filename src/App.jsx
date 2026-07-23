// FILE: src/App.jsx
import React from "react";
import YKOSAnadoluEvrenselPano from "./mega/YKOSAnadoluEvrenselPano";

export default function App() {
  return (
    <main
      style={{
        backgroundColor: "#050505",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "40px 20px",
        boxSizing: "border-box",
        color: "#fff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}
    >
      <YKOSAnadoluEvrenselPano />
    </main>
  );
}
