import DashboardDetails from "@/lib/components/dashboard/DashboardDetails";
import LatestInvoices from "@/lib/components/dashboard/LatestInvoices";
import RecentRevenue from "@/lib/components/dashboard/RecentRevenue";
import React from "react";

function dashboard() {
  return (
    <div className="grid lg:grid-rows-[auto_1fr] lg:grid-cols-2 md:grid-rows-1 md:grid-cols-1 gap-x-5">
      <div className="lg:col-span-2">
        <DashboardDetails />
      </div>
      <div className="mt-6">
        <RecentRevenue />
      </div>
      <div className="mt-6">
        <LatestInvoices />
      </div>
    </div>
  );
}

export default dashboard;
