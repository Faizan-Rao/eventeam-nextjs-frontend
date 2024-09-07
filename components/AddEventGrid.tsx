"use client";
import React, { useEffect, useMemo, useState } from "react";
import MainContentGrid from "./MainContentGrid";
import PageTitleContainer from "./PageTitleContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import i18n from "@/configs/i18n";
import AutoConfigForm from "./forms/auto-config/AutoConfigForm";
const AddEventGrid = () => {
  const { dir } = i18n;

  return (
    <MainContentGrid>
      <div className="sm:hidden md:block">
        <PageTitleContainer
          title="Add New Event"
        />

      </div>
        <AutoConfigForm />
      
    </MainContentGrid>
  );
};

export default AddEventGrid;
