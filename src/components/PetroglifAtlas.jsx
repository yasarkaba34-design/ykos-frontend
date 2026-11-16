import { useMemo, useState } from "react";
import petroglifler from "../data/petroglifler";

function Etiketler({ baslik, veriler = [] }) {
  if (!veriler.length) return null;

  return (
    <div className="petroglif-bolum">
      <h4>{baslik}</h4>

      <div className="petroglif-etiketler">
        {veriler.map((veri) => (
          <span key={veri} className="petroglif-etiket">
            {veri}
          </span>
        ))}
      </div>
    </div>
  );
}

function KanitPaneli({ kayit }) {
  const kanitlar = Array.isArray(kayit.kanitKayitlari) ? kayit.kanitKayitlari : [];

  return (
    <div className="petroglif-bolum">
      <h4>Kayıt Durumu ve Kaynak Kanıtı</h4>
      <p style={{ color: "#cbd5e1", lineHeight: 1.55 }}>
        <strong style={{ color: "#fbbf24" }}>{kayit.veriDurumu || "Kayıt durumu belirtilmemiş."}</strong>
      </p>
      {kanitlar.length > 0 ? (
        <ul style={{ paddingLeft: "20px", color: "#cbd5e1", lineHeight: 1.55 }}>
          {kanitlar.map((kanit, index) => (
            <li key={kanit.url || index} style={{ marginBottom: "10px" }}>
              <a href={kanit.url} target="_blank" rel="noopener noreferrer" style={{ color: "#67e8f9", fontWeight: 700 }}>
                {kanit.kurum} — {kanit.belge}
              </a>
              <div>{kanit.destekledigiBilgi}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: "#cbd5e1" }}>Kaynak belge henüz eklenmedi; kayıt eksik bilgi olarak tutuluyor.</p>
      )}
      <p style={{ color: "#cbd5e1", lineHeight: 1.55 }}>
        <strong>YKOS eşleşme durumu:</strong> {kayit.ykosBaglantiDurumu || "Belirtilmemiş"}
      </p>
      <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.5 }}>
        <strong>Görsel kaynağı:</strong> {kayit.gorselKaynakDurumu || "Bilgi bekleniyor."}
      </p>
    </div>
  );
}

