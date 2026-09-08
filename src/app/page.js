"use client";

import { CarouselPlugin } from "./dropDown/CarouselPlugin";
import { Popular } from "./Popular";
import { UpComing } from "./dropDown/UpComing";
import { TopRated } from "./dropDown/TopRated";

export default function Home() {
  return (
    <div className="flex flex-col items-center  gap-20">
      <CarouselPlugin />
      <UpComing />
      <Popular />

      <TopRated />
    </div>
  );
}
