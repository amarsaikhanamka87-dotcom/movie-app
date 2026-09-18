import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Play } from "lucide-react";
import Link from "next/link";

export function DialogDemo({ id }) {
  return (
    <Dialog>
      <DialogContent>
        <DialogTrigger> </DialogTrigger>
        <Link
          className="border absolute bottom-85 left-230 bg-white text-black rounded-4xl px-3 py-3 flex gap-2"
          href={`https://www.youtube.com/watch?v=${id}`}
        ></Link>
      </DialogContent>
    </Dialog>
  );
}
