import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import RegisterForEventRadioGroup from "./RegisterForEventRadioGroup";
import { Checkbox } from "./ui/checkbox";
import RegsiterForEventDonation from "./RegsiterForEventDonation";
import { useFormContext, useWatch } from "react-hook-form";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { CheckoutForm } from "./forms/stripe/CheckoutForm";

const RegisterForEventForm2 = ({ data }: { data: any }) => {
  // stripe-Specific

  const formContext = useFormContext();
  const { control, setValue } = formContext;
  const watch = useWatch({ control });

  console.log(watch)
  return (
    <div className="flex-1 grid grid-cols-1 rounded-md bg-[white] p-4 min-h-screen">
      <RegsiterForEventDonation data={data} />
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
        <div className="flex gap-4 text-base justify-between">
          <p className="font-semibold px-2 text-[#999999] text-sm">Donations</p>
          <p className="font-semibold px-2 text-[#999999] text-sm">
            {"$" + watch.donation_field}
          </p>
        </div>
        <div className="flex gap-4 text-base justify-between">
          <p className="font-semibold px-2 text-[#999999] text-sm">
            Custom Donation
          </p>
          <p className="font-semibold px-2 text-[#999999] text-sm">
            {"$" + watch.other_donation}
          </p>
        </div>

        <div className=" flex flex-col gap-3 border-b-[1px] pb-4 w-full flex-1">
          <div className="flex gap-4 text-base justify-between">
            <p className="font-semibold px-2">Total</p>
            <p className="font-semibold px-2">
              {`$${
                parseFloat(watch.totalAmount) +
                parseFloat(watch.donation_field) +
                parseFloat(watch.other_donation)
              }`}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col border-b-[1px]  px-4 pb-4 gap-4">
        <h1 className="text-[#7655fa] font-semibold">Payment Method</h1>
        <RegisterForEventRadioGroup />
      </div>

      <div className="flex flex-col  my-4 px-4 pb-4 gap-4">
        <div className=" flex items-center gap-3 text-[#4a4a4a] font-semibold">
          <Checkbox
            onCheckedChange={(e) => {
              setValue("accept_cash_terms", e);
            }}
            checked={watch.accept_cash_terms}
          />
          <span className="text-[#999999] text-sm ">
            I agree to Terms & condition, Privacy policy & Return policy
          </span>
        </div>
      </div>

      <div className="flex flex-col  my-4 px-4 pb-4 gap-4">
        {watch.paymentMethod === "stripe" && <CheckoutForm />}
        {(watch.stripeToken && watch.paymentMethod === "stripe") && (
            <button
              type="submit"
              disabled={!watch.accept_cash_terms}
              className="rounded-full bg-[#7655fa] disabled:bg-[#999999] text-white  font-semibold px-4 py-2"
            >
              Register for event
            </button>
          )}
         {(!watch.stripeToken && watch.paymentMethod === "cash") && (
            <button
              type="submit"
              disabled={!watch.accept_cash_terms}
              className="rounded-full bg-[#7655fa] disabled:bg-[#999999] text-white  font-semibold px-4 py-2"
            >
              Register for event
            </button>
          )}
      </div>
    </div>
  );
};

export default RegisterForEventForm2;
