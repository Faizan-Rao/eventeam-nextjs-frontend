"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Switch } from "./ui/switch";
import Link from "next/link";
import clsx from "clsx";
import { useMutation } from "@tanstack/react-query";
import { EmailTempApi } from "@/configs/apiRoutes";
import { queryClient } from "./MainLayoutGrid";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { AxiosError } from "axios";

interface Option {
  heading: string;
  body: string;
  image: string;

  data: any;
}
const EmailTemplateItem: React.FC<Option> = ({
  heading,
  body,
  image = "",

  data,
}) => {
  const mutate = useMutation({
    mutationFn: EmailTempApi.updateStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["email_templates"] });
      toast.info("Updated Successfully...");
      
    },
    onError: (error) => {
      if ((error as AxiosError).status !== 200) {
        Object.values((error as any)?.response?.data.data ?? {}).forEach(
          (el: any) => {
            el.forEach((el: any) => {
              toast(el, { type: "error" });
            });
          }
        );
      }
    if((error as AxiosError).status !== 200){
      toast((error as any)?.response?.data.message, { type: "error" })
    }
    },
  });
  const {t} = useTranslation(["translation"])
  return (
    <div
      className={clsx(
        "flex justify-center max-h-[40%] flex-col sm:justify-center items-center p-6 h-full min-w-[300px]  min-h-[500px] rounded-2xl flex-1  text-center gap-4 m-4",
        heading === "Signup Template" && "bg-[#FFCEED]",
        heading === "Access Verfication" && "bg-[#DBE1FF]",
        heading === "Event Completion" && "bg-[#DAC7EF]",
        heading === "Registration Confirmation" && "bg-[#B8DADB]"
      )}
    >
      <Image
        src={`${image}`}
        className="aspect-square h-[200px] w-auto"
        height={400}
        width={400}
        alt="template-logo"
      />
      <div className="flex gap-2">
        <p className={clsx(data && data.status !== "1" && "text-red-700")}>
          {data && data.status === "1" ? t("Active") : t("Disable")}
        </p>
       
        <Switch
        dir="ltr"
          checked={data?.status === "1" ? true : false}
          onCheckedChange={(value: any) => {
            mutate.mutate({
              id: data?.id,
              status: value ? 1 : 0,
            });
          }}
        />
       
      </div>
      <h4 className="text-3xl font-semibold">{t(heading)}</h4>
      <p className="text-base ">{t(body)}</p>
      <Link
        className="bg-[#7655fa] active:scale-[0.95] transition-all rounded-full text-white px-5 py-2"
        href={`/dashboard/email-template/${data && data.type}`}
      >
        {" "}
        {t("Edit")} {t(heading)}{" "}
      </Link>
    </div>
  );
};

export default EmailTemplateItem;
