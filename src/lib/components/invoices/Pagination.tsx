"use client";
import { getVisiblePages } from "@/lib/utils/functions";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

type Props = {
  pages: number;
};

function Pagination({ pages }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  const goToPage = (page: number) => {
    window.history.pushState(null, "", createPageURL(page));
  };

  const auxArr: number[] = [];
  for (let index = 1; index <= pages; index++) {
    auxArr.push(index);
  }

  const generatedPages = getVisiblePages(currentPage, pages);

  return (
    <div className="flex flex-row mx-auto mt-5">
      <button
        className={`h-10 w-10 border border-gray-300 hover:bg-gray-200 mx-auto rounded-lg mr-5 disabled:opacity-25`}
        disabled={currentPage <= 1 || auxArr.length === 0}
        onClick={() => {
          window.history.pushState(null, "", createPageURL(currentPage - 1));
        }}
      >
        <FaArrowLeft className="mx-auto" />
      </button>

      {generatedPages.map((page, idx) =>
        page === "..." ? (
          <button
            key={`ellipsis-${idx}`}
            className="h-10 w-10 border border-gray-300"
          >
            ...
          </button>
        ) : (
          <button
            key={`page-${page}`}
            className={`h-10 w-10 border border-gray-300 ${
              currentPage === page
                ? "bg-red-400 text-white"
                : "hover:bg-gray-200"
            } ${idx === 0 ? "rounded-l-lg" : ""}
              ${idx === generatedPages.length - 1 ? "rounded-r-lg" : ""}
              ${
                idx === 0 && generatedPages.length === 1 ? "rounded-r-lg" : ""
              }`}
            onClick={() => goToPage(page)}
            disabled={currentPage === page}
          >
            {page}
          </button>
        )
      )}
      <button
        className="h-10 w-10 border border-gray-300 hover:bg-gray-200 mx-auto rounded-lg ml-5 disabled:opacity-25"
        disabled={currentPage >= pages || auxArr.length === 0}
        onClick={() => {
          window.history.pushState(null, "", createPageURL(currentPage + 1));
        }}
      >
        <FaArrowRight className="mx-auto" />
      </button>
    </div>
  );
}

export default Pagination;
