import React from "react";
import LatestInvoiceCard from "./LatestInvoiceCard";
import { queryLatestInvoices } from "@/lib/utils/supabase/serverQueries";

async function LatestInvoices() {
  const { data, error } = await queryLatestInvoices();
  console.log(data);
  console.log(error);

  return (
    <div className="flex flex-col rounded-xl">
      <h1 className="text-2xl font-semibold mb-3">Latest Invoices</h1>
      <div className="bg-gray-100 h-120 w-fill rounded-2xl ">
        <div className="mt-4 w-fill mx-4 bg-white px-6">
          <ul role="list" className="divide-y divide-gray-100">
            {data &&
              data.map((c) => (
                <li
                  key={c.invoice_id}
                  className="flex justify-between gap-x-6 py-5"
                >
                  <LatestInvoiceCard
                    img={c.customer_photo}
                    name={c.customer_name}
                    email={c.customer_email}
                    amount={`$ ${c.amount}`}
                  />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LatestInvoices;
