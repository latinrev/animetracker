import { client } from "@/utils/prismaClient";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { createUser } from "@/services/userDb";
export async function POST(req: Request) {
    const body = await req.json()
    const { username, password, email } = body
    if (!email || !username || !password) {
        return new NextResponse("Missing Credentials", { status: 400 })
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await createUser({ email, password: hashedPassword, username })
    return NextResponse.json(user)

}