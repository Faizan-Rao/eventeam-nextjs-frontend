import React from "react";
import PageTitleContainer from "@/components/PageTitleContainer";

interface IMainContentGrid {
  children: React.ReactNode;
}

const MainContentGrid: React.FC<IMainContentGrid> = ({ children }) => {
  return <div className="flex flex-col container gap-4">{children}</div>;
};

export default MainContentGrid;
