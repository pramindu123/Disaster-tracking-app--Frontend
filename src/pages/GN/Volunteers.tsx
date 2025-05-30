import React from "react";

const volunteers = [
  { name: "Kalum silva", contact: "07705236963", email: "name1@email.com", availability: "Available" },
  { name: "Theekshana nadun", contact: "07705236963", email: "name2@email.com", availability: "unavailable" },
  { name: "Charith Soysa", contact: "07705236963", email: "edy@gmail.com", availability: "available" },
];

export default function Volunteers() {
  return (
    <div className="w-full max-w-5xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow p-8 mt-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
        Volunteers
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow border border-gray-200">
          <thead>
            <tr className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700">
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Contact No</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Availability</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map((v, idx) => (
              <tr key={idx} className="border-b last:border-b-0">
                <td className="py-2 px-4 border">{v.name}</td>
                <td className="py-2 px-4 border">{v.contact}</td>
                <td className="py-2 px-4 border">{v.email}</td>
                <td className="py-2 px-4 border">{v.availability}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}