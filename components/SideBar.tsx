"use client";
import React, { useState } from "react";
import clsx from "clsx";

const SideBar = () => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const handleHover = (state: boolean) => setIsHover(state);

  return (
    <div
      className={clsx(
        !isHover && "w-[4rem]",
        "w-[20rem] min-h-[95vh] bg-[#fffefe] "
      )}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      SideBar
    </div>
  );
};

export default SideBar;
