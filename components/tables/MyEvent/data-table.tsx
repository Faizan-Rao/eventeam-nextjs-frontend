"use client";

import {
  ColumnDef,
  flexRender,
  SortingState,
  getSortedRowModel,
  getCoreRowModel,
  getFacetedRowModel,
  useReactTable,
  getFilteredRowModel,
  ColumnFiltersState,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { ListFilter, CircleCheckBig, Plus } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMemo, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ManifyingGlass from "@/components/icons/ManifyingGlass";
import PaginationControls from "@/components/PaginationControls";
import Link from "next/link";
import MyEventCard from "@/components/MyEventCard";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function MyEventTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rangeFilter, setFilter] = useState<[0, 0]>([0, 0]);
  const [filteredRows, setFilteredRows] = useState<TData[] & any>([]);
  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(0);
  const handleRangeFilter = () => {
    table.setGlobalFilter("");
    setTimeout(() => {
      setFilteredRows(
        data.filter((el) => {
          return (
            parseInt(rangeFilter[0] as any) <=
              parseInt((el as any).gen_info.registrations) &&
            parseInt((el as any).gen_info.registrations) <=
              parseInt(rangeFilter[1] as any)
          );
        })
      );
    }, 100);
  };

  const handleClear = () => {
    setColumnFilters([]);
    setFilteredRows([]);
    setSorting([]);
    setFilter([0, 0]);
    table.reset();
  };

  const handleDropDownFilter = (value: string, col: string) => {
    let text = value.toLowerCase();
   
    if (col === "gen_info_active") {
      if (text === "active") {
        setFilteredRows(data.filter((el) => (el as any).gen_info.active));
      } else {
        setFilteredRows(data.filter((el) => !(el as any).gen_info.active));
      }
    } else {
      setFilteredRows(
        data.filter((el) => (el as any).gen_info.status.toLowerCase() === text)
      );
    }
  };

  const isFiltered =
    rangeFilter.filter((el) => el > 0).length > 0 || filteredRows.length > 0;

  const table = useReactTable({
    data:
      useMemo(
        () => (isFiltered ? filteredRows : data),
        [data, filteredRows, isFiltered]
      ) ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters: columnFilters,
    },
  });

 
  return (
    <>
      {/* Filters & Actions */}

      <div className="flex sm:justify-center md:justify-end items-center flex-wrap gap-4 py-4">
        <span className="sm:flex-1 md:flex-grow-0  flex place-items-center gap-2 rounded-md border-[2px] p-1">
          <ManifyingGlass />
          <input
            placeholder={"Search Event..."}
            onChange={(event) => {
              if (filteredRows.length > 0) {
                setFilteredRows([]);
              }
              table
                .getColumn("gen_info_event_name")
                ?.setFilterValue(event.target.value ?? "");
            }}
            className="max-w-sm outline-none sm:flex-1 md:flex-grow-0  "
          />
        </span>
        <div className="sm:flex  items-center gap-4">
          <span className="flex flex-1">
            <DropdownMenu modal={true} open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger>
                <button className=" flex flex-1 text-base place-items-center gap-2 px-4 rounded-md py-1 border-[2px]">
                  <ListFilter size={20} />
                  Filter
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="overflow-auto max-h-[300px]">
                <DropdownMenuLabel>Active State</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex items-center justify-between"
                  onClick={() =>
                    handleDropDownFilter("active", "gen_info_active")
                  }
                >
                  <span>Active</span>
                  <CircleCheckBig size={15} />
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center justify-between"
                  onClick={() =>
                    handleDropDownFilter("inactive", "gen_info_active")
                  }
                >
                  <span>Inactive</span>
                  <CircleCheckBig size={15} />
                </DropdownMenuItem>

                <DropdownMenuLabel>Operational State</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex items-center justify-between"
                  onClick={() =>
                    handleDropDownFilter("operational", "gen_info.status")
                  }
                >
                  <span>Operational</span>
                  <CircleCheckBig size={15} />
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center justify-between"
                  onClick={() =>
                    handleDropDownFilter("ended", "gen_info.status")
                  }
                >
                  <span>Ended</span>
                  <CircleCheckBig size={15} />
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center justify-between"
                  onClick={() =>
                    handleDropDownFilter("pending approval", "gen_info.status")
                  }
                >
                  <span>Pending Approval</span>
                  <CircleCheckBig size={15} />
                </DropdownMenuItem>

                <DropdownMenuLabel>Registrations</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="flex gap-2 px-4 my-4">
                  <span className="flex flex-col">
                    Min :
                    <input
                      placeholder="Min"
                      defaultValue={0}
                      value={rangeFilter[0]}
                      onChange={(event) => {
                        (rangeFilter[0] as any) =
                          parseInt(event.target.value) || 0;
                        handleRangeFilter();
                      }}
                      className="max-w-sm rounded-md text-sm p-1 border-[2px] "
                    />
                  </span>

                  <span className="flex flex-col">
                    Max :
                    <input
                      placeholder="Max"
                      defaultValue={0}
                      value={rangeFilter[1]}
                      onChange={(event) => {
                        (rangeFilter[1] as any) =
                          parseInt(event.target.value) || 0;
                        handleRangeFilter();
                      }}
                      className="max-w-sm border-[2px] rounded-md text-sm p-1"
                    />
                  </span>
                </div>
                <span className="sticky bottom-0 bg-white flex gap-3 flex-1">
                  <button
                    className=" text-[#FF2727] my-4 px-4 py-1"
                    onClick={() => {
                      handleClear();
                      setOpen(false);
                    }}
                  >
                    Clear Filters
                  </button>

                  <button
                    className=" bg-[#7655FA] text-white rounded-full my-4 px-4 py-1"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    Close
                  </button>
                </span>
              </DropdownMenuContent>
            </DropdownMenu>
          </span>
          <Link href={"/dashboard/add-event"}>
            <button className="flex gap-4 bg-[#7655FA] text-white py-2 px-4 rounded-full">
              <Plus />
              <span>Add New Event</span>
            </button>
          </Link>
        </div>
      </div>

      <div className="sm:hidden md:block">
        <PaginationControls table={table} totalRecords={data.length} />
      </div>

      {/* Data Table */}

      <div className=" md:block sm:hidden my-5 rounded-md  order-collapse border-spacing-0">
        <Table className="border-b-[2px] rounded-md b  border">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b-[8px] text-nowrap"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-[#7655FA] font-semibold"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-none font-semibold text-[#4a4a4a] text-nowrap"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="sm:flex md:hidden flex-col gap-4">
        {(data as any[]).map((element, index) => {
          return (
            <MyEventCard selectedRecord={selectedRecord} setSelectedRecord={setSelectedRecord} key={index} data={element} index={index} />
          );
        })}
      </div>
    </>
  );
}
