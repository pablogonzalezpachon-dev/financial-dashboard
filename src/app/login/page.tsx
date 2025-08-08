"use client";

import LoadingSpinner from "@/lib/components/LoadingSpinner";
import { playwrite_AU_QLD } from "@/lib/styles/fonts";
import { getZodErrors } from "@/lib/utils/functions";
import { login } from "@/lib/utils/supabase/serverActions";
import { userSchema } from "@/lib/utils/validationSchema";
import { AuthError } from "@supabase/supabase-js";
import Link from "next/link";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { DiAtom } from "react-icons/di";
import { FaArrowRight } from "react-icons/fa";
import z from "zod";

export default function LoginPage() {
  const status = useFormStatus();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<AuthError>();

  async function Login(formData: FormData) {
    const data = Object.fromEntries(formData.entries());
    setFormError(undefined);
    try {
      userSchema.parse(data);
      setFieldErrors({});
      const { error } = await login(formData);
      if (error) {
        console.log(error.message);
        setFormError(error);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = getZodErrors(error);
        setFieldErrors(errors);
      }
    }
  }
  console.log(status.pending);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" p-5 flex flex-col gap-y-3">
        <div className="h-40 bg-red-400 flex flex-row items-end rounded-lg pl-5">
          <DiAtom size="60" color="white" className="mb-3 md:mb-4" />
          <p
            className={`${playwrite_AU_QLD.className} text-white text-5xl mb-4 md:mb-5 `}
          >
            Acme
          </p>
        </div>
        <form
          action={Login}
          className="flex flex-col bg-gray-100 rounded-lg gap-y-5 px-7 py-7"
        >
          <p className="font-semibold text-center text-2xl">
            Please log in to continue
          </p>
          <div className="flex flex-col gap-y-3">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              className="bg-white h-10 rounded-md pl-4"
              placeholder="Enter your email address"
            />
            {fieldErrors["email"] && (
              <span className="text-red-700">{fieldErrors["email"]}</span>
            )}
          </div>
          <div className="flex flex-col gap-y-3">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="bg-white h-10 rounded-md pl-4"
              placeholder="Enter your password"
            />
            {fieldErrors["password"] && (
              <span className="text-red-700">{fieldErrors["password"]}</span>
            )}
          </div>
          <button type="submit" className=" bg-red-400 h-10 rounded-lg mt-4">
            <div className="flex flex-row justify-between gap-x-80 text-white pr-3">
              <p className="w-20">Log in</p>
              <FaArrowRight size="20" className="my-auto" />
            </div>
          </button>

          <LoadingSpinner message={formError?.message} />
          <Link href="/signup" className="text-center text-red-600">
            Don't have an account? Sign up!
          </Link>
        </form>
      </div>
    </div>
  );
}
