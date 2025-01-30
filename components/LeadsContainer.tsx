"use client";
import React, { useState, useDeferredValue } from "react";

import {
  Building,
  Building2,
  CircleX,
  Cross,
  Loader2,
  Search,
} from "lucide-react";

import _ from "lodash";
import LeadsCard from "./LeadsCard";
import { useQuery } from "@tanstack/react-query";
import { Companies, Leads } from "@/configs/apiRoutes";
import { Skeleton } from "./ui/skeleton";
import { CSVLink } from "react-csv";
import { format } from "date-fns";
import { set } from "react-hook-form";
import { toast } from "react-toastify";

const LeadsContainer = () => {
  const [open, setOpen] = useState(false);
  const [filteredData, setFilteredData] = useState<any>([]);
  const deferredFilter = useDeferredValue(filteredData);
  const [selectedRecord, setSelectedRecord] = useState(0);
  const [searchString, setSearchString] = useState("");
  const [searchCompanyString, setSearchCompanies] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState<any>([]);
  const [companyLeads, setCompanyLeads] = useState<any>([]);
  const [isPending, setIsPending] = useState(false);



  const {
    isPending: isCompaniesPending,
    isError: isCompaniesError,
    data: companies,
    error: companiesError,
  } = useQuery({
    queryKey: ["companies"],
    queryFn: Companies.get,
  });
  


  const headers = [
    { label: "Name", key: "name" },
    { label: "Event", key: "registration.event.title" },
    { label: "Phone", key: "phone" },
    { label: "Ticket", key: "ticket_type" },
    { label: "Date", key: "registration.event.created_at" },
  ];


  const handleCompanySearch = (value: any, name: string) => {
    const companiesData = companies?.data.data;
    if (_.isString(value)) {
      // console.log(value)
      const searchedData = companiesData.filter((el: any, index: number) => {
        console.log(el);
        return (el as any)[name].toLowerCase().includes(value.toLowerCase());
      });
      if (searchedData.length <= 0) {
        setFilteredCompanies([]);
        return;
      }
      setFilteredCompanies(searchedData as any);
    }
  };

  const handleLeads = async (id: any) => {
    try {
      const data = { company_id: id };
      const response = await Leads.getLeads(data);
      if (response.data.success) setCompanyLeads(response.data.data.leads);
      if (response.data.data.leads.length <= 0)
        toast("No Records Found", {
          type: "info",
        });
      setIsPending(false)
    } catch (error) {
      if ((error as any).status !== 200) {
        Object.values((error as any)?.response?.data.data ?? {}).forEach(
          (el: any) => {
            el.forEach((el: any) => {
              toast(el, { type: "error" });
            });
          }
        );
      }
      setIsPending(false)
    }
  };

  const handleSearch = (value: any, name: string) => {
    const leadData = companyLeads;
    if (_.isString(value)) {
      // console.log(value)
      const searchedData = leadData.filter((el: any, index: number) => {
        console.log(el);
        return (el as any)[name].toLowerCase().includes(value.toLowerCase());
      });
      if (searchedData.length <= 0) {
        setFilteredData([]);
        return;
      }
      setFilteredData(searchedData as any);
    }
   
  };

  return (
    <div className="flex flex-col gap-4 bg-white lg:p-6 md:rounded-lg min-h-screen">
      {companyLeads.length > 0 && (
        <div className="flex flex-wrap sm:px-5 md:px-0 p-4 justify-between gap-4 ">
          <h1 className="text-[#4a4a4a] self-center text-lg font-semibold">
            All Leads{" "}
            {`(${
              filteredData.length <= 0
                ? companyLeads?.length || 0
                : filteredData.length
            })`}
          </h1>
          <div className="grid grid-cols-2 gap-2">
            <span className="flex self-center  place-items-center bg-white gap-2 rounded-md border-[2px] p-1">
              <Search size={18} />
              <input
                placeholder={"Search Companies..."}
                onChange={(event) => {
                  handleSearch(event.target.value, "name");
                  setSearchString(event.target.value);
                }}
                value={searchString}
                className="sm:max-w-xs md:max-w-lg outline-none text-base bg-transparent "
              />
            </span>
            <div className="flex justify-center gap-4">
              <CSVLink
                headers={headers}
                filename={`EvenTeam - Leads ${format(
                  new Date(Date.now()),
                  "dd-MMM-yyyy"
                )}`}
                data={companyLeads || []}
                className="flex gap-4 justify-self-center md:ml-4 px-4 py-2 text-center bg-[#7655fa] rounded-full sm:text-sm md:text-base text-white active:scale-[0.95] transition-all"
              >
                Export CSV
              </CSVLink>
              <button
                className="rounded-full justify-self-center text-xl text-[red] cursor-pointer p-2"
                onClick={(e) => {
                  e.preventDefault();
                  setCompanyLeads([]);
                }}
              >
                <CircleX size={25} strokeWidth={1.2} />
              </button>
            </div>
          </div>
        </div>
      )}

      {companyLeads.length > 0 && searchString !== "" && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 justify-stretch lg:grid-cols-3 gap-4 ">
          {(deferredFilter as any[]).map((el, key) => (
            <LeadsCard
              key={el.id}
              name={el.name}
              phone={el.phone}
              address={el.address}
              email={el.email}
              loggedin={el.loggedin}
              stripe={el.stripe}
              logo={el.logo}
              ticket={el.ticket_type}
              event={el.registration.event.title}
              date={el.registration.event.created_at.split("T")[0]}
              index={key}
              selectedRecord={selectedRecord}
              setSelectedRecord={setSelectedRecord}
            />
          ))}
          {deferredFilter.length <= 0 && (
            <p className="font-semibold text-center border-dashed border-[4px] text-[#999999] py-6 w-full col-span-3 mt-4">
              {" "}
              No Results Found
            </p>
          )}
        </div>
      )}

      {companyLeads.length <= 0 && (
        <div className="flex sm:p-4 md:p-0  gap-4 flex-wrap">
          <div className="flex border-[2px] w-full   items-center gap-4 py-2 px-4">
            <Search size={18} />
            <input
              type="text"
              value={searchCompanyString}
              className="text-xl  flex-1 outline-none text-[#999999] "
              placeholder="Search Company Leads"
              onChange={(e) => {
                setSearchCompanies(e.target.value);
                handleCompanySearch(e.target.value, "full_name");
              }}
            />
            <CircleX size={25} strokeWidth={1.2} onClick={(e)=>{
              e.preventDefault()
              setFilteredCompanies([])
              setSearchCompanies("")
            }} className="text-[#999999] cursor-pointer hover:text-[red] transition-all"/>
          </div>

          <div className="flex flex-col  justify-center gap-4  w-full">
            <div className="flex justify-end gap-4 items-center">
              {isPending && (
                <>
                  <Loader2 className="animate-spin h-5 w-5 text-[#999999]" />
                 
                </>
              )}
              <h1 className="font-semibold text-[#999999] text-right">{`Total Companies (${
                filteredCompanies.length <= 0
                  ? companies?.data.data?.length 
                  : filteredCompanies.length
              })`}</h1>
            </div>

            {searchCompanyString === "" &&
              companies?.data.data.length > 0 &&
              companies?.data.data.map((el: any, key: number) => (
                <button
                  disabled={isPending}
                  key={el.id}
                  className="flex  font-semibold items-center w-full gap-4 py-3 px-4  transition-all rounded-md hover:bg-[#7655fa]  text-[#999999] hover:text-[white] cursor-pointer bg-[#f7f6f9] "
                  onClick={(e) => {
                    e.preventDefault();
                    setIsPending(true);
                    handleLeads(el.id);
                  }}
                >
                  {key + 1}
                  <Building2 size={30} />
                  {el.full_name}
                </button>
              ))}
            {searchCompanyString !== "" &&
              filteredCompanies.length > 0 &&
              filteredCompanies.map((el: any, key: number) => (
                <button
                  disabled={isPending}
                  key={el.id}
                  className="flex  font-semibold items-center w-full gap-4 py-3 px-4  transition-all rounded-md hover:bg-[#7655fa]  text-[#999999] hover:text-[white] cursor-pointer bg-[#f7f6f9] "
                  onClick={(e) => {
                    e.preventDefault();
                    setIsPending(true);
                    handleLeads(el.id);
                  }}
                >
                  {key + 1}
                  <Building2 size={30} />
                  {el.full_name}
                </button>
              ))}
            {searchCompanyString !== "" && filteredCompanies.length <= 0 && (
              <p className="font-semibold text-center border-dashed border-[4px] text-[#999999] py-6 w-full col-span-3 mt-4">
                {" "}
                No Results Found
              </p>
            )}
            {companies?.data.data.length <= 0 && (
              <p className="font-semibold text-center border-dashed border-[4px] text-[#999999] py-6 w-full col-span-3 mt-4">
                {" "}
                No Companies Found
              </p>
            )}
          </div>
        </div>
      )}
      {searchString === "" && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {companyLeads &&
            companyLeads.map((el: any, key: number) => (
              <LeadsCard
                key={el.id}
                name={el.name}
                phone={el.phone}
                address={el.address}
                email={el.email}
                loggedin={el.loggedin}
                stripe={el.stripe}
                logo={el.logo}
                ticket={el.ticket_type}
                event={el.registration.event.title}
                date={el.registration.event.created_at.split("T")[0]}
                index={key}
                selectedRecord={selectedRecord}
                setSelectedRecord={setSelectedRecord}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default LeadsContainer;
