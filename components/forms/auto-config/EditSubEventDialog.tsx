"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { PenBoxIcon } from "lucide-react";
import { ChangeEvent, SyntheticEvent } from "react";


export const EditSubEventDialog = ({
  el,
  setUpdate,
  update,
  index,
  updateState,
}: {
  el: object;
  setUpdate: React.Dispatch<any>;
  update: (str: any, value: any) => void;
  index: number;
  updateState: any;
}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <PenBoxIcon className="cursor-pointer" strokeWidth={1} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold mx-auto">
            {(el as any).name}
          </DialogTitle>
          <DialogDescription>
            <div className="flex flex-col gap-6 p-4">
              {/* Event Name */}
              <span className="flex gap-2 flex-col">
                <label className={"text-[#4a4a4a] font-semibold"}>
                  Event Name
                </label>
                <input
                  type="text"
                  defaultValue={(el as any).name}
                  onChange={(e: ChangeEvent) =>
                    setUpdate({...updateState, name: (e.target as any).value })
                  }
                  className="border-[2px] outline-none p-2 w-full"
                  placeholder="Enter Name"
                />
              </span>

              {/* Event Dates */}
              <div className="flex flex-col gap-3">
                <div className="flex gap-4">
                  <span className="flex-1 flex gap-3 flex-col">
                    <label className={"text-[#4a4a4a] font-semibold"}>
                      Start Time
                    </label>

                    <input
                      type="time"
                      defaultValue={"00:00"}
                      onChange={(e: ChangeEvent) => {
                        const hour = (e.target as any).value.split(":")[0];
                        const min = (e.target as any).value.split(":")[1];
                        const date = new Date(Date.now());
                        date.setHours(hour);
                        date.setMinutes(min);
                        setUpdate({...updateState, start_time: date });
                      }}
                      className="border-[2px] outline-none p-2 w-full cursor-pointer"
                    />
                  </span>
                  <span className="flex-1 flex gap-3 flex-col">
                    <label className={"text-[#4a4a4a] font-semibold"}>
                      End Time
                    </label>
                    <input
                      type="time"
                      defaultValue={"00:00"}
                      onChange={(e: ChangeEvent) => {
                        const hour = (e.target as any).value.split(":")[0];
                        const min = (e.target as any).value.split(":")[1];
                        const date = new Date(Date.now());
                        date.setHours(hour);
                        date.setMinutes(min);
                        setUpdate({ ...updateState, end_time: date });
                      }}
                      className="border-[2px] outline-none p-2 w-full "
                    />
                  </span>
                </div>

                <span className="flex  gap-1 my-3 flex-col">
                  <label className={"text-[#4a4a4a] font-semibold"}>Date</label>
                  <input
                    type="date"
                    defaultValue={(el as any).date}
                    onChange={(e: ChangeEvent) => {
                      setUpdate({...updateState,
                        date: new Date((e.target as any).value),
                      });
                    }}
                    className="border-[2px] outline-none p-2 w-full "
                  />
                </span>
                <button
                  className="bg-[#7655fa] px-6 py-2 text-white rounded-full"
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    update(index, {...el , ...updateState} as any);
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
   
  );
};
