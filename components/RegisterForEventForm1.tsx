"use client";
import { Calendar, Clock, MapPin, UserRound } from "lucide-react";
import React from "react";
import ShowSubEventInfoDialog from "./ShowSubEventInfoDialog";
import RegisterForEventGuestCard from "./RegisterForEventGuestCard";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import parser from "html-react-parser";
import { format } from "date-fns";
import AddRegistrantDialog from "./AddRegistrantDialog";
const RegisterForEventForm1 = ({ data }: { data: any }) => {
  const {control} = useFormContext();
  const watch = useWatch({control})
  
  return (
    <div className="grid grid-cols-1 rounded-md sm:w-[100%] md:w-[100%] lg:w-[70%] gap-4  bg-[white] p-4 min-h-screen">
      <div className="grid sm:grid-cols-1  md:grid-cols-1 lg:grid-cols-2 gap-4  p-4 items-center">
        <div className="flex flex-col">
          <h1 className="text-[#7655fa] font-semibold">Get Registered for</h1>
          <h1 className="text-[#4a4a4a] sm:text-3xl md:text-4xl font-semibold">
            {data.event.title}
          </h1>
        </div>

        <div className="flex bg-[#F7F6F9] rounded-lg p-4">
          {/* <div className="flex gap-4 self-stretch p-2 items-center  ">
            <span className="bg-[#FFE58A] rounded-full p-2 font-semibold">
              <MapPin className="text-[#4a4a4a]" size={20} />
            </span>
            <h1 className="text-[#4a4a4a] text-sm font-semibold">
              21 59, New Jersey Street, New York
            </h1>
          </div> */}

          <div className="flex gap-4 self-stretch p-2 items-center  ">
            <span className="bg-[#E1FF81] rounded-full p-2 font-semibold">
              <Clock className="text-[#4a4a4a]" size={20} />
            </span>
            <h1 className="text-[#4a4a4a] text-sm font-semibold">
              {`${format(
                new Date(
                  data.event.start_date.toLocaleString().replace(" ", "T")
                ),
                "h a, MMMM do yyyy"
              )} - ${format(
                new Date(
                  data.event.end_date.toLocaleString().replace(" ", "T")
                ),
                "h a, MMMM do yyyy"
              )}`}
            </h1>
          </div>
        </div>
      </div>
      <p className="text-[#999999] text-base border-b-[1px] px-4 pb-4">
        {parser(data.event.description)}
      </p>

      <div className=" border-b-[1px] px-4 pb-4 ">
        <h1 className="text-[#7655fa] font-semibold">Sub Events</h1>
        <div className="grid sm:grid-cols-1  md:grid-cols-1 lg:grid-cols-3  my-2 gap-2">
          {data && data.event.sub_events.map((el: any, index: number) => {
            return (
              <div
                key={index}
                className=" bg-[#F7F6F9]  rounded-md flex justify-between items-center  md:my-4 p-4"
              >
                <h1 className="font-semibold text-base">{el.title}</h1>
                <ShowSubEventInfoDialog data={el} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col  px-4 pb-4 gap-4">
        <h1 className="text-[#7655fa] font-semibold">Guests</h1>
        <div className="grid grid-cols-1 overflow-y-auto overflow-x-hidden max-h-[300px] gap-4">
          {
            watch.guests.length > 0 && watch.guests.map((el:any, i:number) => {
            return <RegisterForEventGuestCard index={i+1} key={i} data={el} formData={data.event} />
          }) || "No Guests"

          }
         
        </div>

       <AddRegistrantDialog formData={data.event} settings={data.settings}/>
      </div>
    </div>
  );
};

export default RegisterForEventForm1;
