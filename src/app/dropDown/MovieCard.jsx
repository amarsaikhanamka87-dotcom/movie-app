import { Star } from "lucide-react";





export function MovieCard({rating , title , img}) {
  
return (
    <div className="w-50 flex flex-col  gap-5 border rounded-3xl p-1.5">
        <img src={img} />
        <div className="flex gap-2"><Star className="text-yellow-400"/>{rating}</div>
         <div>{title}</div>
     </div>
   )
}
