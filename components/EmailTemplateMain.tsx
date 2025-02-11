"use client";
import React from "react";
import EmailTemplateItem from "./EmailTemplateItem";
import { access } from "fs";
import { useQuery } from "@tanstack/react-query";
import { EmailTempApi } from "@/configs/apiRoutes";
import clsx from "clsx";

const template = {
  thankYou: {
    heading: "Signup Template",
    body: "This email will be send to customers on registrations.",
    image: "/thankyou.svg",

  },
  access: {
    heading: "Access Verfication",
    body: "This email will be send to customers on registrations.",
    image: "/business.svg",

  },
  completion: {
    heading: "Event Completion",
    body: "This email will be send to customers on registrations.",
    image: "/thankyou.svg",
    
  },
  registration: {
    heading: "Registration Confirmation",
    body: "This email will be send to customers on registrations.",
    image: "/business.svg",
   
  },
};
let user = null;
if (typeof window !== undefined) {
  user = JSON.parse(window.localStorage.getItem("user") || ({} as any));
}
const EmailTemplateMain = () => {

  const {data, isLoading} = useQuery({queryKey: ["email_templates"], queryFn: EmailTempApi.get})
  return (
    <div className={clsx("grid sm:grid-cols-1  justify-items-center ", 
      user.role === "company" &&  "md:grid-cols-2 justify-items-stretch",
      user.role === "admin" &&  "md:grid-cols-3 justify-items-stretch"

    )}>

      
      {user.role === "admin" && (
        !isLoading && <>
          <EmailTemplateItem data={data?.data.data.find((e:any)=> e.type.includes("signup"))} {...template.thankYou} />
          <EmailTemplateItem data={data?.data.data.find((e:any)=> e.type.includes("approved_company"))} {...template.access} />
        </>
      )}
      {!isLoading && <>
      
          <EmailTemplateItem data={data?.data.data.find((e:any)=> e.type.includes("thankyou"))} {...template.completion} />
          <EmailTemplateItem data={data?.data.data.find((e:any)=> e.type.includes("confirmation"))} {...template.registration} />
      </>}

    
    </div>
  );
};

export default EmailTemplateMain;
