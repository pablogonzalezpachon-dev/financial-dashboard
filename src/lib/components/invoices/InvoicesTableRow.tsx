"use client";
import React, { useState } from "react";
import { LuPencil } from "react-icons/lu";
import { FaRegTrashCan } from "react-icons/fa6";
import { deleteInvoice } from "@/lib/utils/supabase/clientQueries";
import InvoicesTableRowSkeleton from "./InvoicesTableRowSkeleton";
import { usePathname } from "next/navigation";
import Link from "next/link";

type Props = {
  name: string;
  email: string;
  amount: number;
  status: string;
  date: string;
  id: number;
};

const formatDate = (date: string) => {
  const isoDate = date;
  const [year, month, day] = isoDate.split("-");
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};

function InvoicesTableRow({ name, email, amount, status, date, id }: Props) {
  const pathname = usePathname();
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async (id: number) => {
    setLoading(true);
    const { error } = await deleteInvoice(id);
    const updatedParams = new URLSearchParams(window.location.search);
    updatedParams.set("delete", `${name + id}`);
    const updatedUrl = `${
      window.location.pathname
    }?${updatedParams.toString()}`;

    window.history.pushState(null, "", `${updatedUrl}`);
    console.log(error, "clicked");
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <InvoicesTableRowSkeleton />
      ) : (
        <tr className="bg-white border-b border-gray-200">
          <th
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
          >
            {name}
          </th>
          <td className="px-6 py-4 max-md:hidden">{email}</td>
          <td className="px-6 py-4">{`$${amount}`}</td>
          <td className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis">
            {formatDate(date)}
          </td>
          <td className="px-6 py-4">{status}</td>
          <td className="pl-5 py-4">
            <div className="flex flex-row gap-x-3 justify-end pr-3">
              <Link
                href={`/dashboard/invoices/${id}/edit`}
                className="border border-gray-300 rounded-md h-10 w-10"
              >
                <LuPencil size="17px" className="m-auto mt-2.5" />
              </Link>
              <button
                className="border border-gray-300 rounded-md h-10 w-10"
                onClick={() => {
                  handleDelete(id);
                }}
              >
                <FaRegTrashCan size="17px" className="m-auto" />
              </button>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default InvoicesTableRow;
