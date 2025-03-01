import React from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { Clock } from "lucide-react";
interface ISubeventPreview {
  className?: string;
  data: any;
}

const SubActivitiesPreview: React.FC<ISubeventPreview> = ({
  data,
  className,
}) => {
  const { t } = useTranslation(["translation"]);
  return (
    <div
      className={clsx(
        "flex flex-1 min-w-[140px] p-5 flex-col w-full  gap-2  bg-[#7655fa26] rounded-md",
        className
      )}
    >
      <div className="flex flex-col gap-1 ">
        <div className="grid grid-cols-2  ">
        <h1 className="text-xl flex-1 font-semibold">
          {data.title}{" "}
        </h1>
          {data.is_api_enable === 1 && (
            <span className="flex items-center gap-1 justify-self-end text-sm text-[#E0A450] text-end ">
              <Clock size={15}/>
              {`${data.hebTimes.second_event_time} 
                            `}
            </span>
          )}

        </div>
        <p className="text-xs text-[#E0A450]">

          {/* OLD Date (API Based) */}

          {/* {data.is_api_enable !== 1 &&
            data.date.split(" ")[0].replaceAll("-", "/")}
          {data.is_api_enable === 1 &&
            format(
              new Date(data.hebTimes.first_event_time.replace(" ", "T")),
              "yyyy/MM/dd"
            )} */}

            { data.date.split(" ")[0].replaceAll("-", "/")}
        </p>
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
                {/* Old time And Type */}
                {/* <td className="text-right">{`${
                  data.is_api_enable === 1 ? el.api_time : el.time
                }   ${data.is_api_enable === 0 ? el.type : ""} `}</td> */}
                <td className="text-right">{`${
                   el.time
                }   ${el.type } `}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SubActivitiesPreview;
