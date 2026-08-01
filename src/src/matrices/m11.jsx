import React from "react";

export default function M11() {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>M11 Matrisi</h2>
      <p style={styles.text}>
        Bu bileşen YKOS sisteminde M11 matrisini temsil eder.
      </p>
    </div>
  );
}

const styles = {
  container: { backgroundColor: "#222", color: "#fff", padding: "20px", borderRadius: "8px", border: "1px solid #444" },
  title: { fontSize: "24px", fontWeight: "bold", marginBottom: "10px" },
  text: { fontSize: "16px", opacity: 0.8 },
};
