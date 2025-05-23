import React from "react";

const volunteers = [
  { name: "Name 1", contact: "07705236963", email: "name1@email.com", availability: "Available" },
  { name: "Name 2", contact: "07705236963", email: "name2@email.com", availability: "unavailable" },
  { name: "Name 3", contact: "07705236963", email: "edy@gmail.com", availability: "available" },
];

export default function Volunteers() {
  return (
    <div className="w-full max-w-3xl mx-auto bg-gray-100 rounded-2xl shadow p-8 mt-8">
      <h2 className="text-2xl font-bold text-center mb-6">Volunteers in my Division</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg border">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
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