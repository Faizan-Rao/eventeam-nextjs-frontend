import React from "react";
import UserCirclePlus from "../../icons/UserCirclePlus";
import ViewEye from "../../icons/ViewEye";

const SingleEventTable = () => {
  return (
    <div className="flex-1 flex flex-col sm:max-w-[100vw] md:max-w-[400px] gap-4 p-4 max-h-[1200px] overflow-auto    rounded-md    bg-white">

      <h1 className="font-semibold text-xl mb-4">Recent Registrations</h1>
    <div className="flex  flex-col gap-5 justify-center sm:max-w-[360px] md:max-w-full    overflow-auto   ">
      <table cellSpacing={4} cellPadding={4} >
        <thead className="text-base text-center sticky top-[-25px]  bg-[#ffffff]">
          <tr className="text-[#999999] text-[13px] text-nowrap border-b-[1px]">
            <th className="font-semibold mx-4 "></th>
            <th className="font-semibold mx-4 ">Event Name</th>
            <th className="font-semibold mx-4 ">Payment Method</th>
            <th className="font-semibold mx-4 ">Seats</th>
            <th className="font-semibold mx-4 ">Total Amount</th>
            <th className="font-semibold mx-4 ">View Details</th>
          </tr>
        </thead>
  
        <tbody className=" text-[14px]  overflow-auto  text-center" >
            
          <tr className="border-b-[1px]">
            <td>
              <div className="flex overflow-hidden aspect-square max-h-[35px] object-cover bg-[#7655FA26] justify-center items-center p-1 rounded-full">
                <UserCirclePlus />
              </div>
            </td>
            <td>Eid Ul Fitr</td>
            <td>Cash</td>
            <td>5</td>
            <td>$80</td>
            <td>
              <div className="flex overflow-hidden aspect-square max-h-[45px] object-cover justify-center cursor-pointer items-center  rounded-full">
                <ViewEye />
              </div>
            </td>
          </tr>
          <tr className="border-b-[1px] ">
            <td>
              <div className="flex overflow-hidden aspect-square max-h-[35px] object-cover bg-[#7655FA26] justify-center items-center p-1 rounded-full">
                <UserCirclePlus />
              </div>
            </td>
            <td>Eid Ul Fitr</td>
            <td>Cash</td>
            <td>5</td>
            <td>$80</td>
            <td>
              <div className="flex overflow-hidden aspect-square max-h-[45px] object-cover justify-center cursor-pointer items-center  rounded-full">
                <ViewEye />
              </div>
            </td>
          </tr>
          <tr className="border-b-[1px] ">
            <td>
              <div className="flex overflow-hidden aspect-square max-h-[35px] object-cover bg-[#7655FA26] justify-center items-center p-1 rounded-full">
                <UserCirclePlus />
              </div>
            </td>
            <td>Eid Ul Fitr</td>
            <td>Cash</td>
            <td>5</td>
            <td>$80</td>
            <td>
              <div className="flex overflow-hidden aspect-square max-h-[45px] object-cover justify-center cursor-pointer items-center  rounded-full">
                <ViewEye />
              </div>
            </td>
          </tr>
          <tr className="border-b-[1px] ">
            <td>
              <div className="flex overflow-hidden aspect-square max-h-[35px] object-cover bg-[#7655FA26] justify-center items-center p-1 rounded-full">
                <UserCirclePlus />
              </div>
            </td>
            <td>Eid Ul Fitr</td>
            <td>Cash</td>
            <td>5</td>
            <td>$80</td>
            <td>
              <div className="flex overflow-hidden aspect-square max-h-[45px] object-cover justify-center cursor-pointer items-center  rounded-full">
                <ViewEye />
              </div>
            </td>
          </tr>
          <tr className="border-b-[1px] ">
            <td>
              <div className="flex overflow-hidden aspect-square max-h-[35px] object-cover bg-[#7655FA26] justify-center items-center p-1 rounded-full">
                <UserCirclePlus />
              </div>
            </td>
            <td>Eid Ul Fitr</td>
            <td>Cash</td>
            <td>5</td>
            <td>$80</td>
            <td>
              <div className="flex overflow-hidden aspect-square max-h-[45px] object-cover justify-center cursor-pointer items-center  rounded-full">
                <ViewEye />
              </div>
            </td>
          </tr>
          <tr className="border-b-[1px] ">
            <td>
              <div className="flex overflow-hidden aspect-square max-h-[35px] object-cover bg-[#7655FA26] justify-center items-center p-1 rounded-full">
                <UserCirclePlus />
              </div>
            </td>
            <td>Eid Ul Fitr</td>
            <td>Cash</td>
            <td>5</td>
            <td>$80</td>
            <td>
              <div className="flex overflow-hidden aspect-square max-h-[45px] object-cover justify-center cursor-pointer items-center  rounded-full">
                <ViewEye />
              </div>
            </td>
          </tr>
          <tr className="border-b-[1px] ">
            <td>
              <div className="flex overflow-hidden aspect-square max-h-[35px] object-cover bg-[#7655FA26] justify-center items-center p-1 rounded-full">
                <UserCirclePlus />
              </div>
            </td>
            <td>Eid Ul Fitr</td>
            <td>Cash</td>
            <td>5</td>
            <td>$80</td>
            <td>
              <div className="flex overflow-hidden aspect-square max-h-[45px] object-cover justify-center cursor-pointer items-center  rounded-full">
                <ViewEye />
              </div>
            </td>
          </tr>
          <tr className="border-b-[1px] ">
            <td>
              <div className="flex overflow-hidden aspect-square max-h-[35px] object-cover bg-[#7655FA26] justify-center items-center p-1 rounded-full">
                <UserCirclePlus />
              </div>
            </td>
            <td>Eid Ul Fitr</td>
            <td>Cash</td>
            <td>5</td>
            <td>$80</td>
            <td>
              <div className="flex overflow-hidden aspect-square max-h-[45px] object-cover justify-center cursor-pointer items-center  rounded-full">
                <ViewEye />
              </div>
            </td>
          </tr>
          <tr className="border-b-[1px] ">
            <td>
              <div className="flex overflow-hidden aspect-square max-h-[35px] object-cover bg-[#7655FA26] justify-center items-center p-1 rounded-full">
                <UserCirclePlus />
              </div>
            </td>
            <td>Eid Ul Fitr</td>
            <td>Cash</td>
            <td>5</td>
            <td>$80</td>
            <td>
              <div className="flex overflow-hidden aspect-square max-h-[45px] object-cover justify-center cursor-pointer items-center  rounded-full">
                <ViewEye />
              </div>
            </td>
          </tr>
          <tr className="border-b-[1px] ">
            <td>
              <div className="flex overflow-hidden aspect-square max-h-[35px] object-cover bg-[#7655FA26] justify-center items-center p-1 rounded-full">
                <UserCirclePlus />
              </div>
            </td>
            <td>Eid Ul Fitr</td>
            <td>Cash</td>
            <td>5</td>
            <td>$80</td>
            <td>
              <div className="flex overflow-hidden aspect-square max-h-[45px] object-cover justify-center cursor-pointer items-center  rounded-full">
                <ViewEye />
              </div>
            </td>
          </tr>
          <tr className="border-b-[1px] ">
            <td>
              <div className="flex overflow-hidden aspect-square max-h-[35px] object-cover bg-[#7655FA26] justify-center items-center p-1 rounded-full">
                <UserCirclePlus />
              </div>
            </td>
            <td>Eid Ul Fitr</td>
            <td>Cash</td>
            <td>5</td>
            <td>$80</td>
            <td>
              <div className="flex overflow-hidden aspect-square max-h-[45px] object-cover justify-center cursor-pointer items-center  rounded-full">
                <ViewEye />
              </div>
            </td>
          </tr>
          <tr className="border-b-[1px] ">
            <td>
              <div className="flex overflow-hidden aspect-square max-h-[35px] object-cover bg-[#7655FA26] justify-center items-center p-1 rounded-full">
                <UserCirclePlus />
              </div>
            </td>
            <td>Eid Ul Fitr</td>
            <td>Cash</td>
            <td>5</td>
            <td>$80</td>
            <td>
              <div className="flex overflow-hidden aspect-square max-h-[45px] object-cover justify-center cursor-pointer items-center  rounded-full">
                <ViewEye />
              </div>
            </td>
          </tr>
          <tr className="border-b-[1px] ">
            <td>
              <div className="flex overflow-hidden aspect-square max-h-[35px] object-cover bg-[#7655FA26] justify-center items-center p-1 rounded-full">
                <UserCirclePlus />
              </div>
            </td>
            <td>Eid Ul Fitr</td>
            <td>Cash</td>
            <td>5</td>
            <td>$80</td>
            <td>
              <div className="flex overflow-hidden aspect-square max-h-[45px] object-cover justify-center cursor-pointer items-center  rounded-full">
                <ViewEye />
              </div>
            </td>
          </tr>
          <tr className="border-b-[1px] ">
            <td>
              <div className="flex overflow-hidden aspect-square max-h-[35px] object-cover bg-[#7655FA26] justify-center items-center p-1 rounded-full">
                <UserCirclePlus />
              </div>
            </td>
            <td>Eid Ul Fitr</td>
            <td>Cash</td>
            <td>5</td>
            <td>$80</td>
            <td>
              <div className="flex overflow-hidden aspect-square max-h-[45px] object-cover justify-center cursor-pointer items-center  rounded-full">
                <ViewEye />
              </div>
            </td>
          </tr>
          <tr className="border-b-[1px] ">
            <td>
              <div className="flex overflow-hidden aspect-square max-h-[35px] object-cover bg-[#7655FA26] justify-center items-center p-1 rounded-full">
                <UserCirclePlus />
              </div>
            </td>
            <td>Eid Ul Fitr</td>
            <td>Cash</td>
            <td>5</td>
            <td>$80</td>
            <td>
              <div className="flex overflow-hidden aspect-square max-h-[45px] object-cover justify-center cursor-pointer items-center  rounded-full">
                <ViewEye />
              </div>
            </td>
          </tr>
          <tr className="border-b-[1px] ">
            <td>
              <div className="flex overflow-hidden aspect-square max-h-[35px] object-cover bg-[#7655FA26] justify-center items-center p-1 rounded-full">
                <UserCirclePlus />
              </div>
            </td>
            <td>Eid Ul Fitr</td>
            <td>Cash</td>
            <td>5</td>
            <td>$80</td>
            <td>
              <div className="flex overflow-hidden aspect-square max-h-[45px] object-cover justify-center cursor-pointer items-center  rounded-full">
                <ViewEye />
              </div>
            </td>
          </tr>
          <tr className="border-b-[1px] ">
            <td>
              <div className="flex overflow-hidden aspect-square max-h-[35px] object-cover bg-[#7655FA26] justify-center items-center p-1 rounded-full">
                <UserCirclePlus />
              </div>
            </td>
            <td>Eid Ul Fitr</td>
            <td>Cash</td>
            <td>5</td>
            <td>$80</td>
            <td>
              <div className="flex overflow-hidden aspect-square max-h-[45px] object-cover justify-center cursor-pointer items-center  rounded-full">
                <ViewEye />
              </div>
            </td>
          </tr>
        </tbody>

      
      </table>
    </div>
    
    </div>
  );
};

export default SingleEventTable;
