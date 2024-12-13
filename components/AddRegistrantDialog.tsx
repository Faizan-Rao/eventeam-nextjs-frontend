"use client";
import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useFormContext, useWatch } from "react-hook-form";

const AddRegistrantDialog = ({
  data,
  formData,
}: {
  data?: any;
  formData: any;
}) => {
  const defaultFormState = {
    name: "",
    email: "",
    phone: "",
    ticketType: [] as string[],
    subEvents: [] as string[],
  };
  const formContext = useFormContext();
  const [guestData, setGuestData] = useState(
    (data && data) || defaultFormState
  );

  const [ticketTypes, setTicketTypes] = useState<string[]>([]);
  const {
    register,
    control,
    formState: { errors },
  } = formContext;

  const handleFieldChange = (e: any) =>
    setGuestData({ ...guestData, [e.target.name]: e.target.value });

  const filterTicketTypes = () => {
    formData.sub_events.map((el: any, i: number) => {
      const products = new Set(
        el.products.map((el2: any, j: number) => {
          return el2.title;
        })
      );

      setTicketTypes([...products] as string[]);
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => filterTicketTypes(), []);

  console.log(guestData);
  return (
    <Dialog>
      <DialogTrigger>
        <button className="border-[2px] w-full outline-none border-[#7655fa] text-[#7655fa] rounded-full p-2 font-semibold">
          Add New Guest
        </button>
      </DialogTrigger>
      <DialogContent className="md:min-w-[600px]">
        <DialogHeader>
          <DialogTitle className="my-2">Add New Guest</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="full_name">Full Name</label>
                <input
                  type="text"
                  className=" outline-none p-2 flex-1 border-[2px] focus:border-[#7655fa] rounded-lg"
                  id="full_name"
                  onChange={handleFieldChange}
                  placeholder="name"
                  name="name"
                />
              </div>

              <div className="flex sm:flex-col md:flex-row gap-2 ">
                <div className="flex flex-col flex-1 gap-2">
                  <label htmlFor="full_name">Email</label>
                  <input
                    type="email"
                    className=" outline-none p-2 flex-1 border-[2px] focus:border-[#7655fa] rounded-lg"
                    onChange={handleFieldChange}
                    placeholder="email"
                    name="email"
                  />
                </div>
                <div className="flex flex-col flex-1 gap-2">
                  <label htmlFor="full_name">Phone</label>
                  <input
                    type="text"
                    className=" outline-none p-2 flex-1 border-[2px] focus:border-[#7655fa] rounded-lg"
                    onChange={handleFieldChange}
                    placeholder="phone"
                    name="phone"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="full_name">Ticket Type</label>
                <Select onValueChange={(value) => setGuestData({...guestData, ticketType: [value] })}>
                  <SelectTrigger>
                    <SelectValue
                      defaultValue={ticketTypes[0]}
                      placeholder="Select Ticket Type"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {ticketTypes.map((el, i) => {
                      return (
                        <SelectItem
                          key={i}
                          className="mx-0"
                          value={el as string}
                        >
                          {el as string}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              {/* <div className="grid sm:grid-col-1 md:grid-col-3 ">
                    {
                        formData.
                    }
              </div> */}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddRegistrantDialog;
