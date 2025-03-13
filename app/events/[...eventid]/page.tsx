"use client";
import CompanyFooter from "@/components/CompanyFooter";
import CompanyHeader from "@/components/CompanyHeader";
import MainContentGrid from "@/components/MainContentGrid";
import PageTitleContainer from "@/components/PageTitleContainer";
import RegisterForEventForm1 from "@/components/RegisterForEventForm1";
import RegisterForEventForm2 from "@/components/RegisterForEventForm2";
import { Companies, EventReg } from "@/configs/apiRoutes";
import { stripePromise } from "@/configs/stripeLoader";
import { Elements } from "@stripe/react-stripe-js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Metadata } from "next/types";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import HashLoader from "react-spinners/HashLoader";
import { toast } from "react-toastify";

const RegisterEvent = () => {
  const params = useParams();
  const { data } = useQuery({
    queryKey: ["company-events"],
    queryFn: () =>
      Companies.getCompaniesEvents((params.eventid[0] as string) || ""),
  });

  const {t} = useTranslation(["translation"])
  const [isLoadingState, setIsLoading] = useState(false);
  console.log("api data", data);
  const events = data?.data.data.events.events;
  const companies = data?.data.data.events?.company;
  console.log("send params", params);
  const { data: event, isLoading } = useQuery({
    queryKey: ["single-event"],
    queryFn: () => EventReg.singleEvent(params.eventid[0], params.eventid[1]),
  });

  console.log("required event 123", event);
  const singleEvent = event?.data.data;

  // const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const methods = useForm({
    defaultValues: {
      donation_field: "0",
      other_donation: 0,
      platformFee: "",
      allowPlateformFee: false,
      guests: [],
      totalAmount: "00.00",
      accept_cash_terms: false,
      paymentMethod: "cash", //fpr stripe PM we must need stripeToken param as well
    },
  });
  const { handleSubmit, control, reset, getValues } = methods;

  const mutate = useMutation({
    mutationFn: (formData) =>
      EventReg.eventRegistration(
        params.eventid[0],
        params.eventid[1],
        formData
      ),
    onSuccess: () => {
      setIsLoading(false);
      toast("Event Registration Successful", { type: "success" });
      window.location.replace(`/companies/${singleEvent?.company}`);
    },
    onError: (error) => {
      setIsLoading(false);
      if ((error as any).status !== 200) {
        Object.values((error as any)?.response?.data.data ?? {}).forEach(
          (el: any) => {
            el.forEach((el: any) => {
              toast(el, { type: "error" });
            });
          }
        );
        toast((error as any)?.response?.data.message, { type: "error" });
      }
    },
  });

  const watch = useWatch({ control });
  useEffect(() => {
    reset({
      ...getValues(),
      allowPlateformFee:
        singleEvent?.settings.is_default_app_fee === "1" ? true : false,
    });
  }, [getValues, reset, singleEvent?.settings.is_default_app_fee]);

  const platformFee = (data: any) => {
    const totalfee =
      parseFloat(data.totalAmount) +
      parseFloat(data.other_donation) +
      parseFloat(data.donation_field);
    const plateFormFee =
      (totalfee * parseFloat(singleEvent?.settings.plateform_fee)) / 100;
    if (watch.allowPlateformFee) {
      const finalFee = totalfee + plateFormFee;
      data.totalAmount = finalFee;
      return data;
    } else {
      data.totalAmount = totalfee;
      return data;
    }
  };
  const onSubmit = (formData123: any) => {
    setIsLoading(true);
    const payload = platformFee(formData123);
    mutate.mutate(payload);
  };

  return (
    <>
      <CompanyHeader data={companies} />
      <MainContentGrid className="md:translate-y-[-10%] min-h-screen">
        {/* <PageTitleContainer title='Register Event'/> */}
        <FormProvider {...methods}>
          <Elements stripe={stripePromise}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex justify-between lg:gap-4 flex-wrap md:mx-11"
            >
              {singleEvent && (
                <>
                  {" "}
                  <RegisterForEventForm1
                    data={singleEvent}
                    company={companies}
                  />
                  <RegisterForEventForm2
                    isLoading={isLoadingState}
                    data={singleEvent}
                  />
                </>
              )}
              {(isLoading || !events) && (
                <div className="flex min-h-screen gap-4 mx-auto sm:col-span-1 md:col-span-1 lg:col-span-3 w-full items-center justify-center ">
                  <HashLoader
                    color={"#7655fa"}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />

                  <p className="text-xl font-semibold text-[#4a4a4a]">
                    {t("Loading...")}
                  </p>
                </div>
              )}
            </form>
          </Elements>
        </FormProvider>
      </MainContentGrid>
      <CompanyFooter />
    </>
  );
};

export default RegisterEvent;
