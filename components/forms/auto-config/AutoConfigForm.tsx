"use client";
import React, { useState, useDeferredValue, useId } from "react";
import autoConfigSteps from "@/configs/autoConfigs";
import clsx from "clsx";

import { useForm, SubmitHandler } from "react-hook-form";

import { FormHeader } from "./FormHeader";

import { FormStepperButtons } from "./FormStepperButtons";

import { TicketTypes } from "./TicketTypeFormAdmin";
import { GeneralInfoInput } from "./GenInputForm";
import { SubEventInput } from "./SubEventInputForm";
import AdvanceForm from "./AdvanceForm";

export interface IAutoConfig {
  gen_info: {
    event_name: string;
    start_date: Date;
    end_date: Date;
    event_desc: string;
  };
  tickets: { ticket: string }[];
  sub_events: {
    name: string;
    start_time: Date;
    end_time: Date;
    date: Date;
    active: boolean;
  }[];
  advance_form:{
    show_address:boolean;
    cash_payment:boolean;
    show_regulations:boolean;
    show_stripe:boolean;
  }
}
const AutoConfigForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const deferStep = useDeferredValue(currentStep);

  const id = useId();
  const autoConfigDefaultValues = {
    defaultValues: {
      tickets: [
        {
          ticket: "Male",
        },
      ],
      sub_events: [
        {
          name: "Sub Event",
          start_time: new Date(),
          end_time: new Date(),
          date: new Date(),
          active: true,
        },
      ],
      advance_form:{
        show_address:false,
        cash_payment:false,
        show_regulations:false,
        show_stripe:false,
      }
    },
  }
  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IAutoConfig>(autoConfigDefaultValues);

  console.log(getValues("sub_events.0.name"));
  const handleStepInc = (e: React.MouseEvent) => {
    e.preventDefault();
    if (deferStep < autoConfigSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleStepDec = (e: React.MouseEvent) => {
    e.preventDefault();
    if (deferStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit: SubmitHandler<IAutoConfig> = (data, e) => {
    e?.preventDefault();

    console.log(data);
  };
  return (
    <div className="flex gap-5   container p-0">
      <div className="bg-[white] py-6 min-w-[300px] flex flex-col gap-4 max-w-[45%] w-[35%] min-h-[400px] rounded-md container">
        {autoConfigSteps.map((el, index) => (
          <div
            className="inline-flex items-center text-nowrap    gap-4"
            key={el.title}
          >
            <span
              className={clsx(
                "rounded-full border-[2px] p-1  text-[#4a4a4a] mix-blend-multiply",
                currentStep > index && "bg-[#7655FA]   text-white",
                currentStep < index && "  border-[#4a4a4a] ",
                currentStep === index && "text-[#7655FA] border-[#7655FA]"
              )}
            >
              <el.icon size={10} absoluteStrokeWidth={true} />
            </span>
            <span className="flex flex-col ">
              <p
                className={clsx(
                  "flex-1 text-[#4a4a4a] font-semibold",
                  currentStep === index && "text-[#7655FA] border-[#7655FA]"
                )}
              >
                {el.title}
              </p>
              <p className="flex-1 text-[#4a4a4a] text-sm">{el.description}</p>
            </span>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[white] container p-4 rounded-md"
      >
        {deferStep === 0 && (
          <>
            <FormHeader
              title="General Information"
              currentStep={currentStep + 1}
              totalSteps={autoConfigSteps.length}
            />
            <GeneralInfoInput
              register={register as any}
              control={control}
              id={id}
              errors={errors as any}
            />
          </>
        )}

        {deferStep === 1 && (
          <>
            <FormHeader
              title="Ticket Types"
              currentStep={currentStep + 1}
              totalSteps={autoConfigSteps.length}
            />
            <TicketTypes
              register={register as any}
              control={control}
              errors={errors as any}
            />
          </>
        )}

        {deferStep === 2 && (
          <>
            <FormHeader
              title="Sub Events"
              currentStep={currentStep + 1}
              totalSteps={autoConfigSteps.length}
            />
            <SubEventInput control={control} />
          </>
        )}

        {deferStep === 3 && (
          <>
            <FormHeader
              title="Advance Form Settings"
              currentStep={currentStep + 1}
              totalSteps={autoConfigSteps.length}
            />
            <AdvanceForm control={control}/>
          </>
        )}
        <FormStepperButtons
          currentStep={currentStep}
          handleStepDec={handleStepDec}
          handleStepInc={handleStepInc}
        />
      </form>
    </div>
  );
};

export default AutoConfigForm;
