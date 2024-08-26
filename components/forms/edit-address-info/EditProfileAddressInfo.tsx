"use client";
import { joditConfig } from "@/configs/joditConfig";
import JoditEditor from "jodit-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const EditProfileAddressInfo = () => {
  const methods = useForm();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <div className="flex-1 flex flex-col gap-4 p-10 rounded-md bg-white ">
      <div className="flex justify-between items-center">
        <h1 className="text-[#4a4a4a] text-lg font-semibold">Address</h1>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[#999999] text-sm font-semibold">
          Google Map Link (Embeded Map)
        </span>
        <input
          type="text"
          placeholder="Company Name"
          className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
        />
      </div>

      {/* divider */}
      <div className=" h-[2px] my-4 w-auto flex bg-[#e8e8e8] justify-center items-center">
        <p className="bg-white text-[#7655fa] text-sm p-2 rounded-full ">OR</p>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[#999999] text-sm font-semibold">
         Street Address
        </span>
        <input
          type="text"
          placeholder="Street Address"
          className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
        />
      </div>

      <div className="flex justify-between items-center gap-4">
        <div className="flex-1 flex flex-col gap-2">
          <span className="text-[#999999] text-sm font-semibold">City</span>
          <input
            type="text"
            placeholder="City"
            className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
          />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <span className="text-[#999999] text-sm font-semibold">State</span>
          <input
            type="text"
            placeholder="State"
            className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
          />
        </div>
      </div>

      <div className="flex justify-between items-center gap-4">
        <div className="flex-1 flex flex-col gap-2">
          <span className="text-[#999999] text-sm font-semibold">Postal Code</span>
          <input
            type="number"
            placeholder="Postal Code"
            min={0}
            className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
          />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <span className="text-[#999999] text-sm font-semibold">Country</span>
          <input
            type="text"
            placeholder="Country"
            className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
          />
        </div>
      </div>

      <span className="text-[#999999] text-sm font-semibold">Default City</span>
      <div className="flex flex-col gap-2 border-[1px] rounded-md p-4">
        <div className="bg-[#7655FA26] text-[#4a4a4a] flex items-center justify-center h-[40px] w-auto text-center rounded-md text-sm ">
          <span>Your default city Safed Hatsafon</span>
        </div>
        <span className="text-[#999999] text-sm font-semibold">City</span>
        <input
          type="text"
          placeholder="Default City"
          className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
        />
      </div>

      <div className="flex justify-end items-center gap-4">
        <button className="px-4 py-2 bg-[#7655fa] text-white rounded-full">
          {" "}
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfileAddressInfo;
