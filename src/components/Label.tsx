import { capitalCase } from "change-case";
import { HTMLProps } from "react";

interface InputProps extends HTMLProps<HTMLLabelElement> {
  key?: any;
  hidden?: boolean;
  className?: string;
  label?: string;
}
export default function Label({ hidden, label, className }: InputProps) {
  return <label className={`${hidden ? "hidden" : "block"} ${className || ""}`}>{capitalCase(label || "")}</label>;
}
