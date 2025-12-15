"use client";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  enquiriesCount: number;
  leadsCount: number;
  onLogout: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function Sidebar({
  activeTab,
  onTabChange,
  enquiriesCount,
  leadsCount,
  onLogout,
  mobileOpen,
  onMobileClose,
}: SidebarProps) {
  return (
    <aside className={`
      fixed lg:static inset-0 z-40 w-64 lg:w-72 bg-white border-r shadow-xl
      transform transition-transform duration-300 ease-in-out
      ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      <div className="p-6 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">TH</span>
          </div>
          <div>
            <h2 className="font-bold text-xl text-gray-900">Taxihub</h2>
            <p className="text-sm text-gray-500">Dashboard</p>
          </div>
        </div>
        <button onClick={onMobileClose} className="lg:hidden p-2">
          ✕
        </button>
      </div>

      <nav className="p-6 space-y-2 flex-1">
        <button
          onClick={() => onTabChange("enquiries")}
          className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${
            activeTab === "enquiries"
              ? 'bg-blue-50 border-2 border-blue-200 shadow-sm text-blue-700 font-semibold'
              : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
          }`}
        >
          📨 <span>Enquiries ({enquiriesCount})</span>
        </button>
        <button
          onClick={() => onTabChange("leads")}
          className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${
            activeTab === "leads"
              ? 'bg-green-50 border-2 border-green-200 shadow-sm text-green-700 font-semibold'
              : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
          }`}
        >
          📞 <span>Call Leads ({leadsCount})</span>
        </button>
      </nav>

      <div className="p-6 border-t">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 p-4 text-red-600 hover:bg-red-50 rounded-xl transition-all font-semibold"
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}
