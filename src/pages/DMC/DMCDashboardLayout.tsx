import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function DMCDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth data here if needed, e.g. localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-40
          w-80 max-w-full h-full
          bg-white shadow-xl text-gray-900 flex flex-col justify-between
          py-8 px-6
          rounded-none md:rounded-tr-3xl md:rounded-br-3xl border-b md:border-b-0 md:border-r border-gray-200 overflow-y-auto
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
        style={{ minHeight: "100vh" }}
      >
        <div>
          {/* App Name */}
          <div
            className="text-5xl font-extrabold text-left mb-8"
            style={{
              background: "linear-gradient(90deg, #2563eb 0%, #a21caf 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            HazardX
          </div>
          {/* Profile */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 mb-4 border-4 border-white shadow" />
            <div className="text-center text-base text-gray-700 mt-2">
              <div>
                Role:{" "}
                <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
                  DMC OFFICER
                </span>
              </div>
              <div className="text-sm text-gray-500">User ID: 12345</div>
              <div className="text-sm text-gray-700">Name: Jagath Kumara</div>
              <div className="text-sm text-gray-700">Division: Division A</div>
            </div>
          </div>
          <hr className="border-gray-200 my-6" />
          {/* Navigation */}
          <nav className="flex flex-col gap-3 items-start w-full">
            <NavLink
              to="/dmc-dashboard"
              end
              className={({ isActive }) =>
                `w-full text-left px-6 py-3 rounded-full transition font-semibold text-base shadow-sm ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : "bg-white text-black hover:bg-blue-100"
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/dmc-dashboard/alerts"
              className={({ isActive }) =>
                `w-full text-left px-6 py-3 rounded-full transition font-semibold text-base shadow-sm ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : "bg-white text-black hover:bg-blue-100"
                }`
              }
            >
              Alerts
            </NavLink>
            <NavLink
              to="/dmc-dashboard/reports"
              className={({ isActive }) =>
                `w-full text-left px-6 py-3 rounded-full transition font-semibold text-base shadow-sm ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : "bg-white text-black hover:bg-blue-100"
                }`
              }
            >
              Reports
            </NavLink>
            <NavLink
              to="/dmc-dashboard/aid-requests"
              className={({ isActive }) =>
                `w-full text-left px-6 py-3 rounded-full transition font-semibold text-base shadow-sm ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : "bg-white text-black hover:bg-blue-100"
                }`
              }
            >
              Aid Requests
            </NavLink>
            <NavLink
              to="/dmc-dashboard/volunteers"
              className={({ isActive }) =>
                `w-full text-left px-6 py-3 rounded-full transition font-semibold text-base shadow-sm ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : "bg-white text-black hover:bg-blue-100"
                }`
              }
            >
              Volunteers
            </NavLink>
            <NavLink
              to="/dmc-dashboard/settings"
              className={({ isActive }) =>
                `w-full text-left px-6 py-3 rounded-full transition font-semibold text-base shadow-sm ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : "bg-white text-black hover:bg-blue-100"
                }`
              }
            >
              System Settings
            </NavLink>
            <button
              className="w-full text-left py-3 px-6 bg-white hover:bg-blue-100 rounded-full transition font-semibold mt-2"
              onClick={handleLogout}
            >
              Log out
            </button>
          </nav>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        <Outlet />
      </main>
      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Hamburger for mobile */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-white rounded-full p-2 shadow"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="material-icons">menu</span>
      </button>
    </div>
  );
}