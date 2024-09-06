import React, { useEffect } from "react";
import Logo from "@/components/icons/Logo";
import clsx from "clsx";
import SearchInput from "./SearchInput";
import ProfileDropdown from "./ProfileDropdown";
import LanguageSelector from "./LanguageSelector";
import { Menu } from "lucide-react";

const Header = ({
  setNavOpen,
  isNavOpen
}: {
  isNavOpen: boolean,
  setNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    if (window.innerWidth > 500) {
      setNavOpen(false);
    }
  }, [setNavOpen]);

  return (
    <>
      <div
        className={clsx(
          " bg-white  container min-w-full  text-white  flex justify-between items-center",
          isNavOpen && "sm:sticky sm:top-0 md:relative sm:z-10"
        )}
      >
        <div className="mx-4 my-2 flex justify-center items-center gap-4">
          <Logo />
          <h1 className="text-[#4A4A4A]  text-xl font-bold ">EvenTeam</h1>
        </div>

        {
          <div className="sm:hidden md:block">
            <SearchInput />
          </div>
        }
        <span className="sm:hidden md:flex    flex-wrap">
          <ProfileDropdown />
          <LanguageSelector />
        </span>

          <button
            className="text-black sm:block md:hidden"
            onClick={() => setNavOpen((prev) => !prev)}
          >
            <Menu/>
          </button>
        
      </div>
    </>
  );
};

export default Header;
