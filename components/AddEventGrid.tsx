import React from "react";
import MainContentGrid from "./MainContentGrid";
import PageTitleContainer from "./PageTitleContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AddEventGrid = () => {
  return (
    <MainContentGrid>
      
      <Tabs defaultValue="auto_config" >
      <div className="flex justify-between items-center flex-wrap">
        <PageTitleContainer title="Add Event" className=" justify-center " />
        <TabsList>
          <TabsTrigger value="auto_config">Auto Config</TabsTrigger>
          <TabsTrigger value="email_template">Email Template</TabsTrigger>
          <TabsTrigger value="form_field">Form Field</TabsTrigger>
          <TabsTrigger value="donation">Donation Setting</TabsTrigger>
         
        </TabsList>
      </div>
        <TabsContent value="auto_config">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="email_template">Change your password here.</TabsContent>
        <TabsContent value="form_field">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="donation">Change your password here.</TabsContent>
        
      </Tabs>
    </MainContentGrid>
  );
};

export default AddEventGrid;
