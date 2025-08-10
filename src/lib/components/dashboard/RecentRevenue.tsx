import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
const data = [
  { month: "Jan", amount: 60 },
  { month: "Feb", amount: 20 },
  { month: "Mar", amount: 60 },
  { month: "Apr", amount: 40 },
  { month: "May", amount: 10 },
  { month: "Jun", amount: 20 },
  { month: "Jul", amount: 10 },
  { month: "Aug", amount: 20 },
  { month: "Sep", amount: 10 },
  { month: "Oct", amount: 20 },
  { month: "Nov", amount: 60 },
  { month: "Dec", amount: 20 },
];
const maxValue = 5000;
const test = data.map((item, idx) => (item.amount / maxValue) * 100);
console.log(test);

function RecentRevenue() {
  // Static revenue data

  // Max value for scaling

  return (
    <div className="flex flex-col rounded-xl">
      <h1 className="text-2xl font-semibold mb-3">Recent Revenue</h1>
      <div className="bg-gray-100 p-4 rounded-2xl h-120">
        {/* Chart */}
        <div className="flex items-end px-4 gap-x-2 bg-white rounded-2xl py-6 grow overflow-hidden h-100">
          {data.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center grow">
              <div
                className={`w-full flex bg-red-300 rounded-lg h-${item.amount}`}
              ></div>
              <span className="text-xs mt-2 text-gray-500">{item.month}</span>
            </div>
          ))}
        </div>

        {/* Bottom label */}
        <div className="flex flex-row gap-x-2 ml-5 mt-4 items-center">
          <FaRegCalendarAlt color="gray" />
          <p className="text-gray-500">Last 12 months</p>
        </div>
      </div>
    </div>
  );
}

export default RecentRevenue;
