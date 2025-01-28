"use client";
import MainContentGrid from "@/components/MainContentGrid";
import PageTitleContainer from "@/components/PageTitleContainer";
import { clsx } from "clsx";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { Profile } from "@/configs/apiRoutes";
import { Skeleton } from "@/components/ui/skeleton";
import EditComissionDetails from "@/components/forms/admin-settings/ComissionDetails";
import EditStripSettings from "@/components/forms/admin-settings/StripeSettingsForm";
import { user } from "@/configs/axios";
import EditEmailSettings from "@/components/forms/admin-settings/EmailSettings";
import CommissionCalculation from "@/components/forms/admin-settings/CommisionCalculation";
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
              <PageTitleContainer title="Platform Settings"  className="my-10"/>
              <div className="grid sm:grid-cols-1 col-span-2  md:grid-cols-1 lg:grid-cols-2 gap-4">
                <EditComissionDetails />
                <EditStripSettings />
               {emailSettings && <EditEmailSettings emailSettings={emailSettings} />}
                <CommissionCalculation/>
              </div>
            </div>
          )}
        </div>
      </MainContentGrid>

      <div className="sm:block md:hidden ">
        <PageTitleContainer title="Form Fields" />
        <div className="sm:flex md:hidden py-4 bg-[white] px-4 font-semibold min-w-[100vw] items-center gap-4">
          <button
            onClick={() => setTab("gen-info")}
            className={clsx(
              "text-[#7655fa] active:scale-[0.95] transition-all",
              tab === "gen-info" && "border-b-[2px] border-[#7655fa] "
            )}
          >
            General
          </button>
          <button
            onClick={() => setTab("address-info")}
            className={clsx(
              "text-[#7655fa] active:scale-[0.95] transition-all",
              tab === "address-info" && "border-b-[2px] border-[#7655fa] "
            )}
          >
            {" "}
            Address
          </button>
          <button
            onClick={() => setTab("security-info")}
            className={clsx(
              "text-[#7655fa] active:scale-[0.95] transition-all",
              tab === "security-info" && "border-b-[2px] border-[#7655fa] "
            )}
          >
            {" "}
            Security
          </button>
        </div>
        <div>
          {tab === "gen-info" && <EditProfileGenInfo profile={profileData} />}
          {tab === "address-info" && (
            <EditProfileAddressInfo profile={profileData} />
          )}
          {tab === "security-info" && <EditSecurityForm />}
        </div>
      </div>
    </>
  );
};

export default Setting;
