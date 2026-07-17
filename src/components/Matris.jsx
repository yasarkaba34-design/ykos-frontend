import React, { useMemo, useState } from "react";
import ykosRoots from "../data/ykos_roots";

const MODULES = [
  { id: "kok", label: "Kök" },
  { id: "hece", label: "Hece" },
  { id: "kelime", label: "Kelime" },
  { id: "ses", label: "Ses" },
  { id: "dil", label: "Dil" },
  { id: "damga", label: "Damga" },
];

function normalizeArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function getTextValue(item, keys) {
  if (!item || typeof item !== "object") return "";

  for (const key of keys) {
    const value = item[key];

    if (typeof value === "string" || typeof value === "number") {
      return String(value);
    }
  }

  return "";
}

function normalizeRootRecord(item, index) {
  if (typeof item === "string") {
    return {
      id: `root-${index}`,
      kok: item,
      heceler: [],
      kelimeler: [],
      sesler: [],
      diller: [],
      damgalar: [],
      petroglifler: [],
      yazitlar: [],
      konumlar: [],
      aciklama: "",
      kaynaklar: [],
    };
  }

  const kok =
    getTextValue(item, [
      "root",
      "kok",
      "kök",
      "name",
      "baslik",
      "title",
    ]) || `Kök ${index + 1}`;

  return {
    id: item.id ?? `root-${index}`,
    kok,

    heceler: normalizeArray(
      item.syllables ?? item.heceler ?? item.hece
    ),

    kelimeler: normalizeArray(
      item.words ?? item.kelimeler ?? item.kelime
    ),

    sesler: normalizeArray(
      item.sounds ?? item.sesler ?? item.ses
    ),

    diller: normalizeArray(
      item.languages ?? item.diller ?? item.dil
    ),

    damgalar: normalizeArray(
      item.symbols ?? item.damgalar ?? item.damga
    ),

    petroglifler: normalizeArray(
      item.petroglyphs ?? item.petroglifler ?? item.petroglyph
    ),

    yazitlar: normalizeArray(
      item.inscriptions ?? item.yazitlar
    ),

    konumlar: normalizeArray(
      item.locations ?? item.konumlar
    ),

    aciklama: item.description ?? item.aciklama ?? "",

    kaynaklar: normalizeArray(
      item.sources ?? item.kaynaklar
    ),
  };
}

function itemToText(item) {
  if (typeof item === "string" || typeof item === "number") {
    return String(item);
  }

  if (item && typeof item === "object") {
    const country = item.country ?? item.ulke;
    const city = item.city ?? item.il ?? item.yer;

    if (country || city) {
      return [country, city].filter(Boolean).join(" / ");
    }

    return (
      getTextValue(item, [
        "ad",
        "name",
        "baslik",
        "title",
        "deger",
        "value",
        "kod",
        "code",
      ]) || JSON.stringify(item)
    );
  }

  return "";
}

