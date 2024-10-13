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

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { Companies } from "@/configs/apiRoutes";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "./MainLayoutGrid";

const schema = yup.object({
  full_name: yup.string().min(5).required(),
  password: yup.string().min(5).required(),
  email: yup.string().email().required(),
  phone: yup.string().min(10).required(),
}).required()



const CompanyAddDialog = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver : yupResolver(schema)
  });

 const [isOpen, setOpen] = useState(false)

  const addCompanies = useMutation({
    mutationFn: Companies.add,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kpis'] })
      toast("Created Successfully", {type: "success"})
      setOpen(false)
    },
    onError: (error)=>{
      console.log(error)
      toast("Creation Failed", {type: "error"})
    }
  })

  const onSubmit = async (data : any) => addCompanies.mutate(data)



  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="flex gap-4 px-4 py-2 bg-[#7655fa] rounded-full text-white">
          <Plus />
          <span>Add New Company</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Company</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col my-4 gap-4 ">
              <div className="flex flex-col gap-2">
                <span className="text-[#4a4a4a] text-sm font-semibold">
                  Company Name
                </span>
                <input
                  type="text"
                  placeholder="Company Name"
                  className="text-[#4a4a4a] text-base  p-2 border-[1px] outline-none rounded-md"
                  {...register("full_name", {required: true, minLength:5})}
                />
                {errors.full_name && <span className="text-red-700">Name is Required</span>}
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-[#4a4a4a] text-sm font-semibold">
                    Email
                  </span>
                  <input
                    type="text"
                    placeholder="Email"
                    className="text-[#4a4a4a] text-base  p-2 border-[1px] outline-none rounded-md"
                    {...register("email", {required: true, minLength:5})}
                  />
                   {errors.email && <span className="text-red-700">Email is Required</span>}
                </div>
                <div className="flex flex-col gap-2">
                <span className="text-[#4a4a4a] text-sm font-semibold">
                 Phone
                </span>
                <input
                  type="text"
                  placeholder="Phone"
                  className="text-[#4a4a4a] text-base  p-2 border-[1px] outline-none rounded-md"
                  {...register("phone", {required: true, minLength:5})}
                  />
                  {errors.phone && <span className="text-red-700">Phone is Required</span>}
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
                 Password
                </span>
                <input
                  type="text"
                  placeholder="Password"
                  className="text-[#4a4a4a] text-base  p-2 border-[1px] outline-none rounded-md"
                  {...register("password", {required: true, minLength:5})}
                  />
                {errors.password && <span className="text-red-700">Password is Required</span>}
              </div>

              <div className="flex justify-end items-center gap-4">
                <button  className="px-4 py-2 bg-[#7655fa] text-white rounded-full">
                  {" "}
                  Add Company
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
