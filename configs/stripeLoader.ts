import { loadStripe } from "@stripe/stripe-js";
import { Profile } from "./apiRoutes";

export const stripePromise = Profile.getStripeToken().then((res) => {
  if (res.data.data?.stripe_publishable_key) {
    return loadStripe(res.data.data?.stripe_publishable_key);
  }
  else {
    return null;
  }
});
