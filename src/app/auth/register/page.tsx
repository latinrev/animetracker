"use client";
import { registerFields } from "@/fields/authFields";
import { GenericField } from "@/types/GenericField";
import { buildInputs } from "@/utils/utils";
import { users } from "@prisma/client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function Register({}) {
  const [isPending, startTransition] = useTransition();
  const { replace } = useRouter();

  const executeAction = (formData: any) => {
    startTransition(() => {
      const newUser = Object.fromEntries(formData.entries()) as users;
      signIn("credentials", { redirect: true, callbackUrl: "/", ...newUser });
    });
  };

  return (
    <form className={`flex flex-col text-white justify-center items-center `} action={executeAction}>
      {buildInputs(registerFields)}
      <button disabled={isPending} type="submit">
        Register
      </button>
    </form>
  );
}
