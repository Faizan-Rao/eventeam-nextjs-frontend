"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import i18n from "@/configs/i18n";
import PageTitleContainer from "@/components/PageTitleContainer";
import AutoConfigForm from "@/components/forms/auto-config/AutoConfigForm";
import MainContentGrid from "@/components/MainContentGrid";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Events } from "@/configs/apiRoutes";

const AutoEvent = () => {
  const { dir } = i18n;
const params = useParams()
const {data,isLoading,} = useQuery({
    queryKey: ["autoevent"],
    queryFn: async ()=>   Events.fetchAutoWithConfig(params.eventid)
})
  return (
    <MainContentGrid>
      <div className="sm:hidden md:block">
        <PageTitleContainer
          title="Use Autoform"
        />

      </div>
      {data &&  <AutoConfigForm data={data?.data}  type="add"/>}
      
    </MainContentGrid>
  );
};

export default AutoEvent;
