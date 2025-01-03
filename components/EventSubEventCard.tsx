import React from "react";
import clsx from "clsx";
import { format } from "date-fns";
import { USDollar } from "@/configs/currentFormat";
interface ISubeventPreview {
  className?: string;
  data: any;
  type?: string;
}

const EventSubeventCard: React.FC<ISubeventPreview> = ({
  className,
  data,
  type,
}) => {
  return (
    <div
      className={clsx("flex w-auto flex-1 self-start  p-5 flex-col  gap-2 ", className)}
    >
      <div className="flex justify-between">
        <div className="flex  flex-col  ">
          <h1 className="text-xl font-semibold">{data.title || "No title"}</h1>
          <p className="text-sm text-[#E0A450]">
            {`${data.date.split(" ")[0]}`}
          </p>
        </div>

        <div className="flex flex-col justify-center mx-7">
          <p className="text-xl text-right text-[#E0A450] font-semibold">
            {data.sub_event_capacity || 0}
          </p>
          <h1 className="text-sm text-nowrap font-semibold">Max Capacity</h1>
        </div>
      </div>

      <table cellPadding={5} cellSpacing={10}>
        <thead>
          {type !== "activity" && (
            <tr className="border-b-[1px] my-4 ">
              <td className="font-semibold ">Ticket Type</td>
              <td className="font-semibold ">Price</td>
            </tr>
          )}

          {type === "activity" && (
            <tr className="border-b-[1px] my-4 ">
              <td className="font-semibold ">Name</td>
              <td className="font-semibold ">Time</td>
              <td className="font-semibold ">Status</td>
            </tr>
          )}
        </thead>
        <tbody className="">
          {type !== "activity" &&
            data.products.length > 0 &&
            data.products.map((el: any, i: number) => {
              return (
                <tr key={i} className="">
                  <td>{el.title}</td>
                  <td>{USDollar.format(el.price)}</td>
                </tr>
              );
            })}
          {type === "activity" &&
            data.sub_event_activities.length > 0 &&
            data.sub_event_activities.map((el: any, i: number) => {
              return (
                <tr key={i} className="">
                  <td>{el.title}</td>
                  <td>{el.time + " " + el.type}</td>
                  <td>
                    {el.is_show === 1 ? (
                      <p className="text-green-400 font-semibold">Active</p>
                    ) : (
                      <p className="text-red-800 font-semibold">Inactive</p>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default EventSubeventCard;
