"use client";
import React, { useState } from "react";
import CompanyCard from "./CompanyCard";
import KPICard from "./KPICard";
import { Building2, CircleCheckBig, ListFilter, Search } from "lucide-react";
import CompanyAddDialog from "./AddCompanyDialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import _ from "lodash";

const data = [
  {
    logo: "/profile_logo.svg",
    name: "evenTeam",
    loggedin: false,
    phone: "+920000000",
    address: "789 Willowbrook Lane, Apt 22B, Los Angeles, CA",
    email: "company@mail.com",
    stripe: true,
  },
  {
    logo: "/profile_logo.svg",
    name: "evenTeam",
    loggedin: false,
    phone: "+920000000",
    address: "789 Willowbrook Lane, Apt 22B, Los Angeles, CA",
    email: "company@mail.com",
    stripe: true,
  },
  {
    logo: "/profile_logo.svg",
    name: "Meta",
    loggedin: true,
    phone: "+920000000",
    address: "789 Willowbrook Lane, Apt 22B, Los Angeles, CA",
    email: "company@mail.com",
    stripe: false,
  },
  {
    logo: "/profile_logo.svg",
    name: "Steam",
    loggedin: false,
    phone: "+920000000",
    address: "789 Willowbrook Lane, Apt 22B, Los Angeles, CA",
    email: "company@mail.com",
    stripe: true,
  },
];

const CompaniesMainCont = () => {
  const [open, setOpen] = useState(false);
  const [filteredData, setFilteredData] = useState<any>([]);

  const handleSearch = (value: any, name: string) => {
    if (_.isString(value)) {
      const searchedData = data.filter((el, index) => {
        return (el as any)[name].toLowerCase().includes(value.toLowerCase());
      });
      setFilteredData(searchedData as any);
    } else {
      const searchedData = data.filter((el, index) => {
        return (el as any)[name] === value;
      });
      setFilteredData(searchedData as any);
    }
  };

  return (
    <>
      <div className="flex gap-4">
        <KPICard
          title="Total Companies"
          value="0"
          currency=""
          icon={<Building2 />}
        />
        <KPICard
          title="Active Companies"
          value="0"
          currency=""
          icon={<Building2 />}
        />
        <KPICard
          title="Inactive Companies"
          value="0"
          currency=""
          icon={<Building2 />}
        />
        <KPICard
          title="Stripe Connected"
          value="0"
          currency=""
          icon={<Building2 />}
        />
      </div>

      <div className="flex mt-6 justify-between gap-4">
        <h1 className="text-[#4a4a4a] text-lg font-semibold">
          All Companies{" "}
          {`(${filteredData.length > 0 ? filteredData.length : data.length})`}
        </h1>
        <div className="flex gap-4">
          <span className="flex place-items-center bg-white gap-2 rounded-md border-[2px] p-1">
            <Search size={18} />
            <input
              placeholder={"Search Companies..."}
              onChange={(event) => handleSearch(event.target.value, "name")}
              className="max-w-sm outline-none text-base bg-transparent "
            />
          </span>

          <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger>
              <button className="flex text-base bg-white  place-items-center gap-2 px-4 rounded-md py-2 border-[2px]">
                <ListFilter size={20} />
                Filter
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Active State</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex items-center justify-between"
                onClick={() => handleSearch(true, "loggedin")}
              >
                <span>Active</span>
                <CircleCheckBig size={15} />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center justify-between"
                onClick={() => handleSearch(false, "loggedin")}
              >
                <span>Inactive</span>
                <CircleCheckBig size={15} />
              </DropdownMenuItem>

              <DropdownMenuLabel>Stripe</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex items-center justify-between"
                onClick={() => handleSearch(true, "stripe")}
              >
                <span>Connected</span>
                <CircleCheckBig size={15} />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center justify-between"
                onClick={() => handleSearch(false, "stripe")}
              >
                <span>Disconnected</span>
                <CircleCheckBig size={15} />
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <span className="flex gap-3 flex-1">
                <button
                  className=" text-[#FF2727] my-4 px-4 py-1"
                  onClick={() => {
                    setFilteredData([]);
                  }}
                >
                  Clear Filters
                </button>

                <button
                  className=" bg-[#7655FA] text-white rounded-full my-4 px-6 py-1"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Close
                </button>
              </span>
            </DropdownMenuContent>
          </DropdownMenu>
          <CompanyAddDialog />
        </div>
      </div>

      {filteredData.length > 0 && (
        <div className="flex gap-4 flex-wrap">
          {(filteredData as any[]).map((el, key) => (
            <CompanyCard
              key={key}
              name={el.name}
              phone={el.phone}
              address={el.address}
              email={el.email}
              loggedin={el.loggedin}
              stripe={el.stripe}
              logo={el.logo}
            />
          ))}
        </div>
      )}

      {filteredData.length <= 0 && (
        <div className="flex  gap-4 flex-wrap">
          {data.map((el, key) => (
            <CompanyCard
              key={key}
              name={el.name}
              phone={el.phone}
              address={el.address}
              email={el.email}
              loggedin={el.loggedin}
              stripe={el.stripe}
              logo={el.logo}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default CompaniesMainCont;
