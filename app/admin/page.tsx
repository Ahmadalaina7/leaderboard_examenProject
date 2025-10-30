"use client";

import { useState, useEffect } from "react";

interface Score {
  id: number;
  name: string;
  time: number;
  created_at: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [scores, setScores] = useState<Score[]>([]);
  const [message, setMessage] = useState("");

  async function loadScores() {
    const res = await fetch("/api/scores");
    const data = await res.json();
    setScores(data);
  }

  async function login() {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      setLoggedIn(true);
      setMessage("✅ Ingelogd als admin");
      loadScores();
    } else {
      setMessage("❌ Onjuist wachtwoord");
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setLoggedIn(false);
    setScores([]);
    setMessage("👋 Uitgelogd");
  }

  async function deleteScore(id: number) {
    if (!confirm("Weet je zeker dat je deze score wilt verwijderen?")) return;
    const res = await fetch(`/api/scores/${id}`, { method: "DELETE" });
    if (res.ok) {
      setScores(scores.filter((s) => s.id !== id));
    } else {
      alert("Verwijderen mislukt (mogelijk niet ingelogd)");
    }
  }

  return (
    <div className="admin-wrapper">
      <h1 className="admin-title">🔐 Admin Beheer</h1>

      {!loggedIn ? (
        <div className="login-section">
          <input
            type="password"
            placeholder="Admin wachtwoord"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={login} className="login-btn">
            Inloggen
          </button>
          <p className="login-message">{message}</p>
        </div>
      ) : (
        <div className="admin-dashboard">
          <div className="admin-topbar">
            <p className="admin-status">{message}</p>
            <button onClick={logout} className="logout-btn">
              Uitloggen
            </button>
          </div>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Naam</th>
                <th>Tijd (s)</th>
                
              </tr>
            </thead>
            <tbody>
              {scores.map((s) => (
                <tr key={s.id}>
                  <td className="naam">{s.name}</td>
                  <td>{s.time}</td>
                  <td>
                    <button
                      onClick={() => deleteScore(s.id)}
                      className="delete-btn"
                    >
                      🗑️ Verwijderen
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
