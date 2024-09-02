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
import EventEditDialog from "./EventEditDialog";

const ActionDropDown = ({}: {
  row?: IAutoConfig;
  id?: string[];
  table?: Table<IAutoConfig>;
}) => {
  const dispatch = useDispatch();
  const [openDelete, setDeleteOpen] = useState(false);
  const [openEditOpen, setEditOpen] = useState(false);
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <DotThreeVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="text-sm" onClick={() => setEditOpen(true)}>Edit Event</DropdownMenuItem>
          <DropdownMenuItem className="text-sm">View Event</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteOpen(true)}>
            Delete Event
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EventDeleteDialog setOpen={setDeleteOpen} open={openDelete} />
      <EventEditDialog setOpen={setEditOpen} open={openEditOpen}/>
    </>
  );
};

export default ActionDropDown;
