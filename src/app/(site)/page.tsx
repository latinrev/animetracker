import { fetchAnimes } from "@/services/animeDb";
import Link from "next/link";
import { anime } from "@prisma/client";
import AnimeCard from "@/components/AnimeCard";
import { BsPlusLg } from "react-icons/bs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { redirect } from "next/navigation";
import SearchBar from "@/components/searchBar";

export const revalidate = 10;
// do tags
export default async function Home({ searchParams }: { searchParams: string }) {
  const session = await getServerSession(authOptions);
  const searchQuery = searchParams.search?.toString() || "";
  let animes = await fetchAnimes({ searchQuery });
  if (!session) redirect("/auth");
  return (
    <div className="min-h-screen w-full  text-white content-center">
      <div className="flex flex-col items-center pt-5 pb-5 ">
        <div className="grid justify-center sm:grid-cols-3 px-5 h-full w-full ">
          <div className="tags">{/*do tags*/}</div>
          <SearchBar className="border-primary border justify-self-center" />
          <ul className="sm:justify-self-end text-center p-2 flex items-center">
            <li>
              <Link href="auth/logout">Log out</Link>
            </li>
          </ul>
        </div>
        <div
          className={`div p-10 pt-5 gap-5 ${
            animes.length > 0
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-auto"
              : "flex justify-center items-center"
          } `}>
          {animes.length ? (
            <div className="flex flex-col items-center justify-center border border-primary rounded-lg p-5">
              <Link href="/create">
                <BsPlusLg className="text-9xl border border-primary rounded-full p-5" />
              </Link>
            </div>
          ) : null}
          {animes.length ? (
            animes.map((mAnime: anime) => <AnimeCard anime={mAnime} />)
          ) : (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-xl">
              <h1 className="text-3xl">Such empty!</h1>
              <br />
              <Link href="/create">
                <h2 className="text-bg p-2 bg-primary rounded">Click here to start creating new animes!</h2>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
