import { animeFields } from "@/fields/animeFields";
import Form from "@/components/Form";
import { anime } from "@prisma/client";
import Link from "next/link";
import { createAnimeAction, updateAnimeAction } from "@/actions/anime/animeActions";

export default async function AnimeForm({ action, anime }: { action: "EDIT" | "CREATE"; anime?: anime }) {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <h1 className="absolute top-8 left-5 text-primary">
        <Link href="/">Back</Link>
      </h1>
      <Form
        fields={animeFields}
        formAction={action === "CREATE" ? createAnimeAction : updateAnimeAction}
        goTo="/"
        buttonText={action === "CREATE" ? "Create" : "Update"}
        buttonClassName="mt-5 p-2 rounded bg-primary text-bg"
        className="xl:basis-1/5 lg:basis-1/4 md:basis-1/3 sm:basis-1/2 basis-4/5"
        defaultValues={anime || {}}
        styles={{ inputClassName: "input", selectClassName: "input" }}
      />
    </div>
  );
}
