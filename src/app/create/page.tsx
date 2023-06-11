import { animeFields } from "@/fields/animeFields";
import { createAnimeAction } from "../actions/anime/animeActions";
import Form from "@/components/Form";

export default function Create() {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <Form
        fields={animeFields}
        formAction={createAnimeAction}
        goTo="/"
        buttonText="Create"
        buttonClassName="mt-5 p-2 rounded bg-contrast"
        className="basis-1/6"
      />
    </div>
  );
}
