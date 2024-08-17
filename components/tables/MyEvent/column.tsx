"use client";
import ActionDropDown from "@/components/ActionDropDown";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import { ArrowUpDown } from "lucide-react";

type Payment = {
  id: string;
  title: string;
  "start-date": string;
  "end-date": string;
  registrations: string;
  "is-active": false;
  status: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
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
    cell: ({ row }) => (
      <span className="flex items-center gap-3">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
        <span className="flex items-center">Event-{row.original.id}</span>
      </span>
    ),
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
  },
  {
    accessorKey: "start-date",
    header: "Start Date",
    enableGlobalFilter: false,
  },
  {
    accessorKey: "end-date",
    header: "End Date",
    enableGlobalFilter: false,
  },
  {
    accessorKey: "registrations",
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
    enableGlobalFilter: false,
  },
  {
    accessorKey: "is-active",
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
            (row.getValue("is-active") as any) && "bg-[#C2FFCC]",
            !(row.getValue("is-active") as any) && "bg-[#FFC2C2]"
          )}
        >
          {row.getValue("is-active") ? "Active" : "Inactive"}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
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
            row.getValue("status") === ("Operational" as any) && "bg-[#C2FFCC]",
            row.getValue("status") === ("Ended" as any) && "bg-[#FFC2C2]",
            row.getValue("status") === ("Pending Approval" as any) &&
              "bg-[#FFEFAF]"
          )}
        >
          {row.getValue("status")}
        </span>
      );
    },
  },
  {
    header: "Action",
    cell: ({ row }) => {
      return <ActionDropDown />;
    },
  },
];