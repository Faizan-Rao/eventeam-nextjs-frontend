import React from "react";
import Logo from "@/components/icons/Logo";
import clsx from "clsx";
import SearchInput from "./SearchInput";
import ProfileDropdown from "./ProfileDropdown";

export interface IMainHeader {
 
}

const Header : React.FC<IMainHeader> = () => {
  return (
    <>
      <div
        className={clsx(
          "bg-[var(--bg-secondary)] min-w-[100%]  text-white w-full flex justify-between items-center"
        )}
      >
        <div className="mx-4 my-2 flex justify-center items-center gap-4">
          <Logo />
          <h1 className="text-[#4A4A4A] text-xl font-bold ">EvenTeam</h1>
        </div>

        <SearchInput />

        <ProfileDropdown/>
      </div>
    </>
  );
};

export default Header;
