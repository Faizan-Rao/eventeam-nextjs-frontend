'use client'
import MainContentGrid from "@/components/MainContentGrid";
import PageTitleContainer from "@/components/PageTitleContainer";
import { clsx } from "clsx";
import React, { useState } from "react";
import dynamic from "next/dynamic";
const ApplicationFeeForm = dynamic(()=> import("@/components/forms/form-fields/ApplicationFeeForm")) ;
const FormFieldForm = dynamic(()=> import("@/components/forms/form-fields/FormFieldForm"));
const GuestFieldForm = dynamic(()=> import("@/components/forms/form-fields/GuestFieldForm"));

const FormField = () => {
  const [tab, setTab] = useState("form-field");

  return (
    <>
    <MainContentGrid className="sm:hidden md:flex">
      <PageTitleContainer title="Form Fields" />
      <div className="sm:flex md:hidden py-4 bg-[white] px-4 font-semibold min-w-[100vw] items-center gap-4">
        <button
          onClick={() => setTab("form-field")}
          className={clsx(
            "text-[#7655fa] ",
            tab === "form-field" && "border-b-[2px] border-[#7655fa] "
          )}
        >
          Form field
        </button>
        <button
          onClick={() => setTab("application-fee")}
          className={clsx(
            "text-[#7655fa] ",
            tab === "application-fee" && "border-b-[2px] border-[#7655fa] "
          )}
        >
          {" "}
          Application fee
        </button>
        <button
          onClick={() => setTab("guest-field")}
          className={clsx(
            "text-[#7655fa] ",
            tab === "guest-field" && "border-b-[2px] border-[#7655fa] "
          )}
        >
          {" "}
          Guest field
        </button>
      </div>
      {/* Web Template */}
      <div className="sm:hidden md:flex justify-between gap-4">
        <FormFieldForm />
        <div className="flex-1 flex flex-col gap-4">
          <ApplicationFeeForm />
          <GuestFieldForm />
        </div>
      </div>
    </MainContentGrid>
      {/* Mobile Template */}
      <div className="sm:block md:hidden  ">
      <PageTitleContainer title="Form Fields"  className="sm:min-w-auto  md:min-w-[80vw] md:max-w-[100%]"/>
      <div className="sm:flex md:hidden py-4 bg-[white] px-4 font-semibold min-w-[100vw] items-center gap-4">
        <button
          onClick={() => setTab("form-field")}
          className={clsx(
            "text-[#7655fa] ",
            tab === "form-field" && "border-b-[2px] border-[#7655fa] "
          )}
        >
          Form field
        </button>
        <button
          onClick={() => setTab("application-fee")}
          className={clsx(
            "text-[#7655fa] ",
            tab === "application-fee" && "border-b-[2px] border-[#7655fa] "
          )}
        >
          {" "}
          Application fee
        </button>
        <button
          onClick={() => setTab("guest-field")}
          className={clsx(
            "text-[#7655fa] ",
            tab === "guest-field" && "border-b-[2px] border-[#7655fa] "
          )}
        >
          {" "}
          Guest field
        </button>
      </div>
        {tab === "form-field" && <FormFieldForm />}
        {tab === "application-fee" && <ApplicationFeeForm />}
        {tab === "guest-field" && <GuestFieldForm />}
      </div>
  
    </>
  );
};

export default FormField;
