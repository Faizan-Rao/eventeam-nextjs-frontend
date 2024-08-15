import React from "react";
import PageTitleContainer from "./PageTitleContainer";
import MyEventMainCont from "./MyEventMainCont";

const MyEventGrid = () => {
  return (
    <div className={"flex container flex-col gap-4 "}>
      <PageTitleContainer/>
      <MyEventMainCont/>
    </div>
  );
};

export default MyEventGrid;
