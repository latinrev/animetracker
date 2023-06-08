import { BuildFieldOptions, BuildFieldReturnType } from "@/types/BuildField";
import { GenericField } from "@/types/GenericField";
import { Prisma } from "@prisma/client";
import { capitalCase } from "change-case";

export const buildFilter = (searchQuery = "") => {
  const filter: Prisma.animeFindManyArgs = {
    where: {
      name: {
        contains: searchQuery,
        mode: "insensitive",
      },
    },
  };
  return filter;
};

export const buildField = (fieldName: string, options: BuildFieldOptions = {}): BuildFieldReturnType => {
  const { value = "", required = false, hidden = false } = options;
  return { fieldName, value, required, hidden };
};

export const deleteActionField = (data: { [key: string]: any }) => {
  for (const key in data) {
    if (key.startsWith("$ACTION_ID")) {
      delete data[key];
    } else if (key.startsWith("id")) {
      delete data[key];
    }
  }
  return data;
};

export const buildInputs = (fields: GenericField) => {
  return Object.entries(fields).map(([key, { required, value, hidden }]) => (
    <>
      <span className={`${hidden ? "hidden" : "block"}`}>{capitalCase(key)}</span>
      {<input className=" text-black" type="text" name={key} required={required} hidden={hidden} defaultValue={value} />}
    </>
  ));
};
