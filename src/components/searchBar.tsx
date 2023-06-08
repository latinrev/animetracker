"use client";

import { useRouter, usePathname } from "next/navigation";
import { startTransition, useState, useTransition } from "react";
import { useDebounce, useDebouncedCallback } from "use-debounce";
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
      <input type="text" onChange={(e) => handleSearch(e)} className={className} />
    </>
  );
}
