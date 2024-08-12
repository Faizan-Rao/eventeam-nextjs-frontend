"use client";
import React, { useState } from "react";
import clsx from "clsx";
import Header from "./Header";
import SideBar from "./SideBar";

interface IMainLayoutGrid {
  children: React.ReactNode;
}

const MainLayoutGrid: React.FC<IMainLayoutGrid> = ({ children }) => {
  return (
    <>
      <Header />
      {/* <div className="grid justify-center direction-alternate grid-rows-12 grid-col-12">
      
        <div className="col-span-3 ">
          <SideBar />
        </div>
        
      <div className="flex">

        {children}
      </div>
        
      </div> */}
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
