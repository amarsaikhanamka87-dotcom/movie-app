"use client";

import { Badge, ChevronRight, MoveRightIcon, X, XIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MovieCard } from "../dropDown/MovieCard";
import { Separator } from "@/components/ui/separator";

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
  const [clicked, setClicked] = useState();
  const [title, setTitle] = useState();

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

  const handleClick = (id, name) => {
    setClicked(id);
    router.push(`/genre?search=${id}`);
    setTitle(name);
    setMovies(movies);
  };

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
                  key={genre.id}
                  className={`border rounded-2xl px-5 w-fit m-1.5 flex gap-2 ${clicked === genre.id ? `bg-black text-white ` : ``} `}
                  onClick={() => handleClick(genre.id, genre.name)}
                >
                  {genre.name}
                  {clicked === genre.id ? <X /> : <ChevronRight />}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <h1 className="text-4xl font-bold">
            {movies?.length} titles in {title}
          </h1>
          <div className=" w-250  grid grid-cols-4 gap-5">
            {movies?.map((movie) => {
              return (
                <div
                  className=" border rounded-2xl bg-gray-300"
                  onClick={() => router.push(`/movie/${movie.id}`)}
                  key={movie.id}
                >
                  <MovieCard
                    img={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    title={movie.title}
                    rating={movie.vote_average}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
