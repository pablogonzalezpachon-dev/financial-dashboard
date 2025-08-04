import { playwrite_AU_QLD } from "@/lib/styles/fonts";
import { DiAtom } from "react-icons/di";
import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { BsPeople } from "react-icons/bs";
import { LiaPowerOffSolid } from "react-icons/lia";
import Link from "next/link";

function Navbar() {
  return (
    <div className=" md:fixed flex flex-col md:w-[250px] h-40 md:h-screen gap-y-3 bg-white p-3 ">
      <div className="flex flex-row h-20 md:w-55 md:h-[160px] rounded-md bg-red-400 items-end pl-5">
        <DiAtom size="50" color="white" className="mb-3 md:mb-4" />
        <p
          className={`${playwrite_AU_QLD.className} text-white text-4xl mb-4 md:mb-5 `}
        >
          Acme
        </p>
      </div>

      <div className="flex grow gap-x-2 md:flex-col md:gap-y-3 ">
        <Link href="/dashboard" className="max-md:grow">
          <div className="flex flex-row grow h-12 justify-center items-center bg-gray-100 gap-x-1.5 md:pl-2 rounded-md md:w-55 md:grow-0 md:justify-start">
            <AiOutlineHome size="20" />
            <p className="hidden md:block">Home</p>
          </div>
        </Link>
        <Link href="/dashboard/invoices" className="max-md:grow">
          <div className="flex flex-row grow h-12 justify-center items-center bg-gray-100 gap-x-1.5 md:pl-2 rounded-md md:w-55 md:grow-0 md:justify-start">
            <LiaFileInvoiceSolid size="20" />
            <p className="hidden md:block">Invoices</p>
          </div>
        </Link>

        <Link href="/dashboard/customers" className="max-md:grow">
          <div className="flex flex-row grow h-12 justify-center items-center bg-gray-100 gap-x-1.5 md:pl-2 rounded-md md:w-55 md:grow-0 md:justify-start">
            <BsPeople size="20" />
            <p className="hidden md:block">Customers</p>
          </div>
        </Link>
        <div className="hidden md:grow md:block bg-gray-100 rounded-md md:w-55"></div>
        <div className="flex flex-row h-12 w-15 justify-center items-center bg-gray-100 gap-x-1.5 md:pl-2 rounded-md md:grow-0 md:w-55 md:justify-start">
          <LiaPowerOffSolid size="20" />
          <p className="hidden md:block">Sign out</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
