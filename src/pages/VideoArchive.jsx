// src/pages/VideoArchive.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function VideoArchive() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '30px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* ANA SAYFAYA DÖNÜŞ BUTONU */}
        <button 
          onClick={() => navigate("/")} 
          style={{
            background: "linear-gradient(135deg, #ffd700, #b8860b)",
            color: "#000",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            fontWeight: "900",
            fontSize: "0.8rem",
            cursor: "pointer",
            marginBottom: "20px"
          }}
        >
          ← Ana Sayfaya Dön
        </button>

        {/* Video Arşivi İçerikleri */}
        <div style={{ padding: '20px', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}>
          <h2 style={{ color: '#FFD700', marginTop: 0 }}>🎥 YKOS Video Arşivi & Sunumlar</h2>
          <p style={{ color: '#aaa' }}>Bu sayfada YKOS sunumlarını ve video kayıtlarını izleyebilirsiniz.</p>
        </div>

      </div>
    </div>
  );
}