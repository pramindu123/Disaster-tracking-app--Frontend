import React from "react";

export default function DMCDashboardHome() {
  return (
    <div className="w-full max-w-5xl mx-auto bg-gray-100 rounded-2xl shadow p-8 mt-8">
      <h2 className="text-3xl font-bold mb-2 text-center">Greetings Example name !!</h2>
      <div className="text-center mb-6 text-gray-700">
        Date | Region | Active Region Status
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 flex flex-col items-center justify-center min-h-[180px]">
          <div className="text-lg font-semibold mb-2">Active Alerts</div>
          {/* You can map active alerts here */}
          <button className="bg-gray-200 rounded-full px-6 py-2 mt-4 font-semibold">Manage</button>
        </div>
        <div className="bg-white rounded-xl p-6 flex flex-col items-center justify-center min-h-[180px]">
          <div className="text-lg font-semibold mb-2">Active Members</div>
          {/* You can map active members here */}
        </div>
      </div>
      <div className="bg-white rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-semibold">Aid Requests</div>
          <button className="bg-gray-200 rounded-full px-6 py-2 font-semibold">Manage</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg border">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-2 px-4 border">Request</th>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Region</th>
                <th className="py-2 px-4 border">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border">Request 1</td>
                <td className="py-2 px-4 border">1/1/2025</td>
                <td className="py-2 px-4 border">Region 1</td>
                <td className="py-2 px-4 border">Done</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border">Request 2</td>
                <td className="py-2 px-4 border">1/1/2025</td>
                <td className="py-2 px-4 border">Region 2</td>
                <td className="py-2 px-4 border">Done</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border">Request 3</td>
                <td className="py-2 px-4 border">1/1/2025</td>
                <td className="py-2 px-4 border">Region 3</td>
                <td className="py-2 px-4 border">Done</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}