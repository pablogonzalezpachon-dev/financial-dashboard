import { useDebouncedCallback } from "use-debounce";
import InvoicesSearchBar from "@/lib/components/invoices/InvoicesSearchBar";
import InvoicesTable from "@/lib/components/invoices/InvoicesTable";
import Pagination from "@/lib/components/invoices/Pagination";
import {
  queryAmountOfPages,
  queryInvoices,
} from "@/lib/utils/supabase/serverQueries";
import React, { Suspense } from "react";

type Props = {
  searchParams?: {
    page?: string;
    query?: string;
  };
};

async function InvoicesPage({ searchParams }: Props) {
  const searchParamsFetched = await searchParams;
  const currentPage = Number(searchParamsFetched?.page) || 1;
  const searchQuery = searchParamsFetched?.query || "";
  const { data: numberOfPagesFetched, error } = await queryAmountOfPages(
    searchQuery
  );
  const numberOfPages = numberOfPagesFetched
    ? numberOfPagesFetched[0].amount_of_pages
    : 0;

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-semibold mb-3">Invoices</h1>
      <InvoicesSearchBar />
      <InvoicesTable />
      <Pagination pages={numberOfPages} />
    </div>
  );
}

export default InvoicesPage;
