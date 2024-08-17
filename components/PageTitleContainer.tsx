"use client";

import React from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface IPageTitleContainer {
  title : string,
  className? : string
}

const PageTitleContainer: React.FC<IPageTitleContainer> = ({
  title,
  className
}) => {
  const pathname = usePathname();

  const pageLinkFormat = (): string => {
    const path = pathname
      .replaceAll("-", " ")
      .slice(1)
      .split("/")
      .map((e) => ((e as any) = e[0].toUpperCase() + e.slice(1)))
      .join(" / ");

    return path;
  };

  return (
    <div className={clsx("flex mt-7  justify-between  items-center", className)}>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-[#999999]">{pageLinkFormat()}</p>
        <h1 className="font-semibold text-4xl">{title}</h1>
      </div>
    </div>
  );
};

export default PageTitleContainer;
