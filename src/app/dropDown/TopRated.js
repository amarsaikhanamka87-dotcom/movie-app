import { MoveRight, Star } from "lucide-react";
import { useEffect, useState } from "react";

export function TopRated() {
  const [movies, setMovies] = useState([]);
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
          "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api-key",
          options,
        );
        const data = await response.json();
        setMovies(data.results.slice(0, 12));
      } catch (error) {
        console.log("Something went wrong", error);
      }
    };
    fetchUserDataAsync();
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        {" "}
        <h1 className="font-heading  text-3xl p-5">TopRated</h1>
        <button className="flex gap-2 border rounded-2xl m-5 p-2">
          See more <MoveRight />
        </button>
      </div>
      <div className="grid grid-cols-6 gap-8">
        {movies.map((movie) => {
          return (
            <div
              key={movie.id}
              className="w-50 border rounded-3xl  flex flex-col gap-4 bg-gray-500"
            >
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                className="rounded-t-2xl"
              />
              <h1 className="ml-5">{movie.original_title}</h1>
              <div className="flex gap-2 m-3">
                <Star className="text-yellow-500" />
                {movie.vote_average}/10
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
