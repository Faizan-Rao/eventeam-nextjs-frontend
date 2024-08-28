import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {  DollarSign, PencilLine, Plus } from "lucide-react";

import { Switch } from "@/components/ui/switch";
import { Controller, useForm } from "react-hook-form";

const DonationEditDialog = () => {
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
        <span className="flex p-2 items-center hover:bg-[#7655fa26] rounded-full justify-center">
        <PencilLine className="text-[#7655fa]"/>
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Donation</DialogTitle>
          <DialogDescription>
            <form className="flex flex-col my-4 gap-4 ">
              <div className="flex flex-col gap-2">
                <span className="text-[#4a4a4a] text-sm font-semibold">
                  Donation Name
                </span>
                <input
                  type="text"
                  placeholder="Company Name"
                  className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
                />
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[#4a4a4a] text-sm font-semibold">
                Amount
                </span>

                <div className="flex gap-4  border-[1px] rounded-md items-center px-3 ">
                  <input
                    type="number"
                    className=" outline-none p-2 flex-1"
                    placeholder="Enter Price"
                    value={0}
                    onChange={(e) => null}
                  />
                  <DollarSign size={18} />
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

              <div className="flex justify-end items-center gap-4">
                <button className="px-4 py-2 bg-[#7655fa] text-white rounded-full">
                  {" "}
               Save Changes
                </button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DonationEditDialog;
