"use client";
import React, { useEffect, useState, useMemo, useRef, createRef } from "react";
import clsx from "clsx";
import Link from "next/link";
import Info from "./icons/Info";
import SideBarNav from "./SideBarNav";
import { paths } from "@/configs/paths";
import ArrowDown from "./icons/ArrowDown";

import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";
import ProfileDropdown from "./ProfileDropdown";
import { ChevronDown } from "lucide-react";
export const mobileWidth = 500;
const SideBar = ({
  isNavOpen,
  setNavOpen,
}: {
  isNavOpen: boolean;
  setNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { t } = useTranslation(["translation"]);
  const [isHover, setIsHover] = useState<boolean>(false);
  const handleHover = (state: boolean) => setIsHover(state);

  const ref = useRef(Array(paths.length).fill(createRef()));
  const toggleList = (id: number) => {
    ref.current[id].classList.toggle("hidden");
  };
 



  useEffect(() => {
    if (window.innerWidth > mobileWidth ) {
      setIsHover(false);
      setNavOpen(false);
    } else {
      setIsHover(false);
      setNavOpen(true);
    }
  }, [setNavOpen]);



  return (
    <div
      className={clsx(
        "sm:w-full   sm:fixed md:min-h-auto left-0  md:sticky    md:top-0    sm:min-h-screen       md:w-[20rem]     bg-[#ffffff]   duration-300 transition-all p-1 flex justify-between  flex-col  ",
        !isHover && "sm:w-full md:w-[50px] items-center ",
        isNavOpen &&
          "sm:flex sm:h-auto  sm:min-h-[100vh]  p-6   min-w-full ",
        !isNavOpen && "sm:min-h-0  bg-[transparent] sm:h-0   "
      )}
      onMouseEnter={() => {
        if (window.innerWidth > mobileWidth && (isNavOpen === true)) handleHover(true);
      }}
      onMouseLeave={() => {
        if (window.innerWidth > mobileWidth ) handleHover(false);
      }}
    >
       <button
            className="text-[#4a4a4a] sm:hidden md:block  bg-white rounded-full"
            onClick={() => setNavOpen((prev) => !prev)}
          >
            <ChevronDown/>
          </button>
      <div
        className={clsx(
          "flex flex-col my-auto  gap-4",
         isNavOpen && "sm:h-auto",
          !isNavOpen && "sm:h-0 hidden"
        )}
      >
        {paths.map((nav, index) => (
          <div key={(nav as any).path + index}>
            {!nav.children && (
              <SideBarNav
                href={nav.path}
                value={t(nav.name)}
                icon={<nav.icon strokeWidth={1} />}
                isHover={isHover}
                key={nav.path + index}
                className="rounded-none"
              />
            )}

            {nav.children && (
              <>
                <div
                  key={(nav as any).path + index}
                  onClick={() => toggleList(index)}
                  className="flex text-[#4A4A4A]   p-2 transition-all rounded-md  items-center cursor-pointer overflow-none text-nowrap  gap-4 "
                >
                  {nav.icon && (
                    <span className="mx-4">{<nav.icon strokeWidth={1} />}</span>
                  )}
                  {
                    <>
                      <p
                        className={clsx(
                          "font-semibold  flex text-nowrap justify-center items-center gap-4",

                          !isHover && "md:hidden"
                        )}
                      >
                        {t(nav.name)}

                        <ArrowDown />
                      </p>
                    </>
                  }
                </div>
                {
                  <div
                    key={(nav as any).path + index}
                    ref={(elref) => (ref.current[index] = elref) as any}
                    className={clsx(
                      "border-[2px] hidden overflow-hidden transition-all bg-[#efefef] rounded-md mx-4 ",
                      !isHover && "hidden"
                    )}
                  >
                    {nav.children.map((subnav, index) => (
                      <SideBarNav
                        href={subnav.path}
                        value={t(subnav.name)}
                        icon={<nav.icon strokeWidth={1} />}
                        isHover={isHover}
                        key={subnav.path + index}
                        className="rounded-none"
                      />
                    ))}
                  </div>
                }
              </>
            )}
          </div>
        ))}
      </div>

      <span
        className={clsx(
          " overflow-hidden sm:flex md:hidden  items-center text-nowrap",
          isHover && "block",
          
          !isNavOpen && "sm:h-0 "
        )}
      >
        <ProfileDropdown />
        <LanguageSelector />
      </span>

      <div className={clsx("flex  mt-4 gap-4",
          
          !isNavOpen && "sm:h-0 hidden"
      )}>
        <Link
          href={"#"}
          className="flex text-[#4A4A4A]  p-2 transition-all duration-300 rounded-md   gap-4 "
        >
          <span className="mx-4">
            <Info />
          </span>

          <p
            className={clsx(
              " sm:block md:hidden text-nowrap font-semibold",
              isHover && "block",
              !isHover && "hidden",
               isNavOpen && " sm:h-full ",
          !isNavOpen && "sm:h-0 "
            )}
          >
            {t("Help & Support")}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
