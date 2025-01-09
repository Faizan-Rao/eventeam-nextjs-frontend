"use client";

import { Profile } from "@/configs/apiRoutes";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const EditProfileAddressInfo = ({ profile }: { profile: any }) => {
  const [search, setSearch] = useState("");
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
      google_link: profile?.address?.google_link,
      zip_code: profile?.address?.zip_code,
    },
  });

  const { data: cities, refetch } = useQuery({
    queryKey: ["cities"],
    queryFn: async () =>
      await Profile.searchCity({
        searchTerm: search,
      }),
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

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
   
      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col gap-4 sm:px-4 sm:py-6 md:p-10 rounded-md bg-white ">
        <div className="flex justify-between items-center">
          <h1 className="text-[#4a4a4a] text-lg font-semibold">Address</h1>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[#999999] text-sm font-semibold">
            Google Map Link (Embeded Map)
          </span>
          <input
            type="text"
            placeholder="Google Map Link"
            defaultValue={profile?.address?.google_link}
            className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
            {...register("google_link")}
          />
        </div>

        {/* divider */}
        <div className=" h-[2px] my-4 w-auto flex bg-[#e8e8e8] justify-center items-center">
          <p className="bg-white text-[#7655fa] text-sm p-2 rounded-full ">
            OR
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[#999999] text-sm font-semibold">
            Street Address
          </span>
          <input
            type="text"
            placeholder="Street Address"
            defaultValue={profile?.address?.address}
            className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
            {...register("address")}
          />
        </div>

        <div className="flex justify-between items-center gap-4 flex-wrap">
          <div className="flex-1 flex flex-col gap-2">
            <span className="text-[#999999] text-sm font-semibold">City</span>
            <input
              type="text"
              placeholder="City"
              defaultValue={profile?.address?.city}
              className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
              {...register("city")}
            />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <span className="text-[#999999] text-sm font-semibold">State</span>
            <input
              type="text"
              placeholder="State"
              defaultValue={profile?.address?.state}
              className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
              {...register("city")}
            />
          </div>
        </div>

        <div className="flex justify-between items-center gap-4 flex-wrap">
          <div className="flex-1 flex flex-col gap-2">
            <span className="text-[#999999] text-sm font-semibold">
              Postal Code
            </span>
            <input
              type="number"
              placeholder="Postal Code"
              min={0}
              defaultValue={profile?.address?.zip_code}
              className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
              {...register("zip_code")}
            />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <span className="text-[#999999] text-sm font-semibold">
              Country
            </span>
            <input
              type="text"
              placeholder="Country"
              defaultValue={profile?.address?.country}
              className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
              {...register("country")}
            />
          </div>
        </div>

        <span className="text-[#999999] my-4 text-sm font-semibold">
          Default City
        </span>
        <div className="flex flex-col gap-2 border-[1px] rounded-md p-4">
          <div className="bg-[#7655FA26] text-[#4a4a4a] flex items-center justify-center h-[40px] w-auto text-center rounded-md text-sm ">
            <span>Your default city {defaultCity}</span>
          </div>
          <span className="text-[#999999] text-sm font-semibold">City</span>
          <input
            type="text"
            placeholder="Default City"
            value={search}
            defaultValue={defaultCity}
            className="text-[#4a4a4a] text-base  p-2 border-[2px] outline-none rounded-md"
            onChange={handleOnChange}
          />
          {search.length > 3 && (
            <div className="text-[#999999] bg-white border-[2px] p-1 text-sm  rounded-sm">
              {/* {!citiesData && Object.values(citiesData) as any < 1 && <span> Loading</span>} */}
              {citiesData &&
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
            Save Changes
          </button>
        </div>
      </form>
  
  );
};

export default EditProfileAddressInfo;
