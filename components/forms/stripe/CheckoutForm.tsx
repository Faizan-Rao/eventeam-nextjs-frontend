import React, { useState } from "react";
import { loadStripe, StripeCardElement } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useFormContext, useWatch } from "react-hook-form";
import { CircleX } from "lucide-react";
import { watch } from "fs";
import { toast } from "react-toastify";

// Load your publishable key
const stripePromise = loadStripe(
  "pk_test_51OFX75FlIzt1ONhGf5IKCvzZouk8cCKKIjjnvCLJ2dctVaS0ew0rK4JugvzhiMyvBNy7Y2eXi3n9XzFN6fwfbEE000XuXyd5GK"
);

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const formContext = useFormContext();
  const { control } = formContext;
  const watch = useWatch({ control });
  const { setValue } = useFormContext();

  const handleSubmit = async (event: unknown) => {
    (event as React.FormEvent).preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js has not loaded yet
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { token, error } = await stripe.createToken(
        cardElement as StripeCardElement
      );
      console.log(token);
      if (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
        return;
      }

      setValue("stripeToken", token);
      toast("Card Added", { type: "success" });
      setSuccess(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const clearCard = (e: any) => {
    e.preventDefault();
    toast("Card Cleared", { type: "info" });
    setValue("stripeToken", "");
  };

  return (
    <div className="flex flex-col border-[2px] p-4 rounded-xl gap-6">
      <CardElement />
      <div className="flex  gap-2">
        <button
          onClick={handleSubmit}
          disabled={!stripe}
          className="bg-[#7655fa] px-4 py-2 rounded-full text-white flex-1 font-semibold"
        >
          Add Card
        </button>
        {watch.stripeToken && (
          <button
            onClick={clearCard}
            disabled={!stripe}
            className="  rounded-full text-white "
          >
            {" "}
            <CircleX className="text-red-700" strokeWidth={1.2} />
          </button>
        )}
      </div>
      {error && <div className="text-red-800 text-center">{error}</div>}
    </div>
  );
};
