import React from "react";
import heroImage from "../assets/hero.png";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>YKOS Bilgi Sistemi</h1>
        <p>Damga, sembol ve kültürel hafıza verilerini disiplinler arası analiz eden araştırma platformu.</p>
        <button className="hero-button">Keşfet</button>
      </div>
      <div className="hero-image">
        <img src={heroImage} alt="YKOS Hero Görseli" />
      </div>
    </section>
  );
}
