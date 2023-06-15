import { buildField } from "@/utils/utils";

export const registerFields = {
    username: buildField("username", {}),
    email: buildField("email", {}),
    password: buildField("password", { type: "password" })
}

export const loginFields = {
    email: buildField("email", {}),
    password: buildField("password", { type: "password" })
}