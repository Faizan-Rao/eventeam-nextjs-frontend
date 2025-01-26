import React from "react";

const EditEmailSettings = () => {
  return (
    <div className="flex-1 flex flex-col gap-4 sm:px-4 sm:py-6 md:p-10 rounded-md bg-white ">
      <div className="flex justify-between items-center">
        <h1 className="text-[#4a4a4a] text-lg font-semibold">Email Setting</h1>
      </div>
      <div className="grid sm:grid-cols-1  md:grid-cols-3 gap-4 ">
      <div className="flex flex-col gap-2">
        <span className="text-[#999999] text-sm font-semibold">
         Mailer
        </span>
        <input
          type="text"
          placeholder="Enter Mailer"
          className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-[#999999] text-sm font-semibold">
          Port
        </span>
        <input
          type="number"
           placeholder="0000"
          className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-[#999999] text-sm font-semibold">
         Encryption
        </span>
        <input
          type="text"
          placeholder="Enter Encryption"
          className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
        />
      </div>


      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[#999999] text-sm font-semibold">
          Host
        </span>
        <input
          type="text"
         placeholder="Enter Host"
          className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
        />
      </div>

      <div className="grid sm:grid-cols-1  md:grid-cols-2 gap-4 ">
      <div className="flex flex-col gap-2">
        <span className="text-[#999999] text-sm font-semibold">
         From Name
        </span>
        <input
          type="text"
          placeholder="Enter From Name"
          className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-[#999999] text-sm font-semibold">
          From Email
        </span>
        <input
          type="number"
          placeholder="Enter From Email"
          className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-[#999999] text-sm font-semibold">
         Username
        </span>
        <input
          type="text"
         placeholder="Enter Username"
          className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[#999999] text-sm font-semibold">
         Password
        </span>
        <input
          type="text"
          placeholder="Enter Password"
          className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
        />
      </div>
      </div>
      <div className="flex justify-end items-center gap-4">
        <button className="px-4 py-2 active:scale-[0.95] transition-all bg-[#7655fa] text-white rounded-full">
          {" "}
          Test and Save Settings
        </button>
      </div>
    </div>
  );
};

export default EditEmailSettings;
