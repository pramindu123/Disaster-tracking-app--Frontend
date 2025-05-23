import React, { useRef, useState } from "react";

const supportOptions = ["First aid", "Supply distribution", "Evacuation", "Other"];

export default function RequestAid() {
  const formRef = useRef<HTMLFormElement>(null);
  const [typeOfSupport, setTypeOfSupport] = useState("");
  const [customSupport, setCustomSupport] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleClear = () => {
    formRef.current?.reset();
    setTypeOfSupport("");
    setCustomSupport("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleClear();
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 px-4 md:px-12 font-sans flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto p-0 md:p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 transition-all duration-300">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Post Disaster Aid Request</h1>
          <form ref={formRef} className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
            <div className="flex flex-col gap-1 md:flex-row md:items-center">
              <label className="block font-semibold text-base md:text-lg mb-1 md:w-44">Full Name</label>
              <input
                type="text"
                required
                placeholder="Enter your full name"
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
                className="w-full bg-gray-100 rounded-lg h-10 px-4 text-base md:text-lg focus:outline-none md:ml-2 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              />
            </div>
            <div className="border-t border-gray-200" />
            <div className="flex flex-col gap-1 md:flex-row md:items-center">
              <label className="block font-semibold text-base md:text-lg mb-1 md:w-44">District</label>
              <input
                type="text"
                required
                placeholder="Enter your district"
                className="w-full bg-gray-100 rounded-lg h-10 px-4 text-base md:text-lg focus:outline-none md:ml-2 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              />
            </div>
            <div className="border-t border-gray-200" />
            <div className="flex flex-col gap-1 md:flex-row md:items-center">
              <label className="block font-semibold text-base md:text-lg mb-1 md:w-44">GN Division</label>
              <input
                type="text"
                required
                placeholder="Enter your GN division"
                className="w-full bg-gray-100 rounded-lg h-10 px-4 text-base md:text-lg focus:outline-none md:ml-2 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              />
            </div>
            <div className="border-t border-gray-200" />
            <div className="flex flex-col gap-1 md:flex-row md:items-center">
              <label className="block font-semibold text-base md:text-lg mb-1 md:w-44">Family Size</label>
              <input
                type="number"
                min={1}
                required
                placeholder="Enter family size"
                className="w-full bg-gray-100 rounded-lg h-10 px-4 text-base md:text-lg focus:outline-none md:ml-2 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              />
            </div>
            <div className="border-t border-gray-200" />
            <div className="flex flex-col gap-1 md:flex-row md:items-center">
              <label className="block font-semibold text-base md:text-lg mb-1 md:w-44">Date and Time</label>
              <input
                type="datetime-local"
                required
                className="w-full bg-gray-100 rounded-lg h-10 px-4 text-base md:text-lg focus:outline-none md:ml-2 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              />
            </div>
            <div className="border-t border-gray-200" />
            <div className="flex flex-col gap-1 md:flex-row md:items-center">
              <label className="block font-semibold text-base md:text-lg mb-1 md:w-44">Type of Support</label>
              <div className="w-full flex flex-col md:flex-row md:items-center md:ml-2">
                <select
                  required
                  className="w-full bg-gray-100 rounded-lg h-10 px-4 text-base md:text-lg focus:outline-none border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  value={typeOfSupport}
                  onChange={e => setTypeOfSupport(e.target.value)}
                >
                  <option value="">Select type of support</option>
                  {supportOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {typeOfSupport === "Other" && (
                  <input
                    type="text"
                    required
                    value={customSupport}
                    onChange={e => setCustomSupport(e.target.value)}
                    placeholder="Please specify"
                    className="mt-2 md:mt-0 md:ml-2 w-full bg-gray-100 rounded-lg h-10 px-4 text-base md:text-lg focus:outline-none border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  />
                )}
              </div>
            </div>
            <div className="border-t border-gray-200" />
            <div className="flex flex-col gap-1 md:flex-row md:items-start">
              <label className="block font-semibold text-base md:text-lg mb-1 md:w-44 md:mt-2">Description</label>
              <textarea
                required
                placeholder="Describe your situation or needs"
                className="w-full bg-gray-100 rounded-lg h-24 md:h-28 px-4 py-2 text-base md:text-lg focus:outline-none md:ml-2 resize-none border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              />
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
                <div className="text-2xl font-semibold mb-4">Aid request submitted successfully!</div>
                <button className="mt-2 px-8 py-2 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition" onClick={() => setShowSuccess(false)}>OK</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Add fadeIn animation to your global CSS or Tailwind config:
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
// .animate-fadeIn { animation: fadeIn 0.3s ease; }