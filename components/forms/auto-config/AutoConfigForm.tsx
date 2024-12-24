"use client";
import React, {
  useState,
  useDeferredValue,
  useId,
  use,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import autoConfigSteps from "@/configs/autoConfigs";
import clsx from "clsx";

import { useForm, SubmitHandler, FormProvider, useWatch} from "react-hook-form";

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
import { autoConfigPostStruct, addNewEventPostStruct } from "@/configs/autoConfigPost";
import { usePathname } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { AutoFormAPI, Events } from "@/configs/apiRoutes";
import { toast } from "react-toastify";
import { autoForm, autoFormDefaults, autoFormType,  } from "@/configs/autoFormValidation";
import {joiResolver} from "@hookform/resolvers/joi"
// export interface IAutoConfig {
//   gen_info: {
//     event_name: string;
//     start_date: Date;
//     end_date: Date;
//     event_desc: string;
//     status?: string;
//     active?: boolean;
//     registrations?: string;
//   };
//   tickets: { ticket: string }[];
//   sub_events: {
//     name: string;
//     start_time: string;
//     description?: string;
//     date: Date;
//     active: boolean;
//     ticket_type: {
//       name: string;
//       price: string;
//     }[];
//     address?: string;
//     max_capcity?: string;
//   }[];
//   advance_form: {
//     show_address: boolean;
//     cash_payment: boolean;
//     show_regulations: boolean;
//     show_stripe: boolean;
//     show_donation:boolean
//     donations: {
//       is_enable_donation: boolean,
//       other_donations: any[]
//     };
//   };
//   prayer: any;

//   prayer_time?: any;
// }

const defaultValues = {
  tickets: [
    {
      "title": "Men",
    },
  ],
  // advance_form: {
  //   show_address: false,
  //   cash_payment: false,
  //   show_regulations: false,
  //   show_stripe: false,
  // },

  // prayer_time: {
  //   calculate_via_api: "1",
  // },
};
const AutoConfigForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [errors, setErrors] = useState<string[]>([])
  const deferStep = useDeferredValue(currentStep);

  

  const methods = useForm<autoFormType>({
   
    resolver: (values, context, options) => {
      const resolver = joiResolver<typeof autoForm>(autoForm, {context: context, abortEarly:false, allowUnknown:true})
      return resolver(values, context, options)
    },
   defaultValues: autoFormDefaults
  
  });
  
  const {
    control,
    register,
    handleSubmit,
    trigger,
   formState: {errors:formErrors}
  } = methods;
  
  console.log("formErrors",formErrors)
  const watch = useWatch({control})
  console.log(watch)

  useEffect(()=>{trigger()},[trigger, watch])

  // const handleErrors = useCallback(() =>{
  //   const validationError = autoFormValidation(watch)
  //   setErrors(validationError || [])
  // }, [watch])

  // useEffect(()=>handleErrors(), [handleErrors, watch])

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

  const mutateAutoConfig = useMutation({
    mutationFn: AutoFormAPI.createAutoConfig,
    onSuccess : ()=>{
      toast("AutoConfig Saved Successfully...", {
        type:"success"
      })
    },
    onError : ()=>{
      toast("AutoConfig Not Saved...", {
        type:"error"
      })
    }
  })

  const mutateEvent = useMutation({
    mutationFn: Events.createEvent,
    onSuccess : ()=>{
      toast("Event Saved Successfully...", {
        type:"success"
      })
    },
    onError : ()=>{
      toast("Event Not Saved...", {
        type:"error"
      })
    }
  })
  const pathname = usePathname()
  const onSubmit: SubmitHandler<autoFormType> = (data, e) => {
    e?.preventDefault();
    console.log("submitted")
    
      // if (!data) {
      //   throw new Error("Data Not Present");
      // }

      // if(pathname.includes("auto-config"))
      // {
      //   let payload = autoConfigPostStruct(data);
      //   console.log("autoconfig Payload",payload)
      //   mutateAutoConfig.mutate(payload)
      // }
      // else
      // {
      //   let payload = addNewEventPostStruct(data);
      //   console.log("add new event payload",payload)
      //   mutateEvent.mutate(payload)
      // }
      
  };
  return (
    <FormProvider {...methods}>
      <div className="flex sm:flex-col md:flex-row  gap-5    p-0">
        <div className=" sm:hidden md:block ">
          <StepperSection currentStep={currentStep} />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit as any)}
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
               errors={errors}
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
              <SubEventInput errors={errors} />
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
          errors={errors}
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
