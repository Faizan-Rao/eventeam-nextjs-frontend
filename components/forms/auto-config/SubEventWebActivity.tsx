'use client'
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import PrayerField from "./PrayerField";

const SubEventWebActivity = ({ subEventId, data }: { data:any ,subEventId: number }) => {
  const { control } = useFormContext();
 

 
  return (
    <PrayerField
      title={`${data.title}`}
      
      prayer={subEventId}
    />
  );
};

export default SubEventWebActivity;
