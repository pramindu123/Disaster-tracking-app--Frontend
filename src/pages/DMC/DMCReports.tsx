import React, { useState } from "react";

const reports = [
  {
    approvedBy: "GN Name 1",
    dateTime: "1/1/2025 2.00 p.m.",
    division: "Region 1",
    description: "Details",
    reportId: "1208345",
    name: "Supun Dasanayake",
    contact: "0770366459",
    fullDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. SLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.suspendisse varius enim in eros elementum tristique.",
    date: "01/10/2024 - 2:00pm",
    district: "Colombo",
    gnDivision: "Division",
    images: [
      "https://picsum.photos/120/120?random=1",
      "https://picsum.photos/120/120?random=2",
      "https://picsum.photos/120/120?random=3",
      "https://picsum.photos/120/120?random=4",
    ],
  },
  // ...add more reports as needed
];

export default function DMCReports() {
  const [selected, setSelected] = useState<null | typeof reports[0]>(null);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertForm, setAlertForm] = useState({
    district: "",
    gnDivision: "",
    alertType: "",
    severity: "Medium",
    publish: "now",
    publishDate: "",
  });

  // Prefill district and gnDivision when opening alert modal
  const openAlertModal = (report: typeof reports[0]) => {
    setAlertForm({
      district: report.district,
      gnDivision: report.gnDivision,
      alertType: "",
      severity: "Medium",
      publish: "now",
      publishDate: "",
    });
    setShowAlertModal(true);
  };

  const handleAlertChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAlertForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSeverity = (level: string) => {
    setAlertForm((prev) => ({ ...prev, severity: level }));
  };

  const handlePublishChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAlertForm((prev) => ({ ...prev, publish: e.target.value }));
  };

  const handleAlertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic here
    alert("Alert published!");
    setShowAlertModal(false);
  };

  const handleAlertClear = () => {
    setAlertForm({
      district: "",
      gnDivision: "",
      alertType: "",
      severity: "Medium",
      publish: "now",
      publishDate: "",
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-100 rounded-2xl shadow p-8 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">SymptomReport</h2>
        <button className="bg-gray-200 rounded-full px-4 py-1 flex items-center gap-2">
          <span className="material-icons text-base">filter_list</span>
          Filter
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg border">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-2 px-4 border">Approved by</th>
              <th className="py-2 px-4 border">Date and Time</th>
              <th className="py-2 px-4 border">GN Division</th>
              <th className="py-2 px-4 border">Description</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, idx) => (
              <tr key={idx} className="border-b last:border-b-0">
                <td className="py-2 px-4 border">{report.approvedBy}</td>
                <td className="py-2 px-4 border">{report.dateTime}</td>
                <td className="py-2 px-4 border">{report.division}</td>
                <td className="py-2 px-4 border">
                  <button
                    className="underline text-blue-600"
                    onClick={() => setSelected(report)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Detailed Report */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full relative overflow-y-auto max-h-[90vh]">
            <h3 className="text-2xl font-bold mb-4 text-center">Detailed Report</h3>
            <div className="mb-2"><b>Report Id:</b> {selected.reportId}</div>
            <div className="mb-2"><b>Name:</b> {selected.name}</div>
            <div className="mb-2"><b>Contact No:</b> {selected.contact}</div>
            <div className="mb-2"><b>Description:</b> {selected.fullDescription}</div>
            <div className="mb-2"><b>Date / Time:</b> {selected.date}</div>
            <div className="mb-2"><b>District:</b> {selected.district}</div>
            <div className="mb-4"><b>GN Division:</b> {selected.gnDivision}</div>
            <div className="flex flex-wrap gap-4 mb-6 justify-center">
              {selected.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Report Image ${i + 1}`}
                  className="w-28 h-28 object-cover border rounded"
                />
              ))}
            </div>
            <div className="flex gap-4 justify-center">
              <button
                className="bg-black text-white rounded-full px-6 py-2 font-semibold"
                onClick={() => openAlertModal(selected)}
              >
                Create Alert
              </button>
              <button
                className="bg-black text-white rounded-full px-6 py-2 font-semibold"
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

      {/* Modal for Create New Alert */}
      {showAlertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <form
            className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full relative"
            onSubmit={handleAlertSubmit}
          >
            <h3 className="text-2xl font-bold mb-6 text-center">Create New Alert</h3>
            <div className="mb-4">
              <label className="block font-semibold mb-1">District</label>
              <input
                type="text"
                name="district"
                value={alertForm.district}
                onChange={handleAlertChange}
                className="w-full rounded px-3 py-2 border border-gray-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">GN Division</label>
              <input
                type="text"
                name="gnDivision"
                value={alertForm.gnDivision}
                onChange={handleAlertChange}
                className="w-full rounded px-3 py-2 border border-gray-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Alert Type</label>
              <select
                name="alertType"
                value={alertForm.alertType}
                onChange={handleAlertChange}
                className="w-full rounded px-3 py-2 border border-gray-300"
                required
              >
                <option value="">Select one...</option>
                <option value="Flood">Flood</option>
                <option value="Landslide">Landslide</option>
                <option value="Fire">Fire</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Severity Level</label>
              <div className="flex gap-2">
                {["Low", "Medium", "High"].map((level) => (
                  <button
                    type="button"
                    key={level}
                    className={`px-4 py-2 rounded border ${
                      alertForm.severity === level
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }`}
                    onClick={() => handleSeverity(level)}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Publish</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="publish"
                    value="now"
                    checked={alertForm.publish === "now"}
                    onChange={handlePublishChange}
                  />
                  Publish now
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="publish"
                    value="later"
                    checked={alertForm.publish === "later"}
                    onChange={handlePublishChange}
                  />
                  Publish Later
                </label>
                {alertForm.publish === "later" && (
                  <input
                    type="text"
                    name="publishDate"
                    placeholder="DD/MM/YY"
                    value={alertForm.publishDate}
                    onChange={handleAlertChange}
                    className="rounded px-2 py-1 border border-gray-300 ml-2"
                  />
                )}
              </div>
            </div>
            <div className="flex gap-4 justify-center mt-6">
              <button
                type="submit"
                className="border border-black rounded-full px-8 py-2 font-semibold"
              >
                Publish
              </button>
              <button
                type="button"
                className="bg-black text-white rounded-full px-8 py-2 font-semibold"
                onClick={() => {
                  setShowAlertModal(false);
                  handleAlertClear();
                }}
              >
                Clear
              </button>
            </div>
            <button
              className="absolute top-2 right-4 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={() => setShowAlertModal(false)}
              aria-label="Close"
              type="button"
            >
              &times;
            </button>
          </form>
        </div>
      )}
    </div>
  );
}