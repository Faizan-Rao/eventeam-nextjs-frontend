import React from "react";
import clsx from "clsx";
interface ISubeventPreview {
    className?: string 
}

const EventSubeventCard : React.FC<ISubeventPreview>= (
    {
        className
    }
) => {
  return (
    <div className={clsx("flex min-w-[200px] w-[360px] p-5 flex-col  gap-2 ", className)}>
      <div className="flex justify-between">
      <div className="flex flex-col gap-1 ">
        <h1 className="text-xl font-semibold">Subevent # 2</h1>
        <p className="text-sm text-[#E0A450]">17/7/2024</p>
      </div>

<div className="flex flex-col mx-7">
<h1 className="text-sm font-semibold">Max Capcity</h1>
<p className="text-sm text-[#999999] font-semibold">200</p>
</div>
      </div>

      <table cellPadding={5} cellSpacing={10}>
        <thead >
          <tr className="border-b-[1px] my-4 ">
            <td className="font-semibold ">Ticket Type</td>
            <td className="font-semibold ">Price</td>
            <td className="font-semibold ">Revenue</td>
          </tr>
        </thead>
        <tbody className=""  >
          <tr className="">
            <td>Men</td>
            <td >60$</td>
            <td >60$</td>
          </tr>
          <tr >
            <td>Women</td>
            <td>60$</td>
            <td>60$</td>
          </tr>
          <tr >
            <td>Couples</td>
            <td>60$</td>
            <td>60$</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EventSubeventCard;
