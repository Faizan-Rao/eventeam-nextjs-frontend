'use client'
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import PrayerField from "./PrayerField";

const SubEventWebActivity = ({ subEventId }: { subEventId: number }) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: `prayer_time.${subEventId}`,
    control,
  });

  console.log("Fields", "Helelo")
  return (
    <PrayerField
      title={`Subevent #${subEventId + 1} `}
      fields={fields}
      append={append}
      remove={remove}
      prayer={subEventId}
    />
  );
};

export default SubEventWebActivity;
