"use client";

import React from "react";
import { BarChart, TooltipProps } from "./BarChart";
import { Revenue } from "@/lib/utils/supabase/serverQueries";

interface DataItem {
  date: string;
  revenue: number;
}

const data: DataItem[] = [
  //array-start
  {
    date: "Jan 23",
    revenue: 2340,
  },
  {
    date: "Feb 23",
    revenue: 3110,
  },
  {
    date: "Mar 23",
    revenue: 4643,
  },
  {
    date: "Apr 23",
    revenue: 4650,
  },
  {
    date: "May 23",
    revenue: 3980,
  },
  {
    date: "Jun 23",
    revenue: 4702,
  },
  {
    date: "Jul 23",
    revenue: 5990,
  },
  {
    date: "Aug 23",
    revenue: 5700,
  },
  {
    date: "Sep 23",
    revenue: 4250,
  },
  {
    date: "Oct 23",
    revenue: 4182,
  },
  {
    date: "Nov 23",
    revenue: 3812,
  },
  {
    date: "Dec 23",
    revenue: 4900,
  },
  //array-end
];
type Props = {
  revenue: Revenue[];
};

export default function BarChartHero({ revenue }: Props) {
  const [datas, setDatas] = React.useState<TooltipProps | null>(null);
  const latestProps = React.useRef<TooltipProps | null>(null);

  const currencyFormatter = (number: number) =>
    `$${Intl.NumberFormat("en-US").format(number)}`;

  const payload = datas?.payload?.[0];
  const value = payload?.value;

  const formattedValue = payload
    ? currencyFormatter(value as number)
    : currencyFormatter(data[0].revenue);

  return (
    <div className="w-full">
      <p className="text-sm text-gray-700 dark:text-gray-300">
        Revenue by month
      </p>

      <BarChart
        colors={["red"]}
        data={revenue}
        index="month"
        categories={["revenue"]}
        showLegend={false}
        showYAxis={false}
        startEndOnly={true}
        className="-mb-2 mt-8 h-80 grow"
      />
    </div>
  );
}
