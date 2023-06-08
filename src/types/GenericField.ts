import { BuildFieldReturnType } from "./BuildField";

export type GenericField = {
    [K in keyof any]: BuildFieldReturnType;
};
