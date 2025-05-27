import React, { useRef, useState } from "react";
import gnDivisions from "../data/gnDivisions";

const districts = [
  "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle",
  "Gampaha", "Hambantota", "Jaffna", "Kalutara", "Kandy", "Kegalle",
  "Kilinochchi", "Kurunegala", "Mannar", "Matale", "Matara", "Monaragala",
  "Mullaitivu", "Nuwara Eliya", "Polonnaruwa", "Puttalam", "Ratnapura",
  "Trincomalee", "Vavuniya"
];

export default function SubmitSymptoms() {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileUrl, setFileUrl] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [fullName, setFullName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [district, setDistrict] = useState("");
  const [gnDivision, setGnDivision] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [symptoms, setSymptoms] = useState("");

  const handleClear = () => {
    formRef.current?.reset();
    setFileName("");
    setFileUrl("");
    setFullName("");
    setContactNo("");
    setDistrict("");
    setGnDivision("");
    setDateTime("");
    setSymptoms("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file?.name || "");
    if (file && file.type.startsWith("image/")) {
      setFileUrl(URL.createObjectURL(file));
    } else {
      setFileUrl("");
    }
  };

  const handleRemoveFile = () => {
    setFileName("");
    setFileUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
        const formData = {
            FullName: fullName,
            ContactNo: contactNo,
            District: district,
            GNDivision: gnDivision,
            DateTime: new Date(dateTime).toISOString(),
            Symptoms: symptoms,
            ImageUrl: fileUrl || ""
        };

        console.log('Submitting data:', formData); // Debug log

        // Changed URL to match the controller's base endpoint
        const response = await fetch("http://localhost:5069/api/Symptoms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
        });

        // Add more detailed error logging
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Server response:', {
                status: response.status,
                statusText: response.statusText,
                body: errorText
            });
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Success:', result);

        if (result.success) {
            setShowSuccess(true);
            handleClear();
        } else {
            throw new Error(result.message || 'Submission failed');
        }
    } catch (error) {
        console.error("Error details:", error);
        alert("Failed to submit symptoms. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 px-4 md:px-12 font-sans flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto p-0 md:p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 transition-all duration-300">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Submit Symptoms</h1>
          <form ref={formRef} className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
            <div className="flex flex-col gap-1 md:flex-row md:items-center">
              <label className="block font-semibold text-base md:text-lg mb-1 md:w-44">Full Name</label>
              <input
                type="text"
                required
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-gray-100 rounded-lg h-10 px-4 text-base md:text-lg focus:outline-none md:ml-2 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              />
            </div>
            <div className="border-t border-gray-200" />
            <div className="flex flex-col gap-1 md:flex-row md:items-center">
              <label className="block font-semibold text-base md:text-lg mb-1 md:w-44">Contact No</label>
              <input
                type="text"
                required
                placeholder="Enter your contact number"
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
                className="w-full bg-gray-100 rounded-lg h-10 px-4 text-base md:text-lg focus:outline-none md:ml-2 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              />
            </div>
            <div className="border-t border-gray-200" />
            <div className="flex flex-col gap-1 md:flex-row md:items-center">
              <label className="block font-semibold text-base md:text-lg mb-1 md:w-44">District</label>
              <select
                required
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-gray-100 rounded-lg h-10 px-4 text-base md:text-lg focus:outline-none md:ml-2 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              >
                <option value="" disabled>Select your district</option>
                {districts.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="border-t border-gray-200" />
            <div className="flex flex-col gap-1 md:flex-row md:items-center">
              <label className="block font-semibold text-base md:text-lg mb-1 md:w-44">GN Division</label>
              <select
                required
                value={gnDivision}
                onChange={(e) => setGnDivision(e.target.value)}
                className="w-full bg-gray-100 rounded-lg h-10 px-4 text-base md:text-lg focus:outline-none md:ml-2 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              >
                <option value="" disabled>Select your GN Division</option>
                {gnDivisions.map((gnd) => (
                  <option key={gnd} value={gnd}>{gnd}</option>
                ))}
              </select>
            </div>
            <div className="border-t border-gray-200" />
            <div className="flex flex-col gap-1 md:flex-row md:items-center">
              <label className="block font-semibold text-base md:text-lg mb-1 md:w-44">Date and Time</label>
              <input
                type="datetime-local"
                required
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="w-full bg-gray-100 rounded-lg h-10 px-4 text-base md:text-lg focus:outline-none md:ml-2 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              />
            </div>
            <div className="border-t border-gray-200" />
            <div className="flex flex-col gap-1 md:flex-row md:items-start">
              <label className="block font-semibold text-base md:text-lg mb-1 md:w-44 md:mt-2">Symptoms</label>
              <textarea
                required
                placeholder="Describe your symptoms"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="w-full bg-gray-100 rounded-lg h-24 md:h-28 px-4 py-2 text-base md:text-lg focus:outline-none md:ml-2 resize-none border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              />
            </div>
            <div className="border-t border-gray-200" />
            <div className="flex flex-col gap-1 md:flex-row md:items-center">
              <label className="block font-semibold text-base md:text-lg mb-1 md:w-44">Upload Image</label>
              <div className="w-full flex flex-col md:flex-row md:items-center md:ml-2">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <label className="w-full">
                  <div
                    className="flex items-center justify-center bg-blue-600 text-white font-semibold rounded-lg h-14 px-6 cursor-pointer shadow hover:bg-blue-700 transition-all duration-150"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <svg className="w-7 h-7 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
                    </svg>
                    <span>Upload Image</span>
                  </div>
                </label>
                {fileName && (
                  <div className="flex items-center space-x-2 mt-2 md:mt-0">
                    {fileUrl ? (
                      <img src={fileUrl} alt="Preview" className="w-16 h-16 object-cover rounded border" />
                    ) : (
                      <span className="text-green-700 font-semibold">File uploaded</span>
                    )}
                    <button type="button" onClick={handleRemoveFile} className="ml-1 text-gray-400 hover:text-red-600 text-2xl font-bold focus:outline-none" title="Remove file">&times;</button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-center mt-2">
              <button
                type="submit"
                className="bg-blue-600 text-white rounded-xl px-10 py-2 text-xl md:text-2xl font-bold shadow hover:bg-blue-700 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        {/* Success Popup */}
        {showSuccess && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity animate-fadeIn"></div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl shadow-xl px-10 py-8 flex flex-col items-center animate-fadeIn">
                <div className="text-green-600 text-3xl mb-4 font-bold">✔</div>
                <div className="text-2xl font-semibold mb-4">Symptoms submitted successfully!</div>
                <button className="mt-2 px-8 py-2 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition" onClick={() => setShowSuccess(false)}>OK</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Add fadeIn animation to your global CSS or Tailwind config if not already present:
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
// .animate-fadeIn { animation: fadeIn 0.3s ease; }