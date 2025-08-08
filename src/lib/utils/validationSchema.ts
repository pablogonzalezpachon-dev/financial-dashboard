import { z } from "zod";

export const formSchema = z.object({
  customer: z.string().min(1, "Required Field"),

  USD_amount: z.coerce.number().min(1, "Required Field"),

  invoice_status: z.string().min(1, "Required Field"),
});

export const userSchema = z.object({
  email: z.email("Invalid Email").min(1, "Required Field"),
  password: z.string().min(1, "Required Field"),
});
