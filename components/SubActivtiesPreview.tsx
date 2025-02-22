import React from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
interface ISubeventPreview {
  className?: string;
  data: any;
}

const SubActivitiesPreview: React.FC<ISubeventPreview> = ({ data, className }) => {
  
  const {t} = useTranslation(["translation"])
  return (
    <div
      className={clsx(
        "flex flex-1 min-w-[140px] m-4 p-5 flex-col  gap-2  bg-[#7655fa26] rounded-md",
        className
      )}
    >
      <div className="flex flex-col gap-1 ">
        <h1 className="text-xl font-semibold">{data.title}</h1>
        <p className="text-xs text-[#E0A450]">{data.date.split(" ")[0].replaceAll("-", "/")}</p>
      </div>

      <table cellPadding={5} cellSpacing={9}>
        <thead>
          <tr className="border-b-[1px] my-4 ">
            <td className="font-semibold ">{t("Name")}</td>
            <td className="font-semibold text-right">{t("Time")}</td>
          </tr>
        </thead>
        <tbody className="">
          {data?.sub_event_activities?.map((el: any, i: number) => {
            return (
              <tr key={i} className="">
                <td>{el.title}</td>
                <td className="text-right">{`${data.is_api_enable === 1 ? el.api_time : el.time}   ${data.is_api_enable === 0 ?el.type : ""} `}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SubActivitiesPreview;
