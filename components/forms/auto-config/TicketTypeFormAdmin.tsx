import { CircleX, Plus } from "lucide-react";
import {
  UseFormRegister,
  Control,
  useFieldArray,
  useFormContext,
  Field,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";

import { ErrorMessage } from "@hookform/error-message";
export const TicketTypes = ({}: { errors?: string[] }) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tickets",
  });

  return (
    <div className="flex  flex-col   gap-6 p-4  ">
      {/* Event Name */}
      <div className="flex -1 w-full gap-2 flex-col">
        <label className={"text-[#4a4a4a] font-semibold"}>Ticket Names</label>
        {fields.map((el, index: number) => {
          return (
            <>
            
            <div className="flex gap-4 items-center" key={index}>
              <input
                type="text"
                className="border-[2px] outline-none p-2 sm:max-w-[80%] md:max-w-[90%] flex-1"
                placeholder="Enter Ticket Name"
                {...register(`tickets.${index}.title`, {
                  required: true,
                })}
              />
              {index > 0 && (
                <CircleX
                  onClick={() => remove(index)}
                  className="text-[red] cursor-pointer"
                  strokeWidth={1}
                />
              )}
            </div>
              <ErrorMessage
                errors={errors}
                name={`tickets.${index}.title`}
                message="This field is required."
                render={({ message }) =>
                  message && <p className="text-red-800 ">{message}</p>
                }
              />
            </>
          );
        })}

        <div>
          <button
            onClick={() => append({ title: "" })}
            className="flex items-center gap-4 my-4  justify-self-start  text-[#7655fA]"
          >
            {" "}
            <Plus /> <span>Add Another Ticket</span>
          </button>
        </div>
      </div>
    </div>
  );
};
