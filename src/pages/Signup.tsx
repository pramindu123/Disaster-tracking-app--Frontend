import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [district, setDistrict] = useState("");
  const [gnDivision, setGnDivision] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center pt-20">
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 w-full max-w-md">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Sign Up as Volunteer</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-lg font-medium mb-2">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full bg-gray-100 rounded-lg h-12 px-4 text-lg focus:outline-none border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">District</label>
            <input
              type="text"
              required
              value={district}
              onChange={e => setDistrict(e.target.value)}
              placeholder="Enter your district"
              className="w-full bg-gray-100 rounded-lg h-12 px-4 text-lg focus:outline-none border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Grama Niladhari Division</label>
            <input
              type="text"
              required
              value={gnDivision}
              onChange={e => setGnDivision(e.target.value)}
              placeholder="Enter your GN Division"
              className="w-full bg-gray-100 rounded-lg h-12 px-4 text-lg focus:outline-none border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Contact Number</label>
            <input
              type="text"
              required
              value={contactNumber}
              onChange={e => setContactNumber(e.target.value)}
              placeholder="Enter your contact number"
              className="w-full bg-gray-100 rounded-lg h-12 px-4 text-lg focus:outline-none border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
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
          <div>
            <label className="block text-lg font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full bg-gray-100 rounded-lg h-12 px-4 text-lg focus:outline-none border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-xl px-10 py-3 text-xl font-bold shadow hover:bg-blue-700 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Sign Up as Volunteer
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-gray-600">Already have an account?</span>
          <Link to="/login" className="ml-2 text-blue-600 font-semibold hover:underline">Log In</Link>
        </div>
      </div>
    </div>
  );
}