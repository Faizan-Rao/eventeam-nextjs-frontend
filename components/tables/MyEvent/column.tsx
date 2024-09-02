"use client";
import ActionDropDown from "@/components/ActionDropDown";
import { IAutoConfig } from "@/components/forms/auto-config/AutoConfigForm";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import { keys } from "lodash";
import { ArrowUpDown } from "lucide-react";



export const columns: ColumnDef<IAutoConfig>[] = [
  {
    
    id: "select",
    header: ({ table }) => (
      <div className="flex gap-3 items-center ">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
        <p>ID</p>
      </div>
    ),
    cell: ({ row }) => {
      // let random = Math.floor(Math.random() * 100)
      return (
      <span className="flex items-center gap-3">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
        <span className="flex items-center">Event-{ parseInt(row.id) + 1}</span>
      </span>
    )},
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "gen_info.event_name",
    header: ({ column }) => {
      return (
        <button
          className="flex justify-center items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
  },
  {
    accessorKey: "gen_info.start_date",
    header: "Start Date",
    cell: ({row}) => {
      return row.original.gen_info.start_date.toString()
    },
    enableGlobalFilter: false,
  },
  {
    accessorKey: "gen_info.registrations",
    header: ({ column }) => {
      return (
        <button
          className="flex justify-center items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Registrations
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({row}) => {
      return row.original.gen_info.registrations
    },
    enableGlobalFilter: false,
  },
  {
    accessorKey: "gen_info.active",
    header: ({ column }) => {
      return (
        <button
          className="flex justify-center items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Active State
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
     
      return (
        <span
          className={clsx(
            " px-4 py-1 rounded-full text-center text-nowrap",
            (row.original.gen_info.active as any) && "bg-[#C2FFCC]",
            !(row.original.gen_info.active as any) && "bg-[#FFC2C2]"
          )}
        >
          {row.original.gen_info.active ? "Active" : "Inactive"}
        </span>
      );
    },
  },
  {
    accessorKey: "gen_info.status",
    header: ({ column }) => {
      return (
        <button
          className="flex justify-center items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Operation State
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      return (
        <span
          className={clsx(
            " px-4 py-1 rounded-full text-center text-nowrap ",
            row.original.gen_info.status === ("Operational" as any) && "bg-[#C2FFCC]",
            row.original.gen_info.status === ("Ended" as any) && "bg-[#FFC2C2]",
            row.original.gen_info.status === ("Pending Approval" as any) &&
              "bg-[#FFEFAF]"
          )}
        >
          {row.original.gen_info.status}
        </span>
      );
    },
  },
  {
    header: "Action",
    cell: ({ row, table, column }) => {
      const selectedRows = Object.keys(table.getSelectedRowModel().rowsById)
      return <ActionDropDown  row={row.original} id={selectedRows} table={table}/>;
    },
  },
];
