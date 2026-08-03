import React, { useState } from "react";
import YKOSDashboard from "./layouts/YKOSDashboard";
import YKOSVisualization from "./layouts/YKOSVisualization";

export default function App() {
  const [currentView, setCurrentView] = useState("dashboard"); // "dashboard", "visualize", "read", "login"
  const [userRole, setUserRole] = useState("researcher");

  const handleNavigateLogin = (role) => {
    setUserRole(role);
    setCurrentView("login");
  };

  return (
    <div className="app-main-wrapper" style={{ backgroundColor: "#050811", minHeight: "100vh", color: "#ffffff" }}>
      
      {/* SAĞ ÜSTTEKİ EKSİ KÜÇÜK LINK BURADAN KESİNLİKLE KALDIRILDI */}

      {/* SAYFA İÇERİKLERİ */}
      {currentView === "dashboard" && (
        <YKOSDashboard 
          onVisualize={() => setCurrentView("visualize")}
          onNavigateRead={(id) => setCurrentView("read")}
          onNavigateLogin={handleNavigateLogin}
          onGoHome={() => setCurrentView("dashboard")}
        />
      )}

      {currentView === "visualize" && (
        <YKOSVisualization onBack={() => setCurrentView("dashboard")} />
      )}

      {currentView === "login" && (
        <div style={{ maxWidth: "500px", margin: "60px auto", padding: "30px", backgroundColor: "#050811", border: "1px solid #ffd700", borderRadius: "12px", textAlign: "center" }}>
          <h2 style={{ color: "#ffd700", marginBottom: "10px" }}>
            🔑 {userRole === "admin" ? "YÖNETİCİ" : "ARAŞTIRMACI"} VERİ GİRİŞ PORTALI
          </h2>
          <p style={{ color: "#aaa", fontSize: "0.85rem", marginBottom: "20px" }}>
            Lütfen yetkili kullanıcı bilgilerinizi giriniz.
          </p>
          <input 
            type="text" 
            placeholder="Kullanıcı Adı / E-posta" 
            style={{ width: "100%", padding: "10px", marginBottom: "12px", background: "rgba(255,255,255,0.05)", border: "1px solid #ffd700", color: "#fff", borderRadius: "6px" }}
          />
          <input 
            type="password" 
            placeholder="Şifre" 
            style={{ width: "100%", padding: "10px", marginBottom: "20px", background: "rgba(255,255,255,0.05)", border: "1px solid #ffd700", color: "#fff", borderRadius: "6px" }}
          />
          <div style={{ display: "flex", gap: "10px" }}>
            <button 
              onClick={() => setCurrentView("dashboard")}
              style={{ flex: 1, padding: "10px", background: "transparent", border: "1px solid #888", color: "#ccc", borderRadius: "6px", cursor: "pointer" }}
            >
              ← İPTAL
            </button>
            <button 
              onClick={() => alert("Giriş yapıldı.")}
              style={{ flex: 1, padding: "10px", background: "#ffd700", border: "none", color: "#000", fontWeight: "bold", borderRadius: "6px", cursor: "pointer" }}
            >
              GİRİŞ YAP ➔
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
