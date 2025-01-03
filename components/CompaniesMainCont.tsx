"use client";
import React, { useState } from "react";
import CompanyCard from "./CompanyCard";
import KPICard from "./KPICard";
import {
  Building2,
  CircleCheck,
  CircleCheckBig,
  ListFilter,
  Search,
} from "lucide-react";
import CompanyAddDialog from "./AddCompanyDialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import _, { set } from "lodash";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Companies, Dashboard } from "@/configs/apiRoutes";
import { AxiosResponse } from "axios";
import clsx from "clsx";

const CompaniesMainCont = () => {
  const [open, setOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");

  const {
    isPending: isCompaniesPending,
    isError: isCompaniesError,
    data: companies,
    error: companiesError,
  } = useQuery({
    queryKey: ["companies"],
    queryFn: Companies.get,
  });

  const {
    isPending: kpiResponsePending,
    data: kpis,
    error: kpiError,
  } = useQuery({
    queryKey: ["kpis"],
    queryFn: Dashboard.getKPI,
  });
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (value: any, name: string) => {
    if (_.isString(value)) {
      const searchedData = (companies?.data["data"] as any).filter(
        (el: any, index: number) => {
          return (el as any)[name].toLowerCase().includes(value.toLowerCase());
        }
      );
      setFilteredData(searchedData as any);
    } else {
      const searchedData = (companies?.data["data"] as any).filter(
        (el: any, index: number) => {
          return (el as any)[name] === value;
        }
      );
      setFilteredData(searchedData as any);
    }
  };

  console.log("companies", companies);
  return (
    <>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        <KPICard
          title="Total Companies"
          value={kpis?.data.data["total_companies"] || "0"}
          currency=""
          icon={<Building2 />}
        />
        <KPICard
          title="Active Companies"
          value={kpis?.data.data["active_companies"] || "0"}
          currency=""
          icon={<Building2 />}
        />
        <KPICard
          title="Inactive Companies"
          value={kpis?.data.data["inactive_companies"] || "0"}
          currency=""
          icon={<Building2 />}
        />
        <KPICard
          title="Stripe Connected"
          value={kpis?.data.data["stripe_connected"] || "0"}
          currency=""
          icon={<Building2 />}
        />
      </div>

      <div className="grid items-center sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mx-2">
        <h1 className="text-[#4a4a4a] text-lg font-semibold">
          All Companies{" "}
          {`(${
            filteredData.length > 0
              ? filteredData.length
              : companies?.data.data.length || 0
          })`}
        </h1>
        <div className="flex justify-self-end sm:gap-1 md:gap-4">
          <span className="flex place-items-center bg-white gap-2 rounded-md border-[2px] p-1">
            <Search size={18} />
            <input
              placeholder={"Search Companies..."}
              onChange={(event) =>
                handleSearch(event.target.value, "full_name")
              }
              className="max-w-sm outline-none text-base bg-transparent "
            />
          </span>

          <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger>
              <button className="flex sm:text-sm md:text-base bg-white  place-items-center gap-2 px-4 rounded-md py-2 border-[2px]">
                <ListFilter size={20} />
                Filter
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Active State</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex items-center justify-between active:scale-[0.95] transition-all"
                onClick={() => {
                  setSelectedFilter("active");
                  handleSearch(1, "is_active");
                }}
              >
                <span>Active</span>
                <div
                  className={clsx(
                    selectedFilter === "active" &&
                      "bg-[#7655fa] rounded-full text-white"
                  )}
                >
                  <CircleCheck size={18} strokeWidth={1.4} />
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center justify-between active:scale-[0.95] transition-all"
                onClick={() => {
                  setSelectedFilter("inactive");
                  handleSearch(0, "is_active");
                }}
              >
                <span>Inactive</span>
                <div
                  className={clsx(
                    selectedFilter === "inactive" &&
                      "bg-[#7655fa] rounded-full text-white"
                  )}
                >
                  <CircleCheck size={18} strokeWidth={1.4} />
                </div>
              </DropdownMenuItem>

              <DropdownMenuLabel>Stripe</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex items-center justify-between active:scale-[0.95] transition-all"
                onClick={() => {
                  setSelectedFilter("connected");
                  handleSearch(1, "stripe_account_status");
                }}
              >
                <span>Connected</span>
                <div
                  className={clsx(
                    selectedFilter === "connected" &&
                      "bg-[#7655fa] rounded-full text-white "
                  )}
                >
                  <CircleCheck size={18} strokeWidth={1.4} />
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center justify-between active:scale-[0.95] transition-all" 
                onClick={() => {
                  setSelectedFilter("disconnected");
                  handleSearch(0, "stripe_account_status");
                }}
              >
                <span>Disconnected</span>
                <div
                  className={clsx(
                    selectedFilter === "disconnected" &&
                      "bg-[#7655fa] rounded-full text-white"
                  )}
                >

                <CircleCheck size={18} strokeWidth={1.4} />
                </div>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <span className="flex gap-3 flex-1">
                <button
                  className=" text-[#FF2727]  text-sm my-4 px-4 py-1 active:scale-[0.95] transition-all"
                  onClick={() => {
                    setFilteredData([]);
                    setSelectedFilter("")
                    setOpen(false)
                  }}
                >
                  Clear Filters
                </button>

                <button
                  className=" bg-[#7655FA]  text-white rounded-full my-4 px-6 py-1 active:scale-[0.95] transition-all"
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
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {(filteredData as any[]).map((el, key) => (
            <CompanyCard
              key={key}
              name={el["full_name"]}
              phone={el["phone"] || "No Phone"}
              address={el["address"] || "No Address"}
              email={el["email"]}
              isActive={el["is_active"]}
              stripe={el["stripe_account_status"]}
              logo={el["photo"] || ""}
              slug={el["slug"]}
              id={el["id"]}
              data={el}
            />
          ))}
        </div>
      )}

      {filteredData.length <= 0 && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          {companies &&
            (companies.data.data as any[]).map((el: any, key: number) => (
              <CompanyCard
                key={key}
                name={el["full_name"]}
                phone={el["phone"] || "No Phone"}
                address={el["address"] || "No Address"}
                email={el["email"]}
                isActive={el["is_active"]}
                stripe={el["stripe_account_status"]}
                logo={el["photo"] || ""}
                slug={el["slug"]}
                id={el["id"]}
                data={el}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default CompaniesMainCont;
