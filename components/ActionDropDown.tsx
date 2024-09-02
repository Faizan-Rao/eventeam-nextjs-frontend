import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DotThreeVertical from "./icons/DotThreeVertical";
import { IAutoConfig } from "./forms/auto-config/AutoConfigForm";
import { useDispatch } from "react-redux";
import { removeAutoConfig } from "@/slices/autoConfigSlice";
import { Table } from "@tanstack/react-table";
import EventDeleteDialog from "./EventDeleteDialog";

const ActionDropDown = ({}: {
  row?: IAutoConfig;
  id?: string[];
  table?: Table<IAutoConfig>;
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <DotThreeVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="text-sm">Edit Event</DropdownMenuItem>
          <DropdownMenuItem className="text-sm">View Event</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Delete Event
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EventDeleteDialog setOpen={setOpen} open={open} />
    </>
  );
};

export default ActionDropDown;
