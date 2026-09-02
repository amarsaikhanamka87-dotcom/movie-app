// promise
const fetchUserData = () => {
  fetch("https://jsonplaceholder.typicode.com/users/1")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .then((error) => console.error("Something went wrong", error));
};

//async

const fetchUserDataAsync = async () => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1",
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

// "use client";

// import Image from "next/image";
// import { MovieCard } from "./components/MovieCard";
// import { NavigationBar } from "./components/NavigationBar";
// import { HeroMovieItem } from "./components/HeroMovieItem";
// import { useEffect } from "react";
// import { useState } from "react";

// export default function Home() {
//   const [movies, setMovies] = useState();
//   const options = {
//     method: "GET",
//     headers: {
//       accept: "application/json",
//       Authorization:
//         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8",
//     },
//   };

//   useEffect(() => {
//     const fetchPopular = async () => {
//       try {
//         const res = await fetch(
//           "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api-key",
//           options,
//         );
//         const data = await res.json();

//         setMovies(data.results);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchPopular();
//   }, []);
//   console.log(movies);

//   return (
//     <div className="">
//
//       {movies.map((movie) => {
//         return (
//           <MovieCard rating={movie.vote_average} title={movie.original_title} />
//         );
//       })}
//     </div>
//   );
// }
