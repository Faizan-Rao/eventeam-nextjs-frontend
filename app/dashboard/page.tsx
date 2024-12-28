"use client";
import React, { useEffect } from "react";
import DashboardGrid from "@/components/DashboardGrid";
import { useRouter, usePathname } from "next/navigation";
import {user} from "@/configs/axios"

const Dashboard = () => {
  return <DashboardGrid />;
};

export default Dashboard;
