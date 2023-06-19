"use client";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login({}) {
  useEffect(() => {
    signOut({ redirect: true, callbackUrl: "/auth" });
  }, []);
  return <></>;
}
