import React from "react";
import KPIContainer from "./KPIContainer";
import EventDashContainer from "./EventDashContainer";
import ChartsMain from "./ChartsMain";
import RecentRegMain from "./RecentRegMain";
import { Skeleton } from "./ui/skeleton";
const MainContainer = ({data}: {data: any}) => {
  return (
    <div className="flex flex-col gap-4  sm:p-1  md:p-4   bg-[#fffefe] rounded-lg grid-col-12 ">
      <div className="flex-1 ">
        <KPIContainer />
      </div>
      <div className="flex-1">
        <EventDashContainer data={data?.data['upcoming_events'][0]}/>
      </div>

      <div className="flex-1 flex sm:flex-col md:flex-col justify-between gap-5 items-center flex-wrap">
        <ChartsMain chartData={data?.data['chart_data']}/>
        { data &&  <RecentRegMain regData={data?.data['recent_registrants']} />}
       {!data && <Skeleton className="sm:h-[125px] md:h-[525px] sm:w-[125px] md:w-[825px] rounded-xl" />}
      </div>
    </div>
  );
};

export default MainContainer;
