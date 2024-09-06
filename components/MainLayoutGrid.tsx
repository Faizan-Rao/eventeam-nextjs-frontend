"use client";
import React, { useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";

interface IMainLayoutGrid {
  children: React.ReactNode;
}

const MainLayoutGrid: React.FC<IMainLayoutGrid> = ({ children }) => {

  const [isNavOpen , setNavOpen] = useState(true)
  
  return (
    <>
      <Header setNavOpen={setNavOpen} isNavOpen={isNavOpen} />
      <div className="flex">
        <div className="">
          <SideBar isNavOpen={isNavOpen} setNavOpen={setNavOpen}/>
        </div>
        {children}
      </div>
    </>
  );
};

export default MainLayoutGrid;
