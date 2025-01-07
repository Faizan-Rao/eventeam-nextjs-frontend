import React from "react";
import KPIContainer from "./KPIContainer";
import EventDashContainer from "./EventDashContainer";
import ChartsMain from "./ChartsMain";
import RecentRegMain from "./RecentRegMain";
import { Skeleton } from "./ui/skeleton";
const MainContainer = ({data}: {data: any}) => {
  return (
    <div className="grid col-span-3  grid-cols-1 gap-4   sm:p-0  md:p-4   bg-[#fffefe] rounded-lg ">
      <div className="flex-1 justify-self-stretch">
        <KPIContainer />
      </div>
      <div className="flex-1 ">
        <EventDashContainer data={data?.data['upcoming_events'][0]}/>
      </div>

      {/* <div className=" flex-1 flex sm:flex-col md:flex-row justify-between gap-2 flex-wrap"> */}
      <div className=" grid sm:grid-cols-1 md:grid-cols-3 gap-4">
        <ChartsMain chartData={data?.data['chart_data']}/>
        { data &&  <RecentRegMain regData={data?.data['recent_registrants']} />}
       {!data && <Skeleton className="sm:h-[125px] md:h-[525px] sm:w-[125px] md:w-[825px] rounded-xl" />}
      </div>
    </div>
  );
};

export default MainContainer;
