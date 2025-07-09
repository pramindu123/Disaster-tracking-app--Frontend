import React, { useEffect, useState } from "react";

export default function DMCReports() {
  const [reports, setReports] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertForm, setAlertForm] = useState({
    district: "",
    gnDivision: "",
    alertType: "",
    severity: "Medium",
    publish: "now",
    publishDate: "",
  });

  // ✅ Fetch filtered reports based on DMC officer's district
  useEffect(() => {
    const storedDmcData = localStorage.getItem("dmcOfficerData");
    if (storedDmcData) {
      const dmc = JSON.parse(storedDmcData);
      const district = dmc.district;

      if (district) {
        fetch(`http://localhost:5158/Symptoms/approvedByGn/${district}`)
          .then((res) => res.json())
          .then((data) => setReports(data))
          .catch((err) => console.error("Failed to fetch reports:", err));
      }
    }
  }, []);

  // Prefill district and gnDivision from selected report
  const openAlertModal = (report: any) => {
    setAlertForm({
      district: report.district,
      gnDivision: report.gn_division,
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

  // ✅ Submit new alert to backend
  const handleAlertSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const alertData = {
      alert_type: alertForm.alertType,
      district: alertForm.district,
      gn_division: alertForm.gnDivision,
      severity: alertForm.severity,
    };

    try {
      const response = await fetch("http://localhost:5158/Alerts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(alertData),
      });

      if (response.ok) {
        alert("Alert published!");
        setShowAlertModal(false);
        handleAlertClear();
      } else {
        alert("Failed to publish alert.");
      }
    } catch (error) {
      console.error("Error submitting alert:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-100 rounded-2xl shadow p-8 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">GN-Approved Symptom Reports</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg border">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-2 px-4 border">GN Division</th>
              <th className="py-2 px-4 border">Date and Time</th>
              <th className="py-2 px-4 border">District</th>
              <th className="py-2 px-4 border">Description</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, idx) => (
              <tr key={idx} className="border-b last:border-b-0">
                <td className="py-2 px-4 border">{report.gn_division}</td>
                <td className="py-2 px-4 border">
                  {new Date(report.date_time).toLocaleString()}
                </td>
                <td className="py-2 px-4 border">{report.district}</td>
                <td className="py-2 px-4 border">
                  <button
                    className="underline text-blue-600"
                    onClick={() => setSelected(report)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detailed Report Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full relative overflow-y-auto max-h-[90vh]">
            <h3 className="text-2xl font-bold mb-4 text-center">Detailed Report</h3>
            <div className="mb-2"><b>Report ID:</b> {selected.report_id}</div>
            <div className="mb-2"><b>Name:</b> {selected.reporter_name}</div>
            <div className="mb-2"><b>Contact No:</b> {selected.contact_no}</div>
            <div className="mb-2"><b>Description:</b> {selected.description}</div>
            <div className="mb-2"><b>Date / Time:</b> {new Date(selected.date_time).toLocaleString()}</div>
            <div className="mb-2"><b>District:</b> {selected.district}</div>
            <div className="mb-4"><b>GN Division:</b> {selected.gn_division}</div>

            {selected.image && (
              <div className="mb-6 flex justify-center">
                <img
                  src={selected.image}
                  alt="Report"
                  className="w-48 h-48 object-cover border rounded"
                />
              </div>
            )}

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
                Close
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

      {/* Alert Modal */}
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
