"use server";
import { createUser } from "@/services/userDb";
import { users } from "@prisma/client";
import { signIn, } from "next-auth/react";
import { revalidatePath } from "next/cache";

export async function createUserAction(data: FormData) {
    const newUser = Object.fromEntries(data.entries()) as users;
    await createUser(newUser);
    revalidatePath("/");
}
