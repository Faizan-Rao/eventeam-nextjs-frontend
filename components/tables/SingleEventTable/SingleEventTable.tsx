import React from "react";
import UserCirclePlus from "../../icons/UserCirclePlus";
import ViewEye from "../../icons/ViewEye";
import DashboardPaymentViewModal from "@/components/DasboardPaymentViewModal";

const SingleEventTable = ({data} : {data: any}) => {
  console.log("required data view event", data)
  return (
    <div className="flex-1 flex flex-col  gap-4 p-4 h-auto overflow-auto    rounded-md    bg-white">

      <h1 className="font-semibold text-xl mb-4">Recent Registrations</h1>
    <div className="flex  flex-col gap-5 justify-center sm:max-w-[360px] md:max-w-full    overflow-auto   ">
      <table cellSpacing={4} cellPadding={4} >
        <thead className="text-base text-center sticky top-[-25px]  bg-[#ffffff]">
          <tr className="text-[#999999] text-[13px]  border-b-[1px]">
            <th className="font-semibold mx-4 "></th>
            <th className="font-semibold mx-4 ">Event Name</th>
            <th className="font-semibold mx-4 ">Payment Method</th>
            <th className="font-semibold mx-4 ">Seats</th>
            <th className="font-semibold mx-4 ">T.Amount</th>
            <th className="font-semibold mx-4 ">V.Details</th>
          </tr>
        </thead>
  
        <tbody className=" text-[14px]  overflow-auto  text-center" >
            
        {data?.event.registrations &&
            (data?.event.registrations as any[]).map((el, index) => {
              return (
                <tr className="border-b-[1px] " key={index}>
                  <td>
                    <div className="flex overflow-hidden aspect-square max-h-[35px] object-cover bg-[#7655FA26] justify-center items-center p-1 rounded-full">
                      <UserCirclePlus />
                    </div>
                  </td>
                  <td> <p className="line-clamp-1 my-auto">{data.event?.title}</p></td>
                  <td>{el.payment_method}</td>
                  <td>{el.guests.length}</td>
                  <td>${el.total_amount}</td>
                  <td>
                      <DashboardPaymentViewModal type="view_event" row={data?.event.registrations[index]} data={data.event}/>
                    
                  </td>
                </tr>
              );
            })}
            
         
        </tbody>

      </table>
        {
              data?.event.registrations.length <= 0 && <p className="font-semibold border-[3px]  text-center p-5 text-[#999999] w-full"> No Registration Currently</p>
            }
    </div>
    
    </div>
  );
};

export default SingleEventTable;
