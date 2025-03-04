"use client";
import { user } from "@/configs/axios";
import { prohibitedPaths } from "@/configs/userProhibitedPaths";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const PathChangeDetector = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (user.role === "company") {
      const found = prohibitedPaths.includes(pathname);

      if (found) {
        window.location.replace("/dashboard");
      }
    }
  }, [pathname]);

  useEffect(() => {
    console.log("user data here", user);
    if (
      user["token"] &&
      pathname.includes("/pending-approval") &&
      user?.is_active === 1
    ) {
      window.location.replace("/dashboard");
      return;
    }
    if (
      user["token"] &&
      pathname.includes("/dashboard") &&
      user?.is_active !== 1
    ) {
      window.location.replace("/pending-approval");
    }
    if (!user["token"] && pathname.includes("/dashboard")) {
      window.location.replace("/login");
    }
  }, [pathname]);

  return null;
};

export default PathChangeDetector;
