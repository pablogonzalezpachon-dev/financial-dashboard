"use server";
import { redirect } from "next/navigation";
import { createClient } from "./server";

export async function createInvoice(
  customer: number,
  amount_USD: number,
  invoice_status: string,
  creation_date: string
) {
  const supabase = await createClient();
  const { error } = await supabase.rpc("addinvoice", {
    customer,
    amount_usd: amount_USD,
    invoice_status,
    creation_date,
  });
  if (error) {
    return { error };
  } else {
    redirect("/dashboard/invoices");
  }
}

export async function editInvoice(
  customer: number,
  amount_USD: number,
  invoice_status: string,
  invoice_id: number
) {
  const supabase = await createClient();
  const { error } = await supabase.rpc("edit_invoice", {
    customer,
    amount_usd: amount_USD,
    invoice_status,
    invoice_id,
  });

  if (error) {
    return { error };
  } else {
    redirect("/dashboard/invoices");
  }
}
