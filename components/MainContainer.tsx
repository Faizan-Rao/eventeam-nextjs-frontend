import React from "react";
import KPIContainer from "./KPIContainer";
import EventDashContainer from "./EventDashContainer";
import ChartsMain from "./ChartsMain";
import RecentRegMain from "./RecentRegMain";
const MainContainer = () => {
  return (
    <div className="grid sm:m-3 md:m-8 p-4  gap-4 bg-[#fffefe] rounded-lg grid-col-12 ">
      <div className="col-span-12 ">
        <KPIContainer />
      </div>
      <div className="col-span-12">
        <EventDashContainer />
      </div>

      <div className="sm:col-span-12 lg:col-span-4">
        <ChartsMain/>
      </div>

      <div className="sm:col-span-12 lg:col-span-8">
    <RecentRegMain/>
      </div>
    </div>
  );
};

export default MainContainer;
