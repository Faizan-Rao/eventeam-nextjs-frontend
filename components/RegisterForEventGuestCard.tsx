"use client";
import { PencilLine, Trash, User } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import DonationEditDialog from "./DonationEditDialog";
import AddRegistrantDialog from "./AddRegistrantDialog";
import DeleteEventRegistrantDialog from "./DeleteRegistrantDialog";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";

const RegisterForEventGuestCard = ({
  index,
  data,
  formData,
}: {
  data: any;
  formData: any;
  index: number;
}) => {
  const [subevents, setSubevents] = useState<any>([]);
  const {t} = useTranslation(["translation"])
  const getProducts = useCallback(() => {
    if (!data) return;
    const subevent = data.subEvents;
    const products = formData.sub_events.map((el: any) => {
      return el.products.map((el2: any) => {
        return subevent.includes(el2.id) && el;
      });
    });
    const filtered = products.flat().filter((e: any) => e && e) || [];
    setSubevents(filtered);
  }, [data, formData]);

  useEffect(() => getProducts(), [getProducts]);
  return (
    <>
      <div className="sm:hidden md:grid px-4  sm:grid-cols-1  md:grid-cols-1 lg:grid-cols-4   gap-4 p-4 bg-[#F7F6F9] rounded-md">
        {/* User Info */}
        <div className="flex   py-1 items-center min-w-[300px]  no-underline gap-4">
          <h1 className="sm:hidden md:block text-lg font-semibold w-1 mx-4">
            {index}.
          </h1>
          <div className="bg-[#7655fa] p-2 rounded-full">
            <User size={26} className="text-white" />
          </div>
          <div className="flex flex-wrap flex-col  ">
            <h1 className=" text-lg font-semibold line-clamp-1">
              {data.name || ""}
            </h1>
            <span className="flex flex-col  gap-1 flex-wrap">
              <p className=" text-sm text-[#999999] font-semibold">
                {data.email || ""}
              </p>
              <p className=" text-sm text-[#999999] font-semibold">
                {data.phone || ""}
              </p>
            </span>
          </div>
        </div>
        {/* Event Info */}
        <div className="grid  sm:grid-cols-1 md:grid-cols-1   lg:justify-self-end  gap-4">
          <div className="flex items-center place-items-end gap-2">
            <div className="flex flex-col gap-1 ">
              <h1 className=" font-semibold text-[#999999] text-sm">
                {t("Ticket Type")}
              </h1>
              <p className="text-lg font-semibold">{data.ticketType[0]}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 lg:justify-self-end">
          <div className="flex  flex-col gap-1">
            <h1 className=" font-semibold tex text-sm text-[#999999]">
              {t("Sub Events")}
            </h1>
            <div className=" grid grid-cols-2  ">
              {subevents.length > 0 &&
                subevents.map((el: any, i: number) => {
                  return (
                    el && (
                      <p
                        key={i}
                        className="text-sm px-2  py-1 rounded-full bg-[white] border-[1px] font-semibold"
                      >
                        {el && el.title}
                      </p>
                    )
                  );
                })}
            </div>
          </div>
        </div>

        {/* buttons */}
        <div className=" items-center sm:justify-center md:justify-end flex-1 flex gap-4 ">
          {/* <span className="flex p-2 items-center hover:bg-[#7655fa26] rounded-full justify-center">
          <AddRegistrantDialog
            editData={data}
            type="edit"
            formData={formData}
          />
        </span> */}

          <DeleteEventRegistrantDialog
            guestId={index}
            data={data}
            formData={formData}
          />
        </div>

        <div></div>
      </div>

      <div className="sm:flex md:hidden flex-col">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" >
            <AccordionTrigger className="justify-between shadow-sm" >
                <div className="bg-[#7655fa] p-2 rounded-full">
                  <User size={26} className="text-white" />
                </div>
              <div className="grid grid-col-2 j  py-1  no-underline">
               
                  <h1 className=" text-lg font-semibold ">
                    {data.name || ""}
                  </h1>
                    <p className=" text-xs text-[#999999] font-semibold break-words break-all">
                      {data.email || ""}
                    </p>
                    <p className=" text-xs text-[#999999] font-semibold">
                      {data.phone || ""}
                    </p>
                
              </div>
              <DeleteEventRegistrantDialog
                  guestId={index}
                  data={data}
                  formData={formData}
                />
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid  my-4 sm:grid-cols-1 md:grid-cols-1   lg:justify-self-end  gap-4">
                <div className="flex items-center place-items-end gap-2">
                  <div className="flex flex-col gap-1 ">
                    <h1 className=" font-semibold text-[#999999] text-sm">
                      {t("Ticket Type")}
                    </h1>
                    <p className="sm:text-base md:text-lg font-semibold">
                      {data.ticketType[0]}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 lg:justify-self-end">
                <div className="flex  flex-col gap-1">
                  <h1 className=" font-semibold tex text-sm text-[#999999]">
                    {t("Sub Events")}
                  </h1>
                  <div className=" grid grid-cols-2  ">
                    {subevents.length > 0 &&
                      subevents.map((el: any, i: number) => {
                        return (
                          el && (
                            <p
                              key={i}
                              className="text-sm px-2  py-1 rounded-full bg-[white] border-[1px] font-semibold"
                            >
                              {el && el.title}
                            </p>
                          )
                        );
                      })}
                  </div>
                </div>
              </div>

              {/* buttons */}
              <div className=" items-center sm:justify-center md:justify-end flex-1 flex gap-4 ">
              

               
              </div>

              <div></div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default RegisterForEventGuestCard;
