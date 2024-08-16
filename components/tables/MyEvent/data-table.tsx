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
import { ListFilter, CircleCheckBig } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

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

  const handleRangeFilter = () => {
    table.setGlobalFilter("");
    setTimeout(() => {
      setFilteredRows(
        data.filter((el) => {
          return (
            parseInt(rangeFilter[0] as any) <=
              parseInt((el as any).registrations) &&
            parseInt((el as any).registrations) <=
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
    table.reset()
  };

  const handleDropDownFilter = (value: string, col: string) => {
    let text = value.toLowerCase();
    if (col === "is-active") {
      if (text === "active") {
        setFilteredRows(data.filter((el) => (el as any)["is-active"]));
      } else {
        setFilteredRows(data.filter((el) => !(el as any)["is-active"]));
      }
    } else {
      setFilteredRows(
        data.filter((el) => (el as any)["status"].toLowerCase() === text)
      );
    }
  };

  const isFiltered =
    rangeFilter.filter((el) => el > 0).length > 0 || filteredRows.length > 0;

  const table = useReactTable({
    data: isFiltered ? filteredRows : data,
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
        <span className="flex place-items-center gap-2 rounded-md border-[2px] p-1">
          <ManifyingGlass />
          <input
            placeholder={"Searh Title..."}
            onChange={(event) => {
              if (filteredRows.length > 0) {
                setFilteredRows([]);
              }
              table
                .getColumn("title")
                ?.setFilterValue(event.target.value ?? "");
            }}
            className="max-w-sm outline-none"
          />
        </span>

        <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger>
            <button className="flex text-base place-items-center gap-2 px-4 rounded-md py-1 border-[2px]">
              <ListFilter size={20} />
              Filter
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Active State</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center justify-between"
              onClick={() => handleDropDownFilter("active", "is-active")}
            >
              <span>Active</span>
              <CircleCheckBig size={15} />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center justify-between"
              onClick={() => handleDropDownFilter("inactive", "is-active")}
            >
              <span>Inactive</span>
              <CircleCheckBig size={15} />
            </DropdownMenuItem>

            <DropdownMenuLabel>Operational State</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center justify-between"
              onClick={() => handleDropDownFilter("operational", "status")}
            >
              <span>Operational</span>
              <CircleCheckBig size={15} />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center justify-between"
              onClick={() => handleDropDownFilter("ended", "status")}
            >
              <span>Ended</span>
              <CircleCheckBig size={15} />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center justify-between"
              onClick={() => handleDropDownFilter("pending approval", "status")}
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
                    (rangeFilter[0] as any) = parseInt(event.target.value) || 0;
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
                    (rangeFilter[1] as any) = parseInt(event.target.value) || 0;
                    handleRangeFilter();
                  }}
                  className="max-w-sm border-[2px] rounded-md text-sm p-1"
                />
              </span>
            </div>
            <span className="flex gap-3 flex-1">
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
      </div>

     
      <PaginationControls table={table} />

      {/* Data Table */}
     
      <div className="my-5 rounded-md ">
        <Table className="border-b-[2px] rounded-md">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b-[8px]">
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
                  className="border-none font-semibold text-[#4a4a4a]"
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
      <span className="gap-4 flex my-4 font-semibold ">
      <p className="text-[#4a4a4a]">Total Records: {data.length}</p>
      <p className="text-[#4a4a4a]">Selected Rows: {table.getSelectedRowModel().rows.length}</p>

      </span>
    </>
  );
}
