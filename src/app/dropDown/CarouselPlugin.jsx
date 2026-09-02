"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Star} from "lucide-react"



export function CarouselPlugin() {
  const [movies, setMovies] = React.useState([]);
  
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8",
      },
    };
  
    React.useEffect(() => {
      const fetchUserDataAsync = async () => {
        try {
          const response = await fetch(
            "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api-key",
            options,
          );
          const data = await response.json();
          setMovies(data.results);
        } catch (error) {
          console.log("Something went wrong", error);
        }
      };
      fetchUserDataAsync();
    }, []);
    console.log(movies);
  const plugin = React.useRef(
    Autoplay({ delay: 1000, stopOnInteraction: true })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
  
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
     <CarouselContent className="flex" >
      
        {movies.map((movie , index) => (
          <CarouselItem key={index}>
             <div className="relative w-full ">
            <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`  } 
className="w-full   h-250 object-cover" />
      <div className="absolute left-30 bottom-80 w-80 h-80  text-white flex flex-col gap-5">
         <div className="flex flex-col gap-2">
          <p>Now playing</p>
           <h1 className="text-4xl font-bold">{movie.original_title}</h1>
          <p className="flex gap-3">
             <Star className=" text-yellow-500"/> {movie.vote_average}</p>
         </div>
         <p >{movie.overview}</p>
         <button className="border w-50 rounded-2xl bg-white text-black">Watch Now</button>
       </div>
     </div>
          </CarouselItem>
        ))}
        
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}


