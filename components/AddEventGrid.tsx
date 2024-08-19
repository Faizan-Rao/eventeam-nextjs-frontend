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
      <Tabs dir={dir()} defaultValue="auto_config">
        <div className="flex justify-between items-center  my-10 flex-wrap">
          <PageTitleContainer
            title="Add New Event"
            className="mt-0 justify-center "
          />
          <TabsList>
            <TabsTrigger value="auto_config">Auto Config</TabsTrigger>
            <TabsTrigger value="email_template">Email Template</TabsTrigger>
            <TabsTrigger value="form_field">Form Field Settings</TabsTrigger>
            <TabsTrigger value="donation">Donation Setting</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="auto_config">
          <AutoConfigForm />
        </TabsContent>
        <TabsContent value="email_template">
          Change your password here.
        </TabsContent>
        <TabsContent value="form_field">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="donation">Change your password here.</TabsContent>
      </Tabs>
    </MainContentGrid>
  );
};

export default AddEventGrid;
