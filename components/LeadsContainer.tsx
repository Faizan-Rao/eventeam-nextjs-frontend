"use client";
import React, { useState, useDeferredValue } from "react";
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
import LeadsCard from "./LeadsCard";
import { useQuery } from "@tanstack/react-query";
import { Leads } from "@/configs/apiRoutes";
import { Skeleton } from "./ui/skeleton";
import {CSVLink} from 'react-csv'
import { format } from "date-fns";


const LeadsContainer = () => {
  const [open, setOpen] = useState(false);
  const [filteredData, setFilteredData] = useState<any>([]);
  const deferredFilter = useDeferredValue(filteredData)
 const [selectedRecord, setSelectedRecord] = useState(0);

  const {
    isPending: isLeadsPending,
    data: leads,
    error: leadsError,
  } = useQuery({
    queryKey: ["leads"],
    queryFn: Leads.getLeads,
  });

  console.log(leads)
  const headers = [
    { label: 'Name', key: 'name' },
    { label: 'Event', key: 'registration.event.title' },
    { label: 'Phone', key: 'phone' },
    { label: 'Ticket', key: 'ticket_type' },
    { label: 'Date', key: 'registration.event.created_at' },
  ];
  

  const handleSearch = (value: any, name: string) => {
    const leadData = leads?.data.data.leads
    if (_.isString(value)) {
      // console.log(value)
      const searchedData =  leadData.filter((el: any, index:number) => {
        console.log(el)
        return (el as any)[name].toLowerCase().includes(value.toLowerCase());
      });
      setFilteredData(searchedData as any);
    } 
    // else {
    //   const searchedData = (leads as any || []).filter((el: any, index) => {
    //     return (el as any)[name] === value;
    //   });
    //   setFilteredData(searchedData as any);
    // }
  };

  return (
    <div className="flex flex-col gap-4 bg-white lg:p-6 md:rounded-lg">
      

      <div className="flex flex-wrap sm:px-5 md:px-0 p-4 justify-between gap-4 ">
        <h1 className="text-[#4a4a4a] self-center text-lg font-semibold">
          All Leads{" "}
          {`(${(filteredData.length > 0 ? filteredData.length : leads?.data.data.total_leads) || 0})`}
        </h1>
        <div className="grid grid-cols-3 gap-2">
          <span className="flex self-center col-span-2 place-items-center bg-white gap-2 rounded-md border-[2px] p-1">
            <Search size={18} />
            <input
              placeholder={"Search Companies..."}
              onChange={(event) => handleSearch(event.target.value, "name")}
              className="sm:max-w-xs md:max-w-lg outline-none text-base bg-transparent "
            />
          </span>

          {/* <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
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
                // onClick={() => handleSearch(true, "loggedin")}
              >
                <span>Active</span>
                <CircleCheckBig size={15} />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center justify-between"
                // onClick={() => handleSearch(false, "loggedin")}
              >
                <span>Inactive</span>
                <CircleCheckBig size={15} />
              </DropdownMenuItem>

              <DropdownMenuLabel>Stripe</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex items-center justify-between"
                // onClick={() => handleSearch(true, "stripe")}
              >
                <span>Connected</span>
                <CircleCheckBig size={15} />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center justify-between"
                // onClick={() => handleSearch(false, "stripe")}
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
          </DropdownMenu> */}
          

          <CSVLink headers={headers}   filename={`EvenTeam - Leads ${format(new Date(Date.now()), "dd-MMM-yyyy")}`} data={leads?.data.data.leads || []} className="flex gap-4 justify-self-center md:ml-4 px-4 py-2 text-center bg-[#7655fa] rounded-full sm:text-sm md:text-base text-white active:scale-[0.95] transition-all">
        
          Export CSV 
        </CSVLink>
         
        </div>
      </div>

      {deferredFilter.length > 0 && (
        <div className="flex  sm:flex-col md:flex-row sm:justify-start sm:items-center md:justify-center md:items-center  gap-4 flex-wrap">
          {(deferredFilter as any[]).map((el, key) => (
            <LeadsCard
            key={key}
            name={el.name}
            phone={el.phone}
            address={el.address}
            email={el.email}
            loggedin={el.loggedin}
            stripe={el.stripe}
            logo={el.logo}
            ticket={el.ticket_type}
            event={el.registration.event.title}
            date={el.registration.event.created_at.split('T')[0]}
            index={key}
            selectedRecord={selectedRecord}
            setSelectedRecord={setSelectedRecord}
            />
          ))}
        </div>
      )}

        {isLeadsPending && (<div className="flex gap-4 flex-wrap">
          <Skeleton className="flex-1 h-[280px] w-[350px] rounded-xl" />
          <Skeleton className="flex-1 h-[280px] w-[350px] rounded-xl" />
          <Skeleton className="flex-1 h-[280px] w-[350px] rounded-xl" />

        </div>)}
      {deferredFilter.length <= 0 && (
        <div className="flex sm:flex-col md:flex-row sm:justify-start sm:items-center md:justify-center md:items-center  gap-4 flex-wrap">
          {leads && leads?.data.data.leads.map((el:any, key:number) => (
            <LeadsCard
              key={key}
              name={el.name}
              phone={el.phone}
              address={el.address}
              email={el.email}
              loggedin={el.loggedin}
              stripe={el.stripe}
              logo={el.logo}
              ticket={el.ticket_type}
              event={el.registration.event.title}
              date={el.registration.event.created_at.split('T')[0]}
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
