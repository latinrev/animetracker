"use client";
import { animeFields } from "@/fields/animeFields";
import { buildInputs } from "@/utils/utils";
import { saveNewAnime } from "../actions/anime/Create";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

export default function Create() {
  const [isPending, startTransition] = useTransition();
  const { replace } = useRouter();

  const createAnime = (formData) => {
    startTransition(() => {
      saveNewAnime(formData);
      replace(`/`);
    });
  };
  return (
    <form className="flex flex-col text-white" action={createAnime}>
      {buildInputs(animeFields)}
      <button type="submit" disabled={isPending}>
        Create...
      </button>
    </form>
  );
}
