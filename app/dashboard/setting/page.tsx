"use client";
import MainContentGrid from "@/components/MainContentGrid";
import PageTitleContainer from "@/components/PageTitleContainer";
import { clsx } from "clsx";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { FormFields, Profile } from "@/configs/apiRoutes";
import { Skeleton } from "@/components/ui/skeleton";
import EditComissionDetails from "@/components/forms/admin-settings/ComissionDetails";
import EditStripSettings from "@/components/forms/admin-settings/StripeSettingsForm";
import { user } from "@/configs/axios";
import EditEmailSettings from "@/components/forms/admin-settings/EmailSettings";
import CommissionCalculation from "@/components/forms/admin-settings/CommisionCalculation";
import { FreeMode } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
const EditProfileAddressInfo = dynamic(
  () => import("@/components/forms/edit-address-info/EditProfileAddressInfo")
);
const EditProfileGenInfo = dynamic(
  () => import("@/components/forms/edit-general-info/EditProfileGenInfo")
);
const EditSecurityForm = dynamic(
  () => import("@/components/forms/edit-security-info/EditSecurityInfo")
);
const Setting = () => {
  const [tab, setTab] = useState("gen-info");
  const {
    data: profile,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: Profile.get,
  });

  const { data: emailSettings, refetch } = useQuery({
    queryKey: ["email-settings-platform"],
    queryFn: Profile.getEmailSettings,
  });
  const profileData = profile && profile?.data.data;

  const { data: commissionDetails } = useQuery({
    queryKey: ["commission-details-platform"],
    queryFn: async () => {
      return await Profile.getAdminCommission();
    },
  });
  const { data: stripeKeys } = useQuery({
    queryKey: ["stripe-keys-platform"],
    queryFn: async () => {
      return await Profile.getStripeKeys();
    },
  });
  const { data: formField } = useQuery({
    queryKey: ["form-fields"],
    queryFn: async () => {
      return await FormFields.GetFormField();
    },
  });
  return (
    <>
      <MainContentGrid className="sm:hidden md:flex">
        <PageTitleContainer title="General Settings" />
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {!profileData && (
            <Skeleton className="h-[825px] w-[850px] rounded-xl" />
          )}
          {profileData && <EditProfileGenInfo profile={profileData} />}
          {!profileData && (
            <Skeleton className="h-[825px] w-[850px] rounded-xl" />
          )}

          {profileData && <EditProfileAddressInfo profile={profileData} />}
          {profileData && <EditSecurityForm />}

          {user.role === "admin" && (
            <div className="col-span-2">
              <PageTitleContainer title="Platform Settings" className="my-10" />
              <div className="grid sm:grid-cols-1 col-span-2  md:grid-cols-1 lg:grid-cols-2 gap-4">
                {commissionDetails && (
                  <EditComissionDetails commissionDetails={commissionDetails} />
                )}
                {stripeKeys && <EditStripSettings stripeKeys={stripeKeys} />}
                {emailSettings && (
                  <EditEmailSettings emailSettings={emailSettings} />
                )}
                {formField && <CommissionCalculation formField={formField} />}
              </div>
            </div>
          )}
        </div>
      </MainContentGrid>

      <div className="sm:block md:hidden ">
        <PageTitleContainer title="Profile Settings" />
        <div className="px-4 py-4 bg-white  ">
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={26}
            freeMode={true}
            modules={[FreeMode]}
            className="sm:flex md:hidden w-full py-4  px-6 font-semibold "
          >
            <SwiperSlide className="!w-auto">
              <button
                onClick={() => setTab("gen-info")}
                className={clsx(
                  "text-[#7655fa] active:scale-[0.95] transition-all whitespace-nowrap",
                  tab === "gen-info" && "border-b-[2px] border-[#7655fa]"
                )}
              >
                General
              </button>
            </SwiperSlide>

            <SwiperSlide className="!w-auto">
              <button
                onClick={() => setTab("address-info")}
                className={clsx(
                  "text-[#7655fa] active:scale-[0.95] transition-all whitespace-nowrap",
                  tab === "address-info" && "border-b-[2px] border-[#7655fa]"
                )}
              >
                Address
              </button>
            </SwiperSlide>

            <SwiperSlide className="!w-auto">
              <button
                onClick={() => setTab("security-info")}
                className={clsx(
                  "text-[#7655fa] active:scale-[0.95] transition-all whitespace-nowrap",
                  tab === "security-info" && "border-b-[2px] border-[#7655fa]"
                )}
              >
                Security
              </button>
            </SwiperSlide>

            {user.role === "admin" && (
              <SwiperSlide className="!w-auto">
                <button
                  onClick={() => setTab("email-info")}
                  className={clsx(
                    "text-[#7655fa] active:scale-[0.95] transition-all whitespace-nowrap",
                    tab === "email-info" && "border-b-[2px] border-[#7655fa]"
                  )}
                >
                  Email
                </button>
              </SwiperSlide>
            )}

            {user.role === "admin" && (
              <SwiperSlide className="!w-auto">
                <button
                  onClick={() => setTab("commission-info")}
                  className={clsx(
                    "text-[#7655fa] active:scale-[0.95] transition-all whitespace-nowrap",
                    tab === "commission-info" &&
                      "border-b-[2px] border-[#7655fa]"
                  )}
                >
                  Commission
                </button>
              </SwiperSlide>
            )}

            {user.role === "admin" && (
              <SwiperSlide className="!w-auto">
                <button
                  onClick={() => setTab("stripe-info")}
                  className={clsx(
                    "text-[#7655fa] active:scale-[0.95] transition-all whitespace-nowrap",
                    tab === "stripe-info" && "border-b-[2px] border-[#7655fa]"
                  )}
                >
                  Stripe
                </button>
              </SwiperSlide>
            )}
          </Swiper>
        </div>
        <div>
          {tab === "gen-info" && profileData && (
            <EditProfileGenInfo profile={profileData} />
          )}
          {tab === "address-info" && profileData && (
            <EditProfileAddressInfo profile={profileData} />
          )}
          {tab === "security-info" && <EditSecurityForm />}
          {tab === "commission-info" && commissionDetails && (
            <EditComissionDetails commissionDetails={commissionDetails} />
          )}
          {tab === "stripe-info" && stripeKeys && (
            <EditStripSettings stripeKeys={stripeKeys} />
          )}
          {tab === "email-info" && emailSettings && (
            <EditEmailSettings emailSettings={emailSettings} />
          )}
          {tab === "commission-info" && formField && (
            <CommissionCalculation formField={formField} />
          )}
        </div>
      </div>
    </>
  );
};

export default Setting;
