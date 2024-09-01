import React from "react";
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

const ActionDropDown = ({
  row,
  id,
  table,
}: {
  row: IAutoConfig;
  id: string[];
  table: Table<IAutoConfig>;
}) => {
  const dispatch = useDispatch();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <DotThreeVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="text-sm">Edit Event</DropdownMenuItem>
        <DropdownMenuItem className="text-sm">View Event</DropdownMenuItem>
        <DropdownMenuItem
          className="text-sm"
          onClick={() => {
            dispatch(removeAutoConfig(id));
            table.resetRowSelection()
          }}
        >
          Delete Event
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionDropDown;
