import React, { useState } from "react";

export default function SubmitManualReport() {
  const [form, setForm] = useState({
    fullName: "",
    contact: "",
    district: "",
    division: "",
    datetime: "",
    description: "",
    image: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, image: e.target.files ? e.target.files[0] : null }));
  };

  const handleClear = () => {
    setForm({
      fullName: "",
      contact: "",
      district: "",
      division: "",
      datetime: "",
      description: "",
      image: null,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic here
    alert("Report submitted!");
    handleClear();
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-gray-100 rounded-2xl shadow p-8 mt-8">
      <h2 className="text-2xl font-bold text-center mb-6">Submit Manual Reports</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-semibold mb-1">Full Name :</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full rounded px-3 py-2 border border-gray-300"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Contact Information :</label>
            <input
              type="text"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              className="w-full rounded px-3 py-2 border border-gray-300"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block font-semibold mb-1">District</label>
            <input
              type="text"
              name="district"
              value={form.district}
              onChange={handleChange}
              className="w-full rounded px-3 py-2 border border-gray-300"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">GN Division</label>
            <input
              type="text"
              name="division"
              value={form.division}
              onChange={handleChange}
              className="w-full rounded px-3 py-2 border border-gray-300"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Date/Time</label>
            <input
              type="datetime-local"
              name="datetime"
              value={form.datetime}
              onChange={handleChange}
              className="w-full rounded px-3 py-2 border border-gray-300"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Symptom Description :</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full rounded px-3 py-2 border border-gray-300 min-h-[80px]"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-1">Upload Image :</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block"
          />
        </div>
        <div className="flex gap-4 justify-center">
          <button
            type="submit"
            className="bg-gray-300 hover:bg-gray-400 rounded-full px-8 py-2 font-semibold"
          >
            Submit
          </button>
          <button
            type="button"
            className="bg-gray-200 hover:bg-gray-300 rounded-full px-8 py-2 font-semibold"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}