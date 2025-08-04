import Navbar from "@/lib/components/Navbar/Navbar";
import { playwrite_AU_QLD } from "@/lib/styles/fonts";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function DashboardLayout({ children }: Props) {
  return (
    <div className="grid md:grid-cols-[250px_1fr]">
      <div className="">
        <Navbar />
      </div>
      <div className="md:p-10 p-5">{children}</div>
    </div>
  );
}

export default DashboardLayout;
