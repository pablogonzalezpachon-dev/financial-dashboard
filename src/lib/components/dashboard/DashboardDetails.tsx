import React from "react";
import DashboardDetailCard from "./DashboardDetailCard";
import { PiMoneyLight } from "react-icons/pi";
import { CiClock2 } from "react-icons/ci";
import { BsArchive } from "react-icons/bs";
import { BsPeople } from "react-icons/bs";

type Props = {};

function DashboardDetails({}: Props) {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-3">Dashboard</h1>
      <div className="flex flex-row max-lg:flex-wrap grow gap-x-5 gap-y-5">
        <DashboardDetailCard
          icon={<PiMoneyLight className="mt-1" />}
          title="Collected"
        />
        <DashboardDetailCard
          icon={<CiClock2 className="mt-1" />}
          title="Pending"
        />
        <DashboardDetailCard
          icon={<BsArchive className="mt-1" />}
          title="Total invoices"
        />
        <DashboardDetailCard
          icon={<BsPeople className="mt-1" />}
          title="Total Customers "
        />
      </div>
    </div>
  );
}

export default DashboardDetails;
