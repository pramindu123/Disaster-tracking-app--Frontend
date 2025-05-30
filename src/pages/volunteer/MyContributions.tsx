import React, { useState } from "react";

const contributions = [
  { district: "Galle", gnDivision: "Galle Town", type: "Evacuation", description: "Moved people to shelter" },
  { district: "Matara", gnDivision: "Weligama", type: "First Aid", description: "Given first aid" },
  { district: "Hambantota", gnDivision: "Ambalantota", type: "Supply Distribution", description: "Given supplies" },
];

export default function MyContributions() {
  const [districtFilter, setDistrictFilter] = useState("");
  const [gnDivisionFilter, setGnDivisionFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  // Get unique values for filters
  const districts = Array.from(new Set(contributions.map((c) => c.district)));
  // Only show GN Divisions for selected district, or all if none selected
  const gnDivisions = Array.from(
    new Set(
      contributions
        .filter((c) => !districtFilter || c.district === districtFilter)
        .map((c) => c.gnDivision)
    )
  );
  const types = Array.from(new Set(contributions.map((c) => c.type)));

  // Filtered contributions
  const filteredContributions = contributions.filter(
    (c) =>
      (!districtFilter || c.district === districtFilter) &&
      (!gnDivisionFilter || c.gnDivision === gnDivisionFilter) &&
      (!typeFilter || c.type === typeFilter)
  );

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-transparent">
      <div className="w-full max-w-4xl bg-white/90 rounded-3xl shadow-xl border border-blue-100 p-3 sm:p-6 md:p-8 mt-2 sm:mt-6 md:mt-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-8 gap-2">
          <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900">My Contributions</h1>
          <div className="flex flex-wrap gap-2 items-center">
            <select
              className="px-3 py-1 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={districtFilter}
              onChange={e => {
                setDistrictFilter(e.target.value);
                setGnDivisionFilter(""); // Reset GN Division when district changes
              }}
            >
              <option value="">All Districts</option>
              {districts.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <select
              className="px-3 py-1 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={gnDivisionFilter}
              onChange={e => setGnDivisionFilter(e.target.value)}
              disabled={gnDivisions.length === 0}
            >
              <option value="">All GN Divisions</option>
              {gnDivisions.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
            <select
              className="px-3 py-1 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
            >
              <option value="">All Types</option>
              {types.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <button
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full px-4 py-1 font-semibold shadow hover:scale-105 transition-all"
              onClick={() => {
                setDistrictFilter("");
                setGnDivisionFilter("");
                setTypeFilter("");
              }}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow border border-gray-200 text-xs sm:text-base">
            <thead>
              <tr>
                <th className="px-2 sm:px-6 py-2 sm:py-4 text-left font-semibold text-gray-700 border-b">District</th>
                <th className="px-2 sm:px-6 py-2 sm:py-4 text-left font-semibold text-gray-700 border-b">GN Division</th>
                <th className="px-2 sm:px-6 py-2 sm:py-4 text-left font-semibold text-gray-700 border-b">Type</th>
                <th className="px-2 sm:px-6 py-2 sm:py-4 text-left font-semibold text-gray-700 border-b">Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredContributions.map((c, i) => (
                <tr key={i} className="hover:bg-blue-50 transition">
                  <td className="px-2 sm:px-6 py-2 sm:py-4 border-b">{c.district}</td>
                  <td className="px-2 sm:px-6 py-2 sm:py-4 border-b">{c.gnDivision}</td>
                  <td className="px-2 sm:px-6 py-2 sm:py-4 border-b">{c.type}</td>
                  <td className="px-2 sm:px-6 py-2 sm:py-4 border-b">{c.description}</td>
                </tr>
              ))}
              {filteredContributions.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-gray-400">
                    No contributions found for selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}