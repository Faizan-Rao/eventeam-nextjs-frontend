import React from "react";
import MainContainer from "./MainContainer";

const DashboardGrid = () => {
  return (
  <div className={"grid grid-col-12"}>
    <div className="col-span-8">
        <MainContainer/>
    </div>
    
  </div>
  );
};

export default DashboardGrid;
