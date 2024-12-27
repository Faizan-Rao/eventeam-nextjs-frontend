"use client";
import React, { useEffect } from "react";
import DashboardGrid from "@/components/DashboardGrid";
import { useRouter, usePathname } from "next/navigation";
import {user} from "@/configs/axios"

const Dashboard = () => {
  
  const router = useRouter();
  const pathname = usePathname()

  useEffect(() => {
    const recentLogin = localStorage.getItem("recent-login")
    if(recentLogin === "1")
    {
      localStorage.setItem("recent-login", "0")
      window.location.href = "/dashboard"
    }
    if (!user["token"] && pathname.includes("/dashboard")) {
      if(user.role === "admin" && pathname.includes("/my-events/") && pathname.includes("/add-event"))
      {
        router.replace("/login");
      }

      if(user.role === "company" && pathname.includes("/my-events/") && pathname.includes("/add-event"))
        {
          router.replace("/login");
        }
      router.replace("/login");
    }
  }, [pathname, router]);

  return (user && <DashboardGrid />);
};

export default Dashboard;
