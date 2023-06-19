import { anime } from "@prisma/client";
import { BuildFieldReturnType } from "./BuildField";

export type ExtendedAnime = {
    [K in keyof anime]?: BuildFieldReturnType;
};
