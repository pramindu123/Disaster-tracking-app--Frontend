import React, { useState } from "react";

const dummyRequests = [
  {
    name: "A. M. Jagath Perera",
    type: "Food",
    location: "Mahawa",
    contact: "071-6573420",
    description: "Family affected by recent flooding, needs immediate food supplies for 5 family members.",
    date: "2025-05-30",
    familySize: 5,
  },
  {
    name: "W. M. C. Kumara",
    type: "Medical",
    location: "Anuradhapura East",
    contact: "076-6784900",
    description: "Elderly person with medical conditions requiring immediate medicine supplies",
    date: "2025-06-01",
    familySize: 1,
  },
];

export default function ApproveAidRequests() {
  const [requests] = useState(dummyRequests);
  const [selected, setSelected] = useState<null | typeof dummyRequests[0]>(null);

  const handleApprove = (idx: number) => {
    alert(`Approved: ${requests[idx].name}`);
  };

  const handleReject = (idx: number) => {
    alert(`Rejected: ${requests[idx].name}`);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-gray-100 rounded-2xl shadow p-8 mt-8">
      <h2 className="text-2xl font-bold text-center mb-2">Approve Aid Requests</h2>
      <p className="mb-4 text-gray-700 text-center">Review and approve pending aid requests</p>
      <div className="flex flex-col gap-6">
        {requests.map((req, idx) => (
          <div key={idx} className="bg-white border border-black rounded-xl p-6 shadow flex flex-col gap-2">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <span className="font-semibold">{req.name}</span>
                <span className="font-normal"> - {req.type}</span>
              </div>
              <div className="text-sm text-gray-600">
                Date requested : {req.date}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <div>
                <span className="font-semibold">Division :</span> {req.location}
              </div>
              <div>
                <span className="font-semibold">Contact No :</span> {req.contact}
              </div>
              <div>
                <span className="font-semibold">Family Size :</span> {req.familySize}
              </div>
            </div>
            <div>
              <span className="font-semibold">Description :</span> {req.description}
            </div>
            <div className="flex gap-4 mt-2">
              <button
                className="border border-black rounded px-6 py-2 font-semibold"
                onClick={() => handleApprove(idx)}
              >
                Approve
              </button>
              <button
                className="border border-black rounded px-6 py-2 font-semibold"
                onClick={() => handleReject(idx)}
              >
                Reject
              </button>
              <button
                className="underline text-blue-600 ml-auto"
                onClick={() => setSelected(req)}
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Detailed Aid Request */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full relative overflow-y-auto max-h-[90vh]">
            <h3 className="text-2xl font-bold mb-4 text-center">Aid Request Details</h3>
            <div className="mb-2"><b>Name:</b> {selected.name}</div>
            <div className="mb-2"><b>Type:</b> {selected.type}</div>
            <div className="mb-2"><b>Division:</b> {selected.location}</div>
            <div className="mb-2"><b>Contact No:</b> {selected.contact}</div>
            <div className="mb-2"><b>Date requested:</b> {selected.date}</div>
            <div className="mb-2"><b>Family Size:</b> {selected.familySize}</div>
            <div className="mb-4"><b>Description:</b> {selected.description}</div>
            <div className="flex gap-4 justify-center mt-6">
              <button
                className="bg-black text-white rounded-full px-8 py-2 font-semibold"
                onClick={() => setSelected(null)}
              >
                CLOSE
              </button>
            </div>
            <button
              className="absolute top-2 right-4 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}