import { PrismaClient } from "@prisma/client";


export function getClient() {
    let db = null
    if (!db) {
        db = new PrismaClient()
    }
    return db
}