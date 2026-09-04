"use client";

import { Badge, BadgeAlert, MoveRightIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8",
  },
};

export default function Page() {
  const [movies, setMovies] = useState();
  const [genreList, setGenreList] = useState();
  const router = useRouter();

  const searchParams = useSearchParams();

  const genreIds = searchParams.get("search");

  useEffect(() => {
    const fetchUserDataAsync = async () => {
      try {
        const genreRes = await fetch(
          `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreIds}&page=1`,
          options,
        );
        const genreData = await genreRes.json();
        setMovies(genreData.results);
        console.log("genreData", genreData);

        const genreListRes = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?language=en`,
          options,
        );
        const genreListData = await genreListRes.json();
        setGenreList(genreListData.genres);
        console.log("genreListData", genreListData.genres);
      } catch (error) {
        console.log("Something went wrong", error);
      }
    };
    fetchUserDataAsync();
  }, []);

  console.log("genreList", genreList);
  return (
    <div className="flex flex-col gap-20">
      <h1 className="text-5xl font-bold ">Search filter</h1>
      <div className="flex  gap-50">
        <div>
          <div className="flex flex-col gap-5 text-3xl">
            <h1 className="font-bold ">Genres</h1>
            <p>See lists of movies by genre</p>
          </div>
          <div className="grid grid-cols-4  mt-5">
            {genreList?.map((genre) => {
              return (
                <div
                  className="border rounded-2xl px-5 w-fit m-1.5"
                  onClick={() => router.push(`/genre?search=${genre.name}`)}
                >
                  {genre.name}
                </div>
              );
            })}
          </div>
        </div>
        <div className="border w-250 h-200">
          <h1>{}</h1>
        </div>
      </div>
    </div>
  );
}
