import React from "react";

const alerts = [
  { type: "Alert 1", date: "1/1/2025", district: "Region 1", division: "Region 1", status: "Ongoing" },
  { type: "Alert 2", date: "1/1/2025", district: "Region 2", division: "Region 2", status: "Ongoing" },
  { type: "Alert 3", date: "1/1/2025", district: "Region 3", division: "Region 3", status: "Resolved" },
];

export default function DMCAlerts() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-100 rounded-2xl shadow p-8 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Alerts</h2>
        <button className="bg-gray-200 rounded-full px-4 py-1 flex items-center gap-2">
          <span className="material-icons text-base">filter_list</span>
          Filter
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg border">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-2 px-4 border">Alert Type</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">District</th>
              <th className="py-2 px-4 border">GN Division</th>
              <th className="py-2 px-4 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert, idx) => (
              <tr key={idx} className="border-b last:border-b-0">
                <td className="py-2 px-4 border">{alert.type}</td>
                <td className="py-2 px-4 border">{alert.date}</td>
                <td className="py-2 px-4 border">{alert.district}</td>
                <td className="py-2 px-4 border">{alert.division}</td>
                <td className="py-2 px-4 border">{alert.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}