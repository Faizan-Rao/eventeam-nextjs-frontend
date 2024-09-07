import clsx from "clsx";
import { CircleX, PencilLine, Plus } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { Control, Controller, useFieldArray, useWatch } from "react-hook-form";

import { IAutoConfig } from "./AutoConfigForm";
import EditSubEventDialog from "./EditSubEventDialog";
import AddSubEventDialog from "./AddSubEventDialog";

export const SubEventInput = ({
  control,
}: {
  control: Control<IAutoConfig, any>;
}) => {
  const { fields, append, replace, remove } = useFieldArray({
    control,
    name: "sub_events",
  });
  const watch = useWatch({ control });

  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col  gap-6 sm:p-0 md:p-4">
      {/* Dynamic Events */}
      <span className="flex gap-5  flex-wrap">
        {watch.sub_events &&
          (watch.sub_events as any[]).map((el, index) => {
            return (
              <div
                className="flex gap-1 px-4    items-center  bg-[#f6f6f6]  rounded-lg sm:max-w-[360px] "
                key={el.id}
              >
                {/* Card Content */}
                <div className="flex  ">
                  <div className="flex sm:my-4  md:mt-5 rounded-md   md:h-[90px] w-auto text-white flex-col justify-center items-center px-6  bg-[#7655fa] ">
                    <span>{format(el.date, "MMM")}</span>
                    <span className="sm:text-2xl md:text-4xl font-semibold">
                      {format(el.date, "dd")}
                    </span>
                  </div>
                  <div className="flex flex-col p-4 gap-2">
                    <h1 className="text-xl font-semibold">{el.name}</h1>

                    <h1 className="text-sm text-[#4a4a4a] font-semibold">
                      {el.start_time}
                    </h1>

                    <div className="flex gap-1  text-sm ">
                      <Controller
                        control={control}
                        name={`sub_events.${index}.active`}
                        render={({ field }) => (
                          <>
                            <button
                              onClick={() => field.onChange(true)}
                              className={clsx(
                                "font-semibold bg-[#C2FFCC] rounded-full px-4 py-2",
                                !field.value && "bg-transparent "
                              )}
                            >
                              Active
                            </button>
                            <button
                              onClick={() => field.onChange(false)}
                              className={clsx(
                                "font-semibold bg-[#FF9395]  rounded-full px-4 py-2",

                                field.value && " bg-transparent "
                              )}
                            >
                              Inactive
                            </button>
                          </>
                        )}
                      />
                    </div>
                  </div>
                </div>
                {/* Card Controls */}
                <div className="flex mx-3  h-auto sm:flex-col md:flex-row  self-stretch items-center flex-1 justify-end gap-4 p-2  my-1">
                  <EditSubEventDialog index={index} />
                  
                    <CircleX
                      onClick={() => {
                        const newArr = watch.sub_events?.filter(
                          (_, i) => i !== index
                        );
                        replace(newArr as any);
                      }}
                      className="text-[red] cursor-pointer"
                      strokeWidth={1}
                    />
                  
                </div>
              </div>
            );
          })}

        <button
          onClick={() => setOpen(true)}
          className="flex justify-center items-center h-[128px] min-w-[340px] flex-1 aspect-video border-dashed gap-4  border-[3.5px]   "
        >
          <Plus /> <span>Add Another Subevent</span>
        </button>
      </span>
      <AddSubEventDialog append={append} open={open} setOpen={setOpen} />
    </div>
  );
};
