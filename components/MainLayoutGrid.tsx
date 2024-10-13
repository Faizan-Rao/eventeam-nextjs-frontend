"use client";
import React, { useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
interface IMainLayoutGrid {
  children: React.ReactNode;
}

export const queryClient = new QueryClient()

const MainLayoutGrid: React.FC<IMainLayoutGrid> = ({ children }) => {

  const [isNavOpen , setNavOpen] = useState(true)
  return (
    <>
      <Header setNavOpen={setNavOpen} isNavOpen={isNavOpen} />
      <div className="flex">
        <div className="">
          <SideBar isNavOpen={isNavOpen} setNavOpen={setNavOpen}/>
        </div>
        <QueryClientProvider client={queryClient}>
        {children}
        </QueryClientProvider>
       
      </div>
    </>
  );
};

export default MainLayoutGrid;
