import React, { useRef, useState } from "react";
import districtGnDivisions from "../data/districtGnDivisions";

export default function SubmitSymptoms() {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fileName, setFileName] = useState<string>("");
  const [image, setFileUrl] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [reporter_name, setFullName] = useState("");
  const [contact_no, setContactNo] = useState("");
  const [district, setSelectedDistrict] = useState<string>("");
  const [gn_division, setSelectedGnDivision] = useState<string>("");
  const [date_time, setDateTime] = useState("");
  const [description, setSymptoms] = useState("");

  const [errors, setErrors] = useState({
    reporter_name: "",
    contact_no: "",
    description: ""
  });

  const validatePhoneNumber = (phone: string) => {
    const regex = /^\d{10}$/;
    if (!regex.test(phone)) {
      return "Phone number must be exactly 10 digits";
    }
    return "";
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!reporter_name.trim()) {
      newErrors.reporter_name = "Full name is required";
    } else if (!/^[A-Za-z\s]+$/.test(reporter_name.trim())) {
      newErrors.reporter_name = "Name can only contain letters and spaces";
    }

    const phoneError = validatePhoneNumber(contact_no);
    if (phoneError) {
      newErrors.contact_no = phoneError;
    }

    if (!description.trim()) {
      newErrors.description = "Symptoms description is required";
    } else if (description.trim().length < 10) {
      newErrors.description = "Symptoms should be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClear = () => {
    formRef.current?.reset();
    setFileName("");
    setFileUrl("");
    setFullName("");
    setContactNo("");
    setSelectedDistrict("");
    setSelectedGnDivision("");
    setDateTime("");
    setSymptoms("");
    setErrors({ reporter_name: "", contact_no: "", description: "" });
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

    if (!validateForm()) return;

    try {
      const reportData = {
        reporter_name,
        contact_no,
        district,
        gn_division,
        date_time: new Date(date_time).toISOString(),
        description,
        image: image || "",
        action: "Pending"
      };

      const response = await fetch("http://localhost:5158/Symptoms/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(reportData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      if (result.success || response.status === 200 || response.status === 201) {
        setShowSuccess(true);
        handleClear();
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (error) {
      console.error("Error details:", error);
      alert("Failed to submit symptoms. Please try again.");
    }
  };

  const districts = Object.keys(districtGnDivisions);
  const gnDivisions = district ? districtGnDivisions[district] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 px-4 md:px-12 font-sans flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto p-0 md:p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 transition-all duration-300">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Submit Symptoms</h1>
          <form ref={formRef} className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
            {/* Full Name */}
            <div className="flex flex-col gap-1 md:flex-row md:items-center">
              <label className="block font-semibold text-base md:text-lg mb-1 md:w-44">Full Name</label>
              <div className="w-full flex flex-col">
                <input
                  type="text"
                  required
                  value={reporter_name}
                  placeholder="Enter your full name"
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.reporter_name) setErrors(prev => ({ ...prev, reporter_name: "" }));
                  }}
                  onBlur={() => {
                    if (!reporter_name.trim()) {
                      setErrors(prev => ({ ...prev, reporter_name: "Full name is required" }));
                    } else if (!/^[A-Za-z\s]+$/.test(reporter_name.trim())) {
                      setErrors(prev => ({ ...prev, reporter_name: "Name can only contain letters and spaces" }));
                    }
                  }}
                  className={`w-full bg-gray-100 rounded-lg h-10 px-4 text-base md:text-lg focus:outline-none md:ml-2 border ${
                    errors.reporter_name ? "border-red-500" : "border-gray-300"
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition`}
                />
                {errors.reporter_name && (
                  <p className="text-red-500 text-sm mt-1 ml-2">{errors.reporter_name}</p>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200" />

            {/* Contact No */}
            <div className="flex flex-col gap-1 md:flex-row md:items-center">
              <label className="block font-semibold text-base md:text-lg mb-1 md:w-44">Contact No</label>
              <div className="w-full flex flex-col">
                <input
                  type="tel"
                  required
                  placeholder="Enter 10-digit phone number"
                  value={contact_no}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value) && value.length <= 10) {
                      setContactNo(value);
                      if (errors.contact_no) {
                        setErrors(prev => ({ ...prev, contact_no: "" }));
                      }
                    }
                  }}
                  onBlur={() => {
                    const error = validatePhoneNumber(contact_no);
                    setErrors(prev => ({ ...prev, contact_no: error }));
                  }}
                  maxLength={10}
                  className={`w-full bg-gray-100 rounded-lg h-10 px-4 text-base md:text-lg focus:outline-none md:ml-2 border ${
                    errors.contact_no ? "border-red-500" : "border-gray-300"
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition`}
                />
                {errors.contact_no && (
                  <p className="text-red-500 text-sm mt-1 ml-2">{errors.contact_no}</p>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200" />

            {/* District */}
            <div className="flex flex-col gap-1 md:flex-row md:items-center">
              <label className="block font-semibold text-base md:text-lg mb-1 md:w-44">District</label>
              <select
                required
                value={district}
                onChange={e => {
                  setSelectedDistrict(e.target.value);
                  setSelectedGnDivision("");
                }}
                className="w-full bg-gray-100 rounded-lg h-10 px-4 text-base md:text-lg focus:outline-none md:ml-2 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              >
                <option value="">Select District</option>
                {districts.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="border-t border-gray-200" />

            {/* GN Division */}
            <div className="flex flex-col gap-1 md:flex-row md:items-center">
              <label className="block font-semibold text-base md:text-lg mb-1 md:w-44">GN Division</label>
              <select
                required
                value={gn_division}
                onChange={e => setSelectedGnDivision(e.target.value)}
                className="w-full bg-gray-100 rounded-lg h-10 px-4 text-base md:text-lg focus:outline-none md:ml-2 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                disabled={!district}
              >
                <option value="">Select GN Division</option>
                {gnDivisions.map(gnd => (
                  <option key={gnd} value={gnd}>{gnd}</option>
                ))}
              </select>
            </div>

            <div className="border-t border-gray-200" />

            {/* Date & Time */}
            <div className="flex flex-col gap-1 md:flex-row md:items-center">
              <label className="block font-semibold text-base md:text-lg mb-1 md:w-44">Date and Time</label>
              <input
                type="datetime-local"
                required
                value={date_time}
                onChange={(e) => setDateTime(e.target.value)}
                className="w-full bg-gray-100 rounded-lg h-10 px-4 text-base md:text-lg focus:outline-none md:ml-2 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              />
            </div>

            <div className="border-t border-gray-200" />

            {/* Symptoms */}
            <div className="flex flex-col gap-1 md:flex-row md:items-start">
              <label className="block font-semibold text-base md:text-lg mb-1 md:w-44 md:mt-2">Symptoms</label>
              <div className="w-full flex flex-col">
                <textarea
                  required
                  placeholder="Describe your symptoms"
                  value={description}
                  onChange={(e) => {
                    setSymptoms(e.target.value);
                    if (errors.description) setErrors(prev => ({ ...prev, description: "" }));
                  }}
                  onBlur={() => {
                    if (!description.trim()) {
                      setErrors(prev => ({ ...prev, description: "Symptoms description is required" }));
                    } else if (description.trim().length < 10) {
                      setErrors(prev => ({ ...prev, description: "Symptoms should be at least 10 characters long" }));
                    }
                  }}
                  className={`w-full bg-gray-100 rounded-lg h-24 md:h-28 px-4 py-2 text-base md:text-lg focus:outline-none md:ml-2 resize-none border ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition`}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1 ml-2">{errors.description}</p>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200" />

            {/* Upload Image */}
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
                    {image ? (
                      <img src={image} alt="Preview" className="w-16 h-16 object-cover rounded border" />
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

        {/* Success Message */}
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
