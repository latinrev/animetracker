import Image from "next/image";
import SearchBar from "@/components/searchBar";
import { fetchAnimes } from "@/services/animeDb";
import { animeFields } from "@/fields/animeFields";
import { saveNewAnime } from "./actions/anime/Create";
import { buildInputs } from "@/utils/utils";
import { anime } from "@prisma/client";

export const revalidate = 10;

export default async function Home({ searchParams }: { searchParams: string }) {
  const searchQuery = searchParams.search?.toString() || "";
  let animes = await fetchAnimes({ searchQuery });
  return (
    <main className="min-h-screen w-screen flex text-white">
      <div className="w-40 h-screen bg-slate-950 ">
        <ul></ul>
      </div>
      <div className="flex flex-col items-center pt-5 w-full">
        <SearchBar className="bg-[#3A3939] opacity-30 w-1/4 p-5 rounded-full"></SearchBar>
        <div className="div p-10 pt-5 flex flex-wrap gap-y-14 h-full w-full">
          {animes.map((mAnime) => (
            <>
              <div className="flex flex-col">
                <div className="div h-[calc(35vh-10px)] w-[calc(30vh-10px)]  h- p-2 relative">
                  <Image src={"https://dummyimage.com/600x400/000000/fff"} width={0} height={0} sizes="100vw" className="w-full h-full" />
                  <div className="absolute bottom-3 right-4 text-sm text-right">
                    <h5>Read Chapters:{mAnime.chaptersRead}</h5>
                    <h5>Next release date:{mAnime.nextReleaseDate}</h5>
                  </div>
                  <h4>{mAnime.name}</h4>
                  <h5>{mAnime.totalChapters} Chapters</h5>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </main>
  );
}
