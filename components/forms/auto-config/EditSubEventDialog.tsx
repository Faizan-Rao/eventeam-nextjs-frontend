"use client";

import {
  ChevronDown,
  CircleX,
  DollarSign,
  PenBoxIcon,
  PencilLine,
  Plus,
} from "lucide-react";
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
import { format } from "date-fns";
import {
  useFieldArray,
  UseFieldArrayAppend,
  UseFieldArrayUpdate,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { IAutoConfig } from "./AutoConfigForm";
import { DialogTrigger } from "@radix-ui/react-dialog";

const EditSubEventDialog: React.FC<EditSubEventDialog> = ({ index }) => {
  const { control } = useFormContext<IAutoConfig>();
  const { fields, update } = useFieldArray({ control, name: "sub_events" });
  const watch = useWatch({ control });
  const [isSettingOpen, setSettingOpen] = useState(false);
  const [field, setField] = useState(fields[index]);
  const [open, setOpen] = useState(false);
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
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <PencilLine
          onClick={() => setOpen(true)}
          className=" cursor-pointer"
          strokeWidth={1}
        />
      </DialogTrigger>
      <DialogContent className="lg:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl mx-auto font-semibold ">
           {field.name}
          </DialogTitle>
          <DialogDescription className=" overflow-y-scroll max-h-[600px]">
            <div className="flex flex-col gap-6 p-4 ">
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
                  <span className=" flex  flex-col gap-2 m-3 p-4 rounded-md bg-[#7655fa]">
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
                      className="
                       outline-none p-2 w-full rounded-md cursor-pointer"
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
                          className="flex gap-4 items-center "
                          key={index + (el as any).name}
                        >
                          <input
                            type="text"
                            className="border-[2px] outline-none p-2 flex-1  "
                            placeholder="Enter Ticket Name"
                            value={field.ticket_type[index].name}
                            onChange={(e) => {
                              const ticket = field.ticket_type;

                              const newArr = [...ticket];
                              const item = newArr.find(
                                (_, i) => i === index
                              ) ?? { name: "" };
                              item.name = e.target.value;
                              setField({ ...field, ticket_type: newArr });
                            }}
                          />
                          <span className="flex gap-4  border-[2px] items-center px-3  flex-1">
                            <input
                              type="number"
                              className=" outline-none p-2 flex-1"
                              placeholder="Enter Price"
                              value={field.ticket_type[index].price}
                              onChange={(e) => {
                                const ticket = field.ticket_type;
                                const newArr = [...ticket];
                                const item = newArr.find(
                                  (_, i) => i === index
                                ) ?? { price: "" };
                                item.price = e.target.value;
                                setField({ ...field, ticket_type: newArr });
                              }}
                            />
                            <DollarSign size={18} />
                          </span>
                        
                         
                            <CircleX
                              onClick={() => {
                                handleRemoveTicket();
                                const newArr = field.ticket_type.filter(
                                  (_, i) => index !== i
                                );
                                setField({ ...field, ticket_type: newArr });
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
                      value={field.address}
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
                      value={field.max_capcity}
                      onChange={(e) =>
                        setField({ ...field, max_capcity: e.target.value })
                      }
                    />
                  </span>
                </>
              )}

              <div className="flex sticky left-0 bottom-0 p-4 flex-1 bg-[white]">
                <button
                  className="bg-[#7655fa] justify-stretch px-6 w-full  py-2 text-white rounded-full"
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    update(index, field);
                    setOpen(false);
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditSubEventDialog;



interface EditSubEventDialog {
  index: number;
}
