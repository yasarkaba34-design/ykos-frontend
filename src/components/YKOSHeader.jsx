import { useNavigate } from "react-router-dom";

export default function YKOSHeader() {
  const navigate = useNavigate();

  return (
    <div className="ykos-header">
      <span className="ykos-header-logo">YKOS</span>

      <div className="ykos-header-menu">
        <button onClick={() => navigate("/")} className="header-btn">🏠 Ana Sayfa</button>
        <button onClick={() => navigate("/matrix")} className="header-btn">⚙ Matrix</button>
        <button onClick={() => navigate("/open-data")} className="header-btn">📊 Açık Veri</button>
        <button onClick={() => navigate("/arsiv")} className="header-btn">📁 Arşiv</button>
        <button onClick={() => navigate("/video-archive")} className="header-btn">🎥 Video Arşivi</button>
      </div>
    </div>
  );
}
