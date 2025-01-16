"use client"
import { user } from "@/configs/axios";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useLayoutEffect } from "react";


const PendingApprovalPage = () => {
  const pathname = usePathname()
   useLayoutEffect(() => {
      console.log("user data here", user);
      if (
        user["token"] &&
        pathname.includes("/pending-approval") &&
        user?.is_active === 1
      ) {
        window.location.replace("/dashboard");
        return
      }
      if (
        user["token"] &&
        pathname.includes("/dashboard") &&
        user?.is_active !== 1
      ) {
        window.location.replace("/pending-approval");
      }
      if (!user["token"] && pathname.includes("/dashboard")) {
        window.location.replace("/login");
      }
    }, [pathname]);
    
  return (
    <div className="relative overflow-hidden min-h-screen h-full flex flex-col justify-between items-center">
      <div className="md:hidden sm:flex justify-center items-center gap-2  my-4">
        <Image
          src={"/logo.svg"}
          className={
            "sm:w-[3.2em] sm:h-[3.2em] md:w-[3.2em] md:h-[3.2em] z-[1]"
          }
          height={200}
          width={200}
          alt="office-manage"
        />
        <h1 className="text-xl font-semibold">EvenTeam</h1>
      </div>
      <div className="bg-[#7655fa] absolute rounded-full w-[200vw] h-[200vw] md:bottom-[30vw] sm:-bottom-[179vw]   -left-[50vw] -z-index-[1] aspect-square overflow-hidden" />
      <Image
        src={"/office-manage.svg"}
        className={"sm:w-[20em] sm:h-[20em] md:w-[25em] md:h-[25em] z-[1] "}
        height={200}
        width={200}
        alt="office-manage"
      />
      <div className="flex  flex-1 flex-col gap-4 justify-start items-center z-[1]  my-auto">
        <h1 className=" sm:text-2xl md:text-4xl font-semibold">
          Thank you for registration!
        </h1>
        <p className=" text-center sm:text-sm md:text-base max-w-[470px]">
          We are reviewing your registration. You will get a confirmation email
          soon. If you’re facing an issue email us at{" "}
          <span className="text-[#7655fa] font-semibold">
            support@eventeam.com
          </span>
        </p>
        <div
          className="text-[white] flex justify-center items-center gap-4 px-4  py-2 rounded-full bg-[#7655fa] cursor-pointer active:scale-[0.95] transition-all"
              onClick={() => {
                localStorage.removeItem("user");
                let local = localStorage.getItem("user");
                if (!local) {
                  window.location.replace("/login");
                }
               
              }}
            >
           Log Out <LogOut size={35} className=" rounded-full transition-all hover:text-white p-2"/> 
            </div>
      </div>

    

      <div className="sm:hidden md:flex justify-center items-center gap-2  my-4">
        <Image
          src={"/logo.svg"}
          className={
            "sm:w-[3.2em] sm:h-[3.2em] md:w-[3.2em] md:h-[3.2em] z-[1]"
          }
          height={200}
          width={200}
          alt="office-manage"
        />
        <h1 className="text-xl font-semibold">EvenTeam</h1>
      </div>
    </div>
  );
};

export default PendingApprovalPage;
