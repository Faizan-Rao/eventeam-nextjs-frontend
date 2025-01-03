import clsx from "clsx";
import React from "react";

const PaginationControls = ({
  table,
  totalRecords,
}: {
  table: any;
  totalRecords: number;
}) => {
  return (
    <div className="flex justify-between flex-wrap items-center">
      {/* Pagination Controls */}
      <span className="font-semibold flex  gap-4 text-nowrap text-[#4a4a4a]">
        <p className="text-[#4a4a4a] flex-1">
          Page: {" "}
          <span className="text-[#7655fa]">
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount() || "1"}
          </span>
        </p>
        <p className="text-[#4a4a4a] flex-1">
          Total Records: <span className="text-[#7655fa]">{totalRecords} </span>
        </p>
      </span>

      <span className="flex items-center justify-end space-x-2 py-4">
        <button
          className={clsx(
            "px-4 py-1 bg-[#7655FA]  active:scale-[0.95] transition-all text-[white] rounded-full",
            !table.getCanPreviousPage() && "bg-[#dadada]"
          )}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <button
          className={clsx(
            "px-4 py-1 bg-[#7655FA]  active:scale-[0.95] transition-all text-[white] rounded-full",
            !table.getCanNextPage() && "bg-[#dadada]"
          )}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
        <select
          className="outline-none border-none cursor-pointer "
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option  key={pageSize} className="   px-4 " value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </span>
    </div>
  );
};

export default PaginationControls;
