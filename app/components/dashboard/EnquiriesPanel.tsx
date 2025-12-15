"use client";

import { Enquiry } from "../../types";

interface EnquiriesPanelProps {
  enquiries: Enquiry[];
  loading: boolean;
  token: string;
}

export default function EnquiriesPanel({ enquiries, loading, token }: EnquiriesPanelProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-8 h-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold">📨</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Customer Enquiries</h2>
          <p className="text-gray-500">{enquiries.length} total</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : enquiries.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No enquiries yet</h3>
          <p className="text-gray-500">New enquiries will appear here automatically</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {enquiries.slice(0, 10).map((enquiry, i) => (
            <div key={enquiry.id || i} className="group p-6 border border-gray-200 hover:border-blue-200 rounded-xl hover:shadow-md transition-all bg-gradient-to-r from-white to-gray-50">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-700">
                  {enquiry.name || "N/A"}
                </h3>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  #{enquiry.id || i + 1}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-sm font-medium text-gray-700 block mb-1">📧 Email</span>
                  <p className="text-gray-600 text-sm">{enquiry.email || "N/A"}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700 block mb-1">📞 Phone</span>
                  <a href={`tel:${enquiry.phone}`} className="text-blue-600 hover:underline font-medium">
                    {enquiry.phone}
                  </a>
                </div>
              </div>
              {enquiry.message && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                  <p className="text-sm text-gray-800 leading-relaxed">{enquiry.message}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
