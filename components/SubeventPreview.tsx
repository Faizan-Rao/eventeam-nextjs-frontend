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
    <div className={clsx("flex min-w-[200px] w-[230px] p-5 flex-col  gap-2 aspect-square object-cover", className)}>
      <div className="flex flex-col gap-1 ">
        <h1 className="text-xl font-semibold">Subevent # 2</h1>
        <p className="text-xs text-[#E0A450]">17/7/2024</p>
      </div>

      <table cellPadding={5} cellSpacing={9}>
        <thead >
          <tr className="border-b-[1px] my-4 ">
            <td className="font-semibold ">Ticket Type</td>
            <td className="font-semibold ">Price</td>
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
