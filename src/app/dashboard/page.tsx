import DashboardDetails from "@/lib/components/dashboard/DashboardDetails";
import LatestInvoices from "@/lib/components/dashboard/LatestInvoices";
import RecentRevenue from "@/lib/components/dashboard/RecentRevenue";
import React from "react";

type Props = {};

function dashboard({}: Props) {
  return (
    <div className="grid lg:grid-rows-2 lg:grid-cols-2 md:grid-rows-1 md:grid-cols-1">
      <div className="lg:col-span-2">
        <DashboardDetails />
      </div>
      <div className="border">
        <RecentRevenue />
      </div>
      <div className="border">
        <LatestInvoices />
      </div>
    </div>
  );
}

export default dashboard;
