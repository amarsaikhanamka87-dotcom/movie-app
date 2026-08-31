"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, ChevronRight } from "lucide-react"

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline"><ChevronDown />Genre</Button>} />
      
       <DropdownMenuContent className="w-100 m-5   ">
        <h1>Genres</h1>
        <p>See lists of movies by genre</p>
     <Badge className="m-1.5">Animation<ChevronRight /></Badge>
     <Badge className="m-1.5">Action<ChevronRight /></Badge>
     <Badge className="m-1.5">Adventure<ChevronRight /></Badge>
    <Badge className="m-1.5">Biography<ChevronRight /></Badge>
     <Badge className="m-1.5">Comedy<ChevronRight /></Badge>

     <Badge className="m-1.5">Crime<ChevronRight /></Badge>
     <Badge className="m-1.5">Documentary<ChevronRight /></Badge>
     <Badge className="m-1.5">Drama<ChevronRight /></Badge>
     <Badge className="m-1.5">Family<ChevronRight /></Badge>
    <Badge className="m-1.5">Fantasy<ChevronRight /></Badge>
     <Badge className="m-1.5">Film-Noir<ChevronRight /></Badge>
     <Badge className="m-1.5">Game-Show<ChevronRight /></Badge>
    <Badge className="m-1.5">History<ChevronRight /></Badge>
    
<Badge className="m-1.5">Horror<ChevronRight /></Badge>
<Badge className="m-1.5">Music<ChevronRight /></Badge>
<Badge className="m-1.5">Musical<ChevronRight /></Badge>
<Badge className="m-1.5">Mystery<ChevronRight /></Badge>

<Badge className="m-1.5">News<ChevronRight /></Badge>
<Badge className="m-1.5">Reality-TV<ChevronRight /></Badge>
<Badge className="m-1.5">Romance<ChevronRight /></Badge>
<Badge className="m-1.5">Sci-Fi<ChevronRight /></Badge>
<Badge className="m-1.5">Short<ChevronRight /></Badge>
<Badge className="m-1.5">Sport<ChevronRight /></Badge>
<Badge className="m-1.5">Talk-Show<ChevronRight /></Badge>
<Badge className="m-1.5">Thriller<ChevronRight /></Badge>
<Badge className="m-1.5">War<ChevronRight /></Badge>
<Badge className="m-1.5">Western<ChevronRight /></Badge>
</DropdownMenuContent>
    </DropdownMenu>
  )
}
