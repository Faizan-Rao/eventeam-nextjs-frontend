"use client";

import { Profile } from "@/configs/apiRoutes";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { joiResolver } from "@hookform/resolvers/joi";
import joi from "joi";
import { queryClient } from "@/components/MainLayoutGrid";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export const addressInfoEditSchema = joi.object({
  address: joi.string().min(10).label("Address"),
  city: joi.string().max(30).label("City"),
  state: joi.string().max(20).label("State"),
  country: joi.string().min(3).label("Country"),
  googlemaplink: joi.string().allow("").label("Google Link"),
  zip_code: joi.string().min(4).max(8).label("Zip Code"),
  country_code: joi.string().min(2).max(3).label("Country Code"),
});

const EditProfileAddressInfo = ({ profile }: { profile: any }) => {
  const [search, setSearch] = useState( "");
  const [defaultCity, setDefaultCity] = useState("");

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: profile?.address?.address,
      city: profile?.address?.city,
      country: profile?.address?.country,
      googlemaplink: profile?.address?.googlemaplink,
      zip_code: profile?.address?.zip_code,
      state: profile?.address?.state,
      country_code: profile?.address?.country_code,
    },
    resolver: (values, constext, options) => {
      const resolver = joiResolver(addressInfoEditSchema, {
        abortEarly: false,
      });
      return resolver(values, constext, options);
    },
  });

  const { data: cities, refetch, isPending,  } = useQuery({
    queryKey: ["cities"],
    queryFn: async () =>
      await Profile.searchCity({
        searchTerm: search,
      }),
      networkMode: "online"
  });

  const mutateAddress = useMutation({
    mutationKey: ["update-address"],
    mutationFn: async (data: any) => {
      return await Profile.updateAddress(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast("Address Information Updated...", {
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
  const handleOnChange = (e: any) => {
    
    setSearch(e.target.value);
    refetch({ cancelRefetch: true });
  };
  const citiesData = cities && cities?.data.data.cities;

  console.log(profile);
  const handleDefaultCity = async (el: any) => {
    try {
      const company_geonameid = `${el.geonameid}-${el.city_name}-${el.region_name}`;
      const response = await Profile.saveCity({ company_geonameid });
      if (response.data.success) {
        toast("Default City Updated...", {
          type: "info",
        });
        setSearch("");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const {t} = useTranslation(["translation"])
  const onSubmit = (data: any) => data !== undefined && mutateAddress.mutate(data);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 flex flex-col gap-4 sm:px-4 sm:py-6 md:p-10 rounded-md bg-white "
    >
      <div className="flex justify-between items-center">
        <h1 className="text-[#4a4a4a] text-lg font-semibold">{t("Address")}</h1>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[#999999] text-sm font-semibold">
          {t("Google Map Link")} (Embeded Map)
        </span>
        <input
          type="text"
          placeholder={t("Google Map Link")}
          className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
          {...register("googlemaplink")}
        />
        {errors?.googlemaplink && (
          <span className="text-red-800 ">{`${errors?.googlemaplink?.message}`}</span>
        )}
      </div>

      {/* divider */}
      <div className=" h-[2px] my-4 w-auto flex bg-[#e8e8e8] justify-center items-center">
        <p className="bg-white text-[#7655fa] text-sm p-2 rounded-full ">OR</p>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[#999999] text-sm font-semibold">
          {t("Street Address")}
        </span>
        <input
          type="text"
          placeholder={t("Street Address")}
          className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
          {...register("address")}
        />
        {errors?.address && (
          <span className="text-red-800 ">{`${errors?.address?.message}`}</span>
        )}
      </div>

      <div className="flex justify-between items-center gap-4 flex-wrap">
        <div className="flex-1 flex flex-col gap-2">
          <span className="text-[#999999] text-sm font-semibold">{t("City")}</span>
          <input
            type="text"
            placeholder={t("City")}
            className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
            {...register("city")}
          />
          {errors?.city && (
            <span className="text-red-800 ">{`${errors?.city?.message}`}</span>
          )}
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <span className="text-[#999999] text-sm font-semibold">{t("State")}</span>
          <input
            type="text"
            placeholder={t("State")}
            className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
            {...register("state")}
          />
          {errors?.state && (
            <span className="text-red-800 ">{`${errors?.state?.message}`}</span>
          )}
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <span className="text-[#999999] text-sm font-semibold">
          {t("Country Code")}
        </span>
        <input
          type="text"
          placeholder= {t("Country Code")}
          className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
          {...register("country_code")}
        />
        {errors?.country_code && (
          <span className="text-red-800 ">{`${errors?.country_code?.message}`}</span>
        )}
      </div>
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <div className="flex-1 flex flex-col gap-2">
          <span className="text-[#999999] text-sm font-semibold">
            {t("Postal Code")}
          </span>
          <input
            type="number"
            placeholder={t("Postal Code")}
            min={0}
            defaultValue={profile?.address?.zip_code}
            className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
            {...register("zip_code")}
          />
          {errors?.zip_code && (
            <span className="text-red-800 ">{`${errors?.zip_code?.message}`}</span>
          )}
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <span className="text-[#999999] text-sm font-semibold">{t("Country")}</span>
          <input
            type="text"
            placeholder={t("Country")}
            defaultValue={profile?.address?.country}
            className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
            {...register("country")}
          />
        </div>
      </div>

      <span className="text-[#999999] my-4 text-sm font-semibold">
        {t("Default City")}
      </span>
      <div className="flex flex-col gap-2 border-[1px] rounded-md p-4">
        <div className="bg-[#7655FA26] text-[#4a4a4a] flex items-center justify-center h-[40px] w-auto text-center rounded-md text-sm ">
          <span>{t("Your default city to calculate sabbath time")}</span>
        </div>
        <span className="text-[#999999] text-sm font-semibold">{t("City")}</span>
        <input
          type="text"
          placeholder={t("Default City")}
          
          defaultValue={profile?.default_city}
          className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
          onChange={handleOnChange}
        />
        {search.length > 3 && (
          <div className="text-[#999999] bg-white border-[2px] p-1 text-sm  rounded-sm">
            {isPending && <Loader2 className="animate-spin h-5 w-5"/>}
            {Object.values(citiesData ?? {}).length > 0 &&
              Object.values(citiesData).map((el: any, i: number) => {
                return (
                  <p
                    key={i}
                    onClick={() => handleDefaultCity(el)}
                    className="mt-4 cursor-pointer hover:bg-[#7655fa] hover:text-[white] py-1 px-2 rounded-sm"
                  >{`${el.geonameid}-${el.city_name}-${el.region_name}`}</p>
                );
              })}
          </div>
        )}
      </div>

      <div className="flex justify-end items-center gap-4">
        <button className="px-4 py-2 active:scale-[0.95] transition-all bg-[#7655fa] text-white rounded-full">
          {" "}
         {t("Save Changes")}
        </button>
      </div>
    </form>
  );
};

export default EditProfileAddressInfo;
