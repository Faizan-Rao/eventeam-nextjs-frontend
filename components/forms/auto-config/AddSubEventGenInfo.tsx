import { Switch } from "@/components/ui/switch";
import { joditConfig } from "@/configs/joditConfig";
import JoditEditor from "jodit-react";
import React from "react";
import { IFieldElement } from "./AddSubEventDialog";

interface IAddSubEnventGenInfo {
  field : IFieldElement,
  setField: React.Dispatch<IFieldElement>
}
const AddSubEventGenInfo : React.FC<IAddSubEnventGenInfo>= ({
  field,
  setField
}) => {

  
  return (
    <div className="flex flex-col gap-4 flex-1">
      <span className="flex gap-2 flex-col">
        <label className={"text-[#4a4a4a] font-semibold"}>Event Name</label>
        <input
          type="text"
          className="border-[2px] outline-none p-2 w-full"
          placeholder="Enter Name"
          value={field.name}
          onChange={(e : React.ChangeEvent)=>setField({...field , name : (e.target as any).value})}
        />
      </span>

      {/* Event Dates */}

      

      <span className="flex flex-col gap-2">
        <label className={"text-[#4a4a4a] font-semibold"}>Status</label>
        <div className="flex   border-2 p-2">
          <span>Active</span>
          <Switch
          defaultChecked={field.active}
            onCheckedChange={(value) => setField({...field, active : value})}
            className="text-[white] ml-auto justify-self-end cursor-pointer"
          />
        </div>
      </span>

   
            <div className="flex flex-col gap-4">
              <label  className={"text-[#4a4a4a] font-semibold"}>
                Event Description
              </label>
              <JoditEditor
                onChange={(value)=>setField({...field, description: value})}
                value={field.description ?? ""}
                config={joditConfig as any}
               
              />
            </div>
         
    </div>
  );
};

export default AddSubEventGenInfo;
