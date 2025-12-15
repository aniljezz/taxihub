"use client";

import { useEffect, useState } from "react";
import { Enquiry, Lead, User } from "../types";
import { getEnquiries, getLeads, createLead } from "../lib/api";
import AddLeadModal from "./leads/AddLeadModal";

interface DashboardViewProps {
  user: User;
  onLogout: () => void;
}

export default function DashboardView({ user, onLogout }: DashboardViewProps) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(false);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [activeTab, setActiveTab] =
    useState<"dashboard" | "enquiries" | "leads">("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [showAddLead, setShowAddLead] = useState(false);
  const [addingLead, setAddingLead] = useState(false);
  const [addLeadError, setAddLeadError] = useState("");
  const [newLead, setNewLead] = useState<Lead>({
    name: "",
    phone: "",
    pickup_location: "",
    drop_location: "",
    trip_date: "",
    status: "pending",
    notes: "",
  });

  useEffect(() => {
    const load = async () => {
      setLoadingEnquiries(true);
      setLoadingLeads(true);
      try {
        const [e, l] = await Promise.all([
          getEnquiries(user.token),
          getLeads(user.token),
        ]);
        setEnquiries(e);
        setLeads(l);
      } finally {
        setLoadingEnquiries(false);
        setLoadingLeads(false);
      }
    };
    load();
  }, [user.token]);

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !newLead.name ||
      !newLead.phone ||
      !newLead.pickup_location ||
      !newLead.drop_location ||
      !newLead.trip_date
    ) {
      setAddLeadError("Please fill all required fields.");
      return;
    }
    setAddLeadError("");
    try {
      setAddingLead(true);
      const created = await createLead(user.token, newLead);
      setLeads((prev) => [
        { ...(created || newLead), id: created?.id ?? Date.now() },
        ...prev,
      ]);
      setNewLead({
        name: "",
        phone: "",
        pickup_location: "",
        drop_location: "",
        trip_date: "",
        status: "pending",
        notes: "",
      });
      setShowAddLead(false);
    } catch (err: any) {
      setAddLeadError(err?.message || "Failed to add lead");
    } finally {
      setAddingLead(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex bg-layout-bg">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-layout-sidebar text-white flex flex-col transition-transform duration-200 lg:static lg:translate-x-0 ${
            mobileSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
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
                setActiveTab("leads");
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center px-3 py-2.5 rounded-lg ${
                activeTab === "leads"
                  ? "bg-white text-layout-sidebar font-semibold"
                  : "text-white/80 hover:bg-white/10"
              }`}
            >
              <span className="mr-2">📞</span> Phone Calls
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
              <span className="mr-2">📨</span> Website Leads
            </button>
          </nav>
          <div className="px-4 py-4 border-t border-white/10 text-xs">
            <p className="mb-3 text-white/60">{user.email}</p>
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm"
            >
              🚪 Logout
            </button>
          </div>
        </aside>

        {/* Mobile overlay */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* Main area */}
        <div className="flex-1 flex flex-col min-h-screen">
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
                {user.email.charAt(0).toUpperCase()}
              </div>
            </div>
          </header>

          {/* Content (same sections as pehle, enquiries & leads lists) */}
          {/* Abhi ke liye simple placeholder rakho, baad me tumhara pura dashboard yahan move kar sakte ho */}
<main className="flex-1 px-4 md:px-8 py-6 space-y-6">
  {activeTab === "dashboard" && (
    <section className="bg-white rounded-xl2 shadow-card border border-gray-100 p-6">
      <p className="text-lg font-semibold">
        Welcome {user.email.split("@")[0]}
      </p>
      <p className="text-sm text-gray-500 mt-2">
        You have {enquiries.length} enquiries and {leads.length} call leads.
      </p>
    </section>
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
      <div className="flex items-center justify-between mb  -4">
        <h2 className="text-lg font-semibold text-gray-800">
          All call leads ({leads.length})
        </h2>
        <button
          onClick={() => setShowAddLead(true)}
          className="px-3 py-2 text-xs rounded-lg bg-primary-700 text-white font-semibold hover:bg-primary-600"
        >
          ➕ Add Call Lead
        </button>
      </div>
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
                  {lead.pickup_location && lead.drop_location && (
                    <p className="text-[11px] text-gray-500 mt-1">
                      {lead.pickup_location} → {lead.drop_location}
                    </p>
                  )}
                </div>
                <span className="text-[11px] px-2 py-1 rounded-full bg-primary-50 text-primary-700">
                  {lead.status || "pending"}
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

      <AddLeadModal
        open={showAddLead}
        loading={addingLead}
        error={addLeadError}
        lead={newLead}
        onChange={setNewLead}
        onClose={() => setShowAddLead(false)}
        onSubmit={handleCreateLead}
      />
    </>
  );
}
