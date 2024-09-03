'use client'
import React from "react";
import Image from "next/image";
const SignupForm = () => {
  return (
    <div className="flex flex-col justify-center items-center   min-h-[90vh]">
      <form className="flex flex-col my-4 gap-4 ">
      <div className="flex items-center gap-4">
          <Image src={"/logo.svg"} alt="log" height={40} width={40} />
          <h1 className="text-[#4a4a4a] text-xl font-bold">EvenTeam</h1>
        </div>

        <h1 className="text-[#4a4a4a] text-4xl font-bold">Sign Up Now</h1>

        <div className="flex flex-col gap-2">
          <span className="text-[#4a4a4a] text-sm font-semibold">
            Company Name
          </span>
          <input
            type="text"
            placeholder="Company Name"
            className="text-[#4a4a4a] text-base outline-[#7655fa]  p-2 border-[1px]  rounded-md"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-[#4a4a4a] text-sm font-semibold">Email</span>
            <input
              type="text"
              placeholder="Email"
              className="text-[#4a4a4a] text-base outline-[#7655fa]  p-2 border-[1px]  rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[#4a4a4a] text-sm font-semibold">Phone</span>
            <input
              type="text"
              placeholder="Phone"
              className="text-[#4a4a4a] text-base outline-[#7655fa]  p-2 border-[1px]  rounded-md"
            />
          </div>
        </div>

      
        <div className="flex flex-col gap-2">
          <span className="text-[#4a4a4a] text-sm font-semibold">Password</span>
          <input
            type="password"
            placeholder="Password"
            className="text-[#4a4a4a] text-base outline-[#7655fa]  p-2 border-[1px]  rounded-md"
          />
        </div>
    
          <button className="px-4 py-2 bg-[#7655fa] text-white rounded-full">
            {" "}
            Sign Up
          </button>
        
      </form>
    </div>
  );
};

export default SignupForm;
