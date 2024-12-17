"use client"
import { CheckCircle, CheckCircle2, HandHeart } from "lucide-react";
import React, { createRef, useEffect, useRef, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { clsx } from "clsx";
import { toast } from "react-toastify";
import { useFormContext, useWatch } from "react-hook-form";
import { set } from "lodash";


const RegsiterForEventDonation = ({data} : {data: any}) => {
  
  // const [customDonation, setDonation] = useState<number>(0);
  const {control, setValue} = useFormContext()
  const watch = useWatch({ control })
  
  console.log(watch)
  const [donations, setDonations] = useState<any[]>([]);
  const [customDonation, setCustomDonation] = useState<number>(0);

  const handleDonation = (el:any, i:any, event:any) => {
   try {
            
     //  array[index] = !array.includes(array[index]) && array[index]
     let isExist  = donations.includes(el)
     console.log(isExist)
     if(!isExist)
     {
       const data = [...donations]
       data.push(el)
       console.log(data)
       setDonations(data)
     }
     else
     {
       const data = [...donations]
       const index  = data.findIndex((el2:any) =>  (el2.id === el.id))
      //  const filtered  = data.filter((el2:any) =>  (el2.id !== el.id))
       if(index !== -1)
      {
        data.splice(index, 1)
      }
 
       console.log("filtered Donations",data, index)
       
        //  setDonations(data)
       
     
        setDonations(data)
      
       // setDonationRef(data)
     }
       // setDonationRef(array)
       // setValue("donation_field", `${parseFloat(watch.totalAmount) + (array[index] ? el.amount : -el.amount)}`)
 
   } catch (error) {
      console.log(error)
   }
    }
  console.log(donations)
  // useEffect(() => {
  //   // if (donationRefs.length > 0) {
  //   //   const total = data.reduce((prev:number, accum:any, index:number) => {
  //   //     if (donationRefs[index]) {
  //   //       prev += accum.amount;
  //   //     }
  //   //     return prev;
  //   //   }, 0);

  //   //   if (customDonation) console.log(total + customDonation);
  //   //   else console.log(total);
    
  // }, [customDonation, data, donations, donations.length]);

  return (
    <div className="flex flex-col  my-4 px-4 pb-4 gap-4">
      <div className=" flex flex-col overflow-y-auto gap-3 text-[#4a4a4a] font-semibold">
        <h1 className="text-[#7655fa] self-start font-semibold">Donations</h1>
        {data.donations.map((el:any, index:number) => (
          <div
            className={clsx(
              "flex-1 border-[1px] py-2 px-4 rounded-md  flex items-center cursor-pointer",
              donations.includes(el) && "border-[#7655fa] border-[1px] "
            )}
            onClick={(e)=>handleDonation(el, index, e)}
            key={index}
          >
            <div className="flex gap-4 items-center"  >
              <span
                className={clsx(
                  "p-2 rounded-full  ",

                  donations.includes(el) && "bg-[#7655fa] ",
                  !donations.includes(el) && "bg-[#999999]"
                )}
              >
                <HandHeart className="text-white" />
              </span>

              <div className=" flex flex-col">
                <h1 className="text-[]">{`$${el.amount}`}</h1>
                <h1 className="text-sm text-[#999999]">{el.title}</h1>
              </div>
            </div>

            <CheckCircle2
              // defaultChecked={false}
             
              className={clsx("ms-auto justify-self-end  rounded-full text-[#999999]", donations.includes(el) && "text-white bg-[#7655fa]" )}
            />
          </div>
        ))}

        {/* <input
          className="border-[1px] rounded-md px-4 py-2 outline-[#7655fa]"
          placeholder="Enter Custom Donation"
          type="number"
          onChange={(event) => {
            setCustomDonation(parseInt(event.target.value));
          }}
        /> */}
      </div>
    </div>
  );
};

export default RegsiterForEventDonation;
