"use client";
import { Suspense, useEffect, useState } from "react";
import InvoicesTableRow from "./InvoicesTableRow";
import { Invoice } from "@/lib/utils/supabase/clientQueries";
import { queryInvoices } from "@/lib/utils/supabase/clientQueries";
import { useSearchParams } from "next/navigation";
import InvoicesTableRowSkeleton from "./InvoicesTableRowSkeleton";

function InvoicesTable() {
  const queryParams = useSearchParams();
  const page = parseInt(queryParams.get("page") ?? "1");
  const query = queryParams.get("query") ?? "";
  const deleteState = queryParams.get("delete");

  const [pageData, setPageData] = useState<Invoice[] | null>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data, error } = await queryInvoices(page, query);
      setPageData(data);
      setLoading(false);
    }
    fetchData();
  }, [page, query, deleteState]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 p-2 bg-gray-50">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="max-md:hidden text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Customer
            </th>
            <th scope="col" className="px-6 py-3 overflow-hidden text-ellipsis">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-15 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            pageData?.map((i) => (
              <InvoicesTableRow
                key={i.invoice_id}
                name={i.customer_name}
                email={i.customer_email}
                amount={i.amount}
                status={i.status}
                id={i.invoice_id}
                date={i.creation_date}
              />
            ))
          ) : (
            <>
              <InvoicesTableRowSkeleton />
              <InvoicesTableRowSkeleton />
              <InvoicesTableRowSkeleton />
              <InvoicesTableRowSkeleton />
              <InvoicesTableRowSkeleton />
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default InvoicesTable;
