import { BuildFieldReturnType } from "./BuildField";

export type GenericField = {
    [K in keyof any]: BuildFieldReturnType;
};

export type GenericValue = {
    [K in keyof any]: any;
};
