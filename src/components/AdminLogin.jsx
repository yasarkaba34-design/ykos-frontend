import React, { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../data/firebase";

const ADMIN_UID = "WnKrb0wcY3dHpSJjdn9b2aAwTw02";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);

    try {
      const result = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      if (result.user.uid !== ADMIN_UID) {
        await signOut(auth);
        setError("Bu hesabın yönetici yetkisi yok.");
        return;
      }

      window.location.assign("/admin");
    } catch (error) {
      setError(`Giriş yapılamadı: ${error.code || "bilinmeyen-hata"}`);
    } finally {
      setBusy(false);
    }
  };

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    marginTop: "12px",
    background: "#030712",
    border: "1px solid #475569",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "16px"
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#030712",
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      boxSizing: "border-box"
    }}>
      <form onSubmit={handleSubmit} style={{
        width: "100%",
        maxWidth: "420px",
        background: "#070b14",
        border: "1.5px solid #ffd700",
        borderRadius: "10px",
        padding: "24px",
        boxSizing: "border-box"
      }}>
        <h2 style={{ color: "#ffd700", textAlign: "center" }}>
          YKOS YÖNETİCİ GİRİŞİ
        </h2>

        <label htmlFor="admin-email">E-posta</label>
        <input
          id="admin-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          required
          disabled={busy}
          style={inputStyle}
        />

        <label
          htmlFor="admin-password"
          style={{ display: "block", marginTop: "16px" }}
        >
          Şifre
        </label>
        <input
          id="admin-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          disabled={busy}
          style={inputStyle}
        />

        {error && (
          <p role="alert" style={{ color: "#f87171" }}>
            {error}
          </p>
        )}

        <button type="submit" disabled={busy} style={{
          width: "100%",
          marginTop: "20px",
          padding: "12px",
          background: "#ffd700",
          color: "#000",
          border: "none",
          borderRadius: "6px",
          fontWeight: "bold",
          cursor: busy ? "wait" : "pointer"
        }}>
          {busy ? "Giriş yapılıyor…" : "GİRİŞ YAP"}
        </button>

        <a href="/" style={{
          display: "block",
          marginTop: "16px",
          textAlign: "center",
          color: "#94a3b8"
        }}>
          Ana sayfaya dön
        </a>
      </form>
    </div>
  );
}