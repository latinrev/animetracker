import Image from "next/image";
import SearchBar from "@/components/searchBar";
import { fetchAnimes } from "@/services/animeDb";
import { capitalCase } from "change-case";
import Link from "next/link";
import { anime } from "@prisma/client";
import ActionButton from "@/components/ActionButton";
import { changeStatusAction, deleteAnimeAction, readChapterAnimeAction, unreadChapterAnimeAction } from "./actions/anime/animeActions";
import {
  BsArchiveFill,
  BsBookHalf,
  BsCheckLg,
  BsDashLg,
  BsFillStopwatchFill,
  BsFillTrashFill,
  BsPen,
  BsPlusLg,
  BsXLg,
} from "react-icons/bs";
import { calculateDaysUntilNextDayOfWeek } from "@/utils/utils";

export const revalidate = 10;

export default async function Home({ searchParams }: { searchParams: string }) {
  const searchQuery = searchParams.search?.toString() || "";
  let animes = await fetchAnimes({ searchQuery });

  return (
    <div className="min-h-screen w-screen flex text-white ">
      <div className="w-[20vh] sticky border-r-2 border-contrast">
        <ul className="p-5 ">
          <li>
            <Link href="/create">Create new anime...</Link>
          </li>
          {
            // do tags
          }
        </ul>
      </div>
      <div className="flex flex-col items-center pt-5 w-full pb-5  ">
        <SearchBar className="bg-[#3A3939]"></SearchBar>
        <div className="div p-10 pt-5 flex flex-wrap h-full w-full gap-y-5 gap-x-5">
          {animes.map((mAnime: anime) => (
            <div key={mAnime.id} className="flex flex-col basis-[calc(20%-20px)] h-[calc(45vh-15px)] ">
              <div className="div  relative w-full h-full">
                <div className="w-full h-full relative">
                  <div className={`absolute top-2 -left-2 p-2 text-primary  bg-${mAnime.status.toLowerCase()}`}>
                    {capitalCase(mAnime.status)}
                  </div>
                  <div className={`absolute top-16 -left-2 p-2 bg-contrast`}>{mAnime.totalChapters} Chapters</div>
                  <div className={`absolute bottom-36 -left-2 p-2 bg-ongoing`}>
                    {calculateDaysUntilNextDayOfWeek(mAnime.releaseSchedule)}
                  </div>
                  <Image
                    alt={mAnime.name + " - image"}
                    src={`https://picsum.photos/200/200?anime=${mAnime.id}`}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-full rounded-md"
                  />
                  <div className="absolute bottom-0 right-0 text-right p-2 bg-slate-800 bg-opacity-60 w-full group ">
                    <div className="div flex justify-between transition-all   ">
                      <div className="flex flex-col items-center justify-center ">
                        <div className="flex justify-start items-start w-full">
                          <ActionButton
                            action={deleteAnimeAction}
                            buttonText={<BsFillTrashFill />}
                            id={mAnime.id}
                            className="items-end flex opacity-0  group-hover:opacity-100 transition-all p-1"
                            withConfirmation={true}
                          />
                          <Link
                            href={`edit?id=${mAnime.id}`}
                            className="items-end flex opacity-0  group-hover:opacity-100 transition-all p-1 ">
                            <BsPen></BsPen>
                          </Link>

                          <Link
                            target="_blank"
                            href={`${mAnime.readWebsite}`}
                            className="items-end flex opacity-0  group-hover:opacity-100 transition-all p-1 ">
                            <BsBookHalf></BsBookHalf>
                          </Link>
                          <ActionButton
                            action={deleteAnimeAction}
                            buttonText={<BsArchiveFill />}
                            id={mAnime.id}
                            className="items-end flex opacity-0  group-hover:opacity-100 transition-all p-1"
                            withConfirmation={true}
                          />
                        </div>
                        <div className="flex justify-start items-start w-full pt-2">
                          <ActionButton
                            action={unreadChapterAnimeAction}
                            buttonText={<BsDashLg />}
                            id={mAnime.id}
                            data={mAnime.chaptersRead}
                            className="items-end flex opacity-0  group-hover:opacity-100 transition-all p-1"
                          />
                          <ActionButton
                            action={readChapterAnimeAction}
                            buttonText={<BsPlusLg />}
                            id={mAnime.id}
                            data={mAnime.chaptersRead}
                            className="items-end flex opacity-0  group-hover:opacity-100 transition-all p-1"
                          />
                          {mAnime.status === "Ongoing" || mAnime.status === "Finished" ? (
                            <ActionButton
                              action={changeStatusAction}
                              buttonText={<BsCheckLg />}
                              id={mAnime.id}
                              data={"Finished"}
                              className="items-end flex opacity-0  group-hover:opacity-100 transition-all p-1"
                            />
                          ) : (
                            <ActionButton
                              action={changeStatusAction}
                              buttonText={<BsXLg />}
                              id={mAnime.id}
                              data={"Ongoing"}
                              className="items-end flex opacity-0  group-hover:opacity-100 transition-all p-1"
                            />
                          )}
                          <ActionButton
                            action={changeStatusAction}
                            buttonText={<BsFillStopwatchFill />}
                            id={mAnime.id}
                            data={"Hiatus"}
                            className="items-end flex opacity-0  group-hover:opacity-100 transition-all p-1"
                          />
                        </div>
                      </div>
                      <div className="flex justify-center  flex-col text-right">
                        <Link href={`edit?id=${mAnime.id}`} className="text-base">
                          {mAnime.name}
                        </Link>
                        <div className="text-sm">
                          <h5>Release every: {mAnime.releaseSchedule}</h5>
                          <h5>Read Chapters: {mAnime.chaptersRead}</h5>
                        </div>
                      </div>
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
