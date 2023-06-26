import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth';


const DBClient = {
    instance: new PrismaClient(),
};
export type IDBClient = typeof DBClient;
Object.freeze(DBClient);

const client = DBClient.instance

client.$use(async (params, next) => {
    const session = await getServerSession(authOptions) as any
    if (session && params.args.where && params.model === "anime") {
        if (params.action === "findFirst" || params.action === "findMany") {
            params.args.where.AND.userId = session?.user?.sub
        }
    }
    const result = await next(params)
    return result
})
client.$use(async (params, next) => {
    const session = await getServerSession(authOptions) as any
    if (session && params.model === "anime" && params.action === 'create') {
        params.args.data.userId = session?.user?.sub
    }
    const result = await next(params)
    return result
})

export { client };
