import { users } from "@prisma/client";
import { client } from "../utils/prismaClient";


export const createUser = async (userData: Omit<users, "id">) => {
    return await client.users.create({ data: { ...userData } })
}

export const getUser = async (id: string) => {
    return await client.users.findUnique({ where: { id: id } })
}



