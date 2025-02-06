"use client";
import React, { useEffect, useState } from "react";
import {
  Control,
  useFieldArray,
  useForm,
  useFormContext,
  UseFormRegister,
  useWatch,
} from "react-hook-form";

import PrayerField from "./PrayerField";
import AddPrayerTimeDialog from "./AddPrayerTimeDialog";
import { CircleX } from "lucide-react";
import EditPrayerTimeDialog from "./EditPrayerTImeDialog";
import SubEventWebActivity from "./SubEventWebActivity";
import PrayerForm from "./PrayerForm";
import MobileActivitySection from "./MobileActivitySection";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

interface IPrayerTime {
  control: Control<any, any>;
  register: UseFormRegister<any>;
}

const PrayerTimeForm: React.FC<IPrayerTime> = ({ control, register }) => {
  const [subActivities, setSubActivities] = useState<any>();

  const watch = useWatch({ control });
  const pathname = usePathname();
  const {
    formState: { errors },
  } = useFormContext();
  const {t} = useTranslation(["translation"])
  return (
    <>
      {/* Web Interface */}
      <div className="sm:hidden md:flex flex-col gap-4">
        {(watch.sub_events || []).length > 0 && pathname.includes("/auto-config") &&<PrayerForm />}
        {(watch.sub_events || []).length <= 0 && (
          <p className="text-lg text-center p-7 text-[#999999] border-[4px] border-dashed">{t("Create a Subevent First...")}</p>
        )}
        {(watch.sub_events || []).map((el: any, i: number) => {
          return <SubEventWebActivity key={i} data={el} subEventId={i} />;
        })}
        {errors?.activities && (
          <p className="text-red-800">
            Every sub-event must have atleast one activity
          </p>
        )}
      </div>

      {/* Mobile Interface */}
      <div className="sm:flex md:hidden flex-col min-w-[90vw]">
        {pathname.includes("/auto-config") && <PrayerForm />}
        <div className="flex flex-col gap-4">
          {watch.activities?.map((item: any, index: number) => 
          item !== undefined && <MobileActivitySection key={index} data={item} index={index}/>
          )}
          {errors.activities && <p className="text-red-800">Every sub-event must have atleast one activity</p> }
        </div>
      </div>
    </>
  );
};

export default PrayerTimeForm;
