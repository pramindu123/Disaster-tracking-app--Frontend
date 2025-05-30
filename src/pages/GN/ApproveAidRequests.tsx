import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const dummyRequests = [
	{
		name: "A. M. Jagath Perera",
		type: "Food",
		location: "Mahawa",
		contact: "071-6573420",
		description:
			"Family affected by recent flooding, needs immediate food supplies for 5 family members.",
		date: "2025-05-18",
		familySize: 5,
	},
	{
		name: "W. M. C. Kumara",
		type: "Medical",
		location: "Anuradhapura East",
		contact: "076-6784900",
		description:
			"Elderly person with medical conditions requiring immediate medicine supplies",
		date: "2025-05-10",
		familySize: 1,
	},
];

const dmcApprovedRequests = [
	{
		name: "A. M. Kavindu Perera",
		type: "Food",
		location: "Dehiwala",
		description:
			"Family affected by recent flooding, needs immediate food supplies for 5 family members.",
		dateRequested: "2025-05-18",
		dateApproved: "2025-05-19",
	},
	{
		name: "W. M. C. Priyan",
		type: "Medical",
		location: "Mannar East",
		description:
			"Elderly person with medical conditions requiring  medicine supplies",
		dateRequested: "2025-05-10",
		dateApproved: "2025-05-10",
	},
];

export default function ApproveAidRequests() {
	const navigate = useNavigate();
	const [requests] = useState(dummyRequests);
	const [selected, setSelected] = useState<null | typeof dummyRequests[0]>(
		null
	);
	const [showDmcApproved, setShowDmcApproved] = useState(false);
	const [search, setSearch] = useState("");

	const handleApprove = (idx: number) => {
		alert(`Approved: ${requests[idx].name}`);
	};

	const handleReject = (idx: number) => {
		alert(`Rejected: ${requests[idx].name}`);
	};

	const filteredDmcApproved = dmcApprovedRequests.filter((req) =>
		req.name.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<div className="w-full max-w-4xl mx-auto mt-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow p-8">
			<div className="flex justify-between items-center mb-4">
				<div>
					<h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
						Approve Aid Requests
					</h2>
					<div className="text-blue-700">
						Review and approve pending aid requests
					</div>
				</div>
				<button
					className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold px-4 py-2 rounded-lg shadow hover:scale-105 transition-all"
					onClick={() => setShowDmcApproved(true)}
				>
					View DMC Approved Requests
				</button>
			</div>
			<div className="flex flex-col gap-6">
				{requests.map((req, idx) => (
					<div
						key={idx}
						className="bg-white border border-blue-200 rounded-xl p-6 shadow flex flex-col gap-2"
					>
						<div className="flex flex-col md:flex-row md:justify-between md:items-center">
							<div>
								<span className="font-semibold text-blue-700">{req.name}</span>
								<span className="font-normal"> - {req.type}</span>
							</div>
							<div className="text-sm text-blue-700">
								Date requested : {req.date}
							</div>
						</div>
						<div className="flex flex-wrap gap-4 text-sm">
							<div>
								<span className="font-semibold text-blue-700">Division :</span>{" "}
								{req.location}
							</div>
							<div>
								<span className="font-semibold text-blue-700">Contact No :</span>{" "}
								{req.contact}
							</div>
							<div>
								<span className="font-semibold text-blue-700">Family Size :</span>{" "}
								{req.familySize}
							</div>
						</div>
						<div>
							<span className="font-semibold text-blue-700">Description :</span>{" "}
							{req.description}
						</div>
						<div className="flex gap-4 mt-2">
							<button
								className="border border-blue-500 text-blue-700 rounded px-6 py-2 font-semibold hover:bg-blue-50"
								onClick={() => handleApprove(idx)}
							>
								Approve
							</button>
							<button
								className="border border-purple-500 text-purple-700 rounded px-6 py-2 font-semibold hover:bg-purple-50"
								onClick={() => handleReject(idx)}
							>
								Reject
							</button>
							<button
								className="underline text-blue-600 ml-auto"
								onClick={() => setSelected(req)}
							>
								Details
							</button>
						</div>
					</div>
				))}
			</div>

			{/* Modal for Detailed Aid Request */}
			{selected && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
					<div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full relative overflow-y-auto max-h-[90vh]">
						<h3 className="text-2xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
							Aid Request Details
						</h3>
						<div className="mb-2">
							<b className="text-blue-700">Name:</b> {selected.name}
						</div>
						<div className="mb-2">
							<b className="text-blue-700">Type:</b> {selected.type}
						</div>
						<div className="mb-2">
							<b className="text-blue-700">Division:</b> {selected.location}
						</div>
						<div className="mb-2">
							<b className="text-blue-700">Contact No:</b> {selected.contact}
						</div>
						<div className="mb-2">
							<b className="text-blue-700">Date requested:</b> {selected.date}
						</div>
						<div className="mb-2">
							<b className="text-blue-700">Family Size:</b> {selected.familySize}
						</div>
						<div className="mb-4">
							<b className="text-blue-700">Description:</b> {selected.description}
						</div>
						<div className="flex gap-4 justify-center mt-6">
							<button
								className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full px-8 py-2 font-semibold"
								onClick={() => setSelected(null)}
							>
								CLOSE
							</button>
						</div>
						<button
							className="absolute top-2 right-4 text-gray-500 hover:text-blue-700 text-2xl"
							onClick={() => setSelected(null)}
							aria-label="Close"
						>
							&times;
						</button>
					</div>
				</div>
			)}

			{/* Modal for DMC Approved Requests */}
			{showDmcApproved && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
					<div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full relative overflow-y-auto max-h-[90vh]">
						<h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
							Approved Aid Requests
						</h3>
						<div className="mb-2 text-blue-700">
							Below are aid requests that have been approved by DMC officers
						</div>
						<div className="flex gap-2 mb-4">
							<input
								type="text"
								placeholder="Enter the Requester name"
								className="rounded px-3 py-2 border border-blue-300 flex-1 focus:ring-2 focus:ring-blue-200"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
							<button className="px-3 py-2 bg-blue-100 rounded border border-blue-300 text-blue-700">
								&#128269;
							</button>
						</div>
						<div className="flex flex-col gap-4">
							{filteredDmcApproved.map((req, idx) => (
								<div
									key={idx}
									className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl p-4 flex flex-col gap-2"
								>
									<div className="flex flex-col md:flex-row md:justify-between md:items-center">
										<div>
											<span className="font-semibold text-blue-700">{req.name}</span>
											<span className="font-normal"> - {req.type}</span>
										</div>
										<div className="text-sm text-blue-700">
											Date requested : {req.dateRequested}
										</div>
										<div className="text-sm text-blue-700">
											Date approved : {req.dateApproved}
										</div>
									</div>
									<div className="flex flex-wrap gap-4 text-sm">
										<div>
											<span className="font-semibold text-blue-700">Location :</span>{" "}
											{req.location}
										</div>
									</div>
									<div>
										<span className="font-semibold text-blue-700">Description :</span>{" "}
										{req.description}
									</div>
									<div className="flex justify-end mt-2">
										<button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded px-6 py-2 font-semibold">
											Completed
										</button>
									</div>
								</div>
							))}
							{filteredDmcApproved.length === 0 && (
								<div className="text-center text-gray-500 py-8">
									No approved requests found.
								</div>
							)}
						</div>
						<button
							className="absolute top-2 right-4 text-gray-500 hover:text-blue-700 text-2xl"
							onClick={() => setShowDmcApproved(false)}
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