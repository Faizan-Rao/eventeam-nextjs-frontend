"use client";
import Image from "next/image";
import React from "react";

const LoginForm = () => {
  return (
    <div className=" flex flex-col justify-center items-center   min-h-[90vh] ">
      <form className="min-w-[400px] p-4 justify-center flex flex-col gap-4 ">
        <div className="flex items-center gap-4">
          <Image src={"/logo.svg"} alt="log" height={40} width={40} />
          <h1 className="text-[#4a4a4a] text-xl font-bold">EvenTeam</h1>
        </div>

        <h1 className="text-[#4a4a4a] text-4xl font-bold">Sign In</h1>

        <div className="flex flex-col gap-4">
          <div className=" flex flex-col">
            <span className="text-[#4a4a4a]  font-semibold">Email</span>
            <input className="p-2 outline-[#7655fa] border-[2px] rounded-md" placeholder="Enter Email" type="text" name="" id="" />
          </div>
          <div className=" flex flex-col">
            <span className="text-[#4a4a4a]  font-semibold">Password</span>
            <input className="p-2 outline-[#7655fa] border-[2px] rounded-md" placeholder="Enter password" type="password" name="" id="" />
          </div>
          <p className="text-[#7655fa]">Forgot Password?</p>
        </div>

        <button className="px-4 my-4 py-2 bg-[#7655fa] font-semibold rounded-full text-white">Sign In</button>
      </form>
    </div>
  );
};

export default LoginForm;
