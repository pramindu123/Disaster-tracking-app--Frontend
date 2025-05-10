import React, { useRef, useState } from "react";

export default function SubmitSymptoms() {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileUrl, setFileUrl] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleClear = () => {
    formRef.current?.reset();
    setFileName("");
    setFileUrl("");
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
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Submit Symptoms</h1>
          <form ref={formRef} className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
            <div className="flex flex-col gap-1 md:flex-row md:items-center">
              <label className="block text-xl md:text-2xl font-medium md:w-44">Full Name</label>
              <input
                type="text"
                required
                placeholder="Enter your full name"
                className="w-full bg-gray-100 rounded-lg h-10 md:h-12 px-4 text-lg focus:outline-none md:ml-2 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              />
            </div>
            <div className="border-t border-gray-200" />
            <div className="flex flex-col gap-1 md:flex-row md:items-center">
              <label className="block text-xl md:text-2xl font-medium md:w-44">Contact Information</label>
              <input
                type="text"
                required
                placeholder="Enter your contact information"
                className="w-full bg-gray-100 rounded-lg h-10 md:h-12 px-4 text-lg focus:outline-none md:ml-2 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              />
            </div>
            <div className="border-t border-gray-200" />
            <div className="flex flex-col gap-1 md:flex-row md:items-center">
              <label className="block text-xl md:text-2xl font-medium md:w-44">Location</label>
              <input
                type="text"
                required
                placeholder="Enter your location"
                className="w-full bg-gray-100 rounded-lg h-10 md:h-12 px-4 text-lg focus:outline-none md:ml-2 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              />
            </div>
            <div className="border-t border-gray-200" />
            <div className="flex flex-col gap-1 md:flex-row md:items-start">
              <label className="block text-xl md:text-2xl font-medium md:w-44 md:mt-2">Symptom Description</label>
              <textarea
                required
                placeholder="Describe your symptoms"
                className="w-full bg-gray-100 rounded-lg h-24 md:h-28 px-4 py-2 text-lg focus:outline-none md:ml-2 resize-none border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              />
            </div>
            <div className="border-t border-gray-200" />
            <div className="flex flex-col gap-1 md:flex-row md:items-center">
              <label className="block text-xl md:text-2xl font-medium md:w-44">Upload Image</label>
              <div className="w-full flex flex-col md:flex-row md:items-center md:ml-2 space-y-2 md:space-y-0 md:space-x-4">
                <label className="relative">
                  <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                  <div className="flex items-center justify-center bg-blue-600 text-white font-semibold rounded-lg h-14 px-6 cursor-pointer shadow hover:bg-blue-700 transition-all duration-150">
                    <svg className="w-7 h-7 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
                    </svg>
                    <span>Upload Image</span>
                  </div>
                </label>
                {fileName && (
                  <div className="flex items-center space-x-2">
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
                className="bg-blue-600 text-white rounded-xl px-10 py-2 text-2xl font-bold shadow hover:bg-blue-700 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Submit
              </button>
              <button
                type="button"
                className="bg-gray-300 rounded-xl px-8 py-2 text-2xl font-bold hover:bg-gray-400 transition ml-4"
                onClick={handleClear}
              >
                Clear
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
                <div className="text-2xl font-semibold mb-4">Symptom submitted successfully!</div>
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