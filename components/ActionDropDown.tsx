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

import { useDispatch } from "react-redux";
import { removeAutoConfig } from "@/slices/autoConfigSlice";
import { Table } from "@tanstack/react-table";
import EventDeleteDialog from "./EventDeleteDialog";
import EventEditDialog from "./EventEditDialog";
import Link from "next/link";
import { user } from "@/configs/axios";

const ActionDropDown = ({row, id, table}: {
  row?: any;
  id?: string[];
  table?: Table<any>;
}) => {
  const dispatch = useDispatch();
  const [openDelete, setDeleteOpen] = useState(false);
  const [openEditOpen, setEditOpen] = useState(false);

  console.log("row data af", row, "id data af", id, "table af", table)
  console.log("fetched user", user)
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <DotThreeVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="text-sm" onClick={() => setEditOpen(true)}>Edit Event</DropdownMenuItem>
          <DropdownMenuItem className="text-sm"><Link href={`/dashboard/my-events/${row.id}`}>View Event</Link></DropdownMenuItem>
          <DropdownMenuItem className="text-sm"><a href={`/events/${user.slug}/${row.id}`}>View Registration Form</a></DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteOpen(true)}>
            Delete Event
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EventDeleteDialog data={row} setOpen={setDeleteOpen} open={openDelete} />
      <EventEditDialog data={row} setOpen={setEditOpen} open={openEditOpen}/>
    </>
  );
};

export default ActionDropDown;
