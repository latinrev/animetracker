"use client";
import { Fragment, Key, useState } from "react";
import Label from "../components/Label";
import Input from "../components/Input";
import { ExtendedAnime } from "@/types/Anime";
import { BuildFieldReturnType } from "./BuildField";

export type GenericField<T> = {
  [K in keyof T]: BuildFieldReturnType;
};

export type GenericValue = {
  [K in keyof any]: any;
};

interface BuildInputs {
  fields: GenericField<ExtendedAnime>;
  defaultValues?: any;
  styles?: {
    inputClassName?: React.ComponentProps<"div">["className"];
    spanClassName?: React.ComponentProps<"div">["className"];
    selectClassName?: React.ComponentProps<"div">["className"];
    optionClassName?: React.ComponentProps<"div">["className"];
  };
}

const buildFields = (fields: GenericField<ExtendedAnime>) => {
  const toRenderFields = [];
  Object.values(fields).forEach((field) => {
    if (field.dependantOnKeyValue.name) {
      if (fields[field.dependantOnKeyValue.name].value !== field.dependantOnKeyValue.value) {
        toRenderFields.push(field);
      }
    } else {
      toRenderFields.push(field);
    }
  });
  return toRenderFields;
};

export default function BuildInputs({ fields, defaultValues, styles }: BuildInputs) {
  const [currentValues, setCurrentValues] = useState(fields);

  return buildFields(currentValues).map(({ fieldName, required, value, hidden, selectOptions = [], type = "text", label }) => (
    <>
      <Fragment key={fieldName}>
        <Label label={label || fieldName} className={`${styles?.spanClassName || ""}`} hidden={hidden} />
        {selectOptions.length === 0 ? (
          <Input
            className={`p-2 ${styles?.inputClassName || ""}`}
            type={type}
            name={fieldName}
            required={required}
            onChange={(e) => {
              const copyCurrentValues = structuredClone(fields);
              copyCurrentValues[fieldName].value = e.currentTarget.value;
              setCurrentValues(copyCurrentValues);
            }}
            hidden={hidden}
            noLabel
            defaultValue={value || defaultValues?.[fieldName] || ""}
          />
        ) : (
          <select
            name={fieldName}
            className={`p-2 ${styles?.selectClassName}`}
            defaultValue={value || defaultValues?.[fieldName] || ""}
            onChange={(e) => {
              const copyCurrentValues = structuredClone(fields);
              copyCurrentValues[fieldName].value = e.currentTarget.value;
              setCurrentValues(copyCurrentValues);
            }}>
            {selectOptions.map((option) => (
              <option key={option as Key} className={`text-black p-2 ${styles?.optionClassName}`} value={`${option}`}>
                {option}
              </option>
            ))}
          </select>
        )}
      </Fragment>
    </>
  ));
}
