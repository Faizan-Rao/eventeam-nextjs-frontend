import { ChevronRight, Clock, Droplet, MapPin, Watch } from "lucide-react";
import Link from "next/link";
import React from "react";

const CompanyEventCard = () => {
  return (
    <div className="bg-[white] sm:my-4  hover:md:translate-y-[-30%] transition-all duration-300 flex-1 flex flex-col p-6  rounded-3xl sm:translate-y-[0%] md:translate-y-[-25%] min-w-[400px]  ">
      <span className="bg-[#7655fa26] sm:text-sm  md:text-base mb-4 mt-2 px-4 py-2 self-start text-center  rounded-full text-[#7655fa] font-semibold">
        Upcoming
      </span>
      <h1 className="font-semibold sm:text-lg md:text-xl mb-2">
        New {"Year's"} Eve Celebration
      </h1>
      <p className=" text-[#999999] sm:text-sm md:text-base pb-4 border-b-[1px] ">
        Ring in the new year with a grand celebration featuring live music,
        dancing, and a spectacular fireworks display at midnight.{" "}
      </p>
      <div className="flex my-2 justify-between items-center">
        <h1 className="text-[#999999] font-semibold">Important Times</h1>
        <button className="bg-[#7655fa26] text-sm  px-3  my-2  text-center p-2 rounded-full text-[#7655fa] font-semibold">
          View Details
        </button>
      </div>

      <div className="flex flex-1 pb-4 border-b-[1px] max-h-[140px] justify-stretch">
        <span className=" flex-1 p-4 flex-col flex justify-center items-center rounded-md gap-4 bg-[#7655fa26]">
          <Watch className="text-[#7655fa]" size={35} />

          <span className="text-[#999999] sm:text-base md:text-lg font-semibold">
            Start at 00:00
          </span>
        </span>
      </div>
      <div className="flex my-5 font-semibold flex-col gap-4">
        <div className="flex gap-4">
          <Clock className="text-[#7655fa] min-w-[30px]" />
          <span className="text-sm text-[#999999]">8 AM, June 27th - 12 PM, June 29th</span>
        </div>
        <div className="flex gap-4">
          <MapPin className="text-[#7655fa] min-w-[30px]" />
          <span className="text-sm text-[#999999]">789 , New Jersey Street, New York </span>
        </div>
      </div>

      <Link
        href={"/events/1"}
        className="flex text-base justify-center items-center bg-[#7655fa] rounded-full py-3 px-4"
      >
        <button className="  font-semibold text-center ">
          <span className="text-white sm:text-sm md:text-base ">Register For Event</span>
        </button>
        <ChevronRight className="text-white" />
      </Link>
    </div>
  );
};

export default CompanyEventCard;
