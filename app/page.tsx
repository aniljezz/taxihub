"use client";

import { useEffect, useState } from "react";
import { User } from "./types";
import LoginView from "./components/LoginView";
import DashboardView from "./components/DashboardView";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? localStorage.getItem("taxihub_user")
        : null;
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const handleLogin = (u: User) => {
    setUser(u);
  };

  const handleLogout = () => {
    localStorage.removeItem("taxihub_user");
    setUser(null);
  };

  if (showSplash) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-layout-bg">
        <div className="flex flex-col items-center animate-pulse">
          <div className="h-20 w-20 rounded-2xl bg-primary-700 mb-5 shadow-card" />
          <h1 className="text-3xl font-extrabold text-primary-700">Taxihub</h1>
        </div>
      </main>
    );
  }

  if (!user) {
    return <LoginView onLogin={handleLogin} />;
  }

  return <DashboardView user={user} onLogout={handleLogout} />;
}
