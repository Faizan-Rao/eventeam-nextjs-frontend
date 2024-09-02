import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EllipsisVertical, Info } from "lucide-react";

const ShowSubEventInfoDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <span className="p-2 flex items-center transition-all justify-center rounded-full hover:bg-[#7655fa26]">
          <Info className="text-[#7655fa]" size={22} />
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Subevent Info</DialogTitle>
          <DialogDescription>
          <div className="flex flex-col gap-4">

          </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ShowSubEventInfoDialog;
