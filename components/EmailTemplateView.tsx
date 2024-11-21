"use client";
import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Profile } from "@/configs/apiRoutes";
import { Youtube, Instagram, Facebook, MapPin, Clock } from "lucide-react";
import parser from 'html-react-parser'
const EmailTemplateView = ({data} : {data : any} ) => {
  const {
    data: profile,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: Profile.get,
  });
  const profileData = profile && profile?.data.data;

  return (
    <div className="flex relative  flex-col rounded-2xl p-10  w-auto flex-1  overflow-hidden bg-[#f0f0f0]   box-border">
      <div className="bg-gradient-to-r absolute -top-[120%] -right-[85%]  r from-[#BD55FA] to-[#7655fa] z-[1] rotate-  h-[2000px] rounded-full w-[2000px] "></div>

      <div className=" flex flex-col  justify-center p-6 bg-white mx-auto rounded-2xl  w-auto  z-[2] ">
        {/* Header */}
        {profileData && (
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="h-[60px] w-[60px] border-[2px] aspect-square  overflow-hidden rounded-full">
              <Image
                src={profileData.photo}
                height={120}
                width={150}
                alt="logo"
              />
            </div>
            <h1 className="text-lg font-semibold text-[#1E1640]">
              {profileData.full_name}
            </h1>
          </div>
        )}
        <div className="bg-[#FBE3FF] rounded-xl  min-h-[260px] flex place-content-center">
          <Image
            src={"/business.svg"}
            className=" "
            height={160}
            width={170}
            alt="logo"
          />
        </div>
        {/* Body */}
        <div className="flex flex-1 text-center my-4 justify-between items-center">
          <h1 className="text-2xl mx-auto  font-semibold">
            {data && data.subject || "No Subject Here"}
          </h1>
          
        </div>

        <div className="flex flex-1  my-4 justify-between items-center text-justify">
          <div className="text-base  w-auto">
          {data && parser(data.body) || "No Body Here"}
            
          </div>
         
        </div>

        <h1 className="text-sm  font-semibold text-[#7655fa]">
          Event Information{" "}
        </h1>
        <h1 className="text-xl  font-semibold my-2">
          The New Year&apos;s Eve{" "}
        </h1>
        <div className="flex justify-between gap-4 my-2 rounded-xl bg-[#fafafa] p-4">
          <div className="flex items-center gap-2">
            <div className="aspect-square p-1 object-cover rounded-full bg-[#ffe58a]">
              <MapPin className="h-[20px] w-[20px] aspect-square object-cover text-sm" />
            </div>
            <h1 className="text-sm ml-2  ">
              2159, New Jersey Street, New York
            </h1>
          </div>
          <div className="flex items-center  gap-2">
            <div className="aspect-square p-1 object-cover rounded-full bg-[#e1ff81]">
              <Clock className="h-[20px] w-[20px] aspect-square object-cover text-sm" />
            </div>
            <h1 className="text-sm ml-2   ">
              8am, 28 June - 12 pm, 29 June
            </h1>
          </div>
        </div>
        {/* Subevents */}
        <h1 className="text-sm  font-semibold text-[#7655fa]">Sub Events</h1>
        <div className="flex my-4 justify-stretch items-center flex-wrap gap-2">
          <h1 className="p-4 text-sm flex-1 text-center  rounded-xl bg-[#fafafa]">
            Subevent #1
          </h1>
          <h1 className="p-4 text-sm flex-1 text-center  rounded-xl bg-[#7655fa26]">
            Subevent #1
          </h1>
          <h1 className="p-4 text-sm flex-1 text-center  rounded-xl bg-[#fafafa]">
            Subevent #1
          </h1>
        </div>

        {/* Subevents */}
        <h1 className="text-sm  font-semibold text-[#7655fa]">Activities</h1>
        <div className="my-2 mb-4 text-sm flex flex-col gap-2">
          <p>
            {" "}
            <span className="font-semibold">
              9:00
            </span> {` - Candle Light Time`}{" "}
          </p>
          <p>
            {" "}
            <span className="font-semibold">9:00</span>{" "}
            {` - Some Other Activity Time`}{" "}
          </p>
          <p>
            {" "}
            <span className="font-semibold">9:00</span>{" "}
            {` - Some Other Activity Time`}{" "}
          </p>
          <p>
            {" "}
            <span className="font-semibold">9:00</span>{" "}
            {` - Some Other Activity Time`}{" "}
          </p>
        </div>
        <div className="flex justify-between bg-[#7655FA26] rounded-lg p-4">
          <h1 className="text-base ml-2  font-semibold text-[#7655fa]">
            Follow
          </h1>
          <div className="flex mx-3 text-[#7655fa]  justify-center gap-4 items-center">
            <Youtube strokeWidth={1.2} className="h-[20px] w-[20px] aspect-square object-cover text-sm" />
            <Facebook strokeWidth={1.2} className="h-[20px] w-[20px] aspect-square object-cover text-sm" />
            <Instagram strokeWidth={1.2} className="h-[20px] w-[20px] aspect-square object-cover text-sm" />
          </div>
        </div>
      </div>
      <h1 className="text-sm mx-auto my-4  font-semibold text-[#7655fa] ">
        Powered By EventTeam.
      </h1>

      <div className="flex justify-between px-4 my-4">
        <div className="flex items-center gap-2">
          <Image
            src={"/logo.svg"}
            height={40}
            width={50}
            alt="logo"
            className="h-[40px] w-[40px] aspect-square object-cover"
          />
          <h1 className="text-[#7655fa] font-semibold text-xl">EvenTeam</h1>
        </div>

        <div className="flex mx-3   justify-center gap-4 items-center">
          <Youtube strokeWidth={1.3} className="h-[20px] w-[20px] aspect-square object-cover text-sm" />
          <Facebook strokeWidth={1.3} className="h-[20px] w-[20px] aspect-square object-cover text-sm" />
          <Instagram strokeWidth={1.3} className="h-[20px] w-[20px] aspect-square object-cover text-sm" />
        </div>
      </div>
    </div>
  );
};

export default EmailTemplateView;
