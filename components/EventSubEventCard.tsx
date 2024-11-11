import React from "react";
import clsx from "clsx";
import { format } from "date-fns";
import { USDollar } from "@/configs/currentFormat";
interface ISubeventPreview {
  className?: string;
  data: any;
}

const EventSubeventCard: React.FC<ISubeventPreview> = ({ className, data }) => {
  return (
    <div
      className={clsx("flex w-auto flex-1   p-5 flex-col  gap-2 ", className)}
    >
      <div className="flex justify-between">
        <div className="flex  flex-col  ">
          <h1 className="text-xl font-semibold">{data.title || "No title"}</h1>
          <p className="text-sm text-[#E0A450]">
            {`${data.event.start_date.split(" ")[0]} - ${data.event.end_date.split(" ")[0]}`}
           
          </p>
        </div>

        <div className="flex flex-col mx-7">
          <h1 className="text-sm text-nowrap font-semibold">Max Capcity</h1>
          <p className="text-sm text-[#E0A450] font-semibold">
            {data.sub_event_capacity || 0}
          </p>
        </div>
      </div>

      <table cellPadding={5} cellSpacing={10}>
        <thead>
          <tr className="border-b-[1px] my-4 ">
            <td className="font-semibold ">Ticket Type</td>
            <td className="font-semibold ">Price</td>
          </tr>
        </thead>
        <tbody className="">
          {data.products.length > 0 &&
            data.products.map((el: any, i: number) => {
              return (
                <tr key={i} className="">
                  <td>{el.title}</td>
                  <td>{USDollar.format(el.price)}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default EventSubeventCard;
