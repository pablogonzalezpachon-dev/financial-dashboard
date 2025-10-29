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
      <tr className="bg-white border-b border-gray-200">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
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
          <strong className="md:hidden text-black font-normal mr-1 text-green-600">
            Paid:
          </strong>
          {totalPaid} <br />
          <strong className="md:hidden text-black font-normal mr-1 text-red-400 md:hidden">
            Pending: <p className="inline text-gray-500"> {totalPending}</p>
          </strong>
        </td>
        <td className="px-6 py-4 max-md:hidden">
          <strong className="md:hidden text-black font-normal mr-1">
            Pending:
          </strong>
          {totalPending}
        </td>
      </tr>
    </>
  );
}

export default CustomersTableRow;
