"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import clsx from "clsx";
import { user } from "@/configs/axios";
import { usePathname } from "next/navigation";
import { Profile } from "@/configs/apiRoutes";
interface IMainLayoutGrid {
  children: React.ReactNode;
}

export const queryClient = new QueryClient();

const MainLayoutGrid: React.FC<IMainLayoutGrid> = ({ children }) => {
  const [isNavOpen, setNavOpen] = useState(true);

  const pathname = usePathname();
 

  

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header setNavOpen={setNavOpen} isNavOpen={isNavOpen} />
        <div className="md:flex  md:flex-row sm:grid sm:grid-cols-1">
          <div className="">
            <SideBar isNavOpen={isNavOpen} setNavOpen={setNavOpen} />
          </div>
          <div
            className={clsx(
              "md:flex flex-1 md:justify-stretch lg:justify-stretch",
              isNavOpen && "sm:hidden md:flex "
            )}
          >
            {children}
          </div>
        </div>
      </QueryClientProvider>
    </>
  );
};

export default MainLayoutGrid;
