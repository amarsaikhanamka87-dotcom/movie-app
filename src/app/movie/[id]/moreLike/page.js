"use client";

import { MovieCard } from "@/app/dropDown/MovieCard";
import { SeparatorDemo } from "@/app/dropDown/SeparatorDemo";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import { MoveRight, Play, Star } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
  const router = useRouter();

  const [movie, setMovie] = useState({});
  const [actor, setActor] = useState();
  const [similarMovies, setSimilarMovie] = useState();
  const [video, setVideo] = useState();

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
        //console.log(data);
        setMovie(data);

        const resActors = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
          options,
        );
        const dataActors = await resActors.json();
        //console.log("dataActors", dataActors);
        setActor(dataActors);

        const responseSimilar = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
          options,
        );
        const similarData = await responseSimilar.json();
        setSimilarMovie(similarData.results);
      } catch (error) {
        console.log("Something went wrong", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDataAsync();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-6 gap-20">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="w-50 h-80" />
            ))
          : similarMovies?.map((sm) => (
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
  );
}
