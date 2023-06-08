import { ExtendedAnime } from "@/types/Anime";
import { buildField } from "@/utils/utils";

export const animeFields: ExtendedAnime = {
    id: buildField("id", { required: false, hidden: true }),
    name: buildField("name", { required: true }),
    status: buildField("status"),
    startDate: buildField("startDate"),
    nextReleaseDate: buildField("nextReleaseDate", { hidden: true }),
    releaseSchedule: buildField("releaseSchedule"),
    pageNumber: buildField("pageNumber"),
    hiatus: buildField("hiatus"),
    chaptersRead: buildField("chaptersRead"),
    img: buildField("img"),
    totalChapters: buildField("totalChapters"),
};
