"use client";

import { MovieCard } from "@/app/dropDown/MovieCard";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Page() {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("q");

  const [movies, setMovies] = useState();
  const [list, setList] = useState();
  const [num, setNum] = useState();

  const router = useRouter();

  const [page, setPage] = useState(1);

  const [pageNum, setPageNum] = useState();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8",
    },
  };
  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en-US&page=${page}`,
          options,
        );
        const data = await res.json();
        setMovies(data.results.slice(0, 10));
        setNum(data.total_results);
        setPageNum(data.total_pages);
        console.log("ssbsbbshbxh", data);

        const genreRes = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?language=en`,
          options,
        );

        const genreData = await genreRes.json();
        setList(genreData.genres);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPopular();
  }, [searchValue, page]);

  console.log("num", num);
  console.log("pageNumber", pageNum);
  const handlePrevious = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  const handleNext = () => {
    if (num == 0) return;
    if (page == pageNum) return;
    setPage(page + 1);
  };

  return (
    <Suspense fallback={<div>Loading genres...</div>}>
      <div className="flex gap-50 ">
        <div className="flex flex-col gap-10">
          <h1 className="text-5xl font-black">Search result </h1>
          <div className="flex flex-col gap-5">
            <h1 className="text-2xl font-heading">
              {num} results for "{searchValue}"
            </h1>
          </div>
          {num == 0 ? (
            <div className="text-center text-black border w-150 h-50 p-24">
              No results found
            </div>
          ) : (
            <div className="grid grid-cols-5 gap-5">
              {movies?.map((movie) => {
                return (
                  <div
                    key={movie?.id}
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
                );
              })}
            </div>
          )}

          <Pagination>
            <PaginationContent>
              <PaginationPrevious onClick={handlePrevious} />
              <PaginationItem className="">
                <PaginationLink href="#">{page}</PaginationLink>
              </PaginationItem>
              <PaginationEllipsis />

              <PaginationNext onClick={handleNext} />
            </PaginationContent>
          </Pagination>
        </div>
        <div className="flex  bg-gray-200 h-250 w-0.5"></div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl font-black">Search by genre</h1>
            <p className="text-2xl">See list's of movies by genre</p>
          </div>
          <div className="w-100">
            {list?.map((l) => {
              return (
                <Badge
                  className="m-2"
                  onClick={() => router.push(`/genre?search=${l.id}`)}
                >
                  {l.name} <ChevronRight />
                </Badge>
              );
            })}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
