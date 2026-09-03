

import { DropdownMenuDemo } from "../dropDown/DropdownMenuDemo";
import { ModeToggle } from "../dropDown/ModeToggle";



export function Heading() {
  

  
  return (
   <div className="flex   w-500 justify-between  mt-10">
    
    <img src="/Logo (6).png"  />
    
    <div className="flex gap-3">
    <DropdownMenuDemo/>
  
     <input  placeholder="Search ... " className=" border w-150 rounded-2xl px-5 "   />
     </div>
     <ModeToggle/>
   </div>
  );
}
