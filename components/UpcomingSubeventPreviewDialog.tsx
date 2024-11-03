import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import clsx from "clsx";
import React from "react";
import SubeventPreview from "./SubeventPreview";
import { DialogHeader } from "./ui/dialog";
import ViewEye from "./icons/ViewEye";

const UpcomingSubeventPreviewDialog = ({ data }: { data: any }) => {
  return (
   
    <Dialog>
      <DialogTrigger>
        <span className="cursor-pointer justify-self-end self-center">
          <ViewEye />
        </span>
      </DialogTrigger>
      <DialogContent className="sm:min-w-full md:min-w-[800px]">
        <DialogHeader>
         <DialogTitle>{data.title}</DialogTitle>
          <DialogDescription>
            <div className="flex  justify-center   flex-wrap">
              {data.sub_events.map((el: any, i: number) => {
                return (
                  <SubeventPreview
                    key={i}
                    data={el}
                    className={clsx(i % 2 === 1 && "bg-[#f7f6f9]  rounded-md")}
                  />
                );
              })}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
    
    
  );
};

export default UpcomingSubeventPreviewDialog;
