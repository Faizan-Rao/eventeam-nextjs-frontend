import React from "react";
import PageTitleContainer from "./PageTitleContainer";

const MyEventGrid = () => {
  return (
    <div className={"flex flex-col sm:m-3 md:m-3 p-4 gap-4 sm:flex-wrap md:flex-nowrap"}>
      <PageTitleContainer/>
    </div>
  );
};

export default MyEventGrid;
