import React from "react";
import UserCirclePlus from "./icons/UserCirclePlus";
import ViewEye from "./icons/ViewEye";
import DashboardPaymentViewModal from "./DasboardPaymentViewModal";

const RecentRegMain = ({ regData }: { regData: any }) => {
  console.log(regData);
  return (
    <div className="flex flex-1 flex-col gap-5 justify-center  sm:mx-auto h-full w-full p-6  md:max-w-full  max-h-[600px] overflow-auto">
      <h1 className="font-semibold text-xl">Recent Registrations</h1>
      <table cellSpacing={4} cellPadding={4}>
        <thead className="text-base text-center sticky top-[-22px] left-0 bg-[#ffffff]">
          <tr className="text-[#999999] text-[13px] text-nowrap border-b-[1px]">
            <td className="font-semibold mx-4 "></td>
            <td className="font-semibold mx-4 ">Event Name</td>
            <td className="font-semibold mx-4 ">Payment Method</td>
            <td className="font-semibold mx-4 ">Seats</td>
            <td className="font-semibold mx-4 ">Total Amount</td>
            <td className="font-semibold mx-4 ">View Details</td>
          </tr>
        </thead>

        <tbody className=" text-[14px] h-[400px] text-center">
          {regData &&
            (regData as any[]).map((el, index) => {
              return (
                <tr className="border-b-[1px] " key={index}>
                  <td>
                    <div className="flex overflow-hidden aspect-square max-h-[35px] object-cover bg-[#7655FA26] justify-center items-center p-1 rounded-full">
                      <UserCirclePlus />
                    </div>
                  </td>
                  <td>{el.event.title}</td>
                  <td>{el.payment_method}</td>
                  <td>{el.guests.length}</td>
                  <td>${el.total_amount}</td>
                  <td>
                    <div className="flex overflow-hidden aspect-square max-h-[45px] mx-auto object-cover justify-center cursor-pointer items-center  rounded-full">
                      <DashboardPaymentViewModal row={el}/>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default RecentRegMain;
