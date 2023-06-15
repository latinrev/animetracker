import { users } from "@prisma/client";
import { client } from "../utils/prismaClient";
import { deleteActionField } from "@/utils/utils";


export const createUser = async (userData: users) => {
    const newUser = deleteActionField(userData) as users
    return await client.users.create({ data: { ...newUser } })
}

export const getUser = async (id: string) => {
    return await client.users.findUnique({ where: { id: id } })
}



