import { BuildFieldReturnType } from "@/formbuilder/BuildField";
import { anime } from "@prisma/client";

export type ExtendedAnime = {
    [K in keyof anime]?: BuildFieldReturnType;
};

export type AnimeToSave = {
    id: string
    chaptersRead: string
    name: string
    nextReleaseDate: string
    readWebsite: string
    releaseSchedule: string
    startDate: string
    status: string
    totalChapters: string
    userId: string
}