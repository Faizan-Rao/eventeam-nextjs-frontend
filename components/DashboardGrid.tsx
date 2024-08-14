import React from "react";
import MainContainer from "./MainContainer";
import UpcomingEvents from "./UpcomingEvents";

const DashboardGrid = () => {
  return (
  <div className={"flex sm:m-3 md:m-3 p-4 gap-4 sm:flex-wrap md:flex-nowrap"}>
   
        <MainContainer/>
   
   
        <UpcomingEvents/>

    
  </div>
  );
};

export default DashboardGrid;
