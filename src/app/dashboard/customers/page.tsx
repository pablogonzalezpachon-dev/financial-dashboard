import CustomersSearchBar from "@/lib/components/customers/CustomersSearchBar";
import CustomersTable from "@/lib/components/customers/CustomersTable";
import React, { Suspense } from "react";

type Props = {
  searchParams?: Promise<{
    query?: string;
  }>;
};

async function customersPage({ searchParams }: Props) {
  const searchParamsFetched = await searchParams;
  const searchQuery = searchParamsFetched?.query || "";
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-semibold mb-3">Customers</h1>
      <CustomersSearchBar />
      <CustomersTable query={searchQuery} />
    </div>
  );
}

export default customersPage;
