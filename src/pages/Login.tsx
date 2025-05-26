import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function Login() {
  const { setUser } = useUser();
  const [role, setRole] = useState("GN Officer");
  const [userId, setUserId] = useState(""); // <-- changed from username
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5262/api/Auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, password }), // Use userId as string
    });

    let data;
    try {
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        alert(errorData.message || "Login failed");
        return;
      }
      data = await response.json();
    } catch {
      alert("Server error: Invalid response from backend.");
      return;
    }

    if (data.success) {
      setUser({
        id: data.id,
        username: data.username,
        role: data.role,
        gndivision: data.gndivision,
        district: data.district,
        email: data.email,
      });

      if (data.role === "GN Officer") {
        navigate("/gn-dashboard");
      } else if (data.role === "DMC Officer") {
        navigate("/dmc-dashboard");
      } else if (data.role === "Volunteer") {
        navigate("/volunteer-dashboard");
      }
    } else {
      alert(data.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center pt-20">
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 w-full max-w-md">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Log In</h1>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-lg font-medium mb-2">Role</label>
            <div className="relative">
              <select
                value={role}
                onChange={e => setRole(e.target.value)}
                className="w-full bg-gray-100 rounded-lg h-12 px-4 pr-10 text-lg focus:outline-none border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition appearance-none"
                required
              >
                <option value="GN Officer">GN Officer</option>
                <option value="DMC Officer">DMC Officer</option>
                <option value="Volunteer">Volunteer</option>
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </div>
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">User ID</label>
            <input
              type="text"
              required
              value={userId}
              onChange={e => setUserId(e.target.value)}
              placeholder="Enter your user ID"
              className="w-full bg-gray-100 rounded-lg h-12 px-4 text-lg focus:outline-none border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-gray-100 rounded-lg h-12 px-4 text-lg focus:outline-none border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-xl px-10 py-3 text-xl font-bold shadow hover:bg-blue-700 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Log In
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-gray-600">Don't have an account?</span>
          <Link to="/signup" className="ml-2 text-blue-600 font-semibold hover:underline">Sign up as Volunteer</Link>
        </div>
      </div>
    </div>
  );
}