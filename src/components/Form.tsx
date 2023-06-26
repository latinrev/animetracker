"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import BuildInputs, { GenericField } from "../formbuilder/BuildInputs";
import { ExtendedAnime } from "@/types/Anime";

interface Form {
  fields: GenericField<ExtendedAnime>;
  defaultValues?: any;
  formAction: (data: FormData) => Promise<void>;
  goTo: string;
  buttonText: string;
  className?: React.ComponentProps<"div">["className"];
  buttonClassName?: React.ComponentProps<"div">["className"];
  styles?: { inputClassName?: string; optionClassName?: string; selectClassName?: string; spanClassName?: string };
}
export default function Form({ fields, defaultValues, formAction, goTo, buttonText, className, buttonClassName, styles }: Form) {
  const [isPending, startTransition] = useTransition();
  const { replace } = useRouter();

  const executeAction = (formData: any) => {
    startTransition(() => {
      formAction(formData);
      replace(goTo);
    });
  };

  return (
    <form className={`flex flex-col text-white ${className}`} action={executeAction}>
      <BuildInputs fields={fields} defaultValues={defaultValues} styles={{ ...styles }} />
      <button disabled={isPending} type="submit" className={buttonClassName}>
        {buttonText}
      </button>
    </form>
  );
}
