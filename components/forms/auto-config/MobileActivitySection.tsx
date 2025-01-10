import { indexOf, remove, replace } from "lodash";
import React from "react";
import { useWatch, useFormContext, useFieldArray } from "react-hook-form";
import AddPrayerTimeDialog from "./AddPrayerTimeDialog";
import EditPrayerTimeDialog from "./EditPrayerTImeDialog";
import { CircleX } from "lucide-react";

const MobileActivitySection = ({
  data,
  index,
}: {
  data: any;
  index: number;
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { append, update, fields, remove , replace} = useFieldArray({
    control,
    name: `activities.${index}.activities`,
  });
  const watch = useWatch({ control });
  console.log("Mobile section data", fields);
  return (
    <div key={index} className="flex flex-col gap-4">
      <h1 className="text-[#7655fa] font-semibold">
        {watch.sub_events[index] && watch.sub_events[index].title}
      </h1>
      {data &&
        data?.activities?.map((el: any, index: number) => (
          <div
            className="shadow-md flex justify-between items-center px-4 py-2 rounded-lg bg-[#7655fa26]"
            key={index}
          >
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold">{el.activity_title}</h1>
              <h1 className="text-base text-[#999999]">
                {el.activity_time} {el.activity_type.replaceAll("_", " ")}
              </h1>
            </div>
            <div className="flex justify-center items-center  gap-6">
              {/* <EditPrayerTimeDialog
              index={index}
              prayer={1}
              update={update as any}
            /> */}
              <AddPrayerTimeDialog
                append={append}
                remove={remove}
                index={fields.length}
                type="edit"
                editIndex={index}
                editData={el}
                update={update}
              />
              <CircleX
                onClick={() => {
                    let filteredArray = fields.map((subEl:any, subIndex:number)=> subIndex !== index && subEl).filter((el, index)=> el && el)
                    console.log("field value", filteredArray)
                  replace(filteredArray);
                }}
                className="text-[red] cursor-pointer"
                strokeWidth={1}
              />
            </div>
          </div>
        ))}
    
      <AddPrayerTimeDialog
        append={append}
        remove={remove}
        index={fields.length}
        type="add"
      />
    </div>
  );
};

export default MobileActivitySection;
