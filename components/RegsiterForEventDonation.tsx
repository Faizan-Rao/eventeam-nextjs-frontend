"use client";
import { HandHeart } from "lucide-react";
import React, { createRef, useEffect, useRef, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { clsx } from "clsx";
import { toast } from "react-toastify";

const data = [
  {
    donation: "Charity",
    amount: 123,
  },
  {
    donation: "Charity",
    amount: 123,
  },
  {
    donation: "Charity",
    amount: 123,
  },
];
const RegsiterForEventDonation = () => {
  const [donationRefs, setDonationRef] = useState(Array(3).fill(false));
  const [customDonation, setDonation] = useState<number>(0);

  useEffect(() => {
    if (donationRefs.length > 0) {
      const total = data.reduce((prev, accum, index) => {
        if (donationRefs[index]) {
          prev += accum.amount;
        }
        return prev;
      }, 0);

      if (customDonation) console.log(total + customDonation);
      else console.log(total);
    }
  }, [customDonation, donationRefs, donationRefs.length]);

  return (
    <div className="flex flex-col  my-4 px-4 pb-4 gap-4">
      <div className=" flex flex-col overflow-y-auto gap-3 text-[#4a4a4a] font-semibold">
        <h1 className="text-[#7655fa] self-start font-semibold">Donations</h1>
        {data.map((el, index) => (
          <div
            className={clsx(
              "flex-1 border-[1px] py-2 px-4 rounded-md  flex items-center cursor-pointer",
              donationRefs[index] && "border-[#7655fa] border-[1px] "
            )}
            onClick={(event) => {
              const arr = [...donationRefs];
              arr[index] = !donationRefs[index];
              setDonationRef(arr);
            }}
            key={index}
          >
            <div className="flex gap-4 items-center">
              <span
                className={clsx(
                  "p-2 rounded-full  ",

                  donationRefs[index] && "bg-[#7655fa] ",
                  !donationRefs[index] && "bg-[#999999]"
                )}
              >
                <HandHeart className="text-white" />
              </span>

              <div className=" flex flex-col">
                <h1 className="text-[]">{`$${el.amount}`}</h1>
                <h1 className="text-sm text-[#999999]">{el.donation}</h1>
              </div>
            </div>

            <Checkbox
              defaultChecked={false}
              checked={donationRefs[index]}
              className="ms-auto justify-self-end"
            />
          </div>
        ))}

        <input
          className="border-[1px] rounded-md px-4 py-2 outline-[#7655fa]"
          placeholder="Enter Custom Donation"
          type="number"
          onChange={(event) => {
            setDonation(parseInt(event.target.value));
          }}
        />
      </div>
    </div>
  );
};

export default RegsiterForEventDonation;
