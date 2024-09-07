"use client";

import {
  ChevronDown,
  CircleX,
  DollarSign,
  PenBoxIcon,
  Plus,
} from "lucide-react";
import React, { ChangeEvent, useEffect, useState } from "react";

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
import { UseFieldArrayAppend, useFormContext } from "react-hook-form";
import { IAutoConfig } from "./AutoConfigForm";
import { useWatch } from "react-hook-form";



const AddSubEventDialog: React.FC<AddSubEventDialog> = ({
  open,
  setOpen,
  append,
}) => {

  const {control } = useFormContext<IAutoConfig>()
  const watch = useWatch({control})
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
    name: "",
    active: false,
    date: new Date(),
    start_time: "",
    ticket_type: tickets,
    address: "",
    description: "",
    max_capcity: "",
  };
  const [field, setField] = useState<IFieldElement>(defaultValue);
  const [isSettingOpen, setSettingOpen] = useState(false);
  const handleAddTicket = () => {
    const ticket = field.ticket_type;
    setField({ ...field, ticket_type: [...ticket, { name: "", price: "" }] });
  };
  const handleRemoveTicket = () => {
    const ticket = field.ticket_type;
    setField({
      ...field,
      ticket_type: [...ticket.slice(0, ticket.length - 1)],
    });
  };

  useEffect(()=>{
    const newArr = watch.tickets?.map((el) => {
      return {
        name: el.ticket,
        price: ""
      }
    })
    setField({...field, ticket_type: (newArr as any)})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className=" overflow-auto sm:max-w-full lg:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold ">
            Add New Subevent
          </DialogTitle>
          <DialogDescription className=" overflow-auto max-h-[600px]">
            <div className="flex flex-col gap-6 sm:p-0 md:p-4 ">
              <h1 className="font-semibold text-xl">General Information</h1>
              <div className="flex flex-1 flex-wrap gap-4">
                <AddSubEventGenInfo field={field} setField={setField} />
                <span className="border-2 self-center rounded-md mx-4">
                  <Calendar
                    mode="single"
                    selected={field.date}
                    onSelect={(value: any) =>
                      setField({ ...field, date: value })
                    }
                    className="max-h-[400px]"
                  />
                  <span className=" flex rounded-md  flex-col bg-[#7655fa]  p-4 gap-2 m-3 ">
                    <label className={"text-white font-semibold"}>
                      Start Time
                    </label>

                    <input
                      type="time"
                      defaultValue={"00:00"}
                      onChange={(e) => {
                        setField({
                          ...field,
                          start_time: format(
                            new Date(`1/1/2024 ${e.target.value}`),
                            "hh:mm aa"
                          ),
                        });
                      }}
                      className=" rounded-md outline-none p-2 w-full cursor-pointer"
                    />
                  </span>
                </span>
              </div>
              <h1 className="font-semibold text-xl">Ticket Types</h1>
              <div className="flex flex-col  gap-6 ">
                {/* Event Name */}
                <span className="flex gap-2 flex-col">
                  <label className={"text-[#4a4a4a] font-semibold"}>
                    Ticket Names
                  </label>
                  {Array(field.ticket_type.length)
                    .fill({ name: "", price: "" })
                    .map((el, index) => {
                      return (
                        <div
                          className="flex gap-4 items-center flex-wrap"
                          key={index + (el as any).name}
                        >
                          <input
                            type="text"
                            className="border-[2px] outline-none p-2 sm:max-w-[80%] md:max-w-full flex-1"
                            placeholder="Enter Ticket Name"
                            value={field.ticket_type[index].name}
                            onChange={(e) => {
                              const ticket = field.ticket_type;

                              const newArr = [...ticket];
                              const item = newArr.find(
                                (_, i) => i === index
                              ) ?? { name: "" };
                              item.name = e.target.value;
                              setTickets(newArr as any);
                            }}
                          />
                          <span className="flex gap-4  border-[2px] items-center  flex-1 sm:max-w-[80%] md:max-w-full">
                            <input
                              type="number"
                              className=" outline-none p-2 flex-1 "
                              placeholder="Enter Price"
                              value={field.ticket_type[index].price}
                              onChange={(e) => {
                                const ticket = field.ticket_type;
                                const newArr = [...ticket];
                                const item = newArr.find(
                                  (_, i) => i === index
                                ) ?? { price: "" };
                                item.price = e.target.value;
                                setTickets(newArr as any);
                              }}
                            />
                            <DollarSign size={18} />
                          </span>
                          
                            <CircleX
                              onClick={() => {
                                handleRemoveTicket();
                                const newArr = tickets.filter(
                                  (_, i) => index !== i
                                );
                                setTickets(newArr);
                              }}
                              className="text-[red] cursor-pointer"
                              strokeWidth={1}
                            />
                        
                        </div>
                      );
                    })}
                  <div>
                    <button
                      onClick={handleAddTicket}
                      className="flex items-center gap-4 my-4  justify-self-start  text-[#7655fA]"
                    >
                      {" "}
                      <Plus /> <span>Add Another Ticket</span>
                    </button>
                  </div>
                </span>
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
                        setField({ ...field, max_capcity: e.target.value })
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
                    append({ ...field, ticket_type: tickets });
                    setOpen(false);
                    setField(defaultValue);
                  }}
                >
                  Add Event
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
  name: string;
  start_time: string;
  description?: string;
  date: Date;
  active: boolean;
  ticket_type: {
    name?: string;
    price?: string;
  }[];
  address?: string;
  max_capcity?: string;
}

export interface AddSubEventDialog {
  append: UseFieldArrayAppend<IAutoConfig, "sub_events">;
  open: boolean;
  setOpen: React.Dispatch<boolean>;
}
