"use client";

import { Lead } from "../../types";

interface AddLeadModalProps {
  open: boolean;
  loading: boolean;
  error: string;
  lead: Lead;
  onChange: (lead: Lead) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function AddLeadModal({
  open,
  loading,
  error,
  lead,
  onChange,
  onClose,
  onSubmit,
}: AddLeadModalProps) {
  if (!open) return null;

  const update = (field: keyof Lead, value: string) =>
    onChange({ ...lead, [field]: value });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg bg-white rounded-xl2 shadow-card border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Add New Call
          </h2>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={lead.name}
                onChange={(e) => update("name", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={lead.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Pickup location
              </label>
              <input
                type="text"
                value={lead.pickup_location}
                onChange={(e) => update("pickup_location", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Drop location
              </label>
              <input
                type="text"
                value={lead.drop_location}
                onChange={(e) => update("drop_location", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Trip date
              </label>
              <input
                type="datetime-local"
                value={lead.trip_date}
                onChange={(e) => update("trip_date", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={lead.status}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  update("status", e.currentTarget.value)
                }
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="lost">Lost</option>
              </select>
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              className="px-4 py-2 text-xs rounded-lg border border-gray-300 text-gray-700"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 text-xs rounded-lg bg-primary-700 text-white font-semibold hover:bg-primary-600 disabled:opacity-70"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
