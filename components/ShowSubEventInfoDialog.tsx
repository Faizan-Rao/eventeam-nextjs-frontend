import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Clock, EllipsisVertical, Info, MapPin } from "lucide-react";
import { format } from "date-fns";
import { USDollar } from "@/configs/currentFormat";

const ShowSubEventInfoDialog = ({ data }: { data: any }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <span className="p-2 flex items-center transition-all justify-center rounded-full hover:bg-[#7655fa26]">
          <Info className="text-[#7655fa]" size={22} />
        </span>
      </DialogTrigger>
      <DialogContent className="md:min-w-[600px]">
        <DialogHeader>
          {/* <DialogTitle>Subevent Info</DialogTitle> */}
          <DialogDescription>
            <div className="flex flex-col gap-4 mt-4 ">
              <div className="flex flex-col border-b-[1px] my-1 ">
                <h1 className="text-[#7655fa] font-semibold">Sub Event Name</h1>
                <h1 className="text-[#4a4a4a] text-2xl font-semibold my-1">
                  {data.title}
                </h1>
              </div>
              <div className="flex flex-col justify-center bg-[#7655fa] rounded-lg p-4 gap-3">
                <div className="flex gap-4  p- items-center ">
                  <span className="bg-[#FFE58A] rounded-full p-1 font-semibold">
                    <MapPin className="text-[#4a4a4a]" size={20} />
                  </span>
                  <h1 className="text-[white] text-sm font-semibold">
                    {data.sub_event_address || "No Specified Address"}
                  </h1>
                </div>

                <div className="flex gap-4   items-center  ">
                  <span className="bg-[#E1FF81] rounded-full p-1 font-semibold">
                    <Clock className="text-[#4a4a4a]" size={20} />
                  </span>
                  <h1 className="text-[white]  text-sm font-semibold">
                    {(data.start_time &&
                      format(
                        new Date(
                          data.start_time.toLocaleString().replace(" ", "T")
                        ),
                        "h a, MMMM do"
                      )) ||
                      "No Specified Time"}
                  </h1>
                </div>
              </div>
              <div className="flex flex-col  my-1 ">
                <h1 className="text-[#7655fa] font-semibold">Ticket Types</h1>
                {data.products.map((el: any, i: number) => {
                  return (
                    <div
                      key={i}
                      className="border-b-[1px] flex justify-between"
                    >
                      <p className="text-[#4a4a4a] text-base font-semibold my-2">{el.title}</p>

                      <p className="text-[#4a4a4a] text-base font-semibold my-2">{USDollar.format(el.price)}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ShowSubEventInfoDialog;
