import React from "react";
import clsx from "clsx";
import Calendar from "./icons/Calendar";
import DotThreeVertical from "./icons/DotThreeVertical";
import ViewEye from "./icons/ViewEye";
import UserFour from "./icons/UserFour";
import { format } from "date-fns";
import UpcomingSubeventPreviewDialog from "./UpcomingSubeventPreviewDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { user } from "@/configs/axios";
import { EllipsisVertical } from "lucide-react";
import { useTranslation } from "react-i18next";

const UpcomingEventCard = ({ data }: { data: any }) => {
  const status = true;
  const { t } = useTranslation(["translation"]);
  console.log("upcoming event data", data);
  return (
    <div className="grid grid-cols-1  p-4 bg-[#F7F6F9] rounded-md">
      {/* header */}
      <div className="flex justify-between gap-4">
        <div className="flex flex-col justify-center">
          <h1 className="font-semibold text-[#4A4A4A] text-base">
            {data["title"]}
          </h1>
          <span className="flex place-items-center gap-2 mt-2">
            <span
              className={clsx(
                "h-[10px] w-[10px] rounded-full bg-[#1EFF00]",
                data["status"] === 0 && "bg-[#FF0000]"
              )}
            />
            <span className="font-semibold text-sm text-[#999999]">
              {data["status"] === 1 ? t("Active") : t("Inactive")}
            </span>
          </span>
        </div>
        {user.role === "company" && (
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger
              className={clsx(
                "active:scale-[0.90] rounded-full self-start   p-1 hover:bg-[#7655fa26] transition-all"
              )}
            >
              <EllipsisVertical size={20} className="text-[#999999]" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="text-sm active:scale-[0.95] transition-all">
                <a href={`/dashboard/my-events/${data.id}`}>
                  {t("View Event")}
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-sm active:scale-[0.95] transition-all">
                <a href={`/dashboard/my-events/edit/${data.id}`}>
                  {t("Edit Event")}
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-sm active:scale-[0.95] transition-all">
                <a href={`/events/${user.slug}/${data.id}`}>
                  {t("View Registration Form")}
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* data sections */}
      <div className="flex border-t-[1px] gap-4 pt-4 justify-between items-center">
        <div className="flex items-center gap-2    bg-[#F7F6F9] rounded-md">
          <div className="flex items-center aspect-square max-h-[30px] object-cover bg-[#7655FA26] justify-center p-1 rounded-md">
            <Calendar />
          </div>

          <div className="flex justify-center  flex-col  ">
            <p className="text-[#999999] text-xs font-semibold">{t("Dates")}</p>
            <p className="text-[#4A4A4A] text-nowrap text-[12.5px]  font-semibold flex  ">
              {data["start_date"] &&
                (() => {
                  try {
                    return (
                      format(new Date(data["start_date"]), "LLL d") +
                      " - " +
                      format(new Date(data["end_date"]), "LLL d")
                    );
                  } catch {
                    return (
                      new Date(data["start_date"]).toDateString() +
                      " - " +
                      new Date(data["end_date"]).toDateString()
                    );
                  }
                })()}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3  bg-[#F7F6F9] rounded-md">
          <div className="flex items-center aspect-square max-h-[30px] object-cover bg-[#7655FA26] justify-center p-1 rounded-md">
            <UserFour />
          </div>

          <div className="flex justify-center  flex-col  ">
            <p className="text-[#999999] text-xs font-semibold">
              {t("Guests")}
            </p>
            <p className="text-[#4A4A4A] text-[12.5px]    font-semibold flex  ">
              {data["registrations"]?.length}
            </p>
          </div>
        </div>
        {status && <UpcomingSubeventPreviewDialog data={data} />}
      </div>
    </div>
  );
};

export default UpcomingEventCard;
