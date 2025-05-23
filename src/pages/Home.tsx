import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const aidRequests = [
  { id: 1, recipientName: "Saman Perera", type: "Dry rations", district: "Kaluthara", gnDivision: "Division A", gnOfficer: "Mr.Ruwan Senanayake", contactNo: "0769561473" },
  { id: 2, recipientName: "Nimal Silva", type: "Clothing", district: "Hattan", gnDivision: "Division B", gnOfficer: "Ms.Thharushi Raja", contactNo: "0729631474" },
  { id: 3, recipientName: "Kumari Jayasuriya", type: "Medical Supplies", district: "Anuradhapura", gnDivision: "Division C", gnOfficer: "Mr.Duleetha Amar", contactNo: "0756412379" },
  { id: 4, recipientName: "Ruwanthi Fernando", type: "Temporary Shelter", district: "Gampaha", gnDivision: "Division D", gnOfficer: "Ms.Malini Jayawe", contactNo: "0743697412" },
  { id: 5, recipientName: "Priyantha Rathnayake", type: "Drinking Water", district: "Kandy", gnDivision: "Division E", gnOfficer: "Ms.Pradeepa Rup", contactNo: "0772336974" },
  { id: 6, recipientName: "Harsha Ekanayake", type: "Baby Essentials", district: "Puttlam", gnDivision: "Division F", gnOfficer: "Mr.Nimal Perera", contactNo: "0764435794" },
];
const rowsPerPage = 6;

function StatCard({ icon, value, label, color, inView }: { icon: string, value: number, label: string, color: string, inView: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = value;
    if (start === end) return;
    const duration = 1200;
    const increment = Math.ceil(end / (duration / 16));
    let current = start;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);
  return (
    <div
      className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
      <div className="relative">
        <span className="text-4xl mb-4 block transform group-hover:scale-110 transition-transform duration-300">{icon}</span>
        <h3 className="text-3xl font-bold text-gray-900 mb-2">{count.toLocaleString()}</h3>
        <p className="text-gray-600">{label}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const [page, setPage] = useState(1);
  const paginatedRows = aidRequests.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const aboutRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsInView, setStatsInView] = useState(false);

  const handleLearnMore = () => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setStatsInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-20">
      {/* Hero Section with Modern Design */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 transform -skew-y-6"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-8 animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 leading-tight">
                Disaster Tracking & Management System
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed animate-fade-in-delay">
                Empowering communities with real-time alerts, rapid response, and coordinated aid distribution during emergencies.
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-in-delay-2">
                <button
                  className="px-8 py-4 bg-white text-blue-600 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-blue-600"
                  onClick={handleLearnMore}
                >
                  Learn More
                </button>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center animate-fade-in-delay-3">
              <div className="relative w-full max-w-lg">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-30"></div>
                <div className="relative bg-white p-2 rounded-2xl shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
                    alt="Disaster relief hero"
                    className="w-full h-72 object-cover rounded-2xl shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* System Description Section (scroll target) */}
      <section ref={aboutRef} className="max-w-4xl mx-auto mb-16 scroll-mt-28">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mt-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">About the HazardX System</h2>
          <p className="text-lg text-gray-700 mb-4">
            Our Disaster Management System is designed to help communities prepare for, respond to, and recover from disasters efficiently. The platform provides real-time alerts, enables rapid reporting of symptoms and aid requests, and connects people in need with resources and volunteers. With a focus on accessibility, reliability, and community support, our system empowers users to stay informed and take action during emergencies.
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Receive instant disaster alerts and updates for your area</li>
            <li>Report symptoms and request aid with easy-to-use forms</li>
            <li>Track approved aid requests and community support efforts</li>
            <li>Access resources and safety tips for disaster preparedness</li>
            <li>Connect with local volunteers and authorities</li>
          </ul>
        </div>
      </section>

      {/* Stats Section with Modern Cards */}
      <section className="py-20 bg-white" ref={statsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { label: 'Active Volunteers', value: 1200, icon: '👥', color: 'from-blue-500 to-blue-600' },
              { label: 'Alerts Sent', value: 3500, icon: '🔔', color: 'from-purple-500 to-purple-600' },
              { label: 'Aid Delivered', value: 2800, icon: '✅', color: 'from-green-500 to-green-600' },
            ].map((stat, idx) => (
              <StatCard key={stat.label} {...stat} inView={statsInView} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Modern Cards */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools and features to help communities prepare, respond, and recover from disasters
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Real-time Alerts',
                desc: 'Instant notifications about disasters and emergencies in your area',
                img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
              },
              {
                title: 'Aid Coordination',
                desc: 'Efficient distribution of resources and support to affected areas',
                img: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=400&q=80',
              },
              {
                title: 'Community Support',
                desc: 'Connect with volunteers and resources in your local community',
                img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
              },
            ].map((feature, idx) => (
              <div 
                key={feature.title}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <img
                  src={feature.img}
                  alt={feature.title}
                  className="w-full h-40 object-cover rounded-xl mb-6 shadow"
                />
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {/* Optionally keep the icon for extra visual, or remove if not needed */}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aid Requests Section with Modern Table */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Recent Aid Requests</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Track and manage aid requests from affected communities
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipient Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GN Division</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GN Officer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact No</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {aidRequests.map((req, idx) => (
                    <tr key={req.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{idx + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{req.recipientName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{req.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{req.district}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{req.gnDivision}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{req.gnOfficer}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{req.contactNo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    Previous
                  </button>
                  <button
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    disabled={page === 4}
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center">
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      disabled={page === 1}
                      onClick={() => setPage(page - 1)}
                    >
                      Previous
                    </button>
                    {[1, 2, 3, 4].map((num) => (
                      <button
                        key={num}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          page === num
                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                        onClick={() => setPage(num)}
                      >
                        {num}
                      </button>
                    ))}
                    <button
                      className="relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      disabled={page === 4}
                      onClick={() => setPage(page + 1)}
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with Modern Design */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">HazardX</h3>
              <p className="text-gray-600">Empowering communities through effective disaster management.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Services</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Documentation</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Terms of Service</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-500">© 2025 HazardX Team. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}