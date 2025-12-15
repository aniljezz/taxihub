"use client";

import Button from "../ui/Button";

interface DashboardHeaderProps {
  email: string;
  onLogout: () => void;
  onAddLead: () => void;
}

export default function DashboardHeader({ email, onLogout, onAddLead }: DashboardHeaderProps) {
  return (
    <div className="bg-white shadow-sm border-b rounded-lg mb-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">TH</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Taxihub Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome, {email}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={onAddLead} variant="success" size="lg">
            ➕ Add Call Lead
          </Button>
          <Button onClick={onLogout} variant="danger" size="md">
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
