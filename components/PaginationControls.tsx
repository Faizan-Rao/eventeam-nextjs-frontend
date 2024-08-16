import clsx from "clsx";
import React from "react";

const PaginationControls = ({ table }: any) => {
  console.log(table.getState().pagination);
  return (
    <div className="flex justify-between flex-wrap items-center">

      

      {/* Pagination Controls */}
      <span className="font-semibold text-nowrap text-[#4a4a4a]">
        Current Page: {table.getState().pagination.pageIndex + 1}
      </span>

      <span className="flex items-center justify-end space-x-2 py-4">
        <button
          className={clsx(
            "px-4 py-1 bg-[#7655FA] text-[white] rounded-full",
            !table.getCanPreviousPage() && "bg-[#dadada]"
          )}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <button
          className={clsx(
            "px-4 py-1 bg-[#7655FA] text-[white] rounded-full",
            !table.getCanNextPage() && "bg-[#dadada]"
          )}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
        <select
          className="outline-none border-none"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </span>
    </div>
  );
};

export default PaginationControls;
