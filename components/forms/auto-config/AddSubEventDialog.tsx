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
import { format } from "date-fns";
import {
  useFieldArray,
  UseFieldArrayAppend,
  useFormContext,
} from "react-hook-form";
// import { IAutoConfig } from "./AutoConfigForm";
import { useWatch } from "react-hook-form";

import { subevent, Validator } from "@/configs/autoFormValidation";
import { DialogTrigger } from "@radix-ui/react-dialog";

const AddSubEventDialog: React.FC<AddSubEventDialog> = ({
  data,
  type,
  index,
}) => {
  const { control, trigger } = useFormContext();
  const watch = useWatch({ control });

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
    status: "0",
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

  const [selectedDate, setSelectedDate] = useState<string>();
  const [date, setDate] = useState<Date | null>();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {type === "edit" && (
        <DialogTrigger>
          <PencilLine
            // onClick={() => setOpen(true)}
            className=" cursor-pointer text-[#7655fa]"
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
            className="flex w-full justify-center items-center h-[128px] min-w-[340px] flex-1 cursor-pointer  border-dashed gap-4  border-[3.5px]   "
          >
            <Plus /> <span>Add Another Subevent</span>
          </button>
        </DialogTrigger>
      )}
      <DialogContent className=" overflow-auto sm:max-w-full lg:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold ">
            {type === "edit" ? "Edit Subevent" : "Add New Subevent"}
          </DialogTitle>
          <DialogDescription className=" overflow-auto max-h-[600px]">
            <div className="flex flex-col gap-6 sm:p-0 md:p-4 ">
              <h1 className="font-semibold text-xl">General Information</h1>
              <div className="flex flex-1 flex-wrap gap-4">
                <AddSubEventGenInfo
                  index={index}
                  type={type}
                  errors={customErrors}
                  field={field}
                  setField={setField}
                />
                <div className="border-2 self-start rounded-md mx-4">
                  <Calendar
                    mode="single"
                    selected={date as any}
                    onSelect={(value: any) => {
                      setSelectedDate(format(value, "MM/dd/yyyy"));
                      setDate(value);
                    }}
                    className="max-h-[400px]"
                  />
                  {selectedDate && (
                    <div className=" flex rounded-md  flex-col bg-[#7655fa]  p-4 gap-2 m-3 ">
                      <label className={"text-white font-semibold"}>
                        Start Time
                      </label>

                      <input
                        type="time"
                        defaultValue={"00:00"}
                         min="00:00" max="24:00"
                        onChange={(e) => {
                          console.log(e.target.value);

                          setField({
                            ...field,
                            date: format(
                              new Date(`${selectedDate} ${e.target.value}`),
                              "dd/MM/yyyy HH:mm"
                            ),
                          });
                        }}
                        className=" rounded-md outline-none p-2 w-full cursor-pointer"
                      />
                    </div>
                  )}

                  <p className="text-[#7655fa] p-2">{`*Select Date First Then Time`}</p>
                </div>
              </div>
              <h1 className="font-semibold text-xl">Ticket Types</h1>
              <div className="flex flex-col  gap-6 ">
                {/* Event Name */}
                <div className="flex gap-2 flex-col">
                  <label className={"text-[#4a4a4a] font-semibold"}>
                    Tickets
                  </label>
                  {(type === "edit" ? field.ticket_types : watch.tickets).map(
                    (el: any, index: number) => {
                      return (
                        <div
                          className="flex gap-4 items-center flex-wrap"
                          key={index}
                        >
                          <input
                            type="text"
                            className="border-[2px] outline-none p-2 sm:max-w-[80%] md:max-w-full flex-1"
                            placeholder="Enter Ticket Name"
                            value={el.title}
                            disabled={true}
                          />
                          <div className="flex gap-4  border-[2px] items-center  flex-1 sm:max-w-[80%] md:max-w-full">
                            <input
                              type="number"
                              className=" outline-none p-2 flex-1 "
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
                            <DollarSign size={18} />
                          </div>
                        </div>
                      );
                    }
                  )}
                  {customErrors?.includes("ticket_types") && (
                    <p className="text-red-800">{`Fill All Ticket Prices`}</p>
                  )}
                </div>
              </div>
              <h1
                className="font group cursor-pointer font-semibold flex items-center gap-4 text-xl"
                onClick={() => setSettingOpen(!isSettingOpen)}
              >
                Advance Settings{" "}
                <ChevronDown
                  className=" font-semibold group-hover:rotate-180"
                  size={18}
                />
              </h1>
              {isSettingOpen && (
                <>
                  <span className="flex gap-2 flex-col">
                    <label className={"text-[#4a4a4a] font-semibold"}>
                      Location Address{" "}
                      <span className="text-[gray]">(optional)</span>
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
                      Max Capacity{" "}
                      <span className="text-[gray]">(optional)</span>
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
                  className="bg-[#7655fa] justify-stretch md:px-6 w-full  py-2 text-white rounded-full"
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
                  {type === "edit" ? "Edit Event" : "Add Event"}
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
