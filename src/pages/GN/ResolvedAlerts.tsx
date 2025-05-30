import React, { useState } from "react";

const dummyAlerts = [
  { id: "0001", type: "Flood", severity: "High", date: "2025-01-01", resolved: false },
  { id: "0002", type: "Landslide", severity: "Medium", date: "2025-01-01", resolved: false },
];

export default function ResolvedAlerts() {
  const [alerts, setAlerts] = useState(dummyAlerts);
  const [search, setSearch] = useState("");

  const handleResolvedChange = (idx: number) => {
    setAlerts(alerts =>
      alerts.map((alert, i) =>
        i === idx ? { ...alert, resolved: !alert.resolved } : alert
      )
    );
  };

  const filteredAlerts = alerts.filter(alert =>
    alert.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-3xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow p-8 mt-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
        Resolved Alerts
      </h2>
      <div className="flex items-center gap-2 mb-4">
        <label className="font-semibold text-blue-700">GN Division :</label>
        <input
          type="text"
          placeholder="Enter Your GN Division"
          className="rounded px-3 py-2 border border-blue-300 flex-1 focus:ring-2 focus:ring-blue-200"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded px-4 py-2 font-semibold shadow hover:scale-105 transition-all">
          Search
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow border border-gray-200">
          <thead>
            <tr className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700">
              <th className="py-2 px-4 text-left">Alert ID</th>
              <th className="py-2 px-4 text-left">Alert Type</th>
              <th className="py-2 px-4 text-left">Severity</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Mark As resolved</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlerts.map((alert, idx) => (
              <tr key={alert.id} className="border-b last:border-b-0 hover:bg-blue-50 transition">
                <td className="py-2 px-4">{alert.id}</td>
                <td className="py-2 px-4">{alert.type}</td>
                <td className="py-2 px-4">{alert.severity}</td>
                <td className="py-2 px-4">{alert.date}</td>
                <td className="py-2 px-4">
                  <input
                    type="checkbox"
                    checked={alert.resolved}
                    onChange={() => handleResolvedChange(idx)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}