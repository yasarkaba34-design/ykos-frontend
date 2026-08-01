import { useState } from "react";
import "./LangSwitch.css";

export default function LangSwitch() {
  const [lang, setLang] = useState("TR");

  const toggleLang = () => {
    setLang(lang === "TR" ? "EN" : "TR");
  };

  return (
    <button className="lang-btn" onClick={toggleLang}>
      {lang}
    </button>
  );
}
