"use client";

import { useEffect, useRef, useState } from "react";
import { DropdownMenuDemo } from "../dropDown/DropdownMenuDemo";
import { ModeToggle } from "../dropDown/ModeToggle";

export function Heading() {
  const searchValue = useRef(null);
  const [movie, setMovies] = useState();

  const options = {
    method: "GET",

    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8",
    },
  };

  useEffect(() => {
    const fetchUserDataAsync = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en-US&page=${page}`,
          options,
        );
        const data = await response.json();
        setMovies(data);
        console.log("search data", data);
      } catch (error) {
        console.log("Something went wrong", error);
      }
      fetchUserDataAsync();
    };
  }, []);

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      console.log("search data", movie);
    }
  };

  return (
    <div className="flex   w-500 justify-between  mt-10">
      <img src="/Logo (6).png" />

      <div className="flex gap-3">
        <DropdownMenuDemo />

        <input
          ref={searchValue}
          type="text"
          placeholder="Search ... "
          className=" border w-150 rounded-2xl px-5 "
          onKeyDown={handleEnter}
        />
      </div>
      <ModeToggle />
    </div>
  );
}
