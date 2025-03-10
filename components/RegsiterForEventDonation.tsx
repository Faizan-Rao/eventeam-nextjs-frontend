"use client";
import {
  CheckCircle,
  CheckCircle2,
  CircleHelpIcon,
  HandHeart,
  MessageCircleQuestion,
} from "lucide-react";
import React, { createRef, useEffect, useRef, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { clsx } from "clsx";
import { toast } from "react-toastify";
import { useFormContext, useWatch } from "react-hook-form";
import { set } from "lodash";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useTranslation } from "react-i18next";

const RegsiterForEventDonation = ({ data }: { data: any }) => {
  // const [customDonation, setDonation] = useState<number>(0);
  const { control, setValue } = useFormContext();
  const watch = useWatch({ control });

  const [donations, setDonations] = useState<any[]>([]);
  const [customDonation, setCustomDonation] = useState<number>(0);

  const handleDonation = (el: any, i: any, event: any) => {
    try {
      //  array[index] = !array.includes(array[index]) && array[index]
      let isExist = donations.includes(el);

      if (!isExist) {
        const data = [...donations];
        data.push(el);

        setValue(
          "donation_field",
          `${parseFloat(watch.donation_field) + parseFloat(el.amount)} `
        );

        setDonations(data);
      } else {
        const data = [...donations];
        const index = data.findIndex((el2: any) => el2.id === el.id);

        if (index !== -1) {
          data.splice(index, 1);
        }
        setValue(
          "donation_field",
          `${
            parseFloat(watch.donation_field) -
            parseFloat(donations[index].amount)
          } `
        );

        //  setDonations(data)

        setDonations(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const {t} = useTranslation(["translation"])
  return (
    <div className="flex flex-col  my-4 px-4 pb-4 gap-4">
      <div className=" flex flex-col overflow-y-auto gap-3 text-[#4a4a4a] font-semibold">
        {(data.event.advances.is_enable_donation === "1" ||
      data.event.advances.is_donation_allowed) === "1" && <div className="flex gap-2">
          <h1 className="text-[#7655fa] self-start font-semibold">
            {t("Donations")}{" "}
          </h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger onClick={(e) => e.preventDefault()}>
                <CircleHelpIcon className="text-[#7655fa]" size={16} />
              </TooltipTrigger>
              <TooltipContent >
                <p>{data && data.settings.donation_field_text}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>}
        {data.event &&
          data.event.advances.is_enable_donation === "1" &&
          data.event.selected_event_donations.map((el: any, index: number) => (
            <div
              className={clsx(
                "flex-1 border-[1px] active:scale-[0.98] transition-all py-2 px-4 rounded-md  flex items-center cursor-pointer",
                donations.includes(el) && "border-[#7655fa] border-[1px] "
              )}
              onClick={(e) => handleDonation(el, index, e)}
              key={index}
            >
              <div className="flex gap-4 items-center">
                <span
                  className={clsx(
                    "p-2 rounded-full  ",

                    donations.includes(el) && "bg-[#7655fa] ",
                    !donations.includes(el) && "bg-[#999999]"
                  )}
                >
                  <HandHeart className="text-white" />
                </span>

                <div className=" grid grid-cols-1">
                  <h1 className="text-[]">{`$${el.amount}`}</h1>
                  <h1 className="text-sm text-[#999999] line-clamp-1 break-words">{el.title}</h1>
                </div>
              </div>

              <CheckCircle2
                // defaultChecked={false}

                className={clsx(
                  "ms-auto justify-self-end  rounded-full text-[#999999]",
                  donations.includes(el) && "text-white bg-[#7655fa]"
                )}
              />
            </div>
          ))}

        {data.event?.advances &&
          data.event?.advances.is_donation_allowed === "1" &&<div className="grid grid-cols-1 gap-2">
          <input
            className="border-[1px] rounded-md px-4 py-2 outline-[#7655fa]"
            placeholder="Enter Desired Donation"
            type="number"
            onChange={(event) => {
              setValue(
                "other_donation",
                Math.round(parseFloat(event.target.value)) || 0
              );
            }}
          />
        </div>}
      </div>
    </div>
  );
};

export default RegsiterForEventDonation;
