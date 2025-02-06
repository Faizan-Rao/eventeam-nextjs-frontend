import clsx from "clsx";
import { CircleX, PencilLine, Plus } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import {
  Control,
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";

// import { IAutoConfig } from "./AutoConfigForm";

import AddSubEventDialog from "./AddSubEventDialog";
import _ from "lodash";
import { useTranslation } from "react-i18next";

export const SubEventInput = ({}: { errors?: string[] }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, append, replace, remove } = useFieldArray({
    control,
    name: "sub_events",
  });
  const watch = useWatch({ control });
  const { t } = useTranslation(["translation"]);

  // const [open, setOpen] = useState(false);
  return (
    <span className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2    gap-4">
      {watch.sub_events &&
        (watch.sub_events as any[]).map((el, index) => {
          return (
            <div
              className="flex gap-1 px-4    items-center  bg-[#f6f6f6] shadow-md   rounded-lg w-auto "
              key={el.id}
            >
              {/* Card Content */}
              <div className="flex  ">
                <div className=" sm:hidden md:flex sm:my-4  md:mt-5 rounded-md   md:h-[90px] w-auto text-white flex-col justify-center items-center px-6  bg-[#7655fa] ">
                  {el.date && (
                    // <span>{format(el.date.split("/")[1] || "1", "MMM")}</span>
                    <span>
                      {_.isDate(el.date)
                        ? format(el.date, "MMM")
                        : format(el.date.split(" ")[0].split("/")[1], "MMM")}
                    </span>
                  )}
                  <span className="sm:text-2xl md:text-4xl font-semibold">
                    {/* {el.date && el.date.split("/")[0]} */}
                    {_.isDate(el.date)
                      ? format(el.date, "dd")
                      : el.date.split(" ")[0].split("/")[0]}
                  </span>
                </div>
                <div className="flex flex-col p-4 gap-2 ">
                  <h1 className="text-xl font-semibold sm:text-[#7655fa] md:text-[#4a4a4a]">
                    {el.title}
                  </h1>

                  <h1 className="text-sm text-[#4a4a4a] ">
                    {_.isDate(el.date)
                      ? format(el.date, "MMM dd, yyyy  hh:mm")
                      : // : format(el.date.split("/")[1], "MMM dd, yyyy  hh:mm")}
                        el.date.split(" ")[0] + " " + el.date.split(" ")[1]}
                  </h1>

                  <div className="flex gap-4   text-sm flex-wrap">
                    <Controller
                      control={control}
                      name={`sub_events.${index}.status`}
                      render={({ field }) => (
                        <>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              field.onChange(field.value);
                              let subevents = [...watch.sub_events];
                              let obj = { ...watch.sub_events[index] };
                              obj.status = field.value === false ? "0" : "1";
                              subevents[index] = obj;
                              replace(subevents);
                            }}
                            className={clsx(
                              watch.sub_events[index].status === "1" &&
                                " p-2 bg-[#C2FFCC] rounded-full active:scale-[0.95] transition-all ",
                              watch.sub_events[index].status === "0" &&
                                "bg-[#eeeeee]  rounded-full p-2 active:scale-[0.95] transition-all"
                            )}
                          >
                            {t("Active")}
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              let subevents = [...watch.sub_events];
                              let obj = { ...watch.sub_events[index] };
                              obj.status = field.value === true ? "1" : "0";
                              subevents[index] = obj;
                              field.onChange(field.value);
                              replace(subevents);
                            }}
                            className={clsx(
                              watch.sub_events[index].status === "1" &&
                                "bg-[#eeeeee] active:scale-[0.95] transition-all  rounded-full px-4 py-2",
                              watch.sub_events[index].status === "0" &&
                                " p-2 bg-[#FF9395] active:scale-[0.95] transition-all  rounded-full px-4 py-2"
                            )}
                          >
                            {t("Inactive")}
                          </button>
                        </>
                      )}
                    />
                  </div>
                </div>
              </div>
              {/* Card Controls */}
              <div className="flex mx-3  h-auto   self-center items-end flex-1 justify-end gap-6 p-2  my-1">
                <AddSubEventDialog data={el} index={index} type="edit" />

                <CircleX
                  onClick={() => {
                    const newArr = watch.sub_events?.filter(
                      (_: any, i: number) => i !== index
                    );
                    replace(newArr as any);
                  }}
                  className="text-[red] cursor-pointer active:scale-[0.90] transition-all"
                  strokeWidth={1}
                />
              </div>
            </div>
          );
        })}

      {errors.sub_events && (
        <p className="text-red-800">Minimum One Sub Event Required</p>
      )}

      <AddSubEventDialog type="add" />
    </span>
    // <div className=" sm:min-w-[92vw] md:min-w-full flex flex-col  gap-6 ">
    //   Dynamic Events
    // </div>
  );
};
