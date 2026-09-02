"use client";

import { useEffect, useState } from "react";
import { CarouselPlugin } from "./dropDown/CarouselPlugin";
import { MovieCard } from "./dropDown/MovieCard";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(true);
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api-key",
          options,
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.log("Something went wrong", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserDataAsync();
  }, []);
  console.log(movies);
  return (
    <div className="flex flex-col items-center  gap-20">
      <CarouselPlugin />
      <div className="grid grid-cols-6 gap-8">
        {movies.map((movie) => {
          return (
            <MovieCard
              rating={movie.vote_average}
              title={movie.original_title}
              img={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            />
          );
        })}
      </div>
    </div>
  );
}
