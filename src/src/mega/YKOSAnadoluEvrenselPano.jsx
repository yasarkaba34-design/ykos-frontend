import React, { useState, useEffect } from "react";
import { startCosmicUniverse } from "../engine/CosmicUniverseEngine.js";

function YKOSAnadoluEvrenselPano() {
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeMatrix, setActiveMatrix] = useState(null);
  const [selectedHece, setSelectedHece] = useState("OK");
  const [matrixLevel, setMatrixLevel] = useState("YKOS_100");
  
  // DİL VE MODAL DURUMLARI
  const [currentLang, setCurrentLang] = useState("TR");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState("VIDEO_01");

  // 10 DİLLİ SEÇENEK LİSTESİ
  const languagesList = [
    { code: "TR", flag: "🇹🇷", label: "Türkçe" },
    { code: "EN", flag: "🇬🇧", label: "English" },
    { code: "DE", flag: "🇩🇪", label: "Deutsch" },
    { code: "FR", flag: "🇫🇷", label: "Français" },
    { code: "RU", flag: "🇷🇺", label: "Русский" },
    { code: "ZH", flag: "🇨🇳", label: "中文" },
    { code: "JA", flag: "🇯🇵", label: "日本語" },
    { code: "IT", flag: "🇮🇹", label: "Italiano" },
    { code: "ES", flag: "🇪🇸", label: "Español" },
    { code: "AR", flag: "🇸🇦", label: "العربية" }
  ];

  // RENKÂRENK UÇUŞAN BALONCUKLAR
  const [bubbles] = useState([
    { id: "OK", label: "OK", code: "𐰸", icon: "🏹", color: "#ffd700", bg: "radial-gradient(circle, #ffd700 0%, #3a2e05 100%)", phase: 0 },
    { id: "AT", label: "AT", code: "𐰡", icon: "🐎", color: "#60a5fa", bg: "radial-gradient(circle, #60a5fa 0%, #0a192f 100%)", phase: 1.2 },
    { id: "ER", label: "ER", code: "𐰼", icon: "🧍", color: "#a855f7", bg: "radial-gradient(circle, #a855f7 0%, #1e102a 100%)", phase: 2.4 },
    { id: "EL", label: "EL", code: "𐰠", icon: "🖐️", color: "#34d399", bg: "radial-gradient(circle, #34d399 0%, #064e3b 100%)", phase: 3.6 },
    { id: "KUT", label: "KUT", code: "☀️", icon: "☀️", color: "#fbbf24", bg: "radial-gradient(circle, #fbbf24 0%, #451a03 100%)", phase: 4.8 },
    { id: "KIN", label: "KIN", code: "⚔️", icon: "⚔️", color: "#f87171", bg: "radial-gradient(circle, #f87171 0%, #450a0a 100%)", phase: 1.8 },
    { id: "BAL", label: "BAL", code: "🗿", icon: "🗿", color: "#fb923c", bg: "radial-gradient(circle, #fb923c 0%, #431407 100%)", phase: 3.0 },
    { id: "BAG", label: "BAĞ", code: "🔗", icon: "🔗", color: "#38bdf8", bg: "radial-gradient(circle, #38bdf8 0%, #0c4a6e 100%)", phase: 4.2 }
  ]);

  const [positions, setPositions] = useState([]);

  // CANLI SÜZÜLME ANİMASYONU
  useEffect(() => {
    let animFrame;
    let time = 0;
    const animate = () => {
      time += 0.025;
      setPositions(
        bubbles.map((b) => ({
          id: b.id,
          x: Math.sin(time + b.phase) * 20,
          y: Math.cos(time * 0.85 + b.phase) * 15,
        }))
      );
      animFrame = requestAnimationFrame(animate);
    };
    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [bubbles]);

  useEffect(() => {
    let mounted = true;
    let stopFn = null;
    try {
      stopFn = startCosmicUniverse((packet) => {
        if (mounted) setData(packet);
      });
    } catch (err) {
      console.error(err);
    }
    return () => {
      mounted = false;
      if (typeof stopFn === "function") stopFn();
    };
  }, []);

  const kokHeceVerileri = {
    OK: { hece: "OK", damgaGorsel: "🏹 / 𐰸", fonetikKok: "O-K / U-K", coherence: "0.9942", color: "#ffd700", meaning: "Yön, Yükseliş, Bağlantı, Akış, Göç Hattı", anadolu: "Göbeklitepe / Çatalhöyük / Kültepe", asya: "Orhun / Yenisey / Hobi Hattı", cozumNotu: "Göbeklitepe T-Sütunu dikey vektör açısı ile Tamgalı Sayı arasındaki 12.000 yıllık aks uyumu kanıtlanmıştır." },
    AT: { hece: "AT", damgaGorsel: "🐎 / 𐰡", fonetikKok: "A-T / E-T", coherence: "0.9871", color: "#60a5fa", meaning: "Hareket, İlerleme, Sıçrama, Birincil Er", anadolu: "Hakkari Gevaruk / Alacahöyük", asya: "Altay-Sayan / Isık Göl Kültür Havzası", cozumNotu: "Kinetik hareket vektörü Anadolu yüksek dağ petrogliflerinden Asya bozkır kuşağına kesintisiz aktarımı gösterir." },
    ER: { hece: "ER", damgaGorsel: "🧍 / 𐰼", fonetikKok: "E-R / I-R", coherence: "0.9785", color: "#a855f7", meaning: "Varlık, Kimlik, Güç, Erginleşme, İnsan Duruşu", anadolu: "Kars Kağızman Camuşlu / Hattuşa", asya: "Talaz / Ötüken / Balasagun Havzası", cozumNotu: "Dikey aksiyel dikilitaş formu ile 'Er' kimlik damgasının morfolojik özdeşliği doğrulanmıştır." },
    EL: { hece: "EL", damgaGorsel: "🖐️ / 𐰠", fonetikKok: "E-L / I-L", coherence: "0.9810", color: "#34d399", meaning: "Topluluk, Birlik, El/İl Yönetim Yapısı, Sahiplik", anadolu: "Yazılıkaya / Karkamış Kabartmaları", asya: "Etrüsk Lemnos / Akdeniz / Turfan Havzası", cozumNotu: "Beş parmak ve el ayası simgesi, hiyerarşik toplumsal örgütlenmenin en eski yazılı/damgasal ifadesidir." },
    KUT: { hece: "KUT", damgaGorsel: "☀️ / 𐰸𐰆𐱃", fonetikKok: "K-U-T", coherence: "0.9910", color: "#fbbf24", meaning: "Güneş Işığı, İlahî Enerji, Yaşam Gücü", anadolu: "Alacahöyük / Göbeklitepe Güneş Kursları", asya: "Gobi / Altay Kültür Kuşağı", cozumNotu: "Güneş ışınlarının dikey aksiyel merkezleşmesi kutsiyet ve yönetim erkini temsil eder." },
    KIN: { hece: "KIN", damgaGorsel: "⚔️ / 𐰴𐰯", fonetikKok: "K-I-N", coherence: "0.9850", color: "#f87171", meaning: "Koruma, Keskinlik, Savunma, Kesme Vektörü", anadolu: "Troya / Hattuşa Savaş Araçları", asya: "Orhun Sefer Hataları", cozumNotu: "Kavisli kesme geometrisi, erken bronz ve demir devri damga tipolojisiyle tam tutarlılık gösterir." },
    BAL: { hece: "BAL", damgaGorsel: "🗿 / 𐰉𐰞", fonetikKok: "B-A-L", coherence: "0.9890", color: "#fb923c", meaning: "Taş Dikit, Anıt, Kimlik Sütunu, Ata İzı", anadolu: "Göbeklitepe / Urfa Adamı Dikilitaşları", asya: "Yenisey Balbalları", cozumNotu: "Monolitik T-sütun geleneği Anadolu kökenli anıt-taş (balbal) kültürünün ilksel formudur." },
    BAG: { hece: "BAĞ", damgaGorsel: "🔗 / 𐰉𐰍", fonetikKok: "B-A-G", coherence: "0.9820", color: "#38bdf8", meaning: "İlişki, Düğüm, Birleştirici Çizgi, Ağ", anadolu: "Çatalhöyük Ağ Motifleri", asya: "Altay Düğüm Damgaları", cozumNotu: "Kesişen çizgisel vektörler, aileler ve boylar arasındaki ahit ve birlik bağını simgeler." }
  };

  const videoData = {
    VIDEO_01: { id: "VIDEO_01", title: "Göbeklitepe T-Sütunu YKOS Belgeseli ve Çözümlemesi", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", desc: "Göbeklitepe T-sütunlarındaki piktogram ve ikonografik anlatımın YKOS Kök Hece Matrisi ile çözümlenmesi." },
    VIDEO_02: { id: "VIDEO_02", title: "Etrüsk Lemnos Kitabesi ve Ön Türkçe Eşleşmesi", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", desc: "Akdeniz havzası Etrüsk ve Ön Türkçe damgalarının karşılaştırmalı algoritmik dil analizi." }
  };

  const currentHece = kokHeceVerileri[selectedHece] || kokHeceVerileri.OK;
  const selectedLangObj = languagesList.find((l) => l.code === currentLang) || languagesList[0];

  const rawStats = [
    { id: 1, icon: "🌍", count: "214", label: "Ülkeler" },
    { id: 2, icon: "🏛️", count: "248", label: "Araştırmalar" },
    { id: 3, icon: "🔷", count: "9.870", label: "Damgalar" },
    { id: 4, icon: "🗿", count: "18.420", label: "Petroglifler" },
    { id: 5, icon: "📜", count: "4.132", label: "Yazıtlar" },
    { id: 6, icon: "📚", count: "12.580", label: "Kaynaklar" },
    { id: 7, icon: "📷", count: "46.900", label: "Görseller" },
    { id: 8, icon: "🗺️", count: "58", label: "Atlaslar" },
  ];

  const navMenuItems = [
    { id: "KURUMSAL", label: "KURUMSAL" },
    { id: "METODOLOJI", label: "YKOS METODOLOJİSİ" },
    { id: "BUBBLE", label: "KÖK HECE MATRİSİ" },
    { id: "DAMGA_ATLASI", label: "DAMGA ATLASI" },
    { id: "ANALIZ_ENGINE", label: "OKUMA & ANALİZ MOTORU" },
    { id: "FLOW_MAP", label: "GÖÇ & AKIŞ HARİTASI" },
    { id: "VIDEO", label: "🎥 VİDEO & SUNUMLAR" },
    { id: "KULLIYAT", label: "KÜLLİYAT & YAYINLAR" },
    { id: "DIJITAL_ARSIV", label: "DİJİTAL ARŞİV" },
  ];

  return (
    <div style={{ width: "100%", maxWidth: "1300px", margin: "0 auto", padding: "12px", color: "#fff", fontFamily: "sans-serif" }}>
      
      {/* 1. ORİJİNAL HEADER YAPISI */}
      <header style={{ border: "1.5px solid #d4af37", borderRadius: "10px", padding: "12px 20px 8px 20px", backgroundColor: "#0a0a0a", marginBottom: "12px", boxShadow: "0 0 15px rgba(212, 175, 55, 0.1)" }}>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", marginBottom: "10px" }}>
          <div></div>

          <div onClick={() => setActiveMatrix(null)} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "3px", cursor: "pointer", userSelect: "none" }}>
            <div style={{ border: "1.5px solid #d4af37", borderRadius: "50%", padding: "4px 12px", fontSize: "12px", fontWeight: "bold", color: "#d4af37", backgroundColor: "#0f0d08", boxShadow: "0 0 10px rgba(212, 175, 55, 0.3)" }}>
              YKOS
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: "20px", color: "#d4af37", letterSpacing: "1.5px", fontWeight: "900", lineHeight: "1.1" }}>YKOS BİLGİ SİSTEMİ</h1>
              <p style={{ margin: "2px 0 0 0", fontSize: "10px", color: "#aaa", letterSpacing: "0.5px" }}>Disiplinler Arası Algoritmik Kültür ve Dil Veri Tabanı</p>
            </div>
          </div>

          {/* SAĞ ÜST AÇILIR 10 DİLLİ MENÜ */}
          <div style={{ textAlign: "right", position: "relative" }}>
            <button 
              onClick={() => setShowLangMenu(!showLangMenu)} 
              style={{ backgroundColor: "#110f0a", border: "1.5px solid #d4af37", color: "#d4af37", padding: "6px 14px", borderRadius: "6px", fontSize: "11px", fontWeight: "bold", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              <span>{selectedLangObj.flag}</span>
              <span>{selectedLangObj.code} {selectedLangObj.code}</span>
              <span style={{ fontSize: "8px" }}>▼</span>
            </button>

            {/* 10 DİLLİ SEÇİM LİSTESİ DROPDOWN */}
            {showLangMenu && (
              <div style={{ position: "absolute", top: "35px", right: "0", backgroundColor: "#0d0c08", border: "1.5px solid #d4af37", borderRadius: "8px", padding: "6px", zIndex: 100, width: "150px", boxShadow: "0 0 20px rgba(0,0,0,0.9)", display: "flex", flexDirection: "column", gap: "4px" }}>
                {languagesList.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLang(lang.code);
                      setShowLangMenu(false);
                    }}
                    style={{
                      backgroundColor: currentLang === lang.code ? "#2a220d" : "#111",
                      border: currentLang === lang.code ? "1px solid #d4af37" : "1px solid #222",
                      color: currentLang === lang.code ? "#d4af37" : "#ccc",
                      padding: "6px 10px",
                      borderRadius: "5px",
                      textAlign: "left",
                      fontSize: "10.5px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    }}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* MENÜ BUTONLARI */}
        <nav style={{ display: "flex", justifyContent: "center", gap: "5px", borderTop: "1px solid #332a15", paddingTop: "8px", flexWrap: "wrap" }}>
          {navMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMatrix(activeMatrix === item.id ? null : item.id)}
              style={{
                background: activeMatrix === item.id ? "#2a220d" : "#110f0a",
                border: activeMatrix === item.id ? "1.5px solid #d4af37" : "1px solid #332a15",
                color: activeMatrix === item.id ? "#d4af37" : "#bbb",
                padding: "5px 10px",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "10px",
                fontWeight: "bold"
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      {/* 2. CANLI ARAMA BARI */}
      <div style={{ marginBottom: "12px" }}>
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="🔍 Damga, kök hece, ülke, il veya kadim merkez ara..." style={{ width: "100%", padding: "10px 18px", borderRadius: "25px", border: "1.5px solid #d4af37", backgroundColor: "#0d0d0d", color: "#fff", fontSize: "12.5px", outline: "none", boxSizing: "border-box" }} />
      </div>

      {/* 3. İSTATİSTİK BARI */}
      <div style={{ border: "1.5px solid #8c7126", borderRadius: "10px", backgroundColor: "#0a0a0a", padding: "12px", marginBottom: "12px" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "8px" }}>
          <div style={{ border: "1px solid #d4af37", borderRadius: "6px", padding: "4px 10px", backgroundColor: "#0f0d08", textAlign: "center" }}>
            <div style={{ fontSize: "8px", color: "#aaa" }}>SİSTEM DURUMU</div>
            <div style={{ fontSize: "11px", fontWeight: "bold", color: "#d4af37" }}>AKTİF</div>
            <div style={{ fontSize: "8px", color: "#777" }}>YKOS v1.0 Beta</div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: "6px" }}>
          {rawStats.map((s) => (
            <div key={s.id} style={{ border: "1px solid #332a15", borderRadius: "6px", padding: "8px 5px", backgroundColor: "#111", textAlign: "center" }}>
              <span style={{ fontSize: "15px" }}>{s.icon}</span>
              <div style={{ fontSize: "12px", fontWeight: "bold", color: "#fff", marginTop: "2px" }}>{s.count}</div>
              <div style={{ fontSize: "8.5px", color: "#aaa" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* AÇILIR MODÜLLER (BUBBLE, VIDEO, ATLAS V.B.) */}
      {/* ========================================================= */}
      
      {/* A) BALONCUK MODÜLÜ */}
      {activeMatrix === "BUBBLE" && (
        <div style={{ border: "2px solid #d4af37", borderRadius: "12px", backgroundColor: "#050508", padding: "20px", boxShadow: "0 0 30px rgba(212, 175, 55, 0.2)", marginBottom: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1.5px solid #554218", paddingBottom: "10px", marginBottom: "15px" }}>
            <h2 style={{ margin: 0, color: "#d4af37", fontSize: "16px" }}>🔮 YKOS MATRİSLERİ: RENKÂRENK UÇUŞAN KÖK HECELER</h2>
            <button onClick={() => setActiveMatrix(null)} style={{ padding: "5px 12px", borderRadius: "5px", border: "1px solid #d4af37", backgroundColor: "#1f190a", color: "#d4af37", fontWeight: "bold", cursor: "pointer", fontSize: "11px" }}>✖ Ana Sayfaya Dön</button>
          </div>

          <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
            <button onClick={() => setMatrixLevel("YKOS_100")} style={{ padding: "6px 14px", backgroundColor: matrixLevel === "YKOS_100" ? "#2a220d" : "#111", border: matrixLevel === "YKOS_100" ? "1.5px solid #d4af37" : "1px solid #332a15", color: matrixLevel === "YKOS_100" ? "#d4af37" : "#aaa", borderRadius: "6px", fontSize: "11px", fontWeight: "bold", cursor: "pointer" }}>⚡ YKOS 100: Kök Hece Matrisi</button>
            <button onClick={() => setMatrixLevel("YKOS_200")} style={{ padding: "6px 14px", backgroundColor: matrixLevel === "YKOS_200" ? "#2a220d" : "#111", border: matrixLevel === "YKOS_200" ? "1.5px solid #d4af37" : "1px solid #332a15", color: matrixLevel === "YKOS_200" ? "#d4af37" : "#aaa", borderRadius: "6px", fontSize: "11px", fontWeight: "bold", cursor: "pointer" }}>🌐 YKOS 200: Vektör & Akış Matrisi</button>
          </div>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "20px", minHeight: "180px", flexWrap: "wrap", padding: "10px 0" }}>
            {bubbles.map((b, idx) => {
              const isSelected = selectedHece === b.id;
              const pos = positions[idx] || { x: 0, y: 0 };
              return (
                <div key={b.id} onClick={() => setSelectedHece(b.id)} style={{ width: "105px", height: "105px", borderRadius: "50%", background: b.bg, border: isSelected ? "3.5px solid #fff" : `2px solid ${b.color}`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "pointer", boxShadow: isSelected ? `0 0 30px ${b.color}` : `0 0 15px ${b.color}44`, transform: `translate(${pos.x}px, ${pos.y}px) ${isSelected ? "scale(1.15)" : "scale(1)"}`, transition: "transform 0.1s ease-out, box-shadow 0.3s ease", userSelect: "none" }}>
                  <span style={{ fontSize: "28px" }}>{b.icon}</span>
                  <span style={{ fontSize: "12px", fontWeight: "900", color: "#fff", marginTop: "2px" }}>{b.label} [{b.code}]</span>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: "20px", border: `1.5px solid ${currentHece.color}`, borderRadius: "10px", backgroundColor: "#0a0a0d", padding: "18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px dashed #333", paddingBottom: "10px", marginBottom: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <span style={{ fontSize: "38px" }}>{currentHece.damgaGorsel.split(" / ")[0]}</span>
                <div>
                  <h3 style={{ margin: 0, color: currentHece.color, fontSize: "18px", fontWeight: "bold" }}>{currentHece.hece} KÖK HECESİ AKADEMİK ANALİZİ ({matrixLevel})</h3>
                  <span style={{ fontSize: "11px", color: "#0f0" }}>✔ YKOS Uyum Indeksi: %{parseFloat(currentHece.coherence) * 100}</span>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", fontSize: "12.5px" }}>
              <div style={{ backgroundColor: "#111", padding: "12px", borderRadius: "6px", borderLeft: `3px solid ${currentHece.color}` }}>
                <p style={{ margin: "0 0 6px 0" }}><strong style={{ color: currentHece.color }}>𐰸 Fonetik Kök:</strong> <span style={{ color: "#fff" }}>{currentHece.fonetikKok}</span></p>
                <p style={{ margin: 0 }}><strong style={{ color: currentHece.color }}>📐 Anlamsal Katman:</strong> <span style={{ color: "#ddd" }}>{currentHece.meaning}</span></p>
              </div>
              <div style={{ backgroundColor: "#111", padding: "12px", borderRadius: "6px", borderLeft: `3px solid ${currentHece.color}` }}>
                <p style={{ margin: "0 0 6px 0" }}><strong style={{ color: "#60a5fa" }}>🏛️ Anadolu Odak Noktası:</strong> <span style={{ color: "#fff" }}>{currentHece.anadolu}</span></p>
                <p style={{ margin: 0 }}><strong style={{ color: "#a855f7" }}>🏹 Asya Akış Hattı:</strong> <span style={{ color: "#fff" }}>{currentHece.asya}</span></p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* B) VİDEO VE SUNUM UYGULAMASI MODÜLÜ */}
      {activeMatrix === "VIDEO" && (
        <div style={{ border: "2px solid #d4af37", borderRadius: "12px", backgroundColor: "#08080a", padding: "20px", marginBottom: "12px", boxShadow: "0 0 25px rgba(212, 175, 55, 0.2)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1.5px solid #554218", paddingBottom: "10px", marginBottom: "15px" }}>
            <h2 style={{ margin: 0, color: "#d4af37", fontSize: "16px" }}>🎥 YKOS VİDEO UYGULAMASI VE AKADEMİK SUNUMLAR</h2>
            <button onClick={() => setActiveMatrix(null)} style={{ padding: "5px 12px", borderRadius: "5px", border: "1px solid #d4af37", backgroundColor: "#1f190a", color: "#d4af37", fontWeight: "bold", cursor: "pointer", fontSize: "11px" }}>✖ Ana Sayfaya Dön</button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button onClick={() => setActiveVideoId("VIDEO_01")} style={{ padding: "12px", backgroundColor: activeVideoId === "VIDEO_01" ? "#2a220d" : "#111", border: activeVideoId === "VIDEO_01" ? "1.5px solid #d4af37" : "1px solid #332a15", color: activeVideoId === "VIDEO_01" ? "#d4af37" : "#aaa", borderRadius: "8px", textAlign: "left", cursor: "pointer", fontWeight: "bold", fontSize: "12px" }}>
                ▶ Göbeklitepe YKOS Okuması Belgeseli
              </button>
              <button onClick={() => setActiveVideoId("VIDEO_02")} style={{ padding: "12px", backgroundColor: activeVideoId === "VIDEO_02" ? "#2a220d" : "#111", border: activeVideoId === "VIDEO_02" ? "1.5px solid #d4af37" : "1px solid #332a15", color: activeVideoId === "VIDEO_02" ? "#d4af37" : "#aaa", borderRadius: "8px", textAlign: "left", cursor: "pointer", fontWeight: "bold", fontSize: "12px" }}>
                ▶ Etrüsk Lemnos Kitabesi Analizi
              </button>
            </div>

            <div style={{ backgroundColor: "#000", border: "1px solid #d4af37", borderRadius: "10px", padding: "15px" }}>
              <h3 style={{ margin: "0 0 10px 0", color: "#d4af37", fontSize: "15px" }}>{videoData[activeVideoId].title}</h3>
              <div style={{ width: "100%", height: "240px", backgroundColor: "#111", borderRadius: "6px", display: "flex", justifyContent: "center", alignItems: "center", color: "#888", border: "1px dashed #444" }}>
                🎬 [ {videoData[activeVideoId].title} Video Oynatıcı ]
              </div>
              <p style={{ margin: "10px 0 0 0", fontSize: "12px", color: "#ccc" }}>{videoData[activeVideoId].desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* C) DİĞER MODÜLLER İÇİN JENERİK AÇILIR PANEL */}
      {activeMatrix && activeMatrix !== "BUBBLE" && activeMatrix !== "VIDEO" && (
        <div style={{ border: "1.5px solid #d4af37", borderRadius: "10px", backgroundColor: "#0d0c08", padding: "18px", marginBottom: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <h3 style={{ margin: 0, color: "#d4af37" }}>📂 YKOS MODÜLÜ: {activeMatrix}</h3>
            <button onClick={() => setActiveMatrix(null)} style={{ padding: "4px 10px", borderRadius: "4px", border: "1px solid #d4af37", backgroundColor: "#1f190a", color: "#d4af37", cursor: "pointer", fontSize: "11px" }}>✖ Ana Sayfaya Dön</button>
          </div>
          <p style={{ color: "#aaa", fontSize: "13px" }}>{activeMatrix} paneli verileri aktif olarak yükleniyor...</p>
        </div>
      )}

      {/* 4. ALT İKİLİ PANEL */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "12px", marginBottom: "12px" }}>
        <div style={{ border: "1.5px solid #8c7126", borderRadius: "10px", backgroundColor: "#0a0a0a", padding: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <h3 style={{ margin: 0, color: "#d4af37", fontSize: "14px" }}>MATRİSLER VE KATMANLAR</h3>
          <div onClick={() => setActiveMatrix("BUBBLE")} style={{ color: "#fff", fontWeight: "bold", cursor: "pointer", fontSize: "13px" }}>▶ 🔤 KÖK HECE MATRİSİ</div>
          <div onClick={() => setActiveMatrix("DAMGA_ATLASI")} style={{ color: "#fff", fontWeight: "bold", cursor: "pointer", fontSize: "13px" }}>▶ 🗺️ DAMGA ATLASI</div>
          <div onClick={() => setActiveMatrix("ANALIZ_ENGINE")} style={{ color: "#fff", fontWeight: "bold", cursor: "pointer", fontSize: "13px" }}>▶ 🔬 OKUMA & ANALİZ MOTORU</div>
          <div onClick={() => setActiveMatrix("FLOW_MAP")} style={{ color: "#fff", fontWeight: "bold", cursor: "pointer", fontSize: "13px" }}>▶ 🌍 GÖÇ & AKIŞ HARİTASI</div>
        </div>

        <div style={{ border: "1.5px solid #8c7126", borderRadius: "10px", backgroundColor: "#0a0a0a", padding: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <h3 style={{ margin: 0, color: "#d4af37", fontSize: "13px" }}>⚡ YKOS ÇÖZÜMLERİ VE İNDEKSLER</h3>
          <button onClick={() => setActiveMatrix("ANALIZ_ENGINE")} style={{ padding: "8px", borderRadius: "5px", border: "1px solid #554218", backgroundColor: "#12100b", color: "#d4af37", fontWeight: "bold", cursor: "pointer", textAlign: "left", fontSize: "10.5px" }}>📜 Göbeklitepe T-Sütunu YKOS Okuması</button>
          <button onClick={() => setActiveMatrix("ANALIZ_ENGINE")} style={{ padding: "8px", borderRadius: "5px", border: "1px solid #554218", backgroundColor: "#12100b", color: "#d4af37", fontWeight: "bold", cursor: "pointer", textAlign: "left", fontSize: "10.5px" }}>📜 Etrüsk Lemnos Kitabesi & Ön Türkçe Eşleşmesi</button>

          <button
            onClick={() => {
              setActiveMatrix("BUBBLE");
              window.scrollTo({ top: 300, behavior: "smooth" });
            }}
            style={{
              width: "100%",
              marginTop: "8px",
              background: "linear-gradient(135deg, #ffd700 0%, #b8860b 100%)",
              color: "#000",
              border: "none",
              padding: "10px",
              borderRadius: "6px",
              fontWeight: "bold",
              fontSize: "0.8rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              boxShadow: "0 0 12px rgba(255, 215, 0, 0.4)"
            }}
          >
            <span>🔮</span> BALONCUK MATRİSİNİ GÖRSELLEŞTİR ➔
          </button>
        </div>
      </div>

    </div>
  );
}

export default YKOSAnadoluEvrenselPano;
