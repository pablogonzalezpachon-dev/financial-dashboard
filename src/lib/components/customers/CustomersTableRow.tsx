import React from "react";

type Props = {
  name: string;
  email: string;
  totalInvoices: number;
  totalPaid: number;
  totalPending: number;
};

function CustomersTableRow({
  name,
  email,
  totalInvoices,
  totalPaid,
  totalPending,
}: Props) {
  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {name} <br />{" "}
          <p className="md:hidden text-xs text-gray-500">
            Invoices: {totalInvoices}
          </p>
        </th>
        <td className="px-6 py-4 max-md:hidden">{email}</td>
        <td className="px-6 py-4 max-md:hidden">
          <strong
            className="md:hidden text-black font-normal mr-1
"
          >
            Invoices:
          </strong>
          {totalInvoices}
        </td>
        <td className="px-6 py-4 max-md:px-1">
          <strong
            className="md:hidden text-black font-normal mr-1
"
          >
            Paid:
          </strong>
          {totalPaid}
        </td>
        <td className="px-6 py-4">
          <strong
            className="md:hidden text-black font-normal mr-1
"
          >
            Pending:
          </strong>
          {totalPending}
        </td>
      </tr>
    </>
  );
}

export default CustomersTableRow;
