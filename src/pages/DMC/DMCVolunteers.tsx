import React from "react";

const volunteers = [
  {
    name: "Name 1",
    gnDivision: "Region 1",
    contact: "07705236963",
    email: "edy@gmail.com",
    availability: "Available",
  },
  {
    name: "Name 2",
    gnDivision: "Region 1",
    contact: "07705236963",
    email: "edy@gmail.com",
    availability: "unavailable",
  },
  {
    name: "Name 3",
    gnDivision: "Region 1",
    contact: "07705236963",
    email: "edy@gmail.com",
    availability: "available",
  },
];

export default function DMCVolunteers() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-100 rounded-2xl shadow p-8 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Volunteers</h2>
        <button className="bg-gray-200 rounded-full px-4 py-1 flex items-center gap-2">
          <span className="material-icons text-base">filter_list</span>
          Filter
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg border">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">GN Division</th>
              <th className="py-2 px-4 border">Contact No</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Availability</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map((vol, idx) => (
              <tr key={idx} className="border-b last:border-b-0">
                <td className="py-2 px-4 border">{vol.name}</td>
                <td className="py-2 px-4 border">{vol.gnDivision}</td>
                <td className="py-2 px-4 border">{vol.contact}</td>
                <td className="py-2 px-4 border">{vol.email}</td>
                <td className="py-2 px-4 border">{vol.availability}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}