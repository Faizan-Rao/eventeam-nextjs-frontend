import React from "react";
import MainContainer from "./MainContainer";
import UpcomingEvents from "./UpcomingEvents";

const DashboardGrid = () => {
  return (
    <>
  <div className={"flex p-8 gap-4 overflow-x-auto  sm:flex-wrap md:flex-nowrap"}>
   
        <MainContainer/>
   
   

        <UpcomingEvents/>
    
  </div>
    
    </>
  );
};

export default DashboardGrid;
