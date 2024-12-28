"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ArrowDown from "@/components/icons/ArrowDown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Profile } from "@/configs/apiRoutes";
import { Skeleton } from "./ui/skeleton";
import { useRouter } from "next/navigation";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(false);
  const router = useRouter()
  const { data: profile , isError, isPending} = useQuery({
    queryKey: ["profile"],
    queryFn: Profile.get
  })
  const profileData = profile && profile?.data.data
  
  return (
    <>
    {
      !profileData && <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[90px]" />
        <Skeleton className="h-4 w-[60px]" />
      </div>
    </div>
    }
    { profileData &&  <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger>
          <div className="flex justify-center items-center gap-2 py-1 px-4">
            <Avatar>
              <AvatarImage src={profileData?.photo || "https://github.com/shadcn.png"} height={100} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="flex flex-col text-left  ">
              <h4 className="text-[14px] text-[#4A4A4A] font-semibold">
               {profileData?.full_name || "No Name"}
              </h4>
              <p className="text-[12px] text-[#999999]">{profileData?.email || "role"}</p>
            </div>

            <ArrowDown />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleOpen}>
            <Link
              href={"/dashboard/company-profile"}
              className="flex justify-between items-center gap-6"
            >
              <User size={18} />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleOpen}>Billing</DropdownMenuItem>
          <DropdownMenuItem onClick={()=>{
            localStorage.removeItem("user")
            let local = localStorage.getItem("user")
            if(!local)
            {
              
              router.replace("/login")
            }
            handleOpen()
          }}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>}
    </>
  );
};

export default ProfileDropdown;
