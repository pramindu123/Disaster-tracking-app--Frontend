import React, { useState } from "react";

const aidRequests = [
	{
		name: "A. M. Jagath Perera",
		dateTime: "1/1/2025 2.00 p.m.",
		type: "Food",
		gnOfficer: "GN Name",
		gnDivision: "Mahawa",
		description:
			"Family affected by recent flooding, needs immediate food supplies for 5 family members.",
		contact: "071-6573420",
		date: "2025-05-30",
		familySize: 5,
	},
	{
		name: "W. M. C. Kumara",
		dateTime: "1/1/2025 2.00 p.m.",
		type: "Medical",
		gnOfficer: "GN Name",
		gnDivision: "Anuradhapura East",
		description:
			"Elderly person with medical conditions requiring immediate medicine supplies.",
		contact: "076-6784900",
		date: "2025-06-01",
		familySize: 1,
	},
	{
		name: "Name 3",
		dateTime: "1/1/2025 2.00 p.m.",
		type: "Type 3",
		gnOfficer: "GN Name",
		gnDivision: "Division",
		description: "Request for temporary shelter due to house damage.",
		contact: "070-0000000",
		date: "2025-06-02",
		familySize: 3,
	},
];

export default function DMCAidRequests() {
	const [selected, setSelected] = useState<null | typeof aidRequests[0]>(null);

	return (
		<div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-100 rounded-2xl shadow p-8 mt-8">
			<h2 className="text-2xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
				Aid Request
			</h2>
			<div className="overflow-x-auto">
				<table className="min-w-full bg-white rounded-lg border">
					<thead>
						<tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
							<th className="py-2 px-4 border">Name</th>
							<th className="py-2 px-4 border">Date/ Time</th>
							<th className="py-2 px-4 border">Type</th>
							<th className="py-2 px-4 border">GN Officer</th>
							<th className="py-2 px-4 border">GN Division</th>
							<th className="py-2 px-4 border">Description</th>
						</tr>
					</thead>
					<tbody>
						{aidRequests.map((req, idx) => (
							<tr key={idx} className="border-b last:border-b-0">
								<td className="py-2 px-4 border font-semibold text-blue-700">
									{req.name}
								</td>
								<td className="py-2 px-4 border">{req.dateTime}</td>
								<td className="py-2 px-4 border">{req.type}</td>
								<td className="py-2 px-4 border">{req.gnOfficer}</td>
								<td className="py-2 px-4 border">{req.gnDivision}</td>
								<td className="py-2 px-4 border">
									<button
										className="underline text-blue-600"
										onClick={() => setSelected(req)}
									>
										Details
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Modal for Detailed Aid Request in Card Layout */}
			{selected && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
					<div className="bg-gradient-to-br from-blue-50 via-white to-purple-100 rounded-2xl shadow-xl p-8 max-w-xl w-full relative overflow-y-auto max-h-[90vh]">
						<div className="bg-white border border-blue-300 rounded-xl p-6 shadow flex flex-col gap-2">
							<div className="flex flex-col md:flex-row md:justify-between md:items-center">
								<div>
									<span className="font-semibold text-blue-700">
										{selected.name}
									</span>
									<span className="font-normal"> - {selected.type}</span>
								</div>
								<div className="text-sm text-gray-600">
									Date requested : {selected.date}
								</div>
							</div>
							<div className="flex flex-wrap gap-4 text-sm">
								<div>
									<span className="font-semibold text-blue-700">
										Division :
									</span>{" "}
									{selected.gnDivision}
								</div>
								<div>
									<span className="font-semibold text-blue-700">
										Contact No :
									</span>{" "}
									{selected.contact}
								</div>
								<div>
									<span className="font-semibold text-blue-700">
										Family Size :
									</span>{" "}
									{selected.familySize}
								</div>
							</div>
							<div>
								<span className="font-semibold text-blue-700">
									Description :
								</span>{" "}
								{selected.description}
							</div>
							<div className="flex gap-4 mt-2 justify-end">
								<button
									className="border border-blue-500 text-blue-700 rounded-full px-6 py-2 font-semibold bg-gradient-to-r from-blue-50 to-purple-50"
									onClick={() => {
										alert("Approved!");
										setSelected(null);
									}}
								>
									Approve
								</button>
								<button
									className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full px-6 py-2 font-semibold"
									onClick={() => {
										alert("Rejected!");
										setSelected(null);
									}}
								>
									Reject
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}