import React from "react";
import clsx from "clsx";
import { format } from "date-fns";
import { USDollar } from "@/configs/currentFormat";
import { useTranslation } from "react-i18next";
import { Clock } from "lucide-react";
interface ISubeventPreview {
  className?: string;
  data: any;
  type?: string;
}

const EventSubeventCard: React.FC<ISubeventPreview> = ({
  className,
  data,
  type,
}) => {
  const { t } = useTranslation(["translation"]);

  
  return (
    <div
      className={clsx(
        "flex w-auto flex-1 self-start  p-5 flex-col  gap-2 ",
        className
      )}
    >
      <div className="flex justify-between">
        <div className="flex  flex-col  ">
          <div className="flex justify-between sm:flex-col md:flex-row md:gap-4">
            <h1 className="text-xl font-semibold">
              {data.title || "No title"}
            </h1>
            <p className=" flex items-center  gap-1 text-sm text-[#E0A450]">
              <Clock size={15} />

              {(() => {
                try {
                  return format(
                    new Date(data.date.replace(" ", "T")),
                    "h:mm a"
                  );
                } catch (error) {
                  return data.date.split(" ")[1];
                }
              })()}
            </p>
          </div>
          <p className="text-sm text-[#E0A450]">
            {(() => {
              try {
                return format(new Date(data.date.split(" ")[0]), "dd/MM/yyyy");
              } catch (error) {
                return data.date.split(" ")[0];
              }
            })()}
          </p>
        </div>

        <div className="flex flex-col justify-center mx-7">
          <p className="text-xl text-right text-[#E0A450] font-semibold">
            {data.sub_event_capacity || 0}
          </p>
          <h1 className="text-sm text-nowrap font-semibold">
            {t("Max Capacity")}
          </h1>
        </div>
      </div>

      <table cellPadding={5} cellSpacing={10}>
        <thead>
          {type !== "activity" && (
            <tr className="border-b-[1px] my-4 ">
              <td className="font-semibold ">{t("Ticket Type")}</td>
              <td className="font-semibold ">{t("Price")}</td>
            </tr>
          )}

          {type === "activity" && (
            <tr className="border-b-[1px] my-4 ">
              <td className="font-semibold ">{t("Name")}</td>
              <td className="font-semibold ">{t("Time")}</td>
              <td className="font-semibold ">{t("Status")}</td>
            </tr>
          )}
        </thead>
        <tbody className="">
          {type !== "activity" &&
            data.products.length > 0 &&
            data.products.map((el: any, i: number) => {
              return (
                <tr key={i} className="">
                  <td>{el.title}</td>
                  <td>{USDollar.format(el.price)}</td>
                </tr>
              );
            })}
          {type === "activity" &&
            data.sub_event_activities.length > 0 &&
            data.sub_event_activities.map((el: any, i: number) => {
              return (
                <tr key={i} className="">
                  <td>{el.title}</td>
                  <td>{`${data.is_api_enable === 1 ? el.api_time : el.time}   ${
                    data.is_api_enable === 0 ? el.type : ""
                  } `}</td>
                  <td>
                    {el.is_show === 1 ? (
                      <p className="text-green-400 font-semibold">
                        {t("Active")}
                      </p>
                    ) : (
                      <p className="text-red-800 font-semibold">
                        {t("Inactive")}
                      </p>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default EventSubeventCard;
