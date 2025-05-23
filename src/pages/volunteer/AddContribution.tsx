import React, { useState } from "react";

export default function AddContribution() {
  const [district, setDistrict] = useState("");
  const [type, setType] = useState("");
  const [otherType, setOtherType] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Use type === "Other" ? otherType : type for the final type value
    alert(
      `District: ${district}\nType: ${type === "Other" ? otherType : type}\nDescription: ${description}`
    );
    setDistrict("");
    setType("");
    setOtherType("");
    setDescription("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-gray-900 text-center">Add Contribution</h1>
      <form
        className="w-full max-w-2xl bg-white/90 rounded-3xl shadow-xl border border-blue-100 p-8 flex flex-col gap-8"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <label className="md:w-1/3 text-2xl font-medium text-gray-900">District :</label>
          <input
            type="text"
            value={district}
            onChange={e => setDistrict(e.target.value)}
            required
            className="flex-1 rounded-lg bg-gray-100 px-4 py-2 text-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <label className="md:w-1/3 text-2xl font-medium text-gray-900">Type of Support :</label>
          <div className="flex-1 flex flex-col gap-2">
            <select
              value={type}
              onChange={e => setType(e.target.value)}
              required
              className="rounded-lg bg-gray-100 px-4 py-2 text-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="">select</option>
              <option value="Evacuation">Evacuation</option>
              <option value="First Aid">First Aid</option>
              <option value="Supply Distribution">Supply Distribution</option>
              <option value="Other">Other</option>
            </select>
            {type === "Other" && (
              <input
                type="text"
                placeholder="Please specify"
                value={otherType}
                onChange={e => setOtherType(e.target.value)}
                required
                className="rounded-lg bg-gray-100 px-4 py-2 text-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <label className="md:w-1/3 text-2xl font-medium text-gray-900">Description :</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            className="flex-1 rounded-lg bg-gray-100 px-4 py-2 text-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 min-h-[80px]"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-2 rounded-xl font-semibold text-lg shadow hover:scale-105 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}