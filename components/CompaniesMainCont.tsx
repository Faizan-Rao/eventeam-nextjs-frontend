"use client";
import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import CompanyCard from "./CompanyCard";
import KPICard from "./KPICard";
import {
  Banknote,
  Building2,
  Calendar,
  CircleCheck,
  CircleCheckBig,
  CircleDollarSign,
  CircuitBoard,
  HandCoins,
  ListFilter,
  Search,
  UserPlus,
  UsersRound,
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
import { USDollar } from "@/configs/currentFormat";
import { t } from "i18next";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Autoplay } from "swiper/modules";

const CompaniesMainCont = () => {
  const [open, setOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchString, setSearchString] = useState("");

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
console.log("Companies Filtered Data", filteredData)
  const handleSearch = useCallback( (value: any, name: string) => {
   
    if (_.isString(value)) {
      const searchedData = (companies?.data["data"] as any)?.filter(
        (el: any, index: number) => {
          return (el as any)[name].toLowerCase().includes(value.toLowerCase());
        }
      );
      if(searchedData?.length === 0)
      {
        setFilteredData([]);
        return
      }
      setFilteredData(searchedData as any);
    } else {
      const searchedData = (companies?.data["data"] as any)?.filter(
        (el: any, index: number) => {
          return (el as any)[name] === value;
        }
      );
      if(searchedData?.length === 0)
        {
          setFilteredData([]);
          return
        }
      setFilteredData(searchedData as any);
    }
  }, [companies])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(()=>handleSearch(searchString, "full_name"), [companies])


  console.log("companies", companies);
  return (
    <div className="flex flex-col gap-4 bg-white sm:p-2 lg:p-6 md:rounded-lg min-h-screen">
      <div className="sm:hidden md:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 bg-white p-2 mb-4  ">
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

      <div className="sm:block my-4  md:hidden ">
        <Swiper
          slidesPerView={2}
          spaceBetween={6}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          // freeMode={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[FreeMode, Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
            <KPICard
              title="Total Companies"
              value={kpis?.data.data["total_companies"] || "0"}
              currency=""
              icon={<Building2 />}
            />
          </SwiperSlide>
          <SwiperSlide>
            <KPICard
              title="Active Companies"
              value={kpis?.data.data["active_companies"] || "0"}
              currency=""
              icon={<Building2 />}
            />
          </SwiperSlide>
          <SwiperSlide>
            <KPICard
              title={t("Inactive Companies")}
              icon={<CircuitBoard size={28} />}
              value={kpis?.data.data["inactive_companies"] || "0"}
            />
          </SwiperSlide>
          <SwiperSlide>
            <KPICard
              title="Stripe Connected"
              value={kpis?.data.data["stripe_connected"] || "0"}
              currency=""
              icon={<Building2 />}
            />
          </SwiperSlide>
          
        </Swiper>
      </div>
      <div className="grid items-center sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 justify-center gap-4 mx-2">
        <h1 className="text-[#4a4a4a] text-lg col-sp font-semibold">
          All Companies{" "}
          {`(${
            filteredData?.length <= 0 && searchString === ""
            ? companies?.data.data.length || 0  
            : (filteredData?.length ?? 0)
               
          })`}
        </h1>
        {/* <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 sm:gap-4 md:gap-1 jusitfy-center"> */}
        <div className="flex items-center md:justify-self-end sm:flex-col md:flex-row gap-4 jusitfy-center">
          {/* <div className="flex self-center place-items-center lg:col-span-1 bg-white gap-2 rounded-md border-[2px] p-1"> */}
          <div className="flex w-full place-items-center lg:col-span-1 bg-white gap-2 rounded-md border-[1px] p-1">
            <Search size={18} />
            <input
              placeholder={"Search Companies..."}
              onChange={(event) => {

                handleSearch(event.target.value, "full_name")
                setSearchString(event.target.value)
              }
              }
              value={searchString}
              className="w-full outline-none sm:py-1 md:py-0 text-base bg-transparent w "
            />
          </div>

          {/* <div className="grid sm:grid-cols-3 md:grid-cols-2 justify-self-center items-center sm:justify-self-end sm:self-end sm:gap-4 md:gap-0 "> */}
          <div className=" flex justify-center items-center gap-4 sm:self-end sm:gap-4 md:gap-4 ">
            <div className=" flex justify-center items-center sm:col-span-2 md:col-span-1">
              <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger>
                  <button className="flex justify-center items-center sm:text-sm md:text-base min-w-full  bg-white  place-items-center gap-2 px-4 rounded-md sm:py-2 md:py-1 border-[1px]">
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
                      setSearchString("active");
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
                      setSearchString("inactive")
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
                      setSearchString("connected")
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
                      setSearchString("disconnected")
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
                        setSelectedFilter("");
                        setOpen(false);
                        setSearchString("")
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
            </div>
            <CompanyAddDialog />
          </div>
        </div>
      </div>

      {searchString !== ""  && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {(filteredData as any[]).map((el, key) => (
            <CompanyCard
              key={el.id}
              name={el["full_name"]}
              phone={el["phone"] || "No Phone"}
              address={el["address"] || "No Address"}
              email={el["email"]}
              isActive={el["is_active"]}
              stripe={el["stripe_account_status"]}
              logo={el["photo"] || ""}
              slug={el["slug"]}
              id={el["id"]}
              data={filteredData[key]}
            />
          ))}

          {filteredData.length === 0 && <p className="font-semibold text-center border-dashed border-[4px] text-[#999999] py-6 w-full col-span-3 mt-4"> No Results Found</p>}
        </div>
      )}

      {searchString === "" && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          {companies &&
            (companies.data.data as any[]).map((el: any, key: number) => (
              <CompanyCard
                key={el.id}
                name={el["full_name"]}
                phone={el["phone"] || "No Phone"}
                address={el["address"] || "No Address"}
                email={el["email"]}
                isActive={el["is_active"]}
                stripe={el["stripe_account_status"]}
                logo={el["photo"] || ""}
                slug={el["slug"]}
                id={el["id"]}
                data={companies.data.data[key]}
              />
            ))}
            {companies?.data.data.length === 0 && <p className="font-semibold text-center border-dashed border-[4px] text-[#999999] py-6 w-full col-span-3 mt-4"> No Results Found</p>}
        </div>
      )}
    </div>
  );
};

export default CompaniesMainCont;
