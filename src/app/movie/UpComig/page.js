"use client";

import { MovieCard } from "@/app/dropDown/MovieCard";
import { PaginationDemo } from "@/app/dropDown/PaginationDemo";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [movies, setMovies] = useState();
  const [isLoading, setIsLoading] = useState();
  const [page, setPage] = useState(1);

  const router = useRouter();

  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer" + process.env.ACCESS_TOKEN,
    },
  };

  useEffect(() => {
    const fetchUserDataAsync = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?page=${page}`,
          options,
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.log("Something went wrong", error);
      }
    };
    fetchUserDataAsync();
  }, [page]);

  const handlePrevious = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  return (
    <div>
      <h1 className="font-heading  text-3xl p-5">UpComing</h1>

      <div className="grid grid-cols-6 gap-8">
        {isLoading
          ? Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="w-50 h-80" />
            ))
          : movies?.map((movie) => (
              <div
                key={movie.id}
                className="w-50 rounded-3xl p-0.8 flex flex-col gap-4 bg-gray-300"
                onClick={() => router.push(`/movie/${movie.id}`)}
              >
                <MovieCard
                  img={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  id={movie.id}
                />
              </div>
            ))}
      </div>
      <div className="flex gap-5  justify-center m-10">
        <button onClick={handlePrevious} className="border p-3 rounded-2xl">
          Previous
        </button>
        <div className=" p-3"> {page} </div>
        <button onClick={handleNext} className="border p-3 rounded-2xl">
          next
        </button>
      </div>
    </div>
  );
}
