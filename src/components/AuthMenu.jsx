import React from 'react';

export default function AuthMenu() {
  const handleLoginClick = (role) => {
    alert(`${role} girişi modülü yapım aşamasında...`);
  };

  return (
    <div style={{
      marginTop: "auto", 
      paddingTop: "15px",
      borderTop: "1px solid rgba(255, 215, 0, 0.2)",
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    }}>
      <h5 style={{ color: "rgba(255, 215, 0, 0.7)", fontSize: "11px", margin: "0 0 5px 0", letterSpacing: "1px" }}>
        SİSTEM ERİŞİMİ
      </h5>
      
      <button 
        style={buttonStyles.guest}
        onMouseOver={(e) => e.target.style.backgroundColor = "rgba(255, 215, 0, 0.1)"}
        onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
        onClick={() => handleLoginClick("Konuk")}
      >
        <span style={{ fontSize: "14px" }}>👤</span> Konuk Erişimi
      </button>

      <button 
        style={buttonStyles.academic}
        onMouseOver={(e) => e.target.style.backgroundColor = "rgba(0, 255, 127, 0.1)"}
        onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
        onClick={() => handleLoginClick("Akademisyen")}
      >
        <span style={{ fontSize: "14px" }}>🎓</span> Akademisyen Girişi
      </button>
    </div>
  );
}

const buttonStyles = {
  guest: {
    backgroundColor: "transparent",
    color: "#ffd700",
    border: "1px solid rgba(255, 215, 0, 0.4)",
    borderRadius: "4px",
    padding: "6px 12px",
    fontSize: "12px",
    cursor: "pointer",
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "background-color 0.3s"
  },
  academic: {
    backgroundColor: "transparent",
    color: "#00ff7f",
    border: "1px solid rgba(0, 255, 127, 0.4)",
    borderRadius: "4px",
    padding: "6px 12px",
    fontSize: "12px",
    cursor: "pointer",
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "background-color 0.3s"
  }
};