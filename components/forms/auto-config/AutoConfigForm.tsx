"use client";
import React, {
  useState,
  useDeferredValue,
  useId,
  use,
  useMemo,
  useEffect,
} from "react";
import autoConfigSteps from "@/configs/autoConfigs";
import clsx from "clsx";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";

import { FormHeader } from "./FormHeader";

import { FormStepperButtons } from "./FormStepperButtons";

import { TicketTypes } from "./TicketTypeFormAdmin";
import { GeneralInfoInput } from "./GenInputForm";
import { SubEventInput } from "./SubEventInputForm";
import AdvanceForm from "./AdvanceForm";
import StepperSection from "./StepperSection";
import PrayerTimeForm from "./PrayerTimeForm";
import { useDispatch } from "react-redux";
import { addAutoConfig, selectAutoConfig } from "@/slices/autoConfigSlice";

export interface IAutoConfig {
  gen_info: {
    event_name: string;
    start_date: Date;
    end_date: Date;
    event_desc: string;
    status?: string;
    active?: boolean;
    registrations?: string;
  };
  tickets: { ticket: string }[];
  sub_events: {
    name: string;
    start_time: string;
    description?: string;
    date: Date;
    active: boolean;
    ticket_type: {
      name: string;
      price: string;
    }[];
    address?: string;
    max_capcity?: string;
  }[];
  advance_form: {
    show_address: boolean;
    cash_payment: boolean;
    show_regulations: boolean;
    show_stripe: boolean;
  };
  prayer: any
  // prayer_time: {
  //   one_prayer: {
  //     title: string;
  //     time_type: string;
  //     before_time: number;
  //     after_time: number;
  //     before_candle: number;
  //     after_candle: number;
  //     fixed_time: string;
  //     status: boolean;
  //   }[];
  //   two_prayer: {
  //     title: string;
  //     time_type: string;
  //     before_time: number;
  //     after_time: number;
  //     fixed_time: string;
  //     status: boolean;
  //   }[];
  // };

  prayer_time?: any
}

const defaultValues = {
  tickets: [
    {
      ticket: "Men",
    },
  ],
  advance_form: {
    show_address: false,
    cash_payment: false,
    show_regulations: false,
    show_stripe: false,
  },

  prayer_time: {},
};
const AutoConfigForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const deferStep = useDeferredValue(currentStep);

  const id = useId();

  const methods = useForm<IAutoConfig>({
    mode:"onChange",
    reValidateMode:"onChange",
    defaultValues: defaultValues,
  });
  const dispatch = useDispatch();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

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
    const payload = { ...data };
    (payload.gen_info.active = false),
    (payload.gen_info.registrations = "0"),
    (payload.gen_info.status = "Pending Approval"),
    // dispatch(addAutoConfig(payload));
    console.log(payload)
  };
  return (
    <FormProvider {...methods}>
      <div className="flex gap-5   container p-0">
        <div className="sm:hidden md:block">
          <StepperSection currentStep={currentStep} />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[white] md:container p-4 rounded-md"
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
              <AdvanceForm control={control} />
            </>
          )}

          {deferStep === 4 && (
            <>
              <FormHeader
                title="Prayer Time"
                currentStep={currentStep + 1}
                totalSteps={autoConfigSteps.length}
              />
              <PrayerTimeForm control={control} register={register} />
            </>
          )}
          <FormStepperButtons
            currentStep={currentStep}
            handleStepDec={handleStepDec}
            handleStepInc={handleStepInc}
          />
        </form>
      </div>
    </FormProvider>
  );
};

export default AutoConfigForm;
