import { anime } from "@prisma/client";
import { client } from "../utils/prismaClient";
import { buildFilter, deleteActionField } from "@/utils/utils";


export const fetchAnimes = async ({ searchQuery = "" }) => {
    const filter = buildFilter(searchQuery);
    return await client.anime.findMany(filter);
}

export const getAnime = async (id: string) => {
    return await client.anime.findFirst({ where: { AND: { id: id } } }).catch(e => e)
}

export const createAnime = async (animeData: anime) => {
    const newAnime = deleteActionField(animeData) as anime
    await client.anime.create({ data: { ...newAnime, } })
}

export const updateAnime = async (id: string, updatedAnime: Partial<anime> | anime) => {
    const sanitizedUpdatedAnime = deleteActionField(updatedAnime)
    await client.anime.update({ data: { ...sanitizedUpdatedAnime }, where: { id: id } })

}

export const deleteAnime = async (id: string) => {
    await client.anime.delete({ where: { id } })
}


