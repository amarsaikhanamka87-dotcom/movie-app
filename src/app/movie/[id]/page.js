"use client";

import { MovieCard } from "@/app/dropDown/MovieCard";
import { SeparatorDemo } from "@/app/dropDown/SeparatorDemo";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import { MoveRight, Star } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
  const router = useRouter();

  const [movie, setMovie] = useState({});
  const [actor, setActor] = useState();
  const [similarMovies, setSimilarMovie] = useState();
  const params = useParams();
  const movieId = params.id;

  const { id } = useParams();

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
    const fetchDataAsync = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          options,
        );
        const data = await response.json();
        console.log(data);
        setMovie(data);

        setIsLoading(true);
        const resActors = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
          options,
        );
        const dataActors = await resActors.json();
        console.log("dataActors", dataActors);
        setActor(dataActors);

        const responseSimilar = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
          options,
        );
        const similarData = await responseSimilar.json();
        setSimilarMovie(similarData.results);
        console.log("similarData", similarData.results);
      } catch (error) {
        console.log("Something went wrong", error);
      } finally {
        setIsLoading(true);
      }
    };
    fetchDataAsync();
  }, []);
  console.log("similarMovie", similarMovies);
  const Writing = actor?.crew?.filter(
    (a) => a.known_for_department == "Writing",
  );
  console.log("Writing", Writing);

  const Directing = actor?.crew?.filter(
    (p) => p.known_for_department == "Directing",
  );
  console.log("Directing", Directing);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between ">
        <div className="flex flex-col gap-3">
          {isLoading ? (
            <Skeleton className="w-150 h-10" />
          ) : (
            <h1 className="font-semibold text-5xl">{movie?.original_title}</h1>
          )}

          {isLoading ? (
            <div className="flex gap-5">
              <Skeleton className="w-30 h-10" />
              <Skeleton className="w-25 h-10" />
            </div>
          ) : (
            <div className="flex gap-3">
              <p>{movie.release_date}</p>
              <p>{movie.runtime} minute</p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-2xl pl-3">Rating :</p>
          {isLoading ? (
            <Skeleton className="w-20 h-8" />
          ) : (
            <p className="flex gap-1.5">
              <Star />
              {movie.vote_average}/10
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-5 ">
        {isLoading ? (
          <Skeleton className="h-185 w-120" />
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            className=" h-185 "
          />
        )}
        {isLoading ? (
          <Skeleton className="h-185 w-320" />
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            className=" h-185"
          />
        )}
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-2 ">
          {movie?.genres?.map((item) => {
            return (
              <Badge key={item.id} className="text-[18px]">
                {item.name}
              </Badge>
            );
          })}
        </div>
        {isLoading ? (
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-410" />
            <Skeleton className="h-8 w-250" />
          </div>
        ) : (
          <p className="h-20 w-410 text-2xl mb-8">{movie.overview}</p>
        )}

        <div className="flex flex-col gap-3">
          <div className="flex gap-5">
            <p className="text-3xl">Director :</p>
            {Directing?.slice(0, 3).map((d) => {
              return <p className="p-2 ">{d.name}</p>;
            })}
          </div>
          <SeparatorDemo />
          <div className="flex gap-5 text-center">
            <p className="text-3xl">Writers :</p>
            {Writing?.slice(0, 3).map((a) => {
              return <div className="p-2 ">{a.name}</div>;
            })}
          </div>
          <SeparatorDemo />
          <div className="flex gap-5 text-center ">
            <p className="text-3xl">Stars :</p>
            {actor?.cast?.slice(0, 3).map((a) => {
              return <div className="p-2 ">{a.name}</div>;
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-10  ">
        {isLoading ? (
          <div className="flex gap-190 ">
            <Skeleton className="w-200 h-8" />
            <Skeleton className="h-8 w-50" />
          </div>
        ) : (
          <div className="flex  gap-350">
            <h1 className="text-4xl font-bold">More like this</h1>
            <button className="flex gap-2">
              See more <MoveRight />
            </button>
          </div>
        )}

        <div className="grid grid-cols-6 gap-20">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="w-50 h-80" />
              ))
            : similarMovies.slice(0, 6).map((sm) => (
                <div
                  key={sm.id}
                  className="w-50  rounded-3xl p-0.8 flex flex-col gap-4  bg-gray-500"
                  onClick={() => router.push(`/movie/${sm.id}`)}
                >
                  <MovieCard
                    img={`https://image.tmdb.org/t/p/original${sm.poster_path}`}
                    title={sm.original_title}
                    rating={sm.vote_average}
                    id={sm.id}
                  />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
