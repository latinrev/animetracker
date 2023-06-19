import { animeFields } from "@/fields/animeFields";
import { createAnimeAction, updateAnimeAction } from "../actions/anime/animeActions";
import Form from "@/components/Form";
import AnimeForm from "@/components/AnimeForm";

export default async function Create() {
  return <AnimeForm action="CREATE" />;
}
