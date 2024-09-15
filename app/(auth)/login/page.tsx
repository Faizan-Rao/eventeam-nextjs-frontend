"use client";
import React, { useEffect, useState } from "react";
import { easeIn, easeInOut, motion } from "framer-motion";
import LoginForm from "@/components/forms/login/LoginForm";
import SignupForm from "@/components/forms/signup/SignupForm";

const Login = () => {
  useEffect(() => {
    document.documentElement.classList.add("overflow-hidden");
  });
  const [isLeft, setLeft] = useState("left");

  return (
    <>
      <div
        data-state={isLeft}
        className="bg-[#7655fa] sm:hidden md:block sm:h-[200vh] md:min-h-screen  aspect-square transition-all  duration-700 fixed w-full  rounded-full translate-y-[-50%]  [&[data-state=right]]:translate-x-[50%]  [&[data-state=left]]:translate-x-[-60%]"
      >
        Hello
      </div>

      {isLeft === "left" && (
        <div className="flex  min-h-screen bg-[white] justify-center border-[2px] ">
          <motion.div
            animate={{ x: ["-100%", "0%"], opacity: [0, 1] }}
            transition={{
              ease: "easeInOut",
              duration: 0.3,
              x: { duration: 0.4 },
            }}
            className="flex-1 sm:hidden md:flex justify-center mx-auto items-center z-20"
          >
            <div className="flex flex-col sm:items-center gap-3">
              <h1 className="text-4xl text-white font-semibold">New Here?</h1>
              <h1 className="text-2xl text-white ">Join Us Right Now</h1>
              <button
                className="border-[white] max-w-[100px]  border-[2px] px-4 py-2 rounded-full text-white font-semibold"
                onClick={() => setLeft("right")}
              >
                Sign up
              </button>
            </div>
          </motion.div>

          <motion.span
            animate={{ x: ["100%", "0%"], opacity: [0, 1] }}
            transition={{
              ease: "easeInOut",
              duration: 0.3,
              x: { duration: 0.5 },
              opacity: { duration: 0.3 },
            }}
            className="flex-1 "
          >
             
            <button
                className=" sm:block md:hidden min-w-full my-4 border-[#7655fa]  mx-auto border-[2px] px-4 py-2 rounded-full text-[#7655fa] font-semibold"
                onClick={() => setLeft("right")}
              >
                New here Sign up now
              </button>
            
            <LoginForm />
          </motion.span>
        </div>
      )}

      {isLeft === "right" && (
        <div className="flex  min-h-screen bg-[white] justify-center border-[2px] ">
          <motion.span
            animate={{ x: ["-100%", "0%"], opacity: [0, 1] }}
            transition={{
              ease: "easeInOut",
              duration: 0.3,
              x: { duration: 0.5 },
              opacity: { duration: 0.3 },
            }}
            className="flex-1 "
          >
           <button
                className=" sm:block md:hidden min-w-full my-4 border-[#7655fa]  mx-auto border-[2px] px-4 py-2 rounded-full text-[#7655fa] font-semibold"
                onClick={() => setLeft("left")}
              >
                Already Member? Sign in now
              </button>
            <SignupForm />
          </motion.span>

          <motion.div
            animate={{ x: ["100%", "0%"], opacity: [0, 1] }}
            transition={{
              ease: "easeInOut",
              duration: 0.3,
              x: { duration: 0.4 },
              opacity: { duration: 0.3 },
            }}
            className="flex-1 sm:hidden md:flex justify-center items-center z-20"
          >
            <div className="flex flex-col gap-3">
              <h1 className="text-4xl text-white font-semibold">
                Already Member?
              </h1>
              <h1 className="text-2xl text-white ">Sign in Right Now</h1>
              <button
                className="border-[white] max-w-[100px] border-[2px] px-4 py-2 rounded-full text-white font-semibold"
                onClick={() => setLeft("left")}
              >
                Sign in
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Login;
