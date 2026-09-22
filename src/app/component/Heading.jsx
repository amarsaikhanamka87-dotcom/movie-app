"use client";

import { Suspense, useEffect, useState } from "react";
import { DropdownMenuDemo } from "../dropDown/DropdownMenuDemo";
import { ModeToggle } from "../dropDown/ModeToggle";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";

export function Heading() {
  const [searchValue, setSearchValue] = useState("");
  const [movie, setMovies] = useState();
  const router = useRouter();

  const handleChange = (event) => {
    setSearchValue(event.target.value);
    console.log("seachValue", searchValue);
  };

  const handleEnter = (event) => {
    if (event.key === "Enter" && searchValue.trim() !== "") {
      router.push(`/movie/search?q=${encodeURIComponent(searchValue)}`);
      setSearchValue("");
    }
  };

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8",
    },
  };
  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en-US&page=1`,
          options,
        );
        const data = await res.json();
        setMovies(data.results.slice(0, 4));

        console.log("Heading SearchData", movie);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPopular();
  }, [searchValue]);
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <div className="flex w-500 justify-between mt-10">
        <div onClick={() => router.push(`/`)}>
          <img src="/Logo (6).png" alt="Logo" />
        </div>

        <div className="flex gap-3">
          <DropdownMenuDemo />
          <div className="flex flex-col ">
            <input
              value={searchValue}
              type="text"
              placeholder="Search ... "
              className="border w-150 rounded-2xl px-5"
              onChange={handleChange}
              onKeyDown={handleEnter}
            />
            <div className="flex flex-col gap-1.5 p-5">
              {movie?.map((m) => {
                return (
                  <div className="flex gap-2  ">
                    <img
                      className="w-15 h-20 "
                      src={`https://image.tmdb.org/t/p/original${m.poster_path}`}
                    />
                    <div className="border flex  w-100 justify-between items-center">
                      {m.original_title}
                      <div className="flex ">
                        <Star className="fill-amber-300" />
                        {m.vote_average}/10
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div>
          <ModeToggle />
        </div>
      </div>
    </Suspense>
  );
}
