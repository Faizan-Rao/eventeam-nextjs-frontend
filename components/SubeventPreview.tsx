import React from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { Clock } from "lucide-react";
interface ISubeventPreview {
  className?: string;
  data: any;
}

const SubeventPreview: React.FC<ISubeventPreview> = ({ data, className }) => {
  const { t } = useTranslation(["translation"]);
  return (
    <div
      className={clsx(
        "flex flex-1 min-w-[140px] p-4 flex-col  gap-2  ",
        className
      )}
    >
      <div className="flex flex-col gap-1 ">
        <div className="grid grid-cols-2 gap-4 ">
          <h1 className="text-xl font-semibold">{data.title}</h1>
          {
            <span className="flex items-center gap-1 justify-self-end text-sm text-[#E0A450] text-end ">
              <Clock size={15} />
              {data.date &&
                (() => {
                  try {
                    return format(new Date(data.date.replace(" ", "T")), "h:mm a");
                  }
                  catch
                  {
                    return data.date.split(" ")[1]
                  }
                })()}
            </span>
          }
        </div>
        <p className="text-xs text-[#E0A450]">
          
          {data.date &&
                (() => {
                  try {
                    return format(new Date(data.date.split(" ")[0]), "dd/MM/yyyy")
                  }
                  catch
                  {
                    return data.date.split(" ")[0]
                  }
                })()}
        </p>
      </div>

      <table cellPadding={5} cellSpacing={9}>
        <thead>
          <tr className="border-b-[1px] my-4 ">
            <td className="font-semibold ">{t("Ticket")}</td>
            <td className="font-semibold text-right">{t("Price")}</td>
          </tr>
        </thead>
        <tbody className="">
          {data.products.map((el: any, i: number) => {
            return (
              <tr key={i} className="">
                <td>{el.title}</td>
                <td className="text-right">${el.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SubeventPreview;
