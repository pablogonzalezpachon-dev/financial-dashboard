import React from "react";
import CustomersTableRow from "./CustomersTableRow";
import { queryCustomers } from "@/lib/utils/supabase/serverQueries";

type Props = {
  query: string;
};

async function CustomersTable({ query }: Props) {
  const { data: customers, error } = await queryCustomers(query);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 p-2 bg-gray-50 ">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="max-md:hidden text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Total Invoices
            </th>
            <th scope="col" className="px-6 py-3">
              Total Pending
            </th>
            <th scope="col" className="px-6 py-3">
              Total Paid
            </th>
          </tr>
        </thead>
        <tbody>
          {customers?.map((c) => (
            <CustomersTableRow
              key={c.customer_id}
              name={c.customer_name}
              email={c.customer_email}
              totalInvoices={c.total_invoices}
              totalPaid={c.total_paid}
              totalPending={c.total_pending}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomersTable;
