"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, DollarSign, Plus } from "lucide-react";

import { Switch } from "@/components/ui/switch";
import { Controller, useForm } from "react-hook-form";

import joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { Companies } from "@/configs/apiRoutes";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "./MainLayoutGrid";
import { useTranslation } from "react-i18next";

const CompanyAddDialog = ({
  editOpen,
  setEditOpen,
  type,
  data,
}: {
  editOpen?: boolean;
  setEditOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  type?: string;
  data?: any;
}) => {
  const defaultValues = {
    full_name: data?.full_name,
    email: data?.email,
    phone: data?.phone,
  };
  const { t } = useTranslation(["translation"]);

  const [isShow, setIsShow] = useState(false);
  const schema = joi
    .object({
      full_name: joi.string().min(5).required(),
      password: type === "edit" ? joi.any() : joi.string().min(5).required(),
      email: joi
        .string()
        .email({ tlds: { allow: false } })
        .required(),
      phone: joi.string().min(10).required(),
    })
    .required();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    full_name: string;
    password: string;
    email: string;
    phone: string;
  }>({
    resolver: (values, context, options) => {
      const resolver = joiResolver(schema, {
        context,
        abortEarly: false,
        allowUnknown: true,
      });
      return resolver(values, context, options);
    },
    defaultValues,
  });

  console.log("add company data", data);
  const [isOpen, setOpen] = useState(false);

  const addCompanies = useMutation({
    mutationFn: Companies.add,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["companies"],
        type: "all",
      });
      toast("Created Successfully", { type: "success" });
      setOpen(false);
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
        toast((error as any)?.response?.data.message, { type: "error" });
      }
    },
  });
  const editCompanies = useMutation({
    mutationFn: (formData) => Companies.update(data.id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["companies"],
        type: "all",
      });
      toast("Updated Successfully", { type: "success" });
      setOpen(false);
      setEditOpen && setEditOpen(false);
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
        toast((error as any)?.response?.data.message, { type: "error" });
      }
    },
  });

  const onSubmit = async (data: any) => {
    if (type !== "edit") {
      addCompanies.mutate(data);
    } else {
      editCompanies.mutate(data);
    }
  };

  return (
    <Dialog
      open={type === "edit" ? editOpen : isOpen}
      onOpenChange={type === "edit" ? setEditOpen : setOpen}
    >
      {type !== "edit" && (
        <DialogTrigger>
          <div className="flex justify-self-center md:cols-span-2 active:scale-[0.95] items-center transition-all sm:text-sm md:text-base gap-2 px-4 py-2 bg-[#7655fa] rounded-full text-white">
            <Plus />
            <p className="sm:hidden md:block text-sm">{t("Company")}</p>
          </div>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {" "}
            {type !== "edit" ? t("Add New Company") : t("Edit Company")}
          </DialogTitle>
          <DialogDescription>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col my-4 gap-4 "
            >
              <div className="flex flex-col gap-2">
                <span className="text-[#4a4a4a] text-sm font-semibold">
                  {t("Company Name")}
                </span>
                <input
                  type="text"
                  placeholder="Company Name"
                  className="text-[#4a4a4a] text-base  p-2 border-[1px] outline-none rounded-md"
                  {...register("full_name", { required: true, minLength: 5 })}
                />
                {errors.full_name && (
                  <span className="text-red-700">Name is Required</span>
                )}
              </div>

              <div className="grid sm:grid-cols-1  md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-[#4a4a4a] text-sm font-semibold">
                    {t("Email")}
                  </span>
                  <input
                    type="email"
                    placeholder="Email"
                    className="text-[#4a4a4a] text-base  p-2 border-[1px] outline-none rounded-md"
                    {...register("email", { required: true, minLength: 5 })}
                  />
                  {errors.email && (
                    <span className="text-red-700">Email is Required</span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[#4a4a4a] text-sm font-semibold">
                    {t("Phone")}
                  </span>
                  <input
                    type="text"
                    placeholder="Phone"
                    className="text-[#4a4a4a] text-base  p-2 border-[1px] outline-none rounded-md"
                    {...register("phone", { required: true, minLength: 5 })}
                  />
                  {errors.phone && (
                    <span className="text-red-700">Phone is Required</span>
                  )}
                </div>
              </div>

              {/* <div className="flex flex-col gap-2 flex-1">
                <span className="text-[#4a4a4a] text-sm font-semibold">
                  Status
                </span>
                <div className="flex justify-between border-[1px] rounded-md p-2">
                  <span className="text-[#4a4a4a] flex-1">Active</span>
                  <Controller
                    name="advance_form.cash_payment"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        name={"advance_form.show_address"}
                      />
                    )}
                  />
                </div>
              </div> */}
              <div className="flex flex-col gap-2">
                <span className="text-[#4a4a4a] text-sm font-semibold">
                  {t("Password")}
                </span>
                <div className="flex outline-[#7655fa] rounded-md items-center justify-between border-[2px] pe-2">
                  <input
                    className="p-2  flex-1 outline-none text-base "
                    placeholder="Enter password"
                    type={isShow ? "text" : "password"}
                    {...register("password", { required: true, minLength: 5 })}
                  />
                  <p
                    className="font-semibold text-base cursor-pointer text-[#7655fa]"
                    onClick={() => setIsShow(!isShow)}
                  >
                    {isShow ? "Hide" : "Show"}
                  </p>
                </div>
                {type !== "edit" && errors?.password && (
                  <span className="text-red-700">Password is Required</span>
                )}
              </div>

              <div className="flex justify-end items-center gap-4">
                <button
                  type="submit"
                  className="px-4 py-2 active:scale-[0.95] transition-all bg-[#7655fa] text-white rounded-full"
                >
                  {" "}
                  {type !== "edit" ? t("Add Company") : t("Edit Company")}
                </button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyAddDialog;
