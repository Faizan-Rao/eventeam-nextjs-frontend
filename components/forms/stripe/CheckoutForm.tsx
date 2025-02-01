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

  const handleSubmit = async (e : any) => {
    console.log("stripe element input", e)
    if (!stripe || !elements || !e.complete) {
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

      setSuccess(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

 

  return (
    <div className="flex flex-col border-[2px] p-4 rounded-xl gap-6">
      <CardElement
        onChange={(e) => {
         handleSubmit(e);
        }}
      />

      {error && <div className="text-red-800 text-center">{error}</div>}
    </div>
  );
};
