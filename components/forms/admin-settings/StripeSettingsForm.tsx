import React from "react";

const EditStripSettings = () => {
  return (
    <div className="flex-1 flex flex-col gap-4 sm:px-4 sm:py-6 md:p-10 rounded-md bg-white ">
      <div className="flex justify-between items-center">
        <h1 className="text-[#4a4a4a] text-lg font-semibold">Stripe Setting</h1>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-[#999999] text-sm font-semibold">
       Stripe Publishable Key 
        </span>
        <input
          type="text"
        placeholder="Enter The Publishable Key"
          className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
        />
      </div>
 
        <div className="flex flex-col gap-2">
        <span className="text-[#999999] text-sm font-semibold">
        Stripe Secret key
        </span>
        <input
          type="text"
         placeholder="Enter The Secret Key"
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

export default EditStripSettings;
