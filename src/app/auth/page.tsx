"use client";

import axios from "axios";
import Input from "@/components/Input";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function AuthScreen() {
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = (newUser) => {
    setIsLoading(true);
    if (isRegister) {
      axios.post("/api/register", { ...newUser }).then(() => {
        signIn("credentials", { ...newUser, redirect: false }).then(() => router.push("/"));
      });
    } else {
      signIn("credentials", { ...newUser, redirect: false }).then(() => router.push("/"));
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <h1 className="text-2xl p-5 text-white">{!isRegister ? "Sign in to your account" : "Sign up to your account"}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="div border border-primary flex flex-col w-96 px-8 py-16 gap-2 rounded text-primary">
          <Input
            register={register}
            name="username"
            label="Username"
            renderIf={isRegister}
            styles={{ inputClassName: "bg-transparent border border-primary text-white " }}
          />
          <Input
            register={register}
            name="email"
            label="Email"
            styles={{ inputClassName: "bg-transparent border border-primary text-white " }}
          />
          <Input
            register={register}
            name="password"
            type="password"
            label="Password"
            styles={{ inputClassName: "bg-transparent border border-primary text-white " }}
          />
          <button type="submit" className=" p-2 rounded mt-5 bg-primary text-bg" disabled={isLoading}>
            {!isRegister ? "Login" : "Register"}
          </button>
          <div className="div flex justify-between flex-col text-sm">
            <span>{!isRegister ? "Dont have an account?" : "Already have an account?"}</span>
            <span className="cursor-pointer" onClick={() => setIsRegister(!isRegister)}>
              {!isRegister ? "Create one" : "Log in"}
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
