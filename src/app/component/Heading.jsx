"use client";

import { useState } from "react";
import { DropdownMenuDemo } from "../dropDown/DropdownMenuDemo";
import { ModeToggle } from "../dropDown/ModeToggle";
import { useRouter } from "next/navigation";

export function Heading() {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleEnter = (event) => {
    if (event.key === "Enter" && searchValue.trim() !== "") {
      router.push(`/movie/search?q=${encodeURIComponent(searchValue)}`);
      setSearchValue("");
    }
  };

  return (
    <div className="flex w-500 justify-between mt-10">
      <img src="/Logo (6).png" alt="Logo" onClick={() => router.push(`/`)} />

      <div className="flex gap-3">
        <DropdownMenuDemo />

        <input
          value={searchValue}
          type="text"
          placeholder="Search ... "
          className="border w-150 rounded-2xl px-5"
          onChange={handleChange}
          onKeyDown={handleEnter}
        />
      </div>
      <ModeToggle />
    </div>
  );
}
