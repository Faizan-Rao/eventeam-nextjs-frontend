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

const SideBar = () => {
  const { t } = useTranslation(["translation"]);
  const [isHover, setIsHover] = useState<boolean>(false);
  const handleHover = (state: boolean) => setIsHover(state);
  const hover = useMemo(() => isHover, [isHover]);
  const ref = useRef(Array(paths.length).fill(createRef()));
  const toggleList = (id: number) => {
    console.log(ref.current[id].classList.toggle("hidden"));
  };

  return (
    <div
      className={clsx(
        !isHover && "w-[50px] items-center ",
        "w-[20rem] min-h-[100vh]  bg-[#fffefe] border-t-2 transition-all duration-300 p-1 flex justify-between  flex-col z-[2000] "
      )}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      {isHover && (
        <span className=" overflow-hidden sm:flex md:hidden  items-center text-nowrap">
          <ProfileDropdown />
          <LanguageSelector />
        </span>
      )}

      <div className="flex  flex-col my-auto overflow-hidden gap-4" >
        {paths.map((nav, index) => (
          <div key={nav.path + index}>
            {!nav.children && (
              <SideBarNav
                href={nav.path}
                value={t(nav.name)}
                icon={nav.icon}
                isHover={hover}
                key={nav.path + index}
              />
            )}

            {nav.children && (
              <>
                <div
                 key={nav.path + index}
                  onClick={() => toggleList(index)}
                 
                  className="flex text-[#4A4A4A]   p-2 transition-all rounded-md  items-center cursor-pointer overflow-none text-nowrap  gap-4 "
                >
                  {nav.icon && <span  className="mx-4">{nav.icon}</span>}
                  {isHover && (
                    <>
                      <p className="font-semibold">{t(nav.name)}</p>
                      <ArrowDown />
                    </>
                  )}
                </div>
                {isHover && (
                  <div
                  key={nav.path + index}
                    ref={(elref) => (ref.current[index] = elref) as any}
                    className="border-[2px] hidden transition-all bg-[#efefef] rounded-md mx-4 "
                  >
                    {nav.children.map((subnav, index) => (
                      <SideBarNav
                        href={subnav.path}
                        value={t(subnav.name)}
                        icon={subnav.icon}
                        isHover={hover}
                        key={subnav.path + index}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      <div className="flex border-t-[2px] mt-4 overflow-hidden gap-4">
        <Link
          href={"#"}
          className="flex text-[#4A4A4A]  p-2 transition-all duration-300 rounded-md   gap-4 "
        >
          <span className="mx-4">
            <Info />
          </span>
          {isHover && (
            <p className=" text-nowrap font-semibold">{t("Help & Support")}</p>
          )}
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
