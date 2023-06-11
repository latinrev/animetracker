"use server";
import { changeAnimeStatus, createAnime, deleteAnime, editAnime, editAnimeChapter } from "@/services/animeDb";
import { anime } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createAnimeAction(data: FormData) {
    let newAnime = Object.fromEntries(data.entries()) as anime;
    await createAnime(newAnime);
    revalidatePath("/");
}

export async function updateAnimeAction(data: FormData) {
    let newAnime = Object.fromEntries(data.entries()) as anime;
    await editAnime(newAnime.id, newAnime);
    revalidatePath("/");
    revalidatePath("/edit")
}

export async function deleteAnimeAction(id: string) {
    await deleteAnime(id)
    revalidatePath("/")
}


export async function readChapterAnimeAction(id: string, data: string) {
    const newChapter = +data + 1
    await editAnimeChapter(id, newChapter.toString())
    revalidatePath("/")
}
export async function unreadChapterAnimeAction(id: string, data: string) {
    const newChapter = +data - 1
    await editAnimeChapter(id, newChapter.toString())
    revalidatePath("/")
}
export async function changeStatusAction(id: string, status: string) {
    await changeAnimeStatus(id, status)
    revalidatePath("/")
}