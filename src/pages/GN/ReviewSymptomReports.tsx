import React, { useState } from "react";

type Report = {
	name: string;
	contact: string;
	date: string;
	time: string;
	description: string;
	images: string[];
};

const reports: Report[] = [
	{
		name: "Nimal Perera",
		contact: "0771222134",
		date: "2025-05-28",
		time: "12:35 pm",
		description:
			"There was a coconut tree which is uprooting unexpectedly and there are cracks appeared on the walls.",
		images: [
			"https://picsum.photos/200/120?random=1",
			"https://picsum.photos/200/120?random=2",
		],
	},
	{
		name: "Saduni Kumari",
		contact: "0761231212",
		date: "2025-05-28",
		time: "11:00 am",
		description: "Description for Saduni Kumari.",
		images: ["https://picsum.photos/200/120?random=3"],
	},
	{
		name: "Amal Fernando",
		contact: "0771234567",
		date: "2025-05-29",
		time: "09:45 am",
		description: "Description for Amal Fernando.",
		images: [
			"https://picsum.photos/200/120?random=4",
			"https://picsum.photos/200/120?random=5",
		],
	},
];

export default function ReviewSymptomReports() {
	const [selectedReport, setSelectedReport] = useState<Report | null>(null);

	return (
		<div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow p-8 mt-8">
			<h2 className="text-2xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
				Review Symptom Reports
			</h2>
			<div className="overflow-x-auto">
				<table className="min-w-full bg-white rounded-lg shadow border border-gray-200">
					<thead>
						<tr className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700">
							<th className="py-3 px-4 text-left">Name of Reporter</th>
							<th className="py-3 px-4 text-left">Contact Number</th>
							<th className="py-3 px-4 text-left">Date</th>
							<th className="py-3 px-4 text-left">Description</th>
						</tr>
					</thead>
					<tbody>
						{reports.map((report, idx) => (
							<tr key={idx} className="border-b last:border-b-0 hover:bg-blue-50 transition">
								<td className="py-3 px-4">{report.name}</td>
								<td className="py-3 px-4">{report.contact}</td>
								<td className="py-3 px-4">{report.date}</td>
								<td
									className="py-3 px-4 text-blue-600 cursor-pointer hover:underline"
									onClick={() => setSelectedReport(report)}
								>
									Details
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Modal */}
			{selectedReport && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
					<div className="bg-white rounded-2xl shadow-xl p-8 max-w-xl w-full relative">
						<h3 className="text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
							Review Disaster Reports
						</h3>
						<div className="mb-2 flex justify-between">
							<div>
								<span className="font-semibold text-blue-700">Submitter Name:</span>{" "}
								{selectedReport.name}
							</div>
							<div>
								<span className="font-semibold text-blue-700">Contact Number:</span>{" "}
								{selectedReport.contact}
							</div>
						</div>
						<div className="mb-2">
							<span className="font-semibold text-blue-700">Submitted Date:</span>{" "}
							{selectedReport.date}
						</div>
						<div className="mb-2">
							<span className="font-semibold text-blue-700">Submitted Time:</span>{" "}
							{selectedReport.time}
						</div>
						<div className="mb-4">
							<span className="font-semibold text-blue-700">Description:</span>
							<div>{selectedReport.description}</div>
						</div>
						<div className="mb-6">
							<span className="font-semibold text-blue-700">Images:</span>
							<div className="flex gap-4 mt-2">
								{selectedReport.images.map((img, i) =>
									typeof img === "string" && img.startsWith("http") ? (
										<img
											key={i}
											src={img}
											alt={`Evidence ${i + 1}`}
											className="bg-gray-200 rounded-lg w-40 h-24 object-cover"
										/>
									) : (
										<div
											key={i}
											className="bg-gray-200 rounded-lg w-40 h-24 flex items-center justify-center text-gray-700 font-semibold"
										>
											{img}
										</div>
									)
								)}
							</div>
						</div>
						<div className="flex justify-between gap-4">
							<button
								className="bg-gray-200 hover:bg-gray-300 rounded-md px-4 py-2 font-semibold text-blue-700"
								onClick={() => setSelectedReport(null)}
							>
								Back to List
							</button>
							<button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md px-4 py-2 font-semibold shadow hover:scale-105 transition-all">
								Approve & Forward to DMC
							</button>
							<button className="bg-gray-300 hover:bg-gray-400 rounded-md px-4 py-2 font-semibold text-blue-700">
								Reject Report
							</button>
						</div>
						{/* Close button (top right) */}
						<button
							className="absolute top-2 right-2 text-gray-500 hover:text-blue-700 text-2xl"
							onClick={() => setSelectedReport(null)}
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