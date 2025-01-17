"use client";
import React, { useEffect, useMemo, useState } from "react";
import MainContentGrid from "./MainContentGrid";
import PageTitleContainer from "./PageTitleContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import i18n from "@/configs/i18n";
import AutoConfigForm from "./forms/auto-config/AutoConfigForm";
import { useQuery } from "@tanstack/react-query";
import { AutoFormAPI } from "@/configs/apiRoutes";
const AutomaticConfiguration = () => {
  const { dir } = i18n;
  const {data, isPending, isError} = useQuery({
    queryKey:["auto-config-data"],
    queryFn: AutoFormAPI.fetchAutoConfig
  })
  console.log("autoconfig fetch",)
  const autoData = data?.data.data.data.auto_configs
  return (
    <MainContentGrid>
      <div className="sm:hidden md:block">
        <PageTitleContainer
          title="Auto Config"
        />

      </div>
       {!isPending && <AutoConfigForm data={autoData} type="autoForm" />}
      
    </MainContentGrid>
  );
};

export default AutomaticConfiguration;
