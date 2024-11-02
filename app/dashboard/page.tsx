"use client";
import React, { useEffect } from "react";
import DashboardGrid from "@/components/DashboardGrid";
import { useRouter, usePathname } from "next/navigation";


const Dashboard = () => {
  
  const router = useRouter();
  const pathname = usePathname()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user["token"] && pathname.includes("/dashboard")) {
      router.replace("/login");
    }
  }, [pathname, router]);

  return <DashboardGrid />;
};

export default Dashboard;
