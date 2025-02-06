"use client";
import autoConfigSteps from "@/configs/autoConfigs";
import { current } from "@reduxjs/toolkit";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const FormStepperButtons = ({
  currentStep,
  handleStepInc,
  handleStepDec,
}: {
  errors?: any;
  currentStep: number;
  handleStepInc: (e: React.MouseEvent) => void;
  handleStepDec: (e: React.MouseEvent) => void;
}) => {
  const {
    formState: { errors },
    trigger,
    clearErrors
  } = useFormContext();

  const {t} = useTranslation(["translation"])
  const handleValidation = (e: any) => {
    e.preventDefault();
   
    if (
      currentStep === 0 &&
      !errors?.event_description &&
      !errors?.title &&
      !errors?.start_date &&
      !errors?.end_date
    ) {
      handleStepInc(e);
    }
    if (currentStep === 1 && !errors?.tickets) {
      handleStepInc(e);
    }
    if (currentStep === 2 && !errors?.sub_events) {
      handleStepInc(e);
    }
    if (currentStep === 3 && !errors?.advance) {
      handleStepInc(e);
    }
  };
  return (
    <span className="flex gap-6 my-6 justify-end items-center">
      {currentStep > 0 && (
        <button
          onClick={handleStepDec}
          className="flex active:scale-[0.95] transition-all justify-between select-none items-center gap-2 "
        >
          <ChevronLeft size={15} />
          <span>{t("Previous")}</span>
        </button>
      )}
      {currentStep + 1 !== autoConfigSteps.length && (
        <button
          onClick={async (e) => {
           const result =  await trigger()
           console.log("trigger result",result)
           if(result)
           {
            
            handleStepInc(e);
           }
           
            // handleValidation(e);
          }}
          className="bg-[#7655FA] active:scale-[0.95] transition-all text-white mx-4 px-7 py-2 rounded-full"
        >
          {t("Continue")}
        </button>
      )}
      {currentStep + 1 === autoConfigSteps.length && (
        <button
          type="submit"
          className="bg-[#7655FA] active:scale-[0.95] transition-all mx-4 select-none text-white px-7 py-2 rounded-full"
        >
          {t("Submit")}
        </button>
      )}
    </span>
  );
};
