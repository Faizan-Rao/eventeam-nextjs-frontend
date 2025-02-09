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
import clsx from "clsx";
import { EllipsisVertical } from "lucide-react";
import { useTranslation } from "react-i18next";

const ActionDropDown = ({row, id, table, selectedRecord}: {
  row?: any;
  id?: any;
  table?: Table<any>;
  index?:number,
  selectedRecord?:number
}) => {
  const dispatch = useDispatch();
  const [openDelete, setDeleteOpen] = useState(false);
  const [openEditOpen, setEditOpen] = useState(false);

  console.log("row data af", row, "id data af", id, "table af", table)
  console.log("fetched user", user)
  const {t} = useTranslation(["translation"])
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className={clsx("active:scale-[0.90] rounded-full   p-1 hover:bg-[#7655fa26] transition-all")}>
          <EllipsisVertical className={clsx( selectedRecord === id && "text-[white]")} size={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="text-sm active:scale-[0.95] transition-all" onClick={() => setEditOpen(true)}>{t("Edit Status")}</DropdownMenuItem>
          <DropdownMenuItem className="text-sm active:scale-[0.95] transition-all"><Link href={`/dashboard/my-events/${row.id}`}>{t("View Event")}</Link></DropdownMenuItem>
          <DropdownMenuItem className="text-sm active:scale-[0.95] transition-all"><a href={`/dashboard/my-events/edit/${row.id}`}>{t("Edit Event")}</a></DropdownMenuItem>
          <DropdownMenuItem className="text-sm active:scale-[0.95] transition-all"><a href={`/events/${user.slug}/${row.id}`}>{t("View Registration Form")}</a></DropdownMenuItem>
          <DropdownMenuItem className="active:scale-[0.95] transition-all" onClick={() => setDeleteOpen(true)}>
            {t("Delete Event")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EventDeleteDialog data={row} setOpen={setDeleteOpen} open={openDelete} />
      <EventEditDialog data={row} setOpen={setEditOpen} open={openEditOpen}/>
    </>
  );
};

export default ActionDropDown;
