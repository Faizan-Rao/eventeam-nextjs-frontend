import React from "react";
import MainContainer from "./MainContainer";
import UpcomingEvents from "./UpcomingEvents";

const DashboardGrid = () => {
  return (
  <div className={"flex container p-4 gap-4 sm:flex-wrap md:flex-nowrap"}>
   
        <MainContainer/>
   
   
        <UpcomingEvents/>

    
  </div>
  );
};

export default DashboardGrid;
