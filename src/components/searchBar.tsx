"use client";

import { useRouter, usePathname } from "next/navigation";
import { startTransition, useState, useTransition } from "react";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import { BsSearch } from "react-icons/bs";
interface SearchProps {
  className?: React.ComponentProps<"div">["className"];
}
export default function SearchBar({ className }: SearchProps) {
  const { replace } = useRouter();
  const pathName = usePathname();
  const [isPending, startTransition] = useTransition();
  let handleSearch = useDebouncedCallback(({ target: { value } }) => {
    let params = new URLSearchParams(window.location.search);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    params.delete("page");
    startTransition(() => {
      replace(`${pathName}?${params.toString()}`);
    });
  }, 500);
  return (
    <>
      <div className={`${className} flex gap-3 rounded-full h-[5vh] items-center justify-end`}>
        <div className="ml-5">
          <BsSearch className="justify-end" />
        </div>
        <input type="text" onChange={(e) => handleSearch(e)} className="h-full rounded-full bg-transparent focus:outline-none" />
      </div>
    </>
  );
}
