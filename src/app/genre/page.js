"use client";

import { Badge, ChevronRight, MoveRightIcon, X, XIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { MovieCard } from "../dropDown/MovieCard";
import { Separator } from "@/components/ui/separator";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8",
  },
};

export default function Page() {
  const [movies, setMovies] = useState();
  const [genreList, setGenreList] = useState();
  const router = useRouter();

  const [title, setTitle] = useState();

  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();
  const searchId = searchParams.get("search");

  const [num, setNum] = useState();

  const genreIds = searchParams.get("search").split(",").map(Number);

  const [pageNum, setPageNum] = useState();

  useEffect(() => {
    const fetchUserDataAsync = async () => {
      try {
        const genreListRes = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?language=en`,
          options,
        );
        const genreListData = await genreListRes.json();
        setGenreList(genreListData.genres);
        setPageNum(genreListData.total_pages);

        const genreRes = await fetch(
          `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreIds.join(",")}&page=${page}`,
          options,
        );
        const genreData = await genreRes.json();
        setMovies(genreData.results);
        setNum(genreData.total_results);
      } catch (error) {
        console.log("Something went wrong", error);
      }
    };
    fetchUserDataAsync();
  }, [genreIds, page]);

  const titleDisplay = useMemo(() => {
    return genreList
      ?.filter((g) => genreIds.includes(g.id))
      .map((g) => g.name)
      .join(", ");
  }, [genreList, genreIds]);

  const handlePrevious = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  const handleNext = () => {
    if (num == 0) return;
    if (page == pageNum) return;
    setPage(page + 1);
  };

  const handleClick = (id) => {
    if (genreIds.includes(id)) return;
    router.push(`/genre?search=${searchId},${id}`);

    setPage(1);
  };

  const handleX = (e, id) => {
    e.stopPropagation(); // Stops the parent div trigger event
    const updatedIds = genreIds.filter((genreId) => genreId !== id);

    if (updatedIds.length === 0) {
      return;
    } else {
      router.push(`/genre?search=${updatedIds.join(",")}`);
    }
    setPage(1);
  };
  return (
    <Suspense fallback={<div>Loading genres...</div>}>
      <div className="flex flex-col gap-20">
        <h1 className="text-5xl font-bold ">Search filter</h1>

        <div className="flex  gap-50">
          <div>
            <div className="flex flex-col gap-5 text-3xl">
              <h1 className="font-bold ">Genres</h1>
              <p>See lists of movies by genre</p>
            </div>
            <div className="grid grid-cols-4  mt-5">
              {genreList?.map((genre) => {
                return (
                  <div
                    key={genre.id}
                    className={`border rounded-2xl px-5 w-fit m-1.5 flex gap-2 ${genreIds.includes(genre.id) ? `bg-black text-white ` : ``}} `}
                    onClick={() => handleClick(genre.id)}
                  >
                    {genre.name}
                    {genreIds.includes(genre.id) ? (
                      <X
                        onClick={(e) => handleX(e, genre.id)}
                        className="cursor-pointer"
                      />
                    ) : (
                      <ChevronRight />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-15">
            <h1 className="text-4xl font-bold">
              {num} titles in "{titleDisplay}"
            </h1>
            <div className=" w-250  grid grid-cols-4 gap-5">
              {movies?.slice(0, 8).map((movie) => {
                return (
                  <div
                    className=" border rounded-2xl bg-gray-300"
                    onClick={() => router.push(`/movie/${movie.id}`)}
                    key={movie.id}
                  >
                    <MovieCard
                      img={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      title={movie.title}
                      rating={movie.vote_average}
                    />
                  </div>
                );
              })}
            </div>
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
        </div>
      </div>
    </Suspense>
  );
}
