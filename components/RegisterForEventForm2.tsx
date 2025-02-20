import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import RegisterForEventRadioGroup from "./RegisterForEventRadioGroup";
import { Checkbox } from "./ui/checkbox";
import RegsiterForEventDonation from "./RegsiterForEventDonation";
import { useFormContext, useWatch } from "react-hook-form";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { CheckoutForm } from "./forms/stripe/CheckoutForm";
import parser from "html-react-parser";
const RegisterForEventForm2 = ({ data }: { data: any }) => {
  // stripe-Specific

  const formContext = useFormContext();
  const { control, setValue } = formContext;
  const watch = useWatch({ control });

  const platformFee = () => {
    const totalfee =
      parseFloat(watch.totalAmount) +
      parseFloat(watch.other_donation) +
      parseFloat(watch.donation_field);
    if (watch.allowPlateformFee) {
      const plateFormFee =
        (totalfee * parseFloat(data?.settings.plateform_fee)) / 100;
      const finalFee = totalfee + plateFormFee;
      return finalFee;
    }
    return totalfee;
  };
  const plateFormFee = (totalfee: any) =>
    (totalfee * parseFloat(data?.settings.plateform_fee)) / 100;
  return (
    <div className="flex-1 items-start  rounded-md bg-[white] sm:p-1 md:p-4 min-h-screen">
      {data.event.advances &&
        data.event.advances.is_donation_allowed === "1" && (
          <RegsiterForEventDonation data={data} />
        )}

      <div className="flex flex-col  px-4 pb-4 gap-4">
        <h1 className="text-[#7655fa] font-semibold">Price Breakdown</h1>
        <div className="flex gap-4 text-base justify-between">
          <p className="font-semibold px-2 text-[#999999] text-sm">
            Ticket Total Amount
          </p>
          <p className="font-semibold px-2 text-[#999999] text-sm">
            {"$" + watch.totalAmount}
          </p>
        </div>

        {data?.event?.advances &&
          data?.event?.advances.is_donation_allowed === "1" && (
            <div className="flex gap-4 text-base justify-between">
              <p className="font-semibold px-2 text-[#999999] text-sm">
                Donations
              </p>
              <p className="font-semibold px-2 text-[#999999] text-sm">
                {"$" + watch.donation_field}
              </p>
            </div>
          )}

        {data?.event?.advances &&
          data?.event?.advances.is_donation_allowed === "1" && (
            <div className="flex gap-4 text-base justify-between">
              <p className="font-semibold px-2 text-[#999999] text-sm">
                Desired Donation
              </p>
              <p className="font-semibold px-2 text-[#999999] text-sm">
                {"$" + watch.other_donation}
              </p>
            </div>
          )}

        {data.settings.is_show_app_fee === "1" && (
          <div className="flex ps-2 justify-between items-center     ">
            <div className=" flex items-center gap-3 text-[#4a4a4a] font-semibold">
              {data.settings && (
                <Checkbox
                  onCheckedChange={(e) => {
                    console.log("chekcbox change", e);
                    setValue("allowPlateformFee", e);
                  }}
                  checked={watch.allowPlateformFee}
                />
              )}

             
              <p className=" font-semibold  text-[#999999] text-sm">
              <span className="text-[rgb(153,153,153)] text-sm mx-1">
                {data.settings.application_fee_text}
              </span>
              {`${data.settings.plateform_fee}%`}
            </p>
            </div>
           
            <p className="ml-auto font-semibold px-2 text-[#999999] text-sm">
              {`$${plateFormFee(
                parseFloat(watch.totalAmount) +
                  parseFloat(watch.other_donation) +
                  parseFloat(watch.donation_field)
              )}`}
            </p>
          </div>
        )}
        <div className=" flex flex-col gap-3 border-b-[1px] pb-4 w-full flex-1">
          <div className="flex gap-4 text-base justify-between">
            <p className="font-semibold px-2">Total</p>
            <p className="font-semibold px-2">{`$${platformFee()}`}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col border-b-[1px]  px-4 pb-4 gap-4">
        <h1 className="text-[#7655fa] font-semibold">Payment Method</h1>
        <RegisterForEventRadioGroup
          payload={data.settings}
          settings={data?.event?.advances}
        />
      </div>

      <div className="flex flex-col  my-4 px-4 pb-4 gap-4">
        <div className=" flex items-center gap-3 text-[#4a4a4a] font-semibold">
          <Checkbox
            onCheckedChange={(e) => {
              setValue("accept_cash_terms", e);
            }}
            checked={watch.accept_cash_terms}
          />
          {data?.event?.advances?.is_show_regulation === "1" && (
            <span className="text-[rgb(153,153,153)] text-sm ">
              {data.settings && parser(`${data.settings.regulation_text}`)}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col  my-4 px-4 pb-4 gap-4">
        {watch.paymentMethod === "stripe" && <CheckoutForm />}
        {watch.stripeToken && watch.paymentMethod === "stripe" && (
          <button
            type="submit"
            disabled={!watch.accept_cash_terms}
            className="rounded-full bg-[#7655fa] disabled:bg-[#999999] text-white  font-semibold px-4 py-2"
          >
            Register for event
          </button>
        )}
        {watch.paymentMethod === "cash" && (
          <button
            type="submit"
            disabled={!watch.accept_cash_terms}
            className="rounded-full active:scale-[0.95] transition-all bg-[#7655fa] disabled:bg-[#999999] text-white  font-semibold px-4 py-2"
          >
            Register for event
          </button>
        )}
      </div>
    </div>
  );
};

export default RegisterForEventForm2;
