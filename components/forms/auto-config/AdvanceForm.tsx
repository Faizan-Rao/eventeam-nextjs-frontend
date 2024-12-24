import React from "react";
import { Control, Controller } from "react-hook-form";

import AdvanceFormOption from "./AdvanceFormOption";
import { Banknote, MapPin, CreditCard, Notebook, HandHeart, Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import AutoDonationDialog from "@/components/AutoDonationDialog";

interface IAdvanceForm {
  control: Control<any, any>;
}
const AdvanceForm: React.FC<IAdvanceForm> = ({ control }) => {
  return (
    <div className=" sm:min-w-[92vw] md:min-w-full flex flex-col gap-4 my-4">
      <AdvanceFormOption
        title={"Show address for all subevents?"}
        description="Description of the option"
        icon={<MapPin />}
      >
        <Controller
          name="advance_form.show_address"
          control={control}
          render={({ field }) => (
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              name={"advance_form.show_address"}
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
          name="advance_form.cash_payment"
          control={control}
          render={({ field }) => (
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              name={"advance_form.show_address"}
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
          name="advance_form.show_regulations"
          control={control}
          render={({ field }) => (
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
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
          name="advance_form.show_stripe"
          control={control}
          render={({ field }) => (
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              name={"advance_form.show_address"}
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
          name="advance_form.show_donation"
          control={control}
          render={({ field }) => (
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              
            />
          )}
        />
      </AdvanceFormOption>
    </div>
  );
};

export default AdvanceForm;
