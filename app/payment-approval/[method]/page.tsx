"use client";
import Loading from "@/app/loading";
import { StripeAPI } from "@/configs/apiRoutes";
import { AxiosError } from "axios";
import { ArrowLeftCircle } from "lucide-react";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import { toast } from "react-toastify";

const ApprovalPage = () => {
  const { method } = useParams();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        if (method === "stripe" && searchParams.has("code")) {
          let response = await StripeAPI.completeOnBoarding({ code });
          console.log(response.data.data);
          if(response.data.statusCode === 200)
          {
            setIsSuccess(true)
            window.location.href = "/dashboard/payment-method"
          }
          else
          {
            setIsSuccess(false)
          }
        }
      } catch (error : AxiosError | any) {
        if(error !== undefined)
        {
          toast(error?.response?.data.message, { type: "error" });

        }
      } finally {
        setIsLoading(false)
      }
    })();
  }, [code, method, searchParams]);

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
      <div className="bg-[#7655fa] absolute rounded-full w-[200vw] h-[200vw] md:bottom-[50vw] lg:bottom-[25vw] sm:-bottom-[179vw]   -left-[50vw] -z-index-[1] aspect-square overflow-hidden" />
      <Image
        src={"/office-manage.svg"}
        className={"sm:w-[20em] sm:h-[60vw] md:w-[75vw] md:h-[25vw] z-[1] "}
        height={200}
        width={200}
        alt="office-manage"
      />

      {isLoading && (
        <div className="flex  flex-1 flex-col gap-4 justify-start items-center z-[1]  my-auto">
          <HashLoader
            color={"#7655fa"}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <h1 className=" sm:text-2xl md:text-2xl ">Loading</h1>
        </div>
      )}
     {!isLoading && <div className="flex  flex-1 flex-col gap-4 justify-start items-center z-[1]  my-auto">
        <h1 className=" sm:text-2xl md:text-3xl font-semibold">
         {isSuccess && " Your Payment Method Connected Successfully!"}
         {!isSuccess && " Payment Method Connection Failed"}
        </h1>
        <p className=" text-center sm:text-sm md:text-base max-w-[470px]">
          To go back to the payment methods Click here
          <a
            href="/dashboard/payment-method"
            className="text-[#7655fa] font-semibold flex justify-center items-center gap-2 my-3"
          >
            {" "}
            <ArrowLeftCircle className="inline" /> <span>Back</span>
          </a>
        </p>
      </div>}

      <div className="sm:hidden md:flex justify-center items-center gap-2  my-4">
        <Image
          src={"/logo.svg"}
          className={
            "sm:w-[3.2em] sm:h-[3.2em] md:w-[2.8em] md:h-[2.8em] z-[1]"
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

export default ApprovalPage;
