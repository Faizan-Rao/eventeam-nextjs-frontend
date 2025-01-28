import { RadioGroup } from "@/components/ui/radio-group";
import { RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import parser from "html-react-parser"
const RegisterForEventRadioGroup = ({settings, payload}:{settings:any, payload?:any}) => {
  const formContext = useFormContext();
  const { control } = formContext;
 console.log("settings group",settings)
  return (
    <Controller
    control={control}
    name="paymentMethod"
    render={({ field: { onChange } }) => (
    <RadioGroup  onValueChange={onChange}  defaultValue="cash" className="flex flex-col gap-4">
     { settings.is_cash_allowed === "1" && <div className="flex items-center space-x-2">
        <RadioGroupItem value="cash" id="option-one" />
        <Label htmlFor="option-one">
          <div className="flex flex-col justify-center ">
            <h1 className="text-base font-semibold">Cash</h1>
            <p className="text-sm   text-[#999999] ">
              {settings && parser(`${payload?.cod_text}`)}
            </p>
          </div>
        </Label>
      </div>}
      {settings.is_show_stripe === "1" && <div className="flex items-center space-x-2">
        <RadioGroupItem value="stripe" id="option-one" />
        <Label htmlFor="option-one">
          <div className="flex flex-col ">
            <h1 className="text-base font-semibold">
              Stripe
            </h1>
            <p className="text-sm  text-[#999999]  ">
              Pay with your Visa/Mastercard
            </p>
          </div>
        </Label>
      </div>}
    </RadioGroup>
    )
    }
    />
  );
};

export default RegisterForEventRadioGroup;
