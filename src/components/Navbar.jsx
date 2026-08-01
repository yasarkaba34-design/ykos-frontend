import { useState } from "react";
import MobileMenu from "./MobileMenu";
import LangSwitch from "./LangSwitch";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo-area">
        <div className="logo">YKOS</div>
        <div className="logo-line"></div>
      </div>

      {/* Dil seçici — mobil menü açılınca gizlenir */}
      import LangSwitch from "./LangSwitch";

<div className={`lang-toggle ${open ? "hide-lang" : ""}`}>
  <LangSwitch />
</div>


      {/* Mobil Menü */}
      <MobileMenu open={open} setOpen={setOpen} />
    </nav>
  );
}
