import { deleteAnimeAction, unreadChapterAction, readChapterAction, changeStatusAction } from "@/app/actions/anime/animeActions";
import { calculateDaysUntilNextDayOfWeek } from "@/utils/utils";
import Link from "next/link";
import Image from "next/image";
import {
  BsFillTrashFill,
  BsPen,
  BsBookHalf,
  BsArchiveFill,
  BsDashLg,
  BsPlusLg,
  BsCheckLg,
  BsXLg,
  BsFillStopwatchFill,
} from "react-icons/bs";
import ActionButton from "./ActionButton";

export default async function AnimeCard({ anime }) {
  return (
    <div key={anime.id} className="flex flex-col sm:text-sm ">
      <div className="div relative">
        <div className="relative border border-primary rounded-md">
          <div className={`absolute top-2 -left-2 p-2 text-bg bg-primary`}>{anime.totalChapters} Chapters</div>
          <div className="flex flex-col">
            <Image
              alt={anime.name + " - image"}
              src={`https://picsum.photos/200/200?anime=${anime.id}`}
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto w-auto"
            />
            <div className="bottom-0 right-0 text-right  text-primary w-full group p-2 px-5 ">
              <div className="div flex gap-x-2 justify-between transition-all   ">
                <div className="flex flex-col items-center justify-center ">
                  <div className="flex justify-start items-start w-full">
                    <ActionButton
                      action={deleteAnimeAction}
                      buttonText={<BsFillTrashFill />}
                      id={anime.id}
                      className="items-end flex opacity-100 sm:opacity-0  group-hover:opacity-100 transition-all p-1"
                      withConfirmation={true}
                    />
                    <Link
                      href={`edit?id=${anime.id}`}
                      className="items-end flex opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all p-1 ">
                      <BsPen></BsPen>
                    </Link>
                    <a
                      target="_blank"
                      href={`${anime.readWebsite}`}
                      className="items-end flex opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all p-1 ">
                      <BsBookHalf></BsBookHalf>
                    </a>
                    <ActionButton
                      action={deleteAnimeAction}
                      buttonText={<BsArchiveFill />}
                      id={anime.id}
                      className="items-end flex opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all p-1"
                      withConfirmation={true}
                    />
                  </div>
                  <div className="flex justify-start items-start w-full pt-2">
                    <ActionButton
                      action={unreadChapterAction}
                      buttonText={<BsDashLg />}
                      id={anime.id}
                      data={anime.chaptersRead}
                      className="items-end flex opacity-100 sm:opacity-0  group-hover:opacity-100 transition-all p-1"
                    />
                    <ActionButton
                      action={readChapterAction}
                      buttonText={<BsPlusLg />}
                      id={anime.id}
                      data={anime.chaptersRead}
                      className="items-end flex opacity-100 sm:opacity-0  group-hover:opacity-100 transition-all p-1"
                    />
                    {anime.status === "Ongoing" ? (
                      <ActionButton
                        action={changeStatusAction}
                        buttonText={<BsCheckLg />}
                        id={anime.id}
                        data={"Finished"}
                        className="items-end flex opacity-100 sm:opacity-0  group-hover:opacity-100 transition-all p-1"
                      />
                    ) : (
                      <ActionButton
                        action={changeStatusAction}
                        buttonText={<BsXLg />}
                        id={anime.id}
                        data={"Ongoing"}
                        className="items-end flex opacity-100 sm:opacity-0  group-hover:opacity-100 transition-all p-1"
                      />
                    )}
                    <ActionButton
                      action={changeStatusAction}
                      buttonText={<BsFillStopwatchFill />}
                      id={anime.id}
                      data={"Hiatus"}
                      className="items-end flex opacity-100 sm:opacity-0  group-hover:opacity-100 transition-all p-1"
                    />
                  </div>
                </div>
                <div className="flex justify-center  flex-col text-right">
                  <Link href={`edit?id=${anime.id}`} className="text-base">
                    {anime.name}
                  </Link>
                  <div className="text-xs md:text-sm">
                    <h5>{calculateDaysUntilNextDayOfWeek(anime.releaseSchedule)}</h5>
                    <h5>Release every: {anime.releaseSchedule}</h5>
                    <h5>Read Chapters: {anime.chaptersRead}</h5>
                    <h5>{anime.status}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
