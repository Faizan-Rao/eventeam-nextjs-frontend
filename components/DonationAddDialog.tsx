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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import { Switch } from "@/components/ui/switch";
import { Controller, useForm } from "react-hook-form";

const DonationAddDialog = () => {
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
          <span>Add New Donation</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Donation</DialogTitle>
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
                Add Donation
                </button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DonationAddDialog;
