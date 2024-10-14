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
import { useQuery, keepPreviousData,  } from "@tanstack/react-query";
import { Companies, Dashboard } from "@/configs/apiRoutes";
import { AxiosResponse } from "axios";


const CompaniesMainCont = () => {
  const [open, setOpen] = useState(false);

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
      const searchedData = (companies?.data['data'] as any).filter((el : any, index: number) => {
        return (el as any)[name].toLowerCase().includes(value.toLowerCase());
      });
      setFilteredData(searchedData as any);
    } 
  };

  return (
    <>
      <div className="flex gap-4">
        <KPICard
          title="Total Companies"
          value={kpis?.data.data['total_users'] || "0"}
          currency=""
          icon={<Building2 />}
        />
        <KPICard
          title="Active Companies"
          value={kpis?.data.data['active_users'] || "0"}
          currency=""
          icon={<Building2 />}
        />
        <KPICard
          title="Inactive Companies"
          value={kpis?.data.data['inactive_users'] || "0"}
          currency=""
          icon={<Building2 />}
        />
        <KPICard
          title="Stripe Connected"
          value={kpis?.data.data['stripe_connected'] || "0"}
          currency=""
          icon={<Building2 />}
        />
      </div>

      <div className="flex mt-6 justify-between gap-4">
        <h1 className="text-[#4a4a4a] text-lg font-semibold">
          All Companies{" "}
          {`(${
            filteredData.length > 0
              ? filteredData.length
              : companies?.data.data.length || 0
          })`}
        </h1>
        <div className="flex gap-4">
          <span className="flex place-items-center bg-white gap-2 rounded-md border-[2px] p-1">
            <Search size={18} />
            <input
              placeholder={"Search Companies..."}
              onChange={(event) => handleSearch(event.target.value, "full_name")}
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
                onClick={() => handleSearch("1", "is_active")}
              >
                <span>Active</span>
                <CircleCheckBig size={15} />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center justify-between"
                onClick={() => handleSearch("0", "is_active")}
              >
                <span>Inactive</span>
                <CircleCheckBig size={15} />
              </DropdownMenuItem>

              <DropdownMenuLabel>Stripe</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex items-center justify-between"
                onClick={() => handleSearch("1", "stripe_account_status")}
              >
                <span>Connected</span>
                <CircleCheckBig size={15} />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center justify-between"
                onClick={() => handleSearch("0", "stripe_account_status")}
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
                name={el["full_name"]}
                phone={el["phone"] || "No Phone"}
                address={el["address"] || "No Address"}
                email={el["email"]}
                isActive={el["is_active"]}
                stripe={el["stripe_account_status"]}
                logo={el["photo"] || ""}
              />
          ))}
        </div>
      )}

      {filteredData.length <= 0 && (
        <div className="flex  gap-4 flex-wrap">
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
              />
            ))}
        </div>
      )}
    </>
  );
};

export default CompaniesMainCont;
