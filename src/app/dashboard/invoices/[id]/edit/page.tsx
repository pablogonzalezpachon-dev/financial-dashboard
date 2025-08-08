"use client";
import LoadingSpinner from "@/lib/components/LoadingSpinner";
import {
  Customer,
  queryCustomers,
  querySingleInvoice,
  singleInvoice,
} from "@/lib/utils/supabase/clientQueries";
import { formSchema } from "@/lib/utils/validationSchema";
import Form from "next/form";
import { redirect, useParams, useRouter } from "next/navigation";
import React, { use } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { CiMoneyBill } from "react-icons/ci";
import { IoPersonCircleOutline } from "react-icons/io5";
import z from "zod";

import { editInvoice } from "@/lib/utils/supabase/serverActions";
import { getZodErrors } from "@/lib/utils/functions";
import { createClient, validateClientUser } from "@/lib/utils/supabase/client";

function EditInvoicePage() {
  const supabase = createClient();

  const router = useRouter();
  const params = useParams();
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [customers, setCustomers] = useState<Customer[]>();
  const [invoiceData, setInvoiceData] = useState<singleInvoice[]>();
  const [loading, setLoading] = useState<boolean>();

  async function editPost(formData: FormData) {
    const data = Object.fromEntries(formData.entries());
    const today = new Date().toISOString().split("T")[0];
    console.log(data);
    try {
      formSchema.parse(data);
      setFormErrors({});
      const { error } = await editInvoice(
        parseInt(data.customer as string),
        parseInt(data.USD_amount as string),
        data.invoice_status as string,
        Number(params.id)
      );
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = getZodErrors(error);
        setFormErrors(errors);
      }
    }
  }

  useEffect(() => {
    async function validate() {
      await validateClientUser();
    }
    validate();

    async function fetchData() {
      setLoading(true);
      const customersPromise = queryCustomers("");
      const singleInvoicePromise = querySingleInvoice(Number(params.id));

      const [customersFetched, singleInvoceFetched] = await Promise.all([
        customersPromise,
        singleInvoicePromise,
      ]);

      const { data: customersData, error: customersError } = customersFetched;
      const { data: singleInvoiceData, error: singleInvoiceError } =
        singleInvoceFetched;

      if (customersData) {
        setCustomers(customersData);
      }

      if (singleInvoiceData) {
        setInvoiceData(singleInvoiceData);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-semibold mb-3">Invoices / Edit Invoice</h1>
      {!loading ? (
        <Form
          action={editPost}
          className="bg-gray-100 p-7 flex flex-col gap-y-8 rounded-md"
        >
          <div className="flex flex-col gap-y-2">
            <label htmlFor="customerDropdown">Choose customer</label>
            <div className="hover:border hover:border-red-400 hover:border-2 rounded-md flex flex-row h-10 gap-x-2 pl-3 pr-2 bg-white">
              <IoPersonCircleOutline
                color="gray"
                size="20"
                className="my-auto"
              />
              <select
                name="customer"
                id="customerDropdown"
                defaultValue={`${invoiceData?.[0]?.customer}`}
                className="w-full focus:outline-none"
              >
                <option disabled value="" className="text-gray-300">
                  Select a customer
                </option>
                {customers?.map((c) => (
                  <option key={c.customer_id} value={c.customer_id}>
                    {c.customer_name}
                  </option>
                ))}
              </select>
            </div>
            {formErrors["customer"] && (
              <span className="text-red-700">Required Field</span>
            )}
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="USD_amount">Choose an amount</label>
            <div className="flex flex-row gap-x-2 pl-3 h-10 hover:border hover:border-red-400 hover:border-2 bg-white rounded-md">
              <CiMoneyBill color="gray" size="20" className="my-auto" />
              <input
                name="USD_amount"
                id="USD_amount"
                type="number"
                step="0.01"
                min="0"
                placeholder={"Enter USD amount"}
                className="focus:outline-none w-full"
                defaultValue={invoiceData?.[0]?.amountusd ?? ""}
              />
            </div>
            {formErrors["USD_amount"] && (
              <span className="text-red-700">Required Field</span>
            )}
          </div>
          <div className="flex flex-col gap-y-2">
            <label>Set the invoice status</label>
            <fieldset className="flex flex-row gap-x-4 h-10 bg-white rounded-md py-2 pl-4">
              <div className="py-auto">
                <input
                  defaultChecked={invoiceData?.[0]?.invoice_status == "Pending"}
                  type="radio"
                  id="pending"
                  name="invoice_status"
                  value="Pending"
                  className="mr-2"
                />
                <label htmlFor="pending">Pending</label>
              </div>

              <div>
                <input
                  defaultChecked={invoiceData?.[0]?.invoice_status === "Paid"}
                  type="radio"
                  id="paid"
                  name="invoice_status"
                  value="Paid"
                  className="mr-2"
                />
                <label htmlFor="paid">Paid</label>
              </div>
            </fieldset>
          </div>
          <div className=" h-15 flex flex-row justify-end gap-x-4">
            <LoadingSpinner />
            <button
              type="button"
              onClick={() => {
                router.back();
              }}
              className="h-10 p-2 rounded-md bg-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-10 p-2 rounded-md bg-red-400 text-white"
            >
              Edit Invoice
            </button>
          </div>
        </Form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default EditInvoicePage;
