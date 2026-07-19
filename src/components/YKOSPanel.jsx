import SearchBox from "./SearchBox";
import DataEntryPanel from "./DataEntryPanel";

export default function YKOSPanel() {
  return (
    <div className="ykos-panel">

      {/* Üst-Orta Başlık */}
      <div className="ykos-title">
        <h1>YKOS BİLGİ SİSTEMİ</h1>
        <h2>Disiplinler Arası Algoritmik Kültür ve Dil Veri Tabanı</h2>
      </div>

      {/* Arama Alanı */}
      <SearchBox />

      {/* Kurumsal Menü */}
      <div className="ykos-menu">
        Ana Sayfa | Hakkında | Metodoloji | Atlas | Araştırmacılar | Kurumsal İşbirlikleri | İletişim
      </div>

      {/* Veri Girişi Paneli */}
      <DataEntryPanel />

    </div>
  );
}
