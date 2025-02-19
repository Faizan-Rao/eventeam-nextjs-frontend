import React from "react";
import { Control, Controller, useFormContext, useWatch } from "react-hook-form";

import AdvanceFormOption from "./AdvanceFormOption";
import {
  Banknote,
  MapPin,
  CreditCard,
  Notebook,
  HandHeart,
  Check,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import AutoDonationDialog from "@/components/AutoDonationDialog";
import { useTranslation } from "react-i18next";

const AdvanceForm = () => {
  const {
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useFormContext();
  const watch = useWatch({ control });
  const { t } = useTranslation("translation");
  return (
    <div className="  flex flex-col gap-4 my-4">
      {errors.advance && (
        <p className="text-red-800">Please setup this section</p>
      )}
      {errors?.advance && (
        <p className="text-red-800">{` ${
          (errors?.advance.root as any).message ?? ""
        }`}</p>
      )}
      <AdvanceFormOption
        title={t("Show address for all subevents?")}
        description="Description of the option"
        icon={<MapPin />}
      >
        <Controller
          name="advance.is_show_address"
          control={control}
          render={({ field }) => (
            <Switch
              dir="ltr"
              checked={watch.advance.is_show_address === "1" ? true : false}
              onCheckedChange={(value) => {
                field.onChange(value ? "1" : "0");
              }}
              name={"advance.is_show_address"}
            />
          )}
        />
      </AdvanceFormOption>

      <AdvanceFormOption
        title={t("Enable Cash Payments?")}
        description="Description of the option"
        icon={<Banknote />}
      >
        <Controller
          name="advance.is_cash_allowed"
          control={control}
          render={({ field }) => (
            <Switch
              dir="ltr"
              checked={watch.advance.is_cash_allowed === "1" ? true : false}
              onCheckedChange={(value) => {
                const values = getValues()
                if(values.advance.is_show_stripe === "0" && (!value)){
                  setValue("advance.is_show_stripe", "1")
                }
                field.onChange(value ? "1" : "0");
              }}
              name={"advance.is_cash_allowed"}
            />
          )}
        />
      </AdvanceFormOption>

      <AdvanceFormOption
        title={t("Show regulations on forms?")}
        description="Description of the option"
        icon={<Notebook />}
      >
        <Controller
          name="advance.is_show_regulation"
          control={control}
          render={({ field }) => (
            <Switch
              dir="ltr"
              checked={watch.advance.is_show_regulation === "1" ? true : false}
              onCheckedChange={(value) => {
                
                field.onChange(value ? "1" : "0");
              }}
              className="bg-yellow-200"
            />
          )}
        />
      </AdvanceFormOption>

      <AdvanceFormOption
        title={t("Show stripe on the form?")}
        description="Description of the option"
        icon={<CreditCard />}
      >
        <Controller
          name="advance.is_show_stripe"
          control={control}
          render={({ field }) => (
            <Switch
              dir="ltr"
              checked={watch.advance.is_show_stripe === "1" ? true : false}
              onCheckedChange={(value) => {
                const values = getValues()
                if(values.advance.is_cash_allowed === "0" && (!value)){
                  setValue("advance.is_cash_allowed", "1")
                }
                field.onChange(value ? "1" : "0");
              }}
              name={"advance.is_show_stripe"}
            />
          )}
        />
      </AdvanceFormOption>

      <AdvanceFormOption
        title={t("Show the donations on registration form for this event?")}
        description="Description of the option"
        icon={<HandHeart />}
      >
        <AutoDonationDialog />
        <Controller
          name="advance.is_donation_allowed"
          control={control}
          render={({ field }) => (
            <Switch
              dir="ltr"
              checked={watch.advance.is_donation_allowed === "1" ? true : false}
              onCheckedChange={(value) => {
                field.onChange(value ? "1" : "0");
              }}
            />
          )}
        />
      </AdvanceFormOption>
    </div>
  );
};

export default AdvanceForm;
