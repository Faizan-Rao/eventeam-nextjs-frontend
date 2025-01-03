import React from "react";
import { Control, Controller, useFormContext, useWatch } from "react-hook-form";

import AdvanceFormOption from "./AdvanceFormOption";
import { Banknote, MapPin, CreditCard, Notebook, HandHeart, Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import AutoDonationDialog from "@/components/AutoDonationDialog";


const AdvanceForm = () => {
  const {control, formState: {errors}} = useFormContext()
  const watch = useWatch({control})
  return (
    <div className=" sm:min-w-[92vw] md:min-w-full flex flex-col gap-4 my-4">
      <AdvanceFormOption
        title={"Show address for all subevents?"}
        description="Description of the option"
        icon={<MapPin />}
      >
        <Controller
          name="advance.is_show_address"
          control={control}
          render={({ field }) => (
            <Switch
            checked={watch.advance.is_show_address === "1" ? true : false}
              onCheckedChange={(value)=>{

                field.onChange(value ? "1" : "0")
              }}
              name={"advance.is_show_address"}
            />
          )}
        />
      </AdvanceFormOption>

      <AdvanceFormOption
        title={"Enable Cash Payments?"}
        description="Description of the option"
        icon={<Banknote />}
      >
        <Controller
          name="advance.is_cash_allowed"
          control={control}
          render={({ field }) => (
            <Switch
            checked={watch.advance.is_cash_allowed === "1" ? true : false}
            onCheckedChange={(value)=>{

              field.onChange(value ? "1" : "0")
            }}
              name={"advance.is_cash_allowed"}
            />
          )}
        />
      </AdvanceFormOption>

      <AdvanceFormOption
        title={"Show regulations on forms?"}
        description="Description of the option"
        icon={<Notebook />}
      >
        <Controller
          name="advance.is_show_regulation"
          control={control}
          render={({ field }) => (
            <Switch
            checked={watch.advance.is_show_regulation === "1" ? true : false}
            onCheckedChange={(value)=>{

              field.onChange(value ? "1" : "0")
            }}
             className="bg-yellow-200"
            />
          )}
        />
      </AdvanceFormOption>
      
      <AdvanceFormOption
        title={"Show stripe on the form?"}
        description="Description of the option"
        icon={<CreditCard />}
      >
        <Controller
          name="advance.is_show_stripe"
          control={control}
          render={({ field }) => (
            <Switch
            checked={watch.advance.is_show_stripe === "1" ? true : false}
            onCheckedChange={(value)=>{

              field.onChange(value ? "1" : "0")
            }}
              name={"advance.is_show_stripe"}
            />
          )}
        />
      </AdvanceFormOption>

      <AdvanceFormOption
        title={"Show the donations on registration form for this event?"}
        description="Description of the option"
        icon={<HandHeart />}
      >
        <AutoDonationDialog/>
        <Controller
          name="advance.is_donation_allowed"
          control={control}
          render={({ field }) => (
            <Switch
            checked={watch.advance.is_donation_allowed === "1" ? true : false}
            onCheckedChange={(value)=>{

              field.onChange(value ? "1" : "0")
            }}
            />
          )}
        />
      </AdvanceFormOption>
    </div>
  );
};

export default AdvanceForm;
