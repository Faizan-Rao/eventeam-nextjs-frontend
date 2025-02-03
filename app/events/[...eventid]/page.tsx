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
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const formDefaultValue = {
  donation_field: "0",
  other_donation: 0,
  platformFee: "",
  guests: [],
  totalAmount: "00.00",
  accept_cash_terms: false,
  paymentMethod: "cash", //fpr stripe PM we must need stripeToken param as well
};
const RegisterEvent = () => {
  const params = useParams();
  const { data } = useQuery({
    queryKey: ["company-events"],
    queryFn: () =>
      Companies.getCompaniesEvents((params.eventid[0] as string) || ""),
  });
  
  console.log("api data",data)
  const events = data?.data.data.events.events;
  const companies = data?.data.data.events?.company;
  console.log("send params",params);
  const { data: event } = useQuery({
    queryKey: ["single-event"],
    queryFn: () => EventReg.singleEvent(params.eventid[0], params.eventid[1]),
  });

  console.log("required event 123",event);
  const singleEvent = event?.data.data;
  // const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const methods = useForm({
    defaultValues: formDefaultValue,
  });
  const { handleSubmit } = methods;
  const mutate = useMutation({
    mutationFn: (formData) =>
      EventReg.eventRegistration( params.eventid[0], params.eventid[1], formData),
    onSuccess: () => {
      toast("Event Registration Successful", { type: "success" });
      window.location.replace(`/companies/${singleEvent?.company}`);
    },
    onError: (error) => {
      if ((error as any).status !== 200) {
              Object.values((error as any)?.response?.data.data ?? {}).forEach(
                (el: any) => {
                  el.forEach((el: any) => {
                    toast(el, { type: "error" });
                  });
                }
              );
            }
    },
  });
  const onSubmit = (formData123: any) =>{
    console.log("send formdata", formData123)
    mutate.mutate(formData123)
  };

  return (
    <>
     <CompanyHeader data={companies} />
      <MainContentGrid className="md:translate-y-[-15%]">
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
                  <RegisterForEventForm1 data={singleEvent} />
                  <RegisterForEventForm2 data={singleEvent} />
                </>
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
