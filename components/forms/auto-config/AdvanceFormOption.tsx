import React, { ChangeEvent, FormEvent, SyntheticEvent } from "react";
import { Control, Controller, ControllerRenderProps } from "react-hook-form";
import { IAutoConfig } from "./AutoConfigForm";
import { Switch } from "@/components/ui/switch";
interface IAdvanceFormOption {
  title: string;
  description?: string;
  icon?: React.ReactNode;
 children: React.ReactNode;
}
const AdvanceFormOption: React.FC<IAdvanceFormOption> = ({
  title,
  description,
  icon,
    children
  
}) => {
  return (
    <div className="flex justify-between items-center rounded-md overflow-hidden border-[2px] pr-4 mx-4">
      <div className="flex gap-4">
        <span className="flex place-items-center  p-4 aspect-square overflow-hidden object-cover text-[#7655fa] bg-[#7655FA26]">
          {icon && icon}
        </span>
        <span className="flex flex-col p-4 gap-1">
            <h1>{title}</h1>
            <p className="text-sm">{description}</p>
        </span>
      </div>
        {children}
      
    </div>
  );
};

export default AdvanceFormOption;
