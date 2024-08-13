import Link from "next/link";
import React, { memo } from "react";
import clsx from "clsx";

interface ISidebarNav {
  isHover?: boolean;
  value: string;
  href?: string;
  className?: string;
  icon?: React.ReactNode;
}

const SideBarNav: React.FC<ISidebarNav> = ({
  isHover = false,
  value = "",
  href = "#",
  className = "",
  icon,
}) => {
  return (
    <>
      <Link
        href={href}
        className={clsx(
          "flex text-[#4A4A4A]  hover:bg-[#7655FA] p-2 transition-all rounded-md hover:text-[white] overflow-none text-nowrap  gap-4 ",
          className
        )}
      >
        {icon && <span className="mx-4">{icon}</span>}
        {isHover && <p className="font-semibold">{value}</p>}
      </Link>
    </>
  );
};

export default memo(SideBarNav);
