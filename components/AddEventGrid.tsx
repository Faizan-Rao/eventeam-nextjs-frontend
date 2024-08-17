import React from "react";
import MainContentGrid from "./MainContentGrid";
import PageTitleContainer from "./PageTitleContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AutoConfigForm from "./AutoConfigForm";
const AddEventGrid = () => {
  return (
    <MainContentGrid >
      
      <Tabs defaultValue="auto_config" >
      <div className="flex justify-between items-center my-10 flex-wrap">
        <PageTitleContainer title="Add New Event" className="mt-0 justify-center " />
        <TabsList >
          <TabsTrigger value="auto_config">Auto Config</TabsTrigger>
          <TabsTrigger value="email_template">Email Template</TabsTrigger>
          <TabsTrigger value="form_field">Form Field Settings</TabsTrigger>
          <TabsTrigger value="donation">Donation Setting</TabsTrigger>
         
        </TabsList>
      </div>
        <TabsContent value="auto_config" className="p-0 m-0">
         <AutoConfigForm/>
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
