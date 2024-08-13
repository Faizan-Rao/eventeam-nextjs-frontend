"use client";
import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";

interface IMainLayoutGrid {
  children: React.ReactNode;
}

const MainLayoutGrid: React.FC<IMainLayoutGrid> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="flex">
        <div className="z-50">
          <SideBar />
        </div>
        {children}
      </div>
    </>
  );
};

export default MainLayoutGrid;
