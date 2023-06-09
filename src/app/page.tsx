import Image from "next/image";
import SearchBar from "@/components/searchBar";
import { fetchAnimes } from "@/services/animeDb";
import { animeFields } from "@/fields/animeFields";
import { saveNewAnime } from "./actions/anime/Create";
import { buildInputs } from "@/utils/utils";
import { anime } from "@prisma/client";
import { capitalCase } from "change-case";
import Link from "next/link";

export const revalidate = 10;

export default async function Home({ searchParams }: { searchParams: string }) {
  const searchQuery = searchParams.search?.toString() || "";
  let animes = await fetchAnimes({ searchQuery });
  return (
    <div className="min-h-screen w-screen flex text-white">
      <div className="w-[20vh] h-screen bg-slate-950 ">
        <ul className="p-5 bg-slate-600">
          <li>
            <Link href="/create">Create new anime...</Link>
          </li>
          {
            // do tags
          }
        </ul>
      </div>
      <div className="flex flex-col items-center pt-5 w-full pb-5 ">
        <SearchBar className="bg-[#3A3939]"></SearchBar>
        <div className="div p-10 pt-5 flex flex-wrap h-full w-full justify-between gap-y-5">
          {animes.map((mAnime) => (
            <div className="flex flex-col basis-[calc(20%-20px)] ">
              <div className="div h-[calc(45vh-15px)] relative">
                <div className="w-full h-full relative">
                  <div className={`absolute top-2 -left-2 p-2 bg-green-600`}>
                    {capitalCase(mAnime.status)} : {mAnime.totalChapters}
                  </div>
                  <div className={`absolute top-16 -left-2 p-2 bg-slate-500 `}>{mAnime.totalChapters} Chapters</div>
                  <Image
                    alt={mAnime.name + " - image"}
                    src={`https://picsum.photos/200/200?anime=${mAnime.id}`}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-full"
                  />
                  <div className="absolute bottom-0 right-0 text-right p-2 bg-slate-800 bg-opacity-60 w-full ">
                    <h4 className="text-xl">{mAnime.name}</h4>
                    <div className="text-sm">
                      <h5>Next Release: {mAnime.nextReleaseDate}</h5>
                      <h5>Read Chapters: {mAnime.chaptersRead}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
