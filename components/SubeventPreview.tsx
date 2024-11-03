import React from "react";
import clsx from "clsx";
interface ISubeventPreview {
  className?: string;
  data: any;
}

const SubeventPreview: React.FC<ISubeventPreview> = ({ data, className }) => {
  return (
    <div
      className={clsx(
        "flex flex-1 min-w-[140px] m-4 p-5 flex-col  gap-2  ",
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
            <td className="font-semibold ">Ticket</td>
            <td className="font-semibold text-right">Price</td>
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
