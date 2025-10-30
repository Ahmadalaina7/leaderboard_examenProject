"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import './styles.css'; // Zorg ervoor dat je dit bestand hebt voor de styling

type Score = { id: number; name: string; score: number; created_at: string };

export default function AdminBoard() {
  const [scores, setScores] = useState<Score[]>([]);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch('/api/scores');
      if (!res.ok) {
        router.push('/admin'); // Als niet geautoriseerd, terug naar inlogpagina
      } else {
        fetchScores(); // Voer fetchScores uit als geautoriseerd
      }
    };
    checkAuth();
  }, []);

  async function fetchScores() {
    try {
      const res = await fetch('/api/scores');
      const data = await res.json();
      setScores(data); // Zet de opgehaalde scores in de state
    } catch (error) {
      console.error('Fout bij het ophalen van scores:', error);
      alert('Er was een probleem bij het ophalen van scores.');
    }
  }

  async function del(id: number) {
    const res = await fetch(`/api/scores/${id}`, { method: 'DELETE' });
    if (res.ok) {
      fetchScores(); // Ververs de scores na een succesvolle verwijdering
    } else {
      const error = await res.json();
      alert('Fout bij verwijderen: ' + (error?.error || 'niet geautoriseerd'));
    }
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin'); // Stuur terug naar de inlogpagina
  }

  return (
    <main className="admin-container">
      <h1>Admin — Leaderboard</h1>
      <button className="logout-button" onClick={logout}>Log uit</button>
      <ul>
        {scores.map(s => (
          <li key={s.id}>
            <span>{s.name} — {s.score}</span>
            <button onClick={() => del(s.id)}>Verwijder</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
