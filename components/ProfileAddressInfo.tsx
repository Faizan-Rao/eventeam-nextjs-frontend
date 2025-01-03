"use client";
import { PencilLine } from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
const ProfileAddressInfo = ({profile}:{profile:any}) => {
  const element = () =>
    `<iframe src=${profile?.address?.googlemaplink || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387194.0622732494!2d-74.30932777004287!3d40.697019286161634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1724675229969!5m2!1sen!2s"} width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
  return (
    <div className="flex-1 flex flex-col gap-4 p-10 rounded-md bg-white ">
      <div className="flex justify-between items-center">
        <h1 className="text-[#4a4a4a] text-lg font-semibold">Address</h1>
        <Link
          href={"/dashboard/setting"}
          className="p-2 hover:bg-[#7655fa42] transition-all rounded-full active:scale-[0.95] "
        >
          <PencilLine size={20} color="#7655fa" />
        </Link>
      </div>

      <div className="flex flex-col gap-4 border-b-[1px] pb-4">
        <div className="flex justify-between items-center gap-4">
          <div className="flex-1 flex flex-col">
            <span className="text-[#999999] text-sm font-semibold">Street</span>
            <span className="text-[#4a4a4a] text-base font-semibold">
              {profile?.address?.address || "No Street"}
            </span>
          </div>
          <div className="flex-1 flex flex-col">
            <span className="text-[#999999] text-sm font-semibold">City</span>
            <span className="text-[#4a4a4a] text-base font-semibold">
            {profile?.address?.city || "No City"}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center gap-4">
          <div className="flex-1 flex flex-col">
            <span className="text-[#999999] text-sm font-semibold">State</span>
            <span className="text-[#4a4a4a] text-base font-semibold">
            {profile?.address?.state || "No State"}
            </span>
          </div>
          <div className="flex-1 flex flex-col">
            <span className="text-[#999999] text-sm font-semibold">
              Postal Code
            </span>
            <span className="text-[#4a4a4a] text-base font-semibold">
            {profile?.address?.zip_code || "No Zip Code"}
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-[#999999] text-sm font-semibold">Country</span>
          <span className="text-[#4a4a4a] text-base font-semibold">
          {profile?.address?.country || "No Country"}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[#999999] text-sm font-semibold">
            Default City
          </span>
          <span className="text-[#7655fa] text-base font-semibold">
            New York
          </span>
        </div>
      </div>

      {element && (
        <div
          dangerouslySetInnerHTML={{ __html: element() }}
          className="my-4 sm:max-h-auto sm:max-w-[82vw] md:max-h-[460px] md:max-w-auto md:max-w-[100%]  overflow-y-scroll"
        />
      )}
    </div>
  );
};

export default ProfileAddressInfo;
