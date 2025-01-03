"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { Donations } from "@/configs/apiRoutes";
import { queryClient } from "./MainLayoutGrid";
import { toast } from "react-toastify";

const DeleteDonationDialog = ({
  id,
}: {
  id: number;
}) => {
  const mutate = useMutation({
    mutationFn: Donations.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["donations"] });
      toast("Deleted Successfully", {
        type: "success",
      });
    },
    onError: () => {
      toast("Deletion Failed", {
        type: "error",
      });
    },
  });

  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen} >
        <DialogTrigger>
        <Trash
            className="text-[#ff00009d] active:scale-[0.90] transition-all cursor-pointer p-2 hover:bg-[#ff000026] rounded-full "
            size={37}
          />
        </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Are you sure you want to delete?</DialogTitle>
          <DialogDescription>
            <div className="flex items-center gap-4 my-4">
              {/* Icon */}
              <span className="flex rounded-full justify-center bg-[#FF61611F]  items-center p-2">
                <span className="flex rounded-full bg-[#FF6161] justify-center items-center p-2">
                  <Trash className="text-white " />
                </span>
              </span>
              <div className="flex flex-1 flex-col">
             
                <p className="text-sm">
                  Confirming this dialogue box will permanently delete the event
                  and all it’s data.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button
                className="font-semibold active:scale-[0.90] transition-all text-base rounded-full px-4 py-2"
                onClick={() => setOpen(false)}
              >
                Close
              </button>

              <button onClick={()=>mutate.mutate(id)} className="bg-[#FF6161] active:scale-[0.95] transition-all font-semibold  text-base rounded-full px-6 text-white py-2">
                Delete
              </button>
            </div>

            <div></div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDonationDialog;
