import React, { useState } from "react";

const disasterTypes = ["Flood", "Landslide"];
const locations = ["Colombo", "Nuwara"];
const dates = ["01/10/2024", "21/06/2024"];
const disasters = [
  { 
    id: 1,
    type: "Flood", 
    location: "Colombo", 
    severity: "High", 
    date: "01/10/2024", 
    time: "12:30pm", 
    status: "Ongoing",
    coordinates: { lat: 6.9271, lng: 79.8612 },
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. SLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.uspendisse varius enim in eros elementum tristique.",
    safetyTips: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. SLorem ipsum dolor sit amet,",
    whoIssued: "Lorem ipsum dolor sit amet, consectetur",
    comments: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  { 
    id: 2,
    type: "Landslide", 
    location: "Nuwara", 
    severity: "Medium", 
    date: "21/06/2024", 
    time: "2:15pm", 
    status: "Resolved",
    coordinates: { lat: 6.9707, lng: 80.7829 },
    description: "Minor landslide on main road, traffic diverted",
    safetyTips: "Stay away from slopes.",
    whoIssued: "Disaster Management Center",
    comments: "No casualties reported."
  },
  { 
    id: 3,
    type: "Flood", 
    location: "Colombo", 
    severity: "Low", 
    date: "01/10/2024", 
    time: "3:45pm", 
    status: "Ongoing",
    coordinates: { lat: 6.9271, lng: 79.8612 },
    description: "Localized flooding in residential area",
    safetyTips: "Avoid driving through water.",
    whoIssued: "Local Authority",
    comments: "Clean-up in progress."
  },
  { 
    id: 4,
    type: "Landslide", 
    location: "Nuwara", 
    severity: "High", 
    date: "21/06/2024", 
    time: "5:30pm", 
    status: "Ongoing",
    coordinates: { lat: 6.9707, lng: 80.7829 },
    description: "Major landslide blocking access to several villages",
    safetyTips: "Evacuate immediately if advised.",
    whoIssued: "Disaster Management Center",
    comments: "Rescue operations ongoing."
  },
];

export default function Alerts() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [selectedDisaster, setSelectedDisaster] = useState<typeof disasters[0] | null>(null);

  const resetFilters = () => {
    setSelectedType(null);
    setSelectedLocation(null);
    setSelectedDate(null);
  };

  const filteredDisasters = disasters.filter(disaster => {
    if (selectedType && disaster.type !== selectedType) return false;
    if (selectedLocation && disaster.location !== selectedLocation) return false;
    if (selectedDate && disaster.date !== selectedDate) return false;
    return true;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-400';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  // For mock map marker positions
  const getMarkerPosition = (idx: number, total: number) => {
    // Spread markers in a grid for demo
    const cols = 2;
    const row = Math.floor(idx / cols);
    const col = idx % cols;
    return {
      left: `${20 + col * 40}%`,
      top: `${20 + row * 40}%`
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 px-4 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-2">Disaster Alerts</h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6">View real-time alerts and filter by type, location, or date.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 mb-10">
          {/* Filter Icon Button */}
          <button 
            className="mb-4 flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            onClick={() => setShowFilters(!showFilters)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </button>
          {/* Filters Section */}
          {showFilters && (
            <div className="mb-6 bg-blue-50 rounded-xl p-4">
              <span className="font-semibold">Filter by:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {/* Disaster Type Dropdown */}
                <div className="relative">
                  <button 
                    className="border px-4 py-2 rounded-lg w-40 flex items-center justify-between bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => {
                      setShowTypeDropdown(!showTypeDropdown);
                      setShowLocationDropdown(false);
                      setShowDateDropdown(false);
                    }}
                  >
                    {selectedType || "Disaster Type"}
                    <span className="ml-2">▼</span>
                  </button>
                  {showTypeDropdown && (
                    <div className="absolute left-0 mt-1 w-40 bg-white border rounded shadow z-10">
                      {disasterTypes.map((type) => (
                        <div 
                          key={type} 
                          className="px-4 py-2 hover:bg-blue-100 cursor-pointer" 
                          onClick={() => {
                            setSelectedType(type);
                            setShowTypeDropdown(false);
                          }}
                        >
                          {type}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* Location Dropdown */}
                <div className="relative">
                  <button 
                    className="border px-4 py-2 rounded-lg w-40 flex items-center justify-between bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => {
                      setShowLocationDropdown(!showLocationDropdown);
                      setShowTypeDropdown(false);
                      setShowDateDropdown(false);
                    }}
                  >
                    {selectedLocation || "Location"}
                    <span className="ml-2">▼</span>
                  </button>
                  {showLocationDropdown && (
                    <div className="absolute left-0 mt-1 w-40 bg-white border rounded shadow z-10">
                      {locations.map((loc) => (
                        <div 
                          key={loc} 
                          className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                          onClick={() => {
                            setSelectedLocation(loc);
                            setShowLocationDropdown(false);
                          }}
                        >
                          {loc}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* Date Dropdown */}
                <div className="relative">
                  <button 
                    className="border px-4 py-2 rounded-lg w-40 flex items-center justify-between bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => {
                      setShowDateDropdown(!showDateDropdown);
                      setShowTypeDropdown(false);
                      setShowLocationDropdown(false);
                    }}
                  >
                    {selectedDate || "Date"}
                    <span className="ml-2">📅</span>
                  </button>
                  {showDateDropdown && (
                    <div className="absolute left-0 mt-1 w-40 bg-white border rounded shadow z-10">
                      {dates.map((d) => (
                        <div 
                          key={d} 
                          className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                          onClick={() => {
                            setSelectedDate(d);
                            setShowDateDropdown(false);
                          }}
                        >
                          {d}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button 
                  className="border px-4 py-2 rounded-lg bg-gray-100 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  onClick={resetFilters}
                >
                  Reset
                </button>
              </div>
            </div>
          )}
          {/* Table and Map Section */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Table */}
            <div className="flex-1">
              <div className="overflow-x-auto rounded-xl border">
                <table className="min-w-full text-left text-base">
                  <thead className="bg-blue-50">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-blue-900">Alert Type</th>
                      <th className="px-4 py-3 font-semibold text-blue-900">Location</th>
                      <th className="px-4 py-3 font-semibold text-blue-900">Severity</th>
                      <th className="px-4 py-3 font-semibold text-blue-900">Date</th>
                      <th className="px-4 py-3 font-semibold text-blue-900">Time</th>
                      <th className="px-4 py-3 font-semibold text-blue-900">Status</th>
                      <th className="px-4 py-3 font-semibold text-blue-900">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDisasters.map((disaster) => (
                      <tr 
                        key={disaster.id} 
                        className="border-t hover:bg-blue-50 transition-colors duration-200 cursor-pointer"
                        onClick={() => setSelectedDisaster(disaster)}
                      >
                        <td className="px-4 py-3">{disaster.type}</td>
                        <td className="px-4 py-3">{disaster.location}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-block w-3 h-3 rounded-full ${getSeverityColor(disaster.severity)} mr-2`}></span>
                          {disaster.severity}
                        </td>
                        <td className="px-4 py-3">{disaster.date}</td>
                        <td className="px-4 py-3">{disaster.time}</td>
                        <td className="px-4 py-3">{disaster.status}</td>
                        <td className="px-4 py-3 text-blue-600 underline" onClick={e => { e.stopPropagation(); setSelectedDisaster(disaster); }}>View Details</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Map Section (Mock) */}
            <div className="w-full md:w-1/2">
              <div className="w-full h-80 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-2xl mb-4 flex items-center justify-center relative overflow-hidden shadow-lg">
                {/* Mock Map Markers */}
                {filteredDisasters.map((disaster, idx) => {
                  const pos = getMarkerPosition(idx, filteredDisasters.length);
                  return (
                    <button
                      key={disaster.id}
                      className={`absolute w-6 h-6 rounded-full border-2 border-white shadow-lg ${getSeverityColor(disaster.severity)} hover:scale-125 transition-transform`}
                      style={{ left: pos.left, top: pos.top }}
                      onClick={() => setSelectedDisaster(disaster)}
                      title={disaster.type}
                    />
                  );
                })}
              </div>
              {/* Legend */}
              <div className="w-full flex flex-col items-end">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
                  <span>High</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block"></span>
                  <span>Medium</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
                  <span>Low</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Alert Details Modal */}
        {selectedDisaster && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={() => setSelectedDisaster(null)}></div>
            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white rounded-[2.5rem] border border-gray-400 shadow-xl max-w-2xl w-full p-10 relative flex flex-col" style={{minHeight: '500px'}}>
                <button className="absolute top-6 right-8 text-2xl text-gray-400 hover:text-gray-600" onClick={() => setSelectedDisaster(null)}>&times;</button>
                <h2 className="text-3xl font-bold underline mb-6">Alert Details</h2>
                <div className="mb-4 flex">
                  <span className="font-bold text-lg min-w-[140px]">Description:</span>
                  <span className="ml-4 text-base">{selectedDisaster.description}</span>
                </div>
                <div className="mb-4 flex">
                  <span className="font-bold text-lg min-w-[140px]">Safety Tips:</span>
                  <span className="ml-4 text-base">{selectedDisaster.safetyTips}</span>
                </div>
                <div className="mb-4 flex">
                  <span className="font-bold text-lg min-w-[140px]">Who issued:</span>
                  <span className="ml-4 text-base">{selectedDisaster.whoIssued}</span>
                </div>
                <div className="mb-2 flex items-start">
                  <span className="font-bold text-lg min-w-[140px]">Comments:</span>
                  <span className="ml-4 text-base">
                    <div className="w-80 h-24 bg-gray-300 rounded mt-1"></div>
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 