export default function PetroglifAtlas({ query = "" }) {
  const [aktifId, setAktifId] = useState(petroglifler[0]?.id || "");
  const [aktifGorsel, setAktifGorsel] = useState(
    petroglifler[0]?.anaGorsel || ""
  );

  const filtrelenmisKayitlar = useMemo(() => {
    const arama = query.trim().toLocaleLowerCase("tr-TR");

    if (!arama) return petroglifler;

    return petroglifler.filter((kayit) => {
      const metin = [
        kayit.id,
        kayit.ad,
        kayit.ulke,
        kayit.sehir,
        kayit.ilce,
        kayit.alan,
        kayit.tarih,
        kayit.donem,
        kayit.aciklama,
        ...(kayit.damgalar || []),
        ...(kayit.kokler || []),
        ...(kayit.yazitlar || []),
        ...(kayit.kaynaklar || []),
        kayit.veriDurumu,
        kayit.ykosBaglantiDurumu,
        ...(kayit.kanitKayitlari || []).flatMap((kanit) => [
          kanit.kurum,
          kanit.belge,
          kanit.destekledigiBilgi,
          kanit.url,
        ]),
      ]
        .join(" ")
        .toLocaleLowerCase("tr-TR");

      return metin.includes(arama);
    });
  }, [query]);

  const aktifKayit =
    filtrelenmisKayitlar.find((kayit) => kayit.id === aktifId) ||
    filtrelenmisKayitlar[0];

  function kayitSec(kayit) {
    setAktifId(kayit.id);
    setAktifGorsel(kayit.anaGorsel || kayit.gorseller?.[0] || "");
  }

  if (!aktifKayit) {
    return (
      <section className="petroglif-atlas">
        <div className="petroglif-bos">
          Aramaya uygun petroglif kaydı bulunamadı.
        </div>
      </section>
    );
  }

  const gosterilenGorsel =
    aktifId === aktifKayit.id
      ? aktifGorsel || aktifKayit.anaGorsel
      : aktifKayit.anaGorsel;

  return (
    <section className="petroglif-atlas">
      <div className="petroglif-baslik">
        <div>
          <span className="petroglif-ustbaslik">YKOS</span>
          <h2>Petroglif Atlası</h2>
          <p>Kaya resimleri, damgalar ve coğrafi ilişkiler</p>
        </div>

        <span className="petroglif-sayac">
          {filtrelenmisKayitlar.length} kayıt
        </span>
      </div>

      <div className="petroglif-yerlesim">
        <aside className="petroglif-liste">
          {filtrelenmisKayitlar.map((kayit) => (
            <button
              type="button"
              key={kayit.id}
              className={`petroglif-liste-karti ${
                aktifKayit.id === kayit.id ? "aktif" : ""
              }`}
              onClick={() => kayitSec(kayit)}
            >
              <span className="petroglif-kod">{kayit.id}</span>
              <strong>{kayit.ad}</strong>
              <small>
                {kayit.ulke} / {kayit.sehir}
              </small>
            </button>
          ))}
        </aside>

        <main className="petroglif-detay">
          <div className="petroglif-gorsel-alani">
            {gosterilenGorsel ? (
              <img
                src={gosterilenGorsel}
                alt={aktifKayit.ad}
                className="petroglif-ana-gorsel"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                  event.currentTarget.nextElementSibling.style.display = "flex";
                }}
              />
            ) : null}

            <div
              className="petroglif-gorsel-yok"
              style={{ display: gosterilenGorsel ? "none" : "flex" }}
            >
              Görsel henüz eklenmedi
            </div>
          </div>

          {aktifKayit.gorseller?.length > 1 && (
            <div className="petroglif-galeri">
              {aktifKayit.gorseller.map((gorsel, index) => (
                <button
                  type="button"
                  key={gorsel}
                  onClick={() => setAktifGorsel(gorsel)}
                  className={
                    gosterilenGorsel === gorsel ? "galeri-aktif" : ""
                  }
                >
                  <img
                    src={gorsel}
                    alt={`${aktifKayit.ad} ${index + 1}`}
                  />
                </button>
              ))}
            </div>
          )}

          <div className="petroglif-kimlik">
            <span>{aktifKayit.id}</span>
            <h3>{aktifKayit.ad}</h3>
            <p>{aktifKayit.aciklama}</p>
          </div>

          <div className="petroglif-bilgi-grid">
            <div>
              <small>Ülke</small>
              <strong>{aktifKayit.ulke || "—"}</strong>
            </div>

            <div>
              <small>Şehir</small>
              <strong>{aktifKayit.sehir || "—"}</strong>
            </div>

            <div>
              <small>Alan</small>
              <strong>{aktifKayit.alan || "—"}</strong>
            </div>

            <div>
              <small>Tarih</small>
              <strong>{aktifKayit.tarih || "—"}</strong>
            </div>

            <div>
              <small>Dönem</small>
              <strong>{aktifKayit.donem || "—"}</strong>
            </div>

            <div>
              <small>Koordinat</small>
              <strong>
                {aktifKayit.koordinat
                  ? `${aktifKayit.koordinat.enlem}, ${aktifKayit.koordinat.boylam}`
                  : "—"}
              </strong>
            </div>
          </div>

          <div className="petroglif-iliskiler">
            <Etiketler
              baslik="İlişkili Damgalar"
              veriler={aktifKayit.damgalar}
            />

            <Etiketler
              baslik="İlişkili Kökler"
              veriler={aktifKayit.kokler}
            />

            <Etiketler
              baslik="İlişkili Yazıtlar"
              veriler={aktifKayit.yazitlar}
            />

            <Etiketler
              baslik="Kaynaklar"
              veriler={aktifKayit.kaynaklar}
            />

            <KanitPaneli kayit={aktifKayit} />
          </div>
        </main>
      </div>
    </section>
  );
}