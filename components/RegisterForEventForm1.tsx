import { Calendar, Clock, MapPin, UserRound } from "lucide-react";
import React from "react";
import ShowSubEventInfoDialog from "./ShowSubEventInfoDialog";
import RegisterForEventGuestCard from "./RegisterForEventGuestCard";

const RegisterForEventForm1 = () => {
  return (
    <div className="flex-1  rounded-md flex flex-col gap-4  bg-[white] p-4 min-h-screen">
      <div className="flex justify-between  p-4 items-center">
        <div className="flex flex-col">
          <h1 className="text-[#7655fa] font-semibold">Get Registered for</h1>
          <h1 className="text-[#4a4a4a] text-4xl font-semibold">
            Eid Ul Fitar
          </h1>
        </div>

        <div className="flex bg-[#F7F6F9] rounded-lg p-4">
          <div className="flex gap-4 self-stretch p-2 items-center  ">
            <span className="bg-[#FFE58A] rounded-full p-2 font-semibold">
              <MapPin className="text-[#4a4a4a]" size={20} />
            </span>
            <h1 className="text-[#4a4a4a] text-sm font-semibold">
              21 59, New Jersey Street, New York
            </h1>
          </div>

          <div className="flex gap-4 self-stretch p-2 items-center  ">
            <span className="bg-[#E1FF81] rounded-full p-2 font-semibold">
              <Clock className="text-[#4a4a4a]" size={20} />
            </span>
            <h1 className="text-[#4a4a4a] text-sm font-semibold">
              8 AM, June 27th - 12 PM, June 29th
            </h1>
          </div>
        </div>
      </div>
      <p className="text-[#999999] text-base border-b-[1px] px-4 pb-4">
        Join us for a joyous Eid celebration filled with cultural festivities,
        delicious food, and vibrant activities! Our event promises a memorable
        experience for families and friends as we come together to celebrate
        this special occasion.
      </p>

      <div className="flex flex-col border-b-[1px] px-4 pb-4 ">
        <h1 className="text-[#7655fa] font-semibold">Sub Events</h1>
        <div className="flex gap-4">
          <div className="flex-1 bg-[#F7F6F9] max-w-[350px] rounded-md flex justify-between items-center  my-4 p-4">
            <h1 className="font-semibold text-base">Subevent</h1>
            <ShowSubEventInfoDialog />
          </div>
          <div className="flex-1 bg-[#F7F6F9] max-w-[350px] rounded-md flex justify-between items-center  my-4 p-4">
            <h1 className="font-semibold text-base">Subevent</h1>
            <ShowSubEventInfoDialog />
          </div>
          <div className="flex-1 bg-[#F7F6F9] max-w-[350px] rounded-md flex justify-between items-center  my-4 p-4">
            <h1 className="font-semibold text-base">Subevent</h1>
            <ShowSubEventInfoDialog />
          </div>
        </div>
      </div>

      <div className="flex flex-col  px-4 pb-4 gap-4">
        <h1 className="text-[#7655fa] font-semibold">Guests</h1>
        <div className="flex flex-col overflow-y-auto max-h-[300px] gap-4">
          <RegisterForEventGuestCard/>
          <RegisterForEventGuestCard/>
          <RegisterForEventGuestCard/>
          <RegisterForEventGuestCard/>
          <RegisterForEventGuestCard/>
        </div>

        <button className="border-[2px] border-[#7655fa] text-[#7655fa] rounded-full p-2 font-semibold">
          Add New Guest
        </button>
      </div>
    </div>
  );
};

export default RegisterForEventForm1;
