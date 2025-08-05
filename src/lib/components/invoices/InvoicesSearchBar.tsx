"use client";
import React from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import Link from "next/link";

function InvoicesSearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleChange = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    <div>
      <div className="mt-2 flex flex-row gap-x-2">
        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600 grow">
          <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
            <HiMagnifyingGlass
              aria-hidden="true"
              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
            />
          </div>
          <input
            type="text"
            placeholder="Search invoices..."
            className="block min-w-0 grow py-2.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
            onChange={(e) => {
              handleChange(e.target.value);
            }}
          />
        </div>
        <Link
          href="/dashboard/invoices/create"
          className="bg-red-400 h-fill md:w-45 w-15 rounded-md "
        >
          <div className="flex flex-row gap-x-4 ml-5 max-md:ml-5.5 mt-2.5">
            <p className="text-white max-md:hidden">Create Invoice</p>
            <FaPlus color="white" className="mt-1" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default InvoicesSearchBar;
