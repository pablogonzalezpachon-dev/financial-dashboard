import { PostgrestError } from "@supabase/supabase-js";
import { createClient } from "./client";

export type Invoice = {
  customer_name: string;
  customer_email: string;
  customer_photo: string;
  creation_date: string;
  amount: number;
  status: string;
  invoice_id: number;
};

export async function queryInvoices(
  page: number,
  search: string
): Promise<{
  data: Invoice[] | null;
  error: PostgrestError | null;
}> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("queryinvoices", { page, search });
  return { data, error };
}

export async function deleteInvoice(id: number): Promise<{
  error: PostgrestError | null;
}> {
  const supabase = await createClient();
  const { error } = await supabase.rpc("deleteinvoice", { invoiceid: id });
  return { error };
}

export type Customer = {
  customer_name: string;
  customer_email: string;
  total_invoices: number;
  total_paid: number;
  total_pending: number;
  customer_id: number;
};

export async function queryCustomers(search: string): Promise<{
  data: Customer[] | null;
  error: PostgrestError | null;
}> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("querycustomers", { search });
  return { data, error };
}

export type singleInvoice = {
  customer: number;
  amountusd: number;
  invoice_status: string;
};

export async function querySingleInvoice(invoice_id: number): Promise<{
  data: singleInvoice[] | null;
  error: PostgrestError | null;
}> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("query_single_invoice", {
    invoice_id,
  });
  console.log(data);
  console.log(error);

  return { data, error };
}
