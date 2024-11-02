'use client'
import { PencilLine } from "lucide-react";
import Link from "next/link";
import React from "react";
import parser from "html-react-parser"
const ProfileGeneralInfo = ({profile}:{profile:any}) => {
  return (
    <div className="flex-1 flex flex-col gap-4 p-10 rounded-md bg-white ">
      <div className="flex justify-between items-center">
        <h1 className="text-[#4a4a4a] text-lg font-semibold">
          General Information
        </h1>
        <Link
          href={"/dashboard/setting"}
          className="p-2 hover:bg-[#7655fa42] transition-all rounded-full"
        >
          <PencilLine size={20} color="#7655fa" />
        </Link>
      </div>

      <div className="flex flex-col gap-4 border-b-[1px] pb-4">
        <div className="flex flex-col">
          <span className="text-[#999999] text-sm font-semibold">
            Company Name
          </span>
          <span className="text-[#4a4a4a] text-base font-semibold">
          { profile?.full_name || "No Company Name"}
          </span>
        </div>

        <div className="flex justify-between items-center gap-4">
          <div className="flex-1 flex flex-col">
            <span className="text-[#999999] text-sm font-semibold">Email</span>
            <span className="text-[#4a4a4a] text-base font-semibold">
            { profile?.email || "No Email"}
            </span>
          </div>
          <div className="flex-1 flex flex-col">
            <span className="text-[#999999] text-sm font-semibold">Phone</span>
            <span className="text-[#4a4a4a] text-base font-semibold">
            { profile?.phone || "No Company Phone"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 my-4">
        <div className="flex-1 flex flex-col">
          <span className="text-[#4a4a4a] text-lg font-semibold">About</span>
          <p className="text-[#999999] text-sm font-semibold text-justify">
          { parser(`${profile?.about}`) || "No About"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileGeneralInfo;
