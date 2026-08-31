import { UpComing } from "./dropDown/UpComing";
import { CarouselPlugin } from "./dropDown/CarouselPlugin";

export default function Home() {
  return (
    <div className="flex flex-col items-center  gap-20">
      <CarouselPlugin />
      <UpComing />
      <UpComing />
      <UpComing />
    </div>
  );
}
