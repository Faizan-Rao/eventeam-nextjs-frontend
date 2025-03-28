"use client";
import { Calendar, Clock, MapPin, UserRound } from "lucide-react";
import React from "react";
import ShowSubEventInfoDialog from "./ShowSubEventInfoDialog";
import RegisterForEventGuestCard from "./RegisterForEventGuestCard";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import parser from "html-react-parser";
import { format } from "date-fns";
import AddRegistrantDialog from "./AddRegistrantDialog";
import { useTranslation } from "react-i18next";
const RegisterForEventForm1 = ({
  data,
  company,
}: {
  company?: any;
  data: any;
}) => {
  const { control } = useFormContext();
  const watch = useWatch({ control });
  const { t } = useTranslation(["translation"]);
  return (
    <div className=" rounded-md sm:w-[100%] md:w-[100%] lg:w-[70%] gap-4  bg-[white] sm:p-4 md:p-8 ">
      <div className=" grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2  items-center ">
        <div className="flex flex-col ">
          <h1 className="text-[#7655fa] sm:text-sm md:text-base font-semibold">
            {t("Get Registered for")}
          </h1>
          <h1 className="text-[#4a4a4a] sm:text-2xl md:text-4xl font-semibold">
            {data.event.title}
          </h1>
        </div>
        {/* <div className="flex justify-between flex-col items-center gap-4 w-full flex-wrap">

      </div> */}
      </div>
      <div className="grid md:grid-cols-2   bg-[#F7F6F9]  my-6 rounded-lg    p-1 ">
        <div className="flex gap-4 self-stretch p-2 items-center  ">
          <span className="bg-[#FFE58A] rounded-full p-2 font-semibold">
            <MapPin className="text-[#4a4a4a]" size={20} />
          </span>
          {data.event && data.event?.address?.googlemaplink === null && (
            <h1 className="text-[#4a4a4a] text-sm font-semibold">
              {data.event.company_address || t("No Specified Address")}
            </h1>
          )}
          {data.event && data.event?.address?.googlemaplink !== null && (
            <a
              href={data.event.address?.googlemaplink}
              className="text-[#7655fa] text-sm font-semibold"
            >
              {t("Click here to Navigate to the location")}
            </a>
          )}
        </div>

        <div className="flex gap-4 self-stretch p-2 items-center  ">
          <span className="bg-[#E1FF81] rounded-full p-2 font-semibold">
            <Clock className="text-[#4a4a4a]" size={20} />
          </span>

          <h1 className="text-[#4a4a4a] text-sm font-semibold">
            {}
            {(() => {
              try {
                return `${format(
                  new Date(
                    data.event.start_date.toLocaleString().replace(" ", "T")
                  ),
                  "dd/MM/yyy"
                )} - ${format(new Date(data.event.end_date.toLocaleString().replace(" ", "T")), "dd/MM/yyy")}`;
              } catch {
                return (
                  data.event.start_date.toLocaleString().replace(" ", "T") +
                  " - " +
                  data.event.end_date.toLocaleString().replace(" ", "T")
                );
              }
            })()}
          </h1>
        </div>
      </div>
      <p className="text-[#999999] text-base min-w-[100%]  py-4 ">
        {parser(data.event.description)}
      </p>
      <div className=" border-b-[1px] my-4  ">
        <h1 className="text-[#7655fa] font-semibold">{t("Sub Events")}</h1>
        <div className="grid sm:grid-cols-1  md:grid-cols-1 lg:grid-cols-3  my-2 gap-2">
          {data &&
            data.event.sub_events.map((el: any, index: number) => {
              return (
                <div
                  key={index}
                  className=" bg-[#F7F6F9]  rounded-md flex justify-between items-center  md:my-4 p-4"
                >
                  <h1 className="font-semibold sm:text-sm md:text-base">
                    {el.title}
                  </h1>
                  <ShowSubEventInfoDialog
                    payload={data.event}
                    data={el}
                    index={index}
                  />
                </div>
              );
            })}
        </div>
      </div>

      <div className="flex flex-col  self-start gap-4">
        <h1 className="text-[#7655fa] font-semibold">{t("Guests")}</h1>
        <div className="grid grid-cols-1 overflow-y-auto overflow-x-hidden max-h-[300px] gap-4">
          {(watch.guests.length > 0 &&
            watch.guests.map((el: any, i: number) => {
              return (
                <RegisterForEventGuestCard
                  index={i + 1}
                  key={i}
                  data={el}
                  formData={data.event}
                />
              );
            })) || (
            <p className="p-7 w-full border-dashed border-[4px] font-semibold text-center text-[#999999]">
              {t("No Guests Currently")}
            </p>
          )}
        </div>

        <AddRegistrantDialog formData={data.event} settings={data.settings} />
      </div>
    </div>
  );
};

export default RegisterForEventForm1;
