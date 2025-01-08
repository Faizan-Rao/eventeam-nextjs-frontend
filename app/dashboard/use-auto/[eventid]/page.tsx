"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import i18n from "@/configs/i18n";
import PageTitleContainer from "@/components/PageTitleContainer";
import AutoConfigForm from "@/components/forms/auto-config/AutoConfigForm";
import MainContentGrid from "@/components/MainContentGrid";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { AutoFormAPI, Events } from "@/configs/apiRoutes";
import { ref } from "joi";

const EditEvent = () => {
  const { dir } = i18n;
  const params = useParams();
  const [fetchedData, setFetchedData] = useState<any>();
  console.log("url params", params);
  const { data, isLoading, refetch, isFetchedAfterMount } = useQuery({
    queryKey: ["autoform"],
    queryFn: async () => AutoFormAPI.autoformConfigFetch(params.eventid),
    refetchOnMount: true,
  });
  useEffect(() => {
   
    if(data)
    {
      setFetchedData(data?.data.data)

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return (
    <MainContentGrid>
      <div className="sm:hidden md:block">
        <PageTitleContainer title="Use AutoForm" />
      </div>
      {fetchedData && !isLoading && <AutoConfigForm data={fetchedData} type="add" />}
    </MainContentGrid>
  );
};

export default EditEvent;
