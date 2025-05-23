import React from "react";

export default function DashboardHome() {
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="font-extrabold text-xl sm:text-3xl md:text-5xl lg:text-6xl mb-10 text-center md:text-center">
        Greetings <span className="text-blue-700">Example Name</span> !!
      </h1>
      <div className="w-full max-w-5xl flex flex-col items-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="rounded-2xl bg-white shadow p-8 flex flex-col items-center w-full">
            <span className="text-base sm:text-lg md:text-2xl text-gray-600 text-center md:text-center">Total Contributions</span>
            <span className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-blue-700 text-center md:text-center">3</span>
          </div>
          <div className="rounded-2xl bg-white shadow p-8 flex flex-col items-center w-full">
            <span className="text-base sm:text-lg md:text-2xl text-gray-600 text-center md:text-center">Latest Contribution</span>
            <span className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-purple-600 text-center md:text-center">Rescue</span>
          </div>
        </div>
        <div className="rounded-2xl bg-white shadow p-8 flex flex-col items-center w-full max-w-xs mx-auto">
          <span className="text-base sm:text-lg md:text-2xl text-gray-600 mb-2 text-center md:text-center">Volunteer Rank</span>
          <span className="inline-flex items-center gap-2 text-xl sm:text-2xl md:text-3xl font-extrabold text-yellow-500 text-center md:text-center">
            <svg className="w-7 h-7 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2l2.39 4.84 5.34.78-3.87 3.77.91 5.33L10 14.77l-4.77 2.51.91-5.33-3.87-3.77 5.34-.78z" />
            </svg>
            GOLD
          </span>
        </div>
      </div>
    </div>
  );
}