import React from "react";
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
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { Switch } from "./ui/switch";

const EventEditDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { control } = useForm<any>();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col gap-4  my-4 ">
              <span className=" flex-1 rounde-md flex flex-col gap-1">
                <label className="text-sm font-semibold ">Activate Event</label>
                <span className="flex   border-2 p-2">
                  <span>Active</span>
                  <Switch
                    defaultChecked={true}
                    onCheckedChange={() => null}
                    className="text-[white] ml-auto justify-self-end cursor-pointer"
                  />
                </span>
              </span>
              <span className=" flex-1 flex flex-col gap-1">
                <label className="text-sm font-semibold ">Status Type</label>

                <Controller
                  name={""}
                  control={control}
                  render={({ field }) => (
                    <Select
                      defaultValue={field.value}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status.." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Operational" defaultChecked>
                          Operational
                        </SelectItem>
                        <SelectItem value="Ended">Ended</SelectItem>
                        <SelectItem value="Pending Approval">
                          Pending Approval
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </span>

              <div className="flex justify-end mt-4 gap-4">
                <button
                  className="font-semibold text-base rounded-full px-4 py-2"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>

                <button className="bg-[#7655fa] font-semibold  text-base rounded-full px-6 text-white py-2">
                  Save Changes
                </button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EventEditDialog;
