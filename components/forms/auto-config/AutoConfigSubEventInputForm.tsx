import clsx from "clsx";
import { CircleX, Plus } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { Control, useFieldArray } from "react-hook-form";
import { EditSubEventDialog } from "./AutoConfigEditSubEventDialog";
import { IAutoConfig } from "./AutoConfigForm";

export const SubEventInput = ({
    control,
  }: {
    control: Control<IAutoConfig, any>;
  }) => {
    const [updateState, setUpdate] = useState<{
      name: string;
      start_time: Date;
      end_time: Date;
      date: Date;
      active: boolean;
    }>();
  
    const { fields, append, remove, update } = useFieldArray({
      control,
      name: "sub_events",
    });
    return (
      <div className="flex flex-col  gap-6 p-4">
        {/* Dynamic Events */}
        <span className="flex gap-2 flex-wrap">
          {fields.map((el, index) => {
            return (
              <div
                className="flex gap-4 items-center bg-[#f6f6f6]  rounded-lg overflow-hidden min-w-[41%] "
                key={el.id}
              >
                {/* Card Content */}
                <div className="flex gap-1  ">
                  <div className="flex  text-white flex-col place-items-center  p-4  bg-[#7655fa] ">
                    <span>{format(el.date, "MMM")}</span>
                    <span className="text-4xl">{format(el.date, "dd")}</span>
                  </div>
                  <div className="flex flex-col p-4 gap-3">
                    <h1 className="text-xl font-semibold">{el.name}</h1>
  
                    <h1 className="text-sm text-[#4a4a4a] font-semibold">
                      {format(el.start_time, "KK:mm aa")} -{" "}
                      {format(el.end_time, "KK:mm aa")}
                    </h1>
  
                    <button
                      onClick={() => (el.active = !el.active)}
                      className={clsx(
                        "font-semibold",
                        el.active && "bg-[#C2FFCC] rounded-full",
                        !el.active && "bg-[#FF9395]   rounded-full"
                      )}
                    >
                      {el.active ? "Active" : "Inactive"}
                    </button>
                  </div>
                </div>
                {/* Card Controls */}
                <div className="flex mx-3 bg-[white] gap-4 p-2  rounded-full">
                  {index > 0 && (
                    <CircleX
                      onClick={() => remove(index)}
                      className="text-[red] cursor-pointer"
                      strokeWidth={1}
                    />
                  )}
                  <EditSubEventDialog
                    el={el as any}
                    setUpdate={setUpdate}
                    update={update}
                    index={index}
                    updateState={updateState}
                  />
                </div>
              </div>
            );
          })}
          <div>
            <button
              onClick={() =>
                append({
                  name: "Sub Event",
                  start_time: new Date(),
                  end_time: new Date(),
                  date: new Date(),
                  active: true,
                })
              }
              className="flex items-center gap-4 my-4  justify-self-start  text-[#7655fA]"
            >
              {" "}
              <Plus /> <span>Add Another Subevent</span>
            </button>
          </div>
        </span>
      </div>
    );
  };
  