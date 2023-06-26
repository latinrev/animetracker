"use client";
import { HTMLProps } from "react";
import Label from "./Label";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps extends HTMLProps<HTMLInputElement> {
  key?: any;
  hidden?: boolean;
  label?: string;
  noLabel?: boolean;
  styles?: { labelClassName?: string; inputClassName?: string };
  value?: any;
  defaultValues?: any;
  renderIf?: boolean;
  register?: UseFormRegister<FieldValues>;
}
export default function Input({
  key,
  hidden = false,
  label,
  styles,
  noLabel = false,
  value = "",
  defaultValues,
  type = "text",
  required = false,
  renderIf = true,
  register = null,
  ...props
}: InputProps) {
  return (
    <>
      {renderIf && (
        <>
          {!noLabel && (
            <Label key={key || props.name} label={label || props.name} hidden={hidden} className={styles?.labelClassName || ""}></Label>
          )}
          <input
            className={` p-2 ${styles?.inputClassName || ""}`}
            type={type}
            name={key || props.name}
            required={required}
            hidden={hidden}
            defaultValue={value || defaultValues?.[key] || ""}
            {...(register ? register(key || props.name) : null)}
            {...props}
          />
        </>
      )}
    </>
  );
}
