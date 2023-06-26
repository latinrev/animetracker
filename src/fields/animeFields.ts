import { buildField } from "@/formbuilder/BuildField";
import { ExtendedAnime } from "@/types/Anime";


export const animeFields: ExtendedAnime = {
    id: buildField("id", { required: false, hidden: true, }),
    name: buildField("name", { required: true }),
    status: buildField("status", { required: true, selectOptions: ["Not Started", "Ongoing", "Hiatus", "Finished"] }),
    startDate: buildField("startDate", { type: "date" }),
    nextReleaseDate: buildField("nextReleaseDate", { hidden: true, type: "date" }),
    releaseSchedule: buildField("releaseSchedule", { dependantOnKeyValue: { name: "status", value: "Finished" }, required: true, selectOptions: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] }),
    chaptersRead: buildField("chaptersRead", { required: true }),
    totalChapters: buildField("totalChapters", { required: true }),
    readWebsite: buildField("readWebsite"),
    userId: buildField("userId", { hidden: true })
};
