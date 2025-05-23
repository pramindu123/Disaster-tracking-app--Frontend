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
    <div className="w-full max-w-3xl mx-auto bg-gray-100 rounded-2xl shadow p-8 mt-8">
      <h2 className="text-2xl font-bold text-center mb-6">Resolved Alerts</h2>
      <div className="flex items-center gap-2 mb-4">
        <label className="font-semibold">GN Division :</label>
        <input
          type="text"
          placeholder="Enter Your GN Division"
          className="rounded px-3 py-2 border border-gray-300 flex-1"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="bg-gray-300 hover:bg-gray-400 rounded px-4 py-2 font-semibold">
          Search
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-2 px-4 text-left">Alert ID</th>
              <th className="py-2 px-4 text-left">Alert Type</th>
              <th className="py-2 px-4 text-left">Severity</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Mark As resolved</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlerts.map((alert, idx) => (
              <tr key={alert.id} className="border-b last:border-b-0">
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