import { Switch } from "@/components/ui/switch";
import { joditConfig } from "@/configs/joditConfig";
import JoditEditor from "jodit-react";
import React, { useState } from "react";
import { IFieldElement } from "./AddSubEventDialog";
import { useFormContext, useWatch } from "react-hook-form";
import { watch } from "fs";

interface IAddSubEnventGenInfo {
  index?: number;
  type?: string;
  errors: string[];
  field: IFieldElement;
  setField: any;
}
const AddSubEventGenInfo: React.FC<IAddSubEnventGenInfo> = ({
  index,
  type,
  errors,
  field,
  setField,
}) => {
  const { control } = useFormContext();
  const watch = useWatch({ control });

  console.log("errors", errors);
  return (
    <div className="flex flex-col gap-4 flex-1">
      <div className="flex gap-2 flex-col">
        <label className={"text-[#4a4a4a] font-semibold"}>Event Name</label>
        <input
          type="text"
          className="border-[2px] outline-none p-2 w-full"
          placeholder="Enter Name"
          value={field.title}
          onChange={(e: React.ChangeEvent) =>
            setField({ ...field, title: (e.target as any).value })
          }
        />
      </div>
      {
        errors?.includes("title") && <p className="text-red-800">{`"Title" is required`}</p>
      }

      {/* Event Dates */}

      <div className="flex flex-col gap-2">
        <label className={"text-[#4a4a4a] font-semibold"}>Status</label>
        <div className="flex   border-2 p-2">
          <span>Active</span>
          <Switch
            defaultChecked={
              type === "edit"
                ? watch.sub_events[index as number].status === "1"
                  ? true
                  : false
                : field.status === "1"
                ? true
                : false
            }
            onCheckedChange={(value) =>
              setField({ ...field, status: value ? "1" : "0" })
            }
            className="text-[white] ml-auto justify-self-end cursor-pointer"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <label className={"text-[#4a4a4a] font-semibold"}>
          Event Description
        </label>
        <JoditEditor
          onChange={(value) => setField({ ...field, description: value })}
          value={field.description ?? ""}
          config={joditConfig as any}
        />
      </div>
    </div>
  );
};

export default AddSubEventGenInfo;
