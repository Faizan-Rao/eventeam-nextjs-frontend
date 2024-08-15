"use client";

import React from "react";
import { usePathname } from "next/navigation";

const PageTitleContainer = () => {
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
    <div className="flex justify-between  items-center">
      <div className="flex flex-col gap-1">
        <p className="text-sm">{pageLinkFormat()}</p>
        <h1 className="font-bold text-3xl">My Events</h1>
      </div>
    </div>
  );
};

export default PageTitleContainer;
