'use client'
import React, { useState } from "react";
import Image from "next/image";
import { Trash } from "lucide-react";

const dummyData = {
    publicKey: "sdfasdfasdfasdf123asdfasdfasdf",
    secret: "hello123",
  }
const PaymentMethodCard = () => {
    const [data , setData] =  useState(dummyData)

  return (
    <div className=" flex gap-4 justify-between p-4 border-[1px] rounded-md">
      <div className="flex gap-4 ">
        <span className="flex justify-center items-center overflow-hidden rounded-full">
          <Image
            src={"/StripeLogo.svg"}
            alt="stripe-logo"
            height={50}
            width={50}
          />
        </span>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold">Stripe Integration</h1>
            {data && (
              <span className=" text-sm rounded-full font-semibold py-1 px-2  bg-[#7655fa] text-white">
                Connected
              </span>
            )}
            {!data && (
              <span className=" text-sm rounded-full font-semibold py-1 px-2 bg-[#7655fa26] text-[#999999]">
                Disconnected
              </span>
            )}
          </div>
          <h1 className="text-[#999999] text-sm font-semibold">
            Allow your guests to pay with stripe when they register for an event
          </h1>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        {data && (
          <span onClick={()=> setData(null as any)} className=" flex justify-center items-center p-2 cursor-pointer rounded-full transition-all hover:bg-[#ff000028] ">
            <Trash  className="text-[#ff0000b9]" size={22} strokeWidth={1.2} />
          </span>
        )}

        <button className=" text-base rounded-full  py-2 px-4  bg-[#7655fa] text-white" onClick={()=>setData(dummyData)}>{data ? "Change Account" : "Setup Account"}</button>
      </div>
    </div>
  );
};

export default PaymentMethodCard;
