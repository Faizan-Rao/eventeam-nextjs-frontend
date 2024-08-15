"use client";
import ActionDropDown from "@/components/ActionDropDown";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";

type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return <span>{row.getValue("id")}</span>;
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "start-date",
    header: "Start Date",
  },
  {
    accessorKey: "end-date",
    header: "End Date",
  },
  {
    accessorKey: "registrations",
    header: "Registrations",
  },
  {
    accessorKey: "is-active",
    header: "Active State",
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
    header: "Operation State",
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
