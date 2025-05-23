import React, { useState } from "react";

// Updated disaster data with district and gnDivision
const disasters = [
  { 
    id: 1,
    type: "Flood", 
    district: "Colombo",
    gnDivision: "Colombo North",
    severity: "High", 
    date: "01/10/2024", 
    time: "12:30pm", 
    status: "Ongoing",
    coordinates: { lat: 6.9271, lng: 79.8612 },
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    safetyTips: "Stay indoors and avoid flooded areas.",
    whoIssued: "Disaster Management Center",
    comments: "Evacuation in progress."
  },
  { 
    id: 2,
    type: "Landslide", 
    district: "Nuwara Eliya",
    gnDivision: "Nuwara South",
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
    district: "Colombo",
    gnDivision: "Colombo South",
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
    district: "Nuwara Eliya",
    gnDivision: "Nuwara North",
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

// For filter dropdowns
const disasterTypes = Array.from(new Set(disasters.map(d => d.type)));
const districts = Array.from(new Set(disasters.map(d => d.district)));
const gnDivisions = Array.from(new Set(disasters.map(d => d.gnDivision)));
const dates = Array.from(new Set(disasters.map(d => d.date)));
const severities = Array.from(new Set(disasters.map(d => d.severity)));

export default function Alerts() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedGnDivision, setSelectedGnDivision] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);
  const [showGnDivisionDropdown, setShowGnDivisionDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showSeverityDropdown, setShowSeverityDropdown] = useState(false);
  const [selectedDisaster, setSelectedDisaster] = useState<typeof disasters[0] | null>(null);

  const resetFilters = () => {
    setSelectedType(null);
    setSelectedDistrict(null);
    setSelectedGnDivision(null);
    setSelectedDate(null);
    setSelectedSeverity(null);
  };

  const filteredDisasters = disasters.filter(disaster => {
    if (selectedType && disaster.type !== selectedType) return false;
    if (selectedDistrict && disaster.district !== selectedDistrict) return false;
    if (selectedGnDivision && disaster.gnDivision !== selectedGnDivision) return false;
    if (selectedDate && disaster.date !== selectedDate) return false;
    if (selectedSeverity && disaster.severity !== selectedSeverity) return false;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 px-4 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-2">Disaster Alerts</h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6">View real-time alerts and filter by type, district, GN division, or date.</p>
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
                      setShowDistrictDropdown(false);
                      setShowGnDivisionDropdown(false);
                      setShowDateDropdown(false);
                      setShowSeverityDropdown(false);
                    }}
                  >
                    {selectedType || "Disaster Type"}
                    <span className="ml-2">▼</span>
                  </button>
                  {showTypeDropdown && (
                    <div className="absolute left-0 mt-1 w-40 bg-white border rounded shadow z-10">
                      <div 
                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                        onClick={() => {
                          setSelectedType(null);
                          setShowTypeDropdown(false);
                        }}
                      >
                        All
                      </div>
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
                {/* District Dropdown */}
                <div className="relative">
                  <button 
                    className="border px-4 py-2 rounded-lg w-40 flex items-center justify-between bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => {
                      setShowDistrictDropdown(!showDistrictDropdown);
                      setShowTypeDropdown(false);
                      setShowGnDivisionDropdown(false);
                      setShowDateDropdown(false);
                      setShowSeverityDropdown(false);
                    }}
                  >
                    {selectedDistrict || "District"}
                    <span className="ml-2">▼</span>
                  </button>
                  {showDistrictDropdown && (
                    <div className="absolute left-0 mt-1 w-40 bg-white border rounded shadow z-10">
                      <div 
                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                        onClick={() => {
                          setSelectedDistrict(null);
                          setShowDistrictDropdown(false);
                        }}
                      >
                        All
                      </div>
                      {districts.map((district) => (
                        <div 
                          key={district} 
                          className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                          onClick={() => {
                            setSelectedDistrict(district);
                            setShowDistrictDropdown(false);
                          }}
                        >
                          {district}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* GN Division Dropdown */}
                <div className="relative">
                  <button 
                    className="border px-4 py-2 rounded-lg w-40 flex items-center justify-between bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => {
                      setShowGnDivisionDropdown(!showGnDivisionDropdown);
                      setShowTypeDropdown(false);
                      setShowDistrictDropdown(false);
                      setShowDateDropdown(false);
                      setShowSeverityDropdown(false);
                    }}
                  >
                    {selectedGnDivision || "GN Division"}
                    <span className="ml-2">▼</span>
                  </button>
                  {showGnDivisionDropdown && (
                    <div className="absolute left-0 mt-1 w-40 bg-white border rounded shadow z-10">
                      <div 
                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                        onClick={() => {
                          setSelectedGnDivision(null);
                          setShowGnDivisionDropdown(false);
                        }}
                      >
                        All
                      </div>
                      {gnDivisions.map((gn) => (
                        <div 
                          key={gn} 
                          className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                          onClick={() => {
                            setSelectedGnDivision(gn);
                            setShowGnDivisionDropdown(false);
                          }}
                        >
                          {gn}
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
                      setShowDistrictDropdown(false);
                      setShowGnDivisionDropdown(false);
                      setShowSeverityDropdown(false);
                    }}
                  >
                    {selectedDate || "Date"}
                    <span className="ml-2">📅</span>
                  </button>
                  {showDateDropdown && (
                    <div className="absolute left-0 mt-1 w-40 bg-white border rounded shadow z-10">
                      <div 
                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                        onClick={() => {
                          setSelectedDate(null);
                          setShowDateDropdown(false);
                        }}
                      >
                        All
                      </div>
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
                {/* Severity Dropdown */}
                <div className="relative">
                  <button 
                    className="border px-4 py-2 rounded-lg w-40 flex items-center justify-between bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => {
                      setShowSeverityDropdown(!showSeverityDropdown);
                      setShowTypeDropdown(false);
                      setShowDistrictDropdown(false);
                      setShowGnDivisionDropdown(false);
                      setShowDateDropdown(false);
                    }}
                  >
                    {selectedSeverity || "Severity"}
                    <span className="ml-2">▼</span>
                  </button>
                  {showSeverityDropdown && (
                    <div className="absolute left-0 mt-1 w-40 bg-white border rounded shadow z-10">
                      <div 
                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                        onClick={() => {
                          setSelectedSeverity(null);
                          setShowSeverityDropdown(false);
                        }}
                      >
                        All
                      </div>
                      {severities.map((sev) => (
                        <div 
                          key={sev} 
                          className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                          onClick={() => {
                            setSelectedSeverity(sev);
                            setShowSeverityDropdown(false);
                          }}
                        >
                          {sev}
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
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alert</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GN Division</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredDisasters.map((disaster, idx) => (
                      <tr key={disaster.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{idx + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{disaster.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{disaster.district}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{disaster.gnDivision}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{disaster.severity}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{disaster.status}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{disaster.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{disaster.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Map Section */}
            <div className="w-full md:w-1/2 flex items-center justify-center">
              {/* Replace this with your early map or a placeholder image */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/1a/Sri_Lanka_location_map.svg"
                alt="Sri Lanka Map"
                style={{ width: "100%", height: "320px", objectFit: "cover", borderRadius: "1rem" }}
              />
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
                  <span className="font-bold text-lg min-w-[140px]">Type:</span>
                  <span className="ml-4 text-base">{selectedDisaster.type}</span>
                </div>
                <div className="mb-4 flex">
                  <span className="font-bold text-lg min-w-[140px]">District:</span>
                  <span className="ml-4 text-base">{selectedDisaster.district}</span>
                </div>
                <div className="mb-4 flex">
                  <span className="font-bold text-lg min-w-[140px]">GN Division:</span>
                  <span className="ml-4 text-base">{selectedDisaster.gnDivision}</span>
                </div>
                <div className="mb-4 flex">
                  <span className="font-bold text-lg min-w-[140px]">Date:</span>
                  <span className="ml-4 text-base">{selectedDisaster.date}</span>
                </div>
                <div className="mb-4 flex">
                  <span className="font-bold text-lg min-w-[140px]">Time:</span>
                  <span className="ml-4 text-base">{selectedDisaster.time}</span>
                </div>
                <div className="mb-4 flex">
                  <span className="font-bold text-lg min-w-[140px]">Severity:</span>
                  <span className="ml-4 text-base">{selectedDisaster.severity}</span>
                </div>
                <div className="mb-4 flex">
                  <span className="font-bold text-lg min-w-[140px]">Status:</span>
                  <span className="ml-4 text-base">{selectedDisaster.status}</span>
                </div>
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
                  <span className="ml-4 text-base">{selectedDisaster.comments}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}