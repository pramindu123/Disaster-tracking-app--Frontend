import React, { useState } from "react";
import districtGnDivisions from "../data/districtGnDivisions";

const disasterTypes = ["Flood", "Landslide", "Cyclone", "Drought", "Fire"];
const severityTypes = ["High", "Medium", "Low"];
const statusTypes = ["Ongoing", "Resolved"];

export default function Alerts() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedGnDivision, setSelectedGnDivision] = useState<string | null>(null);
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const districts = Object.keys(districtGnDivisions);
  const gnDivisions = selectedDistrict ? districtGnDivisions[selectedDistrict] : [];

  // At least 10 sample disasters
  const disasters = [
    {
      id: 1,
      type: "Flood",
      district: "Colombo",
      gnDivision: "Nugegoda",
      severity: "High",
      status: "Ongoing",
      date: "2025-05-28",
      time: "10:00",
    },
    {
      id: 2,
      type: "Landslide",
      district: "Kandy",
      gnDivision: "Peradeniya",
      severity: "Medium",
      status: "Resolved",
      date: "2025-05-27",
      time: "14:30",
    },
    {
      id: 3,
      type: "Cyclone",
      district: "Gampaha",
      gnDivision: "Ragama",
      severity: "High",
      status: "Ongoing",
      date: "2025-05-26",
      time: "09:15",
    },
    {
      id: 4,
      type: "Drought",
      district: "Kurunegala",
      gnDivision: "Kurunegala Town",
      severity: "Low",
      status: "Ongoing",
      date: "2025-05-25",
      time: "12:00",
    },
    {
      id: 5,
      type: "Fire",
      district: "Matara",
      gnDivision: "Weligama Town",
      severity: "Medium",
      status: "Resolved",
      date: "2025-05-24",
      time: "16:45",
    },
    {
      id: 6,
      type: "Flood",
      district: "Puttalam",
      gnDivision: "Chilaw Town",
      severity: "High",
      status: "Ongoing",
      date: "2025-05-23",
      time: "08:30",
    },
    {
      id: 7,
      type: "Landslide",
      district: "Badulla",
      gnDivision: "Bandarawela",
      severity: "Medium",
      status: "Ongoing",
      date: "2025-05-22",
      time: "11:20",
    },
    {
      id: 8,
      type: "Cyclone",
      district: "Trincomalee",
      gnDivision: "Kinniya",
      severity: "High",
      status: "Resolved",
      date: "2025-05-21",
      time: "13:10",
    },
    {
      id: 9,
      type: "Fire",
      district: "Jaffna",
      gnDivision: "Nallur",
      severity: "Low",
      status: "Ongoing",
      date: "2025-05-20",
      time: "15:00",
    },
    {
      id: 10,
      type: "Drought",
      district: "Hambantota",
      gnDivision: "Tangalle Town",
      severity: "Medium",
      status: "Resolved",
      date: "2025-05-19",
      time: "17:30",
    },
    {
      id: 11,
      type: "Flood",
      district: "Kalutara",
      gnDivision: "Panadura North",
      severity: "High",
      status: "Ongoing",
      date: "2025-05-18",
      time: "10:30",
    },
    {
      id: 12,
      type: "Landslide",
      district: "Kegalle",
      gnDivision: "Mawanella",
      severity: "Low",
      status: "Resolved",
      date: "2025-05-17",
      time: "09:00",
    },
  ];

  // Filtering logic
  const filteredDisasters = disasters.filter(d =>
    (!selectedType || d.type === selectedType) &&
    (!selectedDistrict || d.district === selectedDistrict) &&
    (!selectedGnDivision || d.gnDivision === selectedGnDivision) &&
    (!selectedSeverity || d.severity === selectedSeverity) &&
    (!selectedStatus || d.status === selectedStatus)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 px-4 md:px-12 font-sans">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12 mt-8">
        {/* Filters */}
        <div className="mb-6 bg-blue-50 rounded-xl p-4 flex flex-wrap items-center gap-4">
          <span className="font-semibold text-gray-700">Filter by:</span>
          <select
            className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none"
            value={selectedType || ""}
            onChange={e => setSelectedType(e.target.value || null)}
          >
            <option value="">Disaster Type</option>
            {disasterTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <select
            className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none"
            value={selectedDistrict || ""}
            onChange={e => {
              setSelectedDistrict(e.target.value || null);
              setSelectedGnDivision(null);
            }}
          >
            <option value="">District</option>
            {districts.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <select
            className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none"
            value={selectedGnDivision || ""}
            onChange={e => setSelectedGnDivision(e.target.value || null)}
            disabled={!selectedDistrict}
          >
            <option value="">GN Division</option>
            {gnDivisions.map(gnd => (
              <option key={gnd} value={gnd}>{gnd}</option>
            ))}
          </select>
          <select
            className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none"
            value={selectedSeverity || ""}
            onChange={e => setSelectedSeverity(e.target.value || null)}
          >
            <option value="">Severity</option>
            {severityTypes.map(sev => (
              <option key={sev} value={sev}>{sev}</option>
            ))}
          </select>
          <select
            className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none"
            value={selectedStatus || ""}
            onChange={e => setSelectedStatus(e.target.value || null)}
          >
            <option value="">Status</option>
            {statusTypes.map(stat => (
              <option key={stat} value={stat}>{stat}</option>
            ))}
          </select>
        </div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 rounded-xl overflow-hidden shadow">
            <thead className="bg-gradient-to-r from-blue-600 to-purple-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">#</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">District</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">GN Division</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Severity</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredDisasters.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-400">
                    No alerts found for selected filters.
                  </td>
                </tr>
              )}
              {filteredDisasters.map((disaster, idx) => (
                <tr key={disaster.id}>
                  <td className="px-6 py-4">{idx + 1}</td>
                  <td className="px-6 py-4 font-semibold text-blue-700">{disaster.type}</td>
                  <td className="px-6 py-4">{disaster.district}</td>
                  <td className="px-6 py-4">{disaster.gnDivision}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        disaster.severity === "High"
                          ? "bg-red-500 text-white"
                          : disaster.severity === "Medium"
                          ? "bg-yellow-400 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {disaster.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        disaster.status === "Ongoing"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {disaster.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{disaster.date}</td>
                  <td className="px-6 py-4">{disaster.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}