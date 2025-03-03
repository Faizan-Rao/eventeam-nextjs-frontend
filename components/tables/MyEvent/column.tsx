"use client";
import ActionDropDown from "@/components/ActionDropDown";
// import { IAutoConfig } from "@/components/forms/auto-config/AutoConfigForm";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import { format } from "date-fns";
import { keys } from "lodash";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex gap-3 items-center ">
        
        <p>ID</p>
      </div>
    ),
    cell: ({ row }) => {
      // let random = Math.floor(Math.random() * 100)
      return (
        <span className="flex items-center gap-3">
          {/* <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          /> */}
          <span className="flex items-center">
            Event-{parseInt(row.id) + 1}
          </span>
        </span>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
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
    cell: ({ row }) => {
      return (
        <Link
          href={`my-events/${row.original.id}`}
          className="text-[#7655fa] font-semibold"
        >
          {row.original.title}
        </Link>
      );
    },
  },
  {
    accessorKey: "start_date",
    header: ({ column }) => {
      return (
        <button
          className="flex justify-center items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Start Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      return format(row.original.start_date, "dd  MMM  yyyy");
    },
    enableGlobalFilter: false,
  },
  {
    accessorKey: "end_date",
    header: ({ column }) => {
      return (
        <button
          className="flex justify-center items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          End Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      return format(row.original.end_date, "dd  MMM  yyyy");
    },
    enableGlobalFilter: false,
  },
  {
    accessorKey: "registration_count",
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
    cell: ({ row }) => {
      return `${row.original.registration_count}`;
    },
    enableGlobalFilter: false,
  },
  {
    accessorKey: "status",
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
            row.original.status === (1 as any) && "bg-[#C2FFCC]",
            row.original.status === (0 as any) && "bg-[#FFC2C2]"
          )}
        >
          {row.original.status === 1 ? "Active" : "Inactive"}
        </span>
      );
    },
  },
  {
    accessorKey: "current_status",
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
            row.original.current_status === ("active" as any) && "bg-[#C2FFCC]",
            row.original.current_status === ("ended" as any) && "bg-[#FFC2C2]",
            row.original.current_status === ("pending" as any) && "bg-[#FFEFAF]"
          )}
        >
          {row.original.current_status[0].toUpperCase() +
            row.original.current_status.slice(1)}
        </span>
      );
    },
  },
  {
    header: "Action",
    cell: ({ row, table, column }) => {
      const selectedRows = Object.keys(table.getSelectedRowModel().rowsById);
      return (
        <ActionDropDown row={row.original} id={selectedRows} table={table} />
      );
    },
  },
];
