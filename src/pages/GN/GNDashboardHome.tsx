import React from "react";

export default function GNDashboardHome() {
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
        Greetings <span className="text-blue-700">Mr.Nisal Ekanayaka</span> !!
      </h1>
      <div className="text-lg md:text-2xl text-blue-700 mb-8 text-center">
        2025.05.30 &nbsp;|&nbsp; Welegoda East
      </div>
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 shadow p-8 flex flex-col items-center w-full">
          <span className="text-xl md:text-2xl text-blue-700 text-center mb-2">
            Total Pending Reports
          </span>
          <span className="text-3xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            3
          </span>
          <span className="mt-2 text-base md:text-lg text-blue-700 text-center">
            Review Reports
          </span>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 shadow p-8 flex flex-col items-center w-full">
          <span className="text-xl md:text-2xl text-blue-700 text-center mb-2">
            Pending Aid Requests
          </span>
          <span className="text-3xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            2
          </span>
          <span className="mt-2 text-base md:text-lg text-blue-700 text-center">
            Approve Aid
          </span>
        </div>
      </div>
      <div className="w-full max-w-2xl grid grid-cols-1 gap-8">
        <div className="rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 shadow p-8 flex flex-col items-center w-full">
          <span className="text-2xl md:text-3xl font-semibold text-blue-700 text-center">
            Recent Activity Log
          </span>
        </div>
      </div>
    </div>
  );
}