"use client";
import React from "react";
import {
  Control,
  useFieldArray,
  UseFormRegister,

} from "react-hook-form";
import { IAutoConfig } from "./AutoConfigForm";

import PrayerField from "./PrayerField";

interface IPrayerTime {
  control: Control<IAutoConfig, any>;
  register: UseFormRegister<IAutoConfig>;
}

const PrayerTimeForm: React.FC<IPrayerTime> = ({ control, register }) => {
  const { fields, append, remove } = useFieldArray({
    name: "prayer_time.one_prayer",
    control,
  });
  const {
    fields: fields2,
    append: append2,
    remove: remove2,
  } = useFieldArray({
    name: "prayer_time.two_prayer",
    control,
  });

  return (
    <>
      {/* PrayerTime 1    */}
      <PrayerField
        title="Subevent #1 Prayer Time"
        fields={fields}
        append={append}
        remove={remove}
        prayer={1}
      />
      <PrayerField
        title="Subevent #2 Prayer Time"
        fields={fields2}
        append={append2}
        remove={remove2}
        prayer={2}
      />
    </>
  );
};

export default PrayerTimeForm;
