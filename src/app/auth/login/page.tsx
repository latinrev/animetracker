"use client";
import { loginFields, registerFields } from "@/fields/authFields";
import { GenericField } from "@/types/GenericField";
import { buildInputs } from "@/utils/utils";
import { users } from "@prisma/client";
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function Login({}) {
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState("");
  const executeAction = (formData: any) => {
    startTransition(async () => {
      setErrors("");
      const user = Object.fromEntries(formData.entries()) as users;
      const res = await signIn("credentials", { redirect: false, from: "/login", callbackUrl: "/", ...user });
      if (res?.error) {
        setErrors("Email or password do not match");
      } else {
        redirect("/");
      }
    });
  };

  return (
    <form className={`flex flex-col text-white justify-center items-center `} action={executeAction}>
      {buildInputs(loginFields)}
      <button disabled={isPending} type="submit">
        Login
      </button>
      {errors}
    </form>
  );
}
