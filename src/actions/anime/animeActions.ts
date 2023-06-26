"use server";
import { createAnime, deleteAnime, updateAnime } from "@/services/animeDb";
import { anime } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createAnimeAction(data: FormData) {
    let newAnime = Object.fromEntries(data.entries()) as anime;
    await createAnime(newAnime);
    revalidatePath("/");
}

export async function updateAnimeAction(data: FormData) {
    let animeData = Object.fromEntries(data.entries()) as anime;
    await updateAnime(animeData.id, animeData);
    revalidatePath("/");
    revalidatePath("/edit")
}

export async function deleteAnimeAction(id: string) {
    await deleteAnime(id)
    revalidatePath("/")
}

export async function readChapterAction(id: string, chapter: string) {
    const updatedChapter = +chapter + 1
    await updateAnime(id, { chaptersRead: updatedChapter.toString() })
    revalidatePath("/")
}
export async function unreadChapterAction(id: string, chapter: string) {
    const updatedChapter = +chapter - 1
    await updateAnime(id, { chaptersRead: updatedChapter.toString() })
    revalidatePath("/")
}

export async function changeStatusAction(id: string, status: string) {
    await updateAnime(id, { status })
    revalidatePath("/")
}