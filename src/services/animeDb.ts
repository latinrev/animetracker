import { anime } from "@prisma/client";
import { getClient } from "../utils/prismaClient";
import { buildFilter, deleteActionField } from "@/utils/utils";

const client = getClient()
export const fetchAnimes = async ({ searchQuery = "" }) => {
    const filter = searchQuery ? buildFilter(searchQuery) : {};
    return await client.anime.findMany(filter);
};


export const createAnime = async (animeData: anime) => {
    const newAnime = deleteActionField(animeData) as anime
    await client.anime.create({ data: { ...newAnime } })
}



