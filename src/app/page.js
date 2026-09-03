"use client";

import { CarouselPlugin } from "./dropDown/CarouselPlugin";
import { Popular } from "./dropDown/Popular";
import { UpComing } from "./dropDown/UpComing";
import { TopRated } from "./dropDown/TopRated";

import { MovieList } from "./dropDown/MovieList";

export default function Home() {
  return (
    <div className="flex flex-col items-center  gap-20">
      <CarouselPlugin />
      <Popular />
      <UpComing />
      <TopRated />
      <MovieList />
    </div>
  );
}
