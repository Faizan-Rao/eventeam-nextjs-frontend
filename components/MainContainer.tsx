import React from "react";
import KPIContainer from "./KPIContainer";
import EventDashContainer from "./EventDashContainer";
import ChartsMain from "./ChartsMain";
import RecentRegMain from "./RecentRegMain";
const MainContainer = ({data}: {data: any}) => {
  return (
    <div className="flex flex-col gap-4  sm:p-1  md:p-4   bg-[#fffefe] rounded-lg grid-col-12 ">
      <div className="flex-1 ">
        <KPIContainer />
      </div>
      <div className="flex-1">
        <EventDashContainer />
      </div>

      <div className="flex-1 flex gap-5 sm:flex-col md:flex-row sm:items-center flex-wrap">
        <ChartsMain />
        <RecentRegMain />
      </div>
    </div>
  );
};

export default MainContainer;
