"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const options = {
  method: "GET",

  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8",
  },
};

export function DropdownMenuDemo() {
  const router = useRouter();
  const [genreList, setGenreList] = useState();

  useEffect(() => {
    const fetchUserDataAsync = async () => {
      try {
        const genreListRes = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?language=en`,
          options,
        );
        const genreListData = await genreListRes.json();
        setGenreList(genreListData.genres);
      } catch (error) {
        console.log("Something went wrong", error);
      }
    };
    fetchUserDataAsync();
  }, []);

  //console.log("list", genreList);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline">
            <ChevronDown />
            Genre
          </Button>
        }
      />
      <DropdownMenuContent className="w-100 m-5   ">
        <h1>Genres</h1>
        <p>See lists of movies by genre</p>
        {genreList?.map((genre) => {
          return (
            <Badge
              className="m-1.5"
              onClick={() => router.push(`/genre?search=${genre.name}`)}
            >
              {genre.name}
            </Badge>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
