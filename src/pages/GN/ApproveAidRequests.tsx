import React, { useEffect, useState } from "react";

type AidRequest = {
  aid_id: number;
  full_name: string;
  type_support: string;
  district: string;
  gn_division: string;
  contact_no: string;
  description: string;
  family_size: number;
  date_time: string;
};

export default function ApproveAidRequests() {
  const [requests, setRequests] = useState<AidRequest[]>([]);
  const [selected, setSelected] = useState<AidRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem("gnOfficerData");
    if (!raw) {
      alert("GN Officer not logged in.");
      return;
    }

    const gnOfficerData = JSON.parse(raw);
    const gnDivision = gnOfficerData?.GnDivision || gnOfficerData?.gnDivision;

    if (!gnDivision) {
      alert("GN Division missing.");
      return;
    }

    fetch(`http://localhost:5158/AidRequest/pending?gnDivision=${encodeURIComponent(gnDivision)}`)
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch aid requests", err);
        setIsLoading(false);
      });
  }, []);

  const handleAction = async (id: number, action: "Approved" | "Rejected") => {
    try {
      const res = await fetch(`http://localhost:5158/AidRequest/updateStatus`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ReportId: id,
          Status: action,
          Actor: "GN", 
        }),
      });

      if (!res.ok) throw new Error("Failed to update GN status");

      alert(`Request ${action.toLowerCase()} successfully`);
      setSelected(null);

      // Re-fetch the updated request list
      const raw = localStorage.getItem("gnOfficerData");
      const gnDivision = raw ? JSON.parse(raw)?.GnDivision || JSON.parse(raw)?.gnDivision : null;
      if (gnDivision) {
        const refreshed = await fetch(
          `http://localhost:5158/AidRequest/pending?gnDivision=${encodeURIComponent(gnDivision)}`
        );
        const updatedRequests = await refreshed.json();
        setRequests(updatedRequests);
      }
    } catch (err) {
      alert("Failed to update status");
      console.error(err);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-gray-100 rounded-2xl shadow p-8 mt-8">
      <h2 className="text-2xl font-bold text-center mb-4">Approve Aid Requests</h2>

      {isLoading ? (
        <p className="text-center text-gray-600">Loading requests...</p>
      ) : requests.length === 0 ? (
        <p className="text-center text-gray-600">No pending aid requests found for your division.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {requests.map((req) => (
            <div
              key={req.aid_id}
              className="bg-white border border-black rounded-xl p-6 shadow flex flex-col gap-2"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <span className="font-semibold">{req.full_name}</span>
                  <span className="font-normal"> - {req.type_support}</span>
                </div>
                <div className="text-sm text-gray-600">
                  Date requested: {new Date(req.date_time).toLocaleDateString()}
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                <div><span className="font-semibold">Division:</span> {req.gn_division}</div>
                <div><span className="font-semibold">Contact No:</span> {req.contact_no}</div>
                <div><span className="font-semibold">Family Size:</span> {req.family_size}</div>
              </div>
              <div><span className="font-semibold">Description:</span> {req.description}</div>
              <div className="flex gap-4 mt-2">
                <button
                  className="border border-black rounded px-6 py-2 font-semibold"
                  onClick={() => handleAction(req.aid_id, "Approved")}
                >
                  Approve
                </button>
                <button
                  className="border border-black rounded px-6 py-2 font-semibold"
                  onClick={() => handleAction(req.aid_id, "Rejected")}
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
      )}

      {/* Details Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full relative overflow-y-auto max-h-[90vh]">
            <h3 className="text-2xl font-bold mb-4 text-center">Aid Request Details</h3>
            <div className="mb-2"><b>Name:</b> {selected.full_name}</div>
            <div className="mb-2"><b>Type of Support:</b> {selected.type_support}</div>
            <div className="mb-2"><b>Division:</b> {selected.gn_division}</div>
            <div className="mb-2"><b>District:</b> {selected.district}</div>
            <div className="mb-2"><b>Contact No:</b> {selected.contact_no}</div>
            <div className="mb-2"><b>Family Size:</b> {selected.family_size}</div>
            <div className="mb-2"><b>Date Requested:</b> {new Date(selected.date_time).toLocaleString()}</div>
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



