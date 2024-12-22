"use client";
import React, { useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import clsx from "clsx";
interface IMainLayoutGrid {
  children: React.ReactNode;
}

export const queryClient = new QueryClient();

const MainLayoutGrid: React.FC<IMainLayoutGrid> = ({ children }) => {
  const [isNavOpen, setNavOpen] = useState(true);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header setNavOpen={setNavOpen} isNavOpen={isNavOpen} />
        <div className="md:flex  md:flex-row sm:grid sm:grid-cols-1 w-full">
          <div className="">
            <SideBar isNavOpen={isNavOpen} setNavOpen={setNavOpen}  />
          </div>
          <div className={clsx(isNavOpen && "sm:hidden md:block")}>
          {children}

          </div>
        </div>
      </QueryClientProvider>
    </>
  );
};

export default MainLayoutGrid;
