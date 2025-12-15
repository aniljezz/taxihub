"use client";

import { useState } from "react";
import { User } from "../types";

interface LoginViewProps {
  onLogin: (user: User) => void;
}

export default function LoginView({ onLogin }: LoginViewProps) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    if (!loginEmail || !loginPassword || !accessToken) {
      setLoginError("Please fill all fields");
      return;
    }
    const user: User = { email: loginEmail, token: accessToken };
    localStorage.setItem("taxihub_user", JSON.stringify(user));
    onLogin(user);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-layout-bg px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-card p-8 border border-gray-100">
        <h1 className="text-3xl font-extrabold text-primary-700 mb-2 text-center">
          Taxihub Dashboard
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Sign in with admin email and API token
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              placeholder="admin@taxihub.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Access token
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
              placeholder="API access token"
            />
          </div>
          {loginError && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {loginError}
            </p>
          )}
          <button
            type="submit"
            className="w-full mt-2 bg-primary-700 hover:bg-primary-600 text-white font-semibold py-2.5 rounded-xl text-sm shadow-card transition-colors"
          >
            Enter dashboard
          </button>
        </form>
      </div>
    </main>
  );
}
