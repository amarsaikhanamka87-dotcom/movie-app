"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function CarouselPlugin() {
  const [movies, setMovies] = React.useState([]);
  const router = useRouter();
  const [trailerKey, setTrailerKey] = React.useState(null);
  const [movieId, setMovieId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchUserDataAsync = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8",
        },
      };

      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
          options,
        );
        const data = await response.json();
        setMovies(data.results.slice(0, 3));
      } catch (error) {
        console.log("Something went wrong", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserDataAsync();
  }, []);

  React.useEffect(() => {
    const fetchTrailerKey = async () => {
      if (!movieId) return;
      try {
        const endpoint = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTkyMTk2OTJlMmI4M2U0NjViZWUzODhmY2RlZWRkOCIsIm5iZiI6MTc6MzQyOTQ5Ni4zOTEsInN1YiI6IjY5MWJjYzc4YmQ0ZjI0N2UxYTE3NjBiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z6ZK-29-4pUnr48N5xmQ13lNyqFSFKnys3tWUKasT84",
          },
        });
        const data = await response.json();
        const trailer = data?.results?.find((item) => item.type === "Trailer");
        setTrailerKey(trailer ? trailer.key : null);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTrailerKey();
  }, [movieId]);

  const plugin = React.useRef(
    Autoplay({ delay: 1000, stopOnInteraction: true }),
  );

  return (
    <>
      {isLoading ? (
        <Skeleton className="w-screen h-200" />
      ) : (
        <Carousel
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="flex">
            {movies.map((movie, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full ">
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    className="w-full h-250 object-cover"
                    alt={movie.original_title}
                  />
                  <div className="absolute left-30 bottom-80 w-80 h-80 text-white flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                      <p>Now playing</p>
                      <h1 className="text-4xl font-bold">
                        {movie.original_title}
                      </h1>
                      <div className="flex gap-3">
                        <Star className="fill-yellow-500 text-yellow-500" />
                        {movie.vote_average}/10
                      </div>
                    </div>
                    <p className="line-clamp-3">{movie.overview}</p>

                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          className="border absolute bottom-0 left-0 bg-white text-black rounded-4xl px-3 py-3 flex gap-2"
                          onClick={() => setMovieId(movie.id)}
                        >
                          Watch Now
                        </button>
                      </DialogTrigger>
                      <DialogContent
                        showCloseButton={false}
                        className="sm:max-w-[800px] p-0 bg-transparent border-none"
                      >
                        <div className="aspect-video w-full">
                          {trailerKey ? (
                            <iframe
                              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                              title="YouTube video player"
                              className="w-full h-full border-0 block"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              referrerPolicy="strict-origin-when-cross-origin"
                              allowFullScreen
                            ></iframe>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-black text-white"></div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </>
  );
}
