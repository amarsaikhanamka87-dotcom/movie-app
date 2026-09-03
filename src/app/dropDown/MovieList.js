import { useEffect, useState } from "react";

export function MovieList() {
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
    const fetchTvSeriesAsync = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreIds}&page=${page}`,
          options,
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.log("Something went wrong", error);
      }
    };
    fetchTvSeriesAsync();
  }, []);
  console.log("tv", movies);
}
