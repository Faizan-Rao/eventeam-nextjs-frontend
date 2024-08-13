'use client'
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ArrowDown from "@/components/icons/ArrowDown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = ()=> setOpen(false)
  return (
    <>
      <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger>
          <div className="flex justify-center items-center gap-2 py-1 px-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" height={100} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="flex flex-col text-left  ">
              <h4 className="text-[14px] text-[#4A4A4A] font-semibold">User Name</h4>
              <p className="text-[12px] text-[#999999]">Company</p>
            </div>

            <ArrowDown />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          
          <DropdownMenuItem onClick={handleOpen} >Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={handleOpen} >Billing</DropdownMenuItem>
          <DropdownMenuItem onClick={handleOpen} >Team</DropdownMenuItem>
          
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProfileDropdown;
