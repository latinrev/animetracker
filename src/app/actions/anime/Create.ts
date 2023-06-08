import { createAnime } from "@/services/animeDb";
import { anime } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function saveNewAnime(data: FormData) {
    "use server";
    let newAnime = Object.fromEntries(data.entries()) as anime;
    await createAnime(newAnime);
    revalidatePath("/");
}