import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";
import { getServerSession } from 'next-auth';
import { authOptions } from './auth';

const DBClient = {
    instance: new PrismaClient(),
};
export type IDBClient = typeof DBClient;
Object.freeze(DBClient);

const client = DBClient.instance

client.$use(async (params, next) => {
    if (params.action === "create" && params.model === 'users') {
        params.args.data.password = await hashPassword(params.args.data.password)
    }
    const result = await next(params)
    return result
})

client.$use(async (params, next) => {
    const session = await getServerSession(authOptions) as any
    if (session && params.args.where && params.action === "findFirst" || params.action === "findMany") {
        params.args.where.AND.uid = session?.user?.sub
    }
    const result = await next(params)
    return result
})

export { client };

export async function hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
}
