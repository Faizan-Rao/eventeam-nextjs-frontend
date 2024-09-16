"use client";
import CompanyEventCard from "@/components/CompanyEventCard";
import CompanyFooter from "@/components/CompanyFooter";
import CompanyHeader from "@/components/CompanyHeader";
import {
  AtSign,
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CompaniesEvent = () => {
  return (
    <div className="flex flex-col flex-wrap">
    <CompanyHeader/>
      {/* Main Event Publish Container */}
      <div className="container flex flex-wrap  gap-10">
        <CompanyEventCard />
        <CompanyEventCard />
        <CompanyEventCard />
        <CompanyEventCard />
        <CompanyEventCard />
        <CompanyEventCard />
      </div>

    <CompanyFooter/>
    </div>
  );
};

export default CompaniesEvent;
