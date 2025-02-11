import React, { useState } from "react";
import joi from "joi";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Profile } from "@/configs/apiRoutes";
import { queryClient } from "@/components/MainLayoutGrid";
import { toast } from "react-toastify";
import { set } from "lodash";
import { useTranslation } from "react-i18next";

export const editEmailSettingSchema = joi.object({
  mail_from_name: joi.string().max(30).label("From Name"),
  mail_from_address: joi
    .string()
    .email({ tlds: { allow: false } })
    .max(30)
    .label("From Address"),
  mail_mailer: joi.string().max(30).label("Mailer"),
  mail_host: joi.string().max(30).label("Host"),
  mail_port: joi.string().max(4).label("Port"),
  mail_username: joi.string().max(30).label("Username"),
  mail_password: joi.string().max(15).label("Password"),
  mail_encryption: joi.string().max(10).label("Encryption"),
});
const EditEmailSettings = ({ emailSettings }: { emailSettings: any }) => {
const [isShow, setIsShow] = useState("password")
const handleIsShow = (e : any)=>{
  e.preventDefault()
  if(isShow === "password")
    setIsShow("text")
  else
  setIsShow("password")
}

  const mutate = useMutation({
    mutationKey: ["update-email"],
    mutationFn: async (data: any) => {
      return await Profile.updateEmailSettings(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["email-settings-platform"] });
      toast("Email Settings Updated...", {
        type: "info",
      });
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

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      mail_from_name: emailSettings?.data.data?.email_settings?.mail_from_name,
      mail_mailer: emailSettings?.data.data?.email_settings?.mail_mailer,
      mail_from_address:
        emailSettings?.data.data?.email_settings?.mail_from_address,
      mail_host: emailSettings?.data.data?.email_settings?.mail_host,
      mail_port: emailSettings?.data.data?.email_settings?.mail_port,
      mail_username: emailSettings?.data.data?.email_settings?.mail_username,
      mail_password: emailSettings?.data.data?.email_settings?.mail_password,
      mail_encryption: emailSettings?.data.data?.email_settings?.mail_encryption,
    },
    resolver: (values, constext, options) => {
      const resolver = joiResolver(editEmailSettingSchema, {
        abortEarly: false,
      });
      return resolver(values, constext, options);
    },
  });

  const onSubmit = (data: any) =>
    data !== undefined && mutate.mutate(data);
  const {t} = useTranslation(["translation"])
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 flex flex-col gap-4 sm:px-4 sm:py-6 md:p-10 rounded-md bg-white ">
      <div className="flex justify-between items-center">
        <h1 className="text-[#4a4a4a] text-lg font-semibold">{t("Email Setting")}</h1>
      </div>
      <div className="grid sm:grid-cols-1  md:grid-cols-3 gap-4 ">
        <div className="flex flex-col gap-2">
          <span className="text-[#999999] text-sm font-semibold">{t("Mailer")}</span>
          <input
            type="text"
            placeholder={t("Mailer")}
            {...register("mail_mailer")}
            className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
          />
          {errors?.mail_mailer && (
            <span className="text-red-800 ">{`${errors?.mail_mailer?.message}`}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[#999999] text-sm font-semibold">{t("Port")}</span>
          <input
            type="number"
            placeholder="0000"
            {...register("mail_port")}
            className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
          />
          {errors?.mail_port && (
            <span className="text-red-800 ">{`${errors?.mail_port?.message}`}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[#999999] text-sm font-semibold">
            {t("Encryption")}
          </span>
          <input
            type="text"
            placeholder={t("Encryption")}
            {...register("mail_encryption")}
            className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
          />
          {errors?.mail_encryption && (
            <span className="text-red-800 ">{`${errors?.mail_encryption?.message}`}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[#999999] text-sm font-semibold">{t("Host")}</span>
        <input
          type="text"
          placeholder={t("Host")}
          {...register("mail_host")}
          className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
        />
        {errors?.mail_host && (
            <span className="text-red-800 ">{`${errors?.mail_host?.message}`}</span>
          )}
      </div>

      <div className="grid sm:grid-cols-1  md:grid-cols-2 gap-4 ">
        <div className="flex flex-col gap-2">
          <span className="text-[#999999] text-sm font-semibold">
            {t("From Name")}
          </span>
          <input
            type="text"
            placeholder={t("From Name")}
            {...register("mail_from_name")}
            className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
          />
           {errors?.mail_from_name && (
            <span className="text-red-800 ">{`${errors?.mail_from_name?.message}`}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[#999999] text-sm font-semibold">
            {t("From Email")}
          </span>
          <input
            type="text"
            placeholder={t("From Email")}
            {...register("mail_from_address")}
            className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
          />
           {errors?.mail_from_address && (
            <span className="text-red-800 ">{`${errors?.mail_from_address?.message}`}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[#999999] text-sm font-semibold">{t("Username")}</span>
          <input
            type="text"
            placeholder={t("Username")}
            {...register("mail_username")}
            className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
          />
           {errors?.mail_username && (
            <span className="text-red-800 ">{`${errors?.mail_username?.message}`}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[#999999] text-sm font-semibold">{t("Password")}</span>
          <div className="border-[2px] flex justify-between px-2">

          <input
            type={isShow}
            placeholder={t("Password")}
            {...register("mail_password")}
            className="text-[#4a4a4a] flex-1 text-base  p-2  outline-none rounded-md"
          />
          <button onClick={handleIsShow} className="text-[#7655fa] active:scale-[0.95] transition-all] font-semibold">{isShow === "password" ? t("Show") : t("Hide")}</button>
          </div>
           {errors?.mail_password && (
            <span className="text-red-800 ">{`${errors?.mail_password?.message}`}</span>
          )}
        </div>
      </div>
      <div className="flex justify-end items-center gap-4">
        <button type="submit" className="px-4 py-2 active:scale-[0.95] transition-all bg-[#7655fa] text-white rounded-full">
          {t("Test and Save Settings")}
        </button>
      </div>
    </form>
  );
};

export default EditEmailSettings;
