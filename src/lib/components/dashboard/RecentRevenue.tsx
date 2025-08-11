import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import BarChartHero from "./BarChartHero";
import { queryRevenue, Revenue } from "@/lib/utils/supabase/serverQueries";

async function RecentRevenue() {
  // Static revenue data
  const { data: revenueData, error } = await queryRevenue();

  const revenue: Revenue[] =
    revenueData?.map((item) => ({
      month: item.month,
      revenue: item.revenue ?? 0,
    })) ?? [];

  console.log(revenue);
  // Max value for scaling

  return (
    <div className="flex flex-col rounded-xl">
      <h1 className="text-2xl font-semibold mb-3">Recent Revenue</h1>
      <div className="bg-gray-100 p-4 rounded-2xl h-120">
        {/* Chart */}
        <div className="flex items-end px-4 gap-x-2 bg-white rounded-2xl py-6 grow overflow-hidden h-100">
          <BarChartHero revenue={revenue.reverse()} />
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
