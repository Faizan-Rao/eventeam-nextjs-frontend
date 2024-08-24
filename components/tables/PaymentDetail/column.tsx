"use client";
import ActionDropDown from "@/components/ActionDropDown";
import EditPaymentStatusDialog from "@/components/EditPaymentStatusDialog";
import { Checkbox } from "@/components/ui/checkbox";
import ViewPaymentDetailDialog from "@/components/ViewPaymentDetailDialog";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import { ArrowUpDown } from "lucide-react";

export type Payment = {
  id: string;
  name: string;
  date: string;
  method: string;
  payment: string;
  status: string;
  event_reg: {
    guest: {
      name: string;
      phone: string;
      email: string;
      ticket_type: string;
      events: string[];
    }[];
    price_breakdown: {
      type: string;
      value: string;
    }[];
    total_amount: string;
  };
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
        <p>Registration Id</p>
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <button
          className="flex justify-center items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Event Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    enableGlobalFilter: false,
  },
  {
    accessorKey: "method",
    header: ({ column }) => {
        return (
          <button
            className="flex justify-center items-center gap-1"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Payment Method
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </button>
        );
      },
    enableGlobalFilter: false,
  },
  {
    accessorKey: "payment",
    header: ({ column }) => {
      return (
        <button
          className="flex justify-center items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Payment
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
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
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => {
      return (
        <span
          className={clsx(
            " px-4 py-1 rounded-full text-center text-nowrap",
            (row.getValue("status")  === "Pending")  && "bg-[#FBE394]",
            (row.getValue("status") !== "Pending")  && "bg-[#C2FFCC]"
          )}
        >
          {row.getValue('status') === "Pending" ? "Pending" : "Cleared"}
        </span>
      );
    },
  },
  {
    header: "Edit Status",
    cell: ({ row }) => {
      return (
        <div className="text-center">
       <EditPaymentStatusDialog row={row as any}/>
        </div>
      );
    },
  },
  {
    header: "View Details",
    cell: ({ row }) => {
      return (  <div className="text-center">
        
        <ViewPaymentDetailDialog row={row as any}/>
         </div>);
    },
  },
];
