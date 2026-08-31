import { MoveRight, Star } from "lucide-react"

export function UpComing() {
    const MovieList  = [
        {
            name :"DearSanta", 
            img : "/movie1.png",
           rating: "8.5/10"
        },
         {
            name :"How To Train Your Dragon Live Action", 
            img : "/movie2.png",
            rating: "8.5/10"
        },
         {
            name :"Alien Romulus", 
            img : "/movie3.png",
         rating: "8.5/10"
        },
         {
            name :"From the Ashes", 
            img : "/movie4.png",
         rating: "8.5/10"
        },
         {
            name :"Space Dogg", 
            img : "/movie5.png",
          rating: "8.5/10"
        },
         
        {
            name :"The Order", 
            img : "/movie6.png",
        rating: "8.5/10"
        },
        {
            name :"Y2K", 
            img : "/movie7.png",
            rating: "8.5/10"
        },
         {
            name :"Solo Leveling: ReAwakening", 
            img : "/movie8.png",
         rating: "8.5/10"
        },
         {
            name :"Get Away", 
            img : "/movie9.png",
          rating: "8.5/10"
        },
         {
            name :"Sonic the Hedgehog 3", 
            img : "/movie10.png",
        rating: "8.5/10"
        }
    ]
   return (
    <div className="flex flex-col gap-10">
        <div className="flex justify-between ">
            <h1 className="text-3xl font-bold">Upcomig</h1>
            <button className="flex gap-2">See more<MoveRight/></button>
        </div>
    <div className=" grid grid-cols-5 gap-5">
        {MovieList.map((movie, index) =>{
            return (
            <div key={index} className="border rounded-2xl flex flex-col gap-5">
                <img src={movie.img} alt={movie.name}/>
                <div className="flex flex-col p-3 gap-2">
                    <div className="flex gap-2">
               <Star/>{movie.rating}
               </div>
            {movie.name}
           
            </div>
            
          
            </div>)
        })}
    </div>
    </div>
   )
    
   
}
//<img src={movie.img} alt={movie.name} />