export default function Matris({
  query = "",
  filter = "all",
  matrixType = "m8",
}) {
  const [activeModule, setActiveModule] = useState("kok");
  const [selectedRootId, setSelectedRootId] = useState(null);

  const records = useMemo(() => {
    const source = Array.isArray(ykosRoots)
      ? ykosRoots
      : ykosRoots?.roots ?? ykosRoots?.data ?? [];

    return source.map(normalizeRootRecord);
  }, []);

  const filteredRecords = useMemo(() => {
    const normalizedQuery = query
      .trim()
      .toLocaleLowerCase("tr-TR");

    if (!normalizedQuery) return records;

    return records.filter((record) => {
      const searchableText = [
        record.kok,
        ...record.heceler.map(itemToText),
        ...record.kelimeler.map(itemToText),
        ...record.sesler.map(itemToText),
        ...record.diller.map(itemToText),
        ...record.damgalar.map(itemToText),
        ...record.petroglifler.map(itemToText),
        ...record.yazitlar.map(itemToText),
        ...record.konumlar.map(itemToText),
        record.aciklama,
        ...record.kaynaklar.map(itemToText),
      ]
        .join(" ")
        .toLocaleLowerCase("tr-TR");

      return searchableText.includes(normalizedQuery);
    });
  }, [query, records]);

  const selectedRoot =
    filteredRecords.find(
      (record) => record.id === selectedRootId
    ) ??
    filteredRecords[0] ??
    null;

  function getModuleItems() {
    if (activeModule === "kok") {
      return filteredRecords.map((record) => ({
        id: record.id,
        label: record.kok,
      }));
    }

    if (!selectedRoot) return [];

    const fieldMap = {
      hece: "heceler",
      kelime: "kelimeler",
      ses: "sesler",
      dil: "diller",
      damga: "damgalar",
    };

    const fieldName = fieldMap[activeModule];
    const values = selectedRoot[fieldName] ?? [];

    return values.map((item, index) => ({
      id: `${activeModule}-${index}`,
      label: itemToText(item),
    }));
  }

  function handleItemClick(item) {
    if (activeModule === "kok") {
      setSelectedRootId(item.id);
      setActiveModule("hece");
    }
  }

  const moduleItems = getModuleItems();

  return (
    <section style={styles.container}>
      <div style={styles.headingRow}>
        <div>
          <h2 style={styles.title}>Matris Modülü</h2>

          <p style={styles.text}>
            {matrixType.toUpperCase()} matrisi üzerinden kök, hece,
            kelime, ses, dil ve damga ilişkilerini inceleyin.
          </p>
        </div>

        <div style={styles.infoBadge}>
          {filteredRecords.length} kök
        </div>
      </div>

      <div style={styles.grid}>
        {MODULES.map((module) => {
          const isActive = activeModule === module.id;

          return (
            <button
              key={module.id}
              type="button"
              onClick={() => setActiveModule(module.id)}
              style={{
                ...styles.card,
                ...(isActive ? styles.activeCard : {}),
              }}
            >
              {module.label}
            </button>
          );
        })}
      </div>

      <div style={styles.resultPanel}>
        <div style={styles.resultHeader}>
          <div>
            <span style={styles.resultLabel}>Seçili bölüm</span>

            <h3 style={styles.resultTitle}>
              {
                MODULES.find(
                  (item) => item.id === activeModule
                )?.label
              }
            </h3>
          </div>

          {selectedRoot && activeModule !== "kok" && (
            <div style={styles.selectedRoot}>
              Kök: <strong>{selectedRoot.kok}</strong>
            </div>
          )}
        </div>

        {filter !== "all" && (
          <div style={styles.filterNotice}>
            Aktif filtre: {filter}
          </div>
        )}

        {moduleItems.length > 0 ? (
          <div style={styles.itemGrid}>
            {moduleItems.map((item) => {
              const isSelected =
                activeModule === "kok" &&
                selectedRoot?.id === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleItemClick(item)}
                  style={{
                    ...styles.itemButton,
                    ...(isSelected
                      ? styles.selectedItem
                      : {}),
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        ) : (
          <div style={styles.emptyState}>
            Bu bölüm için henüz kayıt bulunmuyor.
          </div>
        )}

        {selectedRoot && (
          <div style={styles.detailPanel}>
            <div>
              <strong>Açıklama:</strong>{" "}
              {selectedRoot.aciklama || "Henüz açıklama yok."}
            </div>

            <div>
              <strong>Petroglif:</strong>{" "}
              {selectedRoot.petroglifler.join(", ") || "Yok"}
            </div>

            <div>
              <strong>Yazıt:</strong>{" "}
              {selectedRoot.yazitlar.join(", ") || "Yok"}
            </div>

            <div>
              <strong>Konum:</strong>{" "}
              {selectedRoot.konumlar.map(itemToText).join(", ") ||
                "Yok"}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

const styles = {
  container: {
    backgroundColor: "#222",
    color: "#fff",
    padding: "24px",
    borderRadius: "8px",
    border: "1px solid #444",
  },

  headingRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
  },

  title: {
    color: "#f5c400",
    fontSize: "24px",
    marginTop: 0,
    marginBottom: "10px",
  },

  text: {
    fontSize: "16px",
    opacity: 0.85,
    marginTop: 0,
    marginBottom: "24px",
  },

  infoBadge: {
    color: "#f5c400",
    border: "1px solid #6f5a00",
    borderRadius: "999px",
    padding: "8px 14px",
    height: "fit-content",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "14px",
  },

  card: {
    backgroundColor: "#171717",
    color: "#fff",
    border: "1px solid #555",
    borderRadius: "8px",
    padding: "18px",
    fontSize: "17px",
    fontWeight: "600",
    cursor: "pointer",
  },

  activeCard: {
    backgroundColor: "#f5c400",
    color: "#111",
    borderColor: "#f5c400",
  },

  resultPanel: {
    marginTop: "22px",
    padding: "20px",
    backgroundColor: "#151515",
    border: "1px solid #3f3f3f",
    borderRadius: "8px",
  },

  resultHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    marginBottom: "18px",
  },

  resultLabel: {
    color: "#999",
    fontSize: "12px",
    textTransform: "uppercase",
  },

  resultTitle: {
    color: "#f5c400",
    fontSize: "20px",
    margin: "4px 0 0",
  },

  selectedRoot: {
    backgroundColor: "#222",
    border: "1px solid #444",
    borderRadius: "6px",
    padding: "8px 12px",
  },

  filterNotice: {
    marginBottom: "14px",
    color: "#ccc",
  },

  itemGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(130px, 1fr))",
    gap: "10px",
  },

  itemButton: {
    backgroundColor: "#202020",
    color: "#fff",
    border: "1px solid #4a4a4a",
    borderRadius: "7px",
    padding: "12px",
    cursor: "pointer",
  },

  selectedItem: {
    backgroundColor: "#f5c400",
    color: "#111",
    borderColor: "#f5c400",
    fontWeight: "700",
  },

  emptyState: {
    color: "#aaa",
    border: "1px dashed #444",
    borderRadius: "7px",
    padding: "24px",
    textAlign: "center",
  },

  detailPanel: {
    marginTop: "18px",
    padding: "16px",
    lineHeight: 1.8,
    backgroundColor: "#1d1d1d",
    border: "1px solid #3f3f3f",
    borderRadius: "7px",
    color: "#ddd",
  },
};