import { anime } from "@prisma/client";
import { client } from "../utils/prismaClient";
import { buildFilter, deleteActionField } from "@/utils/utils";


export const fetchAnimes = async ({ searchQuery = "" }) => {
    const filter = buildFilter(searchQuery);
    console.log(filter)
    return await client.anime.findMany(filter);
}

export const createAnime = async (animeData: anime) => {
    const newAnime = deleteActionField(animeData) as anime
    await client.anime.create({ data: { ...newAnime, } })
}

export const getAnime = async (id: string) => {
    return await client.anime.findFirst({ where: { AND: { id: id } } }).catch(e => e)
}

export const editAnime = async (id: string, updatedAnime: anime) => {
    const newAnime = deleteActionField(updatedAnime) as anime
    await client.anime.update({ data: { ...newAnime }, where: { id: id } })
}

export const deleteAnime = async (id: string) => {
    await client.anime.delete({ where: { id } })
}

export const editAnimeChapter = async (id: string, updatedChapter: string) => {
    await client.anime.update({ data: { chaptersRead: updatedChapter }, where: { id: id } })
}

export const changeAnimeStatus = async (id: string, newStatus: string) => {
    await client.anime.update({ data: { status: newStatus }, where: { id: id } })
}

