import React, { useState } from "react";

const volunteers = [
  {
    name: "Nimal Perera",
    contact: "0771234567",
    district: "Colombo",
    gnDivision: "Nugegoda",
    skills: "First Aid, Rescue",
    status: "Active",
  },
  {
    name: "Kumari Jayasuriya",
    contact: "0779876543",
    district: "Kandy",
    gnDivision: "Peradeniya",
    skills: "Logistics, Cooking",
    status: "Inactive",
  },
  {
    name: "Sunil Fernando",
    contact: "0712345678",
    district: "Gampaha",
    gnDivision: "Ragama",
    skills: "Medical, Driving",
    status: "Active",
  },
];

export default function DMCVolunteers() {
  const [selected, setSelected] = useState<null | typeof volunteers[0]>(null);

  return (
    <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-100 rounded-2xl shadow p-8 mt-8">
      <h2 className="text-2xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
        Volunteers
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg border">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Contact</th>
              <th className="py-2 px-4 border">District</th>
              <th className="py-2 px-4 border">GN Division</th>
              <th className="py-2 px-4 border">Skills</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Details</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map((v, idx) => (
              <tr key={idx} className="border-b last:border-b-0">
                <td className="py-2 px-4 border font-semibold text-blue-700">
                  {v.name}
                </td>
                <td className="py-2 px-4 border">{v.contact}</td>
                <td className="py-2 px-4 border">{v.district}</td>
                <td className="py-2 px-4 border">{v.gnDivision}</td>
                <td className="py-2 px-4 border">{v.skills}</td>
                <td
                  className={`py-2 px-4 border font-bold ${
                    v.status === "Active"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {v.status}
                </td>
                <td className="py-2 px-4 border">
                  <button
                    className="underline text-blue-600"
                    onClick={() => setSelected(v)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Volunteer Details */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-gradient-to-br from-blue-50 via-white to-purple-100 rounded-2xl shadow-xl p-8 max-w-md w-full relative overflow-y-auto max-h-[90vh]">
            <div className="bg-white border border-blue-300 rounded-xl p-6 shadow flex flex-col gap-2">
              <div className="font-bold text-blue-700 text-lg mb-2">
                {selected.name}
              </div>
              <div>
                <span className="font-semibold text-blue-700">Contact:</span>{" "}
                {selected.contact}
              </div>
              <div>
                <span className="font-semibold text-blue-700">District:</span>{" "}
                {selected.district}
              </div>
              <div>
                <span className="font-semibold text-blue-700">GN Division:</span>{" "}
                {selected.gnDivision}
              </div>
              <div>
                <span className="font-semibold text-blue-700">Skills:</span>{" "}
                {selected.skills}
              </div>
              <div>
                <span className="font-semibold text-blue-700">Status:</span>{" "}
                <span
                  className={
                    selected.status === "Active"
                      ? "text-green-600 font-bold"
                      : "text-red-600 font-bold"
                  }
                >
                  {selected.status}
                </span>
              </div>
              <div className="flex gap-4 mt-4 justify-end">
                <button
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full px-6 py-2 font-semibold"
                  onClick={() => setSelected(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}