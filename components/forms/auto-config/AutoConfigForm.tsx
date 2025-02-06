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

import {
  useForm,
  SubmitHandler,
  FormProvider,
  useWatch,
} from "react-hook-form";

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
import {
  autoConfigPostStruct,
  addNewEventPostStruct,
} from "@/configs/autoConfigPost";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { AutoFormAPI, Events } from "@/configs/apiRoutes";
import { toast } from "react-toastify";
import {
  addEventSchema,
  autoConfigSchema,
  autoFormDefaults,
  autoFormType,
} from "@/configs/autoFormValidation";
import { joiResolver } from "@hookform/resolvers/joi";
import { queryClient } from "@/components/MainLayoutGrid";
import { useTranslation } from "react-i18next";

const defaultValues = {
  tickets: [
    {
      title: "Men",
    },
  ],
  advance: {
    is_attendees_required: "1",
    is_show_address: "1",
    is_cash_allowed: "1",
    is_donation_allowed: "1",
    is_show_regulation: "1",
    renew_advance_fields: "0",
    is_show_stripe: "1",
  },
};
const AutoConfigForm = ({ data, type }: {data?:any, type: string }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [errors, setErrors] = useState<string[]>([]);
  const deferStep = useDeferredValue(currentStep);
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams()

  const methods = useForm<autoFormType>({
    resolver: (values, context, options) => {
      const resolver = joiResolver(
        (pathname.includes("add-event") || pathname.includes("my-events/edit") || pathname.includes("/use-auto"))  ? addEventSchema : autoConfigSchema,
        {
          context: context,
          abortEarly: false,
          allowUnknown: true,
        }
      );
      return resolver(values, context, options);
    },
    defaultValues: data ? data : autoFormDefaults,
  });

  const {
    control,
    register,
    handleSubmit,
    trigger,
    formState: { errors: formErrors },
  } = methods;

  console.log("formErrors", formErrors);
  const watch = useWatch({ control });
  console.log("autoconfig watch", watch);

  

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
    onSuccess: () => {
      toast("AutoConfig Saved Successfully...", {
        type: "success",
      });
      window.location.replace("/dashboard/my-events")
    },
    onError: () => {
      toast("AutoConfig Not Saved...", {
        type: "error",
      });
    },
  });
  const mutateAutoFormCreateEvent = useMutation({
    mutationFn: async (formData)=> AutoFormAPI.createEventAutoConfig(params.eventid as any, formData),
    onSuccess: () => {
      toast("AutoEvent Created Successfully...", {
        type: "success",
      });
      router.replace("/dashboard/my-events")
    },
    onError: () => {
      toast("AutoEvent Creation Failed...", {
        type: "error",
      });
    },
  });
  const mutateEditEvent = useMutation({
    mutationFn: async (formData)=> Events.editEvent(params.eventid, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["my-events"]})
      toast("Changes Saved Successfully...", {
        type: "success",
      });
      router.replace("/dashboard/my-events")
    },
    onError: () => {
      toast("Changes Not Saved...", {
        type: "error",
      });
    },
  });

  const mutateEvent = useMutation({
    mutationFn: Events.createEvent,
    onSuccess: () => {
      toast("Event Saved Successfully...", {
        type: "success",
      });
      router.replace("/dashboard/my-events")
    },
    onError: () => {
      toast("Event Not Saved...", {
        type: "error",
      });
    },
  });

  const onSubmit: SubmitHandler<autoFormType> = (data: any, e) => {
    e?.preventDefault();
    if (Object.keys(errors).length <= 0) {
      if (pathname.includes("add-event")) {
        console.log("add event triggerd");
        
        mutateEvent.mutate(data);
      }
      if (pathname.includes("auto-config")) {
        
        
        mutateAutoConfig.mutate(data);
      }
      if (pathname.includes("/my-events/edit")) {
        
        
        mutateEditEvent.mutate(data);
      }
      if(pathname.includes("/use-auto"))
      {
       
        mutateAutoFormCreateEvent.mutate(data)
      }
      
    }

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

  const {t} = useTranslation(["translation"])
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
                title={t("General Information")}
                currentStep={currentStep + 1}
                totalSteps={autoConfigSteps.length}
              />
              <GeneralInfoInput errors={errors} />
            </>
          )}

          {deferStep === 1 && (
            <>
              <FormHeader
                title={t("Ticket Types")}
                currentStep={currentStep + 1}
                totalSteps={autoConfigSteps.length}
              />
              <TicketTypes errors={errors as any} />
            </>
          )}

          {deferStep === 2 && (
            <>
              <FormHeader
                title={t("Sub Events")}
                currentStep={currentStep + 1}
                totalSteps={autoConfigSteps.length}
              />
              <SubEventInput errors={errors} />
            </>
          )}

          {deferStep === 3 && (
            <>
              <FormHeader
                title={t("Advance Form Settings")}
                currentStep={currentStep + 1}
                totalSteps={autoConfigSteps.length}
              />
              <AdvanceForm />
            </>
          )}

          {deferStep === 4 && (
            <>
              <FormHeader
                title={t("Activities")}
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
