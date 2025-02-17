"use client";
import React, { useDeferredValue, useState } from "react";
import ManifyingGlass from "@/components/icons/ManifyingGlass";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { paths } from "@/configs/paths";
import { ArrowDown } from "lucide-react";
import SideBarNav from "./SideBarNav";
import clsx from "clsx";
import Link from "next/link";
import { user } from "@/configs/axios";


const SearchInput = () => {
  const [search, setSearch] = useState<string>("");
  const searchValue = useDeferredValue(search);
  const [open, setOpen] = useState(false);
  const [filtered, setFiltered] = useState([]) 

  const handleFilter = (value : string)=> {
    let filtered = paths.flatMap(el => el.children ?? el)
    filtered = filtered.filter(el =>  {
      if(el.role.includes(user.role))
      {
        return (el.name.toLowerCase()).includes(value.toLowerCase())
      }
      else{
        return false
      }
    })
    setFiltered((filtered as any))
  }

  const handleSearch = (e : React.SyntheticEvent) => {
    const value =( e.target as any).value
    setSearch(value)
    handleFilter(searchValue)
  };

  const { t } = useTranslation();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="flex gap-4 sm:w-full mx-4  md:min-w-[300px] cursor-pointer  min-h-1 text-[#BABABA] py-2    sm:border-b-none md:border-b-[2px] border-b-[#e7e7e7] items-center text-sm bottom-1 ">
          <ManifyingGlass />
          <span className="sm:hidden md:block">{t("Search here...")}</span>
          
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            <div className="flex gap-4 justify-center items-center">

          <ManifyingGlass />
            <input
              type="text"
              onChange={handleSearch}
              className="  border-transparent w-full text-xl my-4 py-2 border-[2px] focus:outline-none"
              placeholder={t("Search here...")}
              value={searchValue}
              name="search"
              autoComplete="off"
            />
            </div>

            {searchValue.length >= 3  &&
              (filtered as any[]).map((nav, index) => (
                <>
                  
                     <Link
                     href={nav.path}
                     className={clsx(
                       "flex text-[#4A4A4A] bg-[#f3f3f3] mb-2  hover:bg-[#7655FA] p-2 transition-all rounded-md hover:text-[white] overflow-none text-nowrap  gap-4 "
                      
                     )}
                     onClick={()=> setOpen(false)}
                     
                   >
                     {nav.icon && <span className="mx-4"><nav.icon/></span>}
                     <p className=" text-base">{t(nav.name)}</p>
                   </Link>
                </>
                ))

              }
             
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SearchInput;
