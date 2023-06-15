"use client";
import { loginFields, registerFields } from "@/fields/authFields";
import { GenericField } from "@/types/GenericField";
import { buildInputs } from "@/utils/utils";
import { users } from "@prisma/client";
import { signIn, signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export default function Login({}) {
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState("");

  useEffect(() => {
    signOut({ redirect: false });
    redirect("/auth/login");
  }, []);

  return <></>;
}
