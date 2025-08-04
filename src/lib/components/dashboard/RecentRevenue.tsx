import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";

function RecentRevenue() {
  return (
    <div className="flex flex-col rounded-xl">
      <h1 className="text-2xl font-semibold mb-3">Recent Revenue</h1>
      <div className="bg-gray-100 h-120 w-fill rounded-2xl ">
        <div className="h-100 mt-4 w-fill mx-4 bg-white rounded-2xl "></div>

        <div className="flex flex-row gap-x-2 ml-5 mt-4">
          <FaRegCalendarAlt color="gray" className="mt-1" />
          <p className="text-gray-500">Last 12 months</p>
        </div>
      </div>
    </div>
  );
}

export default RecentRevenue;
