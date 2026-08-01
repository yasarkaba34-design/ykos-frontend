import { useState } from "react";
import MatrixToggle from "./MatrixToggle";
import "./Home.css";
import archive from "../api/archive.json";
import ArchiveList from "../components/ArchiveList";

<ArchiveList items={archive} />

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <div className="home-wrapper">

      {/* --- ÜST BAŞLIK ALANI --- */}
      <div className="home-header">
        <h1>YKOS Bilgi Sistemi</h1>
        <p className="home-subtitle">
          Kadim kök-hece, damga ve atlas verilerini inceleyin.
        </p>
      </div>

      {/* --- ARAMA MOTORU --- */}
      <div className="home-search">
        <input
          type="text"
          placeholder="🔍 Damga, kök hece, ülke, il veya kadim merkez ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="search-btn">Ara</button>
      </div>

      {/* --- ÇÖZÜMLER PANELİ (STABİL SÜRÜMDEN) --- */}
      <div className="solutions-panel">
        <h2>YKOS Çözümleri ve İndeksler</h2>

        <div className="solution-item">Kök Hece Matrisi</div>
        <div className="solution-item">Damga Atlası</div>
        <div className="solution-item">Göç & Akış Haritası</div>
      </div>

      {/* --- MATRİSLERİ TEK TUŞLA AÇAN SİSTEM --- */}
      <MatrixToggle data={[]} />

    </div>
  );
}
