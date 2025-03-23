"use client";

import {
  ChevronDown,
  CircleX,
  DollarSign,
  PenBoxIcon,
  PencilLine,
  Plus,
} from "lucide-react";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";

import AddSubEventGenInfo from "./AddSubEventGenInfo";
import { Calendar } from "@/components/ui/calendar";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { differenceInDays, format } from "date-fns";
import {
  useFieldArray,
  UseFieldArrayAppend,
  useFormContext,
} from "react-hook-form";
// import { IAutoConfig } from "./AutoConfigForm";
import { useWatch } from "react-hook-form";

import { subevent, Validator } from "@/configs/autoFormValidation";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const AddSubEventDialog: React.FC<AddSubEventDialog> = ({
  data,
  type,
  index,
}) => {
  const { control } = useFormContext();
  const watch = useWatch({ control });
  const [dateError, setDateError] = useState(false);
  const { append, replace } = useFieldArray({ control, name: "sub_events" });
  const [tickets, setTickets] = useState<
    {
      name: string;
      price: string;
    }[]
  >([
    {
      name: "",
      price: "",
    },
  ]);

  const defaultValue: IFieldElement = {
    title: "",
    date: ``,
    status: "1",
    manage_inventory: 0,
    event_capacity: null,
    address: "",
    description: "",
    ticket_types: [
      {
        title: "",
        description: "",
        price: "",
      },
    ],
  };
  const [field, setField] = useState<IFieldElement>(
    type === "edit" ? data : defaultValue
  );
  const [isSettingOpen, setSettingOpen] = useState(false);
  const [customErrors, setErrors] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const {
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    const errors = Validator(field, subevent);
    setErrors(errors);
    console.log(errors);
  }, [field]);

  const fillTicketTypesAddSubEvent = useCallback(() => {
    if (type === "add") {
      const newArr = watch.tickets?.map((el: any) => {
        return {
          title: el.title,
          price: "",
          description: "",
        };
      });

      setField({ ...field, ticket_types: newArr });

      console.log("new Arr tickets", newArr);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fillTicketTypesAddSubEvent();
  }, [fillTicketTypesAddSubEvent]);

  const isDateBetween = (
    targetDate: string,
    startDate: string,
    endDate: string
  ) => {
    // Ensure all inputs are properly parsed as Date objects
    const target = new Date(targetDate).getTime();
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    // Check if the target date is between start and end (inclusive)
    return target >= start && target <= end;
  };

  const [selectedDate, setSelectedDate] = useState<string>();
  const [date, setDate] = useState<Date>(
    new Date(data?.date.split(" ")[0]) || new Date(Date.now())
  );
  const pathname = usePathname();
  const { t } = useTranslation(["translation"]);

  console.log("selected edit data", date);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {type === "edit" && (
        <DialogTrigger>
          <PencilLine
            // onClick={() => setOpen(true)}
            className=" cursor-pointer active:scale-[0.90] transition-all text-[#7655fa]"
            strokeWidth={1}
          />
        </DialogTrigger>
      )}
      {type === "add" && (
        <DialogTrigger className="w-full">
          <button
            onClick={(e) => {
              e.preventDefault();
              setOpen(true);
            }}
            className="flex w-full active:scale-[0.95] transition-all justify-center items-center h-[128px]  flex-1 cursor-pointer  border-dashed gap-4  border-[3.5px]   "
          >
            <Plus /> <span>{t("Add Another Subevent")}</span>
          </button>
        </DialogTrigger>
      )}
      <DialogContent className=" overflow-auto  lg:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold ">
            {type === "edit" ? "Edit Subevent" : "Add New Subevent"}
          </DialogTitle>
          <DialogDescription className=" overflow-auto max-h-[600px]">
            <div className="flex flex-col gap-6 sm:p-0 md:p-4 ">
              <h1 className="font-semibold text-xl">
                {t("General Information")}
              </h1>
              <div className="flex flex-1 flex-wrap gap-4">
                <AddSubEventGenInfo
                  index={index}
                  type={type}
                  errors={customErrors}
                  field={field}
                  setField={setField}
                />
                <div className="shadow-md self-start rounded-md md:mx-4 sm:w-full md:max-w-[300px]">
                   <Calendar
                    mode="single"
                 

                    selected={date as any}
                    onSelect={(value: Date | any) => {
                      if (pathname.includes("add-event")) {
                        const startDate = new Date(`${watch.start_date}`);
                        const endDate = new Date(`${watch.end_date}`);
                        console.log("start date", startDate === value);
                        const isInBetween = isDateBetween(
                          value?.toLocaleDateString(),
                          startDate.toLocaleDateString(),
                          endDate.toLocaleDateString()
                        );
                        if (isInBetween) {
                          setSelectedDate(format(value, "MM/dd/yyyy"));
                          setDate(value);
                          setDateError(false);
                        } else {
                          setSelectedDate(format(value, "MM/dd/yyyy"));
                          setDateError(true);
                          setDate(value);
                        }
                      } else {
                        if(type === "edit")
                        {
                          if (value === undefined) {
                            value = new Date();
                          }
  
                          const currentState = new Date(date);
                          currentState.setMinutes(
                            parseInt(data.date.split(" ")[1].split(":")[1])
                          );
                          currentState.setHours(
                            parseInt(data.date.split(" ")[1].split(":")[0])
                          );
                          currentState.setDate(value.getDate());
                          currentState.setMonth(value.getMonth());
                          currentState.setFullYear(value.getFullYear());
  
                          setField({
                            ...field,
                            date: format(currentState, "dd/MM/yyyy HH:mm"),
                          });
                        }
                        
                        setDate(value);
                        setDateError(false);
                      }
                    }}
                    className="max-h-[400px] w-full text-black font-semibold"
                  />
                  {/* { type === "edit" && data && <Calendar
                    mode="single"
                   

                    selected={date as any}
                    onSelect={(value: Date | any) => {
                      if (pathname.includes("add-event")) {
                        const startDate = new Date(`${watch.start_date}`);
                        const endDate = new Date(`${watch.end_date}`);
                        console.log("start date", startDate === value);
                        const isInBetween = isDateBetween(
                          value?.toLocaleDateString(),
                          startDate.toLocaleDateString(),
                          endDate.toLocaleDateString()
                        );
                        if (isInBetween) {
                          setSelectedDate(format(value, "MM/dd/yyyy"));
                          setDate(value);
                          setDateError(false);
                        } else {
                          setSelectedDate(format(value, "MM/dd/yyyy"));
                          setDateError(true);
                          setDate(value);
                        }
                      } else {
                        if(type === "edit")
                        {
                          if (value === undefined) {
                            value = new Date();
                          }
  
                          const currentState = new Date(date);
                          currentState.setMinutes(
                            parseInt(data.date.split(" ")[1].split(":")[1])
                          );
                          currentState.setHours(
                            parseInt(data.date.split(" ")[1].split(":")[0])
                          );
                          currentState.setDate(value.getDate());
                          currentState.setMonth(value.getMonth());
                          currentState.setFullYear(value.getFullYear());
  
                          setField({
                            ...field,
                            date: format(currentState, "dd/MM/yyyy HH:mm"),
                          });
                        }
                        
                        setDate(value);
                        setDateError(false);
                      }
                    }}
                    className="max-h-[400px] w-full text-black font-semibold"
                  />} */}

                  {date && (
                    <div className=" flex rounded-md  flex-col bg-[#7655fa]  p-4 gap-2 m-3 ">
                      <label className={"text-white font-semibold"}>
                        {t("Start Time")}
                      </label>

                      <input
                        type="time"
                        defaultValue={
                          type === "edit" ? data?.date.split(" ")[1] : "00:00"
                        }
                        min="00:00"
                        max="24:00"
                        onChange={(e) => {
                          
                          const newDate = new Date();
                          console.log("targeted Date 2", date);
                          const currentState = new Date(date);
                          console.log("targeted Date 2", date);
                          newDate.setMinutes(
                            parseInt(e.target.value.split(":")[1])
                          );
                          newDate.setHours(
                            parseInt(e.target.value.split(":")[0])
                          );
                          currentState.setTime(newDate.getTime());
                          currentState.setDate(date.getDate());
                          currentState.setMonth(date.getMonth());
                          currentState.setFullYear(date.getFullYear());
                          console.log("targeted date", currentState);
                          try {
                            setField({
                              ...field,
                              date: format(currentState, "dd/MM/yyyy HH:mm"),
                            });
                            
                          } catch (error) {
                            if(error !== undefined)
                            {

                              toast("Please Change Date First then Time", {type:"error"})
                            }
                          }
                        }}
                        className=" rounded-md outline-none p-2 w-full cursor-pointer text-black"
                      />
                    </div>
                  )}

                  <p className="text-[#7655fa] p-2">{`*${t(
                    "Select Date First Then Time"
                  )}`}</p>
                  {customErrors?.includes("date") && (
                    <p className="text-red-800 m-4">{`Date & Time is Required`}</p>
                  )}
                  {dateError && (
                    <p className="text-red-800 m-4 ">{`Date must be between "${format(
                      new Date(watch.start_date),
                      "dd MMM yyyy"
                    )}" and "${format(
                      new Date(watch.end_date),
                      "dd MMM yyyy"
                    )}"`}</p>
                  )}
                </div>
              </div>
              <h1 className="font-semibold text-xl">{t("Ticket Types")}</h1>
              <div className="flex flex-col  gap-6 ">
                {/* Event Name */}
                <div className="flex gap-2 flex-col">
                  <label className={"text-[#4a4a4a] font-semibold"}>
                    {t("Tickets")}
                  </label>

                  {watch.tickets.map((el: any, index: number) => {
                    return (
                      <div
                        className="grid sm:grid-cols-2 md:grid-cols-3 gap-2"
                        key={index}
                      >
                        <input
                          type="text"
                          className="border-[2px] outline-none p-2  sm:max-w-xs md:max-w-full flex-1"
                          placeholder="Enter Ticket Name"
                          value={el.title}
                          disabled={true}
                        />
                        <div className="flex gap-4  border-[2px] items-center    ">
                          <input
                            type="number"
                            className=" outline-none p-2 flex-1 sm:max-w-[90px] md:max-w-full "
                            placeholder="Enter Price"
                            defaultValue={
                              type === "edit" &&
                              data?.ticket_types[index]?.price
                            }
                            onChange={(e) => {
                              const newArr = [...field.ticket_types];
                              let obj = {
                                title: el.title as string,
                                price: e.target.value as string,
                                description: "" as string,
                              };

                              newArr[index] = obj as any;
                              setField({
                                ...field,
                                ticket_types: [...newArr],
                              });
                            }}
                          />
                          <DollarSign className="ml-auto" size={18} />
                        </div>
                      </div>
                    );
                  })}
                  {customErrors?.includes("ticket_types") && (
                    <p className="text-red-800">{`Fill All Ticket Prices`}</p>
                  )}
                </div>
              </div>
              <h1
                className="font group cursor-pointer font-semibold flex items-center gap-4 text-xl"
                onClick={() => setSettingOpen(!isSettingOpen)}
              >
                {t("Advance Settings")}{" "}
                <ChevronDown
                  className=" font-semibold group-hover:rotate-180"
                  size={18}
                />
              </h1>
              {isSettingOpen && (
                <>
                  <span className="flex gap-2 flex-col">
                    <label className={"text-[#4a4a4a] font-semibold"}>
                      {t("Location Address")}{" "}
                      <span className="text-[gray]">{`(${t(
                        "optional"
                      )})`}</span>
                    </label>
                    <input
                      type="text"
                      className="border-[2px] outline-none p-2 w-full"
                      onChange={(e) =>
                        setField({ ...field, address: e.target.value })
                      }
                    />
                  </span>
                  <span className="flex gap-2 flex-col">
                    <label className={"text-[#4a4a4a] font-semibold"}>
                      {t("Max Capacity")}{" "}
                      <span className="text-[gray]">{`(${t(
                        "optional"
                      )})`}</span>
                    </label>
                    <input
                      type="number"
                      className="border-[2px] outline-none p-2 w-full"
                      onChange={(e) =>
                        setField({
                          ...field,
                          event_capacity: parseFloat(e.target.value),
                        })
                      }
                    />
                  </span>
                </>
              )}

              <div className="flex sticky left-0 bottom-0 p-4 flex-1 bg-[white]">
                <button
                  className="bg-[#7655fa] active:scale-[0.98] transition-all justify-stretch md:px-6 w-full  py-2 text-white rounded-full"
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    let emptyTicket = field.ticket_types.find(
                      (el) => el.price === ""
                    );
                    if (type === "add") {
                      if (
                        emptyTicket === undefined &&
                        field.date !== "" &&
                        field.title !== ""
                      ) {
                        append(field);
                        setOpen(false);
                        setField(defaultValue);
                        setSelectedDate("");
                      }
                    }

                    if (type === "edit") {
                      if (
                        emptyTicket === undefined &&
                        field.date !== "" &&
                        field.title !== ""
                      ) {
                        const newArr = [...watch.sub_events];
                        const item = newArr.find((_, i) => i === index);
                        if (item) {
                          newArr[index as number] = field;

                          replace(newArr);
                        }
                        setOpen(false);
                      }
                    }
                  }}
                >
                  {type === "edit" ? t("Save Changes") : t("Add Event")}
                </button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddSubEventDialog;

export interface IFieldElement {
  title: string;
  date: string;
  status: string;
  manage_inventory: number;
  event_capacity: number | null;
  address: string;
  description: string;
  ticket_types: {
    title: string;
    price: string;
    description: "";
  }[];
}

export interface AddSubEventDialog {
  type?: string;
  data?: any;
  index?: number;
}
