import { Star } from "lucide-react";

export function MovieCard({ img, title, rating }) {
  return (
    <div>
      <img src={img} className="rounded-t-2xl" />

      <h1 className="ml-5 mt-5 mr-5">{title}</h1>
      <div className="flex gap-2 ml-5 mt-2 mb-5">
        <Star className="fill-yellow-400" />
        {rating}/10
      </div>
    </div>
  );
}
