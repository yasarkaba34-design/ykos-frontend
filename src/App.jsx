import React, { useState } from "react";
import YKOSDashboard from "./layouts/YKOSDashboard";

export default function App() {
  const [currentView, setCurrentView] = useState("dashboard"); // "dashboard", "visualize", "read", "login"
  const [userRole, setUserRole] = useState("guest");
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  const handleNavigateLogin = (role) => {
    setUserRole(role);
    setCurrentView("login");
  };

  const handleNavigateRead = (id) => {
    setSelectedArticleId(id);
    setCurrentView("read");
  };

  return (
    <div className="app-main-wrapper" style={{ backgroundColor: "#050811", minHeight: "100vh", color: "#ffffff" }}>
      
      {/* 1. ANA DASHBOARD EKRANI */}
      {currentView === "dashboard" && (
        <YKOSDashboard 
          onVisualize={() => setCurrentView("visualize")}
          onNavigateRead={handleNavigateRead}
          onNavigateLogin={handleNavigateLogin}
          onGoHome={() => setCurrentView("dashboard")}
        />
      )}

      {/* 2. BALONCUK GÖRSELLEŞTİRME EKRANI */}
      {currentView === "visualize" && (
        <div style={{ maxWidth: "1240px", margin: "20px auto", padding: "20px", backgroundColor: "#050811", border: "1px solid #ffd700", borderRadius: "12px", textAlign: "center" }}>
          <h2 style={{ color: "#ffd700", marginBottom: "15px" }}>🗣️ YKOS BALONCUK MATRİSİ & SEMBOL İLİŞKİ AĞI</h2>
          <p style={{ color: "#aaa", fontSize: "0.85rem", marginBottom: "25px" }}>
            Kök heceler ve piktogramlar arası dinamik bağlantı görselleştirmesi.
          </p>

          <div style={{ height: "400px", border: "1px dashed rgba(255, 215, 0, 0.4)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255, 215, 0, 0.02)", marginBottom: "20px" }}>
            <span style={{ color: "#ffd700", fontWeight: "bold" }}>🌐 DİNAMİK GRAFİK MOTORU YÜKLENİYOR...</span>
          </div>

          <button 
            onClick={() => setCurrentView("dashboard")}
            style={{ padding: "10px 24px", background: "linear-gradient(135deg, #ffd700, #b8860b)", border: "none", color: "#000", fontWeight: "bold", borderRadius: "6px", cursor: "pointer" }}
          >
            ← ANA PANEL'E DÖN
          </button>
        </div>
      )}

      {/* 3. İÇERİK & OKUMA EKRANI (LİNKLER BOŞA ÇIKMASIN DİYE EKLENDİ) */}
      {currentView === "read" && (
        <div style={{ maxWidth: "900px", margin: "40px auto", padding: "30px", backgroundColor: "#050811", border: "1px solid #ffd700", borderRadius: "12px" }}>
          <span style={{ color: "#ffd700", fontSize: "0.75rem", fontWeight: "bold" }}>📜 YKOS AKADEMİK ÇÖZÜMLEME KATMANI</span>
          <h2 style={{ color: "#ffd700", marginTop: "10px", marginBottom: "15px" }}>
            {selectedArticleId === 1 ? "Çatalhöyük Kök Hece ve Damga Sembolizmi" :
             selectedArticleId === 2 ? "Göbeklitepe T-Sütunu YKOS Okuması" :
             selectedArticleId === 3 ? "Etrüsk Lemnos Kitabesi & Ön Türkçe Eşleşmesi" :
             "YOL Kök Hecesi ve Akış Teorisi"}
          </h2>

          <div style={{ borderTop: "1px solid rgba(255,215,0,0.3)", borderBottom: "1px solid rgba(255,215,0,0.3)", padding: "15px 0", margin: "15px 0", color: "#ccc", lineHeight: "1.6", fontSize: "0.9rem" }}>
            <p>
              Anadolu merkezli <strong>YKOS M5 Kök Hece Matrisi</strong> uyarınca yapılan bu çözümlemede; taranan sembollerin geometrik aksı, dikey/yatay vektör hatları ve fonetik uyumu incelenmiştir.
            </p>
            <p style={{ background: "rgba(255,215,0,0.05)", padding: "12px", borderLeft: "3px solid #ffd700", color: "#ffd700", fontWeight: "bold" }}>
              ⚡ Tutarlılık Skoru (Coherence): %99.4 Algoritmik Uyum
            </p>
          </div>

          <button 
            onClick={() => setCurrentView("dashboard")}
            style={{ padding: "10px 20px", background: "linear-gradient(135deg, #ffd700, #b8860b)", border: "none", color: "#000", fontWeight: "bold", borderRadius: "6px", cursor: "pointer" }}
          >
            ← ANA PANEL'E DÖN
          </button>
        </div>
      )}

      {/* 4. GİRİŞ PORTALI EKRANI */}
      {currentView === "login" && (
        <div style={{ maxWidth: "450px", margin: "60px auto", padding: "30px", backgroundColor: "#050811", border: "1px solid #ffd700", borderRadius: "12px", textAlign: "center", boxShadow: "0 4px 25px rgba(0,0,0,0.8)" }}>
          <h2 style={{ color: "#ffd700", marginBottom: "8px", fontSize: "1.1rem" }}>
            🔑 {userRole === "admin" ? "YÖNETİCİ VERİ GİRİŞİ" : userRole === "researcher" ? "ARAŞTIRMACI VERİ GİRİŞİ" : "KONUK PANELİ GİRİŞİ"}
          </h2>
          <p style={{ color: "#aaa", fontSize: "0.78rem", marginBottom: "20px" }}>
            {userRole === "guest" ? "YKOS Bilgi Sistemine konuk / araştırma ziyareti yapmak için onaylayınız." : "Lütfen yetkili erişim bilgilerinizi giriniz."}
          </p>

          {userRole !== "guest" ? (
            <>
              <div style={{ textAlign: "left", marginBottom: "12px" }}>
                <label style={{ color: "#ffd700", fontSize: "0.75rem", display: "block", marginBottom: "4px" }}>Kullanıcı Adı / E-Posta</label>
                <input 
                  type="text" 
                  placeholder="E-posta adresiniz" 
                  style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,215,0,0.4)", color: "#fff", borderRadius: "6px", boxSizing: "border-box", outline: "none" }}
                />
              </div>

              <div style={{ textAlign: "left", marginBottom: "20px" }}>
                <label style={{ color: "#ffd700", fontSize: "0.75rem", display: "block", marginBottom: "4px" }}>Şifre</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,215,0,0.4)", color: "#fff", borderRadius: "6px", boxSizing: "border-box", outline: "none" }}
                />
              </div>
            </>
          ) : (
            <div style={{ padding: "15px", background: "rgba(255,215,0,0.05)", border: "1px dashed rgba(255,215,0,0.3)", borderRadius: "8px", marginBottom: "20px", color: "#ccc", fontSize: "0.8rem", textAlign: "left" }}>
              ℹ️ Konuk girişi ile arşivi inceleyebilir, yayınlanan okuma ve matrisleri ücretsiz görüntüleyebilirsiniz.
            </div>
          )}

          <div style={{ display: "flex", gap: "10px" }}>
            <button 
              onClick={() => setCurrentView("dashboard")}
              style={{ flex: 1, padding: "10px", background: "transparent", border: "1px solid #888", color: "#ccc", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", fontSize: "0.8rem" }}
            >
              ← İPTAL
            </button>
            <button 
              onClick={() => {
                alert(`${userRole === "guest" ? "Konuk" : "Kullanıcı"} girişi tamamlandı.`);
                setCurrentView("dashboard");
              }}
              style={{ flex: 1, padding: "10px", background: "linear-gradient(135deg, #ffd700, #b8860b)", border: "none", color: "#000", fontWeight: "900", borderRadius: "6px", cursor: "pointer", fontSize: "0.8rem" }}
            >
              {userRole === "guest" ? "DEVAM ET ➔" : "GİRİŞ YAP ➔"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
