import React, { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  data: string;
};

export default async function DashboardDetailCard({
  title,
  icon,
  data,
}: Props) {
  return (
    <div className="flex flex-col gap-y-3 h-40 max-lg:w-64 bg-gray-100 rounded-xl grow pl-2 pr-2">
      <div className="flex flex-row gap-x-2 mt-4 ml-5">
        {icon}
        <p>{title}</p>
      </div>
      <div className="flex h-25 w-full bg-white mx-auto rounded-xl">
        <p className="m-auto text-2xl font-semibold">{data}</p>
      </div>
    </div>
  );
}
