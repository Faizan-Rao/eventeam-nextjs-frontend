import React from "react";
import clsx from "clsx";
interface ISubeventPreview {
    className?: string 
}

const SubeventPreview : React.FC<ISubeventPreview>= (
    {
        className
    }
) => {
  return (
    <div className={clsx("flex min-w-[300px] w-[320px] p-5 flex-col  gap-2", className)}>
      <div className="flex flex-col gap-1 ">
        <h1 className="text-xl font-semibold">Subevent # 2</h1>
        <p className="text-xs text-[#E0A450]">17/7/2024</p>
      </div>

      <table>
        <thead >
          <tr className=" text-left border-b-[1px] my-4 ">
            <th className="font-semibold ">Ticket Type</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody className=""  >
          <tr className="">
            <td>Men</td>
            <td >60$</td>
          </tr>
          <tr >
            <td>Women</td>
            <td>60$</td>
          </tr>
          <tr >
            <td>Couples</td>
            <td>60$</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SubeventPreview;
