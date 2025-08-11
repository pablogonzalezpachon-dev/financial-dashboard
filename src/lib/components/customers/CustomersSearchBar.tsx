"use client";

import React from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

function CustomersSearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleChange = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
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
            className="block border-none min-w-0 grow py-2.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
            onChange={(e) => {
              handleChange(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CustomersSearchBar;
