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
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["email_templates"] });
      toast.error("Updated Failed...");
    },
  });
  return (
    <div
      className={clsx(
        "flex justify-center max-h-[40%] flex-col sm:justify-center items-center h-full min-w-[300px] max-w-[50%] min-h-[500px] rounded-2xl flex-1 p-4 text-center gap-4 m-4",
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
          {data && data.status === "1" ? "Active" : "Disable"}
        </p>
        {data && (
          <Switch
            checked={data.status === "1" ? true : false}
            onCheckedChange={(value: any) => {
              mutate.mutate({
                id: data.id,
                status: value ? 1 : 0,
              });
            }}
          />
        )}
      </div>
      <h4 className="text-3xl font-semibold">{heading}</h4>
      <p className="text-lg ">{body}</p>
      <Link
        className="bg-[#7655fa] rounded-full text-white px-5 py-2"
        href={`/dashboard/email-template/${data && data.type}`}
      >
        {" "}
        Edit {heading}{" "}
      </Link>
    </div>
  );
};

export default EmailTemplateItem;
