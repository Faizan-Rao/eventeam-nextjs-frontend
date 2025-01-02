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

const UpcomingSubeventPreviewDialog = ({
  data,
  type,
}: {
  data: any;
  type: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger className="my-4">
        {type !== "comp_events" && (
          <span className="cursor-pointer justify-self-end self-center">
            <ViewEye />
          </span>
        )}

        {type === "comp_events" && (
          <span
            className={clsx(
              "bg-[#7655fa26] hover:text-white hover:bg-[#7655fa] transition-all sm:text-sm  md:text-sm mb-4 mt-2 my-4 px-4 py-2 text-center  rounded-full text-[#7655fa] font-semibold",
             
            )}
          >
            View Details
          </span>
        )}
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
