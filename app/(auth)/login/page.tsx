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
        className="bg-[#7655fa]   aspect-square transition-all 
      duration-500
      fixed 
      w-full
      left-[50px]
      rounded-full translate-y-[-50%]  [&[data-state=right]]:translate-x-[50%]  [&[data-state=left]]:translate-x-[-60%]"
      >
        Hello
      </div>

      {isLeft === "left" && (
        <div className="flex min-h-screen bg-[white] justify-center border-[2px] ">
          <motion.div
            animate={{ x: ["-100%", "0%"], opacity: [0, 1] }}
            transition={{
              ease: "easeInOut",
              duration: 0.3,
              x: { duration: 0.3 },
            }}
            className="flex-1 flex justify-center items-center z-20"
          >
            <div className="flex flex-col gap-3">
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
              x: { duration: 0.3 },
              opacity: { duration: 0.3 },
            }}
            className="flex-1 "
          >
            <LoginForm />
          </motion.span>
        </div>
      )}

      {isLeft === "right" && (
        <div className="flex min-h-screen bg-[white] justify-center border-[2px] ">
          <motion.span
            animate={{ x: ["-100%", "0%"], opacity: [0, 1] }}
            transition={{
              ease: "easeInOut",
              duration: 0.3,
              x: { duration: 0.3 },
              opacity: { duration: 0.3 },
            }}
            className="flex-1 "
          >
            <SignupForm />
          </motion.span>

          <motion.div
            animate={{ x: ["100%", "0%"], opacity: [0, 1] }}
            transition={{
              ease: "easeInOut",
              duration: 0.3,
              x: { duration: 0.3 },
              opacity: { duration: 0.3 },
            }}
            className="flex-1 flex justify-center items-center z-20"
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
