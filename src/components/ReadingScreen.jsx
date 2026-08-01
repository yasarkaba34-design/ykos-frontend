import { useParams } from "react-router-dom";
import MatrixToggle from "../components/MatrixToggle"; // Klasör yoluna göre gerekirse kontrol edin
import archive from "../api/archive.json";

import "./ReadingScreen.css";
import { atlasZoom } from "../mega/AtlasMap";

export default function ReadingScreen() {
  const { id } = useParams();
  
  // Arşivden ilgili veriyi çekiyoruz
  const item = archive.find(a => a.id === Number(id));

  // Eğer veri henüz yüklenmediyse veya bulunamadıysa çökmesini engelliyoruz
  if (!item) {
    return (
      <div className="reading-wrapper" style={{ padding: "40px", textAlign: "center", color: "#aaa" }}>
        <h2>Kayıt bulunamadı veya yükleniyor...</h2>
      </div>
    );
  }

  // atlasInfo hesabı item tanımlandıktan SONRA yapılıyor
  const atlasInfo = atlasZoom(item.atlas);

  return (
    <div className="reading-wrapper">
      <h1 className="reading-title">{item.title}</h1>

      <p className="reading-content">
        {item.content}
      </p>

      {/* MatrixToggle bileşenine güvenli veri aktarımı */}
      <MatrixToggle atlas={item.atlas} data={item} />
    </div>
  );
}
