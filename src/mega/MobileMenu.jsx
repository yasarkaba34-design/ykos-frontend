import "./MobileMenu.css";

export default function MobileMenu({ open, setOpen }) {
  return (
    <div className="mobile-menu">
      <button className="menu-toggle" onClick={() => setOpen(!open)}>
        ☰ Menü
      </button>

      {open && (
        <div className="menu-dropdown">
          <a href="#">Kurumsal</a>
          <a href="#">YKOS Metodolojisi</a>
          <a href="#">Kök Hece Matrisi</a>
          <a href="#">Damga Atlası</a>
          <a href="#">Okuma & Analiz Motoru</a>
          <a href="#">Göç & Akış Haritası</a>
          <a href="#">Video & Sunumlar</a>
          <a href="#">Külliyat & Yayınlar</a>
          <a href="#">Dijital Arşiv</a>
        </div>
      )}
    </div>
  );
}
