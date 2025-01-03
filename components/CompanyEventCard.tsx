import { ChevronRight, Clock, Droplet, MapPin, Watch } from "lucide-react";
import Link from "next/link";
import React from "react";
import parse from "html-react-parser";
import { format } from "date-fns";
import UpcomingEventCard from "./UpcomingEventCard";
import UpcomingSubeventPreviewDialog from "./UpcomingSubeventPreviewDialog";
import { useParams } from "next/navigation";
import clsx from "clsx";
const CompanyEventCard = ({
  data,
  company,
  index,
}: {
  data: any;
  company: any;
  index: number;
}) => {
  console.log("most upcoming", data);
  const params = useParams();
  return !isNaN(index) && (
    <div
      className={clsx(
        index === 0 && "lg:translate-y-[-25%] min-w-[420px]   bg-[white]",
        "backdrop-blur-lg sm:my-4 md:max-w-[35%] justify-self-stretch shadow-lg hover:shadow-2xl hover:bg-[white] transition-all duration-300 flex-1 flex flex-col p-6 sm:-translate-y-[0%] lg:-translate-y-[5%] rounded-3xl   min-w-[400px] "
      )}
    >
      <span
        className={clsx(
          "bg-[#7655fa26] sm:text-sm  md:text-base mb-4 mt-2 px-4 py-2 self-start text-center  rounded-full text-[#7655fa] font-semibold",
          index === 0 && "text-[white] bg-[#ff9b43]",
          data.current_status !== "active" && "text-[#e14848] bg-[#fde5e5]"
        )}
      >
        {index === 0 && data.current_status === "active"
          ? "Most Upcoming"
          : "Upcoming"}
        {data.current_status !== "active" && "Ended"}
      </span>
      <h1 className="font-semibold sm:text-lg md:text-xl mb-2">{data.title}</h1>
      <p className=" text-[#999999] sm:text-sm md:text-base pb-4 border-b-[1px] ">
        {parse(data.description)}
      </p>
      <div className="flex my-2 justify-between items-center">
        <h1 className="text-[#999999] font-semibold">Important Times</h1>
        <UpcomingSubeventPreviewDialog type={"comp_events"} data={data} />
      </div>

      <div className="flex flex-1 pb-4 border-b-[1px] max-h-[140px] gap-2 justify-stretch">
        <span className=" flex-1 p-4 flex-col flex justify-center items-center rounded-md gap-1 bg-[#7655fa26]">
          <Watch className="text-[#7655fa]" size={35} />
          <span className="text-[#999999] sm:text-sm md:text-sm font-semibold">
            Start Time
          </span>
          <span className="text-[#999999] sm:text-base md:text-lg font-semibold">
            {format(new Date(data.start_date.replace(" ", "T")), "HH:mm")}
          </span>
        </span>
        <span className=" flex-1 p-4 flex-col flex justify-center items-center rounded-md gap-1 bg-[#7655fa26]">
          <Watch className="text-[#7655fa]" size={35} />
          <span className="text-[#999999] sm:text-sm md:text-sm font-semibold">
            End Time
          </span>
          <span className="text-[#999999] sm:text-base md:text-lg font-semibold">
            {format(new Date(data.start_date.replace(" ", "T")), "HH:mm")}
          </span>
        </span>
      </div>
      <div className="flex my-5 font-semibold flex-col gap-4">
        <div className="flex gap-4">
          <Clock className="text-[#7655fa] min-w-[30px]" />
          <span className="text-sm text-[#999999]">{`${format(
            new Date(data.start_date.split(" ")[0]),
            "h a, do MMMM yyyy"
          )} - ${format(
            new Date(data.end_date.split(" ")[0]),
            "h a, do MMMM yyyy"
          )}`}</span>
        </div>
        <div className="flex gap-4">
          <MapPin className="text-[#7655fa] min-w-[30px]" />
          <span className="text-sm text-[#999999]">
            789 , New Jersey Street, New York{" "}
          </span>
        </div>
      </div>

      <Link
        href={"/events/1"}
        className="flex text-base active:scale-[0.95] transition-all justify-center items-center bg-[#7655fa] rounded-full py-3 px-4"
      >
        <a
          href={`/events/${params.companyId}/${data.id}`}
          className="  font-semibold text-center "
        >
          <span className="text-white sm:text-sm md:text-base ">
            Register For Event
          </span>
        </a>
        <ChevronRight className="text-white" />
      </Link>
    </div>
  );
};

export default CompanyEventCard;
