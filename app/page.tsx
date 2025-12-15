"use client";

import { useEffect, useState } from "react";

interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at?: string;
  [key: string]: any;
}

interface Lead {
  id: number;
  name: string;
  phone: string;
  status?: string;
  notes?: string;
  created_at?: string;
  [key: string]: any;
}

interface User {
  email: string;
  token: string;
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [loginError, setLoginError] = useState("");

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(false);
  const [loadingLeads, setLoadingLeads] = useState(false);

  const [activeTab, setActiveTab] = useState<"dashboard" | "enquiries" | "leads">(
    "dashboard"
  );
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("taxihub_user");
    if (saved) {
      const user: User = JSON.parse(saved);
      setLoginEmail(user.email);
      setAccessToken(user.token);
      setIsLoggedIn(true);
      loadData(user.token);
    }
  }, []);

  const loadData = async (token: string) => {
    // enquiries
    try {
      setLoadingEnquiries(true);
      const res = await fetch(
        `https://jaishriramtourntravels.com/api/enquiries.php?token=${token}`,
        { cache: "no-store" }
      );
      if (res.ok) {
        const data = await res.json();
        const list = Array.isArray(data)
          ? data
          : data.data || data.enquiries || [];
        setEnquiries(list);
      } else {
        setEnquiries([]);
      }
    } catch {
      setEnquiries([]);
    } finally {
      setLoadingEnquiries(false);
    }

    // leads
    try {
      setLoadingLeads(true);
      const res = await fetch(
        `https://jaishriramtourntravels.com/api/leads.php?token=${token}`,
        { cache: "no-store" }
      );
      if (res.ok) {
        const data = await res.json();
        const list = Array.isArray(data) ? data : data.data || data.leads || [];
        setLeads(list);
      } else {
        setLeads([]);
      }
    } catch {
      setLeads([]);
    } finally {
      setLoadingLeads(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    if (!loginEmail || !loginPassword || !accessToken) {
      setLoginError("Please fill all fields");
      return;
    }
    const user: User = { email: loginEmail, token: accessToken };
    localStorage.setItem("taxihub_user", JSON.stringify(user));
    setIsLoggedIn(true);
    loadData(accessToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("taxihub_user");
    setIsLoggedIn(false);
    setEnquiries([]);
    setLeads([]);
    setAccessToken("");
    setLoginPassword("");
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

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-layout-bg px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-card p-8 border border-gray-100">
          <h1 className="text-3xl font-extrabold text-primary-700 mb-2 text-center">
            Taxihub Dashboard
          </h1>
          <p className="text-gray-500 text-center mb-8">
            Sign in with admin email and API token
          </p>
          <form onSubmit={handleLogin} className="space-y-5">
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

  return (
    <div className="min-h-screen flex bg-layout-bg">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-layout-sidebar text-white flex flex-col transition-transform duration-200 lg:static lg:translate-x-0 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <div className="h-9 w-9 rounded-lg bg-primary-400 flex items-center justify-center mr-3">
            <span className="font-bold text-sm">TH</span>
          </div>
          <div>
            <p className="text-sm font-semibold">Taxihub</p>
            <p className="text-xs text-white/70">Admin Panel</p>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 text-sm">
          <button
            onClick={() => {
              setActiveTab("dashboard");
              setMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center px-3 py-2.5 rounded-lg ${
              activeTab === "dashboard"
                ? "bg-white text-layout-sidebar font-semibold"
                : "text-white/80 hover:bg-white/10"
            }`}
          >
            <span className="mr-2">🏠</span> Dashboard
          </button>
          <button
            onClick={() => {
              setActiveTab("enquiries");
              setMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center px-3 py-2.5 rounded-lg ${
              activeTab === "enquiries"
                ? "bg-white text-layout-sidebar font-semibold"
                : "text-white/80 hover:bg-white/10"
            }`}
          >
            <span className="mr-2">📨</span> Enquiries
          </button>
          <button
            onClick={() => {
              setActiveTab("leads");
              setMobileSidebarOpen(false);
            }}
            className={`w-full flex items-center px-3 py-2.5 rounded-lg ${
              activeTab === "leads"
                ? "bg-white text-layout-sidebar font-semibold"
                : "text-white/80 hover:bg-white/10"
            }`}
          >
            <span className="mr-2">📞</span> Call leads
          </button>
        </nav>
        <div className="px-4 py-4 border-t border-white/10 text-xs">
          <p className="mb-3 text-white/60">{loginEmail}</p>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Main column */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
        {/* Top bar */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden mr-2 text-gray-600"
              onClick={() => setMobileSidebarOpen(true)}
            >
              ☰
            </button>
            <h1 className="text-lg font-semibold text-gray-800">
              {activeTab === "dashboard"
                ? "Dashboard"
                : activeTab === "enquiries"
                ? "Customer enquiries"
                : "Call leads"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-xs text-gray-500">
              Today:{" "}
              {new Date().toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
            <div className="h-8 w-8 rounded-full bg-primary-400 text-white flex items-center justify-center text-xs font-semibold">
              {loginEmail.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-4 md:px-8 py-6 space-y-6">
          {activeTab === "dashboard" && (
            <>
              {/* Top row: welcome + stat cards */}
              <section className="grid gap-6 lg:grid-cols-[2fr,1.2fr]">
                {/* Welcome card */}
                <div className="bg-white rounded-xl2 shadow-card border border-gray-100 p-6 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Welcome back,</p>
                      <h2 className="text-2xl font-bold text-gray-900 mt-1">
                        {loginEmail.split("@")[0] || "Admin"}
                      </h2>
                      <p className="text-xs text-gray-500 mt-2">
                        All systems are running smoothly. You have{" "}
                        <span className="text-primary-700 font-semibold">
                          {enquiries.length}
                        </span>{" "}
                        enquiries and{" "}
                        <span className="text-primary-700 font-semibold">
                          {leads.length}
                        </span>{" "}
                        leads.
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <div className="h-24 w-40 rounded-xl bg-gradient-to-tr from-primary-500 to-primary-300" />
                    </div>
                  </div>
                </div>

                {/* Stats column */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl2 p-4 text-white bg-primary-700 shadow-card">
                    <p className="text-xs uppercase tracking-wide opacity-80">
                      Today&apos;s enquiries
                    </p>
                    <p className="text-2xl font-bold mt-2">
                      {enquiries.length}
                    </p>
                    <p className="text-xs mt-1 opacity-80">
                      Last 30 days total enquiries
                    </p>
                  </div>
                  <div className="rounded-xl2 p-4 text-white bg-primary-500 shadow-card">
                    <p className="text-xs uppercase tracking-wide opacity-80">
                      Total leads
                    </p>
                    <p className="text-2xl font-bold mt-2">{leads.length}</p>
                    <p className="text-xs mt-1 opacity-80">
                      Manual &amp; call leads
                    </p>
                  </div>
                  <div className="rounded-xl2 p-4 text-white bg-primary-400 shadow-card">
                    <p className="text-xs uppercase tracking-wide opacity-80">
                      Conversion rate
                    </p>
                    <p className="text-2xl font-bold mt-2">–</p>
                    <p className="text-xs mt-1 opacity-80">
                      Hook this to real data later
                    </p>
                  </div>
                  <div className="rounded-xl2 p-4 text-white bg-accent-pink shadow-card">
                    <p className="text-xs uppercase tracking-wide opacity-80">
                      Alerts
                    </p>
                    <p className="text-2xl font-bold mt-2">0</p>
                    <p className="text-xs mt-1 opacity-80">
                      System is running smoothly
                    </p>
                  </div>
                </div>
              </section>

              {/* Second row: latest enquiries + leads summary */}
              <section className="grid gap-6 lg:grid-cols-2">
                <div className="bg-white rounded-xl2 shadow-card border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-800">
                      Latest enquiries
                    </h3>
                    <button
                      className="text-xs text-primary-700 hover:underline"
                      onClick={() => setActiveTab("enquiries")}
                    >
                      View all
                    </button>
                  </div>
                  {loadingEnquiries ? (
                    <p className="text-xs text-gray-500 py-6">Loading…</p>
                  ) : enquiries.length === 0 ? (
                    <p className="text-xs text-gray-500 py-6">
                      No enquiries yet.
                    </p>
                  ) : (
                    <ul className="space-y-3 text-xs">
                      {enquiries.slice(0, 5).map((enq, idx) => (
                        <li
                          key={enq.id || idx}
                          className="flex justify-between items-start border-b last:border-b-0 border-gray-100 pb-2"
                        >
                          <div>
                            <p className="font-semibold text-gray-800">
                              {enq.name || "N/A"}
                            </p>
                            <p className="text-gray-500">
                              {enq.phone || enq.email || ""}
                            </p>
                          </div>
                          {enq.created_at && (
                            <p className="text-gray-400 ml-3">
                              {new Date(enq.created_at).toLocaleDateString(
                                "en-IN",
                                { day: "2-digit", month: "short" }
                              )}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="bg-white rounded-xl2 shadow-card border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-800">
                      Latest call leads
                    </h3>
                    <button
                      className="text-xs text-primary-700 hover:underline"
                      onClick={() => setActiveTab("leads")}
                    >
                      View all
                    </button>
                  </div>
                  {loadingLeads ? (
                    <p className="text-xs text-gray-500 py-6">Loading…</p>
                  ) : leads.length === 0 ? (
                    <p className="text-xs text-gray-500 py-6">
                      No leads found yet.
                    </p>
                  ) : (
                    <ul className="space-y-3 text-xs">
                      {leads.slice(0, 5).map((lead, idx) => (
                        <li
                          key={lead.id || idx}
                          className="flex justify-between items-start border-b last:border-b-0 border-gray-100 pb-2"
                        >
                          <div>
                            <p className="font-semibold text-gray-800">
                              {lead.name}
                            </p>
                            <p className="text-gray-500">{lead.phone}</p>
                          </div>
                          <span className="ml-3 text-[11px] px-2 py-1 rounded-full bg-primary-50 text-primary-700">
                            {lead.status || "Pending"}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            </>
          )}

          {activeTab === "enquiries" && (
            <section className="bg-white rounded-xl2 shadow-card border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                All enquiries ({enquiries.length})
              </h2>
              {loadingEnquiries ? (
                <p className="text-xs text-gray-500 py-6">Loading…</p>
              ) : enquiries.length === 0 ? (
                <p className="text-xs text-gray-500 py-6">
                  No enquiries available.
                </p>
              ) : (
                <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                  {enquiries.map((enq, idx) => (
                    <div
                      key={enq.id || idx}
                      className="border border-gray-200 rounded-xl p-4 hover:border-primary-300 hover:shadow-card transition"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-sm text-gray-900">
                            {enq.name || "N/A"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {enq.email || enq.phone || ""}
                          </p>
                        </div>
                        {enq.created_at && (
                          <p className="text-[11px] text-gray-400">
                            {new Date(enq.created_at).toLocaleString("en-IN")}
                          </p>
                        )}
                      </div>
                      {enq.message && (
                        <p className="mt-2 text-xs text-gray-700 whitespace-pre-wrap">
                          {enq.message}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {activeTab === "leads" && (
            <section className="bg-white rounded-xl2 shadow-card border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                All call leads ({leads.length})
              </h2>
              {loadingLeads ? (
                <p className="text-xs text-gray-500 py-6">Loading…</p>
              ) : leads.length === 0 ? (
                <p className="text-xs text-gray-500 py-6">
                  No leads available.
                </p>
              ) : (
                <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                  {leads.map((lead, idx) => (
                    <div
                      key={lead.id || idx}
                      className="border border-gray-200 rounded-xl p-4 hover:border-primary-300 hover:shadow-card transition"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-sm text-gray-900">
                            {lead.name}
                          </p>
                          <a
                            href={`tel:${lead.phone}`}
                            className="text-xs text-primary-700 hover:underline"
                          >
                            {lead.phone}
                          </a>
                        </div>
                        <span className="text-[11px] px-2 py-1 rounded-full bg-primary-50 text-primary-700">
                          {lead.status || "Pending"}
                        </span>
                      </div>
                      {lead.notes && (
                        <p className="mt-2 text-xs text-gray-700 whitespace-pre-wrap">
                          {lead.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
