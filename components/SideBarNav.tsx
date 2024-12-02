'use client'
import Link from "next/link";
import React, { memo, SetStateAction } from "react";
import clsx from "clsx";

interface ISidebarNav {
  isHover?: boolean;
  value: string;
  href?: string;
  className?: string;
  icon?: any;
  setNavOpen : React.Dispatch<SetStateAction<boolean>>
}

const SideBarNav: React.FC<ISidebarNav> = ({
  isHover = false,
  setNavOpen,
  value = "",
  href = "#",
  className = "",
  icon,
}) => {
  return (
    <>
      <Link
        href={href}
      onClick={(event)=>{
        if(window.innerWidth <= 500)
        {
          setNavOpen(false)
        }
      }}
        className={clsx(
          "flex text-[#4A4A4A]  hover:bg-[#7655FA] p-2 transition-all rounded-md hover:text-[white] overflow-none text-nowrap  gap-4 ",
          className
        )}
      >
        {icon && (
          <span className="mx-4">
        {icon}
          </span>
        )}
        { <p className={clsx("font-semibold block ", isHover && "md:block", !isHover && "md:hidden" )}>{value}</p>}
      </Link>
    </>
  );
};

export default memo(SideBarNav);
