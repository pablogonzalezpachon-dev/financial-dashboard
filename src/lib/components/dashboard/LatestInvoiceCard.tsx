import { queryLatestInvoices } from "@/lib/utils/supabase/serverQueries";
import Image from "next/image";
import React from "react";

type Props = { img: string; name: string; email: string; amount: string };

function LatestInvoiceCard({ img, name, email, amount }: Props) {
  return (
    <>
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-md font-semibold text-gray-900">{name}</p>
          <p className="mt-1 truncate text-sm text-gray-500">{email}</p>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end my-auto">
        <p className="text-md text-gray-900">{amount}</p>
      </div>
    </>
  );
}

export default LatestInvoiceCard;
