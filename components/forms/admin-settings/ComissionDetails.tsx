import React from "react";

const EditComissionDetails = () => {
  return (
    <div className="flex-1 flex flex-col gap-4 sm:px-4 sm:py-6 md:p-10 rounded-md bg-white ">
      <div className="flex justify-between items-center">
        <h1 className="text-[#4a4a4a] text-lg font-semibold">Commission Details</h1>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-[#999999] text-sm font-semibold">
       Commission %
        </span>
        <input
          type="number"
         placeholder="0"
          className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
        />
      </div>
      <button className="px-4 py-2 active:scale-[0.95] transition-all bg-[#7655fa26] text-[#7655fa] hover:bg-[#7655fa] hover:text-white rounded-md">
          {" "}
          Send Confirmation OTP
        </button>
        <div className="flex flex-col gap-2">
        <span className="text-[#999999] text-sm font-semibold">
        Enter OTP
        </span>
        <input
          type="number"
         placeholder="0"
          className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
        />
      </div>
      <div className="flex justify-end items-center gap-4">
        <button className="px-4 py-2 active:scale-[0.95] transition-all bg-[#7655fa] text-white rounded-full">
          {" "}
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default EditComissionDetails;
