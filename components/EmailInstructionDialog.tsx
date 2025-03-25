"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useTranslation } from "react-i18next";
import { Info } from "lucide-react";
import { user } from "@/configs/axios";
import { EmailTempApi } from "@/configs/apiRoutes";
import { useQuery } from "@tanstack/react-query";

const EmailInstructionDialog = () => {
  const { t } = useTranslation(["translation"]);
  const { data } = useQuery({
    queryKey: ["email-instructions"],
    queryFn: () => EmailTempApi.getInstruction(user.role),
  });
  const variables = data?.data?.data?.variables;
  const keys = Object.keys(variables || {});
  const values = Object.values(variables || {});
  return (
    <Dialog>
      <DialogTrigger>
        <Info size={18} className="text-[#7655fa]" strokeWidth={1.4} />
      </DialogTrigger>
      <DialogContent >
        <DialogHeader className="max-h-[600px] overflow-h-auto">
          <DialogTitle className="my-3 text-2xl">{t("Instructions")}</DialogTitle>
          <DialogDescription className="max-h-[600px] overflow-y-auto">
            <p className="text-[#4a4a4a] text-sm leading-loose capitalize"> <span className="font-bold">{t("Note :")}</span> {t("Place the relavant placeholders in email template for dynamic information.")}</p>
            {variables &&
              keys.map((el: any, index: number) => (
                <div
                  className="grid grid-cols-3 gap-8 my-4 -z-10 "
                  key={el.id}
                >
                  <span className="font-semibold text-[#4a4a4a]">{el}</span> <span className="text-center">{"-------->"}</span>
                  <span className="text-[#4a4a4a] capitalize"> {(values as any)?.[index]}</span>
                 
                </div>
              ))}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EmailInstructionDialog;
