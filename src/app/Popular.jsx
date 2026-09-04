  "use client"
  
  import { Skeleton } from "@/components/ui/skeleton";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MovieCard } from "./dropDown/MovieCard";


export function Popular() {
    const [movies, setMovies] = useState([]);
      const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()
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
              "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api-key",
              options,
            );
            const data = await response.json();
            setMovies(data.results.slice(0,12));
            
          } catch (error) {
          console.log("Something went wrong", error);
          } finally {
setIsLoading(false)
          }
        };
        fetchUserDataAsync();
      }, []);
      
  
return (
    <div>
      <div className="flex justify-between">
        {" "}
        <h1 className="font-heading  text-3xl p-5">Popular</h1>
        <button className="flex gap-2 border rounded-2xl  m-5 p-2">
          See more <MoveRight />
        </button>
      </div>
      <div className="grid grid-cols-6 gap-8">
        {isLoading
        ? Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className='w-50 h-80'  />
          ))
        : movies.map((movie) => (
            <div
              key={movie.id}
              className="w-50 rounded-3xl p-0.8 flex flex-col gap-4 bg-gray-500"
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
    </div>
      
   )
}
