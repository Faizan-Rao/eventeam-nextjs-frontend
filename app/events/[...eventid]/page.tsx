"use client";
import CompanyFooter from "@/components/CompanyFooter";
import CompanyHeader from "@/components/CompanyHeader";
import MainContentGrid from "@/components/MainContentGrid";
import PageTitleContainer from "@/components/PageTitleContainer";
import RegisterForEventForm1 from "@/components/RegisterForEventForm1";
import RegisterForEventForm2 from "@/components/RegisterForEventForm2";
import { Companies, EventReg } from "@/configs/apiRoutes";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
const formDefaultValue = {
  "donation_field": "0",
  "other_donation": 0,
  "platformFee": "",
  "guests": [
     
      
  ],
  "totalAmount": "00.00",
  "accept_cash_terms": false,
  "paymentMethod": "cash" //fpr stripe PM we must need stripeToken param as well
}
const RegisterEvent = () => {
  const params = useParams();
  const { data } = useQuery({
    queryKey: ["company-events"],
    queryFn: () =>
      Companies.getCompaniesEvents((params.companyId as string) || ""),
  });
  const events = data?.data.data.events.events;
  const companies = data?.data.data.events?.company;

  const { data: event } = useQuery({
    queryKey: ["single-event"],
    queryFn: () => EventReg.singleEvent(params.eventid[0], params.eventid[1]),
  });

  console.log(event);
  const singleEvent = event?.data.data;
  // const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const methods = useForm({
    defaultValues : formDefaultValue,
    reValidateMode: "onChange",
    
  });
  const { handleSubmit } = methods;
  const onSubmit = (data: any) => console.log(data);
  return (
    <>
      <CompanyHeader data={companies} />
      <MainContentGrid className="md:translate-y-[-15%]">
        {/* <PageTitleContainer title='Register Event'/> */}
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex justify-between lg:gap-4 flex-wrap"
          >
            {singleEvent && (
              <>
                {" "}
                <RegisterForEventForm1 data={singleEvent} />
                <RegisterForEventForm2 data={singleEvent} />
              </>
            )}
          </form>
        </FormProvider>
      </MainContentGrid>
      <CompanyFooter />
    </>
  );
};

export default RegisterEvent;
