import React from "react";
import PageTitleContainer from "./PageTitleContainer";
import MyEventMainCont from "./MyEventMainCont";
import MainContentGrid from "./MainContentGrid";
const MyEventGrid = () => {
  return (
    <MainContentGrid>
      <PageTitleContainer title="My Events"/>
      <MyEventMainCont/>
    </MainContentGrid>
  );
};

export default MyEventGrid;
