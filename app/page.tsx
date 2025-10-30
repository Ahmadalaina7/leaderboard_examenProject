"use client";
import { useEffect, useState } from "react";

type Score = { id: number; name: string; score: number; created_at: string };

export default function Home() {
  const [scores, setScores] = useState<Score[]>([]);
  const [name, setName] = useState("");
  const [score, setScore] = useState("");

  useEffect(() => {
    fetchScores();
  }, []);

  async function fetchScores() {
    const res = await fetch("/api/scores");
    setScores(await res.json());
  }

  async function submitScore(e: React.FormEvent) {
    e.preventDefault();
    const token = prompt("Voer SCORE_TOKEN in");
    if (!token) return alert("Token nodig");
    const res = await fetch("/api/scores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, score: Number(score), token }),
    });
    if (res.ok) {
      setName("");
      setScore("");
      fetchScores();
    } else {
      const err = await res.json();
      alert("Fout: " + (err?.error || "unknown"));
    }
  }

  return (
    <div className="home-container">
      <h1 className="text-3xl font-bold mb-4">Escape Room Leaderboard</h1>

      <h2 className="text-xl font-semibold mb-2">Score toevoegen</h2>
      <form onSubmit={submitScore} className="flex flex-col items-center gap-3 mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Naam"
          required
        />
        <input
          value={score}
          onChange={(e) => setScore(e.target.value)}
          placeholder="Score"
          type="number"
          required
        />
        <button type="submit" className="w-1/2">Verstuur</button>
      </form>

     
    </div>
  );
}
