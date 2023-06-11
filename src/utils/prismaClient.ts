import { PrismaClient } from '@prisma/client';

const DBClient = {
    instance: new PrismaClient(),
};
export type IDBClient = typeof DBClient;
Object.freeze(DBClient);

const client = DBClient.instance

export { client };