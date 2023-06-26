import { getAnime } from "@/services/animeDb";
import { redirect } from "next/navigation";
import AnimeForm from "@/components/AnimeForm";

export default async function Edit({ searchParams }: { searchParams: { id: string } }) {
  const id = searchParams.id;
  const anime = id ? await getAnime(id) : null;
  if (!anime) {
    redirect("/");
  }
  return <AnimeForm action="EDIT" anime={anime}></AnimeForm>;
}
