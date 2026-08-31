"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Star, Stars } from "lucide-react"

const movies = [
  {
    title: "Wicked",
    rating: "7/10",
    image: "/Feature.png",
    description:
      "Elphaba, a misunderstood young woman because of her green skin, and Glinda, a popular girl, become friends at Shiz University in the Land of Oz. After an encounter with the Wonderful Wizard of Oz, their friendship reaches a crossroads.",
  },
  {
    title: "Dune: Part Two",
    rating: "8.5/10",
    image: "/Feature.png",
    description:
      "Paul Atreides unites with the Fremen to seek revenge against those who destroyed his family, while facing a choice between the love of his life and the fate of the known universe.",
  },
  {
    title: "Oppenheimer",
    rating: "8.9/10",
    image: "/Feature.png",
    description:
      "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",
  },
]

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className=""
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="flex" >
        {movies.map((movie , index) => (
          <CarouselItem key={index}>
             <div className="relative w-full">
      <img src={movie.image} className="w-full  object-cover" />
      <div className="absolute left-30 bottom-80 w-80 h-80  text-white flex flex-col gap-5">
         <div className="flex flex-col gap-2">
          <p>Now playing</p>
           <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="flex gap-3">
             <Star /> {movie.rating}           </p>
         </div>
         <p className="h-35">{movie.description}</p>
         <button className="border w-50 rounded-2xl bg-white text-black">Watch Now</button>
       </div>
     </div>
          </CarouselItem>
        ))}
        
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}


// {movies.map((movie, index) => (
//   <CarouselItem key={index}>
//     <div className="relative w-full">
//       <img src={movie.image} className="w-full h-[500px] object-cover" />

//       <div className="absolute left-10 bottom-10 max-w-[80%] text-white flex flex-col gap-5">
//         <div className="flex flex-col gap-2">
//           <p>Now playing</p>
//           <h1 className="text-4xl font-bold">{movie.title}</h1>
//           <p className="flex gap-3">
//             <Star /> {movie.rating}
//           </p>
//         </div>
//         <p>{movie.description}</p>
//       </div>
//     </div>
//   </CarouselItem>
// ))}