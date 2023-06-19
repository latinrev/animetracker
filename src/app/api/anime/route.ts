import { client } from "@/utils/prismaClient";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { createUser } from "@/services/userDb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { fetchAnimes } from "@/services/animeDb";


export async function GET(req: Request) {
    const session = await getServerSession(authOptions)
    const body = await req.json()
    const { id } = body


}
export async function POST(req: Request) {

}
export async function PUT(req: Request) {

}
export async function DELETE(req: Request) {

}