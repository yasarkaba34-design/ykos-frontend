import MainPage from "./MainPage";

export default function HomePage() {
  return <MainPage />;
}

    <div className="home-wrapper">

      {/* Mobil Menü */}
      <MobileMenu />

      {/* Masaüstü Menü */}
      <nav className="desktop-menu">
        <a href="#">Kurumsal</a>
        <a href="#">YKOS Metodolojisi</a>
        <a href="#">Kök Hece Matrisi</a>
        <a href="#">Damga Atlası</a>
        <a href="#">Okuma & Analiz Motoru</a>
        <a href="#">Göç & Akış Haritası</a>
        <a href="#">Video & Sunumlar</a>
        <a href="#">Külliyat & Yayınlar</a>
        <a href="#">Dijital Arşiv</a>
      </nav>

      {/* Başlık */}
      <h1 className="main-title">YKOS Bilgi Sistemi</h1>

      {/* Sistem Durumu */}
      <div className="system-status">
        Sistem Durumu: <span className="active">Aktif</span>
      </div>

      {/* Görselleştirme Butonu */}
      <button className="visualize-btn">
        Baloncuk Matrisini Görselleştir
      </button>

      {/* İstatistik Grid */}
      <div className="stats-grid">
        <div className="stat-box">Ülkeler: 214</div>
        <div className="stat-box">Araştırmalar: 248</div>
        <div className="stat-box">Damgalar: 9870</div>
        <div className="stat-box">Petroglifler: 18420</div>
        <div className="stat-box">Yazıtlar: 4132</div>
        <div className="stat-box">Kaynaklar: 12580</div>
        <div className="stat-box">Görseller: 46900</div>
        <div className="stat-box">Atlaslar: 58</div>
      </div>

    </div>
  );
}

@import "./theme.css";
@import "./layout.css";
@import "./menu.css";
@import "./responsive.css";

.home-wrapper {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.main-title {
  text-align: center;
  color: var(--ykos-gold);
  margin-bottom: 20px;
}

.system-status {
  text-align: center;
  font-size: 18px;
  margin-bottom: 20px;
}

.system-status .active {
  color: var(--ykos-green);
  font-weight: bold;
}

.visualize-btn {
  display: block;
  margin: 0 auto 30px auto;
  padding: 12px 20px;
  background: #222;
  color: var(--ykos-gold);
  border: none;
  border-radius: 6px;
  font-size: 18px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

.stat-box {
  background: #111;
  border: 1px solid #333;
  padding: 15px;
  text-align: center;
  color: var(--ykos-gold);
  border-radius: 6px;
}
import MainPage from "./MainPage";

export default function HomePage() {
  return (
    <div className="home-page">
      <MainPage />
    </div>
  );
}
