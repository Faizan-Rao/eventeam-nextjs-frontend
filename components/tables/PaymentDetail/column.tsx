"use client";
import ActionDropDown from "@/components/ActionDropDown";
import EditPaymentStatusDialog from "@/components/EditPaymentStatusDialog";
import { Checkbox } from "@/components/ui/checkbox";
import ViewPaymentDetailDialog from "@/components/ViewPaymentDetailDialog";
import { user } from "@/configs/axios";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import { ArrowUpDown } from "lucide-react";

// export type Payment = {
//   id: string;
//   name: string;
//   date: string;
//   method: string;
//   payment: string;
//   status: string;
//   event_reg: {
//     guest: {
//       name: string;
//       phone: string;
//       email: string;
//       ticket_type: string;
//       events: string[];
//     }[];
//     price_breakdown: {
//       type: string;
//       value: string;
//     }[];
//     total_amount: string;
//   };
// };

export const columns: ColumnDef<any>[] = [
  {
   
    id: "select",
    header: ({ table }) => (
      <div className="flex gap-3 items-center ">
        {/* <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        /> */}
        <p>Sr#</p>
      </div>
    ),
    cell: ({ row }) => (
      <span className="flex items-center gap-3">
        {/* <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        /> */}
        <span className="flex items-center">{row.index + 1}</span>
      </span>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "reg_id",
    id: "select",
    header: ({ table }) => (
      <div className="flex gap-3 items-center ">
        {/* <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        /> */}
        <p>Registration Id</p>
      </div>
    ),
    cell: ({ row }) => (
      <span className="flex items-center gap-3">
        {/* <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        /> */}
        <span className="flex items-center">{row.original.reg_id}</span>
      </span>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "company_name",
    
    header: ({ table }) => (
      <div className="flex gap-3 items-center ">
       
        <p>Company</p>
      </div>
    ),
    cell: ({ row }) => (
      <span className="flex items-center gap-3">
        <span className="flex items-center">{row.original.company_name}</span>
      </span>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "event.title",
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
    accessorKey: "created_at",
    enableGlobalFilter: false,
    
    header: ({ column }) => {
      return (
        <button
          className="flex justify-center items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
         Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
    cell: ({ row }) => (
     
        (row.original.created_at.split("T")[0])
    
    ),
  },
  {
    accessorKey: "payment_method",
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
    accessorKey: "total_amount",
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
    cell: ({row})=>{
      console.log(row.original)
      return "$" + row.original.total_amount;
    },
    enableGlobalFilter: false,
  },
  {
    accessorKey: "payment_status",
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
            (row.getValue("payment_status")  === "pending")  && "bg-[#FBE394]",
            (row.getValue("payment_status") !== "pending")  && "bg-[#C2FFCC]"
          )}
        >
          {row.getValue('payment_status') === "pending" ? "Pending" : "Cleared"}
        </span>
      );
    },
  },
  {
    accessorKey: "edit_status",
    header: "Payment Status",
    enableHiding: true,
    cell: ({ row }) => {
      return (
        (user && user.role === "company") && <div className="text-center">
      {row.original.payment_method  === "cash" && <EditPaymentStatusDialog row={row as any}/>}
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
