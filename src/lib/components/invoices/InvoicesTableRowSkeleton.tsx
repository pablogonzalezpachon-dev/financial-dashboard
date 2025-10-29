import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { LuPencil } from "react-icons/lu";

function InvoicesTableRowSkeleton() {
  return (
    <>
      <tr className="bg-white border-b border-gray-200">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        ></th>
        <td className="px-6 py-4"></td>
        <td className="px-6 py-4"></td>
        <td className="px-6 py-4"></td>
        <td className="px-6 py-4"></td>
        <td className="pl-5 py-4">
          <div className="flex flex-row gap-x-3 justify-end pr-3">
            <button className="border border-gray-300 rounded-md h-10 w-10">
              <LuPencil size="17px" className="m-auto" />
            </button>
            <button className="border border-gray-300 rounded-md h-10 w-10">
              <FaRegTrashCan size="17px" className="m-auto" />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}

export default InvoicesTableRowSkeleton;
