import React, { useState } from "react";
import districtGnDivisions from "../../data/districtGnDivisions";

// Example disaster types
const disasterTypes = [
  "Flood",
  "Landslide",
  "Cyclone",
  "Fire",
  "Drought",
  "Tsunami",
  "Storm",
  "Earthquake",
];

// Helper to get a random disaster and date
function getRandomDisaster(idx: number) {
  return disasterTypes[idx % disasterTypes.length];
}
function getRandomDate(idx: number) {
  // Generate a date in June 2025
  const day = (idx * 3 + 1) % 28 + 1;
  return `2025-06-${day.toString().padStart(2, "0")}`;
}

// Generate alerts using real districts and GN Divisions from the data file
const allAlerts = Object.entries(districtGnDivisions)
  .flatMap(([district, gnDivisions], i) =>
    gnDivisions.slice(0, 1).map((division, j) => ({
      type: getRandomDisaster(i + j),
      date: getRandomDate(i + j),
      district,
      division,
      status: i % 2 === 0 ? "Ongoing" : "Resolved",
    }))
  )
  .slice(0, 12); // Show more for filtering

export default function DMCAlerts() {
  const [typeFilter, setTypeFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredAlerts = allAlerts.filter(
    (alert) =>
      (!typeFilter || alert.type === typeFilter) &&
      (!districtFilter || alert.district === districtFilter) &&
      (!statusFilter || alert.status === statusFilter)
  );

  return (
    <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-100 rounded-2xl shadow p-8 mt-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Alerts
        </h2>
        <div className="flex flex-wrap gap-2 items-center">
          <select
            className="px-3 py-1 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            {disasterTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <select
            className="px-3 py-1 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
          >
            <option value="">All Districts</option>
            {Object.keys(districtGnDivisions).map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <select
            className="px-3 py-1 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Resolved">Resolved</option>
          </select>
          <button
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full px-4 py-1 font-semibold shadow hover:scale-105 transition-all"
            onClick={() => {
              setTypeFilter("");
              setDistrictFilter("");
              setStatusFilter("");
            }}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg border">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <th className="py-2 px-4 border">Alert Type</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">District</th>
              <th className="py-2 px-4 border">GN Division</th>
              <th className="py-2 px-4 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlerts.length === 0 && (
              <tr>
                <td colSpan={5} className="py-4 text-center text-gray-400">
                  No alerts found for selected filters.
                </td>
              </tr>
            )}
            {filteredAlerts.map((alert, idx) => (
              <tr key={idx} className="border-b last:border-b-0">
                <td className="py-2 px-4 border font-semibold text-blue-700">
                  {alert.type}
                </td>
                <td className="py-2 px-4 border">{alert.date}</td>
                <td className="py-2 px-4 border">{alert.district}</td>
                <td className="py-2 px-4 border">{alert.division}</td>
                <td
                  className={`py-2 px-4 border font-bold ${
                    alert.status === "Ongoing"
                      ? "text-yellow-600"
                      : alert.status === "Resolved"
                      ? "text-green-600"
                      : "text-gray-700"
                  }`}
                >
                  {alert.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}