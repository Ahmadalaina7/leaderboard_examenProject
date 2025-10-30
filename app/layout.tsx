// app/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Escape Room Leaderboard",
  description: "Beheer je scores in de escape room.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body>
        {/*Navigatiebalk */}
        <header className="navbar">
          <div className="navbar-container">
            <h1 className="navbar-title">Escape Room</h1>
            <nav className="navbar-links">
              <Link href="/">Home</Link>
              <Link href="/admin">Adminpanel</Link>
            </nav>
          </div>
        </header>

        {/* Pagina-inhoud */}
        <main className="content-area">{children}</main>
      </body>
    </html>
  );
}
