import clsx from "clsx";
import React from "react";


interface IMainContentGrid {
  children: React.ReactNode;
  className?: string
}

const MainContentGrid: React.FC<IMainContentGrid> = ({ children, className }) => {
  return <div className={clsx("flex flex-col md:px-8  w-full  h-auto overflow-auto gap-4", className)}>{children}</div>;
};

export default MainContentGrid;
