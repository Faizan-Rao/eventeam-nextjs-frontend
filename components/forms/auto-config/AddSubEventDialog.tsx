"use client";

import { ChevronDown, CircleX, DollarSign, PenBoxIcon, Plus } from "lucide-react";
import React, { ChangeEvent, useState } from "react";

import AddSubEventGenInfo from "./AddSubEventGenInfo";
import { Calendar } from "@/components/ui/calendar";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const AddSubEventDialog: React.FC<AddSubEventDialog> = ({ open, setOpen }) => {
  const [tickets, setTickets] = useState([
    {
      name: "Ticket",
      price: "2",
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
    setTickets([
      ...tickets,
      {
        name: "Ticket",
        price: "2",
      },
    ]);
  };
  const handleRemoveTicket = () => {
    tickets.pop();
    setTickets([...tickets]);
  };
  console.log(field);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="lg:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl mx-auto font-semibold ">
            Add New Subevent
          </DialogTitle>
          <DialogDescription className=" overflow-y-scroll max-h-[600px]">
            <div className="flex flex-col gap-6 p-4 ">
              <h1 className="font-semibold text-xl">General Information</h1>
              <div className="flex flex-1 flex-wrap gap-4">
                <AddSubEventGenInfo />
                <span className="border-2 self-center rounded-md mx-4">
                  <Calendar
                    mode="single"
                    selected={field.date}
                    onSelect={(value: any) =>
                      setField({ ...field, date: value })
                    }
                    className="max-h-[400px]"
                  />
                  <span className=" flex  flex-col gap-2 m-3 ">
                    <label className={"text-[#4a4a4a] font-semibold"}>
                      Start Time
                    </label>

                    <input
                      type="time"
                      defaultValue={"00:00"}
                      onChange={(e: ChangeEvent) => {}}
                      className="border-[2px] outline-none p-2 w-full cursor-pointer"
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
                  {tickets.map((el, index) => {
                    return (
                      <div
                        className="flex gap-4 items-center"
                        key={index + (el as any).name}
                      >
                        <input
                          type="text"
                          className="border-[2px] outline-none p-2 max-w-[40%] flex-1"
                          placeholder="Enter Ticket Name"
                        />
                        <span className="flex gap-4  border-[2px] items-center px-3 max-w-[40%]">
                          <input
                            type="text"
                            className=" outline-none p-2 flex-1"
                            placeholder="Enter Price"
                          />
                          <DollarSign size={18} />
                        </span>
                        {index > 0 && (
                          <CircleX
                            onClick={handleRemoveTicket}
                            className="text-[red] cursor-pointer"
                            strokeWidth={1}
                          />
                        )}
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
                Advance Settings <ChevronDown className=" font-semibold group-hover:rotate-180" size={18} />
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
                      placeholder="Enter Name"
                    />
                  </span>
                  <span className="flex gap-2 flex-col">
                    <label className={"text-[#4a4a4a] font-semibold"}>
                      Max Capacity{" "}
                      <span className="text-[gray]">(optional)</span>
                    </label>
                    <input
                      type="text"
                      className="border-[2px] outline-none p-2 w-full"
                      placeholder="Enter Name"
                    />
                  </span>
                </>
              )}

              <div className="flex sticky left-0 bottom-0 p-4 flex-1 bg-[white]">
                <button
                  className="bg-[#7655fa] justify-stretch px-6 w-full  py-2 text-white rounded-full"
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
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
    name: string;
    price: string;
  }[];
  address?: string;
  max_capcity?: string;
}

export interface AddSubEventDialog {
  append: (value: IFieldElement) => void;
  open: boolean;
  setOpen: React.Dispatch<boolean>;
}
