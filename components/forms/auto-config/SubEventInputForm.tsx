import clsx from "clsx";
import { CircleX, PencilLine, Plus } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { Control, Controller, useFieldArray, useFormContext, useWatch } from "react-hook-form";

// import { IAutoConfig } from "./AutoConfigForm";

import AddSubEventDialog from "./AddSubEventDialog";

export const SubEventInput = ({} : {errors?: string[]}) => {

  const {control, formState: {errors}} = useFormContext()
  const { fields, append, replace, remove } = useFieldArray({
    control,
    name: "sub_events",
  });
  const watch = useWatch({ control });

  // const [open, setOpen] = useState(false);
  return (
    <div className=" sm:min-w-[92vw] md:min-w-full flex flex-col  gap-6 sm:p-0 md:p-4">
      {/* Dynamic Events */}
      <span className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2  gap-4">
        {watch.sub_events &&
          (watch.sub_events as any[]).map((el, index) => {
            return (
              <div
                className="flex gap-1 px-4    items-center  bg-[#f6f6f6] min-w-[350px]   rounded-lg w-auto "
               
                key={el.id}
              >
                {/* Card Content */}
                <div className="flex  ">
                  <div className="flex sm:my-4  md:mt-5 rounded-md   md:h-[90px] w-auto text-white flex-col justify-center items-center px-6  bg-[#7655fa] ">
                 { el.date && <span>{ format(el.date.split("/")[1] || "1","MMM")}</span>}
                    <span className="sm:text-2xl md:text-4xl font-semibold">
                      { el.date && el.date.split("/")[0]}
                    </span>
                  </div>
                  <div className="flex flex-col p-4 gap-2">
                    <h1 className="text-xl font-semibold">{el.title}</h1>

                    <h1 className="text-sm text-[#4a4a4a] ">
                      {el.date}
                    </h1>

                    <div className="flex gap-1  text-sm ">
                      <Controller
                        control={control}
                        name={`sub_events.${index}.status`}
                        render={({ field }) => (
                          <>
                            <button
                              onClick={(e) => {
                                e.preventDefault()
                                field.onChange(true)}}
                              className={clsx(
                                " text-sm bg-[#C2FFCC] rounded-full px-4 py-2",
                                !(field.value === "1") && "bg-transparent "
                              )}
                            >
                              Active
                            </button>
                            <button
                              onClick={(e) => {
                                e.preventDefault()
                                field.onChange(false)}}
                              className={clsx(
                                " text-sm bg-[#FF9395]  rounded-full px-4 py-2",

                                (field.value === "0") && " bg-transparent "
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
                <div className="flex mx-3  h-auto sm:flex-col md:flex-row  self-center items-end flex-1 justify-end gap-4 p-2  my-1">
                <AddSubEventDialog data={el} index={index} type="edit"  />
                  
                    <CircleX
                      onClick={() => {
                        const newArr = watch.sub_events?.filter(
                          (_:any, i:number) => i !== index
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

      
      {
        errors.sub_events && <p className="text-red-800">Minimum One Sub Event Required</p>
      }

      <AddSubEventDialog type="add"  />
        
      </span>
    </div>
  );
};
