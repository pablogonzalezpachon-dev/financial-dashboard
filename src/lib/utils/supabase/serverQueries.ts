import { createClient } from "@/lib/utils/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";
import { unstable_noStore as noStore } from "next/cache";

export async function queryDashboardDetails() {
  noStore();
  const supabase = await createClient();
  const collectedAndPendingQuery = supabase.from("invoices").select(
    `
    amount.sum(),
    status
    `
  );
  const amountOfInvoicesQuery = supabase.from("invoices").select("id.count()");
  const amountofCustomersQuery = supabase
    .from("customers")
    .select("id.count()");

  const [collectedAndPending, amountOfInvoices, amountofCustomers] =
    await Promise.all([
      collectedAndPendingQuery,
      amountOfInvoicesQuery,
      amountofCustomersQuery,
    ]);

  const { data: collectedAndPendingData, error: collectedAndPendingError } =
    collectedAndPending;
  const { data: amountOfInvoicesData, error: amountOfInvoicesError } =
    amountOfInvoices;
  const { data: amountofCustomersData, error: amountofCustomersError } =
    amountofCustomers;

  return {
    collectedAndPendingData,
    amountOfInvoicesData,
    amountofCustomersData,
    collectedAndPendingError,
    amountOfInvoicesError,
    amountofCustomersError,
  };
}

type LatestInvoice = {
  customer_name: string;
  customer_email: string;
  customer_photo: string;
  amount: number;
  invoice_id: number;
};

export async function queryLatestInvoices(): Promise<{
  data: LatestInvoice[] | null;
  error: PostgrestError | null;
}> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("get_latest_invoices");
  return { data, error };
}

type amountOfInvoices = {
  amount_of_pages: number;
};

export async function queryAmountOfPages(search: string): Promise<{
  data: amountOfInvoices[] | null;
  error: PostgrestError | null;
}> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("queryamountofpages", { search });
  return { data, error };
}

export type Invoice = {
  customer_name: string;
  customer_email: string;
  customer_photo: string;
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
  noStore();
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("queryinvoices", { page, search });
  return { data, error };
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

export type Revenue = {
  month: string;
  revenue: number;
};

export async function queryRevenue(): Promise<{
  data: Revenue[] | null;
  error: PostgrestError | null;
}> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("query_revenue");
  return { data, error };
}
