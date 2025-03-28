"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { paths } from "@/configs/paths";
import Link from "next/link";
import { user } from "@/configs/axios";
import { useTranslation } from "react-i18next";
interface IPageTitleContainer {
  title: string;
  className?: string;
}

interface Paths {
  name: string;
  path: string;
  icon: string;
  role: string[];
}
[];

const PageTitleContainer: React.FC<IPageTitleContainer> = ({
  title,
  className,
}) => {
  const pathname = usePathname();
  const [subPaths, setSubPaths] = useState<Array<Paths>>([]);
  const {t} = useTranslation(["translation"])
  useEffect(() => {
    paths.map((el, index) => {
      el.children &&
        el.children.map((item) => {
          if (item.path === pathname ) {
            
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
      className={clsx("flex sm:my-2 md:my-6  justify-between  items-center", className)}
    >
      <div className="flex sm:p-4 md:p-2 flex-col gap-1">
        <p className="text-sm font-semibold text-[#999999]">
          {pageLinkFormat()}
        </p>
        <h1 className="font-semibold  sm:text-2xl md:text-4xl">{t(title)}</h1>
      </div>
      <div className="sm:hidden md:flex  gap-4">
        { subPaths.length > 0 &&
          subPaths.map((el) => {
            return el.role.includes(user.role) && (
             <Link
                key={el.path}
                href={el.path}
                className={clsx(
                  "flex items-center active:scale-[0.95] transition-all gap-4 text-[#4a4a4a] font-semibold",
                  pathname === el.path &&
                    "bg-[#7655fa26] px-4 py-2 rounded-full  "
                )}
              >
               
                <span className="text-base ">{t(el.name)}</span>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default PageTitleContainer;
