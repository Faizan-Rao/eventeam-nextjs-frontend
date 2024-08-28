"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { paths } from "@/configs/paths";
import Link from "next/link";
interface IPageTitleContainer {
  title: string;
  className?: string;
}

interface Paths {
  name: string;
  path: string;
  icon: string;
}
[];

const PageTitleContainer: React.FC<IPageTitleContainer> = ({
  title,
  className,
}) => {
  const pathname = usePathname();
  const [subPaths, setSubPaths] = useState<Array<Paths>>([]);

  useEffect(() => {
    paths.map((el, index) => {
      el.children &&
        el.children.map((item) => {
          if (item.path === pathname) {
            setSubPaths(el.children as any);
          }
        });
    });
  }, [pathname]);

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
    <div
      className={clsx("flex mt-7  justify-between  items-center", className)}
    >
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-[#999999]">
          {pageLinkFormat()}
        </p>
        <h1 className="font-semibold text-4xl">{title}</h1>
      </div>
      <div className="flex  gap-4">
        {subPaths.length > 0 &&
          subPaths.map((el) => {
            return (
              <Link
                key={el.path}
                href={el.path}
                className={clsx(
                  "flex items-center gap-4 text-[#4a4a4a] font-semibold",
                  pathname === el.path &&
                    "bg-[#7655fa26] px-4 py-2 rounded-full  "
                )}
              >
                <el.icon />
                <span className="text-base ">{el.name}</span>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default PageTitleContainer;
