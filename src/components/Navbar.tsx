import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/alerts", label: "Alerts" },
    { to: "/submit-symptoms", label: "Submit Symptoms" },
    { to: "/request-aid", label: "Request Aid" },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-lg transition-all duration-200 font-medium flex items-center justify-center
    ${isActive 
      ? "text-white bg-blue-600 shadow-md" 
      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"}`;

  return (
    <nav className="backdrop-blur-md bg-white/90 shadow-lg fixed w-full top-0 left-0 z-30 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center h-12 select-none">
            <span className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg animate-fade-in">
              Hazard<span className="text-pink-500">X</span>
            </span>
          </Link>

          {/* Hamburger for mobile */}
          <button
            className="sm:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <div className="flex space-x-2">
              {navLinks.map(link => (
                <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === "/"}>
                  {link.label}
                </NavLink>
              ))}
            </div>
            <div className="ml-4 flex items-center space-x-3">
              <Link to="/login" className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium">
                Log in
              </Link>
              <Link to="/signup" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg">
                Sign up as Volunteer
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 w-full h-full bg-white z-50 flex flex-col sm:hidden shadow-lg">
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <Link to="/" className="flex items-center h-12 select-none">
              <span className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
                Hazard<span className="text-pink-500">X</span>
              </span>
            </Link>
            <button
              className="p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 p-4 flex flex-col">
            <div className="space-y-2">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? "bg-blue-600 text-white" 
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }`
                  }
                  end={link.to === "/"}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
            <div className="mt-6 space-y-3">
              <Link to="/login" className="w-full block px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium text-center">
                Log in
              </Link>
              <Link to="/signup" className="w-full block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium shadow-md text-center">
                Sign up as Volunteer
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 