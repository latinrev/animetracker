import { animeFields } from "@/fields/animeFields";
import { getAnime } from "@/services/animeDb";
import { updateAnimeAction } from "../actions/anime/animeActions";
import Form from "@/components/Form";
import { redirect } from "next/navigation";

export default async function Edit({ searchParams }: { searchParams: { id: string } }) {
  const id = searchParams.id;
  const anime = await getAnime(id);
  console.log(anime);
  if (!anime) {
    redirect("/");
  }
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <Form
        fields={animeFields}
        defaultValues={anime}
        formAction={updateAnimeAction}
        goTo="/"
        buttonText="Update"
        buttonClassName="mt-5 p-2 rounded bg-contrast"
        className="basis-1/6"
      />
    </div>
  );
}
