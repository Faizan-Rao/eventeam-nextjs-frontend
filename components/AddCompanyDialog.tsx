"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, DollarSign, Plus } from "lucide-react";

import { Switch } from "@/components/ui/switch";
import { Controller, useForm } from "react-hook-form";

const CompanyAddDialog = () => {
  const methods = useForm();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex gap-4 px-4 py-2 bg-[#7655fa] rounded-full text-white">
          <Plus />
          <span>Add New Company</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Company</DialogTitle>
          <DialogDescription>
            <form className="flex flex-col my-4 gap-4 ">
              <div className="flex flex-col gap-2">
                <span className="text-[#4a4a4a] text-sm font-semibold">
                  Company Name
                </span>
                <input
                  type="text"
                  placeholder="Company Name"
                  className="text-[#4a4a4a] text-base  p-2 border-[1px] outline-none rounded-md"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-[#4a4a4a] text-sm font-semibold">
                    Email
                  </span>
                  <input
                    type="text"
                    placeholder="Email"
                    className="text-[#4a4a4a] text-base  p-2 border-[1px] outline-none rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-2">
                <span className="text-[#4a4a4a] text-sm font-semibold">
                 Phone
                </span>
                <input
                  type="text"
                  placeholder="Phone"
                  className="text-[#4a4a4a] text-base  p-2 border-[1px] outline-none rounded-md"
                />
              </div>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <span className="text-[#4a4a4a] text-sm font-semibold">
                  Status
                </span>
                <div className="flex justify-between border-[1px] rounded-md p-2">
                  <span className="text-[#4a4a4a] flex-1">Active</span>
                  <Controller
                    name="advance_form.cash_payment"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        name={"advance_form.show_address"}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[#4a4a4a] text-sm font-semibold">
                 Password
                </span>
                <input
                  type="text"
                  placeholder="Password"
                  className="text-[#4a4a4a] text-base  p-2 border-[1px] outline-none rounded-md"
                />
              </div>

              <div className="flex justify-end items-center gap-4">
                <button className="px-4 py-2 bg-[#7655fa] text-white rounded-full">
                  {" "}
                  Add Company
                </button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyAddDialog;
