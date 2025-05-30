import React from "react";
import { useNavigate } from "react-router-dom";

export default function DMCDashboardHome() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-6xl mx-auto py-8">
      <div className="w-full max-w-5xl mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-100 rounded-2xl shadow p-8 mt-8">
        <h2 className="text-3xl font-extrabold mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Greetings <span className="text-blue-700">Mr.Jagath</span> !!
        </h2>
        <div className="text-center mb-6 text-blue-700 font-semibold">
          2025.05.30 | DMC {" "}
          
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Active Alerts */}
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl p-6 flex flex-col items-center justify-center min-h-[180px] shadow">
            <div className="text-lg font-semibold mb-2 text-blue-700">
              Active Alerts
            </div>
            <button
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full px-8 py-3 mt-4 font-semibold shadow hover:scale-105 transition-all text-lg"
              onClick={() => navigate("/dmc-dashboard/alerts")}
            >
              Manage
            </button>
          </div>
          {/* Active Volunteers */}
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl p-6 flex flex-col items-center justify-center min-h-[180px] shadow">
            <div className="text-lg font-semibold mb-2 text-blue-700">
              Active Volunteers
            </div>
            <button
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full px-8 py-3 mt-4 font-semibold shadow hover:scale-105 transition-all text-lg"
              onClick={() => navigate("/dmc-dashboard/volunteers")}
            >
              Manage
            </button>
          </div>
        </div>
        {/* Aid Requests & Reports in one row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Aid Requests */}
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl p-6 flex flex-col items-center justify-center min-h-[180px] shadow">
            <div className="text-lg font-semibold mb-2 text-blue-700">
              Aid Requests
            </div>
            <button
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full px-8 py-3 mt-4 font-semibold shadow hover:scale-105 transition-all text-lg"
              onClick={() => navigate("/dmc-dashboard/aid-requests")}
            >
              Manage
            </button>
          </div>
          {/* Reports */}
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl p-6 flex flex-col items-center justify-center min-h-[180px] shadow">
            <div className="text-lg font-semibold mb-2 text-blue-700">
              Reports
            </div>
            <button
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full px-8 py-3 mt-4 font-semibold shadow hover:scale-105 transition-all text-lg"
              onClick={() => navigate("/dmc-dashboard/reports")}
            >
              Manage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}