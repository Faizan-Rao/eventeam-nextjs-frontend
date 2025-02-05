'use clint'
import React from "react";
import UserCirclePlus from "./icons/UserCirclePlus";
import ViewEye from "./icons/ViewEye";
import DashboardPaymentViewModal from "./DasboardPaymentViewModal";
import { useTranslation } from "react-i18next";

const RecentRegMain = ({ regData }: { regData: any }) => {
  console.log("reg data",regData);
  const {t} = useTranslation(["translation"])
  return (
    <div className=" col-span-2 flex flex-1 flex-col gap-5  p-2  bg-[#ffffff] z-20   md:w-full   overflow-auto">
      <h1 className="font-semibold text-xl">{t("Recent Registrations")}</h1>
      <table cellSpacing={10}  cellPadding={8}>
        <thead className="text-base text-center sticky top-[-22px] left-0 bg-[#ffffff]">
          <tr className="text-[#999999] text-[13px]  border-b-[1px]">
            <td className="font-semibold ms-5 "></td>
            <td className="font-semibold ms-5 ">{t("Event Name")}</td>
            <td className="font-semibold ms-5 ">{t("Payment Method")}</td>
            <td className="font-semibold ms-5 ">{t("Seats")}</td>
            <td className="font-semibold ms-5 ">{t("Total Amount")}</td>
            <td className="font-semibold ms-5 ">{t("View Details")}</td>
          </tr>
        </thead>

        <tbody className=" text-[14px] w-auto  text-center">
          {regData &&
            (regData as any[]).map((el, index) => {
              return (
                <tr className="border-b-[1px] " key={index}>
                  <td>
                    <div className="flex overflow-hidden aspect-square max-h-[35px] object-cover bg-[#7655FA26] justify-center items-center p-1 rounded-full">
                      <UserCirclePlus />
                    </div>
                  </td>
                  <td >
                    <p className="line-clamp-1">
                    {el.event.title}

                    </p>
                    </td>
                  <td>{el.payment_method}</td>
                  <td>{el.guests.length}</td>
                  <td>${el.total_amount}</td>
                  <td>
                      <DashboardPaymentViewModal row={el}/>
                    {/* <div className="flex overflow-hidden aspect-square max-h-[45px] mx-auto object-cover justify-center cursor-pointer items-center  rounded-full">
                    </div> */}
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
