"use server";
import { redirect } from "next/navigation";
import { createClient } from "./server";
import { revalidatePath } from "next/cache";

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

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    return { error };
  }
  revalidatePath("/dashboard", "layout");
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { error } = await supabase.auth.signUp(data);
  console.log(error);
  if (error) {
    console.log(error);
    return { error };
  }

  revalidatePath("/dashboard", "layout");
  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  console.log("signed out");
  redirect("/login");
}
