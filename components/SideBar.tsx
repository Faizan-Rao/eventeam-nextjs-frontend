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
import { ChevronDown, ChevronUp } from "lucide-react";
import {user} from '@/configs/axios'

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
    if (window.innerWidth > mobileWidth) {
      setIsHover(false);
      setNavOpen(true);
    } else {
      setIsHover(false);
      setNavOpen(false);
    }
  }, [setNavOpen]);

  
  return (
    <>
      {!isNavOpen && (
        <button
          className={clsx(
            "text-[#4a4a4a] mx-2 my-2 self-center sm:hidden md:block transtion-all bg-white  max-w-[30px]   rounded-full"
          )}
          onClick={() => {
            setIsHover(false);
            setNavOpen((prev) => !prev);
          }}
        >
          <ChevronDown size={22} strokeWidth={1.5} />
        </button>
      )}

      <div
        className={clsx(
          "sm:w-full overflow-hidden   sm:absolute  md:min-h-[100vh] left-0  md:sticky z-10   md:top-[-20px]     sm:min-h-[100%]       md:w-[20rem]     bg-[#ffffff]   duration-300 transition-all p-1 flex   flex-col  ",
          !isHover && "sm:w-full md:w-[50px] items-center ",
          isNavOpen &&
            "sm:flex sm:h-auto  sm:min-h-[90.8vh] md:min-h-[100vh]   p-6   min-w-full ",
          !isNavOpen && "sm:min-h-0  bg-[transparent]   sm:invisible "
        )}
        onMouseEnter={() => {
          if (window.innerWidth > mobileWidth && isNavOpen === true)
            handleHover(true);
        }}
        onMouseLeave={() => {
          if (window.innerWidth > mobileWidth) handleHover(false);
        }}
      >
        <div
          className={clsx(
            "flex flex-col   gap-4 sm:overflow-y-auto md:overflow-x-hidden sm:h-[50vh] md:h-auto",
            isNavOpen && "sm:h-auto",
            !isNavOpen && "sm:h-0 hidden"
          )}
        >
          <button
            className={clsx(
              "text-[#4a4a4a] self-center sm:hidden md:block transtion-all bg-white  max-w-[30px]   rounded-full"
            )}
            onClick={() => {
              setIsHover(false);
              setNavOpen((prev) => !prev);
            }}
          >
            <ChevronDown size={22} strokeWidth={1.5} />
          </button>
          {paths.map((nav, index) => (
        nav.role.includes(user.role) &&  <div key={index + +3}>
              {!nav.children &&   (
                <SideBarNav
                  setNavOpen={setNavOpen}
                  href={nav.path}
                  value={t(nav.name)}
                  icon={<nav.icon strokeWidth={1} />}
                  isHover={isHover}
                  key={nav.path + index}
                  className="rounded-none"
                />
              )}

              {nav.children &&  (
                <>
                  <div
                    key={index + +1}
                    onClick={() => toggleList(index)}
                    className="flex text-[#4A4A4A]   p-2 transition-all rounded-md  cursor-pointer overflow-none text-nowrap  gap-4 "
                  >
                    {nav.icon && (
                      <span className="mx-4">
                        {<nav.icon strokeWidth={1}  />}
                      </span>
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
                      key={index + +2}
                      ref={(elref) => (ref.current[index] = elref) as any}
                      className={clsx(
                        "border-[1px] hidden overflow-hidden transition-all  bg-[#fbfbfb72]    w-full rounded-lg ",
                        !isHover && "hidden"
                      )}
                    >
                      {nav.children.map((subnav, index) => (
                        subnav.role.includes(user.role) && <SideBarNav
                          setNavOpen={setNavOpen}
                          href={subnav.path}
                          value={t(subnav.name)}
                          icon={<nav.icon strokeWidth={1} size={18} className="mr-2" />}
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

        {/* Profile Section */}
        <span
          className={clsx(
            " overflow-hidden sm:block md:hidden mt-10 sm:mb-10  items-center  text-nowrap",
            isHover && "block",

            !isNavOpen && "sm:h-0 "
          )}
        >
          <div className="flex ">

          <ProfileDropdown />
          <LanguageSelector />
          </div>
          <div
            className={clsx(
              " gap-4 hidden mx-auto",
              isNavOpen && "sm:h-auto self-center block",
              !isNavOpen && "sm:h-0 hidden sm:mx-auto"
            )}
          >
            <Link
              href={"#"}
              className="flex text-[#4A4A4A]  p-2 transition-all duration-300 rounded-md   gap-4 "
            >
              <span className="mx-4">
                <Info />
              </span>

              <p
                className={clsx(
                  "  text-nowrap font-semibold",
                  isHover && "block",
                  !isHover && "hidden"
                )}
              >
                {t("Help & Support")}
              </p>
            </Link>
          </div>
        </span>

        {/* Help & Information */}
        {isHover && isNavOpen && (
          <div
            className={clsx(
              "flex gap-4",
              isNavOpen && "  block",
              // !isNavOpen && "sm:h-0 hidden"
            )}
          >
            <Link
              href={"#"}
              className="flex text-[#4A4A4A] mt-[10rem]  p-2 transition-all duration-300 rounded-md   gap-4 "
            >
              <span className="mx-4">
                <Info />
              </span>

              <p
                className={clsx(
                  "  text-nowrap font-semibold",
                  isHover && "block",
                  !isHover && "hidden"
                )}
              >
                {t("Help & Support")}
              </p>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default SideBar